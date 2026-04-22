import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, BarChart3, Users, Workflow, Settings, TrendingUp } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';

const capabilities = [
  {
    icon: <Workflow className="w-6 h-6" />,
    title: 'Workflow Automation',
    description: 'AI-driven lead scoring, nurturing sequences, and behavioral triggers that react in real-time.'
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Lead Intelligence',
    description: 'Intelligent lead qualification and enrichment powered by AI analysis of prospect behavior.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Email Optimization',
    description: 'Dynamic content, AI-powered send times, and personalization at scale across all channels.'
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: 'Platform Integration',
    description: 'Seamless connection between HubSpot and your entire martech stack — CRM, analytics, ads, more.'
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Performance Analytics',
    description: 'Real-time dashboards and attribution modeling to track every stage of the customer journey.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Revenue Operations',
    description: 'Alignment between sales and marketing through unified data, workflows, and accountability.'
  },
];

export default function MarketingAutomation() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden border-b border-border">
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
          <p className="text-xs uppercase tracking-widest text-accent mb-6 font-body">Marketing Automation</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8">
                Stop Doing <span className="italic">Manual</span> Marketing
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-body">
                Marketing automation isn't just about sending emails. It's about building intelligent systems that nurture prospects, qualify leads, and accelerate revenue — 24/7. We're HubSpot certified experts, and we design workflows that actually work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="gap-2 font-body">
                    Audit Your Automation <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="font-body">
                    See Pricing
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Box */}
            <div className="bg-secondary/50 border border-border rounded-sm p-10 space-y-8">
              <div className="border-b border-border pb-6 last:border-0">
                <p className="text-3xl font-heading font-normal text-accent mb-2">90%</p>
                <p className="text-sm text-muted-foreground font-body">Of high-growth companies use marketing automation, yet 70% don't optimize it properly.</p>
              </div>
              <div className="border-b border-border pb-6 last:border-0">
                <p className="text-3xl font-heading font-normal text-accent mb-2">45%</p>
                <p className="text-sm text-muted-foreground font-body">Average improvement in lead response time with proper automation.</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-normal text-accent mb-2">3x</p>
                <p className="text-sm text-muted-foreground font-body">Increase in qualified leads within the first 6 months of optimization.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-16 font-body">Full-Stack Automation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="border border-border rounded-sm p-8 hover:border-accent transition-colors">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 text-accent">
                  {cap.icon}
                </div>
                <h3 className="font-heading text-lg font-normal mb-3">{cap.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HubSpot + Partners */}
      <section className="py-24 px-6 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Platform Agnostic</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-6">
                HubSpot Experts. Multi-Platform Capable.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 font-body">
                We're HubSpot certified partners because HubSpot gets it right — unified CRM, integrated automation, and intelligent workflows. But whether you're on HubSpot, Marketo, Klaviyo, ActiveCampaign, or building a custom stack, we speak the language of automation.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 font-body">
                All modern platforms share the same core workflow: segment audiences, trigger campaigns, score leads, nurture prospects, and measure impact. We help you master that workflow on whatever platform fits your business.
              </p>
              <div className="bg-foreground text-background rounded-sm p-6">
                <p className="text-xs uppercase tracking-widest font-body mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  Platforms We Service
                </p>
                <div className="grid grid-cols-2 gap-3 text-sm font-body">
                  <span>HubSpot (Preferred)</span>
                  <span>Marketo</span>
                  <span>Klaviyo</span>
                  <span>ActiveCampaign</span>
                  <span>Pardot</span>
                  <span>Custom Integrations</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border border-border rounded-sm p-8 bg-card">
                <h3 className="font-heading text-xl font-normal mb-4">What's Included</h3>
                <ul className="space-y-3 text-sm font-body text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>Complete workflow audit and redesign</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>Lead scoring and qualification system</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>Nurture sequence optimization and creation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>Platform integration and data synchronization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>Performance dashboard and reporting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>Team training and documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent flex-shrink-0">✓</span>
                    <span>Ongoing optimization and support</span>
                  </li>
                </ul>
              </div>
              <div className="border border-border rounded-sm p-8 bg-accent/5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Investment</p>
                <p className="font-heading text-2xl font-normal text-accent mb-3">$2,500 – $4,500/month</p>
                <p className="text-xs text-muted-foreground font-body">Month-to-month. Separate from platform costs and ad spend.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to Automate Your Growth?"
        subtext="Let's audit your current setup, identify gaps, and build a system that scales with your business."
        buttonText="Schedule Your Audit"
      />
    </>
  );
}