import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../../components/shared/CTASection';

const schema = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "name": "Fahrenheit Marketing",
  "url": "https://www.fahrenheitmarketing.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "areaServed": ["Austin", "Round Rock", "Cedar Park", "Georgetown", "Kyle", "Buda", "Bastrop"],
  "foundingDate": "2008",
  "description": "Full-service digital marketing agency in Austin, TX specializing in SEO, PPC, content marketing, social media, and web development."
};

const services = [
  {
    heading: "SEO — Including AI Overviews & Generative Engine Optimization (GEO)",
    body: "Search has changed. Google's AI Overviews now answer questions before users ever click a link, and tools like ChatGPT and Perplexity are becoming their own discovery channels. We build SEO strategies that target traditional rankings and optimize your brand's presence in AI-generated results — so you're visible wherever your customers are searching.",
    link: "/services/seo",
  },
  {
    heading: "Paid Search (PPC)",
    body: "Google Ads and Microsoft Ads campaigns that are built around actual business outcomes, not vanity metrics. We manage bidding, audience targeting, ad creative, and conversion tracking end-to-end — and we report on what matters.",
    link: "/services/sem",
  },
  {
    heading: "Content Marketing",
    body: "Content that earns rankings and builds authority. From service pages and location content to thought leadership and FAQ-driven articles structured for AI citation, we produce copy that works as hard as the strategy behind it.",
    link: "/services/strategy",
  },
  {
    heading: "Social Media Marketing",
    body: "Paid and organic social across Meta, LinkedIn, and beyond. Whether you're running lead gen campaigns or building brand awareness, we manage creative, targeting, and performance reporting in one place.",
    link: "/services/smm",
  },
  {
    heading: "Web Development & CRO",
    body: "Traffic without conversion is just noise. Our development team builds and optimizes websites that are fast, crawlable, and designed to turn visitors into leads — with A/B testing and conversion rate optimization built in, not bolted on.",
    link: "/services/cro",
  },
];

const clientTypes = [
  "Multi-location healthcare and dental brands scaling across Texas cities, with tracking infrastructure and HIPAA-compliant attribution to match.",
  "B2B companies in manufacturing and professional services generating qualified pipeline through search and paid media — not just impressions.",
  "eCommerce brands driving revenue through integrated SEO, paid search, and email.",
  "SaaS and tech businesses building authority and inbound demand in competitive national markets.",
];

const nearbyLocations = [
  { name: "Round Rock", slug: "round-rock-tx" },
  { name: "Cedar Park", slug: "cedar-park-tx" },
  { name: "Georgetown", slug: "georgetown-tx" },
  { name: "Kyle", slug: "kyle-tx" },
  { name: "Buda", slug: "buda-tx" },
  { name: "Bastrop", slug: "bastrop-tx" },
];

