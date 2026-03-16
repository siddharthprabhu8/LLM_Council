export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        
        {/* Logo */}
        <div className="mb-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/70">
          ⚖️ Multi-LLM Arbitration Engine
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-bold tracking-tight mb-4">
          LLM Council
        </h1>
        <p className="text-lg text-white/60 mb-10 leading-relaxed">
          Paste any document. Multiple AI analysts evaluate it in parallel. 
          If confidence is low, the Captain LLM consolidates everything 
          into one authoritative answer.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center">
          <a href="/analyse" className="bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition">
            Start Analysing →
          </a>
          <a href="/analyse" className="border border-white/20 text-white px-6 py-3 rounded-full hover:bg-white/10 transition">
            Learn how it works
          </a>
        </div>

      </div>
    </div>
  );
}