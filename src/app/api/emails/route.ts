import { sendEmail } from '@/utils/mail.utils';

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

  const html = `
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Subject: ${subject}</p>
    <p>Message: ${message}</p>
  `;

  try {
    await sendEmail({
      sender: email,
      recipients: ['contact@naderchatti.com'],
      subject,
      message: html,
      text,
    });

    return Response.json({ message: 'Email sent' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return Response.json({ message: error.message }, { status: 500 });
    } else {
      return Response.json(
        { message: 'An unknown error occurred' },
        { status: 500 }
      );
    }
  }
}
