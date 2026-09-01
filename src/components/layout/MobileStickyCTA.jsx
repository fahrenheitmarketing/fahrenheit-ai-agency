import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileStickyCTA() {
  const location = useLocation();
  if (location.pathname === '/contact') return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-background/95 backdrop-blur-sm border-t border-border">
      <Link
        to="/contact"
        className="w-full inline-flex items-center justify-center gap-2 bg-accent text-white text-sm font-medium py-3 rounded-sm hover:bg-accent/90 transition-colors font-body tracking-wide"
      >
        BOOK A STRATEGY CALL <span className="text-base">↗</span>
      </Link>
    </div>
  );
}