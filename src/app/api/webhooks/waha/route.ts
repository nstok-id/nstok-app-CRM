import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    console.log('[WAHA Webhook Event]:', payload.event, payload.session);

    // Event handler: 'message' / 'message.ack' / 'session.status'
    // Otomatis simpan pesan masuk ke database crmMessages di sini
    return NextResponse.json({ success: true, received: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
