import React from 'react';
import { Link } from 'react-router-dom';

const links = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <section className="py-24 lg:py-40 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4 font-body">
          Error 404
        </span>
        <h1 className="font-heading text-5xl md:text-6xl font-normal leading-[1.1] mb-6">
          This page <span className="text-accent">doesn't exist</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10 font-body">
          The page you're looking for may have moved or the link may be incorrect.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors font-body"
        >
          Back to home
        </Link>
        <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-body">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground hover:text-accent transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}