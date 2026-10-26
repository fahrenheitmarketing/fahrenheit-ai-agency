import React from 'react';
import CTASection from '@/components/shared/CTASection';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import { teamMembers } from '@/data/teamMembers';

export default function Team() {
  return (
    <>
      <section className="py-24 lg:py-32 px-6">
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4 font-body">
              Our Team
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              The People Behind <span className="text-accent">the Work</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-5">
              Fahrenheit is a senior team of digital marketing experts: strategists, SEO and paid media
              specialists, designers, developers, and data analysts who have spent years running
              campaigns, building websites, and growing revenue for businesses across industries.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Together we bring decades of collective experience across search, social, conversion
              optimization, marketing automation, and software development. That depth means the people
              who scope your work are the people who deliver it, with no junior hand-offs and no
              guesswork.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-x-8 lg:gap-y-14">
            {teamMembers.map((m) => (
              <TeamMemberCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Want This Team in Your Corner?"
        subtext="We pair hands-on expertise with an AI-first approach, so every client gets seasoned judgment backed by faster research, sharper analysis, and clearer reporting. Bring us a business problem and we'll bring the people, the process, and the AI to solve it."
        buttonText="Book a strategy call" />
      
    </>);

}