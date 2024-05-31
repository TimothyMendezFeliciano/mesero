import { publicProcedure, router } from '../../trpc';
import { signInSchema } from '../../../common/validation/auth';
import { UserType } from '@prisma/client';

export const signInRouter = router({
  createUser: publicProcedure
    .input(signInSchema)
    .mutation(async ({ input, ctx }) => {
      const { userSchema, accountSchema, profileSchema } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email: userSchema.email },
        include: {
          accounts: true,
          sessions: {
            take: 1,
            orderBy: {
              expires: 'desc',
            },
          },
          restaurants: true,
        },
      });

      if (exists) {
        if (exists.sessions[0].expires > Date.now()) {
          return {
            status: 200,
            message: 'Account found',
            result: exists,
          };
        } else {
          const updated = await ctx.prisma.session.create({
            data: {
              id: accountSchema.id_token,
              sessionToken: accountSchema.id_token,
              expires: accountSchema.expires_at,
              user: {
                connect: {
                  email: userSchema.email,
                },
              },
            },
          });

          return {
            status: 200,
            message: 'Session Updated',
            result: updated,
          };
        }
      } else {
        const result = await ctx.prisma.user.create({
          data: {
            email: userSchema.email,
            image: userSchema.image,
            role:
              userSchema.email === process.env.NEXTADMIN_EMAIL
                ? UserType.ADMIN
                : UserType.GUEST,
            accounts: {
              create: {
                ...accountSchema,
              },
            },
            sessions: {
              create: [
                {
                  id: accountSchema.id_token,
                  sessionToken: accountSchema.id_token,
                  expires: accountSchema.expires_at,
                },
              ],
            },
          },
        });

        return {
          status: 201,
          message: 'Account Created Succesfully',
          result: result,
        };
      }
    }),
  // createSession: publicProcedure.input().mutation(),
});
