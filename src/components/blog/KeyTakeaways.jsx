import React from 'react';

// Reusable "key takeaways" block. In post markdown, use a fenced block:
// ```key-takeaways
// - First point
// - Second point
// ```
export default function KeyTakeaways({ items = [], title = 'Key takeaways' }) {
  return (
    <aside className="not-prose my-10 w-full rounded-sm border border-border bg-card p-5 md:p-8 font-body">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">{title}</p>
      <ul className="!list-disc !pl-5 !my-0 space-y-3 marker:text-accent">
        {items.map((item, i) => (
          <li key={i} className="!mb-0 !text-base !leading-relaxed text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}