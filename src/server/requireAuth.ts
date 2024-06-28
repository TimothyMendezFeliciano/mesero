import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import { nextAuthOptions } from '../pages/api/auth/[...nextauth]';

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session1: Session | null = await getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions,
    );

    console.log('Session Auth', session1);

    if (!session1) {
      return {
        redirect: {
          destination: '/', // Home Page,
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
