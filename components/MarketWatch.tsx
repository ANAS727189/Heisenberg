import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

interface MarketWatchProps {
  trafficData: any[];
}

export default function MarketWatch({ trafficData }: MarketWatchProps) {
  return (
    <div className="border-b-2 border-black pb-4">
      <h2 className="text-2xl font-bold mb-4 uppercase flex items-center gap-2">
        <Activity className="w-6 h-6" /> Market Watch
      </h2>
      <div className="h-48 w-full bg-white border border-black p-2" style={{ minHeight: '200px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #000', fontFamily: 'monospace' }}
              itemStyle={{ color: '#000' }}
            />
            <Line type="monotone" dataKey="requests" stroke="#000" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="latency" stroke="#666" strokeWidth={1} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs mt-2 font-mono text-gray-600">Fig 1. Real-time network traffic analysis showing request volume vs latency.</p>
    </div>
  );
}
