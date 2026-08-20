import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Compass, Brain, BarChart3, Target, Lightbulb, Map, CheckCircle } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';

const faqs = [
  {
    question: 'What does a digital strategy engagement include?',
    answer: 'It includes market and competitive intelligence, customer journey mapping, channel strategy and budget allocation, content strategy, KPI framework, AI tool stack recommendations, and quarterly business reviews. Everything is built around your specific growth objectives.',
  },
  {
    question: 'How is AI used in your strategy work?',
    answer: 'AI powers our market research, competitive analysis, and predictive modeling — surfacing insights that traditional research methods would miss or take weeks to surface. It also helps us forecast outcomes before you invest, reducing risk on every major strategic decision.',
  },
  {
    question: 'We already have a marketing team. Can you work alongside them?',
    answer: 'Yes — and it\'s one of our most common engagements. We often function as an AI-enhanced strategic layer that informs and supports internal teams, rather than replacing them. We embed alongside your team, share insights, and upskill where needed.',
  },
  {
    question: 'How long does it take to develop a strategy?',
    answer: 'Initial strategy development takes 3–4 weeks from onboarding. That includes the audit, research, competitive analysis, and presentation of the strategic roadmap. From there, the strategy becomes a living document refined monthly.',
  },
  {
    question: 'Is the AI tool stack included in the retainer?',
    answer: 'Yes. AI tools deployed as part of your strategy engagement are included in the retainer — no separate tool invoices or hidden platform costs. You get the benefits of a curated AI stack without the overhead of managing subscriptions yourself.',
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No. All strategy engagements are month-to-month. Strategy is only valuable if it\'s producing results — we believe in earning your continued partnership every single month.',
  },
];
import SectionHeader from '../../components/shared/SectionHeader';

const capabilities = [
  { icon: Brain, title: 'AI Market Intelligence', description: 'Deep competitive analysis and market research powered by AI that surfaces trends, gaps, and opportunities traditional research misses.' },
  { icon: BarChart3, title: 'Data-Driven Planning', description: 'Every recommendation is backed by data, not assumptions. We use predictive modeling to forecast outcomes before you invest.' },
  { icon: Target, title: 'Channel Strategy', description: 'AI-informed channel mix optimization that allocates resources to the platforms and tactics with the highest probability of ROI.' },
  { icon: Map, title: 'Customer Journey Mapping', description: 'Behavioral data and AI analysis reveal how your customers actually buy — so your marketing meets them at every touchpoint.' },
  { icon: Lightbulb, title: 'Growth Opportunity Identification', description: 'Machine learning identifies untapped markets, underserved segments, and competitive weaknesses you can capitalize on.' },
  { icon: Compass, title: 'Quarterly Strategic Reviews', description: 'Your strategy evolves with your business. Regular reviews ensure we\'re always optimizing toward your changing goals.' },
];

export default function Strategy() {
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
              Digital Strategy
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              Strategy Built on <span className="text-accent">Intelligence, Not Instinct</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Great marketing starts with great strategy. We use AI to analyze your market, understand your customers, and build a roadmap that turns digital presence into predictable revenue growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 gap-2 font-body">
                  Request a Strategy Session <ArrowRight className="w-4 h-4" />
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
            title="Strategic Clarity Through AI Intelligence"
            description="We don't deliver 50-page decks that collect dust. We build actionable strategies powered by real data and AI insight."
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">Strategy That Evolves With You</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Markets change. Competitors adapt. Your strategy should too. Our month-to-month model means your strategic plan is a living document — continuously refined by new data and AI intelligence.
              </p>
              <div className="space-y-4">
                {['Competitive landscape analysis & monitoring', 'Customer persona development with behavioral data', 'Channel strategy & budget allocation', 'Content strategy & editorial planning', 'KPI framework & measurement architecture', 'Quarterly business reviews & strategy updates'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-foreground text-background rounded-2xl p-10">
              <h3 className="font-heading text-2xl font-normal mb-4">Your AI Stack, Included</h3>
              <p className="text-background/70 leading-relaxed mb-4">
                As part of your strategy engagement, we recommend and deploy AI tools specifically chosen for your business — from predictive analytics to automated reporting.
              </p>
              <p className="text-background/70 leading-relaxed">
                The AI stack is included in your retainer. No separate tool invoices, no hidden costs — just intelligence deployed and working for your business from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Common Questions About Digital Strategy" />

      <CTASection
        headline="Stop Guessing. Start Growing."
        subtext="An AI-powered strategic roadmap, delivered monthly. No long-term contracts — just results."
        buttonText="Schedule a Strategy Session"
      />
    </>
  );
}