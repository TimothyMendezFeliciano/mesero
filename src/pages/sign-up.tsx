import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  accountSchema, ISignInSchema,
  ISignUp,
  profileSchema,
  userSchema,
} from '../common/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '../utils/trpc';
import { useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import * as z from 'zod';
import { signIn } from './api/auth/[...nextauth]';

const SignUp: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ISignUp>({
    resolver: zodResolver(
      z.object({
        userSchema,
        accountSchema,
        profileSchema,
      }),
    ),
  });

  const { mutateAsync } = trpc.signIn.createUser.useMutation();

  const onSubmit = useCallback(
    async (data: ISignInSchema) => {
      const result = await mutateAsync(data);

      if (result.status === 201) {
        router.push('/');
      }
    },
    [mutateAsync, router],
  );

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
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={'card w-96 bg-base-100 shadow-xl'}>
            <div className={'card-body'}>
              <h2 className={'card-title'}>Registrate con Mesero!</h2>
              <input
                type={'text'}
                placeholder={'Ingrese su nombre de usuario'}
                className={'input input-bordered w-full max-w-xs my-2'}
                {...register('username')}
              />
              <input
                type={'email'}
                placeholder={'Ingrese su correo electronico'}
                className={'input input-bordered w-full max-w-xs my-2'}
                {...register('email')}
              />
              <input
                type={'password'}
                placeholder={'Ingrese su contraseña'}
                className={'input input-bordered w-full max-w-xs my-2'}
                {...register('password')}
              />
              <div className={'card-actions items-center justify-between'}>
                <button
                  className={'btn btn-secondary'}
                  onClick={() => signIn('google')}
                >
                  <FcGoogle size={24} />
                  Registra con Google
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
