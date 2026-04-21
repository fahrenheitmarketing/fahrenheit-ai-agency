import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const LOGO_URL = 'https://media.base44.com/images/public/user_696032597527e77c90fca3ba/9a7da2942_FahrenheitMarketingLogo.png';

const services = [
  { label: 'SEO', path: '/services/seo' },
  { label: 'SEM / PPC', path: '/services/sem' },
  { label: 'Social Media', path: '/services/smm' },
  { label: 'CRO', path: '/services/cro' },
  { label: 'Strategy', path: '/services/strategy' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src={LOGO_URL} alt="Fahrenheit Marketing" className="h-8" />
        </Link>

        {/* Center Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm text-foreground/70 hover:text-foreground transition-colors outline-none font-body tracking-wide">
              Services <ChevronDown className="w-3.5 h-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48 bg-background border-border">
              {services.map((s) => (
                <DropdownMenuItem key={s.path} asChild>
                  <Link to={s.path} className="cursor-pointer text-sm">{s.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/pricing" className="text-sm text-foreground/70 hover:text-foreground transition-colors font-body tracking-wide">
            Pricing
          </Link>
          <Link to="/about" className="text-sm text-foreground/70 hover:text-foreground transition-colors font-body tracking-wide">
            About
          </Link>
          <Link to="/blog" className="text-sm text-foreground/70 hover:text-foreground transition-colors font-body tracking-wide">
            Journal
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-foreground/90 transition-colors font-body tracking-wide"
          >
            Book a strategy call <span className="text-base">↗</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <div className="border-b border-border pb-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-body">Services</p>
                {services.map((s) => (
                  <Link key={s.path} to={s.path} className="block text-sm py-1.5 text-foreground/70 hover:text-foreground font-body">{s.label}</Link>
                ))}
              </div>
              <Link to="/pricing" className="text-sm text-foreground/70 hover:text-foreground font-body">Pricing</Link>
              <Link to="/about" className="text-sm text-foreground/70 hover:text-foreground font-body">About</Link>
              <Link to="/blog" className="text-sm text-foreground/70 hover:text-foreground font-body">Journal</Link>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-foreground text-background text-sm font-medium px-5 py-2.5 rounded-sm w-fit font-body">
                Book a strategy call ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}