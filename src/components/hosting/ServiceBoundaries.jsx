import React, { useState } from 'react';
import { Plus, Minus, CheckCircle } from 'lucide-react';

const additionalCircumstances = [
  'Extensive custom code repair or application reconstruction',
  'Complex forensic investigations',
  'Recovery of data unavailable from usable backups',
  'Compromises originating in external systems or third-party services',
  'Extensive remediation of unsupported or abandoned software',
  'Security incidents requiring substantial redevelopment',
  'Regulatory, legal, or compliance investigations',
  'Work outside Fahrenheit\u2019s managed infrastructure',
];

export default function ServiceBoundaries() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-16 px-6 bg-secondary/30 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl font-normal leading-snug mb-4">
          What&apos;s Included — And When Additional Services May Apply
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Our objective is to provide predictable monthly pricing without leaving clients unsupported when
          security incidents occur. Standard security incident investigation, initial containment, and routine
          malware remediation within the managed hosting environment are included in all plans.
        </p>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors font-body"
        >
          {open ? (
            <Minus className="w-4 h-4" aria-hidden="true" />
          ) : (
            <Plus className="w-4 h-4" aria-hidden="true" />
          )}
          {open ? 'Hide details' : 'When may additional services apply?'}
        </button>
        {open && (
          <div className="mt-6 bg-card border border-border rounded-2xl p-8">
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Additional professional services may be required for circumstances such as:
            </p>
            <ul className="space-y-3">
              {additionalCircumstances.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed mt-6">
              When additional work is necessary, we will explain the recommended approach and associated costs.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}