import { generateEmailTemplate } from "../../../shared/helpers/generate-email-templates.js";
import sendEmail from "../../../shared/infrastructure/email/email.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";

export function registerCompanySubscribers() {
  eventBus.on("CompanyCreated", async (event) => {
    const { email, name, link } = event.payload;
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
