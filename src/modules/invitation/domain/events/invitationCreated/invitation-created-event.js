export class InvitationCreatedEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "InvitationCreated";
    this.occuredAt = new Date();
  }
}
