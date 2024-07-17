"use strict";
/**
 * This file handles the authentication module, particularly the creation of a session for the valid user. This involves the schema of a user account and user.
 * @module auth
 * @see IAccount
 * @see IUser
 * @see Session
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
/**
 * The `createSession` function is a function that creates a new session using Prisma Client's `prisma.session.create()` function.
 * @param {IUser} userSchema - An object contains user related data.
 * @param {IAccount} accountSchema - An object contains account related data.
 * @param ctx - An object that encapsulates data flow between middleware.
 * @function createSession
 * @returns {Promise<Session>} Returns a `Promise` that resolves with a `Session` object.
 */
const createSession = async (userSchema, accountSchema, ctx) => {
    /**
     * This method will create a new session with the given accountSchema and userSchema
     * @see IAccount
     * @see IUser
     */
    return ctx.prisma.session.create({
        data: {
            id: accountSchema.id_token,
            sessionToken: accountSchema.id_token,
            expires: accountSchema.expires_at,
            user: {
                connect: {
                    email: userSchema.email,
                },
            },
        },
    });
};
exports.createSession = createSession;
