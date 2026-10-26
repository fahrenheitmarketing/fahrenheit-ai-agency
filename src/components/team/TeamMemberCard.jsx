import React from 'react';

export default function TeamMemberCard({ name, role, image }) {
  return (
    <figure className="group">
      <div className="overflow-hidden rounded-sm bg-secondary">
        <img
          src={image}
          alt={`${name}, ${role} portrait`}
          loading="lazy"
          draggable="false"
          className="w-full h-auto block"
        />
      </div>
      <figcaption className="pt-4">
        <p className="font-heading text-xl leading-tight">{name}</p>
        <p className="text-xs uppercase tracking-widest text-accent font-body mt-1.5">{role}</p>
      </figcaption>
    </figure>
  );
}