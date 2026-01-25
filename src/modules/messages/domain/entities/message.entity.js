export class Message {
  constructor({
    id,
    channelId,
    senderId,
    content,
    type,
    status,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.channelId = channelId;
    this.senderId = senderId;
    this.content = content;
    this.type = type;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
