"use client";
import { useState, useEffect } from 'react';
import { MOCK_TRAFFIC_DATA } from '../lib/constants';

// Components
import NewsTicker from '../components/NewsTicker';
import Header from '../components/Layout/Header';
import MarketWatch from '../components/MarketWatch';
import ThreatIndex from '../components/ThreatIndex';
import SystemIntelligence from '../components/SystemIntelligence';
import OperationDetails from '../components/OperationDetails';
import ResilienceScore from '../components/ResilienceScore';
import LatestWire from '../components/LatestWire';
import Classifieds from '../components/Classifieds';
import Footer from '../components/Layout/Footer';
import ConfettiOverlay from '../components/ConfettiOverlay';
import ScoreInfoModal from '../components/ScoreInfoModal';
import CodeGenOverlay from '../components/CodeGenOverlay';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [repoUrl, setRepoUrl] = useState("ANAS727189/heisenberg-backend");
  const [trafficData, setTrafficData] = useState(MOCK_TRAFFIC_DATA);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showScoreInfo, setShowScoreInfo] = useState(false);
  const [defconLevel, setDefconLevel] = useState(3);
  const [showCodeGen, setShowCodeGen] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

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
    setShowConfetti(false);
    setShowCodeGen(false);
    
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

      // Simulate "Thinking" logs for the demo
      setTimeout(() => {
        setLogs(prev => [...prev, "📡 Intercepting traffic on port 443..."]);
      }, 2000);
      
      setTimeout(() => {
        setLogs(prev => [...prev, "⚠️ Anomaly Detected: High Request Rate"]);
      }, 5000);

      setTimeout(() => {
        setLogs(prev => [...prev, "🤖 Agent Activated: Analyzing Codebase..."]);
      }, 8000);

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
            
            // Add the final "Fix" log
            if (parseInt(score_t, 10) < 50) {
               setShowCodeGen(true);
               // Delay the final success state to allow code gen animation to play
               setTimeout(() => {
                 setLogs(prev => [...prev, "✅ Fix Deployed: PR Created."]);
                 setShowConfetti(true);
                 setShowCodeGen(false);
                 setLoading(false);
               }, 6000);
            } else {
               setLoading(false);
            }
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
    <div className="min-h-screen bg-[#f4f1ea] text-black font-serif p-4 md:p-8 w-full relative overflow-x-hidden">
      <NewsTicker />
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1920px] mx-auto">
        
        {/* Left Column - Analytics & Graphs */}
        <div className="lg:col-span-3 space-y-8">
          <MarketWatch trafficData={trafficData} />
          <ThreatIndex />
          <SystemIntelligence />
        </div>

        {/* Middle Column - Main Controls */}
        <div className="lg:col-span-6 border-x-0 lg:border-x-2 border-black px-0 lg:px-8">
          <OperationDetails 
            repoUrl={repoUrl}
            setRepoUrl={setRepoUrl}
            defconLevel={defconLevel}
            setDefconLevel={setDefconLevel}
            startAttack={startAttack}
            loading={loading}
          />

          {score !== null && (
            <ResilienceScore 
              score={score} 
              repoUrl={repoUrl} 
              setShowScoreInfo={setShowScoreInfo} 
            />
          )}
        </div>

        {/* Right Column - Logs & Classifieds */}
        <div className="lg:col-span-3 space-y-8">
          <LatestWire logs={logs} />
          <Classifieds />
        </div>
      </div>
      
      <Footer />

      <ConfettiOverlay show={showConfetti} />
      <ScoreInfoModal isOpen={showScoreInfo} onClose={() => setShowScoreInfo(false)} />
      <CodeGenOverlay isVisible={showCodeGen} />
    </div>
  );
}
