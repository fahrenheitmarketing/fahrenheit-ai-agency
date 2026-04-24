import React, { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 200;
const BASE_SIZE = 8;

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FloatingParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any existing particles
    container.innerHTML = '';

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const size = Math.floor(randomBetween(2, BASE_SIZE));
      const startX = randomBetween(0, 100);
      const startY = randomBetween(100, 110);
      const endX = randomBetween(0, 100);
      const endY = -(randomBetween(100, 130));
      const moveDuration = randomBetween(28000, 37000);
      const moveDelay = randomBetween(0, 37000);
      const fadeDuration = randomBetween(1500, 4000);
      const fadeDelay = randomBetween(0, 4000);

      const circleContainer = document.createElement('div');
      circleContainer.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        will-change: transform;
        animation: moveUp-${i} ${moveDuration}ms ${moveDelay}ms infinite linear;
      `;

      const keyframes = `
        @keyframes moveUp-${i} {
          from { transform: translate3d(${startX}vw, ${startY}vh, 0); }
          to   { transform: translate3d(${endX}vw, ${endY}vh, 0); }
        }
      `;

      // Inject keyframes into a style tag
      const styleEl = document.createElement('style');
      styleEl.textContent = keyframes;
      document.head.appendChild(styleEl);

      const circle = document.createElement('div');
      circle.style.cssText = `
        width: 100%;
        height: 100%;
        border-radius: 50%;
        mix-blend-mode: screen;
        background-image: radial-gradient(
          hsl(180,100%,80%),
          hsl(180,100%,80%) 10%,
          hsla(180,100%,80%,0) 56%
        );
        animation: fadeCircle ${fadeDuration}ms ${fadeDelay}ms infinite ease-in-out,
                   scaleCircle 2s ${fadeDelay}ms infinite ease-in-out;
      `;

      circleContainer.appendChild(circle);
      container.appendChild(circleContainer);
    }

    // Shared keyframes for fade + scale
    const sharedStyle = document.createElement('style');
    sharedStyle.textContent = `
      @keyframes fadeCircle {
        0%   { opacity: 1; }
        50%  { opacity: 0.7; }
        100% { opacity: 1; }
      }
      @keyframes scaleCircle {
        0%   { transform: scale3d(0.4, 0.4, 1); }
        50%  { transform: scale3d(2.2, 2.2, 1); }
        100% { transform: scale3d(0.4, 0.4, 1); }
      }
    `;
    document.head.appendChild(sharedStyle);

    return () => {
      // Cleanup: remove all injected style tags
      document.querySelectorAll('style[data-particles]').forEach(el => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{
        maskImage: 'radial-gradient(white 0%, white 30%, transparent 80%, transparent)',
        WebkitMaskImage: 'radial-gradient(white 0%, white 30%, transparent 80%, transparent)',
      }}
    />
  );
}