import React from 'react';
import { X } from 'lucide-react';

interface ScoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScoreInfoModal({ isOpen, onClose }: ScoreInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[#f0e6d2] border-4 border-black p-6 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 hover:bg-black hover:text-[#f0e6d2] transition-colors p-1"
        >
          <X className="w-6 h-6" />
        </button>
        <h3 className="font-serif font-bold text-2xl mb-4 border-b-2 border-black pb-2">
          Resilience Score Calculation
        </h3>
        <div className="space-y-4 font-mono text-sm">
          <p>The Resilience Score is calculated based on real-time telemetry from the autonomous agent:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">Vulnerability Patch Rate:</span> Speed of fix deployment.</li>
            <li><span className="font-bold">Traffic Analysis:</span> Ratio of legitimate vs. malicious requests.</li>
            <li><span className="font-bold">System Uptime:</span> Continuous availability during attack vectors.</li>
            <li><span className="font-bold">Code Integrity:</span> Verification of self-healing code blocks.</li>
          </ul>
          <div className="mt-6 p-3 bg-black text-[#f0e6d2] text-center font-bold">
            CURRENT STATUS: OPTIMAL
          </div>
        </div>
      </div>
    </div>
  );
}
