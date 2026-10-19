import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Slider } from '@/components/ui/slider';

const RESPONSE_RATE = 0.02;

const fmtNum = (n) => new Intl.NumberFormat('en-US').format(n);
const fmtMoney = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function EmailEstimator() {
  const [volume, setVolume] = useState(25000);
  const [leadValue, setLeadValue] = useState(500);

  const replies = Math.round(volume * RESPONSE_RATE);
  const pipeline = replies * leadValue;

  let plan = null;
  if (volume <= 25000) plan = { name: 'Growth', price: 2500, volume: 25000 };
  else if (volume <= 60000) plan = { name: 'Scale', price: 5000, volume: 60000 };
  else if (volume <= 100000) plan = { name: 'Enterprise', price: 7500, volume: 100000 };

  const roi = plan ? pipeline - plan.price : null;

  return (
    <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-12">
          <div>
            <div className="flex items-baseline justify-between mb-4">
              <label className="text-sm font-medium font-body">Emails delivered / month</label>
              <span className="font-heading text-2xl">{fmtNum(volume)}</span>
            </div>
            <Slider value={[volume]} onValueChange={(v) => setVolume(v[0])} min={5000} max={150000} step={5000} />
            <div className="flex justify-between text-xs text-muted-foreground font-body mt-2">
              <span>5,000</span>
              <span>150,000</span>
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
            Estimates use an average cold email response rate of 2%. Your actual results depend on targeting, offer strength, and deliverability — our job is to push every one of those levers in your favor.
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
            {plan ? (
              <div className="pt-4 border-t border-border text-sm font-body text-muted-foreground leading-relaxed">
                Recommended plan: <span className="text-foreground font-medium">{plan.name}</span> — {fmtMoney(plan.price)}/mo for {fmtNum(plan.volume)} emails delivered. Net of retainer, that's <span className="text-foreground font-medium">{fmtMoney(Math.max(roi, 0))}</span> in estimated value.
              </div>
            ) : (
              <div className="pt-4 border-t border-border text-sm font-body text-muted-foreground leading-relaxed">
                You're looking at more than 100,000 emails a month. <Link to="/contact" className="text-accent hover:underline">Talk to us</Link> about a custom volume plan.
              </div>
            )}
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