export class TaskDueReminderEvent {
  constructor(payload) {
    this.payload = payload;
    this.name = "TaskDueReminder";
    this.occurredAt = new Date();
  }
}
