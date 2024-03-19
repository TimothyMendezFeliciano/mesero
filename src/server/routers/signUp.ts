import { publicProcedure, router } from '../trpc';
import { signUpSchema } from '../../common/validation/auth';
import { TRPCError } from '@trpc/server';
import { hash } from 'argon2';
import { UserType } from '@prisma/client';

export const signUpRouter = router({
  createUser: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }) => {
      const { username, email, password } = input;

      console.log('IWANTEVERYTHING', [
        input, ctx,
      ]);

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        });
      }

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role:
            email === process.env.NEXTADMIN_EMAIL
              ? UserType.ADMIN
              : UserType.GUEST,
        },
      });

      return {
        status: 201,
        message: 'Account created successfully',
        result: result,
      };
    }),
});
