export class UserCreatedEvent {
  constructor(payload) {
    this.name = "UserCreated";
    this.payload = payload;
    this.occurredAt = new Date();
  }
}
