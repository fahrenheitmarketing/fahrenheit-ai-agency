import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileSignature, Users, ClipboardList, Rocket, CalendarClock } from 'lucide-react';
import CTASection from '../components/shared/CTASection';

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
    subtitle: 'External and internal kickoffs get everyone aligned',
    steps: [
      'External kick-off / discovery meeting is scheduled.',
      'External kick-off is completed.',
      'Project Plan is updated with information gained from the external kick-off.',
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
      'If hosting: create a task for Evan to set up WP Updates.',
      'If hosting: create a task to notify Laurel when the site launches.',
      'If a website: create tasks to notify Laurel at billing milestones per the contract.',
    ],
  },
];

export default function WhatToExpect() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden border-b border-border">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-60 select-none -z-10"
        />
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none rotate-180 -z-10"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-accent mb-6 font-body">What to Expect</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8">
                Your First <span className="italic">30 Days</span> With Fahrenheit
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-body">
                The first month is onboarding, but it is filled with productive work. From the moment you sign, a structured sequence of setup, discovery, planning, and kickoff tasks gets your account set up for success. Here is exactly what happens, in order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button size="lg" className="gap-2 font-body">
                    Start the Process <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="font-body">
                    See Pricing
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-secondary/50 border border-border rounded-sm p-10 space-y-8">
              <div className="border-b border-border pb-6 last:border-0">
                <p className="text-3xl font-heading font-normal text-accent mb-2">5</p>
                <p className="text-sm text-muted-foreground font-body">Structured phases from signature to launch handoff.</p>
              </div>
              <div className="border-b border-border pb-6 last:border-0">
                <p className="text-3xl font-heading font-normal text-accent mb-2">1 AM</p>
                <p className="text-sm text-muted-foreground font-body">A dedicated Account Manager owns every step of your onboarding.</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-normal text-accent mb-2">Month 1</p>
                <p className="text-sm text-muted-foreground font-body">Productive onboarding that sets the foundation for the entire engagement.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phases */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">The Onboarding Sequence</p>
          <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-16 max-w-3xl">
            Five phases. One <span className="italic">clear</span> path to launch.
          </h2>

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
                    <h3 className="font-heading text-2xl font-normal mb-2">{phase.title}</h3>
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

      <CTASection
        headline="Ready to get started?"
        subtext="Month-to-month retainers starting at $3,500. A 30-minute strategy call is free, and you'll leave with a working hypothesis even if we never work together."
        buttonText="Book a strategy call"
      />
    </>
  );
}