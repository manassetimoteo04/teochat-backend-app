import { generateEmailTemplate } from "../../../shared/helpers/generate-email-templates.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";
import sendEmail from "../../../shared/infrastructure/email/email.js";
export function registerInvitationSubscribers() {
  eventBus.on("InvitationCreated", async (event) => {
    const { destination: email, name, link } = event.payload;
    const data = {
      to: email,
      subject: `Convite para aderir a empresa ${name} no TeoChat.`,
      html: generateEmailTemplate({
        companyName: name,
        actionLink: link,
      }),
    };
    await sendEmail(data);
  });
}
