import nodemailer from 'nodemailer';

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
  sender: string;
  recipients: string[];
  subject: string;
  message: string;
  text: string;
};

export async function sendEmail({
  sender,
  recipients,
  subject,
  message,
  text,
}: MailOptions) {
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: recipients.join(', '),
      subject: subject,
      text: text,
      html: message,
    });
    return info;
  } catch (error) {
    throw error;
  }
}
