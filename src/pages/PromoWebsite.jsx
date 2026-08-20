import React, { useState, useEffect } from 'react';
import { CheckCircle, Zap, ArrowRight } from 'lucide-react';
import RequestCaseStudyModal from '@/components/case-studies/RequestCaseStudyModal';
import WebsiteLeadForm from '@/components/promo/WebsiteLeadForm';
import PortfolioGrid from '@/components/promo/PortfolioGrid';
import CaseStudiesGrid from '@/components/promo/CaseStudiesGrid';

const caseStudies = [
  { id: 1, category: 'Web Development', title: 'Northern Reflections - BigCommerce Redesign', tagline: 'Enterprise-grade responsive eCommerce platform for 133-location fashion retailer', description: 'Complete BigCommerce platform overhaul with responsive design, accessibility compliance (WCAG 2.1), and seamless integrations.', metrics: [{ label: 'Store Locations', value: '133' }, { label: 'Accessibility', value: 'WCAG 2.1' }, { label: 'Theme', value: 'Custom Built' }] },
  { id: 2, category: 'Local SEO', title: 'Multi-Location Acute Care Network', tagline: '+833% organic query growth across 9 locations', description: 'Texas healthcare provider transforms from invisible to in-demand through systematic location optimization and health content strategy.', metrics: [{ label: 'Non-Branded Impressions', value: '+273%' }, { label: 'Query Footprint', value: '+833%' }, { label: 'Non-Branded Clicks', value: '+270%' }] },
  { id: 3, category: 'Local SEO', title: 'Professional Cleaning Services', tagline: '1,874% increase in local search visibility', description: 'Commercial cleaning company transforms from sparse digital presence to top local rankings through GBP optimization and content strategy.', metrics: [{ label: 'Maps Impressions', value: '+2,179%' }, { label: 'Search Impressions', value: '+207%' }, { label: 'Business Contacts', value: '+205%' }] },
];

const websiteOffer = {
  price: 'From $5,000', period: 'flat rate',
  description: 'A fully redesigned website — up to 50 pages — including all content, copywriting, and SEO optimization. One fixed price, no surprises.',
  value: 'Most agencies charge $10,000–$50,000 for a project of this scope. We leverage AI-assisted content production and our proven design process to deliver a professionally redesigned site at a fraction of the typical cost — without cutting corners on strategy or quality.',
  features: [
    'Up to 50 pages fully redesigned — every page rebuilt with a clear purpose and conversion goal',
    'Full content and copywriting included — SEO-optimized copy written for your audience and search intent',
    'Mobile-first, performance-optimized build — fast, accessible, and built to rank',
    'On-page SEO implementation — metadata, schema, internal linking, and URL architecture',
    'Conversion-focused design — layouts engineered to turn visitors into leads',
    'Content strategy and site architecture — we plan the structure before a single page is written',
    'QA, launch support, and handoff documentation',
  ],
  disclaimer: '* Special features and custom functionality (e.g., integrations, custom web applications, e-commerce, membership portals) may require additional investment. Scope and pricing for any additions will be agreed upon in writing before work begins.',
};

