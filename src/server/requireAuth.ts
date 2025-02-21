import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import { nextAuthOptions } from '../pages/api/auth/[...nextauth]';
import { UserType } from '@prisma/client';

export const requireAuth =
  (func: GetServerSideProps) => async (ctx: GetServerSidePropsContext) => {
    const session1: Session | null = await getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions,
    );
    console.log('Chicken Session To Save', session1);

    if (!session1) {
      return {
        redirect: {
          destination: '/', // Home Page,
          permanent: false,
        },
      };
    }

    if (session1.user.role === UserType.OWNER && !session1.user.isActive) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    }

    if (
      session1.user.role === UserType.OWNER &&
      session1.user.isActive &&
      ctx.resolvedUrl === '/dashboard'
    ) {
      return {
        redirect: {
          destination: '/dashboard/admin',
          permanent: false,
        },
      };
    }

    if (
      session1.user.role === UserType.EMPLOYEE &&
      session1.user.isActive &&
      ctx.resolvedUrl === '/dashboard/employee'
    ) {
      return {
        redirect: {
          destination: '/dashboard/admin',
          permanent: false,
        },
      };
    }

    return await func(ctx);
  };
