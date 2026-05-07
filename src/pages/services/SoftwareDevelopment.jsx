import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Brain, Zap, Database, Lock, BarChart3, CheckCircle } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';

const faqs = [
  {
    question: 'What types of applications do you build?',
    answer: 'We build custom web applications, operational management platforms, AI-integrated business tools, customer portals, data and analytics systems, and third-party integrations. If it runs in a browser and solves a real business problem, we can build it.',
  },
  {
    question: 'How is a custom software project priced?',
    answer: 'Custom software is scoped and priced based on requirements gathered during our discovery process. We provide a detailed project estimate before any work begins. Ongoing maintenance, support, and feature development after launch are available as a separate retainer.',
  },
  {
    question: 'How do you incorporate AI into custom applications?',
    answer: 'We integrate AI at the workflow level — predictive analytics, intelligent automation triggers, natural language processing, anomaly detection, and AI-assisted decision support. We build AI-native from the start rather than bolting it on later.',
  },
  {
    question: 'What is your development process?',
    answer: 'We follow an agile development approach: strategic discovery, architecture design, iterative development with regular demos, QA and testing, deployment, and ongoing optimization. You have full visibility at every stage — no black box development.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer: 'Yes. Most clients engage us on a post-launch retainer covering bug fixes, performance monitoring, feature additions, and infrastructure management. We treat launched applications as long-term partnerships, not one-time projects.',
  },
  {
    question: 'How long does a custom application take to build?',
    answer: 'Timelines vary significantly by scope. Simple internal tools can be delivered in 6–8 weeks. More complex platforms with integrations, AI features, and custom data architecture typically take 3–6 months. We\'ll define a realistic timeline during the discovery phase.',
  },
];
import SectionHeader from '../../components/shared/SectionHeader';

const capabilities = [
  { icon: Code, title: 'Custom Web Applications', description: 'Built on modern, scalable frameworks — not templates. Applications engineered for performance, security, and long-term maintainability.' },
  { icon: Brain, title: 'AI-Integrated Systems', description: 'Deploy AI capabilities directly into your business workflows. From predictive analytics to intelligent automation, we build AI-native solutions.' },
  { icon: Database, title: 'Data Architecture & Integration', description: 'Seamless connections between your systems. Custom APIs, data pipelines, and integrations that unify your entire operational stack.' },
  { icon: Zap, title: 'Real-Time Operations Platforms', description: 'Live dashboards, automated workflows, and intelligent systems that give your team instant visibility and control over critical operations.' },
  { icon: Lock, title: 'Security & Compliance', description: 'Built-in security at every layer. Enterprise-grade architecture with compliance frameworks for regulated industries.' },
  { icon: BarChart3, title: 'Analytics & Business Intelligence', description: 'Turn operational data into competitive advantage. Custom dashboards and insights that connect activity directly to business outcomes.' },
];

