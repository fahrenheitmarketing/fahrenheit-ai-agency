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
    <figure className="my-12 border-l-4 border-accent pl-6 w-full max-w-full">
      <blockquote className="!m-0 !border-0 !p-0 !not-italic !text-foreground text-lg md:text-xl leading-relaxed break-words">
        {blocks.slice(0, -1)}
      </blockquote>
      <figcaption className="mt-4 text-sm text-muted-foreground font-body">
        <cite className="not-italic">{lastKids[0].props.children}</cite>
      </figcaption>
    </figure>
  );
}