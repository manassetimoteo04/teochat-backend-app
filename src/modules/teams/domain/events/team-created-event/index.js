export class TeamCreatedEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "TeamCreatedEvent";
    this.occuredAt = new Date();
  }
}
