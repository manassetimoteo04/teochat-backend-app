export function registerChannelHandlers(io, socket) {
  socket.on("channel:join", ({ channelId }) => {
    console.log(channelId);
    if (!channelId) return;

    socket.join(channelId);

    console.log(`User ${socket.user.id} entrou no channel ${channelId}`);

    socket.to(channelId).emit("channel:user-joined", {
      userId: socket.user.id,
    });

    socket.emit("channel:joined", { channelId });
  });

  socket.on("channel:leave", ({ channelId }) => {
    socket.leave(channelId);

    console.log(`User ${socket.user.id} saiu do channel ${channelId}`);

    socket.to(channelId).emit("channel:user-left", {
      userId: socket.user.id,
    });
  });
}
