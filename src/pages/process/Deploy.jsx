import React from 'react';
import ProcessPageLayout from '@/components/process/ProcessPageLayout';

export default function Deploy() {
  return (
    <ProcessPageLayout
      num="02"
      title="Deploy"
      tagline="Ship working systems in weeks, not quarters"
      intro="We build in short cycles and put things into production early. Campaigns, automations, and custom software go live inside the first 30–60 days — instrumented from day one so you can see what they're doing to revenue."
      phases={[
        { label: 'Sprint 0', title: 'Foundations and instrumentation', description: 'Tracking, attribution, and reporting get fixed first. Nothing ships without a way to measure whether it worked.' },
        { label: 'Sprint 1', title: 'Highest-leverage system first', description: 'We start with the one thing from the roadmap with the best return — a paid media rebuild, a conversion overhaul, an internal automation, or a custom application.' },
        { label: 'Ongoing', title: 'AI-assisted build and content', description: 'Our development and content stacks use AI heavily, which is why work that used to take a quarter and a large budget now ships in weeks.' },
        { label: 'Ongoing', title: 'Integration into your stack', description: 'CRM, ecommerce platform, ad accounts, analytics, and internal tools wired together so data flows without manual exports.' },
        { label: 'Every cycle', title: 'Launch, test, iterate', description: 'Each release ships with a hypothesis and a test. We keep what performs, kill what does not, and document both.' },
      ]}
      timeline="First systems live within 30–60 days. Month-to-month retainers start at $3,500/mo; fixed-bid projects are quoted from the roadmap."
      deliverables={[
        { title: 'Live campaigns', description: 'Search, paid social, and display builds with AI-assisted bidding, creative testing, and clean conversion tracking.' },
        { title: 'Conversion improvements', description: 'Landing pages, funnels, and UX changes shipped against measured drop-off points.' },
        { title: 'Custom software and automations', description: 'Applications, internal tools, and workflow automations built on modern AI-first stacks.' },
        { title: 'Content and SEO systems', description: 'Publishing engines built for traditional search, AI Overviews, and generative answer visibility.' },
        { title: 'Connected reporting', description: 'One dashboard that ties spend and activity to pipeline and revenue.' },
        { title: 'Documentation and handoff', description: 'Everything we build is documented and owned by you — no black boxes.' },
      ]}
      nextStep={{ label: 'Scale', link: '/process/scale' }}
    />
  );
}