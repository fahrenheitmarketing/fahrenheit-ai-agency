import React, { useState, useEffect } from 'react';
import { mediaUrl } from '@/lib/media';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ChevronDown,
  Compass,
  User,
  Search,
  Target,
  Megaphone,
  TrendingUp,
  Workflow,
  Code2,
  Mail,
  ShieldCheck,
  Users,
  BookOpen,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MegaMenu from './MegaMenu';

const LOGO_URL = 'https://media.base44.com/images/public/user_696032597527e77c90fca3ba/9a7da2942_FahrenheitMarketingLogo.png';

const services = [
  { icon: Compass, label: 'Strategy', description: 'Full-funnel growth strategy and roadmaps', path: '/services/strategy' },
  { icon: Search, label: 'SEO', description: 'Own page one and AI search results', path: '/services/seo' },
  { icon: Target, label: 'SEM / PPC', description: 'AI-assisted paid search management', path: '/services/sem' },
  { icon: Megaphone, label: 'Social Media', description: 'Agentic social content and management', path: '/services/smm' },
  { icon: TrendingUp, label: 'CRO', description: 'Turn more visitors into customers', path: '/services/cro' },
  { icon: Workflow, label: 'Marketing Automation', description: 'Lifecycle journeys that nurture and convert', path: '/services/marketing-automation' },
  { icon: Code2, label: 'Software Development', description: 'Custom platforms, portals, and integrations', path: '/services/software-development' },
  { icon: Mail, label: 'Email Marketing', description: 'Cold email programs that build pipeline', path: '/services/email-marketing' },
  { icon: ShieldCheck, label: 'Managed Hosting & Security', description: 'Fast, hardened, fully managed hosting', path: '/services/managed-hosting' },
];

const aboutMenu = [
  { icon: Users, label: 'About the Agency', description: 'Our story, our team, and how we work', path: '/about' },
  { icon: User, label: 'Team', description: 'Meet the people behind the work', path: '/team' },
  { icon: BookOpen, label: 'Blog', description: 'Marketing insights and AI perspectives', path: '/blog' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setOpenMenu(null); }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      onMouseLeave={() => setOpenMenu(null)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'}`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src={mediaUrl(LOGO_URL)} alt="Fahrenheit Marketing logo" className="h-8 brightness-0" />
        </Link>

        {/* Center Nav */}
        <div className="nav-desktop-flex items-center gap-5">
          <button
            onMouseEnter={() => setOpenMenu('services')}
            onClick={() => setOpenMenu(openMenu === 'services' ? null : 'services')}
            aria-haspopup="true"
            aria-expanded={openMenu === 'services'}
            className={`flex items-center gap-1 text-sm whitespace-nowrap transition-colors outline-none font-body tracking-wide ${isActive('/services') ? 'text-accent' : 'text-foreground/70 hover:text-foreground'}`}
          >
            SERVICES <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === 'services' ? 'rotate-180' : ''}`} />
          </button>
          <Link to="/pricing" className={`text-sm whitespace-nowrap transition-colors font-body tracking-wide ${isActive('/pricing') ? 'text-accent' : 'text-foreground/70 hover:text-foreground'}`}>
            PRICING
          </Link>
          <button
            onMouseEnter={() => setOpenMenu('about')}
            onClick={() => setOpenMenu(openMenu === 'about' ? null : 'about')}
            aria-haspopup="true"
            aria-expanded={openMenu === 'about'}
            className={`flex items-center gap-1 text-sm whitespace-nowrap transition-colors outline-none font-body tracking-wide ${isActive('/about') || isActive('/blog') || isActive('/team') ? 'text-accent' : 'text-foreground/70 hover:text-foreground'}`}
          >
            ABOUT <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openMenu === 'about' ? 'rotate-180' : ''}`} />
          </button>
          <Link to="/portfolio" className={`text-sm whitespace-nowrap transition-colors font-body tracking-wide ${isActive('/portfolio') ? 'text-accent' : 'text-foreground/70 hover:text-foreground'}`}>
           PORTFOLIO
          </Link>
          <Link to="/case-studies" className={`text-sm whitespace-nowrap transition-colors font-body tracking-wide ${isActive('/case-studies') ? 'text-accent' : 'text-foreground/70 hover:text-foreground'}`}>
           CASE STUDIES
          </Link>
        </div>

        {/* CTA */}
        <div className="nav-desktop-block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-accent/90 transition-colors font-body tracking-wide whitespace-nowrap"
          >
            BOOK A STRATEGY CALL <span className="text-base">↗</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="nav-mobile-flex p-3 -mr-1 text-foreground items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {openMenu === 'services' && (
          <MegaMenu items={services} columns={3} onNavigate={() => setOpenMenu(null)} />
        )}
        {openMenu === 'about' && (
          <MegaMenu items={aboutMenu} columns={3} onNavigate={() => setOpenMenu(null)} />
        )}
      </AnimatePresence>

      {mobileOpen && (
        <div
          className="fixed inset-0 top-[72px] z-40 nav-mobile-block"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="nav-mobile-block bg-background border-b border-border overflow-hidden relative z-50"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <div className="border-b border-border pb-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Services</p>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <Link key={s.path} to={s.path} className={`inline-flex items-center text-xs font-body font-medium px-3 py-1.5 rounded-full border transition-colors ${isActive(s.path) ? 'bg-accent text-white border-accent' : 'bg-secondary text-foreground/80 border-border hover:border-accent hover:text-accent'}`}>{s.label}</Link>
                  ))}
                </div>
              </div>
              <Link to="/pricing" className={`text-sm font-body ${isActive('/pricing') ? 'text-accent' : 'text-foreground/70 hover:text-foreground'}`}>PRICING</Link>
              <div className="border-b border-border pb-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">About</p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/about" className={`inline-flex items-center text-xs font-body font-medium px-3 py-1.5 rounded-full border transition-colors ${isActive('/about') ? 'bg-accent text-white border-accent' : 'bg-secondary text-foreground/80 border-border hover:border-accent hover:text-accent'}`}>ABOUT THE AGENCY</Link>
                  <Link to="/team" className={`inline-flex items-center text-xs font-body font-medium px-3 py-1.5 rounded-full border transition-colors ${isActive('/team') ? 'bg-accent text-white border-accent' : 'bg-secondary text-foreground/80 border-border hover:border-accent hover:text-accent'}`}>TEAM</Link>
                  <Link to="/blog" className={`inline-flex items-center text-xs font-body font-medium px-3 py-1.5 rounded-full border transition-colors ${isActive('/blog') ? 'bg-accent text-white border-accent' : 'bg-secondary text-foreground/80 border-border hover:border-accent hover:text-accent'}`}>BLOG</Link>
                </div>
              </div>
              <Link to="/portfolio" className={`text-sm font-body ${isActive('/portfolio') ? 'text-accent' : 'text-foreground/70 hover:text-foreground'}`}>PORTFOLIO</Link>
              <Link to="/case-studies" className={`text-sm font-body ${isActive('/case-studies') ? 'text-accent' : 'text-foreground/70 hover:text-foreground'}`}>CASE STUDIES</Link>

              <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-white text-sm font-medium px-5 py-2.5 rounded-sm w-fit font-body">
                BOOK A STRATEGY CALL ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}