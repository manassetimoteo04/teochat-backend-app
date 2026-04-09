export class TaskUpdatedEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "TaskUpdated";
    this.occurredAt = new Date();
  }
}
