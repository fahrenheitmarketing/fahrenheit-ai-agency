import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import useNoindex from '@/hooks/useNoindex';
import OfferCards from '@/components/cybermonday/OfferCards';
import CyberMondayForm from '@/components/cybermonday/CyberMondayForm';

const TITLE = 'Cyber Monday Offer | Fahrenheit Marketing';
const DESCRIPTION = 'Through December 4, get a free month of email marketing or managed hosting from Fahrenheit Marketing.';

export default function CyberMonday() {
  useNoindex(true);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = TITLE;
    let meta = document.head.querySelector('meta[name="description"]');
    const created = !meta;
    const prevDesc = meta ? meta.getAttribute('content') : null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', DESCRIPTION);
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.title = prevTitle;
      if (created) meta.remove();
      else meta.setAttribute('content', prevDesc || '');
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('claim-offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background">
      <section className="py-20 px-6 lg:px-10 border-b border-border bg-foreground text-background">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-6xl font-normal leading-[1.05] mb-6 text-background">
            Our Cyber Monday deal runs all week
          </h1>
          <p className="text-background/70 font-body text-lg leading-relaxed mb-8 max-w-2xl">
            Through December 4, new clients get a month on us for email marketing or managed hosting. Sign now, and you can start as late as January.
          </p>
          <a href="#claim-offer" onClick={scrollToForm} className="inline-flex items-center gap-2 bg-accent text-white text-sm font-body font-medium px-6 py-3 rounded-sm hover:bg-accent/90 active:scale-[0.97] transition-all shadow-sm">
            Claim the offer <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <OfferCards />
        </div>
      </section>

      <section id="claim-offer" className="py-20 px-6 lg:px-10 bg-foreground text-background scroll-mt-24">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-8 text-background">Claim your Cyber Monday offer</h2>
          <div className="bg-background text-foreground rounded-sm p-8 md:p-10">
            <CyberMondayForm />
          </div>
        </div>
      </section>

      <section className="py-8 px-6 lg:px-10">
        <p className="max-w-4xl mx-auto text-xs font-body text-muted-foreground leading-relaxed">
          Offer valid for new clients who sign between November 27 and December 4, 2026. Service can start as late as January 31, 2027. Hosting offer applies to Essential and Advanced Protection plans; the free month is applied to your second monthly invoice. Can't be combined with other offers.
        </p>
      </section>
    </div>
  );
}