// app/api/contact/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return Response.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: ['neetunagdev258@gmail.com'], // Company email
      subject: `New Contact Form Submission from ${data.name}`,
      replyTo: data.email,
      html: `
        <h2>New Lead Received</h2>
        <hr />
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
        <p><strong>Service:</strong> ${data.service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br />')}</p>
        <hr />
        <p style="color: #666; font-size: 14px;">
          This message was sent from your website contact form.
        </p>
      `,
    });

    console.log('Email sent:', result);

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return Response.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}