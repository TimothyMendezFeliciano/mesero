import { requireAuth } from '../../server/requireAuth';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import {
  HeaderWithThreeColumns,
  tiers,
} from '../../components/HeaderWithThreeColumns';

export const getServerSideProps = requireAuth(
  async (ctx: GetServerSidePropsContext) => {
    return { props: {} };
  },
);

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <div className={'max-w-screen-lg justify-center mx-auto'}>
        <HeaderWithThreeColumns
          topic={'Precios'}
          subTopic={'Escoge el plan correcto para usted!'}
          description={
            'Eres dueño de un restaurante/negocio? Selecciona la subscripcion en base a la cantidad de empleados que utilizaran la plataforma.'
          }
          tiers={tiers}
        />
      </div>
    </Layout>
  );
};
export default Dashboard;
