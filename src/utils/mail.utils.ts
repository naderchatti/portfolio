import nodemailer from 'nodemailer';
import ContactEmailTemplate from '../common/ContactEmailTemplate';
import juice from 'juice';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type MailOptions = {
  name: string;
  email: string;
  recipients: string[];
  subject: string;
  message: string;
};

export async function sendEmail({
  name,
  email,
  recipients,
  subject,
  message,
}: MailOptions) {
  try {
    const htmlContent = ContactEmailTemplate({ name, email, subject, message });

    const inlinedHtml = juice(htmlContent);

    const info = await transporter.sendMail({
      from: { name, address: email },
      to: recipients.join(', '),
      subject: subject,
      text: message,
      html: inlinedHtml,
    });
    return info;
  } catch (error) {
    throw error;
  }
}
