import React from 'react';
import { ListChecks } from 'lucide-react';

const checklist = [
  'Full DNS audit — every record classified as routed through the edge or DNS-only, with compatibility checked per platform',
  'Origin firewall baseline applied and verified before traffic shifts',
  'Firewall rulesets deployed, then tested against real traffic',
  'Bot settings validated against webhooks, payment callbacks, and API integrations',
  'Origin lockdown completed — edge-only allowlist and authenticated origin pulls',
  'Staged cutover with monitoring at each step, and a documented rollback path',
];

export default function MigrationSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <ListChecks className="w-10 h-10 text-accent mb-6" aria-hidden="true" />
            <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">
              Already Hosted Somewhere Else? We Move You Gradually.
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Taking over an existing site is not an overnight cutover. We migrate each property in stages,
              verifying at every step that nothing breaks — so your traffic and your team never notice the
              moment protection switches on.
            </p>
          </div>
          <div className="bg-secondary/50 border border-border rounded-2xl p-10">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
              The migration checklist
            </p>
            <ol className="relative border-l border-border pl-6 space-y-5">
              {checklist.map((step, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-card" />
                  <p className="text-sm text-foreground/85 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
            <p className="text-xs text-muted-foreground leading-relaxed mt-6">
              Migration scope, compatibility, and any applicable fees are assessed individually.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}