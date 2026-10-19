import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Crosshair, PenLine, Radar, CheckCircle, Mail } from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';
import SectionHeader from '../../components/shared/SectionHeader';
import EmailEstimator from '../../components/services/EmailEstimator';

const faqs = [
  {
    question: 'Is cold email still effective?',
    answer: 'Yes — when it is precise. Cold email remains one of the highest-ROI channels for B2B because it puts your offer directly in front of a named decision-maker with no algorithm in between. Results depend entirely on targeting, deliverability, and message quality, which is exactly what this service is built to manage.',
  },
  {
    question: 'What does the $1,500 setup fee cover?',
    answer: 'Setup covers your sending infrastructure: domain and mailbox provisioning, warmup, authentication (SPF, DKIM, DMARC), list building to your ICP, and the writing of your opening sequence. It is a one-time fee before your first campaign goes out.',
  },
  {
    question: 'How do you protect deliverability?',
    answer: 'We spread volume across warmed, authenticated inboxes, cap daily sends per mailbox, purge unengaged and risky contacts continuously, and monitor spam placement on every send. A healthy sender reputation is the foundation of the whole channel — we treat it that way.',
  },
  {
    question: 'Will you write the emails, or do we?',
    answer: 'We do. Messaging is part of the retainer: research-backed angles, copy written for a named audience, subject lines tested, and sequences refined from reply data every month. You approve the voice and offers — we handle the rest.',
  },
  {
    question: 'Is this compliant with CAN-SPAM and GDPR?',
    answer: 'Yes. Every campaign includes accurate sender identification, a physical address, opt-out handling, and honor-of-requests within required windows. For EU outreach we target under legitimate-interest guidelines and exclude opt-outs immediately across all sequences.',
  },
  {
    question: 'How is this different from marketing automation we already run?',
    answer: 'Marketing automation warms people who already know you. Cold email creates new conversations with prospects who do not. The two work best together: cold email fills the top of the funnel, and your automation nurtures the replies into pipeline.',
  },
];

const pillars = [
  {
    icon: Radar,
    title: 'Cold Email Strategy',
    description: 'We design the program around your revenue goal, not a blast list: offer positioning, sequencing cadence, sender infrastructure, and a weekly testing plan that compounds response rates month over month.',
  },
  {
    icon: Crosshair,
    title: 'Targeting',
    description: 'We build your ideal customer profile, then source decision-makers who match it — filtered by role, company size, and buying signals — so every send lands in an inbox that has a reason to care.',
  },
  {
    icon: PenLine,
    title: 'Messaging',
    description: 'Research-backed copy written for one reader at a time. Short, specific, human. Every sequence is A/B tested and rewritten monthly based on what the replies tell us.',
  },
];

const plans = [
  { name: 'Growth', price: 2500, volume: 25000, features: ['Full strategy & sequencing', 'ICP building & list sourcing', 'Copywriting & A/B testing', 'Deliverability management', 'Monthly reporting & optimization'] },
  { name: 'Scale', price: 5000, volume: 60000, features: ['Everything in Growth', 'Multi-segment targeting', 'Additional sending domains', 'Reply-handling workflows', 'Dedicated campaign manager'] },
  { name: 'Enterprise', price: 7500, volume: 100000, features: ['Everything in Scale', 'Custom audience modeling', 'Channel expansion (LinkedIn follow-up)', 'Quarterly strategy reviews', 'Priority build-out of new segments'] },
];

export default function EmailMarketing() {
  return (
    <>
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none rotate-180 -z-10"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4 font-body">
              Email Marketing
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              Cold Email That <span className="text-accent">Opens Doors</span>, Not Spam Folders
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We run precision cold email programs end to end — strategy, targeting, messaging, and deliverability — putting your offer in front of decision-makers who have a reason to reply.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 gap-2 font-body">
                  Request a Strategy Session <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a
                href="#estimator"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('estimator').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Button size="lg" variant="outline" className="rounded-full px-8 font-body">
                  Estimate your pipeline
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="estimator" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Pipeline Estimator"
            title="What Could Cold Email Be Worth to You?"
            description="Set your monthly volume and the value of a single lead. We apply a 2% average response rate to show the conversation and pipeline your program could generate."
          />
          <EmailEstimator />
        </div>
      </section>

      <section id="pricing" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Pricing"
            title="Simple Tiers, Priced by Delivered Volume"
            description="Every plan includes strategy, targeting, messaging, and deliverability management. One-time setup fee of $1,500."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.name} className="bg-card p-8 rounded-2xl border border-border flex flex-col">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-3">{plan.name}</p>
                <p className="font-heading text-4xl font-normal mb-1">
                  ${new Intl.NumberFormat('en-US').format(plan.price)}
                  <span className="text-sm text-muted-foreground font-body font-normal">/month</span>
                </p>
                <p className="text-sm text-accent font-medium font-body mb-6">
                  {new Intl.NumberFormat('en-US').format(plan.volume)} emails delivered monthly
                </p>
                <div className="space-y-3 pt-6 border-t border-border flex-1">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/contact" className="mt-8">
                  <Button className="w-full rounded-full font-body">{`Start with ${plan.name}`}</Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground font-body mt-8">
            One-time setup fee: <span className="text-foreground font-medium">$1,500</span> — covers sending infrastructure, domain warmup, list building, and your opening sequence.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="The Program"
            title="Three Disciplines, One Outcome: Replies"
            description="Cold email fails when any one of these is weak. We run all three as a single, managed system."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="bg-card p-8 rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <pillar.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-normal mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">Deliverability Is the Whole Game</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Most cold email fails before it is read — filtered, blocked, or dropped into spam. We build the sending infrastructure first: authenticated domains, warmed inboxes, and sending caps that keep your sender reputation clean for the long haul.
              </p>
              <div className="space-y-4">
                {['Dedicated sending domains with full authentication (SPF, DKIM, DMARC)', 'Gradual mailbox warmup before the first campaign', 'Daily send caps and rotation across inboxes', 'Continuous list hygiene and risky-contact suppression', 'Inbox placement monitoring on every campaign', 'Immediate opt-out handling and compliance'].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-foreground text-background rounded-2xl p-10">
              <Mail className="w-10 h-10 mb-6 text-accent" />
              <h3 className="font-heading text-2xl font-normal mb-4">Measured in Conversations</h3>
              <p className="text-background/70 leading-relaxed mb-4">
                We do not report on sends — we report on replies, meetings booked, and pipeline created. Every month you see exactly how many conversations your program produced and what the next month's tests are.
              </p>
              <p className="text-background/70 leading-relaxed">
                And because the channel compounds — better lists, sharper copy, cleaner reputation — response rates trend upward the longer we run it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Common Questions About Cold Email" />

      <CTASection
        headline="Your Next Customer Hasn't Heard of You Yet."
        subtext="A managed cold email program from $2,500/month. A 30-minute strategy call is free — we'll pressure-test whether cold email fits your growth model before you spend a dollar."
        buttonText="Book a strategy call"
      />
    </>
  );
}