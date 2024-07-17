"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createUser = exports.userExists = void 0;
const client_1 = require("@prisma/client");
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
const userExists = async (userSchema, ctx) => {
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
exports.userExists = userExists;
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
const createUser = async (userSchema, accountSchema, ctx) => {
    return await ctx.prisma.user.create({
        data: {
            email: userSchema.email,
            image: userSchema.image,
            role: userSchema.email === process.env.NEXTADMIN_EMAIL
                ? client_1.UserType.ADMIN
                : client_1.UserType.GUEST,
            accounts: {
                create: {
                    ...accountSchema,
                },
            },
            sessions: {
                create: [
                    {
                        id: accountSchema.id_token,
                        sessionToken: accountSchema.id_token,
                        expires: accountSchema.expires_at,
                    },
                ],
            },
        },
    });
};
exports.createUser = createUser;
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
const getUserByEmail = async (email, prisma) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return prisma.user.findUnique({
        where: {
            email: email,
        },
    });
};
exports.getUserByEmail = getUserByEmail;
