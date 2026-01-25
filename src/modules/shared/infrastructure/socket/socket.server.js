// src/modules/shared/infrastructure/socket/socket.server.js
import { Server } from "socket.io";
import { socketAuthorize } from "../middlewares/socket.auth.middlewares";
import { registerChannelHandlers } from "../../../channels/infra/socket/channel.handlers";
import { registerMessageHandlers } from "../../../messages/infra/socket/messages.handlers";

export function createSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "https://teochat.vercel.app"],
      credentials: true,
    },
  });

  io.use(socketAuthorize);

  io.on("connection", (socket) => {
    console.log("USER CONNECTED:", socket.user.id);

    registerChannelHandlers(io, socket);
    registerMessageHandlers(io, socket);

    socket.on("disconnect", (reason) => {
      console.log("USER DISCONNECTED:", socket.user.id, reason);
    });
  });

  return io;
}
