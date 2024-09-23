import { EventEmitter } from 'events';
import { z } from 'zod';
import { authedProcedure, publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { RestaurantFormType } from '../../types';
import { restaurantCreationSchema } from '../../common/restaurant/schema';

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

// TODO: Modify this to be used by RestaurantForm component.
export const restaurantRouter = router({
  getRestaurantByContext: authedProcedure.query(async ({ ctx }) => {
    return prisma.restaurant.findMany({
      where: {
        userId: ctx.user.id,
      },
    });
  }),
  // TODO: Consider making authedProcedure
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
