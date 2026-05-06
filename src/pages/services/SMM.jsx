import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Share2, Brain, Target, Layers, Eye, BarChart3, CheckCircle } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';

const faqs = [
  {
    question: 'Which platforms do you run paid social on?',
    answer: 'We manage paid advertising on Meta (Facebook & Instagram), LinkedIn, TikTok, and Pinterest. We identify which platforms your audience actually converts on and focus spend there — rather than spreading thin across all of them.',
  },
  {
    question: 'Is this different from search advertising (PPC)?',
    answer: 'Yes. Paid social targets people based on who they are — their interests, behaviour, and demographics. Search advertising targets people based on what they\'re actively searching for. The two work best together for full-funnel coverage, and we offer both as separate services.',
  },
  {
    question: 'Do you handle creative — copy, images, video?',
    answer: 'Yes. We develop and test ad creative across all formats — static images, carousels, short-form video, and story ads. Creative quality is one of the biggest drivers of paid social performance, and we treat it accordingly.',
  },
  {
    question: 'How do you measure paid social ROI?',
    answer: 'We track the full journey from social impression to qualified lead to closed deal. The metrics we optimize for are click-through rate, cost per lead, and attributable revenue — not reach or impressions alone.',
  },
  {
    question: 'How does AI assist with paid social?',
    answer: 'AI helps us identify audience segments with the highest conversion probability, analyse creative performance across variations, and surface budget inefficiencies. Our strategists review and act on these insights regularly — every meaningful decision has a human behind it.',
  },
  {
    question: 'Is there a minimum contract length?',
    answer: 'No. All engagements are month-to-month. Paid social results build over time, and we\'d rather earn your continued business through performance than lock you into a contract.',
  },
];

const capabilities = [
  { icon: Brain, title: 'Audience & Interest Targeting', description: 'We build detailed audience segments based on demographics, interests, behaviours, and lookalikes — reaching people based on who they are, not just what they searched.' },
  { icon: Target, title: 'Campaign Strategy & Structure', description: 'Full-funnel paid social strategy — from awareness campaigns that build brand recognition to retargeting sequences that convert warm audiences into customers.' },
  { icon: Layers, title: 'Ad Creative Development & Testing', description: 'We develop and test static, carousel, and video creative across formats. Creative is one of the biggest performance levers in paid social — we treat it as a primary discipline.' },
  { icon: Eye, title: 'Platform Management', description: 'Hands-on campaign management across Meta, LinkedIn, TikTok, and Pinterest — including setup, monitoring, optimisation, and regular reporting.' },
  { icon: BarChart3, title: 'Performance Tracking & Attribution', description: 'We track from impression to revenue. The metrics we report on are cost per lead, ROAS, and attributable pipeline — not reach and impressions alone.' },
  { icon: Share2, title: 'Retargeting & Audience Nurturing', description: 'Strategic retargeting sequences that re-engage visitors, warm leads, and past customers — keeping your brand top of mind at every stage of the buying journey.' },
];

export default function SMM() {
  return (
    <>
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden border-b border-border">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none rotate-180 -z-10"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Paid Social Advertising</p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8 max-w-4xl">
            Paid Social That<br />
            <span className="italic">Reaches the Right People.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl font-body">
            Search ads reach people who are looking. Paid social reaches people who aren't — yet. Meta, LinkedIn, TikTok, and Pinterest let you put your brand in front of exactly the right audience before they go looking elsewhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <Button size="lg" className="rounded-sm px-8 gap-2 font-body bg-accent hover:bg-accent/90 text-white border-0">
                Build My Social Strategy <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="rounded-sm px-8 font-body">
                From $1,500/mo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Capabilities</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-16">
            <div className="lg:col-span-1 pr-0 lg:pr-16 mb-10 lg:mb-0">
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
                Paid Social, Built to Convert
              </h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4 font-body leading-relaxed">
                Meta · LinkedIn · TikTok · Pinterest
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {capabilities.map((cap) => (
                <div key={cap.title} className="bg-background hover:bg-secondary/40 transition-colors duration-200 p-8">
                  <cap.icon className="w-5 h-5 text-accent mb-5" />
                  <h3 className="font-heading text-lg font-normal mb-2">{cap.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-1 pr-0 lg:pr-16 mb-10 lg:mb-0">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Platforms</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
                Where We Run Your Paid Social
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-body mt-6">
                We don't spread thin across every network. We identify which platforms your audience actually converts on and focus your budget there.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {[
                { label: 'Meta (Facebook & Instagram)', desc: 'The largest paid social ecosystem. Precise interest and behaviour targeting across the full funnel — from awareness to conversion.' },
                { label: 'LinkedIn Ads', desc: 'The platform for B2B. Job title, company size, seniority — LinkedIn targeting reaches decision-makers other platforms can\'t.' },
                { label: 'TikTok Ads', desc: 'High-reach, lower-cost discovery for brands targeting younger audiences or using video-first creative strategies.' },
                { label: 'Pinterest Ads', desc: 'Strong purchase intent, particularly for lifestyle, home, fashion, and consumer product categories.' },
                { label: 'Retargeting Across Platforms', desc: 'We build retargeting audiences across all channels to re-engage your warmest prospects wherever they spend time.' },
                { label: 'Lookalike & Custom Audiences', desc: 'Expand reach to new prospects who mirror your best existing customers — across every platform we manage.' },
              ].map((item) => (
                <div key={item.label} className="bg-background hover:bg-secondary/40 transition-colors duration-200 p-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading text-base font-normal mb-1">{item.label}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed font-body">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Organic Social */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-1 pr-0 lg:pr-16 mb-10 lg:mb-0">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Organic Social</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
                Owned Presence, Built to Last
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-body mt-6">
                Paid social amplifies reach. Organic social builds trust. We help brands show up consistently with content that earns attention — not just buys it.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {[
                { title: 'Content Strategy & Calendar', desc: "A structured monthly content plan aligned to your brand voice, audience, and business objectives — so posting isn't an afterthought." },
                { title: 'Copy & Creative Direction', desc: 'Platform-native copy and creative briefs for every post. We write for the scroll — short, purposeful, and on-brand.' },
                { title: 'Community Management', desc: 'Timely responses to comments, DMs, and mentions. We help brands stay present and build relationships at scale.' },
                { title: 'Profile & Bio Optimisation', desc: 'First impressions matter. We audit and optimise your social profiles to reflect your positioning and convert visitors into followers.' },
                { title: 'Performance Reporting', desc: 'Monthly organic reporting covering reach, engagement, follower growth, and content performance — with clear recommendations.' },
                { title: 'Influencer & Creator Coordination', desc: 'We identify and manage relationships with creators and micro-influencers whose audiences align with your ideal customer.' },
              ].map((item) => (
                <div key={item.title} className="bg-background hover:bg-secondary/40 transition-colors duration-200 p-8">
                  <h3 className="font-heading text-base font-normal mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cross-link to Search */}
      <section className="py-16 px-6 border-t border-b border-border bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="border border-border rounded-sm p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-body mb-3">Also available</p>
              <h3 className="font-heading text-2xl md:text-3xl font-normal mb-2">Also Need to Capture High-Intent Search Traffic?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-xl">
                Our Search Engine Marketing service manages Google and Microsoft Ads — reaching buyers at the moment they're actively searching for what you offer. Paired together, search and paid social cover the full funnel.
              </p>
            </div>
            <Link to="/services/sem" className="flex-shrink-0">
              <Button variant="outline" className="rounded-sm px-6 gap-2 font-body whitespace-nowrap">
                View Search Advertising <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Common Questions About Paid Social" />

      <CTASection
        headline="Ready to Turn Social Into Revenue?"
        subtext="Let's build a social strategy that actually moves the needle. Month-to-month, starting at $1,500."
        buttonText="Start the Conversation"
      />
    </>
  );
}