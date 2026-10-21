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
            <p className="text-lg text-muted-foreground leading-relaxed">
              Strategists, marketers, designers, and engineers — the team you'll actually work with. Hover
              over a portrait to meet them.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </div>
      </section>

      <CTASection
        headline="Want This Team in Your Corner?"
        subtext="Bring us a business problem and we'll bring the people, the process, and the AI to solve it."
        buttonText="Book a strategy call"
      />
    </>
  );
}