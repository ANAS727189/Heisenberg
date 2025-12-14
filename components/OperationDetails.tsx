import React from "react";
import { Globe, Lock, Activity, Terminal, Zap } from "lucide-react";

interface OperationDetailsProps {
  repoUrl: string;
  setRepoUrl: (url: string) => void;
  defconLevel: number;
  setDefconLevel: (level: number) => void;
  startAttack: () => void;
  loading: boolean;
}

export default function OperationDetails({
  repoUrl,
  setRepoUrl,
  defconLevel,
  setDefconLevel,
  startAttack,
  loading,
}: OperationDetailsProps) {
  return (
    <div className="mb-8">
      <h2 className="mb-4 border-b-4 border-black pb-2 text-center text-4xl font-bold uppercase">
        Operation Details
      </h2>

      {/* DEFCON Selector */}
      <div className="mb-6 flex items-center justify-center gap-4 border-2 border-black bg-gray-100 p-4">
        <span className="text-sm font-bold tracking-widest uppercase">
          Chaos Level:
        </span>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setDefconLevel(level)}
              className={`h-8 w-8 transform rounded-none border-2 border-black font-mono font-bold transition-all hover:scale-110 ${
                defconLevel >= level
                  ? level > 3
                    ? "bg-red-600 text-white"
                    : "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <Zap
          className={`h-5 w-5 ${defconLevel > 3 ? "animate-bounce text-red-600" : "text-black"}`}
        />
      </div>

      <div className="mb-6 columns-1 gap-8 text-justify md:columns-2">
        <p className="mb-4 text-lg leading-relaxed first-letter:float-left first-letter:mt-[-10px] first-letter:mr-2 first-letter:text-5xl first-letter:font-bold">
          Enter the target parameters below to initiate the Heisenberg protocol.
          Our intelligence suggests that the target system may be vulnerable to
          high-frequency probing.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          Ensure all coordinates are accurate before proceeding with the
          analysis. Unauthorized access is strictly prohibited under the
          Intergalactic Cyber Treaty of 2025.
        </p>
      </div>

      <div className="transform space-y-6 border-2 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
        <div>
          <label className="mb-1 block flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
            <Globe className="h-4 w-4" /> Target URL
          </label>
          <input
            type="text"
            defaultValue="https://boom-heisenberg.vercel.app/api/victim"
            className="w-full border-b-2 border-black bg-transparent p-2 font-mono transition-colors focus:bg-gray-50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
            <Lock className="h-4 w-4" /> GitHub Repo
          </label>
          <input
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="w-full border-b-2 border-black bg-transparent p-2 font-mono transition-colors focus:bg-gray-50 focus:outline-none"
          />
        </div>

        <button
          onClick={startAttack}
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 border-2 border-transparent bg-black py-4 text-xl font-bold text-white uppercase transition-all hover:border-black hover:bg-gray-800 hover:bg-white hover:text-black"
        >
          {loading ? <Activity className="animate-spin" /> : <Terminal />}
          {loading ? "Publishing to Wire..." : "Initiate Protocol"}
        </button>
      </div>
    </div>
  );
}
