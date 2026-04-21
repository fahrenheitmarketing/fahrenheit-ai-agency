import React from 'react';
import { Link } from 'react-router-dom';

export default function CTASection({
  headline = "Bring us a business problem. We'll bring the AI.",
  subtext = "Month-to-month retainers starting at $1,500. A 30-minute strategy call is free — you'll leave with a working hypothesis even if we never work together.",
  buttonText = "Book a strategy call",
  buttonLink = "/contact",
  secondaryText = "See our work",
  secondaryLink = "/pricing",
}) {
  return (
    <section className="py-24 px-6 lg:px-10 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-background/40 mb-6 font-body">Ready when you are</p>
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-8 max-w-3xl">
          {headline}
        </h2>
        <p className="text-background/60 text-base md:text-lg max-w-2xl mb-10 font-body leading-relaxed">{subtext}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to={buttonLink}
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors font-body"
          >
            {buttonText} <span className="text-base">↗</span>
          </Link>
          <Link
            to={secondaryLink}
            className="inline-flex items-center gap-2 border border-background/20 text-background/70 text-sm font-medium px-6 py-3 rounded-sm hover:border-background/40 hover:text-background transition-colors font-body"
          >
            {secondaryText}
          </Link>
        </div>
      </div>
    </section>
  );
}