import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, Brain, TrendingUp, FileText, Globe, BarChart3, CheckCircle } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import SectionHeader from '../../components/shared/SectionHeader';

const capabilities = [
  { icon: Brain, title: 'AI-Powered Keyword Research', description: 'Machine learning models analyze search intent, competition, and opportunity to build keyword strategies that drive qualified traffic.' },
  { icon: FileText, title: 'Content Strategy & Creation', description: 'AI-assisted content that satisfies search intent, builds topical authority, and converts readers into customers.' },
  { icon: Globe, title: 'Technical SEO Optimization', description: 'Site architecture, core web vitals, schema markup, and crawl optimization — engineered for maximum search visibility.' },
  { icon: TrendingUp, title: 'Link Authority Building', description: 'Strategic digital PR and link acquisition guided by AI analysis of your competitive backlink landscape.' },
  { icon: BarChart3, title: 'Analytics & Reporting', description: 'Real-time dashboards and monthly reports that connect SEO activity directly to revenue and business outcomes.' },
  { icon: Search, title: 'Local & Enterprise SEO', description: 'Tailored strategies whether you serve a single market or operate across hundreds of locations nationwide.' },
];

export default function SEO() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-60 select-none -z-10"
        />
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none rotate-180 -z-10"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 font-body">
              Search Engine Optimization
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              AI-Powered SEO That Drives <span className="text-primary">Organic Revenue</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Traditional SEO is slow and reactive. We use artificial intelligence to identify opportunities faster, prioritize higher-impact work, and deliver compounding organic growth — all within a transparent, month-to-month engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 gap-2 font-body">
                  Get Your SEO Audit <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-body">
                  From $1,500/mo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Capabilities"
            title="Full-Spectrum SEO, Enhanced by AI"
            description="Every aspect of your search presence — from technical foundations to content and authority — is optimized using data intelligence."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.title} className="bg-card p-8 rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <cap.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-normal mb-2">{cap.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">What's Included in Your SEO Retainer</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Every engagement includes a comprehensive approach to search visibility. No piecemeal tactics — a complete system for organic growth.
              </p>
              <div className="space-y-4">
                {['Comprehensive site audit & technical optimization', 'AI-powered keyword strategy & content roadmap', 'Monthly content creation & optimization', 'Backlink analysis & authority building', 'Core Web Vitals & page speed optimization', 'Schema markup & structured data', 'Monthly performance reporting with ROI tracking', 'Dedicated SEO strategist'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-foreground text-background rounded-2xl p-10">
              <h3 className="font-heading text-2xl font-normal mb-4">The AI Advantage</h3>
              <p className="text-background/70 leading-relaxed mb-6">
                While traditional agencies rely on manual research and gut instinct, our AI stack continuously analyzes your competitive landscape, identifies ranking opportunities, and predicts which content will perform — before you invest in creating it.
              </p>
              <p className="text-background/70 leading-relaxed">
                The result? Faster time to ranking, higher ROI on content investment, and a compounding advantage that grows every month.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Dominate Search?"
        subtext="Get a free AI-powered SEO audit and discover what you're missing. Month-to-month, starting at $1,500."
        buttonText="Request Your Audit"
      />
    </>
  );
}