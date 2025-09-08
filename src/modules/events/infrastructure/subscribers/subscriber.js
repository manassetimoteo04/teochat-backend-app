import { upcomingEventTemplate } from "../../../shared/helpers/generate-email-templates.js";
import sendEmail from "../../../shared/infrastructure/email/email.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";

export function registerEventsSubscribers() {
  eventBus.on("UserCreated", async (event) => {
    const { confirmCode, email } = event.payload;
    const data = {
      to: email,
      subject: "Verificação da Conta TeoChat",
      html: upcomingEventTemplate({
        templateType: "evento",
        companyName: "TeoChat",
        footerNote: "Não compartilhe este código com ninguém",
        userData: { code: confirmCode },
      }),
    };
    await sendEmail(data);
  });
}
