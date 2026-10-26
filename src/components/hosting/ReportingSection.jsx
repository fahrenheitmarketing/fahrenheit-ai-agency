import React from 'react';
import { CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const reportItems = [
  'Website availability',
  'Software updates completed',
  'Security issues identified',
  'Backup status',
  'Relevant performance observations',
  'Incident summaries',
  'Recommendations and next steps',
];

export default function ReportingSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              label="Reporting and Transparency"
              title="Know What's Happening Behind the Scenes."
              description="Security and maintenance should never feel like a black box. Fahrenheit provides clear communication about the management of your website, the maintenance activities performed, and significant issues requiring attention."
            />
            <p className="border-l-2 border-accent pl-5 text-foreground/85 leading-relaxed">
              We believe accountability means communicating not only what we&apos;ve done, but also what
              we&apos;ve found, what remains unresolved, and what we recommend next.
            </p>
          </div>
          <div className="bg-secondary/50 border border-border rounded-2xl p-10">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
              Depending on your service plan, reporting may include
            </p>
            <ul className="space-y-4">
              {reportItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}