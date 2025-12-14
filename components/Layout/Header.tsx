import React from "react";

export default function Header() {
  return (
    <header className="mx-auto mt-6 mb-8 max-w-[1920px] border-b-4 border-black pb-4 text-center">
      <div className="mb-2 flex justify-between border-b border-black pb-2 text-xs font-bold tracking-widest uppercase">
        <span>Vol. 1, No. 1</span>
        <span>{new Date().toLocaleDateString()}</span>
        <span>Price: Free</span>
      </div>
      <h1 className="mb-2 flex items-center justify-center gap-4 text-6xl font-black tracking-tighter uppercase md:text-9xl">
        <img src="/logo.svg" alt="Logo" className="h-16 w-16 md:h-32 md:w-32" />
        The Heisenberg
      </h1>
      <div className="mt-2 flex items-center justify-center gap-4 border-t border-black pt-2 text-center text-xl font-bold italic">
        <span className="hidden md:inline">★ ★ ★</span>
        "All the News That's Fit to Hack"
        <span className="hidden md:inline">★ ★ ★</span>
      </div>
    </header>
  );
}
