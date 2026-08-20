import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function PortfolioGrid({ projects }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {projects.map((project) => (
        <a
          key={project.name}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative border border-border rounded-sm overflow-hidden hover:border-accent transition-all hover:shadow-md"
        >
          <img src={project.img} alt={project.name} className="w-full h-36 object-cover object-top group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-all flex flex-col items-center justify-center gap-1 p-2">
            <ExternalLink className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xs font-body font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity text-center leading-tight">{project.name}</span>
            <span className="text-xs font-body text-white/70 opacity-0 group-hover:opacity-100 transition-opacity text-center">{project.industry}</span>
          </div>
        </a>
      ))}
    </div>
  );
}