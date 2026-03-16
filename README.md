# LLM Council ⚖️

A multi-LLM document analysis engine that runs multiple AI models in parallel and arbitrates confidence scores — with a Captain LLM fallback when consensus is low.

## What it does

Paste any document — a contract, report, financial statement, or brief. LLM Council sends it to 3 different AI models simultaneously (GPT-4o Mini, Claude Haiku, Gemini Flash), each acting as a specialist analyst with a distinct reasoning style.

Each analyst returns a detailed analysis, a confidence score (0–100%), and their reasoning for that score.

If the average confidence is below 85%, a Captain LLM (GPT-4o) consolidates all outputs into one authoritative verdict.

## Tech stack

- **Frontend:** Next.js 15, Tailwind CSS, TypeScript
- **Backend:** Next.js API Routes
- **AI:** OpenRouter API (GPT-4o Mini, Claude Haiku, Gemini Flash, GPT-4o)
- **Deployment:** Vercel

## Getting started

Clone the repo, add your OpenRouter API key to `.env.local`, and run:
```bash
npm install
npm run dev
```

## Built by

Siddharth Prabhu
