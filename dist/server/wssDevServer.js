"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const _app_1 = require("./routers/_app");
const ws_1 = require("@trpc/server/adapters/ws");
const ws_2 = require("ws");
const wss = new ws_2.WebSocketServer({
    port: 3001,
});
const handler = (0, ws_1.applyWSSHandler)({ wss, router: _app_1.appRouter, createContext: context_1.createContext });
wss.on('connection', (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once('close', () => {
        console.log(`➖➖ Connection (${wss.clients.size})`);
    });
});
console.log('✅ WebSocket Server listening on ws://localhost:3001');
process.on('SIGTERM', () => {
    console.log('SIGTERM');
    handler.broadcastReconnectNotification();
    wss.close();
});
