import React, { useEffect, useRef } from 'react';

export default function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 130;
    const particles = Array.from({ length: COUNT }, () => {
      const depth = Math.random(); // 0 = far, 1 = near
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        depth,
        r: 0.6 + depth * 2.2,
        speed: 0.06 + depth * 0.22,
        drift: (Math.random() - 0.5) * 0.12,
        phase: Math.random() * Math.PI * 2,
        twinkle: 0.4 + Math.random() * 0.8,
        warm: Math.random() > 0.35, // brand orange vs soft cream
      };
    });

    let t = 0;

    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Gentle upward drift with a slow horizontal sway — wraps for a seamless loop
        p.y -= p.speed;
        p.x += p.drift + Math.sin(t * 1.2 + p.phase) * 0.15;

        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const alpha =
          (0.15 + 0.55 * p.depth) *
          (0.55 + 0.45 * Math.sin(t * 2.2 * p.twinkle + p.phase));

        const color = p.warm ? '211,99,54' : '235,222,205';

        // Soft glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        glow.addColorStop(0, `rgba(${color},${Math.max(alpha, 0) * 0.5})`);
        glow.addColorStop(1, `rgba(${color},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${Math.max(alpha, 0)})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Soft ambient wash so particles feel lit rather than floating on flat color */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_35%,rgba(211,99,54,0.10),transparent_70%)]" />
    </div>
  );
}