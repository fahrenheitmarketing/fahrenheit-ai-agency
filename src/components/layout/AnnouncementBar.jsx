import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

const STORAGE_KEY = 'announcement-cybermonday-dismissed';
// December 4, 2026, 11:59 PM US Central (CST, UTC-6)
const DEADLINE = new Date('2026-12-04T23:59:00-06:00').getTime();

export default function AnnouncementBar() {
  const { pathname } = useLocation();
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1');
  const ref = useRef(null);

  const visible = !dismissed && pathname !== '/cyber-monday' && Date.now() < DEADLINE;

  useEffect(() => {
    const root = document.documentElement;
    if (!visible || !ref.current) {
      root.style.setProperty('--announce-h', '0px');
      return;
    }
    const update = () => root.style.setProperty('--announce-h', `${ref.current.offsetHeight}px`);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(ref.current);
    return () => {
      ro.disconnect();
      root.style.setProperty('--announce-h', '0px');
    };
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setDismissed(true);
  };

  return (
    <div ref={ref} className="fixed top-0 left-0 right-0 z-[60] bg-accent text-white">
      <Link to="/cyber-monday" className="block px-10 py-2 text-center text-xs sm:text-[13px] font-body leading-snug">
        Cyber Monday: new clients get a free month of email marketing or managed hosting. Offer ends December 4.{' '}
        <span className="font-medium underline underline-offset-2 whitespace-nowrap">See the offer</span>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-white/90 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}