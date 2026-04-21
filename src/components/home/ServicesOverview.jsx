import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    num: '01 / 04',
    subtitle: 'SEO · SEM · Social',
    title: 'AI Growth Systems',
    tagline: 'Compound revenue from owned channels',
    description: 'Marketing engines that learn. We deploy AI across acquisition, retention, and content so every dollar produces measurable lift — not just activity.',
    link: '/services/seo',
  },
  {
    num: '02 / 04',
    subtitle: 'CRO · Analytics',
    title: 'AI-Powered Conversion',
    tagline: 'Higher conversion, bigger return',
    description: 'Intelligent optimization that personalizes, tests, and improves every touchpoint in real time. Built for profit, not just traffic.',
    link: '/services/cro',
  },
  {
    num: '03 / 04',
    subtitle: 'SEM · Automation',
    title: 'Paid Media Intelligence',
    tagline: 'Zero waste. Maximum ROAS.',
    description: "AI-managed paid campaigns across search, social, and display. Bids, budgets, and creative — optimized 24/7 so you don't have to.",
    link: '/services/sem',
  },
  {
    num: '04 / 04',
    subtitle: 'Strategy · Planning',
    title: 'Strategic Intelligence',
    tagline: 'Intelligence, not instinct',
    description: "Data-driven roadmaps built from competitive analysis, market signals, and AI modeling. Your growth strategy shouldn't rely on gut feel.",
    link: '/services/strategy',
  },
];

export default function ServicesOverview() {
  return (
    <section className="relative py-24 px-6 lg:px-10 overflow-hidden">
      <img
        src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[400px] pointer-events-none opacity-60 select-none"
      />
      <div className="relative max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-16 font-body">02 · What we do</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:col-span-1 pr-0 lg:pr-16 mb-12 lg:mb-0">
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
              Four systems. One mandate: turn AI into P&L.
            </h2>
          </div>
          <div className="lg:col-span-2">
            {services.map((s) => (
              <Link key={s.num} to={s.link} className="group block py-8 border-t border-border hover:border-foreground/20 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-xs text-muted-foreground font-body">{s.num}</span>
                      <span className="text-xs uppercase tracking-widest text-accent font-body">{s.tagline}</span>
                    </div>
                    <h3 className="font-heading text-2xl font-normal mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-lg">{s.description}</p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors mt-1 text-lg flex-shrink-0">↗</span>
                </div>
              </Link>
            ))}
            <div className="pt-8 border-t border-border">
              <Link to="/services/seo" className="text-sm font-body text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2">
                Explore all services <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}