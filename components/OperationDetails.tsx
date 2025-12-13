import React from 'react';
import { Globe, Lock, Activity, Terminal, Zap } from 'lucide-react';

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
  loading
}: OperationDetailsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-4xl font-bold mb-4 border-b-4 border-black uppercase text-center pb-2">
        Operation Details
      </h2>
      
      {/* DEFCON Selector */}
      <div className="flex justify-center items-center gap-4 mb-6 bg-gray-100 p-4 border-2 border-black">
        <span className="font-bold uppercase text-sm tracking-widest">Chaos Level:</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={() => setDefconLevel(level)}
              className={`w-8 h-8 rounded-none font-mono font-bold border-2 border-black transition-all transform hover:scale-110 ${
                defconLevel >= level 
                  ? level > 3 ? 'bg-red-600 text-white' : 'bg-black text-white'
                  : 'bg-white text-black'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <Zap className={`w-5 h-5 ${defconLevel > 3 ? 'text-red-600 animate-bounce' : 'text-black'}`} />
      </div>

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
  );
}
