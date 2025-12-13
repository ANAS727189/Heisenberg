import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Terminal } from "lucide-react";

interface CodeGenOverlayProps {
  isVisible: boolean;
}

export default function CodeGenOverlay({ isVisible }: CodeGenOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 font-mono">
      <div className="w-full max-w-4xl rounded border border-green-500/30 bg-black p-6 shadow-[0_0_50px_rgba(0,255,0,0.1)]">
        <div className="mb-4 flex items-center justify-between border-b border-green-500/30 pb-2">
          <h3 className="flex items-center gap-2 text-xl font-bold text-green-500">
            <Terminal className="h-5 w-5" /> OUMI_AGENT_V1 :: GENERATING_PATCH
          </h3>
          <span className="animate-pulse text-xs text-green-500/50">
            PROCESSING...
          </span>
        </div>
        <div className="min-h-[300px] text-sm leading-relaxed text-green-400 md:text-base">
          <pre className="font-mono whitespace-pre-wrap">
            <TypeAnimation
              sequence={[
                `// ANALYZING VULNERABILITY PATTERN: DATABASE_LOCK_TIMEOUT\n// QUERYING KNOWLEDGE BASE...\n// MATCH FOUND: RATE_LIMITING_STRATEGY\n\nimport { NextResponse } from 'next/server';\n\n// Heisenberg Auto-Generated Rate Limiter\n// Applied to mitigate DDoS vector detected in /api/victim\n\nconst RATE_LIMIT = 10;\nconst WINDOW = 60 * 1000; // 1 minute\nconst ipMap = new Map();\n\nexport function middleware(request) {\n  const ip = request.headers.get('x-forwarded-for') || 'unknown';\n  const now = Date.now();\n  \n  const record = ipMap.get(ip) || { count: 0, start: now };\n  \n  if (now - record.start > WINDOW) {\n      record.count = 1;\n      record.start = now;\n  } else {\n      record.count++;\n  }\n  \n  ipMap.set(ip, record);\n  \n  if (record.count > RATE_LIMIT) {\n      return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });\n  }\n}`,
                1000,
              ]}
              speed={75}
              style={{ display: "inline-block" }}
              cursor={true}
            />
          </pre>
        </div>
        <div className="mt-4 flex justify-between border-t border-green-500/30 pt-2 text-xs text-green-500/50">
          <span>TARGET: middleware.ts</span>
          <span>STATUS: WRITING...</span>
        </div>
      </div>
    </div>
  );
}