export default function SoftwareDevelopment() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-60 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 font-body">
              Custom Software Development
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              Intelligent Applications <span className="text-primary">Built to Operate</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Off-the-shelf software doesn't solve unique problems. We build custom web applications and operational platforms engineered specifically for your business — combining intelligent automation, real-time visibility, and AI-driven insights to help you scale faster and operate smarter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 gap-2 font-body">
                  Schedule a Discovery Call <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-body">
                  Custom Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Capabilities"
            title="From Concept to Operations"
            description="Custom applications built with AI, security, and scalability at the core. Every feature engineered to deliver measurable business outcomes."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.title} className="bg-card p-8 rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <cap.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-normal mb-2">{cap.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">Your Custom Application Development Process</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Software development is a partnership. We work closely with your team to understand your operational challenges, design intelligent solutions, and build systems that scale with your business.
              </p>
              <div className="space-y-4">
                {['Strategic discovery & requirements gathering', 'Full-stack architecture design & planning', 'Agile development with transparent progress', 'AI integration & intelligent automation', 'Comprehensive testing & quality assurance', 'Deployment & ongoing optimization', 'Training, documentation & support', 'Continuous improvement & feature roadmap'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-foreground text-background rounded-2xl p-10">
              <h3 className="font-heading text-2xl font-normal mb-4">Why Custom Software</h3>
              <p className="text-background/70 leading-relaxed mb-6">
                Generic software forces you to adapt your business to its limitations. Custom applications do the opposite — they're built around your unique workflows, challenges, and growth goals.
              </p>
              <p className="text-background/70 leading-relaxed">
                The result? Systems that give you competitive advantage, reduce operational friction, and unlock new revenue streams that off-the-shelf solutions can't deliver.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Applications"
            title="Software Built for Growth"
            description="From operational platforms to customer-facing applications, we engineer solutions that solve real problems and drive measurable results."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="font-heading text-xl font-normal mb-4">Operations & Management Platforms</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Real-time dashboards, automated workflows, and intelligent systems that give teams visibility over operations, streamline processes, and enable data-driven decisions.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Scheduling & resource management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Project tracking & team collaboration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Inventory & supply chain visibility</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Customer relationship management</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="font-heading text-xl font-normal mb-4">Customer-Facing Applications</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                High-performance web and mobile applications designed for engagement, conversion, and loyalty. Built with modern UX principles and AI-enhanced experiences.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Ecommerce platforms & marketplaces</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>SaaS applications & software solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Member portals & community platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Content management & publishing systems</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="font-heading text-xl font-normal mb-4">Data & Intelligence Systems</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Turn raw operational data into competitive advantage. Custom analytics platforms and business intelligence tools that drive smarter decisions.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Predictive analytics & forecasting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Business intelligence dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Data integration & ETL pipelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>AI-powered insights & recommendations</span>
                </li>
              </ul>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="font-heading text-xl font-normal mb-4">Integrated Systems & Automation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Unify your entire software ecosystem. Custom integrations that connect tools, eliminate manual work, and create seamless operational flows.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Third-party API integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Custom automation workflows</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Legacy system modernization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>AI-assisted process automation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* eCommerce Platforms */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="eCommerce Development"
            title="BigCommerce & Shopify Development"
            description="As a Certified BigCommerce Partner, we build and optimize high-performance storefronts engineered for revenue — not just launch day."
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
            {/* BigCommerce */}
            <div className="bg-card border border-border rounded-2xl p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-normal">BigCommerce Development</h3>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-body">Certified Partner</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                BigCommerce is built for mid-market and enterprise brands that need platform flexibility, API-first integrations, and multi-storefront capability — without transaction fees or the overhead of a fully custom build.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-8">
                {['Custom Stencil theme development', 'ERP, CRM & fulfillment integrations', 'B2B functionality & account hierarchies', 'Multi-storefront & multi-currency setup', 'Core Web Vitals & performance optimization', 'Headless commerce architecture'].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline font-body">
                Start a BigCommerce project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Shopify */}
            <div className="bg-card border border-border rounded-2xl p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-normal">Shopify Development</h3>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground font-body">DTC & Growth Brands</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Shopify is the platform of choice for DTC brands focused on speed to market, a broad app ecosystem, and native marketing tools. We build custom Shopify storefronts designed for conversion and scale.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-8">
                {['Custom Liquid theme development', 'Shopify Plus for enterprise brands', 'App integrations & custom app development', 'Checkout customization & optimization', 'Migration from other platforms', 'Ongoing CRO & performance management'].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline font-body">
                Start a Shopify project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Platform decision note */}
          <div className="mt-10 bg-secondary/40 border border-border rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h4 className="font-heading text-lg font-normal mb-2">Not sure which platform is right for you?</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We'll give you an honest recommendation based on your catalog complexity, integration needs, and growth goals — not based on which platform benefits us more.
              </p>
            </div>
            <Link to="/contact">
              <Button className="rounded-full px-6 font-body whitespace-nowrap">
                Get a Platform Recommendation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Common Questions About Custom Software" />

      <CTASection
        headline="Ready to Build Your Next Application?"
        subtext="Let's talk about your operational challenges and explore what's possible with custom software. We'll work with you to define scope, timelines, and investment."
        buttonText="Start Your Project"
      />
    </>
  );
}