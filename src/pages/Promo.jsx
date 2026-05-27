import React, { useState } from 'react';
import { CheckCircle, Zap, Shield, Calendar, ArrowRight, Star } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import RequestCaseStudyModal from '../components/case-studies/RequestCaseStudyModal';

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
    period: '/month',
    description: 'Built for startups and small businesses that need a real digital presence — fast. Powered by AI from day one.',
    value: 'Get enterprise-grade AI tooling and strategy without the enterprise price tag. We do the heavy lifting so you can focus on running your business.',
    features: [
      'AI-powered content strategy — we plan, brief, and produce content aligned to what your customers are actually searching for',
      'One primary channel focus (SEO, SEM, or Social) — deep expertise where it counts most, not shallow coverage everywhere',
      'PPC campaign management — Google and Microsoft Ads built around revenue, not clicks',
      'Monthly data mining & insights report — clear, actionable intelligence from your analytics stack',
      "AI competitive analysis — know exactly where your competitors are winning and where they're vulnerable",
      'Dedicated account manager — one point of contact who knows your business',
      "Monthly performance review — honest reporting on what's working and what we're adjusting",
    ],
  },
  {
    name: 'Scale',
    price: '$3,500',
    period: '/month',
    popular: true,
    description: 'For growing companies ready to dominate multiple channels. Full-funnel coverage with advanced AI optimization.',
    value: 'This is where growth compounds. When SEO, paid search, and social are synchronized — and all three are AI-optimized — the combined impact exceeds what any single channel can deliver alone.',
    features: [
      'Everything in Growth, plus:',
      'Multi-channel strategy (SEO + SEM + Social) — coordinated campaigns that reinforce each other across every touchpoint',
      'Advanced AI audience segmentation — smarter targeting that finds your best customers and scales what works',
      'Conversion rate optimization — systematic testing to increase the revenue your existing traffic generates',
      'Content creation & optimization — from blog posts to landing pages, built for both humans and search engines',
      'Full-funnel attribution modeling — finally know which channels and campaigns are actually driving revenue',
      'Bi-weekly strategy calls — more frequent check-ins to move faster and course-correct sooner',
      'Custom AI reporting dashboard — your KPIs, your data, built the way you want to see it',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations that need a fully dedicated team, custom AI infrastructure, and board-level strategic oversight.',
    value: 'We become a fully embedded extension of your marketing organization — deploying custom AI systems, managing complex multi-market campaigns, and delivering insights at the executive level.',
    features: [
      'Everything in Scale, plus:',
      'Dedicated strategy team — senior-level strategists assigned exclusively to your account',
      'Custom AI stack deployment — purpose-built AI systems integrated into your existing tech infrastructure',
      'Enterprise-level reporting — cross-market, cross-channel data aggregation and executive dashboards',
      'Quarterly business reviews — deep-dive sessions with your executive team on strategy and trajectory',
      'Priority support & SLA — guaranteed response times and escalation paths',
      'Multi-market / multi-location support — consistent strategy and execution across every market you operate in',
      'Executive-level insights & board reporting — the data and narrative your leadership team needs',
    ],
  },
];

const websiteOffer = {
  name: 'Complete Website Redesign',
  price: '$5,000',
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
  disclaimer: '* Special features and custom functionality (e.g., integrations, custom web applications, e-commerce, membership portals) may require additional investment. Scope and pricing for any additions will be agreed upon in writing before work begins.',
};

const projects = [
  { name: 'Briaud', url: 'https://briaudfinal.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/f32b50479_briaud.png' },
  { name: 'Blackridge', url: 'https://blackridge.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/b666f575b_blackridge.png' },
  { name: 'Concierge', url: 'https://conciergecare.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/f760fc864_concierge.png' },
  { name: 'Greenspoint', url: 'https://greenspoint.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/fd14ca806_greens.png' },
  { name: 'ZOMMA', url: 'https://zomma-group.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/30f79e425_zomma.png' },
  { name: 'Brent Coon', url: 'https://bcoon.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5a8f48e31_bcoon.png' },
  { name: 'MacLeod', url: 'https://mcleod.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/d29162b19_macleod.png' },
  { name: 'Austin Wealth', url: 'https://austinwealth.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/73368fac8_Austinwealth.png' },
  { name: 'Spring', url: 'https://springstream.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/c6634d67c_Springstream.png' },
  { name: 'Golden Hour', url: 'https://goldenhour.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/78d382475_Goldenhour.png' },
];

