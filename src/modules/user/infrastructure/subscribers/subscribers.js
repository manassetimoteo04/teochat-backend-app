import { generateEmailTemplate } from "../../../shared/helpers/generate-email-templates.js";
import sendEmail from "../../../shared/infrastructure/email/email.js";
import { eventBus } from "../../../shared/infrastructure/events/event-bus.js";

export function registerUserSubscribers() {
  eventBus.on("UserCreated", async (event) => {
    const { confirmCode, email } = event.payload;
    const data = {
      to: email,
      subject: "Verificação da Conta TeoChat",
      html: generateEmailTemplate({
        templateType: "verification",
        companyName: "TeoChat",
        footerNote: "Não compartilhe este código com ninguém",
        userData: { code: confirmCode },
      }),
    };
    await sendEmail(data);
  });
  eventBus.on("UserRequestConfirmCode", async (event) => {
    const { confirmCode, email } = event.payload;
    const data = {
      to: email,
      subject: "Verificação da Conta TeoChat",
      html: generateEmailTemplate({
        templateType: "verification",
        companyName: "TeoChat",
        footerNote: "Não compartilhe este código com ninguém",
        userData: { code: confirmCode },
      }),
    };
    await sendEmail(data);
  });
  eventBus.on("UserConfirmedAccount", async (event) => {
    const { name, email } = event.payload;
    const data = {
      to: email,
      subject:
        "Bem vindo ao TeoChat! Agora a sua conta está activa, aproveite nossos recursos",
      html: generateEmailTemplate({
        templateType: "welcome",
        companyName: "TeoChat",
        userData: { name },
      }),
    };
    await sendEmail(data);
  });
}
