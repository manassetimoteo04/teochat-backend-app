export class TaskCreatedEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "TaskCreated";
    this.occurredAt = new Date();
  }
}
