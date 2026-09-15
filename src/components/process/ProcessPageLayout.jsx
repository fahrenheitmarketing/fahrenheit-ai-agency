import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from '@/components/shared/CTASection';

export default function ProcessPageLayout({ num, title, tagline, intro, phases, deliverables, timeline, nextStep }) {
  return (
    <div>
      <section className="relative pt-32 pb-20 px-6 lg:px-10 border-b border-border overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[400px] pointer-events-none opacity-40 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8 font-body">
            Step {num} · How we work
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-6">
            {title}<span className="text-accent">.</span>
          </h1>
          <p className="text-xs uppercase tracking-widest text-accent font-body mb-8">{tagline}</p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl font-body mb-10">{intro}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors font-body"
            >
              Book a strategy call <span className="text-base">↗</span>
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 border border-border text-foreground/70 text-sm font-medium px-6 py-3 rounded-sm hover:border-foreground/40 hover:text-foreground transition-colors font-body"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:pr-16 mb-12 lg:mb-0">
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">What actually happens</h2>
          </div>
          <div className="lg:col-span-2">
            {phases.map((p, i) => (
              <div key={i} className="py-8 border-t border-border">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-xs text-muted-foreground font-body">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs uppercase tracking-widest text-accent font-body">{p.label}</span>
                </div>
                <h3 className="font-heading text-2xl font-normal mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-lg">{p.description}</p>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 lg:px-10 border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">What you get</p>
          <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-4 max-w-2xl">Deliverables</h2>
          <p className="text-sm text-muted-foreground font-body mb-12">{timeline}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deliverables.map((d, i) => (
              <div key={i} className="bg-card border border-border rounded-sm p-6">
                <p className="text-xs text-accent font-body mb-3">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-heading text-lg font-normal mb-2">{d.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
          {nextStep && (
            <Link
              to={nextStep.link}
              className="inline-flex items-center gap-3 mt-12 border border-border rounded-sm px-6 py-4 hover:border-accent/50 transition-colors group"
            >
              <span className="text-xs uppercase tracking-widest text-muted-foreground font-body">Next step</span>
              <span className="font-heading text-xl font-normal group-hover:text-accent transition-colors">{nextStep.label}</span>
              <span className="text-accent">→</span>
            </Link>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
}