import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Share2, Brain, Users, Eye, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';

const faqs = [
  {
    question: 'Which social media platforms do you manage?',
    answer: 'We manage LinkedIn, Instagram, Facebook, TikTok, X/Twitter, and YouTube. We don\'t spread thin across every platform — AI helps us identify where your specific audience engages and converts, then we go deep on those channels.',
  },
  {
    question: 'Do you create content or just manage posting?',
    answer: 'Both. We develop the strategy, create the content (copy, creative direction, captions, hashtags), schedule and publish, manage community engagement, and report on performance. It\'s a fully managed service.',
  },
  {
    question: 'How do you measure social media ROI?',
    answer: 'We track the full journey from social impression to qualified lead to closed deal. Metrics include reach and engagement, but the ones we optimize for are click-through rate, lead generation, and attributable revenue — not vanity metrics.',
  },
  {
    question: 'How does AI improve social media marketing?',
    answer: 'AI analyzes top-performing content in your industry, identifies optimal posting times, segments audiences for paid amplification, and surfaces influencer opportunities based on engagement quality and audience overlap — removing guesswork from every decision.',
  },
  {
    question: 'Is paid social included in the retainer?',
    answer: 'Paid social strategy and management is included. The ad spend itself is paid directly to the platforms and is separate from our retainer fee — the same model we use for PPC.',
  },
  {
    question: 'Is there a minimum contract length?',
    answer: 'No. All engagements are month-to-month. Social media results compound over time, and we\'d rather earn your loyalty through performance than lock you into a contract.',
  },
];
import SectionHeader from '../../components/shared/SectionHeader';

const capabilities = [
  { icon: Brain, title: 'AI Content Intelligence', description: 'Machine learning analyzes top-performing content in your industry to inform strategy, timing, and messaging for maximum engagement.' },
  { icon: Users, title: 'Audience Identification', description: 'AI segments and profiles your ideal audiences across platforms, ensuring your content reaches the people most likely to convert.' },
  { icon: Calendar, title: 'Strategic Content Planning', description: 'Data-driven content calendars built around trending topics, seasonal patterns, and competitor gaps your brand can own.' },
  { icon: Eye, title: 'Paid Social Amplification', description: 'Targeted paid campaigns on Facebook, Instagram, LinkedIn, and TikTok — optimized by AI for maximum reach and ROI.' },
  { icon: MessageCircle, title: 'Community Management', description: 'Responsive engagement strategies that build authentic relationships and turn followers into advocates and customers.' },
  { icon: Share2, title: 'Influencer & Partnership Strategy', description: 'AI identifies high-impact collaboration opportunities based on audience overlap, engagement quality, and brand alignment.' },
];

export default function SMM() {
  return (
    <>
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-60 select-none -z-10"
        />
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none rotate-180 -z-10"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-4 font-body">
              Social Media Marketing
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              Social Strategy That <span className="text-primary">Actually Converts</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Vanity metrics don't pay the bills. We build AI-informed social media strategies that drive real engagement, qualified traffic, and measurable revenue for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 gap-2 font-body">
                  Build My Social Strategy <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-body">
                  From $1,500/mo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Capabilities"
            title="Data-Driven Social, Not Guesswork"
            description="From content creation to community management, every social action is informed by AI insights."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.title} className="bg-card p-8 rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <cap.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-normal mb-2">{cap.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">Platforms We Dominate</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We don't spread thin across every platform. AI helps us identify where your audience actually engages — then we go deep.
              </p>
              <div className="space-y-4">
                {['LinkedIn (B2B lead generation & thought leadership)', 'Instagram (Visual storytelling & brand building)', 'Facebook (Community building & paid amplification)', 'TikTok (Short-form video & trend activation)', 'X/Twitter (Real-time engagement & industry presence)', 'YouTube (Long-form video & educational content)'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-foreground text-background rounded-2xl p-10">
              <h3 className="font-heading text-2xl font-normal mb-4">Beyond Vanity Metrics</h3>
              <p className="text-background/70 leading-relaxed mb-4">
                Likes and followers are nice. Revenue is better. We measure social success by the metrics that matter: qualified traffic, lead generation, and actual conversions.
              </p>
              <p className="text-background/70 leading-relaxed">
                Our AI tools track the full journey from social impression to closed deal — giving you clear attribution and ROI for every dollar invested in social.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Common Questions About Social Media Marketing" />

      <CTASection
        headline="Ready to Turn Social Into Revenue?"
        subtext="Let's build a social strategy that actually moves the needle. Month-to-month, starting at $1,500."
        buttonText="Start the Conversation"
      />
    </>
  );
}