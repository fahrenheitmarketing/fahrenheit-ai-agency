import React from 'react';
import ProcessPageLayout from '@/components/process/ProcessPageLayout';

export default function Scale() {
  return (
    <ProcessPageLayout
      num="03"
      title="Scale"
      tagline="Operate, measure, and compound"
      intro="This is where retainers earn their keep. We run the systems we built, review outcomes monthly against revenue and efficiency targets, and reinvest wins into the next opportunity on the roadmap. Month-to-month, always — you stay because it works."
      phases={[
        { label: 'Daily', title: 'Active operation', description: 'Campaigns, automations, and platforms are monitored and tuned continuously — budgets, bids, creative, and models adjusted as data comes in.' },
        { label: 'Weekly', title: 'Experiment cadence', description: 'A running test queue across ads, pages, and messaging. Every week produces a result we can act on, positive or negative.' },
        { label: 'Monthly', title: 'Outcome review', description: 'A leadership review against the targets we set: revenue, ROAS, cost per acquisition, conversion rate, and hours saved.' },
        { label: 'Quarterly', title: 'Roadmap reprioritization', description: 'We re-score the remaining opportunities using real performance data and decide where the next quarter of effort goes.' },
        { label: 'Continuous', title: 'Expansion', description: 'New channels, new markets, new automations — added only when the current systems are producing reliably.' },
      ]}
      timeline="Month-to-month retainers from $3,500/mo. No long-term contracts, cancel anytime, ad spend billed separately."
      deliverables={[
        { title: 'Ongoing channel management', description: 'Paid media, SEO, and social operated by the team that built them.' },
        { title: 'Monthly performance review', description: 'Plain-language reporting tied to P&L outcomes, not vanity metrics.' },
        { title: 'Continuous optimization', description: 'A documented test log showing what we tried, what won, and what it was worth.' },
        { title: 'Automation maintenance', description: 'Workflows and AI systems monitored, updated, and extended as your business changes.' },
        { title: 'Quarterly strategy reset', description: 'Roadmap re-sequenced against current data, competitors, and market signals.' },
        { title: 'Direct senior access', description: 'You work with the strategists and builders doing the work — no account-manager layer.' },
      ]}
    />
  );
}