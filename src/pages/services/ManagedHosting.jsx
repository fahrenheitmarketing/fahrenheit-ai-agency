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
  Activity,
  Database,
  KeyRound,
  ScanSearch,
} from 'lucide-react';
import CTASection from '../../components/shared/CTASection';
import FAQSection from '../../components/shared/FAQSection';
import SectionHeader from '../../components/shared/SectionHeader';

const protectionLayers = [
  {
    icon: ShieldCheck,
    title: 'Unmetered DDoS Protection',
    description:
      'Every site sits behind a global edge network with unmetered DDoS mitigation on every plan — no traffic caps and no surge pricing. This layer is strongest against volumetric attacks that try to knock a site offline, absorbing them at the edge, far away from your server.',
  },
  {
    icon: Lock,
    title: 'Web Application Firewall',
    description:
      'A managed firewall inspects requests before they reach your site, blocking common exploit patterns and known vulnerabilities. Every plan includes the basic managed ruleset; the advanced tier adds the full managed and OWASP rulesets for sites facing heavier application-level attack traffic.',
  },
  {
    icon: Bot,
    title: 'Bot & Abuse Management',
    description:
      'Automated traffic is challenged and filtered. Because aggressive bot rules can interfere with webhooks, payment callbacks, and API integrations, we test and enable bot defenses per site rather than flipping one switch.',
  },
  {
    icon: Gauge,
    title: 'Rate Limiting',
    description:
      'Abusive request rates from a single source are capped at the edge, discouraging credential stuffing, form spam, and scraper floods before they ever touch your application.',
  },
  {
    icon: Server,
    title: 'Origin Lockdown',
    description:
      'Your origin server only accepts traffic that has come through the edge network — never the open internet. We keep the server firewall aligned with the edge network’s published IP ranges, and use authenticated origin pulls so only the edge can reach the server at all.',
  },
  {
    icon: Globe,
    title: 'DNS Management',
    description:
      'We manage your DNS, routing domains and subdomains through the edge network whenever possible so every visitor passes through protection first. Platforms that cannot sit behind a proxy without breaking page delivery or SSL are served DNS-only and hardened at the origin instead — an audit we run on every onboarding.',
  },
];

const fundamentals = [
  {
    icon: Activity,
    title: '24/7 Uptime Monitoring',
    description:
      'Your site is checked around the clock through our Fahrenheit Center monitoring platform. If the site goes down, slows down, or has an SSL certificate problem, our team is alerted immediately by email and chat — we often catch problems before you notice them.',
  },
  {
    icon: Database,
    title: 'Regular Backups',
    description:
      'Daily or weekly backups depending on your plan, so if something goes wrong we can restore your site quickly rather than rebuilding it from scratch.',
  },
  {
    icon: KeyRound,
    title: 'Two-Factor Authentication',
    description:
      'Every WordPress login on sites we manage requires 2FA, so a stolen password alone is never enough to get in.',
  },
  {
    icon: ScanSearch,
    title: 'Malware Scanning',
    description:
      'Security tooling scans the site for malware, suspicious file changes, and login attacks — catching the quiet signs of trouble before they become an incident.',
  },
  {
    icon: CheckCircle,
    title: 'WordPress & Plugin Updates',
    description:
      'Outdated plugins are one of the most common ways sites get hacked, so WordPress core and plugin updates are applied and verified on every plan — not just the top tier. Most “simple” sites run WordPress, and they get the same maintenance as everyone else.',
  },
  {
    icon: ListChecks,
    title: 'Documented Settings',
    description:
      'Every protection and hosting setting we configure is written down and transferable. If you ever leave, you keep the documentation and your domain — nothing is held hostage.',
  },
];

