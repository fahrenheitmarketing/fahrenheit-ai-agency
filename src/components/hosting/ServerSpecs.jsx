import React from 'react';

export default function ServerSpecs({ specs, bestFor, dark = false }) {
  return (
    <div
      className={`rounded-xl border p-5 mt-6 ${
        dark ? 'border-background/15' : 'border-border bg-background'
      }`}
    >
      <p
        className={`text-xs uppercase tracking-widest mb-4 font-body ${
          dark ? 'text-background/50' : 'text-muted-foreground'
        }`}
      >
        Infrastructure included
      </p>
      <dl className="space-y-2.5 text-sm">
        {specs.map(({ label, value }) => (
          <div key={label} className="flex items-start justify-between gap-4">
            <dt className={dark ? 'text-background/50' : 'text-muted-foreground'}>{label}</dt>
            <dd
              className={`text-right font-medium ${
                dark ? 'text-background/90' : 'text-foreground/90'
              }`}
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
      {bestFor && (
        <p
          className={`text-xs leading-relaxed mt-4 pt-4 border-t ${
            dark ? 'border-background/15 text-background/60' : 'border-border text-muted-foreground'
          }`}
        >
          <span className="uppercase tracking-widest">Best for:</span> {bestFor}
        </p>
      )}
    </div>
  );
}