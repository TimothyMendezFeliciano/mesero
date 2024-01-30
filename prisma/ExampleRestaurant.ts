// import { Categories, MenuItems } from '@prisma/client';

export const category = {
  title: 'Entree',
};

export const exampleMenuItems = {
  title: 'Margherita Pizza',
  description: 'Classic Margherita with fresh mozzarella and basil',
  availability: true,
  category: category,
  price: 12.99,
};

export const exampleLocation = {
  latitude: 18.33026,
  longitude: -67.164287,
  coordinates: '18°19\'49.1"N 67°09\'51.4"W',
};

export const exampleTable = {
  tableNumber: 1,
};

export const exampleRestaurant = {
  name: "Timothy's Pizzeria",
  menu: [exampleMenuItems],
  location: exampleLocation,
  previousAvgOrderCount: 50,
  newAvgOrderCount: 55,
  tables: [exampleTable],
};
