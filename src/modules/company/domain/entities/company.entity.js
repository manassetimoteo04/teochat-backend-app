export class CompanyEntity {
  constructor({
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
    return this.members.some((id) => userId === id);
  }
}
