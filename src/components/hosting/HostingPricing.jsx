import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const essentialFeatures = [
  'Managed hosting environment',
  'Core infrastructure security',
  'Web application firewall protection',
  'WordPress security hardening',
  'WordPress core and plugin maintenance',
  'Automated availability monitoring',
  'Malware scanning',
  'Weekly backups',
  'Dedicated account manager',
  'Business-hours support',
  'Human-led security incident investigation',
  'Initial threat containment',
  'Standard server malware remediation',
  'Backup restoration assistance',
  'Periodic security and maintenance review',
];

const advancedFeatures = [
  'Enhanced firewall and threat-filtering configuration',
  'Daily backups',
  'Expanded security review',
  'Priority incident escalation',
  'Enhanced monitoring review',
  'More frequent maintenance oversight',
  'Two hours of complex remediation engineering labor included per qualifying incident, subject to agreed terms',
  'Enhanced reporting and recommendations',
];

const enterpriseFeatures = [
  'Custom infrastructure architecture',
  'Multiple website or application management',
  'Advanced security configurations',
  'Custom backup and retention policies',
  'High-availability options',
  'Dedicated technical coordination',
  'Custom response-time commitments',
  'Expanded incident-response allowances',
  'Custom monitoring and escalation',
  'Security reporting and technical reviews',
  'Disaster recovery planning',
  'Specialized application support',
  'Custom service-level agreements',
];

function FeatureList({ items, dark }) {
  return (
    <ul className="space-y-3 text-sm">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${dark ? 'text-accent' : 'text-accent'}`} aria-hidden="true" />
          <span className={dark ? 'text-background/80' : ''}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HostingPricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-secondary/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Hosting Plans"
          title="Enterprise Protection. Predictable Monthly Investment."
          description="Choose the level of management, security, and response coverage appropriate for your business. All plans include dedicated account management, layered security, proactive monitoring, and standard server malware remediation."
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Essential */}
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-3">
              Essential Protection
            </p>
            <p className="font-heading text-4xl font-normal mb-1">
              $500
              <span className="text-sm text-muted-foreground font-body font-normal">/month</span>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-4 mb-6">
              Professional managed hosting and security for businesses that need reliable protection and
              accountable technical support.
            </p>
            <FeatureList items={essentialFeatures} />
            <p className="text-xs text-muted-foreground leading-relaxed mt-6 pt-6 border-t border-border">
              Complex remediation: additional engineering, forensic investigation, or custom application repair
              outside standard remediation is quoted separately.
            </p>
            <Link to="/contact" className="mt-8">
              <Button variant="outline" className="w-full rounded-full font-body">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Advanced */}
          <div className="bg-card border-2 border-accent rounded-2xl p-8 flex flex-col relative">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                Advanced Protection
              </p>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent font-body border border-accent rounded-full px-2 py-0.5">
                Recommended
              </span>
            </div>
            <p className="font-heading text-4xl font-normal mb-1">
              $750
              <span className="text-sm text-muted-foreground font-body font-normal">/month</span>
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-4 mb-6">
              Enhanced protection and prioritized technical response for business-critical websites.
            </p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">
              Everything in Essential, plus
            </p>
            <FeatureList items={advancedFeatures} />
            <p className="text-xs text-muted-foreground leading-relaxed mt-6 pt-6 border-t border-border">
              Complex remediation: additional work beyond the included allowance is billed at the applicable
              technical service rate, with authorization.
            </p>
            <Link to="/contact" className="mt-8">
              <Button className="w-full rounded-full font-body bg-accent text-white hover:bg-accent/90">
                Choose Advanced
              </Button>
            </Link>
          </div>

          {/* Enterprise */}
          <div className="bg-foreground text-background rounded-2xl p-8 border-2 border-foreground flex flex-col">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3 font-body">
              Enterprise Protection
            </span>
            <p className="font-heading text-4xl font-normal mb-1">
              Custom
              <span className="text-sm text-background/60 font-body font-normal"> pricing</span>
            </p>
            <p className="text-background/70 text-sm leading-relaxed mt-4 mb-6">
              Tailored hosting, cybersecurity, and incident-response programs for complex or high-dependency
              digital environments.
            </p>
            <p className="text-xs uppercase tracking-widest text-background/50 mb-3 font-body">
              Potential capabilities
            </p>
            <FeatureList items={enterpriseFeatures} dark />
            <p className="text-xs text-background/50 leading-relaxed mt-6 pt-6 border-t border-background/15">
              Enterprise capabilities are scoped and priced individually.
            </p>
            <Link to="/contact" className="mt-8">
              <Button className="w-full rounded-full font-body bg-accent text-white hover:bg-accent/90">
                Request an Enterprise Consultation
              </Button>
            </Link>
          </div>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mt-8 max-w-3xl">
          All plans include a dedicated account manager, layered security, proactive monitoring, and standard
          server malware remediation. Hosting resources, storage, and bandwidth are sized to your site&apos;s
          requirements and confirmed during onboarding; Enterprise plans are scoped individually.
        </p>
      </div>
    </section>
  );
}