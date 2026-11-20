import React from 'react';

const steps = [
  { number: '01', title: 'Claim your offer', body: 'Fill out the short form below and tell us which offer you want: email marketing, managed hosting, or both.' },
  { number: '02', title: 'We reach out', body: 'Someone from our team will contact you within one business day to talk through your goals and confirm the details.' },
  { number: '03', title: 'Sign by December 4', body: 'Sign between November 27 and December 4, 2026. Your service can start as late as January 31, 2027.' },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 lg:px-10 border-b border-border bg-card/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">How it works</p>
          <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1]">Three steps to lock in the offer</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border rounded-sm overflow-hidden">
          {steps.map((s, i) => (
            <div key={s.number} className={`p-10 bg-background ${i < steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`}>
              <span className="font-heading text-5xl font-normal text-border mb-6 block">{s.number}</span>
              <h3 className="font-heading text-xl font-normal mb-4">{s.title}</h3>
              <p className="text-sm font-body text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}