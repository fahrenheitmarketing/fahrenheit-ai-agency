import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CaseStudiesGrid({ studies, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {studies.map((study) => (
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
          <Button variant="outline" size="sm" className="w-full gap-2 font-body" onClick={() => onSelect(study)}>
            Request Details <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      ))}
    </div>
  );
}