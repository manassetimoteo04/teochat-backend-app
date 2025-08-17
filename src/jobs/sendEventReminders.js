import { text } from "express";
import Event from "../models/events.model.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/send.email.js";
import { generateEmailTemplate } from "../utils/helpers/generate.emails.js";

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
        html: generateEmailTemplate({
          companyName,
          teamName,
          userData: event,
          eventTitle: event.title,
          eventTime: new Date().toTimeString(),
          actionText: "Ver evento",
          actionLink: `http://localhost:5173/events/${eventId}`,
        }),
      };

      await sendEmail(email);
      console.log(
        `📧 Lembrete enviado para evento: ${event.title} enviado para o ${user.name} - ${teamName} - ${companyName}`
      );
    }
  });
};
