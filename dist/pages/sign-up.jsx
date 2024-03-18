"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const react_hook_form_1 = require("react-hook-form");
const auth_1 = require("../common/validation/auth");
const zod_1 = require("@hookform/resolvers/zod");
const trpc_1 = require("../utils/trpc");
const react_1 = require("react");
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const SignUp = () => {
    const router = (0, router_1.useRouter)();
    const { register, handleSubmit } = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(auth_1.signUpSchema),
    });
    const { mutateAsync } = trpc_1.trpc.signUp.createUser.useMutation();
    const onSubmit = (0, react_1.useCallback)(async (data) => {
        const result = await mutateAsync(data);
        if (result.status === 201) {
            router.push('/');
        }
    }, [mutateAsync, router]);
    return (<>
      <head_1.default>
        <title>Mesero App - Registro</title>
        <meta name={'description'} content={'Sign Up page'}/>
        <link rel={'icon'} href={'/favicon.ico'}/>
      </head_1.default>

      <main>
        <form className={'flex items-center justify-center h-screen w-full'} onSubmit={handleSubmit(onSubmit)}>
          <div className={'card w-96 bg-base-100 shadow-xl'}>
            <div className={'card-body'}>
              <h2 className={'card-title'}>Registrate con Mesero!</h2>
              <input type={'text'} placeholder={'Ingrese su nombre de usuario'} className={'input input-bordered w-full max-w-xs my-2'} {...register('username')}/>
              <input type={'email'} placeholder={'Ingrese su correo electronico'} className={'input input-bordered w-full max-w-xs my-2'} {...register('email')}/>
              <input type={'password'} placeholder={'Ingrese su contraseña'} className={'input input-bordered w-full max-w-xs my-2'} {...register('password')}/>
              <div className={'card-actions items-center justify-between'}>
                <link_1.default href={'/login'} className={'link'}>
                  Acceder Login
                </link_1.default>
                <button className={'btn btn-secondary'} type={'submit'}>
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>);
};
exports.default = SignUp;
