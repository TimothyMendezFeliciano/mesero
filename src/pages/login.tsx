import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { ILogin, loginSchema } from '../common/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn('credentials', { ...data, callbackUrl: '/' });
  }, []);

  return (
    <>
      <Head>
        <title>Mesero App - Login</title>
        <meta name={'description'} content={'Login page'} />
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>

      <main>
        <form
          className={'flex items-center justify-center h-screen w-full'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={'card w-96 bg-base-100 shadow-xl'}>
            <div className={'card-body'}>
              <h2 className={'card-title'}>Haz Login</h2>
              <input
                type={'email'}
                placeholder={'Ingrese su correo electronico'}
                className={'input input-bordered w-full max-w-xs mt-2'}
                {...register('email')}
              />
              <input
                type={'password'}
                placeholder={'Ingrese su contraseña'}
                className={'input input-bordered w-full max-w-xs mt-2'}
                {...register('password')}
              />
              <div className={'card-actions items-center justify-between'}>
                <Link href={'/sign-up'} className={'link'}>
                  Ir a Registro
                </Link>
                <button className={'btn btn-secondary'} type={'submit'}>
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;
