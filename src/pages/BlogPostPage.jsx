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
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.BlogPost.filter({ id }).then((data) => {
      const currentPost = data[0] || null;
      setPost(currentPost);
      
      if (currentPost) {
        base44.entities.BlogPost.list().then((allPosts) => {
          const related = allPosts
            .filter(p => p.category === currentPost.category && p.id !== currentPost.id)
            .slice(0, 3);
          setRelatedPosts(related);
        });
      }
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
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-4">
          <Link to="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-body">
            <ArrowLeft className="w-3.5 h-3.5" /> Journal
          </Link>
        </div>

        {/* Header */}
        <header className="max-w-7xl mx-auto px-6 pb-20 border-b border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left - Title & Meta */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-sm ${categoryColors[post.category] || 'bg-muted text-muted-foreground'}`}>
                  {post.category}
                </span>
                {post.read_time && <span className="text-xs text-muted-foreground font-body">{post.read_time} read</span>}
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-8">
                {post.title}
              </h1>
              <div className="flex flex-col gap-2 text-xs uppercase tracking-widest text-muted-foreground font-body">
                {post.author && <span>{post.author}</span>}
                {post.published_date && (
                  <span>{new Date(post.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                )}
              </div>
            </div>

            {/* Right - Excerpt with Orange Divider */}
            {post.excerpt && (
              <div className="pl-8 border-l border-accent pt-1">
                <p className="text-base text-muted-foreground font-body leading-relaxed">{post.excerpt}</p>
              </div>
            )}
          </div>
        </header>

        {/* Body & Related */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Article - Left Column */}
            <article className="lg:col-span-2">
              {post.content ? (
                <ReactMarkdown className="prose prose-lg max-w-none font-body [&_h3]:!text-accent [&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:mt-12 [&_h3]:mb-6 [&_h4]:!text-accent [&_h4]:text-lg md:[&_h4]:text-xl [&_h4]:mt-10 [&_h4]:mb-5
                  prose-headings:font-heading prose-headings:font-normal prose-headings:text-accent
                  prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-10
                  prose-p:text-base prose-p:leading-loose prose-p:mb-9
                  prose-a:text-accent prose-a:underline
                  prose-img:rounded-sm prose-img:my-12
                  prose-strong:font-semibold
                  prose-em:italic
                  prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:my-12
                  prose-figcaption:text-xs prose-figcaption:uppercase prose-figcaption:tracking-widest prose-figcaption:text-muted-foreground prose-figcaption:mt-4
                  prose-li:mb-4">
                  {post.content}
                </ReactMarkdown>
              ) : (
                <p className="text-muted-foreground font-body">No content available for this article.</p>
              )}
            </article>

            {/* Related Articles - Right Sidebar */}
            {relatedPosts.length > 0 && (
              <aside className="lg:col-span-1">
                <div className="sticky top-32 border border-border rounded-sm p-8 bg-secondary/30">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-8 font-body flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                    Related Reading
                  </p>
                  <div className="space-y-8">
                    {relatedPosts.map((relatedPost) => (
                      <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`} className="group block">
                        <div className="mb-3">
                          <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-sm ${categoryColors[relatedPost.category] || 'bg-muted text-muted-foreground'}`}>
                            {relatedPost.category}
                          </span>
                        </div>
                        <h3 className="font-heading text-sm font-normal leading-snug mb-2 group-hover:text-accent transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      <CTASection />
    </>
  );
}