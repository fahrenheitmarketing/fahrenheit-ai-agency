import React from 'react';

export default function SectionHeader({ label, title, description, align = 'center' }) {
  return (
    <div className={`max-w-3xl mb-16 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {label && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3 font-body">
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg leading-relaxed font-body">{description}</p>
      )}
    </div>
  );
}