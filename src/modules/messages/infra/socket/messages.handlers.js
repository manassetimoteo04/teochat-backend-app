import channelContainer from "../../../channels/infra/containers/channel.contianer.js";
import messagesContainer from "../containers/messages.container.js";
import { buildChannelRealtimePayload } from "../../shared/message-presenters.js";

const MESSAGE_RETRY_WINDOW_MS = 5 * 60 * 1000;
const MAX_MESSAGE_SIZE = 4000;
const dedupeCache = new Map();

function emitAck(ack, payload) {
  if (typeof ack === "function") ack(payload);
}

function buildMessageKey(userId, channelId, tempId) {
  return `${userId}:${channelId}:${tempId}`;
}

function getCachedMessage(userId, channelId, tempId) {
  const key = buildMessageKey(userId, channelId, tempId);
  const cached = dedupeCache.get(key);
  if (!cached) return null;
  if (cached.expiresAt <= Date.now()) {
    dedupeCache.delete(key);
    return null;
  }

  return cached.message;
}

function setCachedMessage(userId, channelId, tempId, message) {
  if (dedupeCache.size > 5000) {
    const now = Date.now();
    for (const [key, value] of dedupeCache) {
      if (value.expiresAt <= now) dedupeCache.delete(key);
    }
  }

  const key = buildMessageKey(userId, channelId, tempId);
  dedupeCache.set(key, {
    message,
    expiresAt: Date.now() + MESSAGE_RETRY_WINDOW_MS,
  });
}

export function registerMessageHandlers(io, socket) {
  socket.on(
    "message:send",
    async ({ tempId, channelId, content, type = "text", attachment = null }, ack) => {
      const trimmed = typeof content === "string" ? content.trim() : "";

      if (!channelId || (!content && !attachment)) {
        const errorPayload = {
          ok: false,
          tempId,
          reason: "INVALID_PAYLOAD",
          message: "Dados inválidos",
        };
        socket.emit("message:sent-error", errorPayload);
        emitAck(ack, errorPayload);
        return;
      }

      if (!tempId) {
        const errorPayload = {
          ok: false,
          reason: "INVALID_PAYLOAD",
          message: "tempId é obrigatório",
        };
        socket.emit("message:sent-error", errorPayload);
        emitAck(ack, errorPayload);
        return;
      }

      if ((!trimmed && !attachment) || trimmed.length > MAX_MESSAGE_SIZE) {
        const errorPayload = {
          ok: false,
          tempId,
          reason: "INVALID_CONTENT",
          message: "Conteúdo inválido",
        };
        socket.emit("message:sent-error", errorPayload);
        emitAck(ack, errorPayload);
        return;
      }

      if (!socket.rooms.has(channelId)) {
        const errorPayload = {
          ok: false,
          tempId,
          reason: "NOT_IN_CHANNEL",
          message: "Não estás neste channel",
        };
        socket.emit("message:sent-error", errorPayload);
        emitAck(ack, errorPayload);
        return;
      }

      const cachedMessage = getCachedMessage(socket.user.id, channelId, tempId);
      if (cachedMessage) {
        const successPayload = {
          ok: true,
          deduplicated: true,
          tempId,
          message: cachedMessage,
        };
        socket.emit("message:sent", {
          tempId,
          message: cachedMessage,
          deduplicated: true,
        });
        emitAck(ack, successPayload);
        return;
      }

      try {
        const newMessage = await messagesContainer.sendMessage.execute({
          channelId,
          content: trimmed,
          type,
          attachment,
          senderId: socket.user.id,
        });

        socket.to(channelId).emit("message:new", newMessage);

        socket.emit("message:sent", {
          tempId,
          message: newMessage,
        });

        const channel = newMessage.channel || await channelContainer.getChannelById.execute(channelId);
        const updatedChannel = buildChannelRealtimePayload(channel, newMessage);

        socket.to(channelId).emit("channel:new-msg", updatedChannel);

        socket.emit("channel:new-msg-sent", updatedChannel);

        setCachedMessage(socket.user.id, channelId, tempId, newMessage);

        emitAck(ack, {
          ok: true,
          tempId,
          message: newMessage,
        });
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);

        const errorPayload = {
          ok: false,
          tempId,
          reason: "SERVER_ERROR",
          message: "Mensagem falhou",
        };
        socket.emit("message:sent-error", errorPayload);
        emitAck(ack, errorPayload);
      }
    },
  );

  socket.on(
    "message:history",
    async ({ channelId, cursor, limit = 30 }, ack) => {
      try {
        if (!channelId) {
          emitAck(ack, {
            ok: false,
            reason: "INVALID_PAYLOAD",
            message: "channelId é obrigatório",
          });
          return;
        }

        if (!socket.rooms.has(channelId)) {
          emitAck(ack, {
            ok: false,
            reason: "NOT_IN_CHANNEL",
            message: "Não estás neste channel",
          });
          return;
        }

        const data = await messagesContainer.listMessages.execute({
          channelId,
          cursor,
          limit: Math.min(Math.max(Number(limit) || 30, 1), 100),
        });

        emitAck(ack, {
          ok: true,
          data,
        });
      } catch (error) {
        console.error("MESSAGE HISTORY ERROR:", error);
        emitAck(ack, {
          ok: false,
          reason: "SERVER_ERROR",
          message: "Não foi possível sincronizar mensagens",
        });
      }
    },
  );
}
