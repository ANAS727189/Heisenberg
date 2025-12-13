import React from 'react';

export default function Header() {
  return (
    <header className="border-b-4 border-black mb-8 pb-4 text-center max-w-[1920px] mx-auto mt-6">
      <div className="border-b border-black pb-2 mb-2 flex justify-between text-xs font-bold uppercase tracking-widest">
        <span>Vol. 1, No. 1</span>
        <span>{new Date().toLocaleDateString()}</span>
        <span>Price: Free</span>
      </div>
      <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-2">
        The Heisenberg
      </h1>
      <div className="border-t border-black pt-2 mt-2 text-center font-bold italic text-xl flex justify-center items-center gap-4">
        <span className="hidden md:inline">★ ★ ★</span>
        "All the News That's Fit to Hack"
        <span className="hidden md:inline">★ ★ ★</span>
      </div>
    </header>
  );
}
