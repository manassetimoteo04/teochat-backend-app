export class CompanyEntity {
  constructor({
    id,
    name,
    ownerName,
    description,
    members = [],
    industry = [],
    createdBy,
    logo,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.ownerName = ownerName;
    this.members = members;
    this.industry = industry;
    this.createdBy = createdBy;
    this.logo = logo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  isMember(userId) {
    return this.members.some((id) => userId === id.toString());
  }
}
