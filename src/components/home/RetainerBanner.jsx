import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const included = [
  'Content Strategy & Creation',
  'PPC Campaign Management',
  'Data Mining & AI Interpretation',
  'Monthly Performance Reports',
  'Dedicated Account Manager',
  'AI-Powered Competitive Analysis',
];

export default function RetainerBanner() {
  return (
    <section className="py-24 px-6 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 inline-block font-body">
              Simple Pricing
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              Retainers Start at<br />
              <span className="text-primary">$1,500/month</span>
            </h2>
            <p className="text-background/70 text-lg leading-relaxed mb-8">
              No bloated proposals. No hidden fees. Your retainer covers strategy, execution, and AI-driven optimization. You handle the ad spend and AI stack costs — we handle everything else.
            </p>
            <Link to="/pricing">
              <Button size="lg" className="rounded-full px-8 text-base gap-2 font-body">
                See Full Pricing <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="bg-background/5 rounded-2xl p-8 border border-background/10">
            <h3 className="font-heading text-xl font-semibold mb-6">What's Included</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {included.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-background/80">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-background/10">
              <p className="text-xs text-background/50">
                Client is responsible for ad spend budget and the cost of the AI stack employed in their business. Retainer amounts are customized based on scope.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}