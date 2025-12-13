import React from 'react';
import { Info, Rabbit, ShieldAlert } from 'lucide-react';

interface ResilienceScoreProps {
  score: number;
  repoUrl: string;
  setShowScoreInfo: (show: boolean) => void;
}

export default function ResilienceScore({ score, repoUrl, setShowScoreInfo }: ResilienceScoreProps) {
  return (
    <>
      <div className="mb-8 border-y-4 border-black py-8 text-center bg-gray-100 relative">
        <div className="flex items-center justify-center gap-2 mb-4">
          <h3 className="text-2xl font-bold uppercase border-b-2 border-black inline-block">Resilience Score</h3>
          <button 
            onClick={() => setShowScoreInfo(true)}
            className="hover:bg-black hover:text-white rounded-full p-1 transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
        <div className="text-9xl font-black my-4 tracking-tighter">{score}<span className="text-4xl text-gray-500">/100</span></div>
        <p className="italic font-serif text-xl">"A stunning revelation in today's audit."</p>
      </div>

      {score < 50 && (
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
              <div className="flex flex-wrap gap-4 items-center">
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
                <div className="flex items-center gap-2 text-xs font-bold uppercase border border-black px-2 py-1 rounded-full bg-orange-100">
                  <Rabbit className="w-4 h-4" />
                  <span>CodeRabbit Review Pending</span>
                </div>
              </div>
            </div>
            <ShieldAlert className="w-16 h-16 text-black" />
          </div>
        </div>
      )}
    </>
  );
}
