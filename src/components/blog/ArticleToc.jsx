import React from 'react';
import { slugify } from '@/data/topMarketingAgenciesContent';

export default function ArticleToc({ items }) {
  return (
    <nav aria-label="Table of contents" className="border border-border rounded-sm p-6 mb-10 bg-secondary/30">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">The 10 agencies</p>
      <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
        {items.map((item) => (
          <li key={item}>
            <a href={`#${slugify(item)}`} className="text-sm font-body text-muted-foreground hover:text-accent transition-colors">
              {item}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}