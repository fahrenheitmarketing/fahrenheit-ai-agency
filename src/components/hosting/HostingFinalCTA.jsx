import React from 'react';
import { mediaUrl } from '@/lib/media';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HostingFinalCTA() {
  return (
    <section className="relative py-24 px-6 bg-accent text-white overflow-hidden">
      <img
        src={mediaUrl("https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png")}
        alt="Decorative geometric cube pattern" aria-hidden="true"
        className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-25 select-none rotate-180"
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-8">
            Your Website Is Too Important to Leave on{' '}
            <span className="italic underline decoration-white/40 underline-offset-8">Autopilot</span>.
          </h2>
          <p className="opacity-75 text-base md:text-lg leading-relaxed mb-5">
            Your website deserves more than inexpensive infrastructure and automated notifications. With
            Fahrenheit, you gain enterprise-grade hosting, layered cybersecurity, proactive technical
            oversight, and an experienced team that knows your environment and takes action when it matters.
          </p>
          <p className="opacity-75 text-base md:text-lg leading-relaxed mb-10">
            Whether you&apos;re protecting a business-critical WordPress website, an e-commerce platform, or a
            more complex digital operation, we&apos;re ready to help you build a safer, more dependable hosting
            environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link to="/contact">
              <Button size="lg" className="rounded-full px-8 gap-2 font-body bg-foreground text-background hover:bg-foreground/90">
                Talk to a Hosting Specialist <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#pricing">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-body border-white/40 text-white hover:border-white hover:text-white hover:bg-white/10"
              >
                Compare Hosting Plans
              </Button>
            </a>
          </div>
          <p className="text-xs uppercase tracking-widest text-white/70 font-body">
            Dedicated account management. Proactive protection. Human-led incident response.
          </p>
        </div>
      </div>
    </section>
  );
}