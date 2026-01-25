import ChannelEntity from "../../domain/entities/channel.entity";

export default class ChannelMapper {
  static toEntity(doc) {
    if (!doc) return null;

    return new ChannelEntity({
      id: doc._id.toString(),
      teamId: doc.teamId.toString(),
      name: doc.name,
      description: doc.description,
      createdBy: doc.createdBy.toString(),
      isArchived: doc.isArchived,
      createdAt: doc.createdAt,
      lastMessage: doc.lastMessage
        ? {
            sent: doc.lastMessage.sent,
            name: doc.lastMessage.name,
            date: doc.lastMessage.date,
            content: doc.lastMessage.content,
            type: doc.lastMessage.type,
          }
        : null,
      updatedAt: doc.updatedAt,
    });
  }

  static toPersistence(entity) {
    return {
      teamId: entity.teamId,
      name: entity.name,
      description: entity.description,
      createdBy: entity.createdBy,
      isArchived: entity.isArchived,
      lastMessage: entity.lastMessage
        ? {
            sent: entity.lastMessage.sent,
            name: entity.lastMessage.name,
            date: entity.lastMessage.date,
            content: entity.lastMessage.content,
            type: entity.lastMessage.type,
          }
        : undefined,
    };
  }
}
