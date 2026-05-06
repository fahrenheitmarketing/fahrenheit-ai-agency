import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointerClick, Brain, Target, BarChart3, Layers, RefreshCw, CheckCircle } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';

const faqs = [
  {
    question: 'How is your management fee structured?',
    answer: 'Our retainer covers all strategy, campaign management, optimization, and reporting. Ad spend is paid directly to the platforms — it\'s separate from our fee. This keeps our incentives aligned with your performance, not your spend.',
  },
  {
    question: 'What PPC platforms do you manage?',
    answer: 'We manage Google Ads (Search, Display, Shopping, YouTube, Performance Max), Microsoft/Bing Ads, remarketing and retargeting campaigns, and programmatic display. We recommend the right mix based on where your audience actually converts.',
  },
  {
    question: 'How does AI improve PPC performance?',
    answer: 'AI monitors and adjusts bids across thousands of keywords 24/7, identifies audience segments with the highest conversion probability, tests ad creative variations at scale, and reallocates budget in real-time — all faster and more accurately than manual management allows.',
  },
  {
    question: 'How quickly can you launch a campaign?',
    answer: 'For new accounts, we can typically launch within 10–14 business days after onboarding. For existing accounts we\'re taking over, we audit first and begin optimizations within the first week.',
  },
  {
    question: 'What minimum ad spend do you require?',
    answer: 'We generally recommend a minimum of $3,000/month in ad spend to allow the AI optimization algorithms to gather sufficient data and make meaningful improvements. Larger budgets unlock more advanced strategies.',
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No. All engagements are month-to-month. PPC management should produce clear, measurable ROI — and we believe you should stay because the results justify it, not because a contract forces you to.',
  },
];
import SectionHeader from '../../components/shared/SectionHeader';

const capabilities = [
  { icon: Brain, title: 'AI Bid Optimization', description: 'Machine learning algorithms adjust bids in real-time across thousands of keywords, maximizing ROAS while you focus on running your business.' },
  { icon: Target, title: 'Precision Audience Targeting', description: 'AI-powered audience segmentation finds your highest-value prospects across Google, Bing, and programmatic networks.' },
  { icon: Layers, title: 'Ad Creative Intelligence', description: 'Data-driven ad copy and creative variations tested and optimized by AI to find the messaging that converts.' },
  { icon: BarChart3, title: 'Conversion Tracking & Attribution', description: 'Full-funnel attribution modeling that connects every click to revenue so you know exactly what\'s working.' },
  { icon: RefreshCw, title: 'Continuous Optimization', description: 'Automated A/B testing, negative keyword mining, and budget reallocation — happening 24/7, not just during business hours.' },
  { icon: MousePointerClick, title: 'Landing Page Optimization', description: 'We don\'t just drive traffic — we ensure the destination converts. AI-tested landing pages that maximize your investment.' },
];

export default function SEM() {
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
              Search Engine Marketing / PPC
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              AI-Managed PPC That <span className="text-primary">Eliminates Waste</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Every dollar of your ad spend is monitored, analyzed, and optimized by artificial intelligence. We manage the campaigns. You control the budget. Together, we maximize returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 gap-2 font-body">
                  Audit My Campaigns <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-body">
                  Management from $1,500/mo
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
            title="Paid Search, Supercharged by AI"
            description="From bid management to creative testing, AI handles the complexity while our strategists focus on the big picture."
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
        <div className="max-w-7xl mx-auto">
          <div className="bg-foreground text-background rounded-2xl p-10 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">How We Handle Ad Spend</h2>
                <p className="text-background/70 leading-relaxed mb-4">
                  Your retainer covers strategy, campaign management, optimization, and reporting. The ad spend itself is separate — you pay platforms directly and control your budget.
                </p>
                <p className="text-background/70 leading-relaxed">
                  This model keeps incentives aligned: we succeed when your campaigns perform, not when you spend more. That's why our clients stay month after month.
                </p>
              </div>
              <div className="space-y-4">
                {['Google Ads (Search, Display, Shopping)', 'Microsoft / Bing Ads', 'YouTube Advertising', 'Remarketing & Retargeting', 'Performance Max Campaigns', 'Programmatic Display'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-background/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Common Questions About PPC" />

      <CTASection
        headline="Stop Wasting Ad Spend"
        subtext="Let AI optimize every dollar. Get a free PPC audit and see where your budget could work harder."
        buttonText="Get Your Free Audit"
      />
    </>
  );
}