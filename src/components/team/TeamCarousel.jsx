import React, { useState } from 'react';

const SLIDE_WIDTH = 'w-[75vw] sm:w-[40vw] lg:w-[23vw]';

function TeamSlide({ member, crop, onImgLoad }) {
  return (
    <div className={`${SLIDE_WIDTH} shrink-0 min-w-0 px-0.5`}>
      <div
        className="group relative overflow-hidden"
        style={crop ? { height: crop.height } : undefined}
      >
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          draggable="false"
          onLoad={onImgLoad}
          style={crop ? { marginTop: -crop.topPx } : undefined}
          className="block w-full h-auto object-contain object-center transition-transform duration-500 group-hover:scale-[1.02] select-none"
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
  const [crops, setCrops] = useState({});

  const handleImgLoad = (member, e) => {
    if (!member.crop) return;
    const el = e.currentTarget;
    const topPx = Math.round((el.clientHeight * (member.crop.top || 0)) / 100);
    const bottomPx = Math.round((el.clientHeight * (member.crop.bottom || 0)) / 100);
    setCrops((prev) =>
      prev[member.name]
        ? prev
        : { ...prev, [member.name]: { height: el.clientHeight - topPx - bottomPx, topPx } }
    );
  };

  return (
    <div className="relative overflow-hidden group/marquee" aria-label="Team members">
      <div
        className="flex w-max animate-marquee group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
            {items.map((member) => (
              <TeamSlide
                key={`${copy}-${member.name}`}
                member={member}
                crop={crops[member.name]}
                onImgLoad={(e) => handleImgLoad(member, e)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}