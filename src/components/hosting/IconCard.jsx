import React from 'react';

// Reusable icon card used across the managed hosting page.
export default function IconCard({ icon: Icon, title, description, bullets }) {
  return (
    <div className="bg-card p-8 rounded-2xl border border-border h-full">
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <h3 className="font-heading text-lg font-normal mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      )}
      {bullets && (
        <ul className="space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
              <span className="mt-[7px] w-1 h-1 rounded-full bg-accent flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}