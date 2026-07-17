import React, { useState, useEffect } from 'react';
import { CheckCircle, Zap, Shield, Calendar, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RequestCaseStudyModal from '../components/case-studies/RequestCaseStudyModal';
import QuickLeadForm from '../components/promo/QuickLeadForm';
import PromoContactForm from '../components/promo/PromoContactForm';

const allCaseStudies = [
  { id: 1, category: 'Local SEO', title: 'Professional Cleaning Services', tagline: '1,874% increase in local search visibility', description: 'Commercial cleaning company transforms from sparse digital presence to top local rankings through GBP optimization and content strategy.', metrics: [{ label: 'Maps Impressions', value: '+2,179%' }, { label: 'Search Impressions', value: '+207%' }, { label: 'Business Contacts', value: '+205%' }] },
  { id: 2, category: 'Local SEO', title: 'Single Practitioner Dental Office', tagline: '40+ new patients per month through local SEO', description: 'Urban dental practice facing post-pandemic decline rebuilds patient acquisition with AI-driven Local SEO and GBP strategy.', metrics: [{ label: 'Maps Visibility', value: '+76%' }, { label: 'Search Visibility', value: '+53.5%' }, { label: 'New Patients/Month', value: '40+' }] },
  { id: 3, category: 'Local SEO', title: 'Multi-Location Acute Care Network', tagline: '+833% organic query growth across 9 locations', description: 'Texas healthcare provider transforms from invisible to in-demand through systematic location optimization and health content strategy.', metrics: [{ label: 'Non-Branded Impressions', value: '+273%' }, { label: 'Query Footprint', value: '+833%' }, { label: 'Non-Branded Clicks', value: '+270%' }] },
  { id: 4, category: 'Paid Advertising', title: 'Done-In-One Dental Implants', tagline: '175 TikTok leads in 90 days, 48% monthly growth', description: 'High-ticket dental implant center generates qualified leads through targeted TikTok creative, significantly outperforming Meta.', metrics: [{ label: 'TikTok Leads (90 days)', value: '175' }, { label: 'Peak Month Conversion', value: '$40.36 CPC' }, { label: 'Monthly Growth', value: '48%' }] },
  { id: 5, category: 'Paid Advertising', title: 'Temecula Facial & Oral Surgery', tagline: '59 leads, 24 appointments from TikTok ads', description: 'Targeted TikTok campaign reaches older demographic with testimonial-based creative, delivering qualified appointments efficiently.', metrics: [{ label: 'TikTok Impressions', value: '200k' }, { label: 'Cost per Appointment', value: '$172' }, { label: 'Campaign Leads', value: '59' }] },
  { id: 6, category: 'Paid Advertising', title: 'Healthy Pet - Pet Supply Store', tagline: '568% ROAS on Google Shopping in 90 days', description: 'Local pet supply chain drives online sales with optimized Google Shopping and Meta campaigns, dramatically improving conversion efficiency.', metrics: [{ label: 'ROAS', value: '568%' }, { label: 'Cost per Conversion', value: '$1.38' }, { label: 'Conversion Value', value: '$28,200' }] },
  { id: 7, category: 'Web Development', title: 'Northern Reflections - BigCommerce Redesign', tagline: 'Enterprise-grade responsive eCommerce platform for 133-location fashion retailer', description: 'Complete BigCommerce platform overhaul with responsive design, accessibility compliance (WCAG 2.1), and seamless integrations.', metrics: [{ label: 'Store Locations', value: '133' }, { label: 'Accessibility', value: 'WCAG 2.1' }, { label: 'Theme', value: 'Custom Built' }] },
];

const tiers = [
  {
    name: 'Growth',
    price: '$1,500',
    hasFrom: true,
    period: '/month',
    description: 'Ideal for startups and small businesses ready to build a strong digital foundation with AI-powered marketing.',
    value: 'Get enterprise-grade AI tooling and strategy without the enterprise price tag. We do the heavy lifting so you can focus on running your business.',
    features: [
      'AI Content Strategy – Data-driven content that attracts and converts.',
      'Online Presence – Blogs, social, and content that build authority.',
      'Monthly Insights – Actionable data and performance reporting.',
      'AI Competitive Analysis – Stay ahead with market intelligence.',
      'Dedicated Account Manager – One trusted partner for every initiative.',
      'Monthly Performance Reviews – Optimize strategy with measurable results.',
    ],
  },
  {
    name: 'Scale',
    price: '$3,500',
    hasFrom: true,
    period: '/month',
    popular: true,
    description: 'Comprehensive digital transformation and dedicated AI infrastructure. Two retainer paths — support or strategy — both backed by our senior multidisciplinary team.',
    value: 'One price, two ways to work with us. Some businesses need a trusted partner to execute ongoing requests. Others need an outsourced marketing department building and running the plan. Both paths get the same senior team.',
    subBlocks: [
      {
        title: 'Support Retainer',
        description: 'For businesses that already have a strategy in place and need a trusted partner to execute ongoing requests.',
        features: [
          'Website Updates & Design – Ongoing site enhancements, landing pages, and creative requests.',
          'Technical & Development Support – Troubleshooting, WordPress maintenance, and fixes.',
          'SEO & Reporting – Ongoing improvements with analytics and reporting.',
        ],
      },
      {
        title: 'Strategic Marketing Retainer',
        description: 'An outsourced marketing department — not just added production capacity.',
        features: [
          'Strategic Roadmap – A comprehensive marketing strategy built around your goals.',
          'Full Execution – Your plan run and optimized across every channel.',
          'Quarterly Reviews – Performance measured and strategy refined every quarter.',
        ],
      },
    ],
    sharedFeatures: [
      'Dedicated Account Manager – One trusted partner for every initiative.',
      'Predictable Growth – Scalable marketing with measurable results.',
    ],
  },
];

const websiteOffer = {
  price: 'From $5,000',
  period: 'flat rate',
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
  disclaimer: '* Special features and custom functionality (e.g., integrations, custom web applications, e-commerce, membership portals) may require additional investment.',
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

export default function PromoAlt() {
  const [selectedStudy, setSelectedStudy] = useState(null);

  // Smooth-scroll anchor links for the hero "click traps"
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

        {/* Hero — tight, punchy, with CTA above the fold */}
        <section className="relative py-20 px-6 lg:px-10 border-b border-border overflow-hidden bg-foreground text-background">
          <img
            src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
            alt="" aria-hidden="true"
            className="absolute top-0 right-0 w-[500px] pointer-events-none opacity-10 select-none"
          />
          <div className="relative max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <a href="#contact-form" onClick={scrollToForm} className="inline-flex items-center gap-2 bg-accent text-white text-xs font-body font-semibold uppercase tracking-widest px-4 py-2 rounded-sm mb-8 cursor-pointer hover:bg-accent/90 transition-colors">
                  <Zap className="w-3.5 h-3.5" /> Limited-Time Offer · Austin, TX · Since 2008
                </a>
                <a href="#contact-form" onClick={scrollToForm} className="block cursor-pointer group">
                  <h1 className="font-heading text-5xl md:text-6xl font-normal leading-[1.05] mb-6 text-background group-hover:text-accent transition-colors">
                    Agentic Marketing. Real Results.
                  </h1>
                </a>
                <p className="text-background/70 font-body text-lg leading-relaxed mb-8">
                  AI-powered marketing programs and a complete website redesign — transparent pricing, no long-term contracts. Month-to-month retainers from <strong className="text-background">$1,500</strong>. Full website redesign from <strong className="text-background">$5,000</strong>.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#contact-form"
                    onClick={scrollToForm}
                    className="inline-flex items-center gap-2 bg-accent text-white text-sm font-body font-medium px-6 py-3 rounded-sm hover:bg-accent/90 active:scale-[0.97] transition-all shadow-sm"
                  >
                    Get a Free Consultation <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#our-work"
                    onClick={(e) => { e.preventDefault(); document.getElementById('our-work')?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="inline-flex items-center gap-2 border border-background/20 text-background/70 text-sm font-body font-medium px-6 py-3 rounded-sm hover:border-background/50 hover:text-background active:scale-[0.97] transition-all"
                  >
                    See Our Work ↓
                  </a>
                </div>
                <a
                  href="#retainer-tiers"
                  onClick={(e) => { e.preventDefault(); document.getElementById('retainer-tiers')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="inline-flex items-center gap-1 text-sm font-body text-background/60 hover:text-accent transition-colors mt-3"
                >
                  See pricing from $1,500/mo <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
              {/* Contact form — above the fold so mobile visitors can act immediately */}
              <div className="bg-background rounded-sm p-6 md:p-8 [&_select_option]:text-foreground">
                <PromoContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Why us — three core proof points */}
        <section className="py-20 px-6 lg:px-10 border-b border-border bg-card/40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center max-w-2xl mx-auto">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Why Fahrenheit</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1]">We've been doing this since 2008 — before AI was a buzzword.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border rounded-sm overflow-hidden">
              {[
                {
                  number: '01',
                  title: 'AI-First, Not AI-Washed',
                  body: 'We integrate AI where it genuinely improves results — content production, competitive analysis, audience segmentation — while keeping the human strategy that actually moves the needle.',
                },
                {
                  number: '02',
                  title: 'No Contracts. No BS.',
                  body: 'Month-to-month retainers only. We earn your business every single month. If we\'re not delivering, you\'re not stuck. That\'s the only accountability model that makes sense.',
                },
                {
                  number: '03',
                  title: 'Fixed-Price Website Redesigns',
                  body: 'Most agencies quote $10,000–$50,000 for a full redesign. We deliver the same quality — up to 50 pages, content included — from $5,000. No scope creep. No surprises.',
                },
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

        {/* Retainer Tiers */}
        <section id="retainer-tiers" className="py-20 px-6 lg:px-10 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Monthly Retainer Programs</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-3">Choose Your Growth Level</h2>
              <p className="text-muted-foreground font-body text-base max-w-xl">
                All plans include AI-powered tools, a dedicated account manager, and the flexibility to cancel anytime.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border rounded-sm overflow-hidden">
              {tiers.map((tier, i) => (
                <div
                  key={tier.name}
                  className={`flex flex-col p-10 ${tier.popular ? 'bg-foreground text-background' : 'bg-background'} ${i < tiers.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-border' : ''}`}
                >
                  {tier.popular && (
                    <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest bg-accent text-white px-3 py-1 rounded-sm mb-6 w-fit">
                      Most Popular
                    </span>
                  )}
                  <p className={`text-xs uppercase tracking-widest mb-3 font-body ${tier.popular ? 'text-background/40' : 'text-muted-foreground'}`}>{tier.name}</p>
                  <a href="#contact-form" onClick={scrollToForm} className="block mb-2 cursor-pointer group/price">
                    <span className="flex items-baseline gap-1.5">
                      {tier.hasFrom && (
                        <span className={`text-sm font-body transition-colors ${tier.popular ? 'text-background/50 group-hover/price:text-accent' : 'text-muted-foreground group-hover/price:text-accent'}`}>From</span>
                      )}
                      <span className={`font-heading text-5xl font-normal transition-colors ${tier.popular ? 'text-background group-hover/price:text-accent' : 'text-foreground group-hover/price:text-accent'}`}>{tier.price}</span>
                      {tier.period && <span className={`text-sm font-body ml-1 ${tier.popular ? 'text-background/50' : 'text-muted-foreground'}`}>{tier.period}</span>}
                    </span>
                  </a>
                  <p className={`text-sm font-body leading-relaxed mb-6 ${tier.popular ? 'text-background/70' : 'text-muted-foreground'}`}>{tier.description}</p>
                  <div className={`text-sm font-body leading-relaxed p-4 rounded-sm mb-8 ${tier.popular ? 'bg-background/10 text-background/80' : 'bg-secondary/60 text-foreground/70'}`}>
                    <strong className={`block mb-1 text-xs uppercase tracking-widest ${tier.popular ? 'text-background/50' : 'text-muted-foreground'}`}>Why it matters</strong>
                    {tier.value}
                  </div>
                  <div className="flex-1">
                    {tier.subBlocks ? (
                      <div className="space-y-6">
                        {tier.subBlocks.map((block) => (
                          <div key={block.title}>
                            <h4 className={`text-sm font-body font-semibold mb-1 ${tier.popular ? 'text-background' : 'text-foreground'}`}>{block.title}</h4>
                            <p className={`text-xs font-body mb-3 ${tier.popular ? 'text-background/60' : 'text-muted-foreground'}`}>{block.description}</p>
                            <div className="space-y-2">
                              {block.features.map((f, fi) => (
                                <div key={fi} className="flex items-start gap-3">
                                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                                  <span className={`text-sm font-body leading-snug ${tier.popular ? 'text-background/80' : 'text-foreground/80'}`}>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        {tier.sharedFeatures && (
                          <div className={`pt-4 border-t ${tier.popular ? 'border-background/20' : 'border-border'}`}>
                            <p className={`text-xs font-body uppercase tracking-widest mb-3 ${tier.popular ? 'text-background/50' : 'text-muted-foreground'}`}>Included with either path</p>
                            <div className="space-y-2">
                              {tier.sharedFeatures.map((f, fi) => (
                                <div key={fi} className="flex items-start gap-3">
                                  <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                                  <span className={`text-sm font-body leading-snug ${tier.popular ? 'text-background/80' : 'text-foreground/80'}`}>{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {tier.features.map((f, fi) => (
                          <div key={fi} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                            <span className={`text-sm font-body leading-snug ${tier.popular ? 'text-background/80' : 'text-foreground/80'}`}>{f}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <a
                    href="#contact-form"
                    className={`mt-10 inline-flex items-center justify-center gap-2 text-sm font-body font-medium px-6 py-3 rounded-sm transition-colors ${tier.popular ? 'bg-accent text-white hover:bg-accent/90' : 'border border-foreground/20 text-foreground hover:border-accent hover:text-accent'}`}
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Lead — short conversion path for mobile */}
        <section className="py-10 px-6 lg:px-10 border-b border-border bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="lg:flex-shrink-0 lg:max-w-xs">
                <h2 className="font-heading text-2xl font-normal leading-tight mb-1">Get in touch now</h2>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">Leave your name, email, and website — we'll reach out within one business day. No pressure.</p>
              </div>
              <div className="flex-1 lg:max-w-2xl">
                <QuickLeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* Website Redesign Offer */}
        <section id="website-redesign" className="py-20 px-6 lg:px-10 border-b border-border bg-card/40">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Special Offer</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-3">Complete Website Redesign</h2>
              <p className="text-muted-foreground font-body text-base max-w-xl">
                Up to 50 pages, fully redesigned with content included. One flat price.
              </p>
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
                <a
                  href="#contact-form"
                  className="mt-10 inline-flex items-center gap-2 bg-accent text-white text-sm font-body font-medium px-6 py-3 rounded-sm hover:bg-accent/90 transition-colors"
                >
                  Claim This Offer <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Work Samples — immediately after website redesign */}
        <section id="our-work" className="py-20 px-6 lg:px-10 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Our Portfolio</p>
                <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1]">Sites We've Built</h2>
              </div>
              <p className="text-muted-foreground font-body text-sm max-w-sm leading-relaxed">
                From financial advisors to trial law firms and restaurants — each site engineered to convert visitors into clients.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {projects.map((project) => (
                <a
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative border border-border rounded-sm overflow-hidden hover:border-accent transition-all hover:shadow-md"
                >
                  <img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-36 object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all flex flex-col items-center justify-center gap-1 p-2">
                    <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-xs font-body font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity text-center leading-tight">{project.name}</span>
                    <span className="text-xs font-body text-white/70 opacity-0 group-hover:opacity-100 transition-opacity text-center">{project.industry}</span>
                  </div>
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground font-body text-center">
              Click any thumbnail to view the live site →
            </p>
          </div>
        </section>

        {/* Case Studies */}
        <section id="proof-of-work" className="py-20 px-6 lg:px-10 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Proof of Work</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-3">Real Results. Real Clients.</h2>
              <p className="text-muted-foreground font-body text-base max-w-xl">
                From local service businesses to enterprise retail — measurable growth across industries and platforms.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCaseStudies.map((study) => (
                <div key={study.id} className="border border-border bg-card rounded-sm p-8 flex flex-col hover:shadow-md transition-shadow">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">{study.category}</span>
                  <h3 className="font-heading text-xl font-normal mb-2">{study.title}</h3>
                  <p className="text-sm font-semibold text-accent mb-4">{study.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{study.description}</p>
                  <div className="space-y-3 mb-8 pb-8 border-b border-border">
                    {study.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-body">{metric.label}</span>
                        <span className="font-heading text-lg font-normal text-foreground">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-2 font-body" onClick={() => setSelectedStudy(study)}>
                    Request Details <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 px-6 lg:px-10 bg-foreground text-background">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-background/40 mb-4 font-body">Get Started Today</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6 text-background">
                Ready to Grow? Let's Talk.
              </h2>
              <p className="text-background/60 font-body text-base leading-relaxed mb-10">
                Fill out the form and a member of our team will reach out within one business day. No pitch deck. No pressure. Just an honest conversation about what's possible.
              </p>
              <div className="space-y-5">
                {[
                  { title: 'No obligation', body: 'Just an honest conversation about your growth potential' },
                  { title: 'Month-to-month', body: 'We earn your business every single month' },
                  { title: 'AI-powered from day one', body: 'No manual processes dressed up as technology' },
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
              <PromoContactForm />
            </div>
          </div>
        </section>

      </div>

      {/* Sticky mobile CTA — always one thumb-tap away from the form */}
      <a
        href="#contact-form"
        onClick={scrollToForm}
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border px-4 py-3 active:scale-[0.98] transition-transform"
      >
        <span className="flex items-center justify-center gap-2 bg-accent text-white text-sm font-body font-medium px-6 py-3.5 rounded-sm w-full">
          Get a Free Consultation <ArrowRight className="w-4 h-4" />
        </span>
      </a>
    </>
  );
}