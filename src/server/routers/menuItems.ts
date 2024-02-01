import { RestaurantMenuItemsFormType } from '../../types';
import { EventEmitter } from 'events';
import { router } from '../trpc';

interface MyMenuItemsEvents {
  addMenuitem: (data: RestaurantMenuItemsFormType) => void
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

})