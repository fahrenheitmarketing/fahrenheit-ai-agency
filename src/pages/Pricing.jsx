import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Shield, Calendar, Zap } from 'lucide-react';
import CTASection from '../components/shared/CTASection';

const tiers = [
  {
    name: 'Growth',
    price: '$1,500',
    description: 'Ideal for startups and small businesses ready to build a strong digital foundation with AI-powered marketing.',
    features: [
      'AI-powered content strategy',
      'One primary channel focus (SEO, SEM, or Social)',
      'PPC campaign management',
      'Monthly data mining & insights report',
      'AI competitive analysis',
      'Dedicated account manager',
      'Monthly performance review',
    ],
  },
  {
    name: 'Scale',
    price: '$3,500',
    description: 'For growing companies that need a multi-channel approach with deeper strategic oversight and AI optimization.',
    popular: true,
    features: [
      'Everything in Growth, plus:',
      'Multi-channel strategy (SEO + SEM + Social)',
      'Advanced AI audience segmentation',
      'Conversion rate optimization',
      'Content creation & optimization',
      'Full-funnel attribution modeling',
      'Bi-weekly strategy calls',
      'Custom AI reporting dashboard',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For established organizations requiring comprehensive digital transformation and dedicated AI infrastructure.',
    features: [
      'Everything in Scale, plus:',
      'Dedicated strategy team',
      'Custom AI stack deployment',
      'Enterprise-level reporting',
      'Quarterly business reviews',
      'Priority support & SLA',
      'Multi-market / multi-location support',
      'Executive-level insights & board reporting',
    ],
  },
];

export default function Pricing() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[400px] pointer-events-none opacity-60 select-none"
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 font-body">
            Transparent Pricing
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6 max-w-4xl mx-auto">
            Month-to-Month. <span className="text-primary">No Contracts.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
            We must earn your trust every single month. If we don't deliver results, you walk. It's that simple. Our retainers start at $1,500/month.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Month-to-month</div>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Cancel anytime</div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> AI-powered</div>
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  tier.popular
                    ? 'bg-foreground text-background border-2 border-primary relative'
                    : 'bg-card border border-border'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full font-body">
                    Most Popular
                  </span>
                )}
                <div className="mb-6">
                  <h3 className="font-heading text-xl font-normal mb-2">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-4xl font-heading font-normal">{tier.price}</span>
                    {tier.price !== 'Custom' && <span className={`text-sm ${tier.popular ? 'text-background/60' : 'text-muted-foreground'}`}>/month</span>}
                  </div>
                  <p className={`text-sm leading-relaxed ${tier.popular ? 'text-background/70' : 'text-muted-foreground'}`}>
                    {tier.description}
                  </p>
                </div>
                <div className="space-y-3 flex-1 mb-8">
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.popular ? 'text-primary' : 'text-primary'}`} />
                      <span className={`text-sm ${tier.popular ? 'text-background/80' : ''}`}>{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact">
                  <Button
                    className={`w-full rounded-full font-body ${tier.popular ? '' : 'variant-outline'}`}
                    variant={tier.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-muted rounded-2xl p-8">
            <h3 className="font-heading text-xl font-normal mb-4">What's Included — and What Isn't</h3>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">AI Stack:</strong> Included. The AI tools we deploy to power your campaigns, reporting, and automation are part of your retainer — no separate bills, no surprise costs.
              </p>
              <p>
                <strong className="text-foreground">Ad Spend:</strong> Your advertising budget is paid directly to the platforms (Google, Meta, LinkedIn, etc.). You control exactly how much you spend, and we optimize every dollar of it.
              </p>
              <p>
                <strong className="text-foreground">Why Month-to-Month:</strong> We believe in earning your business, not locking you in. Every month, we deliver results that justify your investment. If we don't, you're free to leave. That accountability makes us better.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to See What AI Can Do for Your Business?"
        subtext="Start with a conversation. No obligations, no pressure — just honest advice about your growth potential."
        buttonText="Schedule a Free Consultation"
      />
    </>
  );
}