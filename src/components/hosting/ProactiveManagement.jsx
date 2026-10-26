import React from 'react';
import { CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const activities = [
  'Scheduled WordPress core and plugin updates',
  'Monitoring of known vulnerabilities',
  'Security configuration reviews',
  'Backup status verification',
  'Performance and availability monitoring',
  'Access and administrative security reviews',
  'Technical recommendations',
  'Periodic reporting and communication',
];

export default function ProactiveManagement() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader
              label="Proactive Management"
              title="Protection Doesn't Stop After Setup."
              description="Cybersecurity is not a one-time installation. Applications evolve, vulnerabilities emerge, and infrastructure requirements change. Our managed hosting service is designed around ongoing oversight and preventive maintenance."
            />
            <p className="border-l-2 border-accent pl-5 text-foreground/85 leading-relaxed">
              Automated systems monitor the environment continuously. Our team reviews actionable alerts,
              performs scheduled maintenance, and coordinates intervention according to the service level of
              your plan.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-10">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
              Ongoing oversight, included by plan
            </p>
            <ul className="space-y-4">
              {activities.map((item) => (
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