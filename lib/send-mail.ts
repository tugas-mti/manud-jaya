import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API || "MAILGUN_API",
  });

  try {
    const data = await mg.messages.create("mg.manud-jaya.tech", {
      from: "Manud Jaya <info@manud-jaya.tech>",
      to,
      subject,
      html,
    });

    console.log(data); // logs response data
  } catch (error) {
    console.log(error); //logs any error
  }
}
