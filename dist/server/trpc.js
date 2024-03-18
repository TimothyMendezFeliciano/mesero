"use strict";
/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @link https://trpc.io/docs/v11/router
 * @link https://trpc.io/docs/v11/procedures
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authedProcedure = exports.mergeRouters = exports.publicProcedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const superjson_1 = __importDefault(require("superjson"));
const t = server_1.initTRPC.context().create({
    /**
     * @link https://trpc.io/docs/v11/data-transformers
     */
    transformer: superjson_1.default,
    /**
     * @link https://trpc.io/docs/v11/error-formatting
     */
    errorFormatter({ shape }) {
        return shape;
    },
});
/**
 * Create a router
 * @link https://trpc.io/docs/v11/router
 */
exports.router = t.router;
/**
 * Create an unprotected procedure
 * @link https://trpc.io/docs/v11/procedures
 **/
exports.publicProcedure = t.procedure;
/**
 * @link https://trpc.io/docs/v11/merging-routers
 */
exports.mergeRouters = t.mergeRouters;
/**
 * Protected base procedure
 */
exports.authedProcedure = t.procedure.use(function isAuthed(opts) {
    var _a;
    const user = (_a = opts.ctx.session) === null || _a === void 0 ? void 0 : _a.user;
    if (!(user === null || user === void 0 ? void 0 : user.name)) {
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED' });
    }
    return opts.next({
        ctx: {
            user: {
                ...user,
                name: user.name,
            },
        },
    });
});
