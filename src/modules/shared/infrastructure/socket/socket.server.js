// src/modules/shared/infrastructure/socket/socket.server.js
import { Server } from "socket.io";
import { socketAuthorize } from "../middlewares/socket.auth.middlewares";
import { registerChannelHandlers } from "../../../channels/infra/socket/channel.handlers";

export function createSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.use(socketAuthorize);

  io.on("connection", (socket) => {
    registerChannelHandlers(io, socket);
    // registerMessageHandlers(io, socket);
  });

  return io;
}
