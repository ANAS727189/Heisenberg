import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 pt-4 border-t-4 border-black text-center text-xs font-serif">
      <p className="mb-2">
        VOL. CXXIV No. 42,109 &copy; {new Date().getFullYear()} HEISENBERG CHRONICLES. ALL RIGHTS RESERVED.
      </p>
      <p className="text-gray-500 italic">
        "I am the one who knocks... down firewalls."
      </p>
    </footer>
  );
}
