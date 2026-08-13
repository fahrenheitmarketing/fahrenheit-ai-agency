import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CTASection from '../components/shared/CTASection';

const stats = [
{ value: '2008', label: 'Founded in Austin, TX' },
{ value: '18+', label: 'Years in Business' },
{ value: '350+', label: 'Global Clients Served' },
{ value: "100%", label: "Monthly Retainers" }];


const values = [
{
  num: '01',
  title: 'AI-First, Always',
  description: 'Every process, strategy, and decision is enhanced by artificial intelligence — not as a gimmick, but as a fundamental competitive advantage for our clients.'
},
{
  num: '02',
  title: 'Radical Transparency',
  description: 'No hidden fees, no jargon, no smoke and mirrors. You see exactly what we do, why we do it, and what it costs. Month-to-month because we believe in earning trust.'
},
{
  num: '03',
  title: 'Human + Machine',
  description: 'AI handles the data, pattern recognition, and optimization. Our experienced team handles strategy, creativity, and relationships. The best of both worlds.'
},
{
  num: '04',
  title: 'Results Over Everything',
  description: "We don't celebrate vanity metrics. We celebrate revenue growth, conversion improvements, and ROI. If it doesn't move your business forward, we don't do it."
}];


export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">About Fahrenheit</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] mb-8">
                The Agency That<br />
                <span className="italic">Bets on Itself</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4 font-body">
                Since 2008, Fahrenheit Marketing has been at the forefront of digital innovation. Today, we're an AI-first agency — combining intelligent technology with seasoned professionals to deliver marketing that actually works.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 font-body">
                We don't ask for long-term contracts because we don't need them. Our work speaks for itself, month after month.
              </p>
              <Link to="/contact">
                <Button size="lg" className="rounded-sm px-8 gap-2 font-body bg-accent hover:bg-accent/90 text-white border-0">
                  Let's Talk <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-px bg-border border border-border">
              {stats.map((s) =>
              <div key={s.label} className="bg-secondary/50 hover:bg-secondary transition-colors duration-200 p-8">
                  <p className="font-heading text-4xl font-normal text-foreground mb-1">{s.value}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">{s.label}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ricardo Bio */}
      <section className="py-24 px-6 bg-secondary/30 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-16 font-body">Leadership</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Identity */}
            <div>
              <div className="aspect-[4/3] bg-foreground rounded-sm overflow-hidden mb-8 relative">
                <img
                  src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/1e2a5c8c8_generated_image.png"
                  alt="Ricardo Casas"
                  className="w-full h-full object-cover object-top opacity-90" />
                
              </div>
              <div className="border-t border-border pt-6">
                <h2 className="font-heading text-3xl font-normal mb-1">Ricardo Casas</h2>
                <p className="text-xs uppercase tracking-widest text-accent font-body mb-4">Founder & CEO</p>
                <div className="flex gap-4">
                  <a href="https://www.linkedin.com/in/ricardocasas" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-body">LinkedIn ↗</a>
                  <a href="https://forbes.com/councils/forbesagencycouncil/people/ricardocasas/" target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors font-body">Forbes Council ↗</a>
                </div>
              </div>
            </div>

            {/* Right — Bio */}
            <div className="space-y-6 pt-2">
              <p className="font-heading text-2xl md:text-3xl font-normal leading-snug">
                "I left a larger outfit, tired of the attitude. I knew we could deliver enterprise-level results with humility and better data."
              </p>
              <p className="text-muted-foreground leading-relaxed font-body">
                Ricardo Casas founded Fahrenheit Marketing in April 2008 — right as the financial crisis was reshaping how businesses thought about marketing. Formally trained as a creative director but wired like a data strategist, Ricardo built Fahrenheit on a simple premise: exceptional work, radical transparency, and zero long-term contracts.
              </p>
              <p className="text-muted-foreground leading-relaxed font-body">
                The agency was profitable from day one. By 2010, Fahrenheit had signed its first publicly traded client. Today, the agency's portfolio includes PepsiCo, Gatorade, QuikTrip, CITGO, TransCore, the Barbara Bush Foundation, RJ Reynolds, and more — all served by a team with an average tenure of 11 years and senior staff bringing as many as 25 years of industry experience.
              </p>
              <p className="text-muted-foreground leading-relaxed font-body">
                A Forbes Agency Council member and longtime Austin resident, Ricardo is a vocal champion of data-first strategy — long before AI made it fashionable. He is a proud father of six, a passionate home cook, and someone who defines success not by the size of the deal, but by the depth of the relationship.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="bg-foreground text-background p-6 rounded-sm">
                  <p className="font-heading text-3xl font-normal">25+</p>
                  <p className="text-xs uppercase tracking-widest text-background/60 font-body mt-1">Years in Digital Marketing</p>
                </div>
                <div className="bg-accent text-white p-6 rounded-sm">
                  <p className="font-heading text-3xl font-normal">11 yrs</p>
                  <p className="text-xs uppercase tracking-widest text-white/70 font-body mt-1">Avg. Employee Tenure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-16 font-body">Our Philosophy</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            <div className="lg:col-span-1 pr-0 lg:pr-16 mb-12 lg:mb-0">
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15]">
                What We Stand For
              </h2>
            </div>
            <div className="lg:col-span-2">
              {values.map((v) =>
              <div key={v.num} className="py-8 border-t border-border">
                  <div className="flex items-start gap-8">
                    <span className="text-xs text-muted-foreground font-body pt-1 flex-shrink-0">{v.num}</span>
                    <div>
                      <h3 className="font-heading text-xl font-normal mb-2">{v.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed font-body">{v.description}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Built on Trust */}
      <section className="py-24 px-6 bg-foreground text-background border-b border-border overflow-hidden relative">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[360px] pointer-events-none opacity-10 select-none" />
        
        <div className="max-w-7xl mx-auto relative">
          <p className="text-xs uppercase tracking-widest text-background/40 mb-6 font-body">Account Management</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.1] mb-6">
                Built on Trust,<br />
                <span className="italic">Not Just Deliverables</span>
              </h2>
              <p className="text-background/60 font-body leading-relaxed">
                Most agencies keep you at arm's length. We pull up a chair.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-background/70 font-body leading-relaxed">
                At Fahrenheit, we're not the suit-and-tie type. We're an Austin-based team that believes the best client relationships are built on straight talk, shared goals, and genuine investment in each other's success. That's not a tagline — it's just how we work.
              </p>
              <p className="text-background/70 font-body leading-relaxed">
                Every client gets a dedicated partner who communicates proactively, keeps you informed without you having to ask, and gives you direct access to the people actually doing the work. No gatekeeping, no runaround, no waiting three days for a reply to a simple question.
              </p>
              <p className="text-background/70 font-body leading-relaxed">
                We've built long-term relationships with clients across healthcare, eCommerce, legal, and beyond — not because we lock anyone in, but because we show up consistently and make it easy to keep working together. When your business grows, changes direction, or hits a wall, we're already in the room.
              </p>
              <div className="grid grid-cols-3 gap-px bg-background/10 border border-background/10 mt-8">
                {[
                { label: 'Transparent reporting' },
                { label: 'Honest conversations' },
                { label: 'Your budget, treated like our own' }].
                map((item) =>
                <div key={item.label} className="bg-background/5 px-6 py-5">
                    <span className="block w-1.5 h-1.5 rounded-full bg-accent mb-3" />
                    <p className="text-xs uppercase tracking-widest text-background/60 font-body">{item.label}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI-First */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">Our Approach</p>
              <h2 className="font-heading text-4xl md:text-5xl font-normal leading-[1.15] mb-6">Why AI-First?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4 font-body">
                Traditional agencies hire more people to do more work. We build smarter systems. Our AI-first approach means your campaigns are optimized 24/7, insights surface in real-time, and every decision is backed by data — not guesswork.
              </p>
              <p className="text-muted-foreground leading-relaxed font-body">
                This isn't about replacing human expertise — it's about amplifying it. Our strategists think bigger because AI handles the data. Your investment goes further because AI eliminates waste. The result? Better outcomes at lower cost.
              </p>
            </div>
            <div className="bg-foreground text-background rounded-sm p-10 space-y-8">
              {[
              { label: 'Campaign Optimization', detail: '24/7 AI monitoring & adjustment', to: '/services/sem' },
              { label: 'Data Interpretation', detail: 'Real-time insights, not monthly reports', to: '/services/strategy' },
              { label: 'Budget Efficiency', detail: 'AI eliminates waste before it happens', to: '/services/cro' },
              { label: 'Competitive Intelligence', detail: 'Continuous market signal analysis', to: '/services/seo' }].
              map((item) =>
              <Link key={item.label} to={item.to} className="flex items-start justify-between gap-4 border-b border-background/10 pb-6 last:border-0 last:pb-0 group">
                  <div>
                    <p className="text-sm font-medium text-background font-body">{item.label}</p>
                    <p className="text-xs text-background/50 font-body mt-0.5">{item.detail}</p>
                  </div>
                  <span className="text-accent text-lg flex-shrink-0 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Let's Build Something Great Together"
        subtext="No contracts. No commitments. Just a conversation about how AI-first marketing can grow your business."
        buttonText="Start the Conversation" />
      
    </>);

}