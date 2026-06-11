import React from 'react';
import { Link } from 'react-router-dom';
import CTASection from '../components/shared/CTASection';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    name: "Briaud Financial Advisors",
    url: "https://briaudfinal.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/f32b50479_briaud.png",
    industry: "Financial Advisory",
    snippet: "A timeless, trust-first design for a fee-only fiduciary that has managed generational wealth since 1986. Cinematic full-bleed landscape imagery communicates permanence and calm — exactly what high-net-worth families want from an advisor.",
    tags: ["Finance", "Wealth Management", "Texas"],
  },
  {
    name: "Blackridge Government Affairs",
    url: "https://blackridge.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/b666f575b_blackridge.png",
    industry: "Government Affairs",
    snippet: "Power meets polish. A dark, authoritative design built for one of Texas's most formidable lobbying practices. Gold accents and Capitol imagery signal influence at the highest level — because their clients demand nothing less.",
    tags: ["Government Affairs", "B2B", "Austin"],
  },
  {
    name: "Concierge Pediatrics",
    url: "https://conciergecare.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/f760fc864_concierge.png",
    industry: "Healthcare",
    snippet: "Warm, reassuring, and conversion-ready. We designed this Miami Beach pediatric practice site to immediately communicate care and accessibility — turning anxious parents into confident members from the first scroll.",
    tags: ["Healthcare", "Pediatrics", "Miami"],
  },
  {
    name: "Greenspoint Dental",
    url: "https://greenspoint.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/fd14ca806_greens.png",
    industry: "Dental",
    snippet: "No judgment. No jargon. Just a website that books appointments. We built Greenspoint Dental a bilingual, SEO-optimized site that speaks fluent Houston — complete with a $99 new patient special front and center where it matters most.",
    tags: ["Dental", "Healthcare", "Houston"],
  },
  {
    name: "ZOMMA Group CPAs",
    url: "https://zomma-group.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/30f79e425_zomma.png",
    industry: "Accounting",
    snippet: "Forbes-recognized and built to look like it. ZOMMA's site pairs a dramatic Miami skyline with bold, confident typography — positioning this award-winning CPA firm as the strategic partner serious businesses actually need.",
    tags: ["Accounting", "Finance", "Miami"],
  },
  {
    name: "Brent Coon & Associates",
    url: "https://bcoon.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5a8f48e31_bcoon.png",
    industry: "Legal",
    snippet: "Over $1 billion recovered. The site had to match the mission. We built a commanding, dark-themed presence for this national trial law firm that radiates authority and turns visitors into clients — fast.",
    tags: ["Legal", "Trial Law", "National"],
  },
  {
    name: "MacLeod & Co. Commercial Real Estate",
    url: "https://mcleod.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/d29162b19_macleod.png",
    industry: "Commercial Real Estate",
    snippet: "Close to $800M in closed deals — and a website that owns it. MacLeod's bold, high-contrast design communicates transactional gravity and institutional credibility in the first five seconds. Because in commercial real estate, perception is everything.",
    tags: ["Real Estate", "Commercial", "Southwest U.S."],
  },
  {
    name: "Austin Wealth Management",
    url: "https://austinwealth.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/73368fac8_Austinwealth.png",
    industry: "Wealth Management",
    snippet: "Clarity over complexity. We built Austin Wealth Management a site that speaks directly to young professionals and equity-compensated executives — turning financial anxiety into confidence with warm city imagery and zero sales pressure.",
    tags: ["Finance", "Wealth Management", "Austin"],
  },
  {
    name: "Spring Systems EDI",
    url: "https://springstream.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/c6634d67c_Springstream.png",
    industry: "B2B SaaS",
    snippet: "EDI integration doesn't have to look boring. Spring Systems gets a clean, product-led design that shows — not just tells — how their platform simplifies retail compliance. The UI mockup hero section does the selling before a single word is read.",
    tags: ["B2B SaaS", "EDI", "Supply Chain"],
  },
  {
    name: "Golden Hour Café & Wine Bar",
    url: "https://goldenhour.fmkt.agency",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/78d382475_Goldenhour.png",
    industry: "Hospitality",
    snippet: "South Austin's best-kept secret deserves a website that feels as good as that first sip. Lush sunset photography, warm earth tones, and editorial typography make Golden Hour's site as inviting as the patio itself.",
    tags: ["Hospitality", "Restaurant", "Austin"],
  },
  {
    name: "Cuono Engineering",
    url: "https://cuono.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/3d026b4a4_cuono.png",
    industry: "Structural Engineering",
    snippet: "Heritage and precision in one frame. We built Cuono Engineering a commanding, image-driven site that communicates 25+ years of structural expertise — from historic New York restorations to modern high-rises — without saying a word more than necessary.",
    tags: ["Engineering", "Construction", "New York"],
  },
  {
    name: "TeamLogic IT",
    url: "https://teamlogic.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/560e50224_teamlogic.png",
    industry: "Managed IT Services",
    snippet: "350+ locations. 140,000+ devices managed. The site had to scale to match the brand. We built a clean, stats-forward design for TeamLogic IT that leads with proof — turning skeptical IT buyers into consultation requests before they reach the fold.",
    tags: ["B2B", "Technology", "National"],
  },
  {
    name: "Route to Market Imports",
    url: "https://rtm-imports.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/c5f258ac2_rtm.png",
    industry: "Beverage Imports",
    snippet: "Thirty years and a national wholesale network, distilled into one bold statement: America's specialist beverage importer. We gave Route to Market Imports a rich, editorial design that positions them exactly where they belong — at the top of the category.",
    tags: ["Beverage", "Imports", "National"],
  },
  {
    name: "WestLoop Law",
    url: "https://westlaw.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/2b8320c61_westlaw.png",
    industry: "Personal Injury Law",
    snippet: "Your lawyer is also a medical doctor. That's a story worth telling — loudly. We built WestLoop Law a conversion-first site that puts the attorney's unique dual credential front and center, turning injured Houstonians into booked case reviews.",
    tags: ["Legal", "Personal Injury", "Houston"],
  },
  {
    name: "Molzahn, Reed & Rouse",
    url: "https://mr2.fmkt.agency/",
    image: "https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/c7a70a59d_m2rlaw.png",
    industry: "Civil Litigation",
    snippet: "Reputation. Relationships. Results. M2R is a Chicago firm built for complexity — civil disputes, business counsel, real estate conflict, appellate strategy. We built them a site as serious as their practice: dark, cinematic, and impossible to ignore.",
    tags: ["Legal", "Civil Litigation", "Chicago"],
  },
];

