import nodemailer from "nodemailer";
// import { EMAIL_PASSWORD, EMAIL_USERNAME } from "../configs/env.js";

export default async function sendEmail(data) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const { to, subject, html } = data;
  const info = await transporter.sendMail({
    from: '"Plataforma TeoChat" <no-reply@teochat.com>',
    to,
    subject,
    html,
  });

  console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
}
