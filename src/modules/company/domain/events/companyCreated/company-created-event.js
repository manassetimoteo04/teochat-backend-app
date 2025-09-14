export class CompanyCreatedEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "CompanyCreated";
    this.occuredAt = new Date();
  }
}
