"use client";
import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [repoUrl, setRepoUrl] = useState("ANAS727189/heisenberg-backend");

  const startAttack = async () => {
    setLoading(true);
    setLogs(prev => [...prev, "Initialize Heisenberg Protocol..."]);
    setScore(null); 
    
    try {
      const startRes = await fetch('/api/start-attack', {
          method: 'POST',
          body: JSON.stringify({ 
            targetUrl: "https://boom-heisenberg.vercel.app/api/victim",
            repoUrl: repoUrl
          })
      });
      
      const startData = await startRes.json();

      if (!startRes.ok || !startData.id) {
        console.error("Start failed:", startData);
        setLogs(prev => [...prev, `❌ Error Starting Flow: ${startData.error || "Unknown Error"}`]);
        setLoading(false);
        return; 
      }

      const id = startData.id;
      setLogs(prev => [...prev, `Flow Started: ID ${id}`]);


     const poll = setInterval(async () => {
        const checkRes = await fetch(`/api/check-status?id=${id}`);
        const data = await checkRes.json();
        
        const state = data.state.current; 
        console.log("Current State:", state); 

        if (state === "SUCCESS" || state === "WARNING") {
            clearInterval(poll);

            const outputs = data.outputs || {};
            const scoreTask = outputs['dev.hackathon.heisenberg_protocol.calculate_score'] || 
                              outputs['calculate_score'] || {};

            const vars = scoreTask.vars || {};
            const score_t = vars.resilience_score || "0";
            
            setScore(parseInt(score_t, 10) || 0);
            setLogs(prev => [...prev, "Analysis Complete."]);
            setLogs(prev => [...prev, `🛡️ FINAL RESILIENCE SCORE: ${score_t}/100`]);
            setLoading(false);
        } 
        else if (state === "FAILED" || state === "KILLED") {
            clearInterval(poll);
            setLogs(prev => [...prev, "❌ Attack Process Failed."]);
            setLoading(false);
        }
    }, 2000);

    } catch (err) {
      setLogs(prev => [...prev, "❌ Critical System Error"]);
      setLoading(false);
    }
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
      <div className="mb-8">
        <label className="block mb-2 text-gray-400">GitHub Repo (for reporting)</label>
        <input 
          type="text" 
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
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