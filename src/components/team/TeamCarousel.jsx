import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TeamCarousel({ items }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    dragFree: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback((api) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex gap-[5px]">
          {items.map((member) => (
            <div key={member.name} className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_24%] min-w-0">
              <div className="group relative overflow-hidden rounded-sm aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  draggable="false"
                  className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02] select-none"
                />
                <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="w-full px-6 pb-6">
                    <p className="font-heading text-xl md:text-2xl text-white leading-tight">{member.name}</p>
                    <p className="text-xs md:text-sm uppercase tracking-widest text-accent font-body mt-1.5">{member.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canPrev}
        aria-label="Previous team members"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 rounded-full bg-background border border-border shadow-sm flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-colors disabled:opacity-0 disabled:pointer-events-none"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canNext}
        aria-label="Next team members"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 rounded-full bg-background border border-border shadow-sm flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition-colors disabled:opacity-0 disabled:pointer-events-none"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}