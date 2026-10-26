import React from 'react';

export default function TeamMemberCard({ name, role, image }) {
  return (
    <div
      className="group relative overflow-hidden rounded-sm aspect-[3/4] focus-within:ring-2 focus-within:ring-accent"
      tabIndex={0}
      aria-label={`${name}, ${role}`}
    >
      <img
        src={image}
        alt={`${name}, ${role} portrait`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
      />
      {/* Rollover overlay */}
      <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="w-full px-6 pb-6">
          <p className="font-heading text-xl md:text-2xl text-white leading-tight">{name}</p>
          <p className="text-xs md:text-sm uppercase tracking-widest text-accent font-body mt-1.5">{role}</p>
        </div>
      </div>
    </div>
  );
}