export function registerMessageHandlers(io, socket) {
  socket.on("message:send", async ({ channelId, content, type = "text" }) => {
    if (!channelId || !content) return;

    if (!socket.rooms.has(channelId)) {
      return socket.emit("message:error", {
        message: "Não estás neste channel",
      });
    }

    const message = {
      id: crypto.randomUUID(),
      channelId,
      content,
      type,
      senderId: socket.user.id,
      createdAt: new Date().toISOString(),
    };

    socket.to(channelId).emit("message:new", message);

    socket.emit("message:sent", message);
  });
}
