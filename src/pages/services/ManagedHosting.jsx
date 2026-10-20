import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ShieldCheck,
  Globe,
  Lock,
  Bot,
  Gauge,
  Server,
  ListChecks,
  CheckCircle,
} from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';
import SectionHeader from '../../components/shared/SectionHeader';

const protectionLayers = [
  {
    icon: ShieldCheck,
    title: 'Unmetered DDoS Protection',
    description:
      'Every site sits behind a global edge network with unmetered DDoS mitigation on every plan. There are no traffic caps and no surge pricing — an attack of any size is absorbed at the edge, far away from your server.',
  },
  {
    icon: Lock,
    title: 'Web Application Firewall',
    description:
      'A managed firewall inspects every request before it reaches your site, blocking common exploit patterns, injection attempts, and known vulnerabilities at the edge — without slowing legitimate visitors down.',
  },
  {
    icon: Bot,
    title: 'Bot & Abuse Management',
    description:
      'Automated traffic is challenged and filtered intelligently. Because aggressive bot rules can interfere with webhooks, payment callbacks, and API integrations, we test and enable bot defenses per site rather than flipping one switch.',
  },
  {
    icon: Gauge,
    title: 'Rate Limiting',
    description:
      'Abusive request rates from a single source are capped at the edge, stopping credential stuffing, form spam, and scraper floods before they ever touch your application.',
  },
  {
    icon: Server,
    title: 'Origin Lockdown',
    description:
      'Your origin server only accepts traffic from the edge network — never from the open internet. We keep the firewall allowlist synchronized with published edge IP ranges as they change, and use authenticated origin pulls so only our edge can reach the server at all.',
  },
  {
    icon: Globe,
    title: 'DNS Management',
    description:
      'We host and manage your DNS with a per-record decision on what gets proxied. Platforms that cannot sit behind a proxy without breaking page delivery or SSL are served DNS-only and hardened at the origin instead — an audit we run on every onboarding.',
  },
];

const faqs = [
  {
    question: 'Is DDoS protection an add-on?',
    answer:
      'No. Unmetered DDoS mitigation is included as standard for every site we host and manage, at every protection tier. An attack of any size is absorbed at the edge with no traffic caps and no surprise bills.',
  },
  {
    question: 'Why do some sites need the advanced tier?',
    answer:
      'The standard tier pairs unmetered DDoS protection with a basic managed firewall — right for brochure sites and landing pages. Content management systems and e-commerce platforms face more application-level attacks, so they run on the advanced tier: the full managed and OWASP firewall rulesets, custom rate limiting rules, and bot management tuned to the site.',
  },
  {
    question: 'Will bot protection break my integrations?',
    answer:
      'Not under our process. Aggressive bot challenges can catch legitimate automated traffic like webhooks and payment callbacks, so we enable bot defenses per site — after testing them against your integrations — rather than by default across the board.',
  },
  {
    question: 'Do I keep ownership of my domain?',
    answer:
      'Yes. Your domain stays yours. We manage DNS and protection on your behalf, and every setting we configure is documented and transferable if you ever leave.',
  },
  {
    question: 'Can you take over hosting for a site that already exists?',
    answer:
      'Yes — and we do it gradually, not with a risky overnight cutover. We start with a full audit of your DNS records to determine what can be proxied and what must remain DNS-only, then stage the firewall, rulesets, bot settings, and origin lockdown with a checklist, verifying each step before moving to the next.',
  },
  {
    question: 'What happens if an attack gets through anyway?',
    answer:
      'The edge blocks the overwhelming majority of attacks before they reach your server. If something does slip past, the origin lockdown ensures the only path in is through the protective edge — so we adjust rules at a single chokepoint, not by scrambling across your infrastructure.',
  },
];

