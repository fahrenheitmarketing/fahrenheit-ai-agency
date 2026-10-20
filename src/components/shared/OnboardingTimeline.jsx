import React from 'react';
import { FileSignature, Users, ClipboardList, Rocket, CalendarClock } from 'lucide-react';

const phases = [
  {
    icon: <FileSignature className="w-6 h-6" />,
    label: 'Phase 1',
    title: 'Welcome & Setup',
    subtitle: 'From signature to project foundation',
    steps: [
      'Client signs the agreement.',
      'An Account Manager (AM) is assigned to the engagement.',
      'Financial Services sends the AM a signed copy of the contract.',
      'Financial Services sends a welcome email to the client.',
      'Client responds to the welcome email.',
      'Financial Services sets up projects in our project management tool.',
      'Financial Services sends the first invoice.',
      'Financial Services informs the AMs that the client has responded and the projects are set up.',
    ],
  },
  {
    icon: <ClipboardList className="w-6 h-6" />,
    label: 'Phase 2',
    title: 'Discovery & Planning',
    subtitle: 'The AM builds the blueprint for the engagement',
    steps: [
      'AM listens to the recorded discovery / sales meeting.',
      'AM compiles the contract and any pertinent information in our project management tool.',
      'AM compiles a Project Plan from the SOW, contract, and discovery sales call, including marketing tasks and deliverables.',
      'Client submits the initial payment.',
      'Financial Services lets the AM know payment has been received.',
      'AM starts the access process using our Access Client onboarding tasks.',
    ],
  },
  {
    icon: <Users className="w-6 h-6" />,
    label: 'Phase 3',
    title: 'Kickoff & Alignment',
    subtitle: 'Client and internal kickoffs get everyone aligned',
    steps: [
      'Client kick-off / discovery meeting is scheduled.',
      'Client kick-off is completed.',
      'Project Plan is updated with information gained from the client kick-off.',
      'Internal kick-off is scheduled. Marketing reviews the Project Plan to confirm all marketing tasks are included. Design and Marketing both attend so they are familiar with the client.',
      'Internal kick-off is completed.',
      'Project Plan is finalized.',
      'AM compiles a spreadsheet with time estimates by service category (Account Management, Google Ads, Strategy, Design, Development, etc.) as percentages, tied to the finalized Project Plan. This becomes a useful tool if the client wants to change or add services later.',
    ],
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    label: 'Phase 4',
    title: 'Briefs & Approvals',
    subtitle: 'Scope is documented and approved before work begins',
    steps: [
      'Briefs are developed. The AM assigns them to the appropriate person or pulls from available information in the Project Plan:',
      'Website brief: company info, logo designs, number of pages, etc.',
      'Branding brief.',
      'Marketing brief: number of Google campaigns, number of blogs, social posts per week, campaign duration, etc.',
      'AM sends the brief(s) to the client, if applicable.',
      'Client approves the brief(s), if applicable.',
    ],
  },
  {
    icon: <CalendarClock className="w-6 h-6" />,
    label: 'Phase 5',
    title: 'Schedules, Reminders & Launch Handoffs',
    subtitle: 'Recurring rhythms and launch-day tasks are set',
    steps: [
      'AM builds out a monthly schedule for recurring tasks (for marketing accounts).',
      'AM creates a weekly reminder to review all tasks on the account and check the timeline, if applicable.',
      'AM creates a weekly reminder to review and approve time rendered on the account and check budget.',
      'AM creates a daily task to report to the client whenever action has been taken on their account that day.',
      'If hosting: create a task to set up site updates.',
      'If hosting: create a task to notify the billing team when the site launches.',
      'If a website: create tasks to notify the billing team at billing milestones per the contract.',
    ],
  },
];

const highlights = [
  { stat: '5', text: 'Structured phases from signature to launch handoff.' },
  { stat: '1 AM', text: 'A dedicated Account Manager owns every step of your onboarding.' },
  { stat: 'Month 1', text: 'Productive onboarding that sets the foundation for the entire engagement.' },
];

export default function OnboardingTimeline() {
  return (
    <section id="what-to-expect" className="py-24 px-6 bg-secondary/30 border-t border-border scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-accent mb-6 font-body">What to Expect</p>
        <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-6 max-w-3xl">
          Your First <span className="italic">30 Days</span> With Fahrenheit
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl font-body">
          The first month is onboarding, but it is filled with productive work. From the moment you sign, a
          structured sequence of setup, discovery, planning, and kickoff tasks gets your account set up for
          success. Here is exactly what happens, in order.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {highlights.map((h) => (
            <div key={h.stat} className="bg-card border border-border rounded-sm p-8">
              <p className="text-3xl font-heading font-normal text-accent mb-2">{h.stat}</p>
              <p className="text-sm text-muted-foreground font-body">{h.text}</p>
            </div>
          ))}
        </div>

        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">The Onboarding Sequence</p>
        <h3 className="font-heading text-3xl md:text-4xl font-normal leading-[1.15] mb-16 max-w-3xl">
          Five phases. One <span className="italic">clear</span> path to launch.
        </h3>

        <div className="space-y-16">
          {phases.map((phase, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <div className="sticky top-28">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      {phase.icon}
                    </div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">{phase.label}</p>
                  </div>
                  <h4 className="font-heading text-2xl font-normal mb-2">{phase.title}</h4>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{phase.subtitle}</p>
                </div>
              </div>
              <div className="md:col-span-8">
                <ol className="relative border-l border-border pl-6 space-y-5">
                  {phase.steps.map((step, i) => (
                    <li key={i} className="relative">
                      <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
                      <p className="text-sm font-body text-foreground/85 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}