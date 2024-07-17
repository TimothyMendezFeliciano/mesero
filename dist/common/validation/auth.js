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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.profileSchema = exports.accountSchema = exports.userSchema = exports.signUpSchema = exports.loginSchema = void 0;
const z = __importStar(require("zod"));
exports.loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(12),
});
exports.signUpSchema = exports.loginSchema.extend({
    username: z.string(),
});
exports.userSchema = z.object({
    id: z
        .string({
        required_error: 'Id is required',
        invalid_type_error: 'id must be a valid uuid',
    })
        .uuid('Must be a valid uuid'),
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    }),
    email: z
        .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
        .email('Must be a valid email'),
    image: z
        .string({
        required_error: 'Image url is required',
        invalid_type_error: 'image url must be a string',
    })
        .url('Must be a valid url'),
});
exports.accountSchema = z.object({
    provider: z.string(),
    type: z.string(),
    providerAccountId: z.string(),
    access_token: z.string(),
    expires_at: z.number().gte(Date.now(), 'This token is expired.'),
    refresh_token: z.string(),
    scope: z.string().url(),
    token_type: z.string(),
    id_token: z.string(),
});
exports.profileSchema = z.object({
    iss: z.string().url(),
    azp: z.string(),
    aud: z.string(),
    sub: z.string(),
    email: z.string().email(),
    email_verified: z.boolean(),
    at_hash: z.string(),
    name: z.string(),
    picture: z.string().url(),
    given_name: z.string(),
    family_name: z.string(),
    iat: z.number().gte(Date.now(), 'This token is expired'),
    exp: z.number().gte(Date.now(), 'This token is expired'),
});
exports.signInSchema = z.object({
    userSchema: exports.userSchema,
    accountSchema: exports.accountSchema,
    profileSchema: exports.profileSchema,
});
