"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRouter = void 0;
const events_1 = require("events");
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const prisma_1 = require("../prisma");
class MyRestaurantEventEmitter extends events_1.EventEmitter {
}
const ee = new MyRestaurantEventEmitter();
exports.restaurantRouter = (0, trpc_1.router)({
    // TODO: Consider making authedProcedure
    addRestaurant: trpc_1.publicProcedure
        .input(zod_1.z.object({
        name: zod_1.z.string(),
        image: zod_1.z.string().optional(),
        newAvgOrderCount: zod_1.z.number(),
        previousAvgOrderCount: zod_1.z.number(),
    }))
        .mutation(async ({ input }) => {
        const restaurant = await prisma_1.prisma.restaurant.create({
            data: {
                ...input,
            },
        });
        ee.emit('addRestaurant', restaurant);
        return restaurant;
    }),
    addRestaurantImage: trpc_1.publicProcedure
        .input(zod_1.z.object({
        image: zod_1.z.string(),
        id: zod_1.z.string().uuid(),
    }))
        .mutation(async ({ input }) => {
        //  TODO: Choose a hosting provider.
        const restaurantImage = await prisma_1.prisma.restaurant.update({
            where: {
                id: input.id,
            },
            data: {
                image: input.image,
            },
        });
        return restaurantImage;
    }),
});
