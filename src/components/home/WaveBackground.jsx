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
      { amp: 90, len: 0.0042, speed: 0.030, y: 0.12, opacity: 0.22, lw: 2.0, phase: 0 },
      { amp: 120, len: 0.0032, speed: 0.024, y: 0.26, opacity: 0.18, lw: 2.4, phase: 1.2 },
      { amp: 150, len: 0.0026, speed: 0.020, y: 0.43, opacity: 0.28, lw: 2.8, phase: 2.4 },
      { amp: 110, len: 0.0036, speed: 0.028, y: 0.56, opacity: 0.16, lw: 2.2, phase: 3.6 },
      { amp: 170, len: 0.0022, speed: 0.016, y: 0.70, opacity: 0.26, lw: 3.0, phase: 4.8 },
      { amp: 95, len: 0.0040, speed: 0.034, y: 0.84, opacity: 0.20, lw: 2.0, phase: 6.0 },
      { amp: 130, len: 0.0028, speed: 0.022, y: 0.95, opacity: 0.24, lw: 2.6, phase: 7.2 },
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