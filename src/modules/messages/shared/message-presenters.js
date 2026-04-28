export function buildMessagePreview(message) {
  if (message.type === "image") return "Enviou uma imagem";
  if (message.type === "file") {
    return message.attachment?.fileName || "Enviou um ficheiro";
  }

  return message.content;
}

export function buildChannelLastMessage(message) {
  return {
    sent: message.senderId.id,
    senderId: message.senderId.id,
    name: message.senderId.name,
    content: buildMessagePreview(message),
    type: message.type,
    date: message.createdAt,
    attachment: message.attachment
      ? {
          kind: message.attachment.kind,
          fileName: message.attachment.fileName,
          secureUrl: message.attachment.secureUrl,
          mimeType: message.attachment.mimeType,
        }
      : null,
  };
}

export function buildChannelRealtimePayload(channel, message) {
  return {
    id: channel.id,
    name: channel.name,
    teamId: channel.teamId,
    lastMessage: buildChannelLastMessage(message),
  };
}
