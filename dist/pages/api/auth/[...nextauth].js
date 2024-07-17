"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextAuthOptions = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const google_1 = __importDefault(require("next-auth/providers/google"));
const facebook_1 = __importDefault(require("next-auth/providers/facebook"));
const process = __importStar(require("process"));
const prisma_1 = require("../../../server/prisma");
const prisma_adapter_1 = require("@auth/prisma-adapter");
const stripe_1 = __importDefault(require("stripe"));
const User_Controller_1 = require("../../../controllers/User.Controller");
const providers = [];
const googleCredentials = (0, google_1.default)({
    name: 'google',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorization: {
        params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
        },
    },
});
const facebookCredentials = (0, facebook_1.default)({
    name: 'facebook',
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    authorization: {
        params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
        },
    },
});
providers.push(googleCredentials);
providers.push(facebookCredentials);
exports.nextAuthOptions = {
    // Configure one or more authentication providers
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    adapter: (0, prisma_adapter_1.PrismaAdapter)(prisma_1.prisma),
    providers,
    callbacks: {
        signIn: async ({ user }) => {
            return !!user;
        },
        session: async ({ session, user, }) => {
            var _a;
            let sesh = session;
            if ((_a = session.user) === null || _a === void 0 ? void 0 : _a.email) {
                const realUser = await (0, User_Controller_1.getUserByEmail)(session.user.email, prisma_1.prisma);
                if (realUser) {
                    sesh = {
                        ...session,
                        user: realUser,
                    };
                }
            }
            if ((sesh === null || sesh === void 0 ? void 0 : sesh.user) && (user === null || user === void 0 ? void 0 : user.stripeCustomerId)) {
                sesh.user.stripeCustomerId = user.stripeCustomerId;
                sesh.user.isActive = user.isActive;
            }
            return sesh;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signOut: '/',
        signIn: '/dashboard',
        newUser: '/dashboard/admin',
    },
    events: {
        createUser: async ({ user }) => {
            const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
                apiVersion: '2024-04-10',
            });
            await stripe.customers
                .create({
                email: user.email,
                name: user.name,
            })
                .then(async (customer) => {
                return prisma_1.prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        stripeCustomerId: customer.id,
                    },
                });
            });
        },
    },
};
exports.default = (0, next_auth_1.default)(exports.nextAuthOptions);