const projects = [
  { name: 'Briaud Financial', url: 'https://briaudfinal.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/f32b50479_briaud.png', industry: 'Financial Advisory' },
  { name: 'Blackridge', url: 'https://blackridge.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/b666f575b_blackridge.png', industry: 'Government Affairs' },
  { name: 'Concierge Pediatrics', url: 'https://conciergecare.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/f760fc864_concierge.png', industry: 'Healthcare' },
  { name: 'Greenspoint Dental', url: 'https://greenspoint.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/fd14ca806_greens.png', industry: 'Dental' },
  { name: 'ZOMMA Group', url: 'https://zomma-group.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/30f79e425_zomma.png', industry: 'Accounting' },
  { name: 'Brent Coon & Assoc.', url: 'https://bcoon.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5a8f48e31_bcoon.png', industry: 'Legal' },
  { name: 'MacLeod & Co.', url: 'https://mcleod.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/d29162b19_macleod.png', industry: 'Commercial Real Estate' },
  { name: 'Austin Wealth', url: 'https://austinwealth.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/73368fac8_Austinwealth.png', industry: 'Wealth Management' },
  { name: 'Spring Systems', url: 'https://springstream.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/c6634d67c_Springstream.png', industry: 'B2B SaaS' },
  { name: 'Golden Hour Café', url: 'https://goldenhour.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/78d382475_Goldenhour.png', industry: 'Hospitality' },
  { name: 'Cuono Engineering', url: 'https://cuono.fmkt.agency/', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/3d026b4a4_cuono.png', industry: 'Structural Engineering' },
  { name: 'TeamLogic IT', url: 'https://teamlogic.fmkt.agency/', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/560e50224_teamlogic.png', industry: 'Managed IT Services' },
  { name: 'RTM Imports', url: 'https://rtm-imports.fmkt.agency/', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/c5f258ac2_rtm.png', industry: 'Beverage Imports' },
  { name: 'WestLoop Law', url: 'https://westlaw.fmkt.agency/', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/2b8320c61_westlaw.png', industry: 'Personal Injury Law' },
  { name: 'M2R Law', url: 'https://mr2.fmkt.agency/', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/c7a70a59d_m2rlaw.png', industry: 'Civil Litigation' },
];

export default function PromoWebsite() {
  const [selectedStudy, setSelectedStudy] = useState(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = ''; };
  }, []);

  const scrollToForm = (e) => {
    e.preventDefault();
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {selectedStudy && <RequestCaseStudyModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />}
      <div className="min-h-screen bg-background">

        {/* Hero */}
        <section className="relative py-20 px-6 lg:px-10 border-b border-border overflow-hidden bg-foreground text-background">
          <img src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png" alt="" aria-hidden="true" className="absolute top-0 right-0 w-[500px] pointer-events-none opacity-10 select-none" />
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <a href="#contact-form" onClick={scrollToForm} className="inline-flex items-center gap-2 bg-accent text-white text-xs font-body font-semibold uppercase tracking-widest px-4 py-2 rounded-sm mb-8 cursor-pointer hover:bg-accent/90 transition-colors">
                  <Zap className="w-3.5 h-3.5" /> Limited-Time Offer · Fixed Price
                </a>
                <h1 className="font-heading text-5xl md:text-6xl font-normal leading-[1.05] mb-6 text-background">
                  A Professionally Redesigned Website. One Flat Price.
                </h1>
                <p className="text-background/70 font-body text-lg leading-relaxed mb-8">
                  Up to 50 pages, fully redesigned — content, copywriting, and SEO all included. No scope creep, no surprises. From <strong className="text-background">$5,000</strong>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#contact-form" onClick={scrollToForm} className="inline-flex items-center gap-2 bg-accent text-white text-sm font-body font-medium px-6 py-3 rounded-sm hover:bg-accent/90 active:scale-[0.97] transition-all shadow-sm">
                    Claim This Offer <ArrowRight className="w-4 h-4" />
                  </a>
                  <a href="#our-work" onClick={(e) => { e.preventDefault(); document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 border border-background/20 text-background/70 text-sm font-body font-medium px-6 py-3 rounded-sm hover:border-background/50 hover:text-background active:scale-[0.97] transition-all">
                    See Our Work ↓
                  </a>
                </div>
              </div>
              <div className="bg-background rounded-sm p-6 md:p-8">
                <WebsiteLeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="py-20 px-6 lg:px-10 border-b border-border bg-card/40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Why This Offer Works</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1]">Agency quality, without the agency price tag.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border rounded-sm overflow-hidden">
              {[
                { number: '01', title: 'Fixed Price, No Surprises', body: 'Most agencies quote $10,000–$50,000 for a full redesign. We deliver the same quality — up to 50 pages — from $5,000. The price you see is the price you pay.' },
                { number: '02', title: 'Content & SEO Included', body: "No separate copywriting invoice. Every page comes with SEO-optimized content written for your audience and search intent — ready to publish." },
                { number: '03', title: 'Built to Convert', body: 'Every layout is engineered around a clear conversion goal, not just aesthetics — mobile-first, fast, and structured to turn visitors into leads.' },
              ].map((item, i) => (
                <div key={item.number} className={`p-10 bg-background ${i < 2 ? 'border-b md:border-b-0 md:border-r border-border' : ''}`}>
                  <span className="font-heading text-5xl font-normal text-border mb-6 block">{item.number}</span>
                  <h3 className="font-heading text-xl font-normal mb-4">{item.title}</h3>
                  <p className="text-sm font-body text-muted-foreground leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offer Details */}
        <section className="py-20 px-6 lg:px-10 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">The Offer</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-3">Everything You Need, One Price</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border rounded-sm overflow-hidden">
              <div className="p-10 bg-background border-b lg:border-b-0 lg:border-r border-border">
                <div className="mb-6">
                  <span className="font-heading text-6xl font-normal text-foreground">{websiteOffer.price}</span>
                  <span className="text-sm font-body text-muted-foreground ml-2">{websiteOffer.period}</span>
                </div>
                <p className="text-base font-body text-muted-foreground leading-relaxed mb-8">{websiteOffer.description}</p>
                <div className="bg-secondary/60 rounded-sm p-6 mb-8">
                  <strong className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Why it's priced this way</strong>
                  <p className="text-sm font-body text-foreground/70 leading-relaxed">{websiteOffer.value}</p>
                </div>
                <p className="text-xs font-body text-muted-foreground leading-relaxed italic">{websiteOffer.disclaimer}</p>
              </div>
              <div className="p-10 bg-background">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8 font-body">What's included</p>
                <div className="space-y-4">
                  {websiteOffer.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                      <span className="text-sm font-body text-foreground/80 leading-snug">{f}</span>
                    </div>
                  ))}
                </div>
                <a href="#contact-form" onClick={scrollToForm} className="mt-10 inline-flex items-center gap-2 bg-accent text-white text-sm font-body font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors">
                  Claim This Offer <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="our-work" className="py-20 px-6 lg:px-10 border-b border-border bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Our Portfolio</p>
                <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1]">Sites We've Built</h2>
              </div>
              <p className="text-muted-foreground font-body text-sm max-w-sm leading-relaxed">From financial advisors to trial law firms and restaurants — each site engineered to convert visitors into clients.</p>
            </div>
            <PortfolioGrid projects={projects} />
            <p className="mt-6 text-xs text-muted-foreground font-body text-center">Click any thumbnail to view the live site →</p>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-6 lg:px-10 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Proof of Work</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-3">Real Results. Real Clients.</h2>
              <p className="text-muted-foreground font-body text-base max-w-xl">From enterprise retail to local service businesses — sites built to perform, not just look good.</p>
            </div>
            <CaseStudiesGrid studies={caseStudies} onSelect={setSelectedStudy} />
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 px-6 lg:px-10 bg-foreground text-background">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-background/40 mb-4 font-body">Get Started Today</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6 text-background">Ready for a Website That Works? Let's Talk.</h2>
              <p className="text-background/60 font-body text-base leading-relaxed mb-10">Fill out the form and a member of our team will reach out within one business day to scope your redesign.</p>
              <div className="space-y-5">
                {[
                  { title: 'Fixed price', body: 'No surprise invoices — the quote is the price' },
                  { title: 'Content included', body: 'SEO copywriting for every page, done for you' },
                  { title: 'Built to convert', body: 'Every page designed around a conversion goal' },
                  { title: 'Response within 24 hours', body: 'A real human, not an auto-responder' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-body font-semibold text-background">{item.title} — </span>
                      <span className="text-sm font-body text-background/60">{item.body}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div id="contact-form" className="bg-background rounded-sm p-10">
              <WebsiteLeadForm />
            </div>
          </div>
        </section>
      </div>

      <a href="#contact-form" onClick={scrollToForm} className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 active:scale-[0.98] transition-transform">
        <span className="flex items-center justify-center gap-2 bg-accent text-white text-sm font-body font-medium px-6 py-3.5 rounded-sm w-full">
          Claim This Offer <ArrowRight className="w-4 h-4" />
        </span>
      </a>
    </>
  );
}