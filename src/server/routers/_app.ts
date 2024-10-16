/**
 * This file contains the root router of your tRPC-backend
 */
import { router, publicProcedure } from '../trpc';
// import { postRouter } from './post';
import { observable } from '@trpc/server/observable';
import { clearInterval } from 'timers';
import { restaurantRouter } from './restaurant';
import { menuItemsRouter } from './menuItems';
import { signInRouter } from './user/signIn';
import { stripeRouter } from './stripe';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  signIn: signInRouter,
  // post: postRouter,
  restaurant: restaurantRouter,
  menuItems: menuItemsRouter,
  stripe: stripeRouter,

  randomNumber: publicProcedure.subscription(() => {
    return observable<number>((emit) => {
      const int = setInterval(() => {
        emit.next(Math.random());
      }, 500);
      return () => {
        clearInterval(int);
      };
    });
  }),
});

export type AppRouter = typeof appRouter;
