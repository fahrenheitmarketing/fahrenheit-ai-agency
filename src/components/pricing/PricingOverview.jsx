import React from 'react';
import { ArrowDown } from 'lucide-react';

const offerings = [
  {
    label: 'Marketing Retainers',
    prefix: 'From',
    price: '$3,500',
    suffix: '/month',
    blurb: 'Your outsourced marketing department — support or full strategy — executed month-to-month.',
    anchor: 'retainers',
  },
  {
    label: 'Email Marketing',
    prefix: 'From',
    price: '$2,500',
    suffix: '/month',
    blurb: 'Managed cold email priced by delivered volume, with deliverability handled for you.',
    anchor: 'email-marketing',
  },
  {
    label: 'Managed Hosting',
    prefix: 'From',
    price: '$500',
    suffix: '/month',
    blurb: 'Secure, monitored hosting with backups, updates, 2FA, and standard server malware remediation.',
    anchor: 'hosting',
  },
  {
    label: 'Custom Website',
    prefix: 'From',
    price: '$7,500',
    suffix: 'one-time',
    blurb: 'A complete website redesign — up to 50 pages, SEO copywriting, and a QA-tested launch.',
    anchor: 'website',
  },
];

export default function PricingOverview() {
  return (
    <section className="pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((o) => (
            <a
              key={o.label}
              href={`#${o.anchor}`}
              className="group bg-card border border-border rounded-2xl p-6 flex flex-col hover:border-accent transition-colors"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-3">{o.label}</p>
              <p className="font-heading text-3xl font-normal mb-2">
                {o.prefix && <span className="text-sm text-muted-foreground font-body mr-1">{o.prefix}</span>}
                {o.price}
                {o.suffix && <span className="text-sm text-muted-foreground font-body font-normal"> {o.suffix}</span>}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed font-body mb-6">{o.blurb}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 text-sm text-accent font-medium font-body group-hover:gap-2.5 transition-all">
                Learn more <ArrowDown className="w-4 h-4" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}