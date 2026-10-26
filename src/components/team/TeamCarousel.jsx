import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TeamMemberCard from '@/components/team/TeamMemberCard';

// Swipeable, scroll-snapping carousel. Mobile shows ~1.4 cards (peek hints more),
// tablet 2-3, desktop 4. Names stay visible under every portrait.
export default function TeamCarousel({ items }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scrollByPage = (dir) => {
    const el = trackRef.current;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  const arrow =
    'hidden sm:flex absolute top-[38%] -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-background border border-border shadow-md text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors disabled:opacity-0 disabled:pointer-events-none';

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label="Team members">
      <button type="button" aria-label="Previous team members" disabled={!canPrev} onClick={() => scrollByPage(-1)} className={`${arrow} left-2`}>
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button type="button" aria-label="Next team members" disabled={!canNext} onClick={() => scrollByPage(1)} className={`${arrow} right-2`}>
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        ref={trackRef}
        onScroll={update}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-6 px-6 scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((m) => (
          <div key={m.name} className="snap-start shrink-0 basis-[70%] sm:basis-[44%] md:basis-1/3 lg:basis-1/4 pr-4 lg:pr-6">
            <TeamMemberCard {...m} />
          </div>
        ))}
      </div>
    </div>
  );
}