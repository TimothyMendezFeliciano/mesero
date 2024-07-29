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
import BitNoiseScheduler from '../../components/SchedulerCalendar/BitNoiseScheduler';
import Room from '../../components/Chat/Room';

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
    <>
      <Layout>
        <DashboardLayout
          TopComponent={<DashboardBanner admin={session.user as User} />}
          LeftComponent={<Room />}
          MainComponent={<BitNoiseScheduler />}
        />
      </Layout>
    </>
  );
};

export default Admin;
