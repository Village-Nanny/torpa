import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return Response.json({ error: 'Invalid request: Missing or malformed JSON body' }, { status: 400 });
    }

    const { blendingScore, segmentingScore, email } = body;

    if (!blendingScore || !segmentingScore || !email) {
      return Response.json(
        { error: 'Missing required fields: blendingScore, segmentingScore, and email are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const totalScore = blendingScore.correct + segmentingScore.correct;
    const totalQuestions = blendingScore.total + segmentingScore.total;

    const result = await resend.emails.send({
      from: 'Torpa <results.torpa@svegian.xyz>',
      to: email,
      subject: 'Your Torpa Game Results',
      html: `
        <h1>Game Complete!</h1>
        <p>Here are your scores:</p>
        <ul>
          <li>Blending: ${blendingScore.correct}/${blendingScore.total}</li>
          <li>Segmenting: ${segmentingScore.correct}/${segmentingScore.total}</li>
          <li>Total Score: ${totalScore}/${totalQuestions}</li>
        </ul>
      `,
    });

    if (result.error) {
      console.error('Email sending failed:', result.error);
      return Response.json({ error: 'Failed to send email', details: result.error }, { status: 500 });
    }

    return Response.json({ success: true, messageId: result.data?.id });
  } catch (error) {
    console.error('Unexpected error in send-email route:', error);
    return Response.json({ error: 'An unexpected error occurred', details: String(error) }, { status: 500 });
  }
}
