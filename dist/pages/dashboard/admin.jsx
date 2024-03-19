"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
const react_1 = require("next-auth/react");
const requireAuth_1 = require("../../server/requireAuth");
exports.getServerSideProps = (0, requireAuth_1.requireAuth)(async () => {
    return { props: {} };
});
const Admin = () => {
    const { data } = (0, react_1.useSession)();
    return (<div className="hero min-h-screen bg-base-200">
      <div className="hero-content">
        <div className="max-w-lg">
          <h1 className="text-5xl text-center font-bold leading-snug text-gray-400">
            Te has registrado!
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
            <button className="btn btn-secondary" onClick={() => (0, react_1.signOut)({ callbackUrl: '/' })}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>);
};
exports.default = Admin;
