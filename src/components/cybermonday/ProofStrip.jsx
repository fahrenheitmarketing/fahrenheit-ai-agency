import React from 'react';

const stats = [
  { value: 'Since 2008', label: 'Helping businesses grow, from Austin and beyond', tight: true },
  { value: '568%', label: 'ROAS on Google Shopping in 90 days for a pet supply retailer' },
  { value: '+1,874%', label: 'Local search visibility for a commercial cleaning company' },
];

export default function ProofStrip() {
  return (
    <section className="py-20 px-6 lg:px-10 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Why Fahrenheit</p>
          <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1]">An Austin agency with the results to show for it</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s) => (
            <div key={s.value} className="border border-border rounded-sm bg-card p-8">
              <span className={`font-heading text-5xl font-normal text-accent block mb-4 ${s.tight ? 'tracking-tighter' : ''}`}>{s.value}</span>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}