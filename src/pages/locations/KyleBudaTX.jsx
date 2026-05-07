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
    "addressLocality": "Kyle",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "areaServed": ["Kyle", "Buda", "Austin", "San Marcos", "Wimberley", "Lockhart"],
  "foundingDate": "2008",
  "description": "Digital marketing agency serving Kyle and Buda, TX businesses with SEO, PPC, social media, and web development services."
};

const services = [
  { heading: "Local SEO & AI Search Visibility", body: "Kyle and Buda are booming, and so is the competition for local search visibility. We build SEO strategies that help you rank in both traditional search results and the AI-generated answers that customers increasingly rely on.", link: "/services/seo" },
  { heading: "Google Ads & Paid Search", body: "PPC campaigns managed to produce real results — not just impressions. We handle keyword research, bid management, ad copy, and conversion tracking for businesses across the I-35 South corridor.", link: "/services/sem" },
  { heading: "Social Media & Paid Social", body: "Organic and paid social campaigns across Meta, Instagram, LinkedIn, and more — built around the audiences your Kyle or Buda business actually needs to reach.", link: "/services/smm" },
  { heading: "Web Development & Conversion Optimization", body: "We build sites that are fast, mobile-ready, and built to convert — then optimize them continuously using data from real user behavior.", link: "/services/cro" },
  { heading: "Marketing Strategy & Growth Planning", body: "Before campaigns, we build strategy. We map your competitive landscape, identify the highest-value opportunities, and build a marketing plan designed to generate compounding returns.", link: "/services/strategy" },
];

export default function KyleBudaTX() {
  return (
    <LocationLayout schema={schema} currentPath="/digital-marketing-agency-kyle-buda-tx">
      {/* Hero */}
      <section className="relative py-20 px-6 lg:px-10 border-b border-border overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
            Digital Marketing Agency · Kyle & Buda, TX
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] max-w-4xl mb-8">
            Marketing Built for Kyle & Buda's Fast-Moving Business Community
          </h1>
          <div className="max-w-2xl space-y-4 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <p>
              The I-35 South corridor has transformed over the last decade. Kyle and Buda aren't bedroom communities anymore — they're full-blown economic hubs with retail, healthcare, professional services, and manufacturing all competing for the same customers.
            </p>
            <p>
              Fahrenheit Marketing has been helping businesses across Central Texas build digital marketing programs that actually work since 2008. We understand the south Austin corridor market and build campaigns around what your customers are doing online — right now.
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
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-4">What We Do for Kyle & Buda Businesses</h2>
            <p className="text-muted-foreground font-body text-base max-w-xl">
              Integrated services that generate measurable, sustainable growth.
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
              Experience You Can Actually Measure
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed">
              We've been in Austin and Central Texas long enough to watch the market evolve through multiple search algorithm shifts, the social media explosion, and now the AI search transition. That experience means we don't have to learn on your dime.
            </p>
          </div>
          <div className="space-y-0">
            {[
              "We work with businesses across healthcare, manufacturing, professional services, and local retail.",
              "No long-term contracts — month-to-month retainers with clear deliverables.",
              "Dedicated team with senior oversight — not junior account managers working from a playbook.",
              "AI-first workflows that improve efficiency and campaign performance without replacing strategic judgment.",
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
            Free discovery call for Kyle and Buda businesses. We'll talk through your current situation, your goals, and honestly assess whether we're the right fit.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors font-body">
            Book Your Free Discovery Call ↗
          </Link>
        </div>
      </section>
    </LocationLayout>
  );
}