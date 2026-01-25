// src/lib/mail.js
import nodemailer from "nodemailer";
import env from "@/config/env";

const port = parseInt(process.env.SMTP_PORT) || 587;
const secure = port === 465;

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: port,
  secure: secure,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export default async function sendMail({ to, subject, html }) {
  console.log("Attempting to send email to:", to);
  console.log("Email subject:", subject);

  try {
    const info = await transporter.sendMail({
      from: `"${env.NEXT_PUBLIC_SITE_NAME}" <${env.FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return info || true;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    console.error("Full error:", error);
    return false;
  }
}
