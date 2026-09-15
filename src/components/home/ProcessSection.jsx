import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { num: '01', title: 'Diagnose', description: 'Map the P&L to the workflows. Identify where AI creates leverage — and where it doesn\'t.', link: '/process/diagnose' },
  { num: '02', title: 'Deploy', description: 'Ship working systems in weeks, not quarters. Models, integrations, strategy — production-grade from day one.', link: '/process/deploy' },
  { num: '03', title: 'Scale', description: 'Operate, measure, and compound. Outcomes reviewed monthly against revenue and efficiency targets.', link: '/process/scale' },
];

export default function ProcessSection() {
  return (
    <section className="relative py-24 px-6 lg:px-10 border-t border-border overflow-hidden">
      <img
        src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[420px] pointer-events-none opacity-60 select-none"
      />
      <div className="relative max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-16 font-body">05 · How we work</p>
        <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-16 max-w-2xl">
          A short engagement. A long runway.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <Link
              key={i}
              to={s.link}
              className="group bg-card border border-border rounded-sm shadow-sm p-8 block transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <p className="text-xs text-muted-foreground font-body mb-6">{s.num}</p>
              <h3 className="font-heading text-2xl font-normal mb-3 group-hover:text-accent transition-colors">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-6">{s.description}</p>
              <span className="text-xs uppercase tracking-widest text-accent font-body inline-flex items-center gap-2">
                Learn more <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

  );
}