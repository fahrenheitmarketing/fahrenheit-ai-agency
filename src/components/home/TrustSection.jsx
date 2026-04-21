import React from 'react';
import { Shield, Calendar, TrendingUp, Zap } from 'lucide-react';

const pillars = [
  {
    icon: Calendar,
    title: 'Month-to-Month',
    description: "No annual contracts. No lock-ins. We earn your business every single month — or you're free to leave.",
  },
  {
    icon: Shield,
    title: 'Full Transparency',
    description: 'Real-time dashboards, clear reporting, and honest communication. You always know where your investment goes.',
  },
  {
    icon: Zap,
    title: 'AI-First Approach',
    description: 'Every strategy is powered by machine learning and data intelligence. We move faster and smarter than traditional agencies.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Since 2008',
    description: 'Over 15 years of delivering results for brands like PepsiCo, TransCore, CITGO, and hundreds of growth-stage companies.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 font-body">
            Why Fahrenheit
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
            We Must Earn Your Trust.<br />Every Month.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            If we don't deliver, you walk. It's that simple. This accountability is what drives us to outperform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <p.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}