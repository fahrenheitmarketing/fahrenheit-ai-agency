import React from 'react';
import { mediaUrl } from '@/lib/media';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const trustIndicators = [
  'Dedicated Account Management',
  'Proactive Security Monitoring',
  'Hands-On Incident Response',
  'Standard Server Malware Remediation Included',
];

export default function HostingHero() {
  return (
    <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <img
        src={mediaUrl("https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png")}
        alt="Decorative geometric cube pattern" aria-hidden="true"
        className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-25 select-none"
      />
      <img
        src={mediaUrl("https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png")}
        alt="Decorative geometric cube pattern" aria-hidden="true"
        className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-25 select-none rotate-180"
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4 font-body">
            Enterprise Managed Hosting &amp; Cybersecurity
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
            Managed Hosting. Real People. <span className="text-accent">Real Accountability.</span>
          </h1>
          <p className="font-heading text-xl md:text-2xl text-foreground mb-6">
            Enterprise-grade infrastructure, proactive cybersecurity, and an experienced team that stands
            behind your website.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-5">
            Most hosting companies provide infrastructure, automated monitoring, and a support system. When
            something goes wrong, you may find yourself navigating support tickets, troubleshooting unfamiliar
            technology, or hiring outside specialists to resolve the problem.
          </p>
          <p className="text-lg text-foreground leading-relaxed mb-5">
            Fahrenheit Marketing takes a different approach.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-5">
            We combine high-performance hosting, layered cybersecurity, proactive maintenance, and hands-on
            technical support to protect your website and keep your business running.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Every managed hosting client has access to a dedicated account manager and a technical team
            familiar with their environment. When security incidents occur, we don&apos;t simply send an
            alert. We investigate, respond, and work toward resolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="#pricing">
              <Button size="lg" className="rounded-full px-8 gap-2 font-body">
                Explore Hosting Plans <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-8 font-body">
                Speak With Our Team
              </Button>
            </Link>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {trustIndicators.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="text-xs uppercase tracking-widest text-foreground/70 font-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}