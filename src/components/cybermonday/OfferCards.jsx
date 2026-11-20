import React from 'react';
import { Mail, Server } from 'lucide-react';

export default function OfferCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border border-border rounded-sm bg-card p-8 flex flex-col">
        <Mail className="w-6 h-6 text-accent mb-5" />
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Email Marketing</p>
        <h2 className="font-heading text-3xl font-normal leading-[1.15] mb-4">6 months for the price of 5</h2>
        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">
          Commit to six months of email marketing and we'll cover one of them.
        </p>
        <p className="text-xs font-body text-muted-foreground mt-auto pt-4 border-t border-border">
          Email marketing starts at $2,500/month. One free month applied on a 6-month commitment.
        </p>
      </div>
      <div className="border border-border rounded-sm bg-card p-8 flex flex-col">
        <Server className="w-6 h-6 text-accent mb-5" />
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Managed Hosting</p>
        <h2 className="font-heading text-3xl font-normal leading-[1.15] mb-4">Your second month on us</h2>
        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">
          Move to Essential or Advanced Protection managed hosting and we'll waive onboarding and cover your second month. You get the same layered security, proactive monitoring, malware scanning, and maintenance included in every plan.
        </p>
        <p className="text-xs font-body text-muted-foreground mt-auto pt-4 border-t border-border leading-relaxed">
          Essential Protection is $500/month and Advanced Protection is $750/month. Migration scope and any applicable fees are assessed individually during onboarding.
        </p>
      </div>
    </div>
  );
}