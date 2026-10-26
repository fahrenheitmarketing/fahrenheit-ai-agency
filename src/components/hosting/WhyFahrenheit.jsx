import React from 'react';
import { Building2, Users, UserCheck, Store, Code2, MessageSquare } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const differentiators = [
  { icon: Building2, text: 'Established digital agency since 2008' },
  { icon: Users, text: 'Experienced development and infrastructure professionals' },
  { icon: UserCheck, text: 'Dedicated account relationships' },
  { icon: Store, text: 'Experience supporting complex commercial websites' },
  { icon: Code2, text: 'Integrated website development and hosting expertise' },
  { icon: MessageSquare, text: 'Transparent communication and accountability' },
];

export default function WhyFahrenheit() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Why Fahrenheit"
          title="Nearly Two Decades of Digital Experience. One Accountable Partner."
          description="Since 2008, Fahrenheit Marketing has helped organizations design, develop, maintain, and improve their digital presence. Our experience spans complex websites, e-commerce platforms, application development, infrastructure management, and ongoing technical support."
        />
        <div className="max-w-4xl space-y-5 mb-12 text-lg text-muted-foreground leading-relaxed font-body">
          <p>
            We understand that a website isn&apos;t simply a collection of files on a server. It&apos;s often
            an essential part of how a business generates revenue, communicates with customers, and delivers
            services.
          </p>
          <p>
            That perspective shapes how we approach managed hosting. We don&apos;t view hosting as a commodity.
            We view it as an ongoing responsibility to protect and maintain an important business asset.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {differentiators.map((d) => (
            <div key={d.text} className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <d.icon className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <span className="text-sm leading-relaxed">{d.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}