export default function AustinTX() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'local-business-schema';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('local-business-schema');
      if (el) el.remove();
    };
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background">

        {/* Hero */}
        <section className="relative py-20 px-6 lg:px-10 border-b border-border overflow-hidden">
          <img
            src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
            alt=""
            aria-hidden="true"
            className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none"
          />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
              Digital Marketing Agency · Austin, TX
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] max-w-4xl mb-8">
              Austin's Digital Marketing Agency — Built for How People Actually Search Today
            </h1>
            <div className="max-w-2xl space-y-4 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
              <p>
                Austin businesses don't have a visibility problem — they have a competition problem. In one of the fastest-growing cities in the country, showing up in Google (and now in AI-generated answers) takes more than a decent website and a few blog posts. It takes a team that understands how search actually works in 2025 and beyond.
              </p>
              <p>
                Fahrenheit Marketing has been doing this since 2008. We're a full-service digital agency headquartered in Austin, and we work with businesses across healthcare, B2B, eCommerce, manufacturing, and professional services — helping them get found, get clicks, and turn traffic into revenue.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 px-6 lg:px-10 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Services</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-4">What We Do</h2>
              <p className="text-muted-foreground font-body text-base max-w-xl">
                We offer a connected stack of services built around one goal: sustainable, measurable growth.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {services.map((s, i) => (
                <Link
                  key={i}
                  to={s.link}
                  className="group border-t border-border py-8 pr-8 hover:bg-secondary/30 transition-colors -mx-0 px-6"
                >
                  <h3 className="font-heading text-xl font-normal mb-3 group-hover:text-accent transition-colors">
                    {s.heading}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {s.body}
                  </p>
                  <span className="inline-block mt-4 text-xs font-body text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Austin Businesses Work With Us */}
        <section className="py-20 px-6 lg:px-10 border-b border-border bg-card/40">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Track Record</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6">
                Why Austin Businesses Work With Us
              </h2>
              <p className="text-muted-foreground font-body text-base leading-relaxed mb-4">
                We're not a national agency that plugged Austin into a location page template. We're based here, we understand the market, and we've built campaigns for businesses operating in some of the most competitive verticals in Texas.
              </p>
              <p className="text-muted-foreground font-body text-base leading-relaxed">
                Here's what that looks like in practice:
              </p>
            </div>
            <div className="space-y-0">
              {clientTypes.map((item, i) => (
                <div key={i} className="border-t border-border py-6 flex gap-4">
                  <span className="text-accent font-heading text-lg mt-0.5">—</span>
                  <p className="text-sm font-body leading-relaxed text-foreground/80">{item}</p>
                </div>
              ))}
              <div className="border-t border-border pt-6">
                <p className="text-sm font-body font-medium text-foreground">We've been doing this since 2008. We're not experimenting on your budget.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI-First */}
        <section className="py-20 px-6 lg:px-10 border-b border-border">
          <div className="max-w-7xl mx-auto max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Our Approach</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6">
              AI-First Marketing, Without Losing What Works
            </h2>
            <div className="space-y-4 text-muted-foreground font-body text-base leading-relaxed max-w-2xl">
              <p>
                A lot of agencies are rebranding as "AI-first" right now. We're doing something different: integrating AI tools into our workflows where they genuinely improve results — in research, content production, reporting, and campaign optimization — while maintaining the human strategy and editorial judgment that actually moves the needle.
              </p>
              <p>
                That means your campaigns benefit from AI-powered efficiency without sacrificing the strategic thinking and accountability that Austin businesses deserve.
              </p>
            </div>
          </div>
        </section>

        {/* Service Area */}
        <section className="py-20 px-6 lg:px-10 border-b border-border bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Coverage Area</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6">
              We Work With Austin Businesses Across the Metro
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed max-w-2xl mb-10">
              Austin is our home base, but we work with businesses across the greater metro — from Round Rock and Cedar Park in the north, to Georgetown, Kyle, Buda, and Bastrop to the south and east. If your customers are in Central Texas, we know how to reach them.
            </p>
            <div className="flex flex-wrap gap-3">
              {nearbyLocations.map(loc => (
                <span
                  key={loc.slug}
                  className="text-xs font-body font-medium px-4 py-2 rounded-sm border border-border bg-background text-foreground/70"
                >
                  {loc.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Ready to Grow CTA inline */}
        <section className="py-20 px-6 lg:px-10 border-b border-border">
          <div className="max-w-7xl mx-auto max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Get Started</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6">
              Ready to Grow? Let's Talk.
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-8">
              We offer a free discovery call for Austin-area businesses — no pitch deck, no pressure. Just a straight conversation about where you are, where you want to be, and whether we're the right fit to get you there.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors font-body"
            >
              Book Your Free Discovery Call ↗
            </Link>
          </div>
        </section>

      </div>

      <CTASection
        headline="Bring us a business problem. We'll bring the AI."
        subtext="Austin-based. Results-driven. Month-to-month retainers with no long-term contracts."
        buttonText="Book a strategy call"
      />
    </>
  );
}