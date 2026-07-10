import React from 'react';
import { Link } from 'react-router-dom';
import FloatingParticles from '../about/FloatingParticles';

const LOGO_URL = 'https://media.base44.com/images/public/user_696032597527e77c90fca3ba/9a7da2942_FahrenheitMarketingLogo.png';

export default function Footer() {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden">
      <FloatingParticles />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-background/10">
          <div className="lg:col-span-2">
            <img src={LOGO_URL} alt="Fahrenheit Marketing" className="h-7 brightness-0 mb-5" />
            <p className="text-background/50 text-sm leading-relaxed max-w-sm font-body">
              AI-first digital marketing. We design the systems, deploy the models, and operate the stack — measured in outcomes, not deliverables.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-background/40 mb-5 font-body">Services</h4>
            <div className="flex flex-col gap-3">
              {[['Strategy', '/services/strategy'], ['SEO', '/services/seo'], ['SEM / PPC', '/services/sem'], ['Social Media', '/services/smm'], ['CRO', '/services/cro'], ['Marketing Automation', '/services/marketing-automation'], ['Software Development', '/services/software-development']].map(([label, path]) => (
                <Link key={path} to={path} className="text-sm text-background/60 hover:text-background transition-colors font-body">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-background/40 mb-5 font-body">Resources</h4>
            <div className="flex flex-col gap-3">
              <Link to="/blog" className="text-sm text-background/60 hover:text-background transition-colors font-body">Blog</Link>
              <Link to="/case-studies" className="text-sm text-background/60 hover:text-background transition-colors font-body">Case Studies</Link>
              <Link to="/promo" className="text-sm text-background/60 hover:text-background transition-colors font-body">Promo</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-background/40 mb-5 font-body">Company</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-background/60 hover:text-background transition-colors font-body">About</Link>
              <Link to="/pricing" className="text-sm text-background/60 hover:text-background transition-colors font-body">Pricing</Link>
              <Link to="/contact" className="text-sm text-background/60 hover:text-background transition-colors font-body">Contact</Link>

            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-background/30 font-body">© {new Date().getFullYear()} Fahrenheit Marketing. All rights reserved.</p>
          <p className="text-xs text-background/30 font-body">AI Enablement · Since 2008 · Austin, Texas</p>
        </div>
      </div>
    </footer>
  );
}