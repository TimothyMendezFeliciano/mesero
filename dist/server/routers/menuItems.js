"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuItemsRouter = void 0;
const events_1 = require("events");
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const prisma_1 = require("../prisma");
const observable_1 = require("@trpc/server/observable");
class MyMenuItemsEventEmitter extends events_1.EventEmitter {
}
const ee = new MyMenuItemsEventEmitter();
exports.menuItemsRouter = (0, trpc_1.router)({
    // TODO: consider changing to authedProcedure
    addMenuItem: trpc_1.publicProcedure
        .input(zod_1.z.object({
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        image: zod_1.z.string().optional(),
        availability: zod_1.z.boolean(),
        category: zod_1.z.string().uuid(),
        price: zod_1.z.number().safe().finite(),
        restaurantMenuId: zod_1.z.string().uuid().optional(),
        id: zod_1.z.string().uuid(),
    }))
        .mutation(async ({ input }) => {
        const menuItem = await prisma_1.prisma.menuItems.create({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data: {
                ...input,
                category: {
                    connect: {
                        id: input.category,
                    },
                },
                categoriesId: input.category,
                restaurantMenuId: input.id,
            },
        });
        ee.emit('addMenuItem', menuItem);
        return menuItem;
    }),
    onAddMenuItem: trpc_1.publicProcedure.subscription(() => {
        return (0, observable_1.observable)((emit) => {
            const onAddMenuItem = (data) => {
                emit.next(data);
            };
            ee.on('addMenuItem', onAddMenuItem);
            return () => {
                ee.off('addMenuItem', onAddMenuItem);
            };
        });
    }),
});
