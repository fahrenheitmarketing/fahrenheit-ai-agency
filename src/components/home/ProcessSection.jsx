import React from 'react';

const steps = [
  { num: '01', title: 'Diagnose', description: 'Map the P&L to the workflows. Identify where AI creates leverage — and where it doesn\'t.' },
  { num: '02', title: 'Deploy', description: 'Ship working systems in weeks, not quarters. Models, integrations, strategy — production-grade from day one.' },
  { num: '03', title: 'Scale', description: 'Operate, measure, and compound. Outcomes reviewed monthly against revenue and efficiency targets.' },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6 lg:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-16 font-body">05 · How we work</p>
        <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-16 max-w-2xl">
          A short engagement. A long runway.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((s, i) => (
            <div key={i} className="py-8 pr-8 border-t border-border md:border-l first:md:border-l-0 md:pl-8 first:md:pl-0">
              <p className="text-xs text-muted-foreground font-body mb-6">{s.num}</p>
              <h3 className="font-heading text-2xl font-normal mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}