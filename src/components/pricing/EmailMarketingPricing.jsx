import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const plans = [
  { name: 'Growth', price: 2500, volume: 25000, features: ['Sequencing & campaign design', 'ICP building & list sourcing', 'Copywriting & A/B testing', 'Deliverability management', 'Monthly reporting & optimization'] },
  { name: 'Scale', price: 5000, volume: 60000, features: ['Everything in Growth', 'Multi-segment targeting', 'Additional sending domains', 'Reply-handling workflows', 'Dedicated campaign manager'] },
  { name: 'Enterprise', price: 7500, volume: 100000, features: ['Everything in Scale', 'Custom audience modeling', 'Quarterly program reviews', 'Priority build-out of new segments'] },
];

export default function EmailMarketingPricing() {
  return (
    <section className="pb-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto pt-24">
        <SectionHeader
          label="Email Marketing"
          title="Managed Cold Email, Priced by Delivered Volume"
          description="Every plan includes program design, targeting, messaging, and deliverability management. One-time setup fee of $1,500."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-card p-8 rounded-2xl border border-border flex flex-col">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-3">{plan.name}</p>
              <p className="font-heading text-4xl font-normal mb-1">
                ${new Intl.NumberFormat('en-US').format(plan.price)}
                <span className="text-sm text-muted-foreground font-body font-normal">/month</span>
              </p>
              <p className="text-sm text-accent font-medium font-body mb-6">
                {new Intl.NumberFormat('en-US').format(plan.volume)} emails delivered monthly
              </p>
              <div className="space-y-3 pt-6 border-t border-border flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="mt-8">
                <Button variant="outline" className="w-full rounded-full font-body">{`Start with ${plan.name}`}</Button>
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground font-body mt-8">
          One-time setup fee: <span className="text-foreground font-medium">$1,500</span> — covers sending infrastructure, domain warmup, list building, and your opening sequence.{' '}
          <Link to="/services/email-marketing" className="text-accent underline hover:text-accent/80 transition-colors">
            See the full email marketing program
          </Link>
        </p>
      </div>
    </section>
  );
}