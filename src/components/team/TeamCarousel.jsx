import React, { useState } from 'react';

const SLIDE_WIDTH = 'w-[75vw] sm:w-[40vw] lg:w-[23vw]';
// Aspect ratio of the standard team portraits — every slide uses this frame.
const STANDARD_AR = 800 / 1470;

// Zoom the photo so the trimmed top/bottom bands fall outside the frame.
function getZoom(crop) {
  if (!crop) return 1;
  const trimmed = (crop.top || 0) + (crop.bottom || 0);
  return 1 / (1 - trimmed / 100);
}

// Photos taller than the standard frame get cropped vertically; center the crop
// on the subject (rows with contrast against the background) instead of the canvas.
// Photos wider than the frame (e.g. 4:5 headshots) are shown in full, and the
// frame is painted with the photo's own edge color so the leftover space blends in.
function useSubjectPosition(focusX = 50) {
  const [objectPos, setObjectPos] = useState(`${focusX}% 50%`);
  const onLoad = (e) => {
    const img = e.currentTarget;
    const { naturalWidth: w, naturalHeight: h } = img;
    if (!w || !h) return;
    const ar = w / h;
    const cw = 64;
    const ch = Math.max(2, Math.round((h * cw) / w));
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, cw, ch);
    const data = ctx.getImageData(0, 0, cw, ch).data;
    if (ar > STANDARD_AR + 0.02) {
      // Wider than the frame: fill the frame like the other portraits, centered on the face.
      setObjectPos(`${focusX}% 50%`);
      return;
    }
    if (ar >= STANDARD_AR - 0.02) return;
    const spread = (y) => {
      let mn = 255;
      let mx = 0;
      for (let x = 0; x < cw; x++) {
        const v = data[(y * cw + x) * 4];
        if (v < mn) mn = v;
        if (v > mx) mx = v;
      }
      return mx - mn;
    };
    const threshold = 40;
    let top = 0;
    let bottom = ch - 1;
    while (top < bottom && spread(top) <= threshold) top++;
    while (bottom > top && spread(bottom) <= threshold) bottom--;
    if (top >= bottom) return;
    const center = ((top + bottom) / 2) / (ch - 1);
    setObjectPos(`50% ${Math.round(center * 100)}%`);
  };
  return { objectPos, onLoad };
}

function TeamSlide({ member }) {
  const zoom = getZoom(member.crop);
  const { objectPos, onLoad } = useSubjectPosition(member.focusX);
  return (
    <div className={`${SLIDE_WIDTH} shrink-0 min-w-0 px-0.5`}>
      <div className="group relative overflow-hidden" style={{ aspectRatio: '800 / 1470' }}>
        <img
          src={member.image}
          alt={`${member.name}, ${member.role} portrait`}
          loading="lazy"
          draggable="false"
          crossOrigin="anonymous"
          onLoad={onLoad}
          style={{ objectFit: 'cover', objectPosition: objectPos, ...(zoom > 1 ? { transform: `scale(${zoom})` } : {}) }}
          className={`absolute inset-0 w-full h-full select-none ${
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