export default function Promo() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', interest: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.integrations.Core.SendEmail({
      to: 'rcasas@fahrenheitmarketing.com',
      subject: `Promo Page Inquiry — ${formData.name} (${formData.company || 'No company'})`,
      body: `New inquiry from the Fahrenheit Promo page.\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || '—'}\nPhone: ${formData.phone || '—'}\nService Interest: ${formData.interest || '—'}\n\nMessage:\n${formData.message || '—'}`,
    });
    await base44.integrations.Core.SendEmail({
      to: 'sbosch@fahrenheitmarketing.com',
      subject: `Promo Page Inquiry — ${formData.name} (${formData.company || 'No company'})`,
      body: `New inquiry from the Fahrenheit Promo page.\n\nName: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || '—'}\nPhone: ${formData.phone || '—'}\nService Interest: ${formData.interest || '—'}\n\nMessage:\n${formData.message || '—'}`,
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <>
      {selectedStudy && <RequestCaseStudyModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />}
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="relative py-24 px-6 lg:px-10 border-b border-border overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-body font-semibold uppercase tracking-widest px-4 py-2 rounded-sm mb-8">
            <Zap className="w-3.5 h-3.5" /> Limited-Time Offer
          </div>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] max-w-4xl mb-8">
            Agentic Marketing.<br />Real Results. Month-to-Month.
          </h1>
          <p className="text-muted-foreground font-body text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            AI-powered marketing programs and a complete website redesign offer — all with transparent pricing, no long-term contracts, and a team that's been doing this since 2008.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-body">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-accent" /> Month-to-month retainers</div>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Cancel anytime</div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-accent" /> AI-first workflows</div>
            <div className="flex items-center gap-2"><Star className="w-4 h-4 text-accent" /> Since 2008 · Austin, TX</div>
          </div>
        </div>
      </section>

      {/* Retainer Tiers */}
      <section className="py-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Monthly Retainer Programs</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-4">Choose Your Growth Level</h2>
            <p className="text-muted-foreground font-body text-base max-w-xl">
              All plans include AI-powered tools, a dedicated account manager, and the flexibility to cancel anytime.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-border rounded-sm overflow-hidden">
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
                <div className="mb-2">
                  <span className={`font-heading text-5xl font-normal ${tier.popular ? 'text-background' : 'text-foreground'}`}>{tier.price}</span>
                  {tier.period && <span className={`text-sm font-body ml-1 ${tier.popular ? 'text-background/50' : 'text-muted-foreground'}`}>{tier.period}</span>}
                </div>
                <p className={`text-sm font-body leading-relaxed mb-6 ${tier.popular ? 'text-background/70' : 'text-muted-foreground'}`}>{tier.description}</p>

                <div className={`text-sm font-body leading-relaxed p-4 rounded-sm mb-8 ${tier.popular ? 'bg-background/10 text-background/80' : 'bg-secondary/60 text-foreground/70'}`}>
                  <strong className={`block mb-1 text-xs uppercase tracking-widest ${tier.popular ? 'text-background/50' : 'text-muted-foreground'}`}>Why it matters</strong>
                  {tier.value}
                </div>

                <div className="space-y-3 flex-1">
                  {tier.features.map((f, fi) => (
                    <div key={fi} className="flex items-start gap-3">
                      <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${tier.popular ? 'text-accent' : 'text-accent'}`} />
                      <span className={`text-sm font-body leading-snug ${tier.popular ? 'text-background/80' : 'text-foreground/80'}`}>{f}</span>
                    </div>
                  ))}
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

      {/* Website Redesign Offer */}
      <section className="py-24 px-6 lg:px-10 border-b border-border bg-card/40">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Special Offer</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-4">Complete Website Redesign</h2>
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

      {/* Portfolio Work Samples */}
      <section className="py-24 px-6 lg:px-10 border-b border-border bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Our Portfolio</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-4">Sites We've Built</h2>
            <p className="text-muted-foreground font-body text-base max-w-xl">
              From financial advisors to restaurants. Each site engineered to convert.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: 'Briaud', url: 'https://briaudfinal.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/f32b50479_briaud.png' },
              { name: 'Blackridge', url: 'https://blackridge.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/b666f575b_blackridge.png' },
              { name: 'Concierge', url: 'https://conciergecare.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/f760fc864_concierge.png' },
              { name: 'Greenspoint', url: 'https://greenspoint.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/fd14ca806_greens.png' },
              { name: 'ZOMMA', url: 'https://zomma-group.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/30f79e425_zomma.png' },
              { name: 'Brent Coon', url: 'https://bcoon.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5a8f48e31_bcoon.png' },
              { name: 'MacLeod', url: 'https://mcleod.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/d29162b19_macleod.png' },
              { name: 'Austin Wealth', url: 'https://austinwealth.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/73368fac8_Austinwealth.png' },
              { name: 'Spring', url: 'https://springstream.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/c6634d67c_Springstream.png' },
              { name: 'Golden Hour', url: 'https://goldenhour.fmkt.agency', img: 'https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/78d382475_Goldenhour.png' },
            ].map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border border-border rounded-sm overflow-hidden hover:border-accent transition-colors"
              >
                <img
                  src={project.img}
                  alt={project.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors flex items-center justify-center">
                  <span className="text-xs font-body font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">View Site</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-6 lg:px-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Proof of Work</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-4">Real Results. Real Clients.</h2>
            <p className="text-muted-foreground font-body text-base max-w-xl">
              From local service businesses to enterprise retail — measurable growth across industries and platforms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <section id="contact-form" className="py-24 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Get Started Today</p>
            <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6">
              Tell Us About Your Business
            </h2>
            <p className="text-muted-foreground font-body text-base leading-relaxed mb-8">
              Fill out the form and a member of our team will reach out within one business day to discuss which program is the right fit for your goals.
            </p>
            <div className="space-y-4 text-sm font-body text-foreground/70">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>No obligation — just an honest conversation about your growth potential</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>Month-to-month programs — we earn your business every single month</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>AI-powered from day one — no manual processes dressed up as technology</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-sm p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle className="w-12 h-12 text-accent" />
                <h3 className="font-heading text-2xl font-normal">We've got your message.</h3>
                <p className="text-muted-foreground font-body text-sm max-w-xs leading-relaxed">
                  Someone from our team will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Email *</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
                      placeholder="(512) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">I'm most interested in</label>
                  <select
                    value={formData.interest}
                    onChange={e => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors"
                  >
                    <option value="">Select an option…</option>
                    <option value="Growth Retainer ($1,500/mo)">Growth Retainer — $1,500/mo</option>
                    <option value="Scale Retainer ($3,500/mo)">Scale Retainer — $3,500/mo</option>
                    <option value="Enterprise Retainer">Enterprise Retainer — Custom</option>
                    <option value="Website Redesign ($5,000)">Website Redesign — $5,000 flat</option>
                    <option value="Multiple / Not Sure">Multiple / Not Sure Yet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2 font-body">Tell us about your business</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-border bg-background rounded-sm px-4 py-3 text-sm font-body focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="What are your current marketing goals, and where are you seeing the biggest challenges?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-accent text-white text-sm font-body font-medium px-6 py-4 rounded-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? 'Sending…' : <>Submit Inquiry <ArrowRight className="w-4 h-4" /></>}
                </button>
                <p className="text-xs text-muted-foreground font-body text-center">
                  We'll respond within one business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
    </>
  );
}