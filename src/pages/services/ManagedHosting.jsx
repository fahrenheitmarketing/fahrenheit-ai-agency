import React, { useEffect } from 'react';
import RelatedServices from '@/components/shared/RelatedServices';
import FAQSection from '@/components/shared/FAQSection';
import HostingHero from '@/components/hosting/HostingHero';
import ComparisonTable from '@/components/hosting/ComparisonTable';
import AccountabilitySection from '@/components/hosting/AccountabilitySection';
import SecurityGrid from '@/components/hosting/SecurityGrid';
import IncidentResponse from '@/components/hosting/IncidentResponse';
import ProactiveManagement from '@/components/hosting/ProactiveManagement';
import HostingPricing from '@/components/hosting/HostingPricing';
import ServiceBoundaries from '@/components/hosting/ServiceBoundaries';
import ReportingSection from '@/components/hosting/ReportingSection';
import WhyFahrenheit from '@/components/hosting/WhyFahrenheit';
import MigrationSection from '@/components/hosting/MigrationSection';
import HostingFinalCTA from '@/components/hosting/HostingFinalCTA';

const SEO_TITLE = 'Enterprise Managed Hosting & Security | Fahrenheit Marketing';
const SEO_DESCRIPTION =
  'Enterprise managed hosting with dedicated account management, proactive cybersecurity, human-led incident response, and standard malware remediation included.';

const faqs = [
  {
    question: 'What makes Fahrenheit different from traditional managed hosting?',
    answer:
      "Fahrenheit combines managed infrastructure and automated security systems with dedicated account management, proactive maintenance, and human-led incident response. Our service is designed for businesses that want an accountable technical partner rather than infrastructure alone.",
  },
  {
    question: 'Is malware removal included?',
    answer:
      'Yes. Standard malware investigation and remediation within the covered managed hosting environment are included in every plan. Extensive forensic work, custom application repairs, or recovery outside the covered scope may require additional fees.',
  },
  {
    question: 'What happens if my website gets hacked?',
    answer:
      'Our team investigates the reported or detected incident, takes appropriate containment measures, and works to remove malicious activity and restore affected services within the covered scope. We communicate significant findings and recommend preventive measures.',
  },
  {
    question: "Does Fahrenheit guarantee that my website won't be hacked?",
    answer:
      'No hosting provider can guarantee complete protection against every cyber threat. Our approach is to reduce risk through layered defenses, proactive maintenance, monitoring, and an established incident-response process.',
  },
  {
    question: 'Will I have a dedicated account manager?',
    answer:
      'Yes. Every managed hosting client has a designated account manager who coordinates communication and helps manage service requests and technical escalations.',
  },
  {
    question: 'Do you monitor websites 24/7?',
    answer:
      'Automated monitoring operates continuously where configured. Human support, incident escalation, and response are provided according to the service level and coverage hours of each plan.',
  },
  {
    question: 'Are backups included?',
    answer:
      'Yes. Essential includes weekly backups, while Advanced includes daily backups. Enterprise backup schedules, retention, and recovery requirements are customized.',
  },
  {
    question: 'What happens if a security incident requires extensive work?',
    answer:
      'Standard remediation is included. If an incident requires work outside the covered scope, we will explain the additional services and associated costs before proceeding whenever practicable.',
  },
  {
    question: 'Can you migrate my existing website?',
    answer:
      'Fahrenheit can evaluate existing websites for migration to its managed environment. Migration scope, compatibility, security condition, and any applicable fees are assessed individually.',
  },
  {
    question: 'Can Fahrenheit manage more than one website?',
    answer:
      'Yes. Multi-site and more complex hosting requirements can be accommodated through appropriately scoped plans, including Enterprise Protection.',
  },
  {
    question: 'Do you support e-commerce websites?',
    answer:
      'Yes, subject to a technical assessment of the platform, integrations, transaction requirements, and infrastructure needs.',
  },
  {
    question: 'Does managed hosting include website development or content changes?',
    answer:
      'Managed hosting covers the infrastructure, maintenance, and security services defined in the selected plan. Website redesign, new features, content changes, and substantial application development are separate services unless expressly included in an agreement.',
  },
];

export default function ManagedHosting() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = SEO_TITLE;
    let desc = document.querySelector('meta[name="description"]');
    const prevDesc = desc ? desc.getAttribute('content') : null;
    if (!desc) {
      desc = document.createElement('meta');
      desc.setAttribute('name', 'description');
      document.head.appendChild(desc);
    }
    desc.setAttribute('content', SEO_DESCRIPTION);
    return () => {
      document.title = prevTitle;
      if (prevDesc !== null) desc.setAttribute('content', prevDesc);
      else desc.remove();
    };
  }, []);

  return (
    <>
      <HostingHero />
      <HostingPricing />
      <ComparisonTable />
      <AccountabilitySection />
      <SecurityGrid />
      <IncidentResponse />
      <ProactiveManagement />
      <ServiceBoundaries />
      <MigrationSection />
      <ReportingSection />
      <WhyFahrenheit />
      <FAQSection faqs={faqs} title="Managed Hosting & Cybersecurity Questions" />
      <RelatedServices current="hosting" />
      <HostingFinalCTA />
    </>
  );
}