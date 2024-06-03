import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa6';
import { signIn } from 'next-auth/react';

const SignUp: NextPage = () => {

  return (
    <>
      <Head>
        <title>Mesero App - Registro</title>
        <meta name={'description'} content={'Sign Up page'} />
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>

      <main>
        <form
          className={'flex items-center justify-center h-screen w-full'}
          onSubmit={(event)=>event.preventDefault()}
        >
          <div className={'card w-96 bg-base-100 shadow-xl'}>
            <div className={'card-body'}>
              <h2 className={'card-title'}>Registrate con Mesero!</h2>
              {/*TODO: Create Privacy Policy and Terms of Service*/}
              <div className={'card-actions items-center justify-between'}>
                <button
                  className={'btn btn-secondary'}
                  onClick={() => signIn('google')}
                >
                  <FcGoogle size={24} />
                  Registra con Google
                </button>
                <button
                  className={'btn btn-secondary'}
                  onClick={() => signIn('facebook')}
                >
                  <FaFacebook size={24} color={'blue'} />
                  Registra con Facebook
                </button>
                <Link href={'/'} className={'link'}>
                  Ir a Pagina Principal
                </Link>
                <button className={'btn btn-secondary'} type={'submit'}>
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default SignUp;
