import { publicProcedure, router } from '../../trpc';
import { signInSchema } from '../../../common/validation/auth';
import { createUser, userExists } from '../../../controllers/User.Controller';
import { createSession } from '../../../controllers/Session.Controller';

export const signInRouter = router({
  createUser: publicProcedure
    .input(signInSchema)
    .mutation(async ({ input, ctx }) => {
      const { userSchema, accountSchema } = input;

      const exists = await userExists(userSchema, ctx);

      if (exists) {
        if (exists.sessions[0].expires > Date.now()) {
          return {
            status: 200,
            message: 'Account found',
            result: exists,
          };
        } else {

          const updated = await createSession(userSchema, accountSchema, ctx);

          return {
            status: 200,
            message: 'Session Updated',
            result: updated,
          };
        }
      } else {
        const result = await createUser(userSchema, accountSchema, ctx);

        return {
          status: 201,
          message: 'Account Created Successfully',
          result: result,
        };
      }
    }),
});