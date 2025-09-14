import agenda from "../../../../configs/agenda.js";
import eventRemindersJob from "../../../events/infrastructure/jobs/event-reminders.job.js";
import invitationsJobs from "../../../invitation/infrastructure/jobs/invitations.job.js";

export async function startAgendaJobs() {
  eventRemindersJob(agenda);
  invitationsJobs(agenda);
  await agenda.start();
}
