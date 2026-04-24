import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, X } from 'lucide-react';
import CTASection from '../components/shared/CTASection';

const projects = [
  {
    id: 'rickis-and-cleo',
    client: "Ricki's and Cleo",
    category: 'eCommerce · BigCommerce · Middleware',
    tagline: 'Two enterprise brands. One unified digital ecosystem.',
    description:
      "Ricki's and Cleo were recently acquired by Northern Reflections as part of a strategic retail consolidation. Fahrenheit rebuilt both brand websites on BigCommerce in parallel — delivering enterprise-grade platforms in 90 days, integrating a shared middleware loyalty system, and serving as the connective tissue between IT, Marketing, and Operations.",
    tags: ['BigCommerce', 'Middleware', 'ERP Integration', 'Custom Checkout', 'CI/CD'],
    highlights: [
      { label: 'Timeline', value: '90 Days' },
      { label: 'Brands Launched', value: '2 in Parallel' },
      { label: 'Typical Timeline', value: '6 Months' },
    ],
    heroImage: 'https://www.fahrenheitmarketing.com/app/uploads/2026/03/RikisCleo-logo.webp',
    images: [
      'https://www.fahrenheitmarketing.com/app/uploads/2026/03/Rickis-and-Cleo-intro.webp',
      'https://www.fahrenheitmarketing.com/app/uploads/2026/03/RickisCleo-mockups.webp',
    ],
    liveUrl: null,
  },
  {
    id: 'rickis',
    client: "Ricki's",
    category: 'eCommerce · Infrastructure Modernization',
    tagline: 'Modernizing decades of legacy architecture — without missing a beat.',
    description:
      "Ricki's carried decades of legacy systems, complex data architecture, and significant technical debt. Fahrenheit mapped, integrated, and modernized the entire stack — migrating all customer, inventory, and transaction data to a new BigCommerce platform while maintaining full operational continuity throughout the transition.",
    tags: ['BigCommerce', 'Legacy Integration', 'Data Migration', 'DevOps', 'AWS'],
    highlights: [
      { label: 'Timeline', value: '3 Months' },
      { label: 'Downtime', value: 'Zero' },
      { label: 'Data Loss', value: 'None' },
    ],
    heroImage: 'https://www.fahrenheitmarketing.com/app/uploads/2026/01/rickis-logo.png',
    images: [],
    liveUrl: 'https://rickis.com/',
  },
  {
    id: 'sentech',
    client: 'Sentech Architectural Systems',
    category: 'UI/UX Design · Website Redesign',
    tagline: 'Engineering precision, translated into a digital presence.',
    description:
      'Sentech provides structural glass and engineering systems for landmark projects like One World Trade Center. Fahrenheit redesigned their website from the ground up — transforming complex engineering expertise into a visually compelling, high-performance web experience on a custom WordPress theme optimized for large-format imagery.',
    tags: ['UI/UX Design', 'WordPress', 'Custom Theme', 'SEO', 'Performance Optimization'],
    highlights: [
      { label: 'Platform', value: 'WordPress' },
      { label: 'Image Size', value: '5MB+ Handled' },
      { label: 'WCAG', value: 'Compliant' },
    ],
    heroImage: 'https://www.fahrenheitmarketing.com/app/uploads/2026/02/Sentech-logo-white-1.png.webp',
    images: [
      'https://www.fahrenheitmarketing.com/app/uploads/2026/02/sentech-world-trade-center-glass.webp',
    ],
    liveUrl: null,
  },
  {
    id: 'northern-reflections',
    client: 'Northern Reflections',
    category: 'eCommerce · BigCommerce · Custom Development',
    tagline: 'WCAG 2.1 compliant. 133 locations. One seamless platform.',
    description:
      "Northern Reflections is a Canadian women's fashion retailer with 133 physical locations. Fahrenheit overhauled their BigCommerce platform — building a custom WCAG 2.1-compliant theme, developing a Checkout Stores Manager app for in-store pickup, integrating a loyalty rewards program, and partnering with Searchspring to transform product discovery.",
    tags: ['BigCommerce', 'Custom App', 'WCAG 2.1', 'Searchspring', 'Omnichannel'],
    highlights: [
      { label: 'Store Locations', value: '133' },
      { label: 'Accessibility', value: 'WCAG 2.1' },
      { label: 'Theme', value: 'Custom Built' },
    ],
    heroImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Northern_Reflections_Logo.svg/320px-Northern_Reflections_Logo.svg.png',
    images: [],
    liveUrl: 'https://www.northernreflections.com/',
  },
];

function ProjectModal({ project, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-sm border border-border w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-8 border-b border-border">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-body">{project.category}</span>
            <h2 className="font-heading text-3xl font-normal mt-1">{project.client}</h2>
            <p className="text-accent text-sm font-medium font-body mt-1">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors ml-4 flex-shrink-0 mt-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed font-body">{project.description}</p>

          {/* Highlights */}
          <div className="grid grid-cols-3 gap-px bg-border border border-border rounded-sm overflow-hidden">
            {project.highlights.map((h) => (
              <div key={h.label} className="bg-secondary/40 p-5">
                <p className="font-heading text-2xl font-normal">{h.value}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mt-1">{h.label}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs bg-secondary text-foreground/70 px-3 py-1 rounded-full font-body">
                {tag}
              </span>
            ))}
          </div>

          {/* Images */}
          {project.images.length > 0 && (
            <div className="space-y-4">
              {project.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.client} project screenshot ${i + 1}`}
                  className="w-full rounded-sm border border-border object-cover"
                />
              ))}
            </div>
          )}

          {/* Live link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-body text-foreground/60 hover:text-foreground transition-colors"
            >
              Visit Live Site <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <>
      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden border-b border-border">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[400px] pointer-events-none opacity-60 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-body">Our Work</span>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mt-4 mb-6 max-w-3xl">
            Design &amp; Development <span className="italic">Gallery</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-body">
            A selection of projects we're proud of — enterprise eCommerce builds, UI/UX transformations, and complex integrations delivered on time, on brand.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group text-left rounded-sm border border-border bg-card hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Card Image Area */}
                <div className="relative bg-foreground h-56 flex items-center justify-center overflow-hidden">
                  <img
                    src={project.heroImage}
                    alt={project.client}
                    className="max-h-20 max-w-[220px] object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-4 right-4">
                    <span className="w-8 h-8 rounded-full bg-background/10 border border-background/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors">
                      <ArrowRight className="w-3.5 h-3.5 text-background" />
                    </span>
                  </div>
                  {/* Number */}
                  <span className="absolute top-4 left-4 text-xs font-body text-background/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-7">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-body">{project.category}</span>
                  <h3 className="font-heading text-2xl font-normal mt-2 mb-2">{project.client}</h3>
                  <p className="text-sm text-accent font-medium font-body mb-3">{project.tagline}</p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-3">{project.description}</p>

                  {/* Mini highlights */}
                  <div className="flex gap-6 mt-5 pt-5 border-t border-border">
                    {project.highlights.map((h) => (
                      <div key={h.label}>
                        <p className="font-heading text-lg font-normal">{h.value}</p>
                        <p className="text-xs text-muted-foreground font-body">{h.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Let's build something you're proud of."
        subtext="Enterprise complexity or startup speed — we deliver. Start with a conversation."
        buttonText="Discuss Your Project"
        buttonLink="/contact"
        secondaryText="See Case Studies"
        secondaryLink="/case-studies"
      />
    </>
  );
}