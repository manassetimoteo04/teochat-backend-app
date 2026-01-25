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
    };
  }
}
