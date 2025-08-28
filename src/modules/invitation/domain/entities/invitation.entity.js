export class InvitationEntity {
  constructor({
    id,
    destination,
    expiresIn,
    createdBy,
    company,
    accepted,
    canceled = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.id = id;
    this.destination = destination;
    this.expiresIn = expiresIn;
    this.createdBy = createdBy;
    this.company = company;
    this.canceled = canceled;
    this.accepted = accepted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  isDestination(email) {
    return email === this.destination;
  }
  isAccepted() {
    return this.accepted;
  }
  isCanceled() {
    return this.canceled;
  }
}
