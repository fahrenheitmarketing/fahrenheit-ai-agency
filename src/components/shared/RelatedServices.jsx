import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, RELATED_BY_SERVICE } from '@/data/serviceLinks';

export default function RelatedServices({ current }) {
  const keys = RELATED_BY_SERVICE[current] || [];
  return (
    <section className="py-16 px-6 border-t border-border" aria-label="Related services">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Works well with</p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {keys.map((k) => (
            <li key={k}>
              <p className="text-base font-body leading-relaxed text-muted-foreground">
                {SERVICES[k].blurb}{' '}
                <Link to={SERVICES[k].to} className="text-accent underline hover:text-accent/80 transition-colors">
                  Explore our {SERVICES[k].anchor}
                </Link>.
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}