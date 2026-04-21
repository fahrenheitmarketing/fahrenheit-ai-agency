import React from 'react';
import { Search, MousePointerClick, Share2, LineChart, Compass } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import ServiceCard from '../shared/ServiceCard';

const services = [
  {
    icon: Search,
    title: 'SEO',
    description: 'AI-driven search optimization that identifies opportunities competitors miss. We build authority, visibility, and organic traffic systematically.',
    link: '/services/seo',
  },
  {
    icon: MousePointerClick,
    title: 'SEM / PPC',
    description: 'Intelligent paid search campaigns that minimize waste and maximize conversions. Every dollar is tracked, analyzed, and optimized by AI.',
    link: '/services/sem',
  },
  {
    icon: Share2,
    title: 'Social Media',
    description: 'Data-informed social strategies that build authentic audiences and drive measurable engagement across the platforms that matter.',
    link: '/services/smm',
  },
  {
    icon: LineChart,
    title: 'CRO',
    description: 'Turn more visitors into customers. We use AI-powered testing and behavioral analysis to optimize every step of your conversion funnel.',
    link: '/services/cro',
  },
  {
    icon: Compass,
    title: 'Strategy',
    description: 'Comprehensive digital strategy built on competitive intelligence, market data, and AI analysis. Your roadmap to sustainable growth.',
    link: '/services/strategy',
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-24 px-6 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          label="Our Services"
          title="AI-Powered Marketing, Human Precision"
          description="Every service we deliver is enhanced by artificial intelligence — from keyword discovery to conversion optimization. The result: faster insights, smarter decisions, better outcomes."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}