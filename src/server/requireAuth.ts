import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../pages/api/auth/[...nextauth]';

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session = await getServerSession(ctx.req, ctx.res, nextAuthOptions);

    if (!session) {
      return {
        redirect: {
          destination: '/', // Home Page,
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
