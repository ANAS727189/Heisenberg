import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ShieldAlert } from "lucide-react";
import { VULNERABILITY_DATA } from "../lib/constants";

export default function ThreatIndex() {
  return (
    <div className="border-b-2 border-black pb-4">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold uppercase">
        <ShieldAlert className="h-6 w-6" /> Threat Index
      </h2>
      <div
        className="h-48 w-full border border-black bg-white p-2"
        style={{ minHeight: "200px" }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={VULNERABILITY_DATA}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fontFamily: "monospace" }}
              interval={0}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "#f4f4f4" }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #000",
              }}
            />
            <Bar dataKey="value" fill="#000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 font-mono text-xs text-gray-600">
        Fig 2. Global vulnerability distribution by category.
      </p>
    </div>
  );
}
