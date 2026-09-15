import React from 'react';
import ProcessPageLayout from '@/components/process/ProcessPageLayout';

export default function Diagnose() {
  return (
    <ProcessPageLayout
      num="01"
      title="Diagnose"
      tagline="Map the P&L to the workflows"
      intro="Before we build or buy anything, we find out where AI actually creates leverage in your business — and where it would just burn budget. Two to three weeks of structured discovery, ending in a prioritized plan you own whether or not you keep working with us."
      phases={[
        { label: 'Week 1', title: 'Revenue and workflow mapping', description: 'We sit with your team and trace how revenue is produced — the channels, the handoffs, the manual steps. Then we quantify what each bottleneck costs you in dollars and hours.' },
        { label: 'Week 1', title: 'Data and analytics audit', description: 'We audit tracking, attribution, CRM hygiene, and reporting. Most AI projects fail on data quality, so we surface those gaps before anything gets deployed.' },
        { label: 'Week 2', title: 'Channel and competitive analysis', description: 'Search, paid, social, and site performance benchmarked against your real competitors — including how visible you are in AI-driven search results.' },
        { label: 'Week 2', title: 'AI opportunity scoring', description: 'Every opportunity gets scored on revenue impact, effort, and risk. Some become automations, some become campaigns, some become custom software — and some we tell you to skip.' },
        { label: 'Week 3', title: 'Roadmap and business case', description: 'You get a sequenced 90-day and 12-month roadmap with expected outcomes, the stack required, and the investment each phase needs.' },
      ]}
      timeline="Typical timeline: 2–3 weeks. Available as a standalone engagement or credited into your first retainer month."
      deliverables={[
        { title: 'Growth diagnostic report', description: 'Findings across acquisition, conversion, retention, and operations — written for decision-makers, not analysts.' },
        { title: 'Data and tracking punch list', description: 'Exactly what is broken in your analytics and attribution, and the order to fix it in.' },
        { title: 'Prioritized AI roadmap', description: 'Scored opportunities sequenced into phases with owners, effort, and expected return.' },
        { title: 'Competitive visibility benchmark', description: 'Where you stand in traditional search, paid channels, and AI-generated answers.' },
        { title: 'Recommended stack', description: 'The specific tools, models, and integrations we would use — and what they cost.' },
        { title: 'Executive walkthrough', description: 'A live session with your leadership to pressure-test the plan and align on the first move.' },
      ]}
      nextStep={{ label: 'Deploy', link: '/process/deploy' }}
    />
  );
}