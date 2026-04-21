import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import AIChatWidget from '../chat/AIChatWidget';

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <AIChatWidget pageSource={pageName} />
    </div>
  );
}