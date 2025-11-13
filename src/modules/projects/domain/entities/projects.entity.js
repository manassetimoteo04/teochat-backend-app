export class ProjectEntity {
  constructor({
    id,
    name,
    createdAt,
    description,
    createdBy,
    updatedAt,
    tags,
    teamId,
    startDate,
    endDate,
    photo,
  }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.description = description;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.tags = tags;
    this.teamId = teamId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.photo = photo;
  }
  isTeam(teamId) {
    return this.teamId.toString() === teamId;
  }
}
