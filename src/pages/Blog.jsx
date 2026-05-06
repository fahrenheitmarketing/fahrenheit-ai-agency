import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import BlogCard from '../components/blog/BlogCard';

const CATEGORIES = [
  'All Topics',
  'Data & Analytics',
  'Heat Mapping & UX',
  'Conversion Rate Optimization',
  'AI-Assisted PPC',
  'AI-Enabled Development',
  'Strategy & Growth',
];

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All Topics');

  useEffect(() => {
    base44.entities.BlogPost.list('-published_date', 100).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  const filtered = activeCategory === 'All Topics'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featured = posts.filter(p => p.featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 px-6 lg:px-10 border-b border-border overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Fahrenheit Blog</p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] max-w-3xl mb-6">
            Intelligence,<br /> applied.
          </h1>
          <p className="text-muted-foreground text-base md:text-lg font-body max-w-2xl leading-relaxed">
            Practical writing on AI-enabled marketing, data interpretation, conversion science, and the systems behind scalable growth.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && activeCategory === 'All Topics' && (
        <section className="py-16 px-6 lg:px-10 border-b border-border bg-card/40">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-10 font-body">Featured</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {featured.map(post => <BlogCard key={post.id} post={post} />)}
            </div>
          </div>
        </section>
      )}

      {/* Filter Bar */}
      <section className="sticky top-20 z-10 bg-background border-b border-border px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-body font-medium px-4 py-2 rounded-sm border transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-t border-border pt-8 space-y-3">
                  <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                  <div className="h-6 bg-muted rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-full animate-pulse" />
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground font-body text-center py-20">No articles found for this topic.</p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-10">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                  {activeCategory === 'All Topics' ? `All articles · ${filtered.length}` : `${activeCategory} · ${filtered.length}`}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                {filtered.map(post => <BlogCard key={post.id} post={post} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}