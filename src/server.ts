import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config";
import http from "http";
import { Server } from "socket.io";
import { mailWatcher } from "./services";
import { logger } from "./utils";

dotenv.config();
connectDB();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
})
// io.on("connection", (socket) => {
//     socket.on("join", (mailbox: string) => {
//         socket.join(mailbox);
//     })
// })
io.on("connection", (socket) => {
    logger.info(`[Socket] Frontend connected! ID: ${socket.id}`);

    socket.on("join", (mailbox: string) => {
        logger.info(`[Socket] Frontend requested to join room exactly matching: "${mailbox}"`);
        socket.join(mailbox);
    });
});

mailWatcher(io);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    logger.info(`http://localhost:${PORT}`);
});
