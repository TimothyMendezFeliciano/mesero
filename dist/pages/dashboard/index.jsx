"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
const requireAuth_1 = require("../../server/requireAuth");
const Layout_1 = __importDefault(require("../../components/Layout"));
const HeaderWithThreeColumns_1 = require("../../components/HeaderWithThreeColumns");
exports.getServerSideProps = (0, requireAuth_1.requireAuth)(async (ctx) => {
    return { props: {} };
});
const Dashboard = () => {
    return (<Layout_1.default>
      <div className={'max-w-screen-lg justify-center mx-auto'}>
        <HeaderWithThreeColumns_1.HeaderWithThreeColumns topic={'Precios'} subTopic={'Escoge el plan correcto para usted!'} description={'Eres dueño de un restaurante/negocio? Selecciona la subscripcion en base a la cantidad de empleados que utilizaran la plataforma.'} tiers={HeaderWithThreeColumns_1.tiers}/>
      </div>
    </Layout_1.default>);
};
exports.default = Dashboard;
