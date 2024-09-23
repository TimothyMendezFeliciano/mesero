import { UserType } from '@prisma/client';

export interface Account {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface Session {
  sessionToken: string;
  userId: string;
  expires: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface Authenticator {
  credentialID: string;
  userId: string;
  providerAccountId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: string;
  user: User;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  emailVerified?: Date;
  image?: string;
  accounts: Account[];
  sessions: Session[];
  Authenticator: Authenticator[];
  stripeCustomerId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  restaurants: Restaurant[];
  role: UserType;
}

export interface Restaurant {
  id: string;
  name: string;
  image?: string;
  menu?: RestaurantMenu;
  location?: Location;
  restaurantMenuId: string | null;
  previousAvgOrderCount: number;
  newAvgOrderCount: number;
  tables?: Table[];
  Orders?: Orders[];
  User?: User;
  userId?: string;
}

export interface RestaurantMenu {
  id: string;
  menuItems: MenuItems[];
  Restaurant: Restaurant[];
}

export interface Location {
  id: string;
  town: string;
  restaurant: Restaurant;
  restaurandId: string;
}

export interface Table {
  id: string;
  tableNumber: number;
  Restaurant?: Restaurant;
  restaurantId?: string;
}

export interface MenuItems {
  id: string;
  title: string;
  description: string;
  image?: string;
  availability: boolean;
  category: Categories;
  price: number;
  categoriesId: string;
  RestaurantMenu: RestaurantMenu;
  restaurantMenuId: string;
  orders: Orders[];
}

export interface Categories {
  id: string;
  title: string;
  MenuItems: MenuItems[];
}

export interface Orders {
  id: string;
  menuItems: MenuItems[];
  subTotal: number;
  restaurant: Restaurant;
  restaurantId: string;
}
