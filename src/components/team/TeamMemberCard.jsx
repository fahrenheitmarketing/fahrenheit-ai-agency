import React from 'react';

export default function TeamMemberCard({ name, role, image, focusX = 50 }) {
  return (
    <figure className="group">
      <div className="relative overflow-hidden rounded-sm aspect-[4/5] bg-secondary">
        <img
          src={image}
          alt={`${name}, ${role} portrait`}
          loading="lazy"
          draggable="false"
          style={{ objectPosition: `${focusX}% 20%` }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <figcaption className="pt-4">
        <p className="font-heading text-xl leading-tight">{name}</p>
        <p className="text-xs uppercase tracking-widest text-accent font-body mt-1.5">{role}</p>
      </figcaption>
    </figure>
  );
}