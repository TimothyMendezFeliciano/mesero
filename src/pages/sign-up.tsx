import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa6';
import { signIn } from 'next-auth/react';
import Markdown from 'react-markdown';
import { PrivacyPolicy } from '../constants/PrivacyPolicy';
import { TermsOfService } from '../constants/TermsOfService';
import { getServerSession, Session } from 'next-auth';
import { nextAuthOptions } from './api/auth/[...nextauth]';

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => {
  const session1: Session | null = await getServerSession(
    ctx.req,
    ctx.res,
    nextAuthOptions,
  );

  console.log('Do we have a session?', session1);

  if (session1?.user?.isActive) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: JSON.stringify(session1),
    },
  };
};

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Mesero App - Registro</title>
        <meta name={'description'} content={'Sign Up page'} />
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>

      <main className="flex flex-col items-center justify-center h-screen w-full p-4">
        <form
          className="flex items-center justify-center w-full mb-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Registrate con Mesero!</h2>
              <div className="card-actions items-center justify-between flex-col space-y-2">
                <button
                  className="btn btn-secondary flex items-center w-full"
                  onClick={() => signIn('google')}
                >
                  <FcGoogle size={24} className="mr-2" />
                  Registra con Google
                </button>
                <button
                  className="btn btn-secondary flex items-center w-full"
                  onClick={() => signIn('facebook')}
                >
                  <FaFacebook size={24} color={'blue'} className="mr-2" />
                  Registra con Facebook
                </button>
                <Link href={'/'} className="link w-full text-center">
                  Ir a Pagina Principal
                </Link>
                <button className="btn btn-secondary w-full" type={'submit'}>
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className={'flex flex-row justify-between gap-4'}>
          <div className="max-w-3xl w-full h-96 overflow-y-scroll p-4 bg-white shadow-xl">
            <Markdown>{PrivacyPolicy}</Markdown>
          </div>
          <div className="max-w-3xl w-full h-96 overflow-y-scroll p-4 bg-white shadow-xl">
            <Markdown>{TermsOfService}</Markdown>
          </div>
        </div>
      </main>
    </>
  );
};

export default SignUp;
