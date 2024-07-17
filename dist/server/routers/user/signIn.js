"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInRouter = void 0;
const trpc_1 = require("../../trpc");
const auth_1 = require("../../../common/validation/auth");
const User_Controller_1 = require("../../../controllers/User.Controller");
const Session_Controller_1 = require("../../../controllers/Session.Controller");
exports.signInRouter = (0, trpc_1.router)({
    createUser: trpc_1.publicProcedure
        .input(auth_1.signInSchema)
        .mutation(async ({ input, ctx }) => {
        const { userSchema, accountSchema } = input;
        const exists = await (0, User_Controller_1.userExists)(userSchema, ctx);
        if (exists) {
            if (exists.sessions[0].expires > Date.now()) {
                return {
                    status: 200,
                    message: 'Account found',
                    result: exists,
                };
            }
            else {
                const updated = await (0, Session_Controller_1.createSession)(userSchema, accountSchema, ctx);
                return {
                    status: 200,
                    message: 'Session Updated',
                    result: updated,
                };
            }
        }
        else {
            const result = await (0, User_Controller_1.createUser)(userSchema, accountSchema, ctx);
            return {
                status: 201,
                message: 'Account Created Successfully',
                result: result,
            };
        }
    }),
});
