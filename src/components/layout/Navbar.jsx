import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center">
          <img src={LOGO_URL} alt="Fahrenheit Marketing" className="h-8 md:h-10" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors outline-none">
              Services <ChevronDown className="w-3.5 h-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {services.map((s) => (
                <DropdownMenuItem key={s.path} asChild>
                  <Link to={s.path} className="cursor-pointer">{s.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/about" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/contact">
            <Button size="sm" className="rounded-full px-6 font-body">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <Link to="/" className="text-base font-medium py-2">Home</Link>
              <div className="border-t border-border pt-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Services</p>
                {services.map((s) => (
                  <Link key={s.path} to={s.path} className="block text-base font-medium py-2 pl-3">
                    {s.label}
                  </Link>
                ))}
              </div>
              <Link to="/pricing" className="text-base font-medium py-2">Pricing</Link>
              <Link to="/about" className="text-base font-medium py-2">About</Link>
              <Link to="/contact">
                <Button className="w-full rounded-full font-body mt-2">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}