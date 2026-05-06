import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointerClick, Brain, Target, BarChart3, Layers, RefreshCw, CheckCircle } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';
import SectionHeader from '../../components/shared/SectionHeader';

const faqs = [
  {
    question: 'How is your management fee structured?',
    answer: 'Our retainer covers all strategy, campaign management, optimization, and reporting. Ad spend is paid directly to the platforms — it\'s separate from our fee. This keeps our incentives aligned with your performance, not your spend.',
  },
  {
    question: 'Which platforms do you manage paid advertising on?',
    answer: 'We manage Google Ads (Search, Display, Shopping, YouTube, Performance Max), Microsoft/Bing Ads, Meta (Facebook & Instagram), LinkedIn Ads, TikTok Ads, and programmatic display. We recommend the right mix based on where your audience actually converts.',
  },
  {
    question: 'How does AI improve paid advertising performance?',
    answer: 'AI surfaces patterns, flags underperforming segments, and identifies budget inefficiencies faster than manual analysis. Our strategists review these insights regularly and make optimization decisions — so you get the speed of AI analysis with human judgment on every meaningful change.',
  },
  {
    question: 'Do you handle ad creative — copy, images, video?',
    answer: 'Yes. We develop and test ad creative across all formats — search copy, display banners, social image and video ads, and carousel units. Our AI-driven creative testing identifies winning combinations faster so your budget goes further.',
  },
  {
    question: 'What minimum ad spend do you require?',
    answer: 'We generally recommend a minimum of $3,000/month in total ad spend across platforms to allow optimization algorithms to gather sufficient data. Larger budgets unlock more advanced multi-platform strategies.',
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No. All engagements are month-to-month. Paid media management should produce clear, measurable ROI — you should stay because the results justify it, not because a contract forces you to.',
  },
];

const capabilities = [
  { icon: Brain, title: 'AI-Assisted Bid & Budget Management', description: 'AI surfaces opportunities and flags inefficiencies — our strategists review and action optimizations regularly, so every budget decision has human judgment behind it.' },
  { icon: Target, title: 'Precision Audience Targeting', description: 'AI-powered segmentation finds your highest-value prospects across search intent, social behavior, lookalike audiences, and retargeting pools.' },
  { icon: Layers, title: 'Ad Creative Intelligence', description: 'Data-driven copy, image, and video creative tested across platforms. AI identifies winning combinations faster so more budget flows to what works.' },
  { icon: BarChart3, title: 'Cross-Platform Attribution', description: 'Full-funnel attribution modeling that connects every impression and click — across all platforms — to pipeline and revenue.' },
  { icon: RefreshCw, title: 'Ongoing Optimization', description: 'Regular A/B testing, audience pruning, creative rotation, and budget reallocation — driven by AI analysis and executed by our team on a structured, ongoing cadence.' },
  { icon: MousePointerClick, title: 'Landing Page Optimization', description: 'We don\'t just drive traffic — we ensure the destination converts. AI-tested landing pages built to maximize return on every platform\'s spend.' },
];

const platforms = [
  {
    category: 'Search',
    items: ['Google Ads (Search, Shopping, Display)', 'Microsoft / Bing Ads', 'YouTube Advertising', 'Performance Max Campaigns'],
  },
  {
    category: 'Social',
    items: ['Meta (Facebook & Instagram)', 'LinkedIn Ads', 'TikTok Ads', 'Pinterest Ads'],
  },
  {
    category: 'Programmatic & Retargeting',
    items: ['Programmatic Display & Video', 'Remarketing & Retargeting', 'Connected TV (CTV)', 'Native Advertising'],
  },
];

export default function SEM() {
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
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Paid Media & Advertising</p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8 max-w-4xl">
            AI-Managed Paid Media That<br />
            <span className="italic">Eliminates Waste Across Every Platform.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl font-body">
            Google. Meta. LinkedIn. TikTok. Your buyers are on all of them — and so is your competition. We manage paid advertising across the full platform landscape, using AI to optimize every dollar of spend in real-time so you're not guessing where your budget is going.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <Button size="lg" className="rounded-sm px-8 gap-2 font-body bg-accent hover:bg-accent/90 text-white border-0">
                Audit My Campaigns <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="rounded-sm px-8 font-body">
                Management from $1,500/mo
              </Button>
            </Link>
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
                Paid Advertising, Supercharged by AI
              </h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4 font-body leading-relaxed">
                Search · Social · Programmatic
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

      {/* Platforms */}
      <section className="py-24 px-6 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-16">
            <div className="lg:col-span-1 pr-0 lg:pr-16 mb-10 lg:mb-0">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Platforms</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
                Every Channel. One Strategy.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-body mt-6">
                We don't pick a favourite platform — we follow your audience. AI tells us where your buyers spend time and how they respond to ads, then we allocate accordingly.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
              {platforms.map((group) => (
                <div key={group.category} className="bg-background p-8">
                  <p className="text-xs uppercase tracking-widest text-accent font-body mb-6">{group.category}</p>
                  <ul className="space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm font-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Handle Ad Spend */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">How It Works</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-6">
                How We Handle Your Ad Spend
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 font-body">
                Your retainer covers strategy, campaign management, optimization, and reporting across all platforms. The ad spend itself is separate — you pay platforms directly and maintain full control over your budget.
              </p>
              <p className="text-muted-foreground leading-relaxed font-body">
                This model keeps incentives aligned: we succeed when your campaigns perform, not when you spend more. That's why our clients stay month after month.
              </p>
            </div>
            <div className="border border-border rounded-sm p-8 bg-secondary/30">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                What the Retainer Includes
              </p>
              <ul className="space-y-4">
                {[
                  'Full platform audit & strategy development',
                  'Campaign architecture & launch',
                  'AI bid management & budget optimization',
                  'Audience research & targeting',
                  'Ad creative development & testing',
                  'Cross-platform attribution & reporting',
                  'Landing page recommendations & optimization',
                  'Dedicated paid media strategist',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Common Questions About Paid Media" />

      <CTASection
        headline="Stop Wasting Ad Spend"
        subtext="Let AI optimize every dollar across every platform. Get a free paid media audit and see where your budget could work harder."
        buttonText="Get Your Free Audit"
      />
    </>
  );
}