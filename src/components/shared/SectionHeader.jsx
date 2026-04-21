import React from 'react';

export default function SectionHeader({ label, number, title, description, align = 'left' }) {
  return (
    <div className={`max-w-3xl mb-16 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {(label || number) && (
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-body">
          {number && <span className="mr-2">{number}</span>}
          {label}
        </p>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body mt-4">{description}</p>
      )}
    </div>
  );
}