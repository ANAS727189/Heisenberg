import React from "react";

interface LatestWireProps {
  logs: string[];
}

export default function LatestWire({ logs }: LatestWireProps) {
  return (
    <div>
      <h2 className="mb-4 border-b-2 border-black text-2xl font-bold uppercase">
        Latest Wire
      </h2>
      <div className="h-[600px] space-y-3 overflow-y-auto border border-gray-200 bg-gray-50 p-2 pr-2 font-mono text-xs">
        {logs.length === 0 && (
          <p className="mt-10 text-center text-gray-500 italic">
            Waiting for incoming transmission...
          </p>
        )}
        {logs.map((log, i) => (
          <div key={i} className="border-b border-gray-300 pb-2">
            <span className="mb-1 block font-bold text-gray-500">
              [{new Date().toLocaleTimeString()}]
            </span>
            <span className="block leading-tight">{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
