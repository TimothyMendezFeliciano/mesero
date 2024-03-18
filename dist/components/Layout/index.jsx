"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Header_1 = __importDefault(require("../Header"));
const Footer_1 = __importDefault(require("../Footer"));
function Layout({ children }) {
    return (<>
      <Header_1.default />
      <div className="bg-white">
        <div className="relative isolate pt-4">
          <svg className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" aria-hidden="true">
            <defs>
              <pattern id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527" width={200} height={200} x="50%" y={-1} patternUnits="userSpaceOnUse">
                <path d="M100 200V.5M.5 .5H200" fill="none"/>
              </pattern>
            </defs>
            <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
              <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth={0}/>
            </svg>
            <rect width="100%" height="100%" strokeWidth={0} fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"/>
          </svg>
          {children}
        </div>
      </div>
      <Footer_1.default />
    </>);
}
exports.default = Layout;
