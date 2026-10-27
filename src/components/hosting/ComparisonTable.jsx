import React from 'react';
import { CheckCircle, Minus } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const rows = [
  ['Automated monitoring and alerts', 'Automated monitoring with human-led investigation and escalation'],
  ['General support queues', 'Dedicated account management'],
  ['Standardized security configurations', 'Security configurations reviewed for the managed environment'],
  ['Automated backups', 'Managed backup strategy and recovery assistance'],
  ['Malware alerts and variable cleanup policies', 'Standard server malware remediation included'],
  ['Reactive support interactions', 'Proactive maintenance and security reviews'],
  ['Infrastructure-focused service', 'Infrastructure, security, and technical accountability'],
];

export default function ComparisonTable() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="The Difference"
          title="There's Managed Hosting. Then There's Accountable Hosting."
          description="Automated hosting platforms have made website management easier and more affordable. They can provide excellent infrastructure, backups, monitoring, and security automation. But technology alone cannot replace experienced professionals who understand your website and take responsibility for coordinating its care. Fahrenheit bridges that gap."
        />
        <div className="bg-card border border-border rounded-2xl p-6 md:p-10">
          <div className="hidden md:grid grid-cols-2 gap-8 pb-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">
              Conventional Automated Hosting
            </p>
            <p className="text-xs uppercase tracking-widest text-accent font-body">
              Fahrenheit Managed Hosting
            </p>
          </div>
          {rows.map(([conventional, fahrenheit]) => (
            <div key={conventional} className="border-t border-border py-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              <div className="flex items-start gap-3">
                <Minus className="w-4 h-4 text-muted-foreground/60 mt-1 flex-shrink-0" aria-hidden="true" />
                <p className="text-sm text-muted-foreground leading-relaxed">{conventional}</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="md:hidden text-[10px] uppercase tracking-widest text-accent font-body mb-1">
                    Fahrenheit Managed Hosting
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">{fahrenheit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mt-6 max-w-3xl">
          Individual hosting providers differ in their service levels. This comparison describes common service
          models rather than universal limitations of competing providers.
        </p>
        <p className="font-heading text-2xl md:text-3xl font-normal leading-snug mt-10 max-w-3xl">
          The difference isn&apos;t just the technology protecting your website.{' '}
          <span className="text-accent">It&apos;s the people standing behind it.</span>
        </p>
      </div>
    </section>
  );
}