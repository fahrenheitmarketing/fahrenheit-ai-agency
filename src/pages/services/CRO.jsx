import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart, Brain, TestTubes, MousePointerClick, Eye, Layers, CheckCircle, Paintbrush, Navigation, Smartphone, ScanEye } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';

const faqs = [
  {
    question: 'What is Conversion Rate Optimization (CRO)?',
    answer: 'CRO is the systematic process of increasing the percentage of website visitors who take a desired action — making a purchase, filling out a form, booking a call. Instead of spending more to get more traffic, you make better use of the traffic you already have.',
  },
  {
    question: 'How long before we see results?',
    answer: 'Most clients see measurable improvements within 30–60 days. We start with a comprehensive audit to identify high-impact, quick-win opportunities and prioritize those first. Larger structural changes take longer but deliver compounding returns.',
  },
  {
    question: 'How does AI improve CRO?',
    answer: 'AI analyzes thousands of user sessions to identify drop-off points, friction, and behavioral patterns that manual review would miss. It also accelerates A/B test analysis, helping us reach statistical significance faster and with cleaner insights.',
  },
  {
    question: 'Do we need to rebuild our website?',
    answer: 'Rarely. Most CRO work happens at the level of page elements, copy, layout, CTAs, and user flow — not full redesigns. We find the highest-leverage opportunities and make targeted, measurable changes.',
  },
  {
    question: 'What tools do you use for heatmapping and session analysis?',
    answer: 'We work with tools like Hotjar, Microsoft Clarity, and FullStory for behavioral analysis, combined with Google Analytics and custom event tracking to build a complete picture of how your visitors behave.',
  },
  {
    question: 'Is CRO included with other services like SEO or PPC?',
    answer: 'Landing page and conversion guidance is incorporated into all our service engagements. Dedicated CRO — with full behavioral analysis, A/B testing programs, and systematic funnel optimization — is a separate retainer.',
  },
];
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
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4 font-body">
              Conversion Rate Optimization
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              Turn More Visitors Into <span className="text-accent">Paying Customers</span>
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
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <cap.icon className="w-6 h-6 text-accent" />
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
              <p className="text-4xl font-heading font-bold text-accent mb-2">50%+</p>
              <p className="text-sm text-muted-foreground">Average conversion lift for our CRO clients</p>
            </div>
            <div className="p-8 rounded-2xl bg-secondary/50 border border-border">
              <p className="text-4xl font-heading font-bold text-accent mb-2">$0</p>
              <p className="text-sm text-muted-foreground">Additional ad spend needed for the lift</p>
            </div>
            <div className="p-8 rounded-2xl bg-secondary/50 border border-border">
              <p className="text-4xl font-heading font-bold text-accent mb-2">30 Days</p>
              <p className="text-sm text-muted-foreground">Typical time to first measurable improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* UX/UI Design for Conversion */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4 font-body">UX/UI Design</span>
              <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">
                Design Is a Conversion Tool, Not a Decoration
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Most conversion problems aren't traffic problems — they're design problems. Confusing navigation, unclear CTAs, cluttered layouts, and poor mobile experiences silently drain revenue every day.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We approach UX/UI design through a conversion lens. Every layout decision, visual hierarchy choice, and interaction pattern is evaluated against one question: does this move the user closer to converting?
              </p>
              <div className="space-y-3">
                {[
                  'Conversion-focused page layout & visual hierarchy',
                  'CTA placement, contrast, and copy optimization',
                  'Mobile UX design for high-intent mobile traffic',
                  'Checkout & form flow simplification',
                  'Trust signal placement and social proof design',
                  'Navigation architecture & path-to-conversion mapping',
                ].map(item => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: ScanEye,
                  title: 'Visual Hierarchy',
                  description: "We engineer what users see first, second, and third — guiding attention toward the actions that matter most.",
                },
                {
                  icon: Navigation,
                  title: 'Conversion Path Design',
                  description: 'Every page has a job. We design clear, frictionless paths that guide users from intent to action without confusion.',
                },
                {
                  icon: Smartphone,
                  title: 'Mobile-First UX',
                  description: 'With mobile traffic often exceeding 60% of sessions, mobile UX is not an afterthought — it\'s the primary design surface.',
                },
                {
                  icon: Paintbrush,
                  title: 'Brand-Aligned Design',
                  description: 'Conversion design doesn\'t mean stripping out brand identity. We build conversion-optimized experiences that still feel distinctly yours.',
                },
              ].map(card => (
                <div key={card.title} className="bg-card border border-border rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-heading text-base font-normal mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Common Questions About CRO" />

      <CTASection
        headline="Your Traffic Deserves Better Conversions"
        subtext="Stop leaving revenue on the table. AI-powered CRO, month-to-month, starting at $1,500."
        buttonText="Start Converting More"
      />
    </>
  );
}