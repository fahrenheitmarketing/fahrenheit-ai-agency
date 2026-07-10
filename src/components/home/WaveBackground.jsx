import React, { useEffect, useRef } from 'react';

/**
 * Flowing wave background — animated burnt-orange sine waves sweeping across
 * a dark canvas, matching the reference homepage aesthetic.
 */
export default function WaveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const waves = [
      { amp: 60, len: 0.0042, speed: 0.022, y: 0.15, opacity: 0.15, lw: 1.6, phase: 0 },
      { amp: 80, len: 0.0032, speed: 0.018, y: 0.28, opacity: 0.12, lw: 1.8, phase: 1.2 },
      { amp: 100, len: 0.0026, speed: 0.015, y: 0.44, opacity: 0.18, lw: 2.0, phase: 2.4 },
      { amp: 75, len: 0.0036, speed: 0.020, y: 0.57, opacity: 0.11, lw: 1.7, phase: 3.6 },
      { amp: 110, len: 0.0022, speed: 0.012, y: 0.71, opacity: 0.16, lw: 2.2, phase: 4.8 },
      { amp: 65, len: 0.0040, speed: 0.024, y: 0.85, opacity: 0.13, lw: 1.6, phase: 6.0 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const w of waves) {
        w.phase += w.speed;
        ctx.beginPath();
        const baseY = height * w.y;
        for (let x = 0; x <= width; x += 4) {
          const y =
            baseY +
            Math.sin(x * w.len + w.phase) * w.amp +
            Math.sin(x * w.len * 2.3 + w.phase * 1.4) * (w.amp * 0.3);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Gradient stroke fading left → right
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, `rgba(211, 99, 54, 0)`);
        grad.addColorStop(0.3, `rgba(211, 99, 54, ${w.opacity})`);
        grad.addColorStop(0.7, `rgba(211, 99, 54, ${w.opacity})`);
        grad.addColorStop(1, `rgba(211, 99, 54, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = w.lw;
        ctx.lineCap = 'round';
        ctx.stroke();
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}