export default function Portfolio() {
  return (
    <>
      <div className="min-h-screen bg-background">

        {/* Hero */}
        <section className="relative py-20 px-6 lg:px-10 border-b border-border overflow-hidden">
          <img
            src="https://media.base44.com/images/public/69e6c4bd9bbd15c86a9a4b38/5d925e722_cubes-pattern-right-corner-sideda9ee31.png"
            alt=""
            aria-hidden="true"
            className="absolute top-0 right-0 w-[420px] pointer-events-none opacity-50 select-none"
          />
          <div className="relative max-w-7xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-body">
              Our Work
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] max-w-4xl mb-8">
              Websites That Work as Hard as Your Business
            </h1>
            <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-2xl">
              From fee-only fiduciaries to national trial law firms, every site we build is designed with one goal: turn the right visitors into the right clients. Here's a look at some of our recent work.
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-20 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto space-y-0">
            {projects.map((project, i) => (
              <article
                key={project.name}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-border py-16 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                {/* Image */}
                <div className={`relative group ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="overflow-hidden rounded-sm border border-border shadow-md">
                    <img
                      src={project.image}
                      alt={`${project.name} homepage design`}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 bg-foreground text-background text-xs font-body font-medium px-3 py-1.5 rounded-sm flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
                  >
                    View Live Site <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Content */}
                <div className={`px-0 lg:px-12 ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">
                    {project.industry}
                  </p>
                  <h2 className="font-heading text-3xl md:text-4xl font-normal leading-[1.1] mb-5">
                    {project.name}
                  </h2>
                  <p className="text-muted-foreground font-body text-base leading-relaxed mb-6">
                    {project.snippet}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-body px-3 py-1 border border-border rounded-sm text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-body font-medium text-accent hover:underline"
                  >
                    Visit {project.name.split(' ')[0]} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
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