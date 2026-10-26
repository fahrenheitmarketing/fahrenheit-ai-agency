import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES, SERVICES_BY_CATEGORY, DEFAULT_BLOG_SERVICES } from '@/data/serviceLinks';

export default function BlogServiceLinks({ category }) {
  const keys = SERVICES_BY_CATEGORY[category] || DEFAULT_BLOG_SERVICES;
  return (
    <div className="mt-12 border-t border-border pt-8">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Put this into practice</p>
      <ul className="space-y-3 font-body text-base leading-relaxed">
        {keys.map((k) => (
          <li key={k}>
            {SERVICES[k].blurb}{' '}
            <Link to={SERVICES[k].to} className="text-accent underline hover:text-accent/80 transition-colors">
              See our {SERVICES[k].anchor}
            </Link>.
          </li>
        ))}
      </ul>
    </div>
  );
}