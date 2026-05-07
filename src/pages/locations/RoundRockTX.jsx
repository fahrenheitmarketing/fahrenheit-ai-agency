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
    "addressLocality": "Round Rock",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "areaServed": ["Round Rock", "Austin", "Pflugerville", "Hutto", "Taylor"],
  "foundingDate": "2008",
  "description": "Digital marketing agency serving Round Rock, TX businesses with SEO, PPC, social media, and web development services."
};

const services = [
  { heading: "Local & National SEO", body: "Round Rock's market is competitive — you're not just competing with local businesses, you're up against Austin brands with larger budgets. We build SEO strategies that help you rank in your own backyard and outperform bigger players in search.", link: "/services/seo" },
  { heading: "Paid Search (Google & Microsoft Ads)", body: "We manage PPC campaigns built around what actually converts for Round Rock businesses — from HVAC and healthcare to B2B and professional services. No wasted spend, no vanity metrics.", link: "/services/sem" },
  { heading: "Social Media & Paid Social", body: "Whether you're targeting local consumers or B2B decision-makers, we run paid and organic social campaigns that build your presence and generate real leads.", link: "/services/smm" },
  { heading: "Website Development & Conversion Optimization", body: "A fast, well-built website is table stakes. We build and optimize sites designed to turn Round Rock visitors into customers — with A/B testing and data-backed CRO built in.", link: "/services/cro" },
  { heading: "Marketing Strategy & Analytics", body: "From market research to channel planning to attribution modeling, we build the strategic foundation your marketing needs to grow predictably.", link: "/services/strategy" },
];

export default function RoundRockTX() {
  return (
    <LocationLayout schema={schema} currentPath="/digital-marketing-agency-round-rock-tx">
      {/* Hero */}
      <section className="relative py-20 px-6 lg:px-10 border-b border-border overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
            Digital Marketing Agency · Round Rock, TX
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] max-w-4xl mb-8">
            Digital Marketing for Round Rock Businesses — Without the Austin Price Tag
          </h1>
          <div className="max-w-2xl space-y-4 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <p>
              Round Rock has grown up. What was once a suburb defined by the IKEA on the 35 is now one of the most economically active corridors in Central Texas — with a business community that demands marketing that keeps pace.
            </p>
            <p>
              Fahrenheit Marketing is an Austin-based digital agency that's been working with Central Texas businesses since 2008. We bring the same strategies we use for national brands to Round Rock companies that are ready to grow.
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
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-4">What We Do for Round Rock Businesses</h2>
            <p className="text-muted-foreground font-body text-base max-w-xl">
              A connected set of services focused on one thing: turning online visibility into real business growth.
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
              We Know the Central Texas Market
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed">
              Round Rock businesses compete with Austin brands for the same customers. That requires a marketing partner who understands both the local dynamics and the broader Central Texas competitive landscape — not a generic national agency with a templated approach.
            </p>
          </div>
          <div className="space-y-0">
            {[
              "Month-to-month retainers — no long-term contracts locking you into a relationship that isn't working.",
              "Real-time reporting dashboards so you always know where your budget is going and what it's producing.",
              "A dedicated team, not a rotation of junior account managers.",
              "AI-integrated workflows that improve efficiency without replacing the human judgment that drives strategy.",
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
            We offer a free discovery call for Round Rock businesses — no pitch, no pressure. Just an honest conversation about your goals and whether we're the right fit.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors font-body">
            Book Your Free Discovery Call ↗
          </Link>
        </div>
      </section>
    </LocationLayout>
  );
}