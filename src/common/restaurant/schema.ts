import * as z from 'zod';

export const restaurantSchema = z.object({
  name: z.string().trim().toLowerCase(),
  location: z.string().trim().toLowerCase(),
});

export type IRestaurant = z.infer<typeof restaurantSchema>;
