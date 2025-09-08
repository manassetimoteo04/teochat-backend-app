import agenda from "../../../../configs/agenda.js";
import eventRemindersJob from "../../../events/infrastructure/jobs/event-reminders.job.js";

export async function startAgendaJobs() {
  eventRemindersJob(agenda);
  await agenda.start();
}
