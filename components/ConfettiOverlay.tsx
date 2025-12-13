import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface ConfettiOverlayProps {
  show: boolean;
}

export default function ConfettiOverlay({ show }: ConfettiOverlayProps) {
  const { width, height } = useWindowSize();

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
      />
    </div>
  );
}
