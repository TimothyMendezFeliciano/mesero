"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const react_1 = require("next-auth/react");
const fc_1 = require("react-icons/fc");
const SignUp = () => {
    return (<>
      <head_1.default>
        <title>Mesero App - Registro</title>
        <meta name={'description'} content={'Sign Up page'}/>
        <link rel={'icon'} href={'/favicon.ico'}/>
      </head_1.default>

      <main>
        <form className={'flex items-center justify-center h-screen w-full'}>
          <div className={'card w-96 bg-base-100 shadow-xl'}>
            <div className={'card-body'}>
              <h2 className={'card-title'}>Registrate con Mesero!</h2>
              {/*<input*/}
              {/*  type={'text'}*/}
              {/*  placeholder={'Ingrese su nombre de usuario'}*/}
              {/*  className={'input input-bordered w-full max-w-xs my-2'}*/}
              {/*  {...register('username')}*/}
              {/*/>*/}
              {/*<input*/}
              {/*  type={'email'}*/}
              {/*  placeholder={'Ingrese su correo electronico'}*/}
              {/*  className={'input input-bordered w-full max-w-xs my-2'}*/}
              {/*  {...register('email')}*/}
              {/*/>*/}
              {/*<input*/}
              {/*  type={'password'}*/}
              {/*  placeholder={'Ingrese su contraseña'}*/}
              {/*  className={'input input-bordered w-full max-w-xs my-2'}*/}
              {/*  {...register('password')}*/}
              {/*/>*/}
              <div className={'card-actions items-center justify-between'}>
                <button className={'btn btn-secondary'} onClick={() => (0, react_1.signIn)('google')}>
                  <fc_1.FcGoogle size={24}/>
                  Registra con Google
                </button>
                <link_1.default href={'/'} className={'link'}>
                  Ir a Pagina Principal
                </link_1.default>
                {/*<button className={'btn btn-secondary'} type={'submit'}>*/}
                {/*  Registrar*/}
                {/*</button>*/}
              </div>
            </div>
          </div>
        </form>
      </main>
    </>);
};
exports.default = SignUp;
