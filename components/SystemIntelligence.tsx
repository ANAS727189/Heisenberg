import React, { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';
import { oumi, OumiModelStatus } from '../lib/oumi';

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
    <div className="bg-black text-white p-4 text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <h3 className="text-xl font-bold uppercase mb-2 flex items-center justify-center gap-2">
        <Cpu className="w-5 h-5 animate-pulse" /> System Intelligence
      </h3>
      <div className="text-sm font-mono mb-2 text-gray-300">
        Model: {status ? status.model : "Initializing..."}
      </div>
      <div className="flex justify-between text-[10px] font-mono text-gray-400 px-4 mb-2">
        <span>LATENCY: {status ? `${status.latency}ms` : "--"}</span>
        <span>TOKENS: {status ? (status.tokensProcessed / 1000).toFixed(1) + 'k' : "--"}</span>
      </div>
      <p className="text-xs uppercase">Fine-tuned on 10k+ vulnerability patterns.</p>
      <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
        <div className="h-full bg-green-500 animate-[shimmer_2s_infinite] w-1/2"></div>
      </div>
    </div>
  );
}
