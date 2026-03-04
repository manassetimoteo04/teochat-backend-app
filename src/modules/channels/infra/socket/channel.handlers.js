import teamContainer from "../../../teams/infrastructure/container/team-container";
import channelContainer from "../containers/channel.contianer";

function emitAck(ack, payload) {
  if (typeof ack === "function") ack(payload);
}

export function registerChannelHandlers(io, socket) {
  socket.on("channel:join", async ({ companyId }, ack) => {
    try {
      if (!companyId) {
        const errorPayload = {
          ok: false,
          reason: "INVALID_PAYLOAD",
          message: "companyId é obrigatório",
        };
        socket.emit("channel:error", errorPayload);
        emitAck(ack, errorPayload);
        return;
      }

      console.log("JOINING COMPANY CHANNELS", companyId);

      if (!socket.data.joinedChannels) {
        socket.data.joinedChannels = [];
      }

      const teams = await teamContainer.findTeamsByUserId.execute({
        userId: socket.user.id,
        companyId,
      });

      if (!teams?.length) {
        const payload = { ok: true, channels: [] };
        socket.emit("channel:joined", payload);
        emitAck(ack, payload);
        return;
      }

      const channels = await channelContainer.listChannelByTeamIds.execute(
        teams.map((t) => t.id),
      );

      if (!channels?.length) {
        const payload = { ok: true, channels: [] };
        socket.emit("channel:joined", payload);
        emitAck(ack, payload);
        return;
      }

      for (const channel of channels) {
        socket.join(channel.id);
        if (!socket.data.joinedChannels.includes(channel.id)) {
          socket.data.joinedChannels.push(channel.id);
        }

        console.log(`User ${socket.user.id} entrou no channel ${channel.id}`);

        socket.to(channel.id).emit("channel:user-joined", {
          userId: socket.user.id,
          channelId: channel.id,
        });
      }

      const payload = {
        ok: true,
        channels: socket.data.joinedChannels,
      };
      socket.emit("channel:joined", payload);
      emitAck(ack, payload);
    } catch (err) {
      console.error("CHANNEL JOIN ERROR:", err);
      const errorPayload = {
        ok: false,
        reason: "SERVER_ERROR",
        message: "Erro ao entrar nos canais",
      };
      socket.emit("channel:error", errorPayload);
      emitAck(ack, errorPayload);
    }
  });

  socket.on("channel:leave", (_, ack) => {
    if (!socket.data.joinedChannels?.length) {
      emitAck(ack, { ok: true, channels: [] });
      return;
    }

    for (const channelId of socket.data.joinedChannels) {
      socket.leave(channelId);

      console.log(`User ${socket.user.id} saiu do channel ${channelId}`);

      socket.to(channelId).emit("channel:user-left", {
        userId: socket.user.id,
        channelId,
      });
    }

    socket.data.joinedChannels = [];
    emitAck(ack, { ok: true, channels: [] });
  });
}
