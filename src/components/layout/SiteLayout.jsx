import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileStickyCTA from './MobileStickyCTA';

const pageNames = {
  '/': 'Homepage',
  '/services/seo': 'SEO Services',
  '/services/sem': 'SEM Services',
  '/services/smm': 'Social Media Marketing',
  '/services/cro': 'CRO Services',
  '/services/strategy': 'Strategy Services',
  '/pricing': 'Pricing',
  '/about': 'About',
  '/contact': 'Contact',
};

export default function SiteLayout() {
  const location = useLocation();
  const pageName = pageNames[location.pathname] || 'Unknown Page';
  const isHome = location.pathname === '/';
  const isPromo = location.pathname === '/promo-retainer' || location.pathname === '/promo-website';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen flex flex-col ${isHome ? 'home-dark bg-background text-foreground' : ''} ${isPromo ? 'promo-brand' : ''}`}>
      <Navbar />
      <main className="flex-1 pt-20 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}