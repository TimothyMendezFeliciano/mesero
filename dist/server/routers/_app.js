"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
/**
 * This file contains the root router of your tRPC-backend
 */
const trpc_1 = require("../trpc");
const post_1 = require("./post");
const observable_1 = require("@trpc/server/observable");
const timers_1 = require("timers");
const restaurant_1 = require("./restaurant");
const menuItems_1 = require("./menuItems");
const signIn_1 = require("./user/signIn");
const stripe_1 = require("./stripe");
exports.appRouter = (0, trpc_1.router)({
    healthcheck: trpc_1.publicProcedure.query(() => 'yay!'),
    signIn: signIn_1.signInRouter,
    post: post_1.postRouter,
    restaurant: restaurant_1.restaurantRouter,
    menuItems: menuItems_1.menuItemsRouter,
    stripe: stripe_1.stripeRouter,
    randomNumber: trpc_1.publicProcedure.subscription(() => {
        return (0, observable_1.observable)((emit) => {
            const int = setInterval(() => {
                emit.next(Math.random());
            }, 500);
            return () => {
                (0, timers_1.clearInterval)(int);
            };
        });
    }),
});
