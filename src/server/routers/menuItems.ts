import { MenuItemsReadOnly, RestaurantMenuItemsFormType } from '../../types';
import { EventEmitter } from 'events';
import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { prisma } from '../prisma';
import { observable } from '@trpc/server/observable';

interface MyMenuItemsEvents {
  addMenuItem: (data: RestaurantMenuItemsFormType) => void;
}

declare interface MyMenuItemsEventEmitter {
  on<TEv extends keyof MyMenuItemsEvents>(
    event: TEv,
    listener: MyMenuItemsEvents[TEv],
  ): this;

  off<TEv extends keyof MyMenuItemsEvents>(
    event: TEv,
    listener: MyMenuItemsEvents[TEv],
  ): this;

  once<TEv extends keyof MyMenuItemsEvents>(
    event: TEv,
    listener: MyMenuItemsEvents[TEv],
  ): this;

  emit<TEv extends keyof MyMenuItemsEvents>(
    event: TEv,
    ...args: Parameters<MyMenuItemsEvents[TEv]>
  ): boolean;
}

class MyMenuItemsEventEmitter extends EventEmitter {}

const ee = new MyMenuItemsEventEmitter();

export const menuItemsRouter = router({
  // TODO: consider changing to authedProcedure
  addMenuItem: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        availability: z.boolean(),
        category: z.string().uuid(),
        price: z.number().safe().finite(),
        restaurantMenuId: z.string().uuid().optional(),
        id: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const menuItem = await prisma.menuItems.create({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: {
          ...input,
          category: {
            connect: {
              id: input.category,
            },
          },
          categoriesId: input.category,
          restaurantMenuId: input.id,
        },
      });

      ee.emit('addMenuItem', menuItem);
      return menuItem;
    }),

  onAddMenuItem: publicProcedure.subscription(() => {
    return observable<MenuItemsReadOnly>((emit) => {
      const onAddMenuItem = (data: MenuItemsReadOnly) => {
        emit.next(data);
      };

      ee.on('addMenuItem', onAddMenuItem);
      return () => {
        ee.off('addMenuItem', onAddMenuItem);
      };
    });
  }),
});
