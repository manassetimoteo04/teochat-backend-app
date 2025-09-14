import eventContainer from "../container/event-container.js";

export default function eventRemindersJob(agenda) {
  agenda.define("sendEventReminders", async (job) => {
    const { eventId } = job.attrs.data;
    await eventContainer.sendEventReminders.execute({ eventId });
  });
}
