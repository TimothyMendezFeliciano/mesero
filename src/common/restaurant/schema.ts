import * as z from 'zod';

export const restaurantCreationSchema = z.object({
  name: z.string().trim().toLowerCase().min(1),
  location: z.string().trim().toLowerCase(),
  employeeCount: z
    .number()
    .gte(1)
    .int({ message: 'Employee Count must be a valid number' }),
});

export type IRestaurant = z.infer<typeof restaurantCreationSchema>;
