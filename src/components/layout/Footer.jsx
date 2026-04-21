import React from 'react';
import { Link } from 'react-router-dom';

const LOGO_URL = 'https://media.base44.com/images/public/user_696032597527e77c90fca3ba/9a7da2942_FahrenheitMarketingLogo.png';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <img src={LOGO_URL} alt="Fahrenheit Marketing" className="h-8 brightness-0 invert mb-4" />
            <p className="text-background/60 text-sm leading-relaxed">
              AI-first digital marketing agency. We combine intelligent technology with experienced professionals to deliver measurable growth.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-4">Services</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/services/seo" className="text-sm text-background/60 hover:text-background transition-colors">Search Engine Optimization</Link>
              <Link to="/services/sem" className="text-sm text-background/60 hover:text-background transition-colors">Search Engine Marketing</Link>
              <Link to="/services/smm" className="text-sm text-background/60 hover:text-background transition-colors">Social Media Marketing</Link>
              <Link to="/services/cro" className="text-sm text-background/60 hover:text-background transition-colors">Conversion Rate Optimization</Link>
              <Link to="/services/strategy" className="text-sm text-background/60 hover:text-background transition-colors">Strategic Planning</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-4">Company</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/about" className="text-sm text-background/60 hover:text-background transition-colors">About Us</Link>
              <Link to="/pricing" className="text-sm text-background/60 hover:text-background transition-colors">Pricing</Link>
              <Link to="/contact" className="text-sm text-background/60 hover:text-background transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-heading text-lg mb-4">Get In Touch</h4>
            <p className="text-sm text-background/60 leading-relaxed">Austin, Texas</p>
            <a href="mailto:rcasas@fahrenheitmarketing.com" className="text-sm text-background/60 hover:text-background transition-colors block mt-2">
              rcasas@fahrenheitmarketing.com
            </a>
            <Link to="/contact" className="inline-block mt-4 text-sm font-medium text-primary hover:underline">
              Schedule a Consultation →
            </Link>
          </div>
        </div>
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">© {new Date().getFullYear()} Fahrenheit Marketing. All rights reserved.</p>
          <p className="text-xs text-background/40">AI-Powered Growth Since 2008</p>
        </div>
      </div>
    </footer>
  );
}