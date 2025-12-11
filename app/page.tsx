"use client";
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ShieldAlert, Activity, Terminal, Lock, Globe } from 'lucide-react';

// Mock data for the graphs
const MOCK_TRAFFIC_DATA = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  requests: Math.floor(Math.random() * 100) + 50,
  latency: Math.floor(Math.random() * 50) + 10,
}));

const VULNERABILITY_DATA = [
  { name: 'SQL Injection', value: 20 },
  { name: 'XSS', value: 35 },
  { name: 'CSRF', value: 15 },
  { name: 'Auth Bypass', value: 30 },
];

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [repoUrl, setRepoUrl] = useState("ANAS727189/heisenberg-backend");
  const [trafficData, setTrafficData] = useState(MOCK_TRAFFIC_DATA);

  // Simulate live traffic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData(prev => {
        const newData = [...prev.slice(1), {
          time: prev[prev.length - 1].time + 1,
          requests: Math.floor(Math.random() * 100) + 50,
          latency: Math.floor(Math.random() * 50) + 10,
        }];
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
    <div className="min-h-screen bg-[#f4f1ea] text-black font-serif p-4 md:p-8 w-full">
      {/* Header */}
      <header className="border-b-4 border-black mb-8 pb-4 text-center max-w-[1920px] mx-auto">
        <div className="border-b border-black pb-2 mb-2 flex justify-between text-xs font-bold uppercase tracking-widest">
          <span>Vol. 1, No. 1</span>
          <span>{new Date().toLocaleDateString()}</span>
          <span>Price: Free</span>
        </div>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-2">
          The Heisenberg
        </h1>
        <div className="border-t border-black pt-2 mt-2 text-center font-bold italic text-xl flex justify-center items-center gap-4">
          <span className="hidden md:inline">★ ★ ★</span>
          "All the News That's Fit to Hack"
          <span className="hidden md:inline">★ ★ ★</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1920px] mx-auto">
        
        {/* Left Column - Analytics & Graphs (New Section) */}
        <div className="lg:col-span-3 space-y-8">
          <div className="border-b-2 border-black pb-4">
            <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-2">
              <Activity className="w-6 h-6" /> Market Watch
            </h2>
            <div className="h-48 w-full bg-white border border-black p-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #000', fontFamily: 'monospace' }}
                    itemStyle={{ color: '#000' }}
                  />
                  <Line type="monotone" dataKey="requests" stroke="#000" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="latency" stroke="#666" strokeWidth={1} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs mt-2 font-mono text-gray-600">Fig 1. Real-time network traffic analysis showing request volume vs latency.</p>
          </div>

          <div className="border-b-2 border-black pb-4">
            <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-2">
              <ShieldAlert className="w-6 h-6" /> Threat Index
            </h2>
            <div className="h-48 w-full bg-white border border-black p-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={VULNERABILITY_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 10, fontFamily: 'monospace'}} interval={0} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: '#f4f4f4'}} contentStyle={{ backgroundColor: '#fff', border: '1px solid #000' }} />
                  <Bar dataKey="value" fill="#000" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs mt-2 font-mono text-gray-600">Fig 2. Global vulnerability distribution by category.</p>
          </div>

          <div className="bg-black text-white p-4 text-center">
            <h3 className="text-xl font-bold uppercase mb-2">Weather Report</h3>
            <div className="text-4xl font-mono mb-2">34°C</div>
            <p className="text-sm uppercase">High probability of packet storms in the northern sector.</p>
          </div>
        </div>

        {/* Middle Column - Main Controls */}
        <div className="lg:col-span-6 border-x-0 lg:border-x-2 border-black px-0 lg:px-8">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 border-b-4 border-black uppercase text-center pb-2">
              Operation Details
            </h2>
            <div className="columns-1 md:columns-2 gap-8 mb-6 text-justify">
              <p className="mb-4 text-lg leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-[-10px]">
                Enter the target parameters below to initiate the Heisenberg protocol. 
                Our intelligence suggests that the target system may be vulnerable to high-frequency probing.
              </p>
              <p className="mb-4 text-lg leading-relaxed">
                Ensure all coordinates are accurate before proceeding with the analysis. 
                Unauthorized access is strictly prohibited under the Intergalactic Cyber Treaty of 2025.
              </p>
            </div>
            
            <div className="space-y-6 bg-white p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform transition-transform hover:-translate-y-1">
              <div>
                <label className="block font-bold uppercase text-xs mb-1 tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Target URL
                </label>
                <input 
                  type="text" 
                  defaultValue="https://boom-heisenberg.vercel.app/api/victim"
                  className="w-full bg-transparent border-b-2 border-black p-2 font-mono focus:outline-none focus:bg-gray-50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-bold uppercase text-xs mb-1 tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4" /> GitHub Repo
                </label>
                <input 
                  type="text" 
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-black p-2 font-mono focus:outline-none focus:bg-gray-50 transition-colors"
                />
              </div>

              <button 
                onClick={startAttack}
                disabled={loading}
                className="w-full bg-black text-white font-bold uppercase py-4 text-xl hover:bg-gray-800 transition-all border-2 border-transparent hover:border-black hover:bg-white hover:text-black flex items-center justify-center gap-2"
              >
                {loading ? <Activity className="animate-spin" /> : <Terminal />}
                {loading ? "Publishing to Wire..." : "Initiate Protocol"}
              </button>
            </div>
          </div>

          {/* Score Section - Only show if score exists */}
          {score !== null && (
            <div className="mb-8 border-y-4 border-black py-8 text-center bg-gray-100">
              <h3 className="text-2xl font-bold uppercase border-b-2 border-black inline-block mb-4">Resilience Score</h3>
              <div className="text-9xl font-black my-4 tracking-tighter">{score}<span className="text-4xl text-gray-500">/100</span></div>
              <p className="italic font-serif text-xl">"A stunning revelation in today's audit."</p>
            </div>
          )}

          {score !== null && score < 50 && (
            <div className="mt-8 border-4 border-black p-6 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-black text-white px-4 py-1 text-xs font-bold uppercase transform rotate-45 translate-x-8 translate-y-4">
                Breaking News
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase border-b-2 border-black inline-block">⚠ Vulnerability Detected</h3>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">Database Lock Crisis</h4>
                  <p className="mb-4 italic text-gray-700">
                    Sources confirm that the database is suffering from severe locking issues. 
                    Heisenberg analysts strongly suggest applying a Rate Limiter immediately.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={`https://github.com/${repoUrl}/pulls`}
                      target="_blank"
                      className="inline-block border-2 border-black px-6 py-3 font-bold uppercase hover:bg-black hover:text-white transition-colors"
                    >
                      View Fix (PR)
                    </a>
                    <a 
                      href={`https://github.com/${repoUrl}/issues`}
                      target="_blank"
                      className="inline-block border-2 border-black px-6 py-3 font-bold uppercase hover:bg-black hover:text-white transition-colors"
                    >
                      View Issues
                    </a>
                  </div>
                </div>
                <ShieldAlert className="w-16 h-16 text-black" />
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Logs & Classifieds */}
        <div className="lg:col-span-3 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-black uppercase">Latest Wire</h2>
            <div className="font-mono text-xs h-[600px] overflow-y-auto pr-2 space-y-3 bg-gray-50 p-2 border border-gray-200">
              {logs.length === 0 && <p className="italic text-gray-500 text-center mt-10">Waiting for incoming transmission...</p>}
              {logs.map((log, i) => (
                <div key={i} className="border-b border-gray-300 pb-2">
                  <span className="font-bold block text-gray-500 mb-1">[{new Date().toLocaleTimeString()}]</span>
                  <span className="leading-tight block">{log}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-4 border-black pt-4">
            <h3 className="font-bold uppercase text-center mb-2 text-sm">Classifieds</h3>
            <div className="grid grid-cols-2 gap-2 text-[10px] leading-tight text-gray-600 text-justify">
              <p>WANTED: Experienced White Hat Hacker. Must know Rust. Contact: 555-0199.</p>
              <p>FOR SALE: Legacy Mainframe. Slightly used. Good for heating.</p>
              <p>LOST: Private Key. Last seen in public repo. Reward offered.</p>
              <p>SERVICES: DDoS Protection. We block packets so you don't have to.</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-12 border-t-4 border-black pt-8 pb-4 text-center">
        <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-8 text-xs font-bold uppercase tracking-widest">
          <a href="#" className="hover:underline">Editorial</a>
          <a href="#" className="hover:underline">Subscriptions</a>
          <a href="#" className="hover:underline">Careers</a>
        </div>
        <p className="text-sm font-bold uppercase">
          &copy; {new Date().getFullYear()} Heisenberg Protocol. Printed in VS Code.
        </p>
      </footer>
    </div>
  );
}