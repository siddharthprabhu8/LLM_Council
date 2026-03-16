export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <a href="/" className="text-white/40 text-sm hover:text-white/70 transition">
          ← Back to home
        </a>

        <div className="mt-8 mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/70 mb-6">
            ⚖️ How it works
          </div>
          <h1 className="text-4xl font-bold mb-4">Built for when one AI isn't enough.</h1>
          <p className="text-white/50 text-lg leading-relaxed">
            LLM Council runs your document through multiple AI models simultaneously,
            scores their confidence, and escalates to a Captain LLM when needed.
          </p>
        </div>

        <div className="space-y-10 mb-16">

          <div className="flex gap-5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center">
              1
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Paste your document</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Any document works — a legal contract, a financial report, an email thread,
                a product brief, or a research paper. The longer and more complex,
                the more valuable the analysis.
              </p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center">
              2
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Choose your analysis type</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-3">
                Tell the council what to look for. Each mode focuses the analysts differently:
              </p>
              <div className="space-y-2">
                {[
                  { label: "Summarise", desc: "Pull out the key points concisely" },
                  { label: "Find Risks", desc: "Identify red flags, liabilities, and concerns" },
                  { label: "Sentiment", desc: "Analyse tone, intent, and underlying meaning" },
                  { label: "Extract Facts", desc: "Pull out names, dates, numbers, and entities" },
                  { label: "Quality Check", desc: "Assess accuracy, completeness, and credibility" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <span className="text-white text-xs font-semibold min-w-24">{item.label}</span>
                    <span className="text-white/40 text-xs">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center">
              3
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Three AI analysts run in parallel</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-3">
                Your document is sent simultaneously to three different AI models,
                each with a distinct reasoning style:
              </p>
              <div className="space-y-2">
                {[
                  { name: "Analyst Alpha", model: "GPT-4o Mini", style: "Logical & structured" },
                  { name: "Analyst Beta", model: "Claude Haiku", style: "Critical & sceptical" },
                  { name: "Analyst Gamma", model: "Gemini Flash", style: "Holistic & contextual" },
                ].map((a) => (
                  <div key={a.name} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold">{a.name}</p>
                      <p className="text-white/40 text-xs">{a.style}</p>
                    </div>
                    <span className="text-white/20 text-xs font-mono">{a.model}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black text-sm font-bold flex items-center justify-center">
              4
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Confidence scores are calculated</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Each analyst returns not just an analysis, but a confidence score from 0–100%.
                This score reflects how clear, complete, and unambiguous the document is.
                The average across all three analysts is your overall confidence reading.
              </p>
              <div className="mt-4 flex gap-4">
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  80%+ High confidence
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-400">
                  <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                  65–79% Medium
                </div>
                <div className="flex items-center gap-2 text-xs text-red-400">
                  <div className="w-2 h-2 rounded-full bg-red-400"></div>
                  Below 65% Low
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 border border-white/20 text-white text-sm font-bold flex items-center justify-center">
              5
            </div>
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400 mb-3">
                ⚡ Only when needed
              </div>
              <h2 className="text-lg font-semibold mb-2">Captain LLM takes over below 85%</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                If the average confidence is below 85%, you can assign the Captain LLM —
                powered by GPT-4o. The Captain reads every analyst's output, identifies where
                they agree and where they contradict each other, and produces a single
                consolidated verdict that is more accurate than any individual analysis.
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-10 text-center">
           <p className="text-white/40 text-sm mb-4">Ready to try it?</p>
          <a href="/analyse" className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition">
            Start Analysing →
          </a>
        </div>

      </div>
    </div>
  );
}