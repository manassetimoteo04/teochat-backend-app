export class TeamEntity {
  constructor({
    name,
    companyId,
    members,
    tags,
    createdBy,
    photo,
    teamLider,
    agendaId,
    createdAt,
    updatedAt,
  }) {
    this.name = name;
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
}
