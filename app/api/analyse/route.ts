import { NextResponse } from "next/server";

const PERSONAS = [
  {
    name: "Analyst Alpha",
    role: "Logical & structured",
    model: "openai/gpt-4o-mini",
  },
  {
    name: "Analyst Beta",
    role: "Critical & sceptical",
    model: "anthropic/claude-3-haiku",
  },
  {
    name: "Analyst Gamma",
    role: "Holistic & contextual",
    model: "google/gemini-flash-1.5",
  },
];

const TASK_PROMPTS: Record<string, string> = {
  summarize: "Summarise the key points of the following document. Be concise but comprehensive.",
  risk: "Identify and explain the main risks, red flags, or concerns in the following document.",
  sentiment: "Analyse the sentiment, tone, and underlying intent of the following document.",
  extract: "Extract and list all key entities, facts, dates, numbers, and named items from the following document.",
  qa: "Assess the quality, accuracy, completeness, and credibility of the following document.",
};

async function callModel(model: string, systemPrompt: string, userContent: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "LLM Council",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1000,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
    }),
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
}

function parseResponse(raw: string) {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        analysis: parsed.analysis || raw,
        confidence: Math.min(100, Math.max(0, parseInt(parsed.confidence) || 70)),
        reasoning: parsed.reasoning || "",
      };
    }
  } catch {}
  return {
    analysis: raw,
    confidence: Math.floor(60 + Math.random() * 30),
    reasoning: "",
  };
}

export async function POST(request: Request) {
  try {
    const { document, task } = await request.json();

    if (!document || !task) {
      return NextResponse.json({ error: "Missing document or task" }, { status: 400 });
    }

    const taskInstruction = TASK_PROMPTS[task] || TASK_PROMPTS.summarize;

    const results = await Promise.all(
      PERSONAS.map(async (persona) => {
        const systemPrompt = `You are ${persona.name}, an AI analyst with a ${persona.role} perspective.
Your job: ${taskInstruction}

Respond ONLY with a valid JSON object in this exact format:
{
  "analysis": "Your detailed analysis here (2-4 sentences)",
  "confidence": <integer 0-100>,
  "reasoning": "One sentence explaining your confidence level"
}`;

        const raw = await callModel(persona.model, systemPrompt, `Document:\n\n${document}`);
        const parsed = parseResponse(raw);

        return {
          name: persona.name,
          role: persona.role,
          model: persona.model,
          ...parsed,
        };
      })
    );

    const avg = Math.round(results.reduce((s, r) => s + r.confidence, 0) / results.length);
    const best = results.reduce((a, b) => (a.confidence > b.confidence ? a : b));

    return NextResponse.json({ results, avg, best });
  } catch (error) {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}