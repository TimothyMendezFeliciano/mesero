import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { requireAuth } from '../../server/requireAuth';
import Layout from '../../components/Layout';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import DashboardBanner from '../../components/Dashboard/Banner';
import { getServerSession, Session } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]';
import { useMemo } from 'react';
import { ChatRoom } from '../../components/Chat/Room';
import { trpc } from '../../utils/trpc';
import { Restaurant } from '../../models/main';
import ShiftScheduler from '../../components/Mobiscroll/ShiftScheduler';

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

const Admin: NextPage = (props: { session: string }, context) => {
  const session: Session = useMemo(
    () => JSON.parse(props.session),
    [props.session],
  );

  const { data } = trpc.restaurant.getRestaurantByContext.useQuery();

  return (
    <>
      <Layout>
        <DashboardLayout
          TopComponent={
            <DashboardBanner
              admin={session}
              restaurants={data ? (data as Restaurant[]) : []}
            />
          }
          ChatRoom={<ChatRoom />}
          // MainComponent={
          //   <div className={'flex w-full h-full'}>
          //     Here goes the Calendar if I had one!
          //   </div>
          // }
          MainComponent={<ShiftScheduler />}
        />
      </Layout>
    </>
  );
};

export default Admin;
