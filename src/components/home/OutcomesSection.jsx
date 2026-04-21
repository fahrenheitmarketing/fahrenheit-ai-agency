import React from 'react';

const outcomes = [
  {
    category: 'Enterprise platform',
    metric: '3.4×',
    label: 'faster content velocity',
    description: 'AI-assisted production pipeline replaced a 12-person editorial workflow.',
  },
  {
    category: 'Specialty retailer',
    metric: '+28%',
    label: 'revenue growth',
    description: 'Personalized strategy and predictive optimization on existing traffic.',
  },
  {
    category: 'B2B resource hub',
    metric: '−62%',
    label: 'cost per engaged user',
    description: 'AI-optimized acquisition mix across paid, organic, and retention automations.',
  },
];

export default function OutcomesSection() {
  return (
    <section className="py-24 px-6 lg:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-16 font-body">04 · Outcomes</p>
        <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-16 max-w-2xl">
          What it looks like when intelligence shows up in the numbers.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {outcomes.map((o, i) => (
            <div key={i} className="py-8 pr-8 border-t border-border md:border-l first:md:border-l-0 md:pl-8 first:md:pl-0">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">{o.category}</p>
              <p className="font-heading text-5xl md:text-6xl font-normal text-accent mb-2">{o.metric}</p>
              <p className="text-sm font-body text-foreground mb-3">{o.label}</p>
              <p className="text-sm text-muted-foreground font-body leading-relaxed">{o.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}