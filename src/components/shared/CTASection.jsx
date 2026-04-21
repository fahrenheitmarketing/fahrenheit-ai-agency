import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CTASection({
  headline = "Ready to Grow Smarter?",
  subtext = "No long-term contracts. No guesswork. Just AI-powered results, month after month.",
  buttonText = "Start Your Growth",
  buttonLink = "/contact",
}) {
  return (
    <section className="py-24 px-6 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-6">{headline}</h2>
        <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed font-body">{subtext}</p>
        <Link to={buttonLink}>
          <Button size="lg" variant="secondary" className="rounded-full px-8 text-base font-body gap-2">
            {buttonText} <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}