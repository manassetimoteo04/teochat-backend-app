import Event from "../models/events.model.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/send.email.js";
import { upcomingEventTemplate } from "../utils/helpers/generate.emails.js";

export default (agenda) => {
  agenda.define("sendEventReminders", async (job) => {
    const { eventId, participants, teamName, companyName } = job.attrs.data;
    const event = await Event.findById(eventId);

    if (!event) return console.log(`❌ Evento ${eventId} não encontrado.`);
    for (const participant of participants) {
      const user = await User.findById(participant);

      if (!user) return console.log(`❌ Evento ${eventId} não encontrado.`);
      const email = {
        to: user.email,
        subject: event.title,
        html: upcomingEventTemplate({
          companyName,
          teamName,
          userData: event,
          eventName: event.title,
          eventDate: new Date(event.start).toDateString(),
          eventTime: new Date(event.start).toTimeString(),
          eventLink: `http://localhost:5173/events/${eventId}`,
        }),
      };

      await sendEmail(email);
    }
  });
};
