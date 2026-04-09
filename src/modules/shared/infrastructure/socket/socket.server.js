// src/modules/shared/infrastructure/socket/socket.server.js
import { Server } from "socket.io";
import { socketAuthorize } from "../middlewares/socket.auth.middlewares.js";
import { registerChannelHandlers } from "../../../channels/infra/socket/channel.handlers.js";
import { registerMessageHandlers } from "../../../messages/infra/socket/messages.handlers.js";
import { getUserRoom, setSocketServer } from "../../utils/send.notifications.js";

export function createSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://teochat.vercel.app",
        "http://10.81.230.36:5173",
      ],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    allowUpgrades: true,
    pingInterval: 25000,
    pingTimeout: 60000,
    connectTimeout: 45000,
    maxHttpBufferSize: 1e6,
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: false,
    },
  });

  setSocketServer(io);
  io.use(socketAuthorize);

  io.on("connection", (socket) => {
    const userId = socket.user.id;
    socket.data.userId = userId;
    socket.join(getUserRoom(userId));

    console.log(
      "USER CONNECTED:",
      userId,
      `transport=${socket.conn.transport.name}`,
      `recovered=${socket.recovered}`,
    );

    socket.emit("socket:ready", {
      ok: true,
      recovered: socket.recovered,
      socketId: socket.id,
      serverTime: new Date().toISOString(),
      notificationRoom: getUserRoom(userId),
    });

    registerChannelHandlers(io, socket);
    registerMessageHandlers(io, socket);

    socket.conn.on("upgrade", () => {
      console.log("SOCKET TRANSPORT UPGRADED:", userId, socket.conn.transport.name);
    });

    socket.on("error", (error) => {
      console.error("SOCKET ERROR:", userId, error?.message || error);
    });

    socket.on("disconnect", (reason) => {
      console.log("USER DISCONNECTED:", userId, reason);
    });
  });

  io.engine.on("connection_error", (error) => {
    console.error(
      "SOCKET CONNECTION ERROR:",
      error.code,
      error.message,
      error.context?.name || "",
    );
  });

  return io;
}
