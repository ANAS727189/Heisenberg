import React from "react";
import { Info, Rabbit, ShieldAlert } from "lucide-react";

interface ResilienceScoreProps {
  score: number;
  repoUrl: string;
  setShowScoreInfo: (show: boolean) => void;
}

export default function ResilienceScore({
  score,
  repoUrl,
  setShowScoreInfo,
}: ResilienceScoreProps) {
  return (
    <>
      <div className="relative mb-8 border-y-4 border-black bg-gray-100 py-8 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <h3 className="inline-block border-b-2 border-black text-2xl font-bold uppercase">
            Resilience Score
          </h3>
          <button
            onClick={() => setShowScoreInfo(true)}
            className="rounded-full p-1 transition-colors hover:bg-black hover:text-white"
          >
            <Info className="h-5 w-5" />
          </button>
        </div>
        <div className="my-4 text-9xl font-black tracking-tighter">
          {score}
          <span className="text-4xl text-gray-500">/100</span>
        </div>
        <p className="font-serif text-xl italic">
          "A stunning revelation in today's audit."
        </p>
      </div>

      {score < 50 && (
        <div className="relative mt-8 overflow-hidden border-4 border-black bg-white p-6">
          <div className="absolute top-0 right-0 translate-x-8 translate-y-4 rotate-45 transform bg-black px-4 py-1 text-xs font-bold text-white uppercase">
            Breaking News
          </div>
          <h3 className="mb-4 inline-block border-b-2 border-black text-2xl font-bold uppercase">
            ⚠ Vulnerability Detected
          </h3>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="mb-2 text-lg font-bold">Database Lock Crisis</h4>
              <p className="mb-4 text-gray-700 italic">
                Sources confirm that the database is suffering from severe
                locking issues. Heisenberg analysts strongly suggest applying a
                Rate Limiter immediately.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://github.com/${repoUrl}/pulls`}
                  target="_blank"
                  className="inline-block border-2 border-black px-6 py-3 font-bold uppercase transition-colors hover:bg-black hover:text-white"
                >
                  View Fix (PR)
                </a>
                <a
                  href={`https://github.com/${repoUrl}/issues`}
                  target="_blank"
                  className="inline-block border-2 border-black px-6 py-3 font-bold uppercase transition-colors hover:bg-black hover:text-white"
                >
                  View Issues
                </a>
                <div className="flex items-center gap-2 rounded-full border border-black bg-orange-100 px-2 py-1 text-xs font-bold uppercase">
                  <Rabbit className="h-4 w-4" />
                  <span>CodeRabbit Review Pending</span>
                </div>
              </div>
            </div>
            <ShieldAlert className="h-16 w-16 text-black" />
          </div>
        </div>
      )}
    </>
  );
}
