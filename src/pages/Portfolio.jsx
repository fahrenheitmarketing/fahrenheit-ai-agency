import React from 'react';
import { mediaUrl } from '@/lib/media';
import CTASection from '../components/shared/CTASection';
import ProjectRow from '../components/portfolio/ProjectRow';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    name: "Briaud Financial Advisors",
    url: "https://briaudfinal.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/1f353ad8a_briaud.webp",
    industry: "Financial Advisory",
    snippet: "A timeless, trust-first design for a fee-only fiduciary that has managed generational wealth since 1986. Cinematic full-bleed landscape imagery communicates permanence and calm — exactly what high-net-worth families want from an advisor.",
    tags: ["Finance", "Wealth Management", "Texas"],
  },
  {
    name: "Blackridge Government Affairs",
    url: "https://blackridge.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/8e39cdef0_blackridge.webp",
    industry: "Government Affairs",
    snippet: "Power meets polish. A dark, authoritative design built for one of Texas's most formidable lobbying practices. Gold accents and Capitol imagery signal influence at the highest level — because their clients demand nothing less.",
    tags: ["Government Affairs", "B2B", "Austin"],
  },
  {
    name: "Concierge Pediatrics",
    url: "https://conciergecare.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/1fa0665e4_concierge.webp",
    industry: "Healthcare",
    snippet: "Warm, reassuring, and conversion-ready. We designed this Miami Beach pediatric practice site to immediately communicate care and accessibility — turning anxious parents into confident members from the first scroll.",
    tags: ["Healthcare", "Pediatrics", "Miami"],
  },
  {
    name: "Greenspoint Dental",
    url: "https://greenspoint.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/398a28bf1_greenspoint.webp",
    industry: "Dental",
    snippet: "No judgment. No jargon. Just a website that books appointments. We built Greenspoint Dental a bilingual, SEO-optimized site that speaks fluent Houston — complete with a $99 new patient special front and center where it matters most.",
    tags: ["Dental", "Healthcare", "Houston"],
  },
  {
    name: "ZOMMA Group CPAs",
    url: "https://zomma-group.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/15eea9c58_zomma.webp",
    industry: "Accounting",
    snippet: "Forbes-recognized and built to look like it. ZOMMA's site pairs a dramatic Miami skyline with bold, confident typography — positioning this award-winning CPA firm as the strategic partner serious businesses actually need.",
    tags: ["Accounting", "Finance", "Miami"],
  },
  {
    name: "Brent Coon & Associates",
    url: "https://bcoon.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/79afaed32_bcoon.webp",
    industry: "Legal",
    snippet: "Over $1 billion recovered. The site had to match the mission. We built a commanding, dark-themed presence for this national trial law firm that radiates authority and turns visitors into clients — fast.",
    tags: ["Legal", "Trial Law", "National"],
  },
  {
    name: "MacLeod & Co. Commercial Real Estate",
    url: "https://macleod.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/aa65a90a0_macleod.webp",
    industry: "Commercial Real Estate",
    snippet: "Close to $800M in closed deals — and a website that owns it. MacLeod's bold, high-contrast design communicates transactional gravity and institutional credibility in the first five seconds. Because in commercial real estate, perception is everything.",
    tags: ["Real Estate", "Commercial", "Southwest U.S."],
  },
  {
    name: "Austin Wealth Management",
    url: "https://austinwealth.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/e34558739_Austinwealth.webp",
    industry: "Wealth Management",
    snippet: "Clarity over complexity. We built Austin Wealth Management a site that speaks directly to young professionals and equity-compensated executives — turning financial anxiety into confidence with warm city imagery and zero sales pressure.",
    tags: ["Finance", "Wealth Management", "Austin"],
  },
  {
    name: "Spring Systems EDI",
    url: "https://springstream.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/037d4081c_Springsystems.webp",
    industry: "B2B SaaS",
    snippet: "EDI integration doesn't have to look boring. Spring Systems gets a clean, product-led design that shows — not just tells — how their platform simplifies retail compliance. The UI mockup hero section does the selling before a single word is read.",
    tags: ["B2B SaaS", "EDI", "Supply Chain"],
  },
  {
    name: "Golden Hour Café & Wine Bar",
    url: "https://goldenhour.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/428a2bf3e_goldenhour.webp",
    industry: "Hospitality",
    snippet: "South Austin's best-kept secret deserves a website that feels as good as that first sip. Lush sunset photography, warm earth tones, and editorial typography make Golden Hour's site as inviting as the patio itself.",
    tags: ["Hospitality", "Restaurant", "Austin"],
  },
  {
    name: "Cuono Engineering",
    url: "https://cuono.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/c24ed56e2_cuono.webp",
    industry: "Structural Engineering",
    snippet: "Heritage and precision in one frame. We built Cuono Engineering a commanding, image-driven site that communicates 25+ years of structural expertise — from historic New York restorations to modern high-rises — without saying a word more than necessary.",
    tags: ["Engineering", "Construction", "New York"],
  },
  {
    name: "TeamLogic IT",
    url: "https://teamlogic.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/ee4806a20_teamlogic.webp",
    industry: "Managed IT Services",
    snippet: "350+ locations. 140,000+ devices managed. The site had to scale to match the brand. We built a clean, stats-forward design for TeamLogic IT that leads with proof — turning skeptical IT buyers into consultation requests before they reach the fold.",
    tags: ["B2B", "Technology", "National"],
  },
  {
    name: "Route-to-Market Imports (RTM)",
    linkLabel: "Visit RTM Imports",
    url: "https://rtm-imports.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/6c36fc1d7_rtm_imports.webp",
    industry: "Beverage Imports",
    snippet: "Thirty years and a national wholesale network, distilled into one bold statement: America's specialist beverage importer. We gave Route-to-Market Imports a rich, editorial design that positions them exactly where they belong — at the top of the category.",
    tags: ["Beverage", "Imports", "National"],
  },
  {
    name: "WestLoop Law",
    url: "https://westlaw.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/fba292e2c_westlaw.webp",
    industry: "Personal Injury Law",
    snippet: "Your lawyer is also a medical doctor. That's a story worth telling — loudly. We built WestLoop Law a conversion-first site that puts the attorney's unique dual credential front and center, turning injured Houstonians into booked case reviews.",
    tags: ["Legal", "Personal Injury", "Houston"],
  },
  {
    name: "Molzahn, Reed & Rouse",
    url: "https://mr2.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/e6ec7f44c_m2rlaw.webp",
    industry: "Civil Litigation",
    snippet: "Reputation. Relationships. Results. M2R is a Chicago firm built for complexity — civil disputes, business counsel, real estate conflict, appellate strategy. We built them a site as serious as their practice: dark, cinematic, and impossible to ignore.",
    tags: ["Legal", "Civil Litigation", "Chicago"],
  },
  {
    name: "Austin Institute of Dental Medicine",
    url: "https://aidm.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/b722dfed2_austin-institute-dental-medicine.webp",
    industry: "Dental Medicine",
    snippet: "A comprehensive dental medical institute where board-certified specialists, CODA Initial Accredited residency programs, and surgical suites converge. We built AIDM a clean, clinical-yet-warm presence that makes an elite care team feel approachable — and bookable.",
    tags: ["Healthcare", "Dental", "Austin"],
  },
  {
    name: "vCompute",
    url: "https://vcompute.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/f8b76ace6_vcompute.webp",
    industry: "AI Infrastructure",
    snippet: "Computation as a physical force. We built vCompute a dark, technical-first site for their Houston data center platform — complete with an interactive GPU pricing calculator that lets buyers size their own cluster before they ever talk to sales.",
    tags: ["Technology", "Data Centers", "Houston"],
  },
  {
    name: "Aplaz Group",
    url: "https://aplaz.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/c0453f9cc_aplaz-group.webp",
    industry: "HR & Payroll Services",
    snippet: "We handle the compliance. You lead the growth. We gave Aplaz a serif-led, editorial design with an employee-count savings calculator — turning outsourced HR and payroll from a grudge purchase into a growth story.",
    tags: ["B2B", "HR & Payroll", "National"],
  },
  {
    name: "M&G Financial Partners",
    url: "https://mng.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/167688a05_mg-financial-partners.webp",
    industry: "Fractional CFO & Accounting",
    snippet: "Growth is a narrative. We authored the strategy. We built M&G a quiet-luxury, private-office aesthetic for their fractional CFO practice — metrics-forward, watermark-branded, and every bit as composed as the financial function they run.",
    tags: ["Finance", "Fractional CFO", "Frisco"],
  },
  {
    name: "Master Fire Prevention",
    url: "https://masterfire.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/1c3df0dab_master-fire-prevention.webp",
    industry: "Fire Protection",
    snippet: "55 years keeping New York City open and compliant. We built Master Fire Prevention an FDNY-credentialed, status-forward site — certifications, response metrics, and a live-quote path that earns trust in the first five seconds.",
    tags: ["Fire Protection", "NYC", "Compliance"],
  },
  {
    name: "Poulson Law Offices",
    url: "https://poulsonlaw.com/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/2d6855d19_poulson-law-offices.webp",
    industry: "Law",
    snippet: "Architects of Resolution. Five decades, two generations, and a Cooperstown practice with Wall Street reach — we built Poulson Law a stately, column-framed presence in navy and gold worthy of the firm's standing.",
    tags: ["Legal", "Estate & Corporate", "New York"],
  },
  {
    name: "Ricki's",
    url: "https://www.rickis.com/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/413f5eebc_rickis.png",
    industry: "Women's Fashion Retail",
    snippet: "A national womenswear retailer with hundreds of stores — and a homepage that had to sell the season in one glance. We built a split-screen hero that pairs quiet, editorial typography with full-bleed campaign photography, letting the product carry the page and the offer sit exactly where a shopper expects it.",
    tags: ["Retail", "Fashion", "E-commerce"],
  },
  {
    name: "Northern Reflections",
    url: "https://www.northernreflections.com/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/25f201430_northernreflections.png",
    industry: "Women's Apparel Retail",
    snippet: "A Canadian apparel brand built on warmth and community, given a storefront to match. Campaign storytelling leads — a charity initiative, layered photography, and a single unmissable call to action — while the promotional bar keeps the current offer in permanent view.",
    tags: ["Retail", "Apparel", "Canada"],
  },
];

