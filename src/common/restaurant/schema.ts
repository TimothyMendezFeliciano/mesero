import * as z from 'zod';

export const restaurantCreationSchema = z.object({
  name: z.string().trim().toLowerCase().min(1),
  location: z.string().trim().toLowerCase(),
  employeeCount: z
    .number()
    .gte(1)
    .int({ message: 'Employee Count must be a valid number' }),
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const employeeInviteSchema = z.object({
  name: z.string().trim().toLowerCase().min(1),
  email: z.string().email(),
  phoneNumber: z.string().regex(phoneRegex, 'Invalid Number!'),
});

export type IRestaurant = z.infer<typeof restaurantCreationSchema>;
export type IEmployeeInvite = z.infer<typeof employeeInviteSchema>;
