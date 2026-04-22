import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CTASection from '../components/shared/CTASection';

const caseStudies = [
  {
    category: 'Local SEO',
    studies: [
      {
        id: 1,
        title: 'Professional Cleaning Services',
        tagline: '1,874% increase in local search visibility',
        description: 'Commercial cleaning company transforms from sparse digital presence to top local rankings through GBP optimization and content strategy.',
        metrics: [
          { label: 'Maps Impressions', value: '+2,179%' },
          { label: 'Search Impressions', value: '+207%' },
          { label: 'Business Contacts', value: '+205%' },
        ],
        color: 'bg-yellow-50 border-yellow-200',
      },
      {
        id: 2,
        title: 'Single Practitioner Dental Office',
        tagline: '40+ new patients per month through local SEO',
        description: 'Urban dental practice facing post-pandemic decline rebuilds patient acquisition with AI-driven Local SEO and GBP strategy.',
        metrics: [
          { label: 'Maps Visibility', value: '+76%' },
          { label: 'Search Visibility', value: '+53.5%' },
          { label: 'New Patients/Month', value: '40+' },
        ],
        color: 'bg-orange-50 border-orange-200',
      },
      {
        id: 3,
        title: 'Multi-Location Acute Care Network',
        tagline: '+833% organic query growth across 9 locations',
        description: 'Texas healthcare provider transforms from invisible to in-demand through systematic location optimization and health content strategy.',
        metrics: [
          { label: 'Non-Branded Impressions', value: '+273%' },
          { label: 'Query Footprint', value: '+833%' },
          { label: 'Non-Branded Clicks', value: '+270%' },
        ],
        color: 'bg-red-50 border-red-200',
      },
    ],
  },
  {
    category: 'Paid Advertising',
    studies: [
      {
        id: 4,
        title: 'Done-In-One Dental Implants',
        tagline: '175 TikTok leads in 90 days, 48% monthly growth',
        description: 'High-ticket dental implant center generates qualified leads through targeted TikTok creative, significantly outperforming Meta.',
        metrics: [
          { label: 'TikTok Leads (90 days)', value: '175' },
          { label: 'Peak Month Conversion', value: '$40.36 CPC' },
          { label: 'Monthly Growth', value: '48%' },
        ],
        color: 'bg-pink-50 border-pink-200',
      },
      {
        id: 5,
        title: 'Temecula Facial & Oral Surgery',
        tagline: '59 leads, 24 appointments from TikTok ads',
        description: 'Targeted TikTok campaign reaches older demographic with testimonial-based creative, delivering qualified appointments efficiently.',
        metrics: [
          { label: 'TikTok Impressions', value: '200k' },
          { label: 'Cost per Appointment', value: '$172' },
          { label: 'Campaign Leads', value: '59' },
        ],
        color: 'bg-amber-50 border-amber-200',
      },
      {
        id: 6,
        title: 'Healthy Pet - Pet Supply Store',
        tagline: '568% ROAS on Google Shopping in 90 days',
        description: 'Local pet supply chain drives online sales with optimized Google Shopping and Meta campaigns, dramatically improving conversion efficiency.',
        metrics: [
          { label: 'ROAS', value: '568%' },
          { label: 'Cost per Conversion', value: '$1.38' },
          { label: 'Conversion Value', value: '$28,200' },
        ],
        color: 'bg-teal-50 border-teal-200',
      },
    ],
  },
  {
    category: 'Web Development',
    studies: [
      {
        id: 7,
        title: 'Northern Reflections - BigCommerce Redesign',
        tagline: 'Enterprise-grade responsive eCommerce platform for 133-location fashion retailer',
        description: 'Complete BigCommerce platform overhaul with responsive design, accessibility compliance (WCAG 2.1), and seamless integrations.',
        metrics: [
          { label: 'Store Locations', value: '133' },
          { label: 'Accessibility', value: 'WCAG 2.1' },
          { label: 'Theme', value: 'Custom Built' },
        ],
        color: 'bg-emerald-50 border-emerald-200',
      },
    ],
  },
];

export default function CaseStudies() {
  const [activeCategory, setActiveCategory] = useState(caseStudies[0].category);

  const activeStudies = caseStudies.find((c) => c.category === activeCategory)?.studies || [];

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-60 select-none -z-10"
        />
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none rotate-180 -z-10"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 font-body">
              Case Studies
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              Real Results. Real <span className="text-primary">Clients. Real ROI.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From local service providers to enterprise retail, we deliver measurable growth across industries and platforms. Explore how we turn AI and strategy into compounding revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 px-6 border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {caseStudies.map((c) => (
              <button
                key={c.category}
                onClick={() => setActiveCategory(c.category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all font-body ${
                  activeCategory === c.category
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-card border border-border text-foreground/70 hover:border-foreground/30'
                }`}
              >
                {c.category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeStudies.map((study) => (
              <div
                key={study.id}
                className={`rounded-2xl border p-8 transition-all hover:shadow-lg ${study.color}`}
              >
                <span className="inline-block text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">
                  {study.category}
                </span>
                <h3 className="font-heading text-xl font-normal mb-2">{study.title}</h3>
                <p className="text-sm font-semibold text-accent mb-4">{study.tagline}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {study.description}
                </p>
                <div className="space-y-3 mb-8 pb-8 border-b border-current border-opacity-10">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-body">{metric.label}</span>
                      <span className="font-heading text-lg font-normal text-foreground">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 font-body"
                  >
                    Request Details <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to see similar results for your business?"
        subtext="Every industry has growth potential. Let's find yours."
        buttonText="Schedule a Strategy Session"
      />
    </>
  );
}