export default function Portfolio() {
  return (
    <>
      <div className="min-h-screen bg-background">

        {/* Hero — oversized type on dark */}
        <section className="relative bg-foreground text-background pt-28 pb-20 px-6 lg:px-10 overflow-hidden">
          <span
            aria-hidden="true"
            className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-[0.5em] text-background/30 font-body select-none"
            style={{ writingMode: 'vertical-rl' }}
          >
            Selected Work — Fahrenheit Marketing
          </span>

          <div className="relative max-w-7xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs uppercase tracking-widest text-accent-on-dark mb-8 font-body"
            >
              [ Our Work ]
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.95] max-w-5xl mb-8"
            >
              Websites That Work as Hard as Your Business.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-background/70 font-body text-base md:text-lg leading-relaxed max-w-2xl mb-14"
            >
              From fee-only fiduciaries to national trial law firms, every site we build is designed with one goal: turn the right visitors into the right clients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-x-12 gap-y-6"
            >
              <div>
                <p className="font-heading text-3xl md:text-4xl font-normal">{projects.length}</p>
                <p className="text-[10px] uppercase tracking-widest text-background/50 mt-1 font-body">Case Studies</p>
              </div>
              <div className="w-px h-10 bg-background/15" aria-hidden="true"></div>
              <div>
                <p className="font-heading text-3xl md:text-4xl font-normal">2008</p>
                <p className="text-[10px] uppercase tracking-widest text-background/50 mt-1 font-body">Building Since</p>
              </div>
              <div className="w-px h-10 bg-background/15" aria-hidden="true"></div>
              <div>
                <p className="font-heading text-3xl md:text-4xl font-normal">Austin, TX</p>
                <p className="text-[10px] uppercase tracking-widest text-background/50 mt-1 font-body">Headquarters</p>
              </div>
              <div className="flex items-center gap-2 text-background/50 text-xs uppercase tracking-widest font-body ml-auto">
                Scroll <ArrowDown className="w-4 h-4 animate-bounce" />
              </div>
            </motion.div>
          </div>

          {/* Thumbnail strip */}
          <div className="relative max-w-7xl mx-auto mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee">
              {[...projects, ...projects].map((project, i) => (
                <img
                  key={`${project.name}-${i}`}
                  src={mediaUrl(project.image)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-40 md:h-52 w-auto rounded-sm opacity-60 hover:opacity-100 transition-opacity mr-4"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Index */}
        <section className="py-20 lg:py-24 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                [ Case Studies ]
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-body tabular-nums">
                {projects.length} Projects
              </p>
            </div>
            <div className="border-t border-border">
              {projects.map((project, i) => (
                <ProjectRow key={project.name} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

      </div>

      <CTASection
        headline="Ready to join this lineup?"
        subtext="We build websites that look great and convert. Let's talk about what yours could do."
        buttonText="Start a Project"
      />
    </>
  );
}