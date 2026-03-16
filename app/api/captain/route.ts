import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { document, task, analystResults } = await request.json();

    const allOutputs = analystResults
      .map((r: any) => `${r.name} (${r.confidence}% confidence):\n${r.analysis}`)
      .join("\n\n---\n\n");

    const systemPrompt = `You are the Captain LLM — a master synthesiser and arbitrator.
Multiple AI analysts have evaluated the same document. Your job is to read all their outputs, find where they agree and disagree, and produce one final authoritative synthesis that is better than any individual analysis.

Respond with just your synthesis paragraph — no JSON, no labels, just the consolidated analysis.`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "LLM Council",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        max_tokens: 1000,
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Original document:\n${document}\n\nTask: ${task}\n\nAnalyst outputs:\n\n${allOutputs}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const synthesis = data.choices?.[0]?.message?.content || "Captain synthesis unavailable.";

    return NextResponse.json({ synthesis });
  } catch (error) {
    return NextResponse.json({ error: "Captain analysis failed" }, { status: 500 });
  }
}