import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const RESPONSE_RATE = 0.002;

const fmtNum = (n) => new Intl.NumberFormat('en-US').format(n);
const fmtMoney = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function EmailEstimator({ plans }) {
  const [planIndex, setPlanIndex] = useState(0);
  const [leadValue, setLeadValue] = useState(500);

  const plan = plans[planIndex];

  const replies = Math.round(plan.volume * RESPONSE_RATE);
  const pipeline = replies * leadValue;
  const net = pipeline - plan.price;

  return (
    <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-12">
          <div>
            <p className="text-sm font-medium font-body mb-4">Choose your plan</p>
            <div className="space-y-4">
              {plans.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setPlanIndex(i)}
                  className={cn(
                    'w-full text-left border rounded-2xl p-5 transition-colors',
                    i === planIndex
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-foreground/30'
                  )}
                  aria-pressed={i === planIndex}
                >
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-heading text-xl font-normal">{p.name}</span>
                    <span className="text-sm font-body font-medium">
                      {fmtMoney(p.price)}
                      <span className="text-muted-foreground font-normal">/mo</span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-body">
                    {fmtNum(p.volume)} emails delivered monthly
                  </p>
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-4">
              <label className="text-sm font-medium font-body">Average value of a lead</label>
              <span className="font-heading text-2xl">{fmtMoney(leadValue)}</span>
            </div>
            <Slider value={[leadValue]} onValueChange={(v) => setLeadValue(v[0])} min={100} max={25000} step={100} />
            <div className="flex justify-between text-xs text-muted-foreground font-body mt-2">
              <span>$100</span>
              <span>$25,000</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground font-body leading-relaxed">
            Estimates use an average cold email response rate of 0.2%. Your actual results depend on targeting, offer strength, and deliverability — our job is to push every one of those levers in your favor.
          </p>
        </div>

        <div className="bg-secondary/40 border border-border rounded-2xl p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-1">Estimated replies / month</p>
              <p className="font-heading text-4xl">{fmtNum(replies)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-1">Estimated pipeline value / month</p>
              <p className="font-heading text-4xl text-accent">{fmtMoney(pipeline)}</p>
            </div>
            <div className="pt-4 border-t border-border text-sm font-body text-muted-foreground leading-relaxed space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>
                  The <span className="text-foreground font-medium">{plan.name}</span> plan delivers{' '}
                  {fmtNum(plan.volume)} emails a month at {fmtMoney(plan.price)}/mo.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>
                  Net of retainer, that's{' '}
                  <span className="text-foreground font-medium">
                    {net >= 0 ? fmtMoney(net) : `-${fmtMoney(Math.abs(net))}`}
                  </span>{' '}
                  in estimated value{net >= 0 ? '' : ' at this lead value'}.
                </span>
              </div>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors font-body w-fit mt-8"
          >
            Get this working for you <span className="text-base">↗</span>
          </Link>
        </div>
      </div>
    </div>
  );
}