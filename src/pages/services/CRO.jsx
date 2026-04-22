import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart, Brain, TestTubes, MousePointerClick, Eye, Layers, CheckCircle } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import SectionHeader from '../../components/shared/SectionHeader';

const capabilities = [
  { icon: Brain, title: 'AI Behavioral Analysis', description: 'Machine learning analyzes thousands of user sessions to identify friction points, drop-offs, and conversion barriers invisible to manual review.' },
  { icon: TestTubes, title: 'Intelligent A/B Testing', description: 'AI-driven test prioritization and multi-variate testing that reaches statistical significance faster and with more actionable insights.' },
  { icon: MousePointerClick, title: 'Landing Page Optimization', description: 'Data-informed page redesigns and micro-optimizations that incrementally and dramatically improve conversion rates.' },
  { icon: Eye, title: 'Heatmap & Session Analysis', description: 'Visual analytics that reveal exactly how visitors interact with your pages — where they click, scroll, hesitate, and leave.' },
  { icon: Layers, title: 'Funnel Architecture', description: 'Strategic redesign of user journeys to remove friction, reduce abandonment, and guide prospects smoothly toward conversion.' },
  { icon: LineChart, title: 'Revenue Impact Modeling', description: 'Predictive modeling that quantifies the revenue impact of every optimization, so you know the exact ROI of CRO investment.' },
];

export default function CRO() {
  return (
    <>
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
              Conversion Rate Optimization
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              Turn More Visitors Into <span className="text-primary">Paying Customers</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              You're already paying for traffic. CRO makes that investment work harder. Our AI-powered approach identifies exactly where you're losing conversions and fixes it — systematically, measurably, month after month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 gap-2 font-body">
                  Get a CRO Assessment <ArrowRight className="w-4 h-4" />
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

      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Capabilities"
            title="Systematic Optimization, AI-Enhanced"
            description="We don't guess what will convert. AI tells us — then we test, validate, and deploy."
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

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">The Math Is Simple</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            If you're getting 10,000 visitors and converting 2%, that's 200 customers. Improve to 3%? That's 300 customers — a 50% revenue increase without spending a single extra dollar on traffic.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-secondary/50 border border-border">
              <p className="text-4xl font-heading font-bold text-primary mb-2">50%+</p>
              <p className="text-sm text-muted-foreground">Average conversion lift for our CRO clients</p>
            </div>
            <div className="p-8 rounded-2xl bg-secondary/50 border border-border">
              <p className="text-4xl font-heading font-bold text-primary mb-2">$0</p>
              <p className="text-sm text-muted-foreground">Additional ad spend needed for the lift</p>
            </div>
            <div className="p-8 rounded-2xl bg-secondary/50 border border-border">
              <p className="text-4xl font-heading font-bold text-primary mb-2">30 Days</p>
              <p className="text-sm text-muted-foreground">Typical time to first measurable improvement</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Your Traffic Deserves Better Conversions"
        subtext="Stop leaving revenue on the table. AI-powered CRO, month-to-month, starting at $1,500."
        buttonText="Start Converting More"
      />
    </>
  );
}