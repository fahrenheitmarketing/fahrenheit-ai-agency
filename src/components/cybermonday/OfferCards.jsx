import React from 'react';
import { Mail, Server } from 'lucide-react';

export default function OfferCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border border-border rounded-sm bg-card p-8 flex flex-col">
        <Mail className="w-8 h-8 text-accent mb-5" />
        <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.05] mb-3">Email Marketing</h2>
        <p className="text-lg font-body font-medium text-accent mb-4">6 months for the price of 5</p>
        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">
          Stay with us for six months and the sixth one's on us. You're billed monthly for months one through five, and month six is free.
        </p>
        <p className="text-xs font-body text-muted-foreground mt-auto pt-4 border-t border-border">
          Email Marketing starts at $2,500/month. The free month is applied to your sixth month of service.
        </p>
      </div>
      <div className="border border-border rounded-sm bg-card p-8 flex flex-col">
        <Server className="w-8 h-8 text-accent mb-5" />
        <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.05] mb-3">Managed Hosting</h2>
        <p className="text-lg font-body font-medium text-accent mb-4">Your second month on us</p>
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