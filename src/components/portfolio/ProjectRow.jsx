import React from 'react';
import { mediaUrl } from '@/lib/media';
import { ExternalLink } from 'lucide-react';

export default function ProjectRow({ project, index }) {
  const number = String(index + 1).padStart(2, '0');
  return (
    <article className="group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center border-b border-border py-12 lg:py-16 transition-colors hover:bg-secondary/20">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.name}`}
        className="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded-sm"
      />
      <div className="lg:col-span-1 font-body text-sm text-muted-foreground tabular-nums">
        {number}
      </div>
      <div className="lg:col-span-6">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">
          {project.industry}
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-normal leading-[1.1] mb-4">
          {project.name}
        </h2>
        <p className="text-muted-foreground font-body text-base leading-relaxed mb-5 max-w-xl">
          {project.snippet}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-body px-3 py-1 border border-border rounded-sm text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-body font-medium text-accent group-hover:underline">
          {project.linkLabel || `Visit ${project.name}`} <ExternalLink className="w-3.5 h-3.5" />
        </span>
      </div>
      <div className="lg:col-span-5">
        <div className="overflow-hidden rounded-sm border border-border shadow-md">
          <img
            src={mediaUrl(project.image)}
            alt={`${project.name} homepage design`}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}