const faqs = [
  {
    question: 'Is DDoS protection an add-on?',
    answer:
      'No. Every site we host sits behind the edge network with unmetered DDoS mitigation, at every tier. This layer is strongest against volumetric attacks that aim to take a site offline, and there are no traffic caps or surprise bills for it.',
  },
  {
    question: 'Why do some sites need the advanced tier?',
    answer:
      'The standard tier uses the edge network’s free protection — excellent against attacks that try to knock a site offline, and the right fit for most marketing sites. More targeted, application-level attacks (exploits aimed at a CMS or e-commerce platform) need the paid edge features, which the advanced tier includes — the cost of the paid edge plan is covered in your monthly fee, so there is nothing for you to purchase or manage.',
  },
  {
    question: 'Will bot protection break my integrations?',
    answer:
      'It can, if it is enabled carelessly — aggressive bot challenges can catch legitimate automated traffic like webhooks and payment callbacks. That is exactly why we enable bot defenses per site, after testing them against your integrations, rather than by default across the board.',
  },
  {
    question: 'Do I keep ownership of my domain?',
    answer:
      'Yes. Your domain stays yours. We manage DNS and protection on your behalf, and every setting we configure is documented and transferable if you ever leave.',
  },
  {
    question: 'Can you guarantee my site will never be attacked?',
    answer:
      'No — and we would be wary of anyone who says otherwise. Each layer we manage makes an attack meaningfully harder, and together they lower the risk a lot, but no setup removes it completely. Security is shared work: we handle the layers, keep the software current, and monitor around the clock, and we ask clients to keep their own credentials and accounts hygienic too.',
  },
  {
    question: 'Can you take over hosting for a site that already exists?',
    answer:
      'Yes — and we do it gradually, not with a risky overnight cutover. We start with a full audit of your DNS records to determine what can be routed through the edge and what must remain DNS-only, then stage the firewall, rulesets, bot settings, and origin lockdown with a checklist, verifying each step before moving to the next.',
  },
  {
    question: 'What happens if my site gets hacked anyway?',
    answer:
      'We restore your site from a recent backup — a clean snapshot taken before the incident — rather than patching over a compromise we cannot fully trust. Recovery from a current backup is measured in hours, not days. From there we trace how the attacker got in, close that path at the edge or the origin, and compare the restored site against your most recent records to mitigate any data loss. Our monitoring usually tells us something is wrong quickly, so the window between incident and restore stays short.',
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
          className="absolute bottom-0 left-0 w-[420px] pointer-events-none opacity-60 select-none"
        />
        <img
          src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-60 select-none rotate-180"
        />
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent mb-4 font-body">
              Managed Hosting &amp; Cyber Security
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6">
              Fast by Default, <span className="text-accent">Secure by Design</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Every site we host is placed behind enterprise-grade edge protection as standard — unmetered DDoS
              mitigation, a managed web application firewall, hardened origin servers, fully managed DNS, and
              round-the-clock monitoring. You get the performance of a global network and a security posture most
              companies only get after something goes wrong.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 border-l-2 border-accent pl-4">
              We’ll be straight with you: this is a strong layer of protection, not a guarantee. Each layer
              makes an attack meaningfully harder, security is shared work, and no one can honestly promise zero
              risk.
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
                  'Your site runs on a dedicated server — isolated resources on every plan, at every tier',
                  'All traffic is routed through a global edge network first, whenever the platform allows it',
                  'The origin server only accepts traffic that has already passed through the edge',
                  'DNS is audited record by record and managed on your behalf, with full documentation',
                  'WordPress core and plugin updates are applied and verified on every plan',
                  'Backups, uptime monitoring, malware scanning, and 2FA logins are standard on every plan',
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
              <h3 className="font-heading text-2xl font-normal mb-4">Two Layers, Working Together</h3>
              <p className="text-background/70 leading-relaxed mb-4">
                All traffic goes through the edge network first, where attack traffic and bad bots are filtered
                out and your server’s address stays hidden. Then the server firewall makes sure nobody can
                simply go around that first layer and reach the server directly.
              </p>
              <p className="text-background/70 leading-relaxed">
                Two layers working together lower the risk a lot — but they don’t remove it completely, and
                no setup can. If something does happen, our monitoring alerts our team quickly and we restore
                your site from a recent backup.
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

      {/* Hosting fundamentals */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            label="Hosting Fundamentals"
            title="The Basics Done Right, On Every Plan"
            description="Security gets the headlines, but solid hosting is mostly about the unglamorous work: monitoring, backups, updates, and clean credentials. All of it is included at every tier."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fundamentals.map((item) => (
              <div key={item.title} className="bg-card p-8 rounded-2xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-normal mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
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
            description="Every plan includes a dedicated server, the protection layers above, and all the hosting fundamentals. Sites that face heavier application-level attack traffic need the edge network’s paid features, which the advanced tier includes — and enterprise organizations get a dedicated, custom-scoped security program."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {/* Standard */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-body mb-3">
                Standard
              </p>
              <p className="font-heading text-4xl font-normal mb-1">
                $500
                <span className="text-sm text-muted-foreground font-body font-normal">/month</span>
              </p>
              <h3 className="font-heading text-2xl font-normal mb-4 mt-2">Essential Protection</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                The baseline for brochure sites, landing pages, and marketing properties, built on the edge
                network’s free protection tier — excellent against attacks that try to take a site offline,
                with the basics covered for everything else.
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  'Unmetered DDoS mitigation — no traffic caps',
                  'Basic managed firewall ruleset at the edge',
                  'Conservative rate limiting against abusive sources',
                  'Bot defenses enabled per site after testing',
                  'Fully managed DNS with a proxied vs. DNS-only audit',
                  'Origin lockdown: edge-only allowlist plus authenticated origin pulls',
                  'WordPress core and plugin updates, applied and verified',
                  'Weekly backups with quick restore',
                  '24/7 uptime monitoring, malware scanning, and 2FA logins',
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
                Content management systems and e-commerce platforms draw more targeted, application-level attacks
                the free tier is not built to stop. The advanced tier adds the edge network’s paid features
                and fuller rulesets — the cost of the paid plan is covered in your monthly fee, so there is
                nothing for you to buy or manage.
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  'Everything in Essential Protection',
                  'The edge network’s paid (Pro) protection features, covered in your fee',
                  'Full managed ruleset with application-specific exploit rules',
                  'OWASP ruleset covering broader classes of web vulnerabilities',
                  'Custom rate limiting rules tuned to your real traffic patterns',
                  'Bot management with per-integration exceptions',
                  'Daily backups instead of weekly',
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
                For organizations with complex infrastructure, multiple web properties, and security
                requirements that don’t fit a menu. We scope a dedicated program around your stack and your
                risk profile — not a shared configuration.
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  'Dedicated security architecture and threat modeling',
                  'Multi-property management with consolidated reporting',
                  'Dedicated incident response with post-incident reviews',
                  'Application-aware bot mitigation tuned to your traffic',
                  'Custom rulesets aligned to your requirements',
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
                  'Full DNS audit — every record classified as routed through the edge or DNS-only, with compatibility checked per platform',
                  'Origin firewall baseline applied and verified before traffic shifts',
                  'Firewall rulesets deployed, then tested against real traffic',
                  'Bot settings validated against webhooks, payment callbacks, and API integrations',
                  'Origin lockdown completed — edge-only allowlist and authenticated origin pulls',
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
              <Activity className="w-10 h-10 mb-6 text-accent" />
              <h3 className="font-heading text-2xl font-normal mb-4">Watching Your Site Around the Clock</h3>
              <p className="text-background/70 leading-relaxed mb-4">
                Our monitoring platform checks every site we host continuously — uptime, response times, and SSL
                certificates. When something is wrong, our team is alerted immediately by email and chat, and we
                often catch problems before you notice them.
              </p>
              <p className="text-background/70 leading-relaxed">
                That structure means consistent standards across every property we manage, and no client left on
                a forgotten configuration.
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
                  '24/7 uptime monitoring with immediate alerts to our team',
                  'Server firewall kept aligned with the edge network’s published IP ranges as they change',
                  'Rules reviewed and tuned as your traffic patterns evolve',
                  'WordPress core and plugin updates applied and verified',
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