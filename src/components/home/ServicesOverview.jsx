import React from 'react';
import { mediaUrl } from '@/lib/media';
import { Link } from 'react-router-dom';

const services = [
  {
    num: '01 / 09',
    subtitle: 'Strategy · Planning',
    title: 'Strategy',
    tagline: 'Intelligence, not instinct',
    description: "Data-driven roadmaps built from competitive analysis, market signals, and AI modeling. Your growth strategy shouldn't rely on gut feel.",
    link: '/services/strategy',
  },
  {
    num: '02 / 09',
    subtitle: 'Search · AI Visibility',
    title: 'SEO',
    tagline: 'Own page one and AI search results',
    description: 'AI-powered research, content, and technical optimization so organic growth compounds month after month.',
    link: '/services/seo',
  },
  {
    num: '03 / 09',
    subtitle: 'SEM · PPC',
    title: 'SEM / PPC',
    tagline: 'Zero waste. Maximum ROAS.',
    description: "AI-managed paid campaigns across search, social, and display. Bids, budgets, and creative — optimized 24/7 so you don't have to.",
    link: '/services/sem',
  },
  {
    num: '04 / 09',
    subtitle: 'Social Media',
    title: 'Social Media',
    tagline: 'Social that actually converts',
    description: "Vanity metrics don't pay the bills. We build AI-informed social strategies that drive real engagement, qualified traffic, and measurable revenue.",
    link: '/services/smm',
  },
  {
    num: '05 / 09',
    subtitle: 'CRO · Analytics',
    title: 'CRO',
    tagline: 'Higher conversion, bigger return',
    description: 'Intelligent optimization that personalizes, tests, and improves every touchpoint in real time. Built for profit, not just traffic.',
    link: '/services/cro',
  },
  {
    num: '06 / 09',
    subtitle: 'HubSpot · Automation',
    title: 'Marketing Automation',
    tagline: 'Stop doing manual marketing',
    description: 'AI-driven workflows, lead scoring, and nurturing sequences that react in real-time — so your pipeline never sleeps.',
    link: '/services/marketing-automation',
  },
  {
    num: '07 / 09',
    subtitle: 'AI · Development',
    title: 'Software Development',
    tagline: 'Enterprise software. Startup budget.',
    description: "Custom software that once required million-dollar budgets is now within reach. AI-powered development stacks let us build, ship, and scale at a fraction of the traditional cost.",
    link: '/services/software-development',
  },
  {
    num: '08 / 09',
    subtitle: 'Outbound · Pipeline',
    title: 'Email Marketing',
    tagline: 'Cold email that builds pipeline',
    description: 'A managed cold email program covering targeting, messaging, and deliverability, so qualified conversations land on your calendar.',
    link: '/services/email-marketing',
  },
  {
    num: '09 / 09',
    subtitle: 'Hosting · Security',
    title: 'Managed Hosting & Security',
    tagline: 'Fast, hardened, fully managed',
    description: 'Professional managed hosting with layered security, proactive monitoring, and human-led incident response from an accountable team.',
    link: '/services/managed-hosting',
  },
];

export default function ServicesOverview() {
  return (
    <section className="relative py-24 px-6 lg:px-10 overflow-hidden">
      <img
        src={mediaUrl("https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png")}
        width="1002" height="687" alt="Decorative geometric cube pattern" aria-hidden="true"
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[400px] pointer-events-none opacity-60 select-none"
      />
      <img
        src={mediaUrl("https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png")}
        width="1002" height="687" alt="Decorative geometric cube pattern" aria-hidden="true"
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-70 select-none rotate-180"
      />
      <style>{`@keyframes services-arrive{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="relative max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8 font-body">02 · What we do</p>
        <div className="flex flex-col gap-12">
          <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] max-w-3xl">
            Nine systems. One mandate: turn AI into P&L.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <Link
                key={s.num}
                to={s.link}
                style={{ animation: 'services-arrive .48s cubic-bezier(.2,.75,.25,1) both', animationDelay: `${i * 0.035}s` }}
                className="group flex flex-col min-w-0 px-6 py-6 bg-card border border-border rounded-[3px] shadow-[0_2px_8px_rgba(47,37,29,0.035)] transition-[transform,box-shadow,border-color,background-color] duration-200 hover:-translate-y-[3px] hover:bg-background hover:border-[#d7b7a8] hover:shadow-[0_10px_22px_rgba(66,39,24,0.09)] focus-visible:-translate-y-[3px] focus-visible:bg-background focus-visible:border-[#d7b7a8] focus-visible:shadow-[0_10px_22px_rgba(66,39,24,0.09)] focus-visible:outline-none active:shadow-[0_4px_10px_rgba(66,39,24,0.08)]"
              >
                <span className="text-xs text-muted-foreground font-body tabular-nums mb-3">{s.num}</span>
                <div className="flex items-start justify-between gap-2.5">
                  <h3 className="font-heading text-2xl font-normal leading-[1.15]">{s.title}</h3>
                  <span className="shrink-0 text-lg leading-none text-accent transition-[transform,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#9f3217] group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:text-[#9f3217]">↗</span>
                </div>
                <p className="mt-2 text-xs uppercase tracking-widest text-accent font-body leading-snug">{s.tagline}</p>
                <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="border-t border-border mt-10 pt-8">
          <Link to="/services" className="group inline-flex items-center gap-2.5 text-sm font-semibold text-foreground/80 hover:text-accent focus-visible:text-accent active:text-[#8f3119] focus-visible:outline-none transition-colors duration-200 font-body">
            Explore all services <span className="text-accent text-base transition-transform duration-200 group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px]">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}