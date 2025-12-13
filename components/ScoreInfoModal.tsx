import React from "react";
import { X } from "lucide-react";

interface ScoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScoreInfoModal({
  isOpen,
  onClose,
}: ScoreInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md border-4 border-black bg-[#f0e6d2] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 transition-colors hover:bg-black hover:text-[#f0e6d2]"
        >
          <X className="h-6 w-6" />
        </button>
        <h3 className="mb-4 border-b-2 border-black pb-2 font-serif text-2xl font-bold">
          Resilience Score Calculation
        </h3>
        <div className="space-y-4 font-mono text-sm">
          <p>
            The Resilience Score is calculated based on real-time telemetry from
            the autonomous agent:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="font-bold">Vulnerability Patch Rate:</span> Speed
              of fix deployment.
            </li>
            <li>
              <span className="font-bold">Traffic Analysis:</span> Ratio of
              legitimate vs. malicious requests.
            </li>
            <li>
              <span className="font-bold">System Uptime:</span> Continuous
              availability during attack vectors.
            </li>
            <li>
              <span className="font-bold">Code Integrity:</span> Verification of
              self-healing code blocks.
            </li>
          </ul>
          <div className="mt-6 bg-black p-3 text-center font-bold text-[#f0e6d2]">
            CURRENT STATUS: OPTIMAL
          </div>
        </div>
      </div>
    </div>
  );
}
