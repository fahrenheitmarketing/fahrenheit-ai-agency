import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function ServiceCard({ icon: Icon, title, description, link }) {
  return (
    <Link to={link} className="group block">
      <div className="p-8 rounded-2xl border border-border bg-card hover:bg-muted/50 hover:border-primary/20 transition-all duration-300 h-full">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-heading text-xl font-semibold">{title}</h3>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}