import React from 'react';

const clients = [
  'PepsiCo', 'Transcore', 'CITGO', 'Northern Reflections', 'Sentech',
  'Cactus Life Sciences', 'Lammes', 'Portacool', 'Solnexus', 'BLINK',
  'EliteCEU', 'Baker James',
];

export default function ClientMarquee() {
  return (
    <div className="border-t border-b border-border py-6 overflow-hidden bg-secondary/30">
      <p className="text-xs uppercase tracking-widest text-center text-muted-foreground mb-6 font-body px-6">
        Trusted where performance is measured
      </p>
      <div className="relative overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...clients, ...clients].map((name, i) => (
            <span key={i} className="font-heading text-xl font-normal text-foreground/50 hover:text-foreground transition-colors cursor-default flex-shrink-0">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}