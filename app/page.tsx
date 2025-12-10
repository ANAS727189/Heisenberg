"use client";
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const startAttack = async () => {
    setLoading(true);
    setLogs(prev => [...prev, "Initialize Heisenberg Protocol..."]);
    
    // 1. Start Flow
    const startRes = await fetch('/api/start-attack', {
        method: 'POST',
        body: JSON.stringify({ targetUrl: "https://boom-heisenberg.vercel.app/api/victim" })
    });
    const { id } = await startRes.json(); // Get Execution ID
    setLogs(prev => [...prev, `Flow Started: ID ${id}`]);

    // 2. Poll for Completion (Check status every 2s)
    const poll = setInterval(async () => {
        // You need a new API route to check status (see below)
        const checkRes = await fetch(`/api/check-status?id=${id}`);
        const data = await checkRes.json();
        
        if (data.state.current === "SUCCESS") {
            clearInterval(poll);
            
            // Extract Score from Kestra Outputs
            const outputs = data.outputs || {};
            const scoreTask = outputs['dev.hackathon.heisenberg_protocol.calculate_score'] || {};
            const score_t = scoreTask.vars ? scoreTask.vars.resilience_score : "Unknown";
            setScore(parseInt(score_t, 10) || 0);
            setLogs(prev => [...prev, "Analysis Complete."]);
            setLogs(prev => [...prev, `🛡️ FINAL RESILIENCE SCORE: ${score}/100`]);
            setLoading(false);
        } else if (data.state.current === "FAILED") {
            clearInterval(poll);
            setLogs(prev => [...prev, "❌ Attack Process Failed."]);
            setLoading(false);
        }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-10">
      <h1 className="text-4xl font-bold mb-8 border-b border-green-700 pb-4">
        HEISENBERG <span className="text-sm text-gray-500">v0.1.0</span>
      </h1>

      <div className="mb-8">
        <label className="block mb-2 text-gray-400">Target URL</label>
        <input 
          type="text" 
          defaultValue="https://boom-heisenberg.vercel.app/api/victim"
          className="w-full bg-gray-900 border border-green-800 p-4 rounded text-white"
        />
      </div>

      <button 
        onClick={startAttack}
        disabled={loading}
        className="bg-green-700 text-black px-8 py-4 font-bold hover:bg-green-600 transition-all w-full mb-8"
      >
        {loading ? "EXECUTING..." : "INITIATE CHAOS"}
      </button>

      <div className="bg-gray-900 p-6 rounded h-64 overflow-y-auto border border-gray-800">
        {logs.map((log, i) => (
            <div key={i} className="mb-2"> {log}</div>
        ))}
      </div>
      {score !== null && score < 50 && (
  <div className="mt-8 border border-green-500 p-4">
    <h3 className="text-xl font-bold mb-2">⚠ Vulnerability Detected: Database Lock</h3>
    <p className="mb-4 text-gray-400">Heisenberg suggests applying a Rate Limiter.</p>
    <a 
      href="https://github.com/YOUR_USERNAME/heisenberg-backend/pulls" 
      target="_blank"
      className="bg-blue-600 text-white px-4 py-2 rounded font-bold"
    >
      View Auto-Generated PR (by Cline)
    </a>
  </div>
)}
    </div>
  );
}