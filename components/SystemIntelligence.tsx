import React, { useEffect, useState } from "react";
import { Cpu } from "lucide-react";
import { oumi, OumiModelStatus } from "../lib/oumi";

export default function SystemIntelligence() {
  const [status, setStatus] = useState<OumiModelStatus | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const data = await oumi.getStatus();
      setStatus(data);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group relative overflow-hidden bg-black p-4 text-center text-white">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif')] opacity-10 mix-blend-overlay"></div>
      <h3 className="mb-2 flex items-center justify-center gap-2 text-xl font-bold uppercase">
        <Cpu className="h-5 w-5 animate-pulse" /> System Intelligence
      </h3>
      <div className="mb-2 font-mono text-sm text-gray-300">
        Model: {status ? status.model : "Initializing..."}
      </div>
      <div className="mb-2 flex justify-between px-4 font-mono text-[10px] text-gray-400">
        <span>LATENCY: {status ? `${status.latency}ms` : "--"}</span>
        <span>
          TOKENS:{" "}
          {status ? (status.tokensProcessed / 1000).toFixed(1) + "k" : "--"}
        </span>
      </div>
      <p className="text-xs uppercase">
        Fine-tuned on 10k+ vulnerability patterns.
      </p>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-800">
        <div className="h-full w-1/2 animate-[shimmer_2s_infinite] bg-green-500"></div>
      </div>
    </div>
  );
}
