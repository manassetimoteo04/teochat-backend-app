export function buildMessagePreview(message) {
  if (message.type === "image") return "Enviou uma imagem";

  if (message.type === "mixed" || message.type === "file") {
    const files = message.files ?? [];
    if (files.length === 0) return message.content || "Enviou um ficheiro";

    const images = files.filter((f) => f.mimeType?.startsWith("image/"));
    const others = files.filter((f) => !f.mimeType?.startsWith("image/"));

    if (others.length > 0) return others[0].name || "Enviou um ficheiro";
    if (images.length > 0)
      return images.length === 1
        ? "Enviou uma imagem"
        : `Enviou ${images.length} imagens`;
  }

  return message.content;
}

export function buildChannelLastMessage(message) {
  const files = message.files ?? [];

  return {
    sent: message.senderId.id,
    senderId: message.senderId.id,
    name: message.senderId.name,
    content: buildMessagePreview(message),
    type: message.type,
    date: message.createdAt,

    files: files.map((f) => ({
      name: f.name,
      size: f.size,
      mimeType: f.mimeType,
      url: f.url ?? f.secureUrl ?? null,
    })),
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
