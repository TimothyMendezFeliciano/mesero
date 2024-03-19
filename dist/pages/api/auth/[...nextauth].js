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
const prisma_1 = require("../../../server/prisma");
const process = __importStar(require("process"));
const prisma_adapter_1 = require("@auth/prisma-adapter");
const providers = [];
// const basicCredentials = CredentialsProvider({
//   name: 'credentials',
//   credentials: {
//     email: {
//       label: 'Email',
//       type: 'email',
//       placeholder: 'user@email.com',
//     },
//     password: { label: 'Password', type: 'password' },
//   },
//   authorize: async (
//     credentials,
//   ): Promise<null | {
//     role: 'ADMIN' | 'EMPLOYEE' | 'OWNER' | 'GUEST';
//     id: string;
//     email: string;
//     username: string;
//   }> => {
//     const creds = await loginSchema.parseAsync(credentials);
//     const user = await prisma.user.findFirst({
//       where: { email: creds.email },
//     });
//
//     if (!user) return null;
//
//     const isValidPassword = await verify(user.password, creds.password);
//
//     if (!isValidPassword) return null;
//
//     return {
//       id: user.id,
//       email: user.email,
//       username: user.username,
//       role: user.role,
//     };
//   },
// });
const googleCredentials = (0, google_1.default)({
    name: 'google',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});
providers.push(googleCredentials);
exports.nextAuthOptions = {
    // Configure one or more authentication providers
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    adapter: (0, prisma_adapter_1.PrismaAdapter)(prisma_1.prisma),
    providers,
    // callbacks: {
    //   jwt: async ({ token, user }: { token: JWT; user: User }) => {
    //     const newUser: any = user;
    //     if (user) {
    //       token.id = newUser.id;
    //       token.email = newUser.email;
    //       token.role = newUser.role;
    //     }
    //
    //     return token;
    //   },
    //   session: async ({ session, token }: { session: Session; token: JWT }) => {
    //     const newSesh: any = session;
    //     if (newSesh?.user) {
    //       newSesh.user.role = token.role;
    //     }
    //     return newSesh;
    //   },
    // },
    // session: {
    //   strategy: 'jwt',
    //   maxAge: 30 * 24 * 60 * 60,
    //   updateAge: 24 * 60 * 60,
    // },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/',
        newUser: '/sign-up',
    },
};
exports.default = (0, next_auth_1.default)(exports.nextAuthOptions);
