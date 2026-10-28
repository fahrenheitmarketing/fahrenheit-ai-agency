import React from 'react';
import { mediaUrl } from '@/lib/media';
import { Link } from 'react-router-dom';

const LOGO_URL = 'https://media.base44.com/images/public/user_696032597527e77c90fca3ba/9a7da2942_FahrenheitMarketingLogo.png';

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-border">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-24 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-8 md:gap-12 pb-8 md:pb-12 border-b border-border">
          <div className="col-span-2 lg:col-span-2">
            <img src={mediaUrl(LOGO_URL)} alt="Fahrenheit Marketing logo" className="h-7 brightness-0 mb-5" />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm font-body">
              AI-first digital marketing. We design the systems, deploy the models, and operate the stack — measured in outcomes, not deliverables.
            </p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-4 md:mb-5 font-body">Services</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:flex md:flex-col">
              {[['Strategy', '/services/strategy'], ['SEO', '/services/seo'], ['SEM / PPC', '/services/sem'], ['Social Media', '/services/smm'], ['CRO', '/services/cro'], ['Marketing Automation', '/services/marketing-automation'], ['Software Development', '/services/software-development'], ['Email Marketing', '/services/email-marketing'], ['Managed Hosting & Security', '/services/managed-hosting']].map(([label, path]) => (
                <Link key={path} to={path} className="text-sm text-foreground/70 hover:text-accent transition-colors font-body">{label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-body">Resources</h3>
            <div className="flex flex-col gap-3">
              <Link to="/blog" className="text-sm text-foreground/70 hover:text-accent transition-colors font-body">Blog</Link>
              <Link to="/portfolio" className="text-sm text-foreground/70 hover:text-accent transition-colors font-body">Portfolio</Link>
              <Link to="/case-studies" className="text-sm text-foreground/70 hover:text-accent transition-colors font-body">Case Studies</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-5 font-body">Company</h3>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-foreground/70 hover:text-accent transition-colors font-body">About</Link>
              <Link to="/team" className="text-sm text-foreground/70 hover:text-accent transition-colors font-body">Team</Link>
              <Link to="/pricing" className="text-sm text-foreground/70 hover:text-accent transition-colors font-body">Pricing</Link>
              <Link to="/contact" className="text-sm text-foreground/70 hover:text-accent transition-colors font-body">Contact</Link>

            </div>
          </div>
        </div>
        <div className="pt-6 md:pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">© {new Date().getFullYear()} Fahrenheit Marketing. All rights reserved.</p>
          <Link to="/about" className="text-xs text-muted-foreground hover:text-accent transition-colors font-body">Since 2008 · AI-First Today · Austin, Texas</Link>
        </div>
      </div>
    </footer>
  );
}