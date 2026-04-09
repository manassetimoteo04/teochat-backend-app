export class TaskCompletedEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "TaskCompleted";
    this.occurredAt = new Date();
  }
}
