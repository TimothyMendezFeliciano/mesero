import type { Categories, Location, MenuItems, Restaurant, Table } from '@prisma/client';
export type RestaurantFormType = Pick<
  Restaurant,
  'name' | 'newAvgOrderCount' | 'previousAvgOrderCount'
>;
export type RestaurantMenuItemsFormType = Omit<MenuItems, 'id'>;
export type LocationFormType = Partial<Location>;
export type TableFormType = Omit<Table, 'id'>;
export type CategoriesFormType = Omit<Categories, 'id'>;

export type MenuItemsReadOnly = Readonly<MenuItems>