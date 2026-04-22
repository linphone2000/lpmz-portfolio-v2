import { NextResponse } from 'next/server';

const allowedEvents = new Set([
  'estimate_share_clicked',
  'shared_estimate_opened',
]);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event =
      typeof body?.event === 'string' && allowedEvents.has(body.event)
        ? body.event
        : null;

    if (!event) {
      return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
    }

    console.info(
      '[events]',
      JSON.stringify({
        event,
        payload: body?.payload ?? {},
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Event logging failed', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
