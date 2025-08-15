import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_USERNAME } from "../configs/env.js";

export default async function (data) {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });
  const { to, subject, html } = data;
  const info = await transport.sendMail({
    from: '"TeoTeam" <no-reply@teoteam.com>',
    to,
    subject,
    html,
  });

  console.log("Preview URL:", info.messageId);
}
