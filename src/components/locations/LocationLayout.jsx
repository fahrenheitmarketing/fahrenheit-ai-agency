import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../shared/CTASection';

const ALL_LOCATIONS = [
  { name: "Austin (Hub)", path: "/digital-marketing-agency-austin-tx" },
  { name: "Round Rock", path: "/digital-marketing-agency-round-rock-tx" },
  { name: "Cedar Park", path: "/digital-marketing-agency-cedar-park-tx" },
  { name: "Georgetown", path: "/digital-marketing-agency-georgetown-tx" },
  { name: "Kyle & Buda", path: "/digital-marketing-agency-kyle-buda-tx" },
  { name: "Bastrop", path: "/digital-marketing-agency-bastrop-tx" },
];

const ALL_SERVICES = [
  { label: "SEO", to: "/services/seo" },
  { label: "Paid Search (PPC)", to: "/services/sem" },
  { label: "Social Media", to: "/services/smm" },
  { label: "CRO", to: "/services/cro" },
  { label: "Strategy", to: "/services/strategy" },
  { label: "Marketing Automation", to: "/services/marketing-automation" },
  { label: "Software Development", to: "/services/software-development" },
];

export default function LocationLayout({ schema, currentPath, children }) {
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
  }, [schema]);

  const otherLocations = ALL_LOCATIONS.filter(l => l.path !== currentPath);

  return (
    <>
      <div className="min-h-screen bg-background">
        {children}

        {/* Metro Area Links */}
        <section className="py-16 px-6 lg:px-10 border-b border-border bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">We Also Serve</p>
            <div className="flex flex-wrap gap-3">
              {otherLocations.map(loc => (
                <Link
                  key={loc.path}
                  to={loc.path}
                  className="text-xs font-body font-medium px-4 py-2 rounded-sm border border-border bg-background text-foreground/70 hover:border-accent hover:text-accent transition-colors"
                >
                  Digital Marketing Agency — {loc.name} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Services Quick Links */}
        <section className="py-16 px-6 lg:px-10 border-b border-border bg-foreground text-background">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-background/40 mb-8 font-body">Our Services</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {ALL_SERVICES.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="group flex flex-col gap-2 border border-background/10 rounded-sm p-4 hover:border-accent hover:bg-accent/10 transition-colors"
                >
                  <span className="text-sm font-body font-medium text-background/80 group-hover:text-accent transition-colors">{label}</span>
                  <span className="text-xs text-background/30 group-hover:text-accent/70 transition-colors">→</span>
                </Link>
              ))}
            </div>
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