export class TaskAssignedEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "TaskAssigned";
    this.occurredAt = new Date();
  }
}
