"use client";
import { useState, useEffect } from "react";
import { TRAFFIC_DATA } from "../lib/constants";

import {
  NewsTicker,
  Header,
  MarketWatch,
  ThreatIndex,
  SystemIntelligence,
  OperationDetails,
  ResilienceScore,
  LatestWire,
  Classifieds,
  Footer,
  ConfettiOverlay,
  ScoreInfoModal,
  CodeGenOverlay,
} from "../components/page";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [repoUrl, setRepoUrl] = useState("ANAS727189/heisenberg-backend");
  const [trafficData, setTrafficData] = useState(TRAFFIC_DATA);
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
      setTrafficData((prev) => {
        // If attack is running (loading=true), generate chaos.
        // If idle, generate low "heartbeat" traffic.
        const baseRequests = loading ? 150 : 10;
        const variance = loading ? 100 : 5;
        const baseLatency = loading ? 200 : 20;

        const newData = [
          ...prev.slice(1),
          {
            time: prev[prev.length - 1].time + 1,
            requests: Math.floor(Math.random() * variance) + baseRequests,
            latency: Math.floor(Math.random() * (loading ? 100 : 10)) + baseLatency,
          },
        ];
        return newData;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading]);

  const startAttack = async () => {
    setLoading(true);
    setLogs((prev) => [...prev, "Initialize Heisenberg Protocol..."]);
    setScore(null);
    setShowConfetti(false);
    setShowCodeGen(false);

    try {
      const startRes = await fetch("/api/start-attack", {
        method: "POST",
        body: JSON.stringify({
          targetUrl: "https://boom-heisenberg.vercel.app/api/victim",
          repoUrl: repoUrl,
        }),
      });

      const startData = await startRes.json();

      if (!startRes.ok || !startData.id) {
        console.error("Start failed:", startData);
        setLogs((prev) => [
          ...prev,
          `[ERROR] Error Starting Flow: ${startData.error || "Unknown Error"}`,
        ]);
        setLoading(false);
        return;
      }

      const id = startData.id;
      setLogs((prev) => [...prev, `Flow Started: ID ${id}`]);

      setTimeout(() => {
        setLogs((prev) => [...prev, "[INFO] Intercepting traffic on port 443..."]);
      }, 2000);

      setTimeout(() => {
        setLogs((prev) => [...prev, "[WARN] Anomaly Detected: High Request Rate"]);
      }, 5000);

      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          "[SYSTEM] Agent Activated: Analyzing Codebase...",
        ]);
      }, 8000);

      const poll = setInterval(async () => {
        const checkRes = await fetch(`/api/check-status?id=${id}`);
        const data = await checkRes.json();

        const state = data.state.current;
        console.log("Current State:", state);

        if (state === "SUCCESS" || state === "WARNING") {
          clearInterval(poll);

          const outputs = data.outputs || {};
          const scoreTask =
            outputs["dev.hackathon.heisenberg_protocol.calculate_score"] ||
            outputs["calculate_score"] ||
            {};

          const vars = scoreTask.vars || {};
          const score_t = vars.resilience_score || "0";

          setScore(parseInt(score_t, 10) || 0);
          setLogs((prev) => [...prev, "Analysis Complete."]);
          setLogs((prev) => [
            ...prev,
            `[RESULT] FINAL RESILIENCE SCORE: ${score_t}/100`,
          ]);

          if (parseInt(score_t, 10) < 50) {
            setShowCodeGen(true);
            setTimeout(() => {
              setLogs((prev) => [...prev, "[SUCCESS] Fix Deployed: PR Created."]);
              setShowConfetti(true);
              setShowCodeGen(false);
              setLoading(false);
            }, 6000);
          } else {
            setLoading(false);
          }
        } else if (state === "FAILED" || state === "KILLED") {
          clearInterval(poll);
          setLogs((prev) => [...prev, "[FATAL] Attack Process Failed."]);
          setLoading(false);
        }
      }, 2000);
    } catch (err) {
      setLogs((prev) => [...prev, "[FATAL] Critical System Error"]);
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#f4f1ea] p-4 font-serif text-black md:p-8">
      <NewsTicker />
      <Header />

      <div className="mx-auto grid max-w-[1920px] grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column - Analytics & Graphs */}
        <div className="space-y-8 lg:col-span-3">
          <MarketWatch trafficData={trafficData} />
          <ThreatIndex isActive={loading} />
          <SystemIntelligence />
        </div>

        {/* Middle Column - Main Controls */}
        <div className="border-x-0 border-black px-0 lg:col-span-6 lg:border-x-2 lg:px-8">
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
        <div className="space-y-8 lg:col-span-3">
          <LatestWire logs={logs} />
          <Classifieds />
        </div>
      </div>

      <Footer />

      <ConfettiOverlay show={showConfetti} />
      <ScoreInfoModal
        isOpen={showScoreInfo}
        onClose={() => setShowScoreInfo(false)}
      />
      <CodeGenOverlay isVisible={showCodeGen} />
    </div>
  );
}
