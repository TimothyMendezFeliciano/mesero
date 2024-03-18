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
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const auth_1 = require("../../../common/validation/auth");
const prisma_1 = require("../../../server/prisma");
const argon2_1 = require("argon2");
const process = __importStar(require("process"));
const providers = [];
const basicCredentials = (0, credentials_1.default)({
    name: 'credentials',
    credentials: {
        email: {
            label: 'Email',
            type: 'email',
            placeholder: 'user@email.com',
        },
        password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials) => {
        const creds = await auth_1.loginSchema.parseAsync(credentials);
        const user = await prisma_1.prisma.user.findFirst({
            where: { email: creds.email },
        });
        if (!user)
            return null;
        const isValidPassword = await (0, argon2_1.verify)(user.password, creds.password);
        if (!isValidPassword)
            return null;
        return {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.isAdmin,
        };
    },
});
providers.push(basicCredentials);
exports.nextAuthOptions = {
    // Configure one or more authentication providers
    providers,
    callbacks: {
        jwt: async ({ token, user }) => {
            const newUser = user;
            if (user) {
                token.id = newUser.id;
                token.email = newUser.email;
                token.role = newUser.role;
            }
            return token;
        },
        session: async ({ session, token }) => {
            const newSesh = session;
            if (newSesh === null || newSesh === void 0 ? void 0 : newSesh.user) {
                newSesh.user.role = token.role;
            }
            return newSesh;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
        newUser: '/sign-up',
    },
};
exports.default = (0, next_auth_1.default)(exports.nextAuthOptions);
