import React from 'react';
import { Link } from 'react-router-dom';
import LocationLayout from '../../components/locations/LocationLayout';

const schema = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  "name": "Fahrenheit Marketing",
  "url": "https://www.fahrenheitmarketing.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cedar Park",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "areaServed": ["Cedar Park", "Leander", "Liberty Hill", "Austin", "Round Rock"],
  "foundingDate": "2008",
  "description": "Digital marketing agency serving Cedar Park, TX businesses with SEO, PPC, social media, and web development services."
};

const services = [
  { heading: "SEO & AI Search Optimization", body: "Cedar Park businesses need to be found — in traditional search and increasingly in AI-generated answers from tools like Google's AI Overviews and ChatGPT. We build strategies that cover both.", link: "/services/seo" },
  { heading: "Google & Microsoft Ads (PPC)", body: "Paid search campaigns managed around real outcomes — qualified leads and revenue — not impressions. We handle everything from keyword strategy to bid management to conversion tracking.", link: "/services/sem" },
  { heading: "Social Media Marketing", body: "Paid and organic social across Meta, LinkedIn, and beyond — built around the audiences and outcomes that matter to Cedar Park businesses.", link: "/services/smm" },
  { heading: "Conversion Rate Optimization", body: "Getting traffic to your site is only half the battle. We optimize the experience so more of that traffic becomes customers — using data, not gut feel.", link: "/services/cro" },
  { heading: "Content & Growth Strategy", body: "From competitive analysis to editorial calendars to channel strategy, we build the marketing infrastructure Cedar Park businesses need to grow consistently.", link: "/services/strategy" },
];

export default function CedarParkTX() {
  return (
    <LocationLayout schema={schema} currentPath="/digital-marketing-agency-cedar-park-tx">
      {/* Hero */}
      <section className="relative py-20 px-6 lg:px-10 border-b border-border overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
            Digital Marketing Agency · Cedar Park, TX
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] max-w-4xl mb-8">
            Cedar Park's Digital Marketing Partner — Real Strategy, Real Results
          </h1>
          <div className="max-w-2xl space-y-4 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <p>
              Cedar Park has grown into one of the most desirable communities in the Austin metro — and with that growth comes a business environment that's more competitive than ever. Getting found online takes more than a basic website and a Facebook page.
            </p>
            <p>
              Fahrenheit Marketing brings over 15 years of digital marketing experience to Cedar Park businesses ready to compete seriously for visibility, leads, and revenue. We're headquartered in Austin and deeply familiar with the Northwest Austin corridor market.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "SEO Services", to: "/services/seo" },
              { label: "Paid Search", to: "/services/sem" },
              { label: "Social Media", to: "/services/smm" },
              { label: "CRO", to: "/services/cro" },
              { label: "Strategy", to: "/services/strategy" },
              { label: "Marketing Automation", to: "/services/marketing-automation" },
              { label: "Software Development", to: "/services/software-development" },
            ].map(({ label, to }) => (
              <Link key={to} to={to} className="text-xs font-body font-medium px-4 py-2 rounded-sm border border-accent/40 text-accent hover:bg-accent hover:text-white transition-colors">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Services</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-4">What We Do for Cedar Park Businesses</h2>
            <p className="text-muted-foreground font-body text-base max-w-xl">
              A connected stack of services built to generate measurable growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {services.map((s, i) => (
              <Link key={i} to={s.link} className="group border-t border-border py-8 px-6 hover:bg-secondary/30 transition-colors">
                <h3 className="font-heading text-xl font-normal mb-3 group-hover:text-accent transition-colors">{s.heading}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.body}</p>
                <span className="inline-block mt-4 text-xs font-body text-accent opacity-0 group-hover:opacity-100 transition-opacity">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-6 lg:px-10 border-b border-border bg-card/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Our Approach</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6">
              No Templates. No Guesswork.
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed">
              Every Cedar Park business is different. We don't plug your company into a pre-built campaign template — we build strategy around your market, your competitors, and your growth goals. That's what being a strategic marketing partner actually means.
            </p>
          </div>
          <div className="space-y-0">
            {[
              "We've been doing this since 2008 — through algorithm changes, platform shifts, and now the AI search revolution.",
              "AI-integrated workflows that improve speed and precision without sacrificing strategic oversight.",
              "Transparent reporting so you can see exactly what's working and what needs adjusting.",
              "Month-to-month flexibility — stay because the results justify it, not because you're locked in.",
            ].map((item, i) => (
              <div key={i} className="border-t border-border py-6 flex gap-4">
                <span className="text-accent font-heading text-lg mt-0.5">—</span>
                <p className="text-sm font-body leading-relaxed text-foreground/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Get Started</p>
          <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6">Ready to Grow? Let's Talk.</h2>
          <p className="text-muted-foreground font-body text-base leading-relaxed mb-8">
            We offer a free discovery call for Cedar Park businesses — no pitch, no pressure. Just a straight conversation about where you are and what it would take to get where you want to be.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors font-body">
            Book Your Free Discovery Call ↗
          </Link>
        </div>
      </section>
    </LocationLayout>
  );
}