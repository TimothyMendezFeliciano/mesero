"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const fc_1 = require("react-icons/fc");
const fa6_1 = require("react-icons/fa6");
const react_1 = require("next-auth/react");
const react_markdown_1 = __importDefault(require("react-markdown"));
const PrivacyPolicy_1 = require("../constants/PrivacyPolicy");
const TermsOfService_1 = require("../constants/TermsOfService");
const SignUp = () => {
    return (<>
      <head_1.default>
        <title>Mesero App - Registro</title>
        <meta name={'description'} content={'Sign Up page'}/>
        <link rel={'icon'} href={'/favicon.ico'}/>
      </head_1.default>

      <main className="flex flex-col items-center justify-center h-screen w-full p-4">
        <form className="flex items-center justify-center w-full mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Registrate con Mesero!</h2>
              <div className="card-actions items-center justify-between flex-col space-y-2">
                <button className="btn btn-secondary flex items-center w-full" onClick={() => (0, react_1.signIn)('google')}>
                  <fc_1.FcGoogle size={24} className="mr-2"/>
                  Registra con Google
                </button>
                <button className="btn btn-secondary flex items-center w-full" onClick={() => (0, react_1.signIn)('facebook')}>
                  <fa6_1.FaFacebook size={24} color={'blue'} className="mr-2"/>
                  Registra con Facebook
                </button>
                <link_1.default href={'/'} className="link w-full text-center">
                  Ir a Pagina Principal
                </link_1.default>
                <button className="btn btn-secondary w-full" type={'submit'}>
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className={'flex flex-row justify-between gap-4'}>
          <div className="max-w-3xl w-full h-96 overflow-y-scroll p-4 bg-white shadow-xl">
            <react_markdown_1.default>{PrivacyPolicy_1.PrivacyPolicy}</react_markdown_1.default>
          </div>
          <div className="max-w-3xl w-full h-96 overflow-y-scroll p-4 bg-white shadow-xl">
            <react_markdown_1.default>{TermsOfService_1.TermsOfService}</react_markdown_1.default>
          </div>
        </div>
      </main>
    </>);
};
exports.default = SignUp;
