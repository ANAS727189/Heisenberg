import React from "react";

export default function NewsTicker() {
  return (
    <div className="fixed top-0 left-0 z-50 w-full overflow-hidden bg-black py-1 font-mono text-xs whitespace-nowrap text-white">
      <div className="animate-marquee inline-block">
        BREAKING: AI AGENTS TAKE OVER HACKATHON • HEISENBERG PROTOCOL DEPLOYED •
        CODERABBIT ON STANDBY • VULNERABILITY DETECTED IN SECTOR 7 • MARKET
        CRASH IMMINENT • BREAKING: AI AGENTS TAKE OVER HACKATHON • HEISENBERG
        PROTOCOL DEPLOYED • CODERABBIT ON STANDBY • VULNERABILITY DETECTED IN
        SECTOR 7 • MARKET CRASH IMMINENT •
      </div>
    </div>
  );
}
