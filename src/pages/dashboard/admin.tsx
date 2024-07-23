import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { requireAuth } from '../../server/requireAuth';
import Layout from '../../components/Layout';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DashboardBanner from '../../components/Dashboard/Banner';
import { getServerSession, Session } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';
import { useMemo } from 'react';
import { User } from '../../models/main';

export const getServerSideProps: GetServerSideProps = requireAuth(
  async (ctx: GetServerSidePropsContext) => {
    const session1: Session | null = await getServerSession(
      ctx.req,
      ctx.res,
      nextAuthOptions,
    );
    return {
      props: {
        session: JSON.stringify(session1),
      },
    };
  },
);

const Admin: NextPage = (props, context) => {
  const session: Session = useMemo(
    () => JSON.parse(props.session),
    [props.session],
  );

  return (
    <Layout>
      <DashboardLayout
        TopComponent={<DashboardBanner admin={session.user as User} />}
        LeftComponent={<h1>This is a Left Component</h1>}
        MainComponent={<h1>This is a Main Component</h1>}
      />
    </Layout>
  );
};

export default Admin;
