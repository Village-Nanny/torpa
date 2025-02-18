import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { blendingScore, segmentingScore, email } = await request.json();

  const totalScore = blendingScore.correct + segmentingScore.correct;
  const totalQuestions = blendingScore.total + segmentingScore.total;

  try {
    await resend.emails.send({
      from: 'Torpa <onboarding@resend.dev>',
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

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error });
  }
}
