import { BrevoClient } from "@getbrevo/brevo";
import {
  BREVO_API_KEY,
  BREVO_SENDER_NAME,
  BREVO_SENDER_EMAIL, // ← adiciona esta variável de ambiente
  NODE_ENV,
} from "../../../../configs/env.js";

const isDevelopment = NODE_ENV !== "production";
const senderEmail = BREVO_SENDER_EMAIL;
const senderName = BREVO_SENDER_NAME || "Plataforma TeoChat";

export default async function sendEmail(data = {}) {
  const to = String(data.to || "").trim();
  const subject = String(data.subject || "").trim();
  const html = String(data.html || "").trim();
  if (!to || !subject || !html) {
    console.error("Email not sent: required fields are missing.", {
      to,
      subject,
      hasHtml: Boolean(html),
    });
    return null;
  }

  if (!BREVO_API_KEY) {
    console.error("Email not sent: BREVO_API_KEY is missing.");
    return null;
  }

  if (!senderEmail) {
    console.error("Email not sent: BREVO_SENDER_EMAIL is missing.");
    return null;
  }

  try {
    const client = new BrevoClient({ apiKey: BREVO_API_KEY });

    const response = await client.transactionalEmails.sendTransacEmail({
      subject,
      htmlContent: html,
      sender: {
        email: senderEmail,
        name: senderName,
      },
      to: [{ email: to }],
    });

    if (isDevelopment) {
      console.log("Email sent with Brevo.", {
        to,
        messageId: response?.messageId,
      });
    }

    return response;
  } catch (error) {
    console.error("Failed to send email with Brevo.", error?.message || error);
    return null;
  }
}
