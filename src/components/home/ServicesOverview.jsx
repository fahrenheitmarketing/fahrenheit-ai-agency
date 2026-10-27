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
        alt="" aria-hidden="true"
        aria-hidden="true"
        className="absolute bottom-0 right-0 w-[400px] pointer-events-none opacity-60 select-none"
      />
      <img
        src={mediaUrl("https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png")}
        alt="" aria-hidden="true"
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-70 select-none rotate-180"
      />
      <div className="relative max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-16 font-body">02 · What we do</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="lg:col-span-1 pr-0 lg:pr-16 mb-12 lg:mb-0">
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
              Nine systems. One mandate: turn AI into P&L.
            </h2>
          </div>
          <div className="lg:col-span-2">
            {services.map((s) => (
              <Link key={s.num} to={s.link} className="group block py-8 border-t border-border hover:border-foreground/20 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 origin-left transition-transform duration-300 group-hover:scale-[1.3]">
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
              <Link to="/services" className="text-sm font-body text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2">
                Explore all services <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}