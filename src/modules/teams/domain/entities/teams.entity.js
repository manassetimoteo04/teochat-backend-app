export class TeamEntity {
  constructor({
    name,
    id,
    companyId,
    members,
    tags,
    description,
    createdBy,
    photo,
    teamLider,
    agendaId,
    createdAt,
    updatedAt,
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.companyId = companyId;
    this.members = members;
    this.tags = tags;
    this.createdBy = createdBy;
    this.photo = photo;
    this.teamLider = teamLider;
    this.agendaId = agendaId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  isCompany(companyId) {
    return this.companyId.toString() === companyId;
  }
  isMember(memberId) {
    return this.members.some((mem) => mem.toString() === memberId);
  }
  isLider(memberId) {
    return this.teamLider?.id?.toString() === memberId;
  }
}
