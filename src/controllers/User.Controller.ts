/**
 * Importing IUser and IAccount interfaces from the '../common/validation/auth'.
 * @type {IUser}
 * @type {IAccount}
 */
import { IAccount, IUser } from '../common/validation/auth';
import { User } from '../models/main';
import { PrismaClient, UserType } from '@prisma/client';

/**
 * The `userExists` function checks if the user exists in the database by searching through the email.
 * It is an async function that returns a promise of User type.
 * @public
 * @async
 * @param {IUser} userSchema - The data of the user which is of IUser type.
 * @param {any} ctx - The session context.
 * @returns {Promise<User>} - Returns a Promise that gets resolved with the User object as the result.
 * If no user with the specified email exists, the Promise gets resolved with null.
 */
export const userExists = async (
  userSchema: IUser,
  ctx: any,
): Promise<User> => {
  return await ctx.prisma.user.findFirst({
    where: { email: userSchema.email },
    include: {
      accounts: true,
      sessions: {
        take: 1,
        orderBy: {
          expires: 'desc',
        },
      },
      restaurants: true,
    },
  });
};

/**
 * The `createUser` function creates a new user in the database.
 * It takes an IUser object and an IAccount object as parameters and returns a Promise of User type.
 * @public
 * @async
 * @param {IUser} userSchema - The data of the user which is of IUser type.
 * @param {IAccount} accountSchema - The data of the account which is of IAccount type.
 * @param {any} ctx - The session context.
 * @returns {Promise<User>} - Returns a Promise that gets resolved with the newly created User object as the result.
 */
export const createUser = async (
  userSchema: IUser,
  accountSchema: IAccount,
  ctx: any,
): Promise<User> => {
  return await ctx.prisma.user.create({
    data: {
      email: userSchema.email,
      image: userSchema.image,
      role:
        userSchema.email === process.env.NEXTADMIN_EMAIL
          ? UserType.ADMIN
          : UserType.GUEST,
      accounts: {
        create: {
          ...accountSchema,
        },
      },
      sessions: {
        create: [
          {
            sessionToken: accountSchema.id_token,
            expires: accountSchema.expires_at,
          },
        ],
      },
    },
  });
};

/**
 * The `getUserByEmail` function retrieves a user from the database by email.
 * It is an async function that returns a promise of User type.
 * @public
 * @async
 * @param {string} email - The email of the user to retrieve.
 * @param {PrismaClient} prisma - Instance of PrismaClient
 * @returns {Promise<User | null>} - Returns a Promise that gets resolved with the User object as the result.
 * If no user with the specified email exists, the Promise gets resolved with null.
 */
export const getUserByEmail = async (
  email: string,
  prisma: PrismaClient,
): Promise<User | null> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
