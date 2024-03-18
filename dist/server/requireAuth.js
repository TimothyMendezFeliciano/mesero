"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const react_1 = require("next-auth/react");
const next_auth_1 = require("next-auth");
const ____nextauth_1 = require("../pages/api/auth/[...nextauth]");
const requireAuth = (func) => async (ctx) => {
    const session1 = await (0, next_auth_1.getServerSession)(ctx.req, ctx.res, ____nextauth_1.nextAuthOptions);
    const session2 = await (0, react_1.getSession)(ctx);
    if (!session1) {
        return {
            redirect: {
                destination: '/', // Home Page,
                permanent: false,
            },
        };
    }
    return await func(ctx);
};
exports.requireAuth = requireAuth;
