import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Globe, Search, FileText, Brain, TrendingUp, BarChart3, MapPin, Link2 } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';

const capabilities = [
  {
    icon: Globe,
    title: 'Technical SEO & Site Architecture',
    description: 'The foundation. Crawlability, Core Web Vitals, schema markup, canonical structure, and page speed — engineered so that both Google\'s crawler and its AI systems can understand and trust your site.',
  },
  {
    icon: Search,
    title: 'Keyword Strategy & Search Intent Mapping',
    description: 'We map queries not just by volume and competition, but by how they\'re likely to be answered — whether that\'s a ranked result, an AI Overview snippet, or a generative citation. Strategy is built accordingly.',
  },
  {
    icon: FileText,
    title: 'Content Creation & Topical Authority',
    description: 'AI-assisted content designed to satisfy human readers, earn EEAT signals, and structure information in the way generative engines prefer to cite. We build depth around the topics you need to own.',
  },
  {
    icon: Brain,
    title: 'AI Overview Optimization (AIO)',
    description: 'Structured, authoritative content that earns placement in Google\'s AI-generated summaries — the new "position zero." We analyze which queries trigger AIO boxes in your category and reverse-engineer what it takes to appear.',
  },
  {
    icon: TrendingUp,
    title: 'Generative Engine Optimization (GIO)',
    description: 'We position your brand to be cited by ChatGPT, Perplexity, Gemini, and similar tools. This means building the kind of authoritative, well-structured, frequently-referenced content that generative models treat as reliable sources.',
  },
  {
    icon: Link2,
    title: 'Link Authority & Digital PR',
    description: 'Strategic backlink acquisition guided by AI analysis of your competitive landscape. Domain authority remains a prerequisite for appearing in AI-generated answers — you can\'t skip this step.',
  },
  {
    icon: MapPin,
    title: 'Local & Enterprise SEO',
    description: 'Whether you\'re serving a single market or hundreds of locations, we build strategies scaled to your footprint — with local schema, GBP optimization, and geo-targeted content included.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Attributable Reporting',
    description: 'Real-time dashboards and monthly reports that connect organic performance to pipeline and revenue — not just keyword rankings.',
  },
];

const retainerItems = [
  'Comprehensive site audit & technical remediation',
  'AI-powered keyword research & intent mapping',
  'Monthly content creation & optimization',
  'AI Overview opportunity analysis & snippet targeting',
  'Generative engine citation strategy & content structuring',
  'Backlink analysis & authority building',
  'Core Web Vitals & page speed optimization',
  'Schema markup & structured data implementation',
  'Monthly performance reporting with revenue attribution',
  'Dedicated SEO strategist',
];

const searchRealities = [
  {
    label: 'AI Overviews (AIO)',
    description: 'Google now answers queries directly at the top of the SERP using AI-generated summaries. Brands that don\'t appear in those summaries are invisible to a growing share of searchers, regardless of their ranking position.',
  },
  {
    label: 'Generative Engine Optimization (GEO/GIO)',
    description: 'Tools like ChatGPT, Perplexity, and Gemini are becoming primary research interfaces for decision-makers. They don\'t crawl your page and rank it — they synthesize information and cite sources. Getting cited requires a different kind of authority signal.',
  },
  {
    label: 'Classic SEO',
    description: 'The foundation everything else is built on. Technical integrity, topical authority, structured data, and link equity remain the conditions under which AI surfaces are willing to trust and surface your content.',
  },
];

export default function SEO() {
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
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Search Engine Optimization</p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8 max-w-4xl">
            SEO That Ranks on Google, Appears in AI,<br />
            <span className="italic">and Wins Everywhere Search Happens.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl font-body">
            SEO used to mean one thing: rank on page one. Today, your buyers are finding answers through Google's AI Overviews, ChatGPT, Perplexity, and Gemini — surfaces that pull from the web but play by different rules. We build SEO programs that win the traditional SERP and earn your brand a place in every AI-generated answer that matters to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <Button size="lg" className="rounded-sm px-8 gap-2 font-body bg-accent hover:bg-accent/90 text-white border-0">
                Get Your SEO Audit <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="rounded-sm px-8 font-body">
                From $1,500/mo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The New Search Reality */}
      <section className="py-24 px-6 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-16">
            <div className="lg:col-span-1 pr-0 lg:pr-16 mb-10 lg:mb-0">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">The New Search Reality</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
                Search Has Fragmented. Most Agencies Haven't Noticed.
              </h2>
            </div>
            <div className="lg:col-span-2">
              <p className="text-muted-foreground leading-relaxed mb-10 font-body">
                The traditional playbook — target keywords, build links, publish content — still matters. But it's no longer enough on its own. Here's what's changed:
              </p>
              <div className="space-y-0">
                {searchRealities.map((item, i) => (
                  <div key={item.label} className="py-8 border-t border-border">
                    <div className="flex items-start gap-8">
                      <span className="text-xs text-muted-foreground font-body pt-1 flex-shrink-0">0{i + 1}</span>
                      <div>
                        <h3 className="font-heading text-xl font-normal mb-2">{item.label}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed font-body">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-foreground font-body mt-8 border-t border-border pt-8">
                We don't treat these as separate disciplines. We build one integrated program that earns visibility across all three.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Capabilities</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-16">
            <div className="lg:col-span-1 pr-0 lg:pr-16 mb-10 lg:mb-0">
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
                Full-Spectrum Search Visibility
              </h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4 font-body leading-relaxed">
                Classic SEO · AI Overviews · Generative Engines
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {capabilities.map((cap) => (
                <div key={cap.title} className="bg-background hover:bg-secondary/40 transition-colors duration-200 p-8">
                  <cap.icon className="w-5 h-5 text-accent mb-5" />
                  <h3 className="font-heading text-lg font-normal mb-2">{cap.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">What's Included</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-6">
                Your SEO Retainer, Built for 2025 and Beyond
              </h2>
              <p className="text-muted-foreground leading-relaxed font-body">
                No piecemeal tactics. A complete system that covers traditional search, AI Overviews, and generative engine presence — from day one.
              </p>
            </div>
            <div className="space-y-0">
              {retainerItems.map((item) => (
                <div key={item} className="flex items-start gap-4 py-4 border-b border-border last:border-0">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-body">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The AI Advantage */}
      <section className="py-24 px-6 bg-foreground text-background border-b border-border relative overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-10 select-none rotate-180"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-background/40 mb-6 font-body">The AI Advantage</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-6">
                Why SEO Without AIO and GIO Is Already Incomplete
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-background/70 leading-relaxed font-body">
                Traditional agencies are still optimizing for a version of search that's rapidly shrinking. Ranking #3 on a keyword where Google's AI Overview occupies the full above-the-fold view means most users never scroll to your result.
              </p>
              <p className="text-background/70 leading-relaxed font-body">
                We use AI internally to accelerate our research, prioritize opportunities, and predict content performance before you invest in creating it. But more importantly, we build your program for the surfaces where your buyers are actually searching — which increasingly means AI-generated answers, not just blue links.
              </p>
              <p className="text-background/70 leading-relaxed font-body">
                The result: faster time to visibility, broader coverage across search surfaces, and a compounding authority that makes your brand harder to displace everywhere that matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Appear Everywhere Your Buyers Search?"
        subtext="Start with a free SEO audit. We'll show you where you stand in traditional search, where you're missing in AI Overviews, and what it would take to get cited in generative engines."
        buttonText="Get Your Free Audit"
        secondaryText="View Pricing"
        secondaryLink="/pricing"
      />
    </>
  );
}