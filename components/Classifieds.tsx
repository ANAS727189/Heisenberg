import React from 'react';

export default function Classifieds() {
  return (
    <div className="border-t-4 border-black pt-4">
      <h3 className="font-bold uppercase text-center mb-2 text-sm">Classifieds</h3>
      <div className="grid grid-cols-2 gap-2 text-[10px] leading-tight text-gray-600 text-justify">
        <p>WANTED: Experienced White Hat Hacker. Must know Rust. Contact: 555-0199.</p>
        <p>FOR SALE: Legacy Mainframe. Slightly used. Good for heating.</p>
        <p>LOST: Private Key. Last seen in public repo. Reward offered.</p>
        <p>SERVICES: DDoS Protection. We block packets so you don't have to.</p>
      </div>
    </div>
  );
}
