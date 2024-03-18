"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hook_form_1 = require("react-hook-form");
const auth_1 = require("../common/validation/auth");
const zod_1 = require("@hookform/resolvers/zod");
const react_1 = require("react");
const react_2 = require("next-auth/react");
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const Login = () => {
    const { register, handleSubmit } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(auth_1.loginSchema),
    });
    const onSubmit = (0, react_1.useCallback)(async (data) => {
        await (0, react_2.signIn)('credentials', { ...data, callbackUrl: '/' });
    }, []);
    return (<>
      <head_1.default>
        <title>Mesero App - Login</title>
        <meta name={'description'} content={'Login page'}/>
        <link rel={'icon'} href={'/favicon.ico'}/>
      </head_1.default>

      <main>
        <form className={'flex items-center justify-center h-screen w-full'} onSubmit={handleSubmit(onSubmit)}>
          <div className={'card w-96 bg-base-100 shadow-xl'}>
            <div className={'card-body'}>
              <h2 className={'card-title'}>Haz Login</h2>
              <input type={'email'} placeholder={'Ingrese su correo electronico'} className={'input input-bordered w-full max-w-xs mt-2'} {...register('email')}/>
              <input type={'password'} placeholder={'Ingrese su contraseña'} className={'input input-bordered w-full max-w-xs mt-2'} {...register('password')}/>
              <div className={'card-actions items-center justify-between'}>
                <link_1.default href={'/sign-up'} className={'link'}>
                  Ir a Registro
                </link_1.default>
                <button className={'btn btn-secondary'} type={'submit'}>
                  Ingresar
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>);
};
exports.default = Login;