export default function ManagedHosting() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 px-6 overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-60 select-none -z-10"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4 font-body">
              Managed Hosting &amp; Cyber Security
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              Fast by Default, <span className="text-accent">Secure by Design</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Every site we host is placed behind enterprise-grade edge protection as standard — unmetered DDoS
              mitigation, a managed web application firewall, hardened origin servers, and fully managed DNS. You
              get the performance of a global network and a security posture most companies only get after
              something goes wrong.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact">
                <Button size="lg" className="rounded-full px-8 gap-2 font-body">
                  Request a Security Review <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#pricing">
                <Button size="lg" variant="outline" className="rounded-full px-8 font-body">
                  See Pricing
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The standard */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                label="The Standard"
                title="One Security Standard, Applied to Every Site"
                description="Most agencies treat security as an upsell. We treat it as the baseline: every new client engagement starts with the same hardened stack."
                align="left"
              />
              <div className="space-y-4 mt-8">
                {[
                  'Your site is placed behind a global edge network with unmetered DDoS protection on every plan',
                  'The origin server is locked down so only the edge can reach it — never the open internet',
                  'DNS is audited record by record and managed on your behalf, with full documentation',
                  'Bot and abuse defenses are tested against your integrations before they are enabled',
                  'Firewall allowlists are continuously synced as edge IP ranges change',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-foreground text-background rounded-2xl p-10">
              <ShieldCheck className="w-10 h-10 mb-6 text-accent" />
              <h3 className="font-heading text-2xl font-normal mb-4">Attackers Never See Your Server</h3>
              <p className="text-background/70 leading-relaxed mb-4">
                Traffic to your site is filtered at the edge first. Malicious requests, bots, and volumetric
                attacks are dropped in a global network built for exactly this — and only clean, legitimate
                traffic is ever forwarded to your origin.
              </p>
              <p className="text-background/70 leading-relaxed">
                The result is a site that stays online during attacks, loads fast everywhere, and never depends
                on your server being smart enough to defend itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Protection layers */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Protection Layers"
            title="Six Layers Between Your Site and the Internet"
            description="Each layer is managed for you, configured per site, and monitored as one system — not a stack of disconnected settings."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {protectionLayers.map((layer) => (
              <div key={layer.title} className="bg-card p-8 rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <layer.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-normal mb-2">{layer.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{layer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section id="pricing" className="py-24 px-6 bg-secondary/30 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Protection Tiers"
            title="The Right Level of Protection for Each Site"
            description="Every site gets the standard. Sites that face heavier application-level attack traffic get the advanced tier by default. Enterprise organizations get a dedicated, custom-scoped security program."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {/* Standard */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-3">
                Standard — included with every managed site
              </p>
              <p className="font-heading text-4xl font-normal mb-1">
                $500
                <span className="text-sm text-muted-foreground font-body font-normal">/month</span>
              </p>
              <h3 className="font-heading text-2xl font-normal mb-4 mt-2">Essential Protection</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                The baseline for brochure sites, landing pages, and marketing properties. Unmetered DDoS
                protection paired with a basic managed firewall — simple, reliable coverage against the attacks
                most sites will actually face.
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  'Unmetered DDoS mitigation — every plan, no traffic caps',
                  'Basic managed firewall ruleset at the edge',
                  'Conservative rate limiting against abusive sources',
                  'Bot defenses enabled per site after testing',
                  'Fully managed DNS with a proxied vs. DNS-only audit',
                  'Origin lockdown: allowlist plus authenticated origin pulls',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Advanced */}
            <div className="bg-card border-2 border-accent rounded-2xl p-8 relative">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                  Advanced — for content platforms &amp; e-commerce
                </p>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent font-body border border-accent rounded-full px-2 py-0.5">
                  Recommended
                </span>
              </div>
              <p className="font-heading text-4xl font-normal mb-1">
                $750
                <span className="text-sm text-muted-foreground font-body font-normal">/month</span>
              </p>
              <h3 className="font-heading text-2xl font-normal mb-4 mt-2">Advanced Protection</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Content management systems and e-commerce platforms draw application-level attacks the basic
                firewall tier is not built to stop. The advanced tier adds the full rulesets and fine-grained
                controls those sites need — and your monthly fee also covers ongoing CMS and plugin updates, so
                your site's software never falls behind its security patches.
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  'Everything in Essential Protection',
                  'Full managed ruleset with application-specific exploit rules',
                  'OWASP ruleset covering the broadest class of web vulnerabilities',
                  'Custom rate limiting rules tuned to your real traffic patterns',
                  'Bot management with per-integration exceptions',
                  'CMS core and plugin updates, applied and verified',
                  'Priority response when a rule change is needed',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-foreground text-background rounded-2xl p-8 border-2 border-foreground">
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-3 font-body">
                Enterprise
              </span>
              <p className="font-heading text-4xl font-normal mb-1">
                Custom
                <span className="text-sm text-background/60 font-body font-normal">/month</span>
              </p>
              <h3 className="font-heading text-2xl font-normal mb-4 mt-2">Enterprise Protection</h3>
              <p className="text-background/70 text-sm leading-relaxed mb-6">
                For organizations with complex infrastructure, compliance obligations, and multiple web
                properties. This is the level of enterprise hosting and security our team has delivered for
                brands like PepsiCo, RJ Reynolds, and QuikTrip — a dedicated program built around your stack,
                not a shared configuration.
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  'Dedicated security architecture and threat modeling',
                  'Custom firewall rulesets aligned to compliance requirements (PCI, HIPAA)',
                  'Multi-property management with consolidated executive reporting',
                  'Dedicated incident response with post-incident reviews',
                  'Application-aware bot mitigation tuned to your traffic',
                  'SLA-backed response times',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="mt-8 block">
                <Button className="w-full rounded-full font-body bg-accent text-white hover:bg-accent/90">
                  Talk to Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Migration */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ListChecks className="w-10 h-10 text-accent mb-6" />
              <h2 className="font-heading text-3xl md:text-4xl font-normal mb-6">
                Already Hosted Somewhere Else? We Move You Gradually.
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Taking over an existing site is not an overnight cutover. We migrate each property in stages,
                verifying at every step that nothing breaks — so your traffic and your team never notice the
                moment protection switches on.
              </p>
            </div>
            <div className="bg-secondary/50 border border-border rounded-2xl p-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
                The migration checklist
              </p>
              <ol className="relative border-l border-border pl-6 space-y-5">
                {[
                  'Full DNS audit — every record classified as proxied or DNS-only, with compatibility checked per platform',
                  'Origin firewall baseline applied and verified before traffic shifts',
                  'Firewall rulesets deployed, then tested against real traffic',
                  'Bot settings validated against webhooks, payment callbacks, and API integrations',
                  'Origin lockdown completed — allowlist synced and authenticated origin pulls enabled',
                  'Staged cutover with monitoring at each step, and a documented rollback path',
                ].map((step, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-card" />
                    <p className="text-sm text-foreground/85 leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Centralized management */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="bg-foreground text-background rounded-2xl p-10">
              <Globe className="w-10 h-10 mb-6 text-accent" />
              <h3 className="font-heading text-2xl font-normal mb-4">Every Site, One Pane of Glass</h3>
              <p className="text-background/70 leading-relaxed mb-4">
                We manage protection for our entire client portfolio from a single multi-tenant dashboard — one
                view of every site, one centralized billing relationship, and one team watching the edge at all
                times.
              </p>
              <p className="text-background/70 leading-relaxed">
                That structure means faster response when something happens, consistent standards across every
                property, and no client left on a forgotten configuration.
              </p>
            </div>
            <div>
              <SectionHeader
                label="Managed, Not Just Configured"
                title="Security Is a Program, Not a Setup Task"
                description="Firewalls decay, IP ranges change, and new attack patterns appear weekly. Configuration is where we start — ongoing management is the service."
                align="left"
              />
              <div className="space-y-4 mt-8">
                {[
                  'Continuous monitoring of edge security events across your properties',
                  'Firewall allowlists updated automatically as edge IP ranges change',
                  'Rules reviewed and tuned as your traffic patterns evolve',
                  'Clear, plain-language reporting on what was blocked and why',
                  'Documentation you keep — every setting is written down and transferable',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title="Common Questions About Managed Hosting &amp; Security" />

      <CTASection
        headline="When Was the Last Time Anyone Audited Your Site's Security?"
        subtext="We'll review your current hosting and DNS setup and tell you exactly where you're exposed — no obligation, no scare tactics, just findings."
        buttonText="Book a strategy call"
      />
    </>
  );
}