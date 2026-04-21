import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cpu, Users, Award, Heart } from 'lucide-react';
import CTASection from '../components/shared/CTASection';

const values = [
  {
    icon: Cpu,
    title: 'AI-First, Always',
    description: 'Every process, strategy, and decision is enhanced by artificial intelligence. Not as a gimmick — as a fundamental competitive advantage for our clients.',
  },
  {
    icon: Heart,
    title: 'Radical Transparency',
    description: 'No hidden fees, no jargon, no smoke and mirrors. You see exactly what we do, why we do it, and what it costs. Month-to-month because we believe in earning trust.',
  },
  {
    icon: Users,
    title: 'Human + Machine',
    description: 'AI handles the data, pattern recognition, and optimization. Our experienced team handles the strategy, creativity, and client relationships. The best of both worlds.',
  },
  {
    icon: Award,
    title: 'Results Over Everything',
    description: 'We don\'t celebrate vanity metrics. We celebrate revenue growth, conversion improvements, and ROI. If it doesn\'t move your business forward, we don\'t do it.',
  },
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[400px] pointer-events-none opacity-30 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 font-body">
                About Fahrenheit
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6">
                The Agency That <span className="text-primary">Bets on Itself</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Since 2008, Fahrenheit Marketing has been at the forefront of digital innovation. Today, we're an AI-first agency — combining intelligent technology with seasoned professionals to deliver marketing that actually works.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We don't ask for long-term contracts because we don't need them. Our work speaks for itself, month after month. We earn your trust — or you walk.
              </p>
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 gap-2 font-body">
                  Let's Talk <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="bg-foreground text-background rounded-2xl p-10">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-heading font-bold text-primary mb-1">2008</p>
                  <p className="text-sm text-background/60">Founded in Austin, TX</p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-bold text-primary mb-1">100+</p>
                  <p className="text-sm text-background/60">Global Clients Served</p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-bold text-primary mb-1">$1,500</p>
                  <p className="text-sm text-background/60">Starting Monthly Retainer</p>
                </div>
                <div>
                  <p className="text-4xl font-heading font-bold text-primary mb-1">0</p>
                  <p className="text-sm text-background/60">Long-Term Contracts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 font-body">
              Our Philosophy
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-card p-8 rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI-First */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-6">Why AI-First?</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Traditional agencies hire more people to do more work. We build smarter systems. Our AI-first approach means your campaigns are optimized 24/7, insights surface in real-time, and every decision is backed by data — not guesswork.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            This isn't about replacing human expertise — it's about amplifying it. Our strategists think bigger because AI handles the data. Our creatives push harder because AI validates what works. Your investment goes further because AI eliminates waste.
          </p>
          <p className="text-foreground text-lg leading-relaxed font-medium">
            The result? Better outcomes at lower cost. And a partner who stakes their business on delivering them — every single month.
          </p>
        </div>
      </section>

      <CTASection
        headline="Let's Build Something Great Together"
        subtext="No contracts. No commitments. Just a conversation about how AI-first marketing can grow your business."
        buttonText="Start the Conversation"
      />
    </>
  );
}