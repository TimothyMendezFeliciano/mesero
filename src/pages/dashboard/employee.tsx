import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { requireAuth } from '../../server/requireAuth';
import Layout from '../../components/Layout';

export const getServerSideProps = requireAuth(async () => {
  return { props: {} };
});

const Employee: NextPage = () => {
  const { data } = useSession();
  return (
    <Layout>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content">
          <div className="max-w-lg">
            <h1 className="text-5xl text-center font-bold leading-snug text-gray-400">
              Eres un empleado!
            </h1>
            <p className="my-4 text-center leading-loose">
              Has logrado accesar esta pagina por que te registrastes. De lo
              contrario, serias dirigido hacia la pagina inicial.
            </p>
            <div className="my-4 bg-gray-700 rounded-lg p-4">
              <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            </div>
            <div className="text-center">
              <button
                className="btn btn-secondary"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Employee;
