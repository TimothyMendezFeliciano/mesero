"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = __importDefault(require("next"));
const node_http_1 = require("node:http");
const node_url_1 = require("node:url");
const ws_1 = require("ws");
const ws_2 = require("@trpc/server/adapters/ws");
const context_1 = require("./context");
const _app_1 = require("./routers/_app");
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
void app.prepare().then(() => {
    const server = (0, node_http_1.createServer)(async (req, res) => {
        if (!req.url)
            return;
        const parsedUrl = (0, node_url_1.parse)(req.url, true);
        await handle(req, res, parsedUrl);
    });
    const wss = new ws_1.WebSocketServer({ server });
    const handler = (0, ws_2.applyWSSHandler)({ wss, router: _app_1.appRouter, createContext: context_1.createContext });
    process.on('SIGTERM', () => {
        console.log('SIGTERM');
        handler.broadcastReconnectNotification();
    });
    server.on('upgrade', (req, socket, head) => {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit('connection', ws, req);
        });
    });
    server.listen(port);
    console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
});
