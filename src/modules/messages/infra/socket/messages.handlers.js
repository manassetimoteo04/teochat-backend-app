import channelContainer from "../../../channels/infra/containers/channel.contianer";
import messagesContainer from "../containers/messages.container";

export function registerMessageHandlers(io, socket) {
  socket.on(
    "message:send",
    async ({ tempId, channelId, content, type = "text" }) => {
      if (!channelId || !content) {
        return socket.emit("message:sent-error", {
          tempId,
          reason: "INVALID_PAYLOAD",
          message: "Dados inválidos",
        });
      }

      if (!socket.rooms.has(channelId)) {
        return socket.emit("message:sent-error", {
          tempId,
          reason: "NOT_IN_CHANNEL",
          message: "Não estás neste channel",
        });
      }

      try {
        const newMessage = await messagesContainer.sendMessage.execute({
          channelId,
          content,
          type,
          senderId: socket.user.id,
        });

        socket.to(channelId).emit("message:new", newMessage);

        socket.emit("message:sent", {
          tempId,
          message: newMessage,
        });

        const channel =
          await channelContainer.getChannelById.execute(channelId);

        const updatedChannel = {
          id: channel.id,
          name: channel.name,
          teamId: channel.teamId,
          lastMessage: {
            senderId: newMessage.senderId.id,
            name: newMessage.senderId.name,
            content: newMessage.content,
            type: newMessage.type,
            date: newMessage.createdAt,
          },
        };

        socket.to(channelId).emit("channel:new-msg", updatedChannel);

        socket.emit("channel:new-msg-sent", updatedChannel);
      } catch (error) {
        console.error("❌ Erro ao enviar mensagem:", error);

        socket.emit("message:sent-error", {
          tempId,
          reason: "SERVER_ERROR",
          message: "Mensagem falhou",
        });
      }
    },
  );
}
