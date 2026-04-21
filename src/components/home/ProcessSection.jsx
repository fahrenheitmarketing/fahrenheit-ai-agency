import React from 'react';
import SectionHeader from '../shared/SectionHeader';

const steps = [
  {
    number: '01',
    title: 'Discovery & Audit',
    description: 'We analyze your digital footprint, competitive landscape, and market position using AI-powered tools that surface insights traditional audits miss.',
  },
  {
    number: '02',
    title: 'Strategy & Architecture',
    description: 'We build a data-driven strategy tailored to your goals — from keyword maps and content calendars to paid media plans and conversion frameworks.',
  },
  {
    number: '03',
    title: 'Execute & Optimize',
    description: 'Our team deploys campaigns while AI monitors performance in real-time, making micro-adjustments that compound into significant gains.',
  },
  {
    number: '04',
    title: 'Report & Evolve',
    description: 'Transparent monthly reporting with clear ROI metrics. We continuously refine the strategy as data reveals new opportunities.',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="How We Work"
          title="A Smarter Process, Powered by AI"
          description="From audit to optimization, artificial intelligence enhances every stage of our engagement."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-6xl font-heading font-bold text-primary/10">{step.number}</span>
              <h3 className="font-heading text-xl font-semibold mb-2 -mt-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}