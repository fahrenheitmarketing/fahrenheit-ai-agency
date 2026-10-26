import React from 'react';
import { ScanSearch, FileSearch, ShieldAlert, Wrench, ClipboardCheck, ShieldCheck } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const steps = [
  {
    icon: ScanSearch,
    title: 'Detect',
    text: 'Automated monitoring, malware scanning, or reported suspicious activity identifies a potential incident.',
  },
  {
    icon: FileSearch,
    title: 'Investigate',
    text: 'Our technical team reviews available evidence to determine the nature and apparent scope of the issue.',
  },
  {
    icon: ShieldAlert,
    title: 'Contain',
    text: 'We take appropriate steps to restrict malicious activity, isolate affected components, or reduce further exposure.',
  },
  {
    icon: Wrench,
    title: 'Remediate and Recover',
    text: 'We remove standard malware infections, address identified vulnerabilities within the covered scope, and restore affected services or clean backups as appropriate.',
  },
  {
    icon: ClipboardCheck,
    title: 'Review and Strengthen',
    text: 'We document relevant findings, communicate the outcome, and recommend measures to reduce future exposure.',
  },
];

export default function IncidentResponse() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Incident Response"
          title="When Something Goes Wrong, We Get Involved."
          description="A security alert tells you something may be wrong. It doesn't investigate the problem, contain the threat, or restore your website. Fahrenheit's managed hosting service includes human-led security incident investigation, initial containment, and standard malware remediation within the scope of the managed environment. Our team works to identify the nature of the compromise, address malicious activity, restore affected services when feasible, and reduce the likelihood of recurrence."
        />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <span className="font-heading text-3xl text-foreground/15">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="font-heading text-lg font-normal mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="bg-foreground text-background rounded-2xl p-10 mt-12">
          <div className="flex items-start gap-5">
            <ShieldCheck className="w-10 h-10 text-accent flex-shrink-0" aria-hidden="true" />
            <div>
              <h3 className="font-heading text-2xl md:text-3xl font-normal mb-5 max-w-2xl leading-snug">
                Standard Malware Remediation Is Included in Every Plan.
              </h3>
              <p className="text-background/70 leading-relaxed mb-4 max-w-4xl">
                Routine malware cleanup and standard incident response are included at no additional charge
                within the defined scope of your managed hosting plan.
              </p>
              <p className="text-background/70 leading-relaxed mb-4 max-w-4xl">
                Complex forensic investigations, extensive custom application repairs, reconstruction of
                compromised functionality, unrecoverable data restoration, and incidents involving systems
                outside the managed environment may require additional services.
              </p>
              <p className="text-background/70 leading-relaxed max-w-4xl">
                Where additional billable work is required, Fahrenheit will communicate the scope and obtain
                authorization before proceeding whenever practicable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}