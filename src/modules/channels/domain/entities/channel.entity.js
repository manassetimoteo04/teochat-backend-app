export default class ChannelEntity {
  constructor({
    id,
    teamId,
    name,
    description,
    createdBy,
    isArchived = false,
    createdAt,
    updatedAt,
    lastMessage,
  }) {
    this.id = id;
    this.teamId = teamId;
    this.name = name;
    this.description = description;
    this.createdBy = createdBy;
    this.lastMessage = lastMessage;
    this.isArchived = isArchived;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.validate();
  }

  validate() {
    if (!this.teamId) {
      throw new Error("Channel must have a teamId");
    }

    if (!this.name || this.name.trim().length === 0) {
      throw new Error("Channel name is required");
    }

    if (!this.createdBy) {
      throw new Error("Channel must have a creator");
    }
  }

  archive() {
    this.isArchived = true;
  }
}
