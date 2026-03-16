"use client";

import { useState } from "react";

type AnalystResult = {
  name: string;
  role: string;
  model: string;
  analysis: string;
  confidence: number;
  reasoning: string;
};

type ApiResponse = {
  results: AnalystResult[];
  avg: number;
  best: AnalystResult;
};

function ConfidenceBar({ value }: { value: number }) {
  const color =
    value >= 80 ? "bg-emerald-400" : value >= 65 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-700 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function AnalystCard({ result }: { result: AnalystResult }) {
  const confColor =
    result.confidence >= 80
      ? "text-emerald-400"
      : result.confidence >= 65
      ? "text-amber-400"
      : "text-red-400";

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-semibold text-sm">{result.name}</p>
          <p className="text-white/40 text-xs mt-0.5">{result.role}</p>
        </div>
        <span className={`text-lg font-bold ${confColor}`}>
          {result.confidence}%
        </span>
      </div>
      <ConfidenceBar value={result.confidence} />
      <p className="text-white/60 text-xs mt-3 leading-relaxed">
        {result.analysis}
      </p>
      {result.reasoning && (
        <p className="text-white/30 text-xs mt-2 italic">{result.reasoning}</p>
      )}
      <p className="text-white/20 text-xs mt-3 font-mono">{result.model}</p>
    </div>
  );
}

export default function Analyse() {
  const [doc, setDoc] = useState("");
  const [task, setTask] = useState("summarize");
  const [isRunning, setIsRunning] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState("");
  const [isCaptainRunning, setIsCaptainRunning] = useState(false);
  const [captainResult, setCaptainResult] = useState<string>("");

  async function runAnalysis() {
    if (!doc.trim()) return;
    setIsRunning(true);
    setResponse(null);
    setError("");
    setCaptainResult("");

    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document: doc, task }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResponse(data);
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsRunning(false);
    }
  }

  async function runCaptain() {
    if (!response) return;
    setIsCaptainRunning(true);
    setCaptainResult("");

    try {
      const res = await fetch("/api/captain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document: doc,
          task,
          analystResults: response.results,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setCaptainResult(data.synthesis);
    } catch (e) {
      setCaptainResult("Captain analysis failed. Please try again.");
    } finally {
      setIsCaptainRunning(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <a href="/" className="text-white/40 text-sm hover:text-white/70 transition">
            ← Back to home
          </a>
          <h1 className="text-3xl font-bold mt-4 mb-2">LLM Council</h1>
          <p className="text-white/50">Paste your document and let the analysts go to work.</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm text-white/50 mb-2">Your document</label>
          <textarea
            value={doc}
            onChange={(e) => setDoc(e.target.value)}
            placeholder="Paste any document here — a contract, report, email, financial statement..."
            className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 resize-none focus:outline-none focus:border-white/30 transition text-sm leading-relaxed"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm text-white/50 mb-2">What should the analysts do?</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "summarize", label: "Summarise" },
              { value: "risk", label: "Find Risks" },
              { value: "sentiment", label: "Sentiment" },
              { value: "extract", label: "Extract Facts" },
              { value: "qa", label: "Quality Check" },
            ].map((t) => (
              <button
                key={t.value}
                onClick={() => setTask(t.value)}
                className={`px-4 py-2 rounded-full text-sm transition border ${
                  task === t.value
                    ? "bg-white text-black border-white font-semibold"
                    : "bg-white/5 text-white/60 border-white/10 hover:border-white/30"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!doc.trim() || isRunning}
          onClick={runAnalysis}
          className="w-full py-4 rounded-2xl font-semibold text-base transition bg-white text-black hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed mb-10"
        >
          {isRunning ? "Analysts are thinking..." : "Run Analysis →"}
        </button>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6 text-red-400 text-sm">
            {error}
          </div>
        )}

        {response && (
          <div>
            <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-3">
              {response.results.map((r) => (
                <AnalystCard key={r.name} result={r} />
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/50">Average confidence</p>
                <p className="text-2xl font-bold mt-1">{response.avg}%</p>
              </div>
              {response.avg < 85 && (
                <div className="text-right">
                  <p className="text-xs text-white/40 mb-2">Below 85% threshold</p>
                  <button
                    onClick={runCaptain}
                    disabled={isCaptainRunning}
                    className="bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition disabled:opacity-50"
                  >
                    {isCaptainRunning ? "Captain thinking..." : "Assign Captain LLM ↗"}
                  </button>
                </div>
              )}
              {response.avg >= 85 && (
                <span className="text-emerald-400 text-sm font-medium">
                  ✓ High confidence
                </span>
              )}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
              <p className="text-xs text-white/40 mb-1">Best analyst output</p>
              <p className="text-sm font-semibold mb-2">{response.best.name} — {response.best.confidence}% confidence</p>
              <p className="text-white/70 text-sm leading-relaxed">{response.best.analysis}</p>
            </div>

            {captainResult && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
                <p className="text-xs text-blue-400 mb-2 font-semibold">⚡ Captain LLM — Consolidated Verdict</p>
                <p className="text-white/80 text-sm leading-relaxed">{captainResult}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}