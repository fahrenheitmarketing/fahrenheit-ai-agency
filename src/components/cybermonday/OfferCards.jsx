import React from 'react';
import { Mail, Server } from 'lucide-react';

// Highlighted so unfilled placeholders are easy to spot.
export function Placeholder({ children }) {
  return <mark className="bg-yellow-200 text-yellow-900 px-1 rounded-sm">[PLACEHOLDER: {children}]</mark>;
}

export default function OfferCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="border border-border rounded-sm bg-card p-8 flex flex-col">
        <Mail className="w-6 h-6 text-accent mb-5" />
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Email Marketing</p>
        <h2 className="font-heading text-3xl font-normal leading-[1.15] mb-4">6 months for the price of 5</h2>
        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">
          Commit to six months of email marketing and we'll cover one of them. We'll also run a free email authentication and deliverability check on your domain (SPF, DKIM, DMARC, and sender reputation), so your campaigns actually reach the inbox.
        </p>
        <p className="text-xs font-body text-muted-foreground mt-auto pt-4 border-t border-border">
          Email marketing starts at $2,500/month. One free month applied on a 6-month commitment.
        </p>
      </div>
      <div className="border border-border rounded-sm bg-card p-8 flex flex-col">
        <Server className="w-6 h-6 text-accent mb-5" />
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Managed Hosting</p>
        <h2 className="font-heading text-3xl font-normal leading-[1.15] mb-4">Free setup and your first month free</h2>
        <p className="text-sm font-body text-muted-foreground leading-relaxed mb-6">
          Move to our entry or mid-tier managed hosting and we'll handle setup at no cost, plus cover your first month.
        </p>
        <p className="text-xs font-body text-muted-foreground mt-auto pt-4 border-t border-border leading-relaxed">
          <Placeholder>term length, e.g. 12-month agreement</Placeholder>{' '}
          <Placeholder>what setup includes, e.g. migration scope</Placeholder>
        </p>
      </div>
    </div>
  );
}