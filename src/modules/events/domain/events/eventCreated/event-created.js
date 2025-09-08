export class EventCreatedEvent {
  constructor({ payload }) {
    this.name = "EventCreated";
    this.payload = payload;
  }
}
