import React, { useState, useEffect } from 'react';

// Offer closes at the end of December 4, 2026 (Austin, TX time).
const DEADLINE = new Date('2026-12-04T23:59:59-06:00').getTime();

const pad = (n) => String(n).padStart(2, '0');

export default function Countdown() {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const left = DEADLINE - now;
  if (left <= 0) return null;

  const units = [
    ['Days', Math.floor(left / 86400000)],
    ['Hours', Math.floor((left / 3600000) % 24)],
    ['Minutes', Math.floor((left / 60000) % 60)],
    ['Seconds', Math.floor((left / 1000) % 60)],
  ];

  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-widest text-background/50 mb-3 font-body">Offer ends December 4</p>
      <div className="flex gap-3">
        {units.map(([label, value]) => (
          <div key={label} className="min-w-[72px] border border-background/20 rounded-sm px-3 py-3 text-center">
            <span className="block font-heading text-3xl text-background leading-none">{pad(value)}</span>
            <span className="block text-[10px] uppercase tracking-widest text-background/50 mt-2 font-body">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}