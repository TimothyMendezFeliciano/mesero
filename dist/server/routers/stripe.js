"use strict";
/**
 * The `stripeRouter` is a tRPC-router instance exposing a single `checkout` mutation.
 * It is used to create a Stripe checkout session for a user that has a stripeCustomerId.
 * @module stripeRouter
 */
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
exports.stripeRouter = void 0;
const trpc_1 = require("../trpc");
const server_1 = require("@trpc/server");
const stripe_1 = __importDefault(require("stripe"));
const z = __importStar(require("zod"));
/**
 * The `stripeRouter` object exports a tRPC-router configuration that includes a `checkout` mutation.
 * This mutation creates a Stripe checkout session for a user that has a stripeCustomerId associated with their account.
 * If the user is not authenticated, or the user does not exist, the mutation will throw an error.
 * The mutation will also throw an error if it is unable to create the checkout session.
 */
exports.stripeRouter = (0, trpc_1.router)({
    /**
     * The `checkout` mutation creates a Stripe checkout session for a user that has a stripeCustomerId.
     * - If the user is not authenticated or the stripeCustomerId is not set, the mutation throws an error.
     * - The mutation throws an error if it cannot create a session.
     * @function checkout
     * @async
     * @param {Object} context - The tRPC context object.
     * @property {Object} ctx.session - The session object.
     * @throws {TRPCError} - If user is not registered as a customer
     * @throws {TRPCError} - If user does not exist
     * @throws {TRPCError} - If unable to create an invoice session
     * @returns {Object} Response object with status, message, and session result.
     */
    checkout: trpc_1.authedProcedure
        .input(z.object({
        priceId: z.coerce
            .string({
            required_error: 'Product ID is required',
            invalid_type_error: 'Must be of type string',
        })
            .min(1),
    }))
        .mutation(async ({ input, ctx, }) => {
        var _a;
        const session = ctx.session;
        if (session === null) {
            throw new server_1.TRPCError({
                code: 'NOT_FOUND',
                message: 'Session Not Found',
            });
        }
        if (!((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.stripeCustomerId)) {
            throw new server_1.TRPCError({
                code: 'UNAUTHORIZED',
                message: 'No estas registrado como cliente.',
            });
        }
        if (!(session === null || session === void 0 ? void 0 : session.user)) {
            throw new server_1.TRPCError({
                code: 'NOT_FOUND',
                message: 'Usuario no existe. Por favor registrese.',
            });
        }
        const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-04-10',
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const checkoutSession = await stripe.checkout.sessions.create({
            mode: 'subscription',
            customer: session.user.stripeCustomerId,
            line_items: [
                {
                    price: input.priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.APP_URL}/dashboard/admin`,
            cancel_url: `${process.env.APP_URL}/error`,
            subscription_data: {
                metadata: {
                    payingUserId: session.user.email,
                },
            },
        });
        if (!checkoutSession.url) {
            throw new server_1.TRPCError({
                code: 'NOT_IMPLEMENTED',
                message: 'No se pudo crear sesión de factura.',
            });
        }
        return {
            status: 201,
            message: 'Sesión creada!',
            result: checkoutSession,
        };
    }),
});
