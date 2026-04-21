import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';
import CTASection from '../components/shared/CTASection';

const categoryColors = {
  'Data & Analytics': 'bg-blue-100 text-blue-700',
  'Heat Mapping & UX': 'bg-purple-100 text-purple-700',
  'Conversion Rate Optimization': 'bg-green-100 text-green-700',
  'AI-Assisted PPC': 'bg-orange-100 text-orange-700',
  'AI-Enabled Development': 'bg-rose-100 text-rose-700',
  'Strategy & Growth': 'bg-amber-100 text-amber-700',
};

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.filter({ id }).then((data) => {
      setPost(data[0] || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground font-body">Article not found.</p>
        <Link to="/blog" className="text-sm font-body text-accent hover:underline">← Back to Journal</Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Back */}
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-body">
            <ArrowLeft className="w-3.5 h-3.5" /> Journal
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-3xl mx-auto px-6 pb-12 border-b border-border">
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-sm ${categoryColors[post.category] || 'bg-muted text-muted-foreground'}`}>
              {post.category}
            </span>
            {post.read_time && <span className="text-xs text-muted-foreground font-body">{post.read_time} read</span>}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-body">
            {post.author && <span>{post.author}</span>}
            {post.published_date && (
              <span>{new Date(post.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            )}
          </div>
        </header>

        {/* Body */}
        <article className="max-w-3xl mx-auto px-6 py-16">
          {post.content ? (
            <ReactMarkdown className="prose prose-lg max-w-none font-body prose-headings:font-heading prose-headings:font-normal prose-a:text-accent">
              {post.content}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground font-body">No content available for this article.</p>
          )}
        </article>
      </div>

      <CTASection />
    </>
  );
}