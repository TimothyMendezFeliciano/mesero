"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trpc = void 0;
const client_1 = require("@trpc/client");
const next_1 = require("@trpc/next");
const config_1 = __importDefault(require("next/config"));
const superjson_1 = __importDefault(require("superjson"));
// ℹ️ Type-only import:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export
const { publicRuntimeConfig } = (0, config_1.default)();
const { APP_URL, WS_URL } = publicRuntimeConfig;
function getEndingLink(ctx) {
    if (typeof window === 'undefined') {
        return (0, client_1.httpBatchLink)({
            url: `${APP_URL}/api/trpc`,
            headers() {
                var _a;
                if (!((_a = ctx === null || ctx === void 0 ? void 0 : ctx.req) === null || _a === void 0 ? void 0 : _a.headers)) {
                    return {};
                }
                // on ssr, forward client's headers to the server
                return {
                    ...ctx.req.headers,
                    'x-ssr': '1',
                };
            },
        });
    }
    const client = (0, client_1.createWSClient)({
        url: WS_URL,
    });
    return (0, client_1.wsLink)({
        client,
    });
}
/**
 * A set of strongly-typed React hooks from your `AppRouter` type signature with `createReactQueryHooks`.
 * @link https://trpc.io/docs/v11/react#3-create-trpc-hooks
 */
exports.trpc = (0, next_1.createTRPCNext)({
    config({ ctx }) {
        /**
         * If you want to use SSR, you need to use the server's full URL
         * @link https://trpc.io/docs/v11/ssr
         */
        return {
            /**
             * @link https://trpc.io/docs/v11/client/links
             */
            links: [
                // adds pretty logs to your console in development and logs errors in production
                (0, client_1.loggerLink)({
                    enabled: (opts) => (process.env.NODE_ENV === 'development' &&
                        typeof window !== 'undefined') ||
                        (opts.direction === 'down' && opts.result instanceof Error),
                }),
                getEndingLink(ctx),
            ],
            /**
             * @link https://trpc.io/docs/v11/data-transformers
             */
            transformer: superjson_1.default,
            /**
             * @link https://tanstack.com/query/v5/docs/reference/QueryClient
             */
            queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
    /**
     * @link https://trpc.io/docs/v11/ssr
     */
    ssr: true,
});
