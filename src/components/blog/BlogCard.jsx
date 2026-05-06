import React from 'react';
import { Link } from 'react-router-dom';
import { getBlogPostUrl } from '@/lib/blogUtils';

const categoryColors = {
  'Data & Analytics': 'bg-blue-100 text-blue-700',
  'Heat Mapping & UX': 'bg-purple-100 text-purple-700',
  'Conversion Rate Optimization': 'bg-green-100 text-green-700',
  'AI-Assisted PPC': 'bg-orange-100 text-orange-700',
  'AI-Enabled Development': 'bg-rose-100 text-rose-700',
  'Strategy & Growth': 'bg-amber-100 text-amber-700',
};

export default function BlogCard({ post }) {
  return (
    <Link to={getBlogPostUrl(post)} className="border-t border-border pt-8 group block">
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-sm ${categoryColors[post.category] || 'bg-muted text-muted-foreground'}`}>
          {post.category}
        </span>
        <span className="text-xs text-muted-foreground font-body">{post.read_time} read</span>
      </div>
      <h3 className="font-heading text-xl md:text-2xl font-normal leading-snug mb-3 group-hover:text-accent transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5 line-clamp-3">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-body">
          {post.published_date ? new Date(post.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
        </span>
        <span className="text-xs font-body text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
          Read article <span>→</span>
        </span>
      </div>
    </Link>
  );
}