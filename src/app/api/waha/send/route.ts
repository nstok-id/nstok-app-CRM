import { NextResponse } from 'next/server';
import { wahaClient } from '@/lib/waha';

export async function POST(req: Request) {
  try {
    const { sessionName, chatId, text } = await req.json();

    if (!sessionName || !chatId || !text) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const result = await wahaClient.sendText(sessionName, chatId, text);
    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
