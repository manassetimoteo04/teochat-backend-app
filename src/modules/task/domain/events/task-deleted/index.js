export class TaskDeletedEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "TaskDeleted";
    this.occurredAt = new Date();
  }
}
