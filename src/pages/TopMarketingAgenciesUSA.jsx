import React from 'react';
import { mediaUrl } from '@/lib/media';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CTASection from '../components/shared/CTASection';
import ArticleToc from '@/components/blog/ArticleToc';
import useFaqSchema from '@/hooks/useFaqSchema';
import usePostHead from '@/hooks/usePostHead';
import parseMarkdownFaqs from '@/lib/parseMarkdownFaqs';
import { content, agencyHeadings, articleMeta, slugify } from '@/data/topMarketingAgenciesContent';

const faqs = parseMarkdownFaqs(content);

const markdownComponents = {
  h3: ({ children }) => {
    const text = React.Children.toArray(children).join('');
    return <h3 id={slugify(text)}>{children}</h3>;
  },
  table: ({ children }) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full text-sm text-left border-collapse">{children}</table>
    </div>
  ),
  a: ({ href, children }) =>
    /^https?:\/\//.test(href || '') ? (
      <a
        href={href}
        target="_blank"
        rel={/ninjapromo\.io/.test(href) ? 'sponsored nofollow noopener noreferrer' : 'nofollow noopener noreferrer'}
      >{children}</a>
    ) : (
      <a href={href}>{children}</a>
    ),
};

export default function TopMarketingAgenciesUSA() {
  useFaqSchema(faqs);
  usePostHead(articleMeta);
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
        <header className="max-w-7xl mx-auto px-6 pb-20 border-b border-border relative">
          <img
            src={mediaUrl("https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png")}
            alt="Decorative geometric cube pattern" aria-hidden="true"
            className="absolute top-0 right-0 w-[320px] pointer-events-none opacity-80 select-none"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-xs font-body font-medium px-2.5 py-1 rounded-sm bg-amber-100 text-amber-700">
                  Strategy & Growth
                </span>
                <span className="text-xs text-muted-foreground font-body">10 min read</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-8">
                {articleMeta.title}
              </h1>
              <div className="flex flex-col gap-2 text-xs uppercase tracking-widest text-muted-foreground font-body">
                <span>{articleMeta.author}</span>
                <span>Updated Nov 11, 2026</span>
              </div>
            </div>
            <div className="pl-8 border-l border-accent pt-1">
              <p className="text-base text-muted-foreground font-body leading-relaxed">
                Choosing the right marketing agency can define your brand's trajectory. Here's our breakdown of the top 10 marketing agencies in the USA for 2027 — and the criteria you should use to evaluate them.
              </p>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <article className="lg:col-span-2">
              <ArticleToc items={agencyHeadings} />
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="prose prose-lg max-w-none font-body
                [&_h2]:font-heading [&_h2]:font-normal [&_h2]:!text-accent [&_h2]:text-xl md:[&_h2]:text-2xl [&_h2]:mt-12 [&_h2]:mb-5
                [&_h3]:font-heading [&_h3]:font-normal [&_h3]:!text-accent [&_h3]:text-lg md:[&_h3]:text-xl [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:scroll-mt-28
                [&_p]:text-base [&_p]:leading-relaxed [&_p]:mb-4
                [&_a]:text-accent [&_a]:underline
                [&_strong]:font-semibold
                [&_li]:mb-3
                [&_th]:bg-secondary/50 [&_th]:font-semibold [&_th]:p-3 [&_th]:border [&_th]:border-border
                [&_td]:p-3 [&_td]:border [&_td]:border-border [&_td]:align-top"
                components={markdownComponents}
              >
                {content}
              </ReactMarkdown>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-32 border border-border rounded-sm p-8 bg-secondary/30">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Our Services</p>
                <div className="space-y-4">
                  {[
                    ['SEO', '/services/seo'],
                    ['SEM / PPC', '/services/sem'],
                    ['Social Media', '/services/smm'],
                    ['CRO', '/services/cro'],
                    ['Strategy', '/services/strategy'],
                    ['Marketing Automation', '/services/marketing-automation'],
                    ['Software Development', '/services/software-development'],
                  ].map(([label, path]) => (
                    <Link key={path} to={path} className="block text-sm font-body text-muted-foreground hover:text-accent transition-colors">
                      {label} →
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <CTASection
        headline="Ready to Work with a Top Marketing Agency?"
        subtext="Month-to-month retainers. No long-term contracts. Just results-driven marketing backed by AI."
        buttonText="Start the Conversation"
      />
    </>
  );
}