import React from 'react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ number, title, description, link, subtitle }) {
  return (
    <Link to={link} className="group block">
      <div className="py-8 border-t border-border hover:border-foreground/30 transition-colors">
        <div className="flex items-start justify-between gap-4 mb-3">
          <span className="text-xs text-muted-foreground font-body">{number}</span>
          <span className="text-xs text-muted-foreground font-body group-hover:text-foreground transition-colors">↗</span>
        </div>
        {subtitle && <p className="text-xs uppercase tracking-widest text-accent mb-2 font-body">{subtitle}</p>}
        <h3 className="font-heading text-2xl font-normal mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed font-body">{description}</p>
      </div>
    </Link>
  );
}