import taskContainer from "../container/task-container.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";

export const TASK_DUE_REMINDERS_JOB = "task-due-reminders";

export default function taskDueRemindersJob(agenda) {
  agenda.define(TASK_DUE_REMINDERS_JOB, async () => {
    await taskContainer.sendTaskDueReminders.execute({ eventBus });
  });
}
