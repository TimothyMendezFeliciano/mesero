import { EventEmitter } from 'events';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { RestaurantFormType } from '../../types';

interface MyRestaurantEvents {
  addRestaurant: (data: RestaurantFormType) => void;
}

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

class MyRestaurantEventEmitter extends EventEmitter {}

const ee = new MyRestaurantEventEmitter();

export const restaurantRouter = router({
  // TODO: Consider making authedProcedure
  addRestaurant: publicProcedure
    .input(
      z.object({
        name: z.string(),
        image: z.string().optional(),
        newAvgOrderCount: z.number(),
        previousAvgOrderCount: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const restaurant = await prisma.restaurant.create({
        data: {
          ...input,
        },
      });

      ee.emit('addRestaurant', restaurant);
      return restaurant;
    }),
  addRestaurantImage: publicProcedure
    .input(
      z.object({
        image: z.string(),
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      //  TODO: Choose a hosting provider.
      const restaurantImage = await prisma.restaurant.update({
        where: {
          id: input.id,
        },
        data: {
          image: input.image,
        },
      });

      return restaurantImage;
    }),
});
