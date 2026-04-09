import agenda from "../../../../configs/agenda.js";
import eventRemindersJob from "../../../events/infrastructure/jobs/event-reminders.job.js";
import invitationsJobs from "../../../invitation/infrastructure/jobs/invitations.job.js";
import createUpcomingVideoCallsJob, {
  CREATE_UPCOMING_VIDEO_CALLS_JOB,
} from "../../../meetings/infrastructure/jobs/create-upcoming-video-calls.job.js";
import taskDueRemindersJob, {
  TASK_DUE_REMINDERS_JOB,
} from "../../../task/infrastructure/jobs/task-due-reminders.job.js";

export async function startAgendaJobs() {
  eventRemindersJob(agenda);
  invitationsJobs(agenda);
  createUpcomingVideoCallsJob(agenda);
  taskDueRemindersJob(agenda);
  console.log("Starting Agenda Jobs...");
  await agenda.start();
  await agenda.every("10 seconds", CREATE_UPCOMING_VIDEO_CALLS_JOB);
  await agenda.every("5 minutes", TASK_DUE_REMINDERS_JOB);
}
