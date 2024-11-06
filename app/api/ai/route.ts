import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_AI_API_KEY,
  baseURL: process.env.NEXT_PUBLIC_AI_BASE_URL,
})

export async function POST(request: Request) {
  try {
    const { endpoint, payload } = await request.json()
    
    const messages = [
      {
        role: "system",
        content: "Rewrite the user's text more clearly and concisely. Respond only with the rewritten text, without any additional commentary or formatting."
      },
      {
        role: "user",
        content: payload.text
      }
    ] as const;

    const completion = await openai.chat.completions.create({
      model: "grok-beta",
      messages: messages,
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content || payload.text;
    return NextResponse.json({ rewrittenText: content })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 