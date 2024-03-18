"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpRouter = void 0;
const trpc_1 = require("../trpc");
const auth_1 = require("../../common/validation/auth");
const server_1 = require("@trpc/server");
const argon2_1 = require("argon2");
const client_1 = require("@prisma/client");
exports.signUpRouter = (0, trpc_1.router)({
    createUser: trpc_1.publicProcedure
        .input(auth_1.signUpSchema)
        .mutation(async ({ input, ctx }) => {
        const { username, email, password } = input;
        const exists = await ctx.prisma.user.findFirst({
            where: { email },
        });
        if (exists) {
            throw new server_1.TRPCError({
                code: 'CONFLICT',
                message: 'User already exists',
            });
        }
        const hashedPassword = await (0, argon2_1.hash)(password);
        const result = await ctx.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                isAdmin: email === process.env.NEXTADMIN_EMAIL
                    ? client_1.UserType.ADMIN
                    : client_1.UserType.GUEST,
            },
        });
        return {
            status: 201,
            message: 'Account created successfully',
            result: result,
        };
    }),
});
