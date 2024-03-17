import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { getServerSession, Session } from 'next-auth';
import { nextAuthOptions } from '../pages/api/auth/[...nextauth]';

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session1: Session | null = await getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions,
    );

    const session2: Session | null = await getSession(ctx);

    console.log('In a bottle', {
      session1,
      session2,
    });

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
