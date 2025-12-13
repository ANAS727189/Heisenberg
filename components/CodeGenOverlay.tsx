import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Terminal } from 'lucide-react';

interface CodeGenOverlayProps {
  isVisible: boolean;
}

export default function CodeGenOverlay({ isVisible }: CodeGenOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/95 z-[70] flex items-center justify-center p-4 font-mono">
      <div className="max-w-4xl w-full border border-green-500/30 p-6 rounded bg-black shadow-[0_0_50px_rgba(0,255,0,0.1)]">
        <div className="flex justify-between items-center mb-4 border-b border-green-500/30 pb-2">
          <h3 className="text-green-500 text-xl font-bold flex items-center gap-2">
            <Terminal className="w-5 h-5" /> OUMI_AGENT_V1 :: GENERATING_PATCH
          </h3>
          <span className="text-xs text-green-500/50 animate-pulse">PROCESSING...</span>
        </div>
        <div className="text-green-400 text-sm md:text-base leading-relaxed min-h-[300px]">
          <pre className="whitespace-pre-wrap font-mono">
            <TypeAnimation
              sequence={[
                `// ANALYZING VULNERABILITY PATTERN: DATABASE_LOCK_TIMEOUT\n// QUERYING KNOWLEDGE BASE...\n// MATCH FOUND: RATE_LIMITING_STRATEGY\n\nimport { NextResponse } from 'next/server';\n\n// Heisenberg Auto-Generated Rate Limiter\n// Applied to mitigate DDoS vector detected in /api/victim\n\nconst RATE_LIMIT = 10;\nconst WINDOW = 60 * 1000; // 1 minute\nconst ipMap = new Map();\n\nexport function middleware(request) {\n  const ip = request.headers.get('x-forwarded-for') || 'unknown';\n  const now = Date.now();\n  \n  const record = ipMap.get(ip) || { count: 0, start: now };\n  \n  if (now - record.start > WINDOW) {\n      record.count = 1;\n      record.start = now;\n  } else {\n      record.count++;\n  }\n  \n  ipMap.set(ip, record);\n  \n  if (record.count > RATE_LIMIT) {\n      return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });\n  }\n}`,
                1000
              ]}
              speed={75}
              style={{ display: 'inline-block' }}
              cursor={true}
            />
          </pre>
        </div>
        <div className="mt-4 text-xs text-green-500/50 border-t border-green-500/30 pt-2 flex justify-between">
          <span>TARGET: middleware.ts</span>
          <span>STATUS: WRITING...</span>
        </div>
      </div>
    </div>
  );
}
