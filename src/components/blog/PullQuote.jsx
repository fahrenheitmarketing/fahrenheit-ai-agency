import React from 'react';

// Renders a markdown blockquote as a semantic pull quote when its last paragraph
// is a single italic line (the attribution). Otherwise renders a plain blockquote.
export default function PullQuote({ children }) {
  const blocks = React.Children.toArray(children).filter((c) => React.isValidElement(c));
  const last = blocks[blocks.length - 1];
  const lastKids = last ? React.Children.toArray(last.props.children) : [];
  const isAttribution =
    blocks.length > 1 && lastKids.length === 1 && React.isValidElement(lastKids[0]) && lastKids[0].type === 'em';

  if (!isAttribution) return <blockquote>{children}</blockquote>;

  return (
    <figure className="relative my-14 md:my-16 mx-auto w-[85%] max-w-full rounded-md bg-muted/60 p-5 md:p-8 overflow-hidden">
      <span
        aria-hidden="true"
        className="absolute top-1 left-3 md:left-5 font-heading text-6xl md:text-7xl leading-none text-accent select-none"
      >
        &ldquo;
      </span>
      <blockquote className="!m-0 !border-0 !p-0 pt-6 font-heading italic text-[1.2em] md:text-[1.35em] leading-[1.4] text-foreground break-words [&>p]:!m-0 [&>p]:!font-heading [&>p]:!italic">
        {blocks.slice(0, -1)}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground font-body">
        <span aria-hidden="true" className="block h-0.5 w-8 shrink-0 bg-accent" />
        <cite className="not-italic">{lastKids[0].props.children}</cite>
      </figcaption>
    </figure>
  );
}