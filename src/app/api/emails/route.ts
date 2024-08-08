export const runtime = 'edge';
import { sendEmail } from '@/utils/mail.utils';

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  try {
    await sendEmail({
      name,
      email,
      recipients: ['contact@naderchatti.com'],
      subject,
      message,
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
