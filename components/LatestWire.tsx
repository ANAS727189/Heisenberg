import React from 'react';

interface LatestWireProps {
  logs: string[];
}

export default function LatestWire({ logs }: LatestWireProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-black uppercase">Latest Wire</h2>
      <div className="font-mono text-xs h-[600px] overflow-y-auto pr-2 space-y-3 bg-gray-50 p-2 border border-gray-200">
        {logs.length === 0 && <p className="italic text-gray-500 text-center mt-10">Waiting for incoming transmission...</p>}
        {logs.map((log, i) => (
          <div key={i} className="border-b border-gray-300 pb-2">
            <span className="font-bold block text-gray-500 mb-1">[{new Date().toLocaleTimeString()}]</span>
            <span className="leading-tight block">{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
