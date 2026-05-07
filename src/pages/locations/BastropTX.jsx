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
    "addressLocality": "Bastrop",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "areaServed": ["Bastrop", "Smithville", "Elgin", "Lockhart", "Austin"],
  "foundingDate": "2008",
  "description": "Digital marketing agency serving Bastrop, TX businesses with SEO, PPC, social media, and web development services."
};

const services = [
  { heading: "SEO — Local Visibility That Compounds", body: "Bastrop is getting discovered — by new residents, by tourists, and by investors. We help local businesses show up at the right moment in both traditional search and the AI-generated answers that are reshaping how people find services.", link: "/services/seo" },
  { heading: "Paid Search (Google Ads)", body: "Targeted PPC campaigns that reach customers in Bastrop and the surrounding Hill Country corridor — managed to produce qualified leads and trackable revenue, not just clicks.", link: "/services/sem" },
  { heading: "Social Media Marketing", body: "Paid and organic social campaigns designed for the Bastrop market — whether you're a local restaurant, a service business, or a company targeting the broader Lost Pines region.", link: "/services/smm" },
  { heading: "Web Development & Conversion Optimization", body: "We build sites that work hard — fast, mobile-friendly, and optimized to turn visitors into customers. CRO is baked in from the start, not added later.", link: "/services/cro" },
  { heading: "Strategy, Analytics & Growth Planning", body: "We help Bastrop businesses build marketing strategies that are grounded in data — not guesswork. That means knowing which channels to invest in, which to avoid, and how to track what's actually working.", link: "/services/strategy" },
];

export default function BastropTX() {
  return (
    <LocationLayout schema={schema} currentPath="/digital-marketing-agency-bastrop-tx">
      {/* Hero */}
      <section className="relative py-20 px-6 lg:px-10 border-b border-border overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
            Digital Marketing Agency · Bastrop, TX
          </p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] max-w-4xl mb-8">
            Bastrop Is on the Map. Let's Make Sure Your Business Is Too.
          </h1>
          <div className="max-w-2xl space-y-4 text-muted-foreground font-body text-base md:text-lg leading-relaxed">
            <p>
              Bastrop's reputation has changed. The Lost Pines region is attracting new residents, new businesses, and new attention — and that creates real opportunity for local companies ready to compete online. But Bastrop businesses are no longer just competing with each other. They're competing with Austin brands that have bigger budgets and longer digital track records.
            </p>
            <p>
              Fahrenheit Marketing is an Austin-based digital agency that's been working with Central Texas businesses since 2008. We bring the same sophisticated strategies we use for major brands to Bastrop businesses ready to grow.
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
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-4">What We Do for Bastrop Businesses</h2>
            <p className="text-muted-foreground font-body text-base max-w-xl">
              A connected set of services designed to grow your visibility, leads, and revenue.
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
              Big-Market Expertise, Right-Sized for Your Business
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed">
              Bastrop businesses deserve the same quality of marketing strategy as companies in Austin or Houston — and that's exactly what we deliver. We work with clients at every size level, from local service businesses to multi-location brands, and we bring the same rigor to every engagement.
            </p>
          </div>
          <div className="space-y-0">
            {[
              "Over 15 years working in the Central Texas market — we understand how this region's customers search and buy.",
              "Month-to-month retainers with no lock-in — stay because the results justify it.",
              "Transparent reporting with real metrics, not vanity numbers.",
              "AI-enhanced workflows that improve the speed and precision of every campaign we run.",
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
            Free discovery call for Bastrop businesses. We'll give you an honest assessment of your current digital presence and what it would take to outperform your competitors online.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors font-body">
            Book Your Free Discovery Call ↗
          </Link>
        </div>
      </section>
    </LocationLayout>
  );
}