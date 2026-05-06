import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MousePointerClick, Brain, Target, BarChart3, Layers, RefreshCw, CheckCircle } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';
import SectionHeader from '../../components/shared/SectionHeader';

const faqs = [
  {
    question: 'How is your management fee structured?',
    answer: 'Our retainer covers all strategy, campaign management, optimization, and reporting. Ad spend is paid directly to the platforms — it\'s separate from our fee. This keeps our incentives aligned with your performance, not your spend.',
  },
  {
    question: 'Which search platforms do you manage?',
    answer: 'We manage Google Ads (Search, Display, Shopping, YouTube, Performance Max) and Microsoft/Bing Ads. If you\'re also looking to advertise on Meta, LinkedIn, or TikTok, our Paid Social service runs those channels.',
  },
  {
    question: 'How does AI assist with search campaign performance?',
    answer: 'AI surfaces patterns, flags underperforming keywords and segments, and identifies budget inefficiencies faster than manual analysis. Our strategists review these insights regularly and make optimization decisions — so you get the speed of AI analysis with human judgment on every meaningful change.',
  },
  {
    question: 'Do you handle ad creative — copy and extensions?',
    answer: 'Yes. We develop and test search ad copy, headlines, descriptions, and ad extensions. Our structured testing process identifies winning combinations faster so your budget goes further.',
  },
  {
    question: 'What minimum ad spend do you require?',
    answer: 'We generally recommend a minimum of $3,000/month in ad spend to allow optimization algorithms to gather sufficient data. Larger budgets unlock more advanced strategies.',
  },
  {
    question: 'Do you also manage paid social advertising?',
    answer: 'Yes — as a separate engagement. Our Paid Social service covers Meta, LinkedIn, TikTok, and Pinterest. Many clients run both search and social together for full-funnel coverage.',
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No. All engagements are month-to-month. Search advertising should produce clear, measurable ROI — you should stay because the results justify it, not because a contract forces you to.',
  },
];

const capabilities = [
  { icon: Brain, title: 'AI-Assisted Bid Management', description: 'AI surfaces keyword-level opportunities and flags inefficiencies — our strategists review and act on these insights regularly, so every bid decision has human judgment behind it.' },
  { icon: Target, title: 'Keyword Strategy & Search Intent', description: 'We research and map keywords by search intent — not just volume — ensuring your ads reach people who are ready to act, not just browse.' },
  { icon: Layers, title: 'Search Ad Creative & Testing', description: 'Data-driven headlines, descriptions, and extensions tested systematically. We identify the messaging that converts and scale it.' },
  { icon: BarChart3, title: 'Conversion Tracking & Attribution', description: 'Full-funnel attribution that connects every click to revenue. You always know exactly what your search spend is producing.' },
  { icon: RefreshCw, title: 'Ongoing Campaign Optimization', description: 'Regular negative keyword mining, match type refinement, Quality Score improvement, and budget reallocation — executed on a structured cadence by our team.' },
  { icon: MousePointerClick, title: 'Landing Page Optimization', description: 'We don\'t just drive traffic — we ensure the destination converts. Targeted landing page recommendations and testing are included.' },
];


export default function SEM() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden border-b border-border">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none rotate-180 -z-10"
        />
        <div className="relative max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Search Engine Marketing / PPC</p>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8 max-w-4xl">
            Search Advertising That<br />
            <span className="italic">Turns Intent Into Revenue.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl font-body">
            When someone searches for what you sell, you need to be there. We manage Google and Microsoft search campaigns with rigorous strategy and AI-assisted optimisation — connecting your brand to high-intent buyers at the exact moment they're ready to act.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact">
              <Button size="lg" className="rounded-sm px-8 gap-2 font-body bg-accent hover:bg-accent/90 text-white border-0">
                Audit My Campaigns <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="rounded-sm px-8 font-body">
                Management from $1,500/mo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4 font-body">Capabilities</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-16">
            <div className="lg:col-span-1 pr-0 lg:pr-16 mb-10 lg:mb-0">
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
                Search Advertising, Managed with Precision
              </h2>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-4 font-body leading-relaxed">
                Google · Microsoft · YouTube
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
      <section className="py-24 px-6 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-1 pr-0 lg:pr-16 mb-10 lg:mb-0">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Platforms</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
                Where We Run Your Search Ads
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-body mt-6">
                We focus on the platforms where search intent is highest — capturing buyers who are actively looking for what you offer.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              {[
                { label: 'Google Search', desc: "Capture high-intent queries across Google's search network — the largest search engine in the world." },
                { label: 'Google Shopping', desc: 'Product listing ads that show your inventory directly in search results, with price and image.' },
                { label: 'Google Display & YouTube', desc: "Visual and video placements across Google's network — ideal for retargeting and upper-funnel reach." },
                { label: 'Microsoft / Bing Ads', desc: 'Often overlooked, consistently lower CPCs. We manage Bing alongside Google to maximise coverage.' },
                { label: 'Performance Max', desc: "Google's AI-driven campaign type across all channels — managed with strategic oversight to keep performance accountable." },
                { label: 'Remarketing & Retargeting', desc: "Re-engage visitors who've already shown interest but haven't converted — often the highest-ROI campaigns." },
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

      {/* Cross-link to Paid Social */}
      <section className="py-16 px-6 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="border border-border rounded-sm p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-accent font-body mb-3">Also available</p>
              <h3 className="font-heading text-2xl md:text-3xl font-normal mb-2">Need to Advertise on Meta, LinkedIn, or TikTok?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-xl">
                Our Paid Social service covers the full social advertising landscape — reaching your audience based on who they are, not just what they searched. Many clients run both for complete funnel coverage.
              </p>
            </div>
            <Link to="/services/smm" className="flex-shrink-0">
              <Button variant="outline" className="rounded-sm px-6 gap-2 font-body whitespace-nowrap">
                View Paid Social <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How We Handle Ad Spend */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">How It Works</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-6">
                How We Handle Your Ad Spend
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 font-body">
                Your retainer covers strategy, campaign management, optimization, and reporting across all platforms. The ad spend itself is separate — you pay platforms directly and maintain full control over your budget.
              </p>
              <p className="text-muted-foreground leading-relaxed font-body">
                This model keeps incentives aligned: we succeed when your campaigns perform, not when you spend more. That's why our clients stay month after month.
              </p>
            </div>
            <div className="border border-border rounded-sm p-8 bg-secondary/30">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                What the Retainer Includes
              </p>
              <ul className="space-y-4">
                {[
                  'Full platform audit & strategy development',
                  'Campaign architecture & launch',
                  'AI bid management & budget optimization',
                  'Audience research & targeting',
                  'Ad creative development & testing',
                  'Cross-platform attribution & reporting',
                  'Landing page recommendations & optimization',
                  'Dedicated paid media strategist',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-body">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Common Questions About Search Advertising" />

      <CTASection
        headline="Stop Wasting Ad Spend"
        subtext="Let's put your brand in front of buyers who are actively searching for what you offer. Get a free search audit and see where your campaigns could work harder."
        buttonText="Get Your Free Audit"
      />
    </>
  );
}