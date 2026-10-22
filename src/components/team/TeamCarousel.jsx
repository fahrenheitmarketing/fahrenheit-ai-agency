import React from 'react';

const SLIDE_WIDTH = 'w-[75vw] sm:w-[40vw] lg:w-[23vw]';

// Zoom the photo so the trimmed top/bottom bands fall outside the frame.
function getZoom(crop) {
  if (!crop) return 1;
  const trimmed = (crop.top || 0) + (crop.bottom || 0);
  return 1 / (1 - trimmed / 100);
}

function TeamSlide({ member }) {
  const zoom = getZoom(member.crop);
  return (
    <div className={`${SLIDE_WIDTH} shrink-0 min-w-0 px-0.5`}>
      <div className="group relative overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          draggable="false"
          style={zoom > 1 ? { transform: `scale(${zoom})` } : undefined}
          className={`block w-full h-auto object-contain object-center select-none ${
            zoom > 1 ? '' : 'transition-transform duration-500 group-hover:scale-[1.02]'
          }`}
        />
        <div className="absolute inset-0 bg-foreground/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="w-full px-6 pb-6">
            <p className="font-heading text-xl md:text-2xl text-white leading-tight">{member.name}</p>
            <p className="text-xs md:text-sm uppercase tracking-widest text-accent font-body mt-1.5">{member.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamCarousel({ items, speedSeconds = 45 }) {
  return (
    <div className="relative overflow-hidden group/marquee" aria-label="Team members">
      <div
        className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((member) => (
              <TeamSlide key={`${copy}-${member.name}`} member={member} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}