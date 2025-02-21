/**
 * This module defines several REST API endpoints for the restaurant entity.
 *
 * @module Restaurants
 * @see {@link https://jsdoc.app/|JSDoc}
 */

import { EventEmitter } from 'events';
import { z } from 'zod';
import { authedProcedure, publicProcedure, router } from '../trpc';
import { RestaurantFormType } from '../../types';
import {
  employeeInviteSchema,
  restaurantCreationSchema,
} from '../../common/restaurant/schema';
import { prisma } from '../prisma';
import { UserType } from '@prisma/client';
import { getUserByEmail } from '../../controllers/User.Controller';

/**
 * Interface which defines the events available in the restaurant entity context.
 *
 * @typedef {object} MyRestaurantEvents
 *
 * @property {function} addRestaurant - Triggered when a restaurant is added.
 */
interface MyRestaurantEvents {
  addRestaurant: (data: RestaurantFormType) => void;
  employeeAdded: (data: any) => void;
}

/**
 * Interface which defines the available methods for event triggering in the restaurant entity context.
 *
 * @interface MyRestaurantEventEmitter
 */
declare interface MyRestaurantEventEmitter {
  on<TEv extends keyof MyRestaurantEvents>(
    event: TEv,
    listener: MyRestaurantEvents[TEv],
  ): this;

  off<TEv extends keyof MyRestaurantEvents>(
    event: TEv,
    listener: MyRestaurantEvents[TEv],
  ): this;

  once<TEv extends keyof MyRestaurantEvents>(
    event: TEv,
    listener: MyRestaurantEvents[TEv],
  ): this;

  emit<TEv extends keyof MyRestaurantEvents>(
    event: TEv,
    ...args: Parameters<MyRestaurantEvents[TEv]>
  ): boolean;
}

/**
 * Creates restaurant event emitter.
 *
 * @extends EventEmitter
 */
class MyRestaurantEventEmitter extends EventEmitter {}

/**
 * Instantiate the restaurant event emitter.
 */
const ee = new MyRestaurantEventEmitter();

/**
 * Export a trpc router with several endpoint handlers encapsulating various restaurant-related operations.
 * These operations include fetching restaurants by context, adding new restaurants and adding images to restaurants.
 */
export const restaurantRouter = router({
  /**
   * Get all restaurants that match the request context's user ID.
   */
  getRestaurantByContext: authedProcedure.query(async ({ ctx }) => {
    return prisma.restaurant.findMany({
      where: {
        userId: ctx.user.id,
        User: {
          every: {
            role: UserType.OWNER,
          },
        },
      },
    });
  }),

  /**
   * Add new restaurant.
   * Emits the `addRestaurant` event once the restaurant has been added successfully.
   */
  addRestaurant: authedProcedure
    .input(
      restaurantCreationSchema.extend({
        userId: z.string().uuid('User Id must be a UUID'),
      }),
    )
    .mutation(async ({ input }) => {
      const restaurant = await prisma.restaurant.create({
        data: {
          name: input.name,
          location: {
            connectOrCreate: {
              create: {
                town: input.location,
              },
              where: {
                town: input.location,
              },
            },
          },
          User: {
            connect: {
              id: input.userId,
            },
          },
        },
      });

      ee.emit('addRestaurant', restaurant);
      return restaurant;
    }),

  /**
   * Add image to a restaurant.
   * Note: the hosting provider for the image is yet to be chosen.
   */
  addRestaurantImage: publicProcedure
    .input(
      z.object({
        image: z.string(),
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      return prisma.restaurant.update({
        where: {
          id: input.id,
        },
        data: {
          image: input.image,
        },
      });
    }),
  inviteEmployee: authedProcedure
    .input(
      z.object({
        employeeInviteSchema,
        adminId: z.string().uuid('Admin Id must be a UUID'),
        restaurantId: z.string().uuid('Restaurant Id must be a UUID'),
      }),
    )
    .mutation(async ({ input }) => {
      const restaurant = await prisma.restaurant.findUnique({
        where: {
          id: input.restaurantId,
        },
        include: {
          User: {
            where: {
              id: input.adminId,
              role: UserType.OWNER,
            },
          },
        },
      });

      if (!restaurant) {
        throw new Error('Restaurant with provided id not found');
      }

      ee.emit('employeeAdded', {
        restaurantOwner: restaurant.User[0].name,
        restaurantName: restaurant.name,
        employeeName: input.employeeInviteSchema.name,
        employeeEmail: input.employeeInviteSchema.email,
      });

      //   TODO: Use Twilio to send an email to the employee letting them know they've been invited.
    }),
});
