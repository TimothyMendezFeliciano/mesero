import { publicProcedure, router } from '../../trpc';
import * as z from 'zod';
import { accountSchema, profileSchema, userSchema } from '../../../common/validation/auth';

export const signIn = router({
  createUser: publicProcedure.input(
    z.object({
      userSchema,
      accountSchema,
      profileSchema,
    }),
  ).mutation(async ({ input, ctx }) => {
    const { userSchema, accountSchema, profileSchema } = input;

    const exists = await ctx.prisma.user.findFirst({
      where: { email: userSchema.email },
      include: {
        accounts: true,
        sessions: true,
        restaurants: true,
      },
    });

    if (exists) {
      return {
        status: 200,
        message: 'Account found',
        result: exists,
      };
    }

    //   TODO: Complete Sign In
    // Create Account, PRofile, and Session in Database.
  }),
});
