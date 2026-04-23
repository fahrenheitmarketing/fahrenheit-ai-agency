import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CTASection from '../components/shared/CTASection';

const services = [
  {
    num: '01',
    subtitle: 'SEO · SEM · Social',
    title: 'AI Growth Systems',
    tagline: 'Compound revenue from owned channels',
    description: 'Marketing engines that learn. We deploy AI across acquisition, retention, and content so every dollar produces measurable lift — not just activity.',
    link: '/services/seo',
    highlights: ['AI-powered keyword research', 'Content strategy & creation', 'Technical SEO optimization', 'Link authority building'],
  },
  {
    num: '02',
    subtitle: 'CRO · Analytics',
    title: 'AI-Powered Conversion',
    tagline: 'Higher conversion, bigger return',
    description: 'Intelligent optimization that personalizes, tests, and improves every touchpoint in real time. Built for profit, not just traffic.',
    link: '/services/cro',
    highlights: ['AI behavioral analysis', 'Intelligent A/B testing', 'Landing page optimization', 'Heatmap & session analysis'],
  },
  {
    num: '03',
    subtitle: 'SEM · PPC',
    title: 'Paid Media Intelligence',
    tagline: 'Zero waste. Maximum ROAS.',
    description: "AI-managed paid campaigns across search, social, and display. Bids, budgets, and creative — optimized 24/7 so you don't have to.",
    link: '/services/sem',
    highlights: ['AI bid optimization', 'Precision audience targeting', 'Ad creative intelligence', 'Full-funnel attribution'],
  },
  {
    num: '04',
    subtitle: 'Social Media',
    title: 'Social Media Marketing',
    tagline: 'Social that actually converts',
    description: "Vanity metrics don't pay the bills. We build AI-informed social strategies that drive real engagement, qualified traffic, and measurable revenue.",
    link: '/services/smm',
    highlights: ['AI content intelligence', 'Audience identification', 'Paid social amplification', 'Community management'],
  },
  {
    num: '05',
    subtitle: 'Strategy · Planning',
    title: 'Strategic Intelligence',
    tagline: 'Intelligence, not instinct',
    description: "Data-driven roadmaps built from competitive analysis, market signals, and AI modeling. Your growth strategy shouldn't rely on gut feel.",
    link: '/services/strategy',
    highlights: ['Market intelligence', 'Channel mix strategy', 'Predictive growth modeling', 'Quarterly planning reviews'],
  },
  {
    num: '06',
    subtitle: 'HubSpot · Automation',
    title: 'Marketing Automation',
    tagline: 'Stop doing manual marketing',
    description: 'AI-driven workflows, lead scoring, and nurturing sequences that react in real-time — so your pipeline never sleeps.',
    link: '/services/marketing-automation',
    highlights: ['Workflow automation', 'Lead intelligence', 'Email optimization', 'Revenue operations'],
  },
  {
    num: '07',
    subtitle: 'AI · Development',
    title: 'Software Development',
    tagline: 'Enterprise software. Startup budget.',
    description: "Custom software that once required million-dollar budgets is now within reach. AI-powered development stacks let us build, ship, and scale at a fraction of the traditional cost.",
    link: '/services/software-development',
    highlights: ['Custom web applications', 'AI integration', 'Data architecture', 'Real-time platforms'],
  },
];

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden border-b border-border">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none rotate-180 -z-10"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">What We Do</p>
          <div className="max-w-3xl">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8">
              Seven Systems.<br />
              <span className="italic">One Mandate.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed font-body">
              Every service we offer is powered by AI — not as a buzzword, but as a fundamental operating advantage. We use artificial intelligence to find opportunities faster, eliminate waste, and compound results month after month.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto divide-y divide-border">
          {services.map((s) => (
            <div key={s.num} className="py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 items-start">
              {/* Left */}
              <div>
                <span className="text-xs text-muted-foreground font-body block mb-3">{s.num} · {s.subtitle}</span>
                <h2 className="font-heading text-3xl font-normal mb-2">{s.title}</h2>
                <p className="text-xs uppercase tracking-widest text-accent font-body">{s.tagline}</p>
              </div>
              {/* Middle */}
              <div>
                <p className="text-muted-foreground leading-relaxed font-body mb-6">{s.description}</p>
                <ul className="space-y-2">
                  {s.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right */}
              <div className="flex lg:justify-end items-start">
                <Link
                  to={s.link}
                  className="inline-flex items-center gap-2 text-sm font-body font-medium border border-border px-5 py-3 rounded-sm hover:border-foreground hover:bg-secondary transition-colors"
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        headline="Not sure where to start?"
        subtext="Book a free 30-minute strategy call. We'll assess your biggest opportunities and tell you exactly which services will move the needle."
        buttonText="Book a strategy call"
      />
    </>
  );
}