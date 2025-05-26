import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request) {
  try {
    const { description } = await request.json();
    if (!description || typeof description !== 'string') {
      return NextResponse.json({ error: 'Invalid description' }, { status: 400 });
    }

    const prompt = `Suggest 15 brand-name alternatives for a company described as: "${description.trim()}". Return them as a single comma-separated line, no extra text. (the alternatives cannot include symbols or spaces.)`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        { role: 'system', content: 'You are a helpful brand-naming assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 120
    });

    const raw = completion.choices?.[0]?.message?.content || '';
    console.log('[generate-alternatives] raw:', raw);

    // Cleanly split on commas (and newlines, just in case)
    const alternatives = raw
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter(Boolean)
      .slice(0, 15);

    console.log('[generate-alternatives] alternatives:', alternatives);

    return NextResponse.json({ alternatives });
  } catch (err) {
    console.error('[generate-alternatives] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
