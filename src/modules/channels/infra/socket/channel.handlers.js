import teamContainer from "../../../teams/infrastructure/container/team-container";
import channelContainer from "../containers/channel.contianer";

export function registerChannelHandlers(io, socket) {
  socket.on("channel:join", async ({ companyId }) => {
    try {
      if (!companyId) return;

      console.log("JOINING COMPANY CHANNELS", companyId);

      socket.joinedChannels = [];

      const teams = await teamContainer.findTeamsByUserId.execute({
        userId: socket.user.id,
        companyId,
      });

      if (!teams?.length) return;

      const channels = await channelContainer.listChannelByTeamIds.execute(
        teams.map((t) => t.id),
      );

      if (!channels?.length) return;

      for (const channel of channels) {
        socket.join(channel.id);
        socket.joinedChannels.push(channel.id);

        console.log(`User ${socket.user.id} entrou no channel ${channel.id}`);

        socket.to(channel.id).emit("channel:user-joined", {
          userId: socket.user.id,
          channelId: channel.id,
        });
      }

      socket.emit("channel:joined", {
        channels: socket.joinedChannels,
      });
    } catch (err) {
      console.error("CHANNEL JOIN ERROR:", err);
      socket.emit("channel:error", {
        message: "Erro ao entrar nos canais",
      });
    }
  });

  socket.on("channel:leave", () => {
    if (!socket.joinedChannels?.length) return;

    for (const channelId of socket.joinedChannels) {
      socket.leave(channelId);

      console.log(`User ${socket.user.id} saiu do channel ${channelId}`);

      socket.to(channelId).emit("channel:user-left", {
        userId: socket.user.id,
        channelId,
      });
    }

    socket.joinedChannels = [];
  });
}
