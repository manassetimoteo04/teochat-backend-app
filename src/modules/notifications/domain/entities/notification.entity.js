export class NotificationEntity {
  constructor({
    id,
    userId,
    type,
    category = "account",
    title,
    message,
    status = "unread",
    action = null,
    actor = null,
    entity = null,
    metadata = {},
    readAt = null,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.userId = userId;
    this.type = type;
    this.category = category;
    this.title = title;
    this.message = message;
    this.status = status;
    this.action = action;
    this.actor = actor;
    this.entity = entity;
    this.metadata = metadata;
    this.readAt = readAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
