import React from 'react';
import { UserCheck, Users, Eye, Siren } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import IconCard from '@/components/hosting/IconCard';

const features = [
  {
    icon: UserCheck,
    title: 'Dedicated Account Manager',
    description:
      'A consistent point of contact who understands your business, coordinates service requests, and keeps communication clear.',
  },
  {
    icon: Users,
    title: 'Experienced Technical Team',
    description:
      'Access to professionals familiar with WordPress, website infrastructure, application security, performance optimization, and troubleshooting.',
  },
  {
    icon: Eye,
    title: 'Proactive Oversight',
    description:
      'Scheduled maintenance, monitoring review, security checks, and recommendations designed to identify potential problems before they become major disruptions.',
  },
  {
    icon: Siren,
    title: 'Human-Led Incident Response',
    description:
      'When a security incident occurs, our team investigates the issue, coordinates containment, and works toward recovery.',
  },
];

export default function AccountabilitySection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Human Accountability"
          title="Your Website Has a Team. Not Just a Support Ticket."
          description="Your website is an important business asset. Its availability, security, and performance deserve ongoing professional attention. Every Fahrenheit managed hosting engagement includes a dedicated account manager who serves as your primary point of contact and coordinates your hosting, maintenance, and security needs. Behind that relationship is a technical team responsible for maintaining the environment, reviewing security concerns, managing updates, and responding to incidents."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <IconCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-8 max-w-3xl">
          A dedicated account manager is your primary point of contact and service coordinator — not a
          technician exclusively assigned to your account.
        </p>
      </div>
    </section>
  );
}