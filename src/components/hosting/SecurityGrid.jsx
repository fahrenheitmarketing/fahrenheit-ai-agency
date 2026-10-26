import React from 'react';
import { Globe, Server, ScanSearch, KeyRound, Activity, Database } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';
import IconCard from '@/components/hosting/IconCard';

const capabilities = [
  {
    icon: Globe,
    title: 'Network and Edge Protection',
    bullets: [
      'Web application firewall configuration',
      'Cloudflare-based protections where applicable',
      'DDoS mitigation',
      'Bot and malicious traffic filtering',
      'Managed DNS configuration',
      'Origin access restrictions where supported',
    ],
  },
  {
    icon: Server,
    title: 'Server and Application Hardening',
    bullets: [
      'Secure server configuration',
      'WordPress hardening',
      'Administrative access restrictions',
      'File permission reviews',
      'Reduced exposure of unnecessary services',
      'PHP and software compatibility assessments',
    ],
  },
  {
    icon: ScanSearch,
    title: 'Vulnerability Management',
    bullets: [
      'WordPress core and plugin maintenance',
      'Theme updates where supported',
      'Vulnerability monitoring',
      'Review of identified security risks',
      'Remediation recommendations',
      'Compatibility testing when appropriate',
    ],
  },
  {
    icon: KeyRound,
    title: 'Access Security',
    bullets: [
      'Strong authentication practices',
      'Multifactor authentication recommendations',
      'Least-privilege access controls',
      'Review of privileged accounts',
      'Secure credential-handling practices',
    ],
  },
  {
    icon: Activity,
    title: 'Monitoring and Threat Detection',
    bullets: [
      'Automated availability monitoring',
      'Security event monitoring',
      'Malware scanning',
      'Suspicious activity alerts',
      'Escalation of actionable incidents',
    ],
  },
  {
    icon: Database,
    title: 'Backup and Recovery',
    bullets: [
      'Managed backup schedules',
      'Offsite or isolated backup storage where configured',
      'Backup retention policies',
      'Restoration assistance',
      'Periodic recovery validation according to plan',
    ],
  },
];

export default function SecurityGrid() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Layered Security"
          title="Security Isn't a Feature. It's a Continuous Process."
          description="No hosting environment can guarantee immunity from cyberattacks. Effective protection requires multiple layers of defense, ongoing maintenance, appropriate access controls, and a disciplined response process. Fahrenheit's managed hosting service combines preventive controls, continuous automated monitoring, and human oversight."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((c) => (
            <IconCard key={c.title} icon={c.icon} title={c.title} bullets={c.bullets} />
          ))}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-10 max-w-3xl">
          The specific controls configured for your site vary by plan and platform. The{' '}
          <a href="#pricing" className="text-accent underline underline-offset-4 hover:text-accent/80">
            pricing comparison below
          </a>{' '}
          details what each tier includes.
        </p>
      </div>
    </section>
  );
}