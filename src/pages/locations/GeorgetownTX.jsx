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
    "addressLocality": "Georgetown",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "areaServed": ["Georgetown", "Round Rock", "Austin", "Taylor", "Hutto", "Jarrell"],
  "foundingDate": "2008",
  "description": "Digital marketing agency serving Georgetown, TX businesses with SEO, PPC, social media, and web development services."
};

const services = [
  { heading: "SEO — Local and Beyond", body: "Georgetown's population growth means more local competition online every year. We build SEO strategies that establish your authority in local search and in the AI-generated answers that are increasingly shaping how people find businesses.", link: "/services/seo" },
  { heading: "Paid Search Advertising", body: "Google Ads and Microsoft Ads campaigns built around what your Georgetown customers are actually searching for — managed to produce qualified leads, not just clicks.", link: "/services/sem" },
  { heading: "Social Media Marketing", body: "Paid and organic social campaigns that reach the right audiences — whether you're a local service business, a healthcare provider, or a B2B company targeting the corridor between Georgetown and Austin.", link: "/services/smm" },
  { heading: "Website Development & CRO", body: "We design and build websites that perform — fast, mobile-friendly, and optimized to convert visitors into customers. And we don't stop at launch.", link: "/services/cro" },
  { heading: "Digital Strategy & Planning", body: "Growth doesn't happen by accident. We help Georgetown businesses build data-driven marketing strategies that connect every channel to measurable business outcomes.", link: "/services/strategy" },
];

export default function GeorgetownTX() {
  return (
    <LocationLayout schema={schema} currentPath="/digital-marketing-agency-georgetown-tx">
      {/* Hero */}
      <section className="relative py-20 px-6 lg:px-10 border-b border-border overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
            Digital Marketing Agency · Georgetown, TX
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] max-w-4xl mb-8">
            Georgetown Is Growing Fast. Your Marketing Should Too.
          </h1>
          <div className="max-w-2xl space-y-4 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <p>
              Georgetown has been one of the fastest-growing cities in the US for several years running. That growth creates real opportunity for local businesses — but it also brings more competition. Standing out online takes a more deliberate approach than it did even a few years ago.
            </p>
            <p>
              Fahrenheit Marketing has been helping Central Texas businesses navigate digital marketing since 2008. We know this market, we understand how search works right now (including AI-driven search), and we build campaigns that generate real revenue — not just traffic numbers.
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
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-4">What We Do for Georgetown Businesses</h2>
            <p className="text-muted-foreground font-body text-base max-w-xl">
              Integrated digital marketing services connected by one goal: sustainable, measurable growth.
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
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Why Fahrenheit</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6">
              Built for How Business Actually Works in Central Texas
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed">
              Georgetown isn't a one-size-fits-all market. We work with healthcare groups, professional services firms, B2B companies, and local service businesses across the I-35 corridor — each with different competitive landscapes and different customer journeys. That's why we build strategy before we build campaigns.
            </p>
          </div>
          <div className="space-y-0">
            {[
              "Healthcare and dental groups scaling to multiple locations across Williamson County.",
              "Professional services firms building authority and inbound lead pipelines through search.",
              "Local service businesses outranking national franchises in the local map pack.",
              "eCommerce brands driving revenue through integrated SEO and paid media strategies.",
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
            Free discovery call for Georgetown-area businesses. We'll talk through your goals, your market, and what a realistic path forward looks like. No pressure, no pitch deck.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors font-body">
            Book Your Free Discovery Call ↗
          </Link>
        </div>
      </section>
    </LocationLayout>
  );
}