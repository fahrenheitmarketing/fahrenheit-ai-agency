import React from 'react';
import { Link } from 'react-router-dom';
import { LOCATIONS } from '@/data/locations';

export default function ServiceAreasSection() {
  return (
    <section className="py-24 px-6 lg:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-6 max-w-3xl">
          Serving Businesses Across Central Texas
        </h2>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed font-body max-w-3xl mb-12">
          Fahrenheit Marketing has worked with Central Texas businesses since 2008. We are headquartered in Austin and build SEO, paid media, and web strategies for companies throughout the region.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {LOCATIONS.map((l) => (
            <Link key={l.to} to={l.to} className="block bg-card hover:bg-secondary transition-colors p-8 group">
              <span className="block font-heading text-2xl font-normal mb-2 group-hover:text-accent transition-colors">{l.city}</span>
              <span className="block text-sm text-muted-foreground font-body leading-relaxed">{l.descriptor}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}