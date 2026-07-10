import React, { useEffect, useRef } from 'react';

export default function WaveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let frame;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      // Soft ambient light behind the waves
      const light = ctx.createRadialGradient(w * 0.7, h * 0.65, 0, w * 0.7, h * 0.65, w * 0.6);
      light.addColorStop(0, 'hsla(14, 80%, 51%, 0.10)');
      light.addColorStop(0.5, 'hsla(36, 33%, 96%, 0.04)');
      light.addColorStop(1, 'transparent');
      ctx.fillStyle = light;
      ctx.fillRect(0, 0, w, h);

      const lines = 14;
      for (let i = 0; i < lines; i++) {
        const progress = i / (lines - 1);
        const baseY = h * 0.35 + progress * h * 0.55;
        const amplitude = 28 + progress * 50;
        const isAccent = i % 4 === 0;

        ctx.beginPath();
        for (let x = 0; x <= w; x += 6) {
          const y =
            baseY +
            Math.sin(x * 0.004 + t * 0.8 + i * 0.45) * amplitude +
            Math.sin(x * 0.0015 - t * 0.5 + i * 0.3) * amplitude * 0.6;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = isAccent
          ? `hsla(14, 85%, 55%, ${0.3 + progress * 0.4})`
          : `hsla(36, 33%, 96%, ${0.1 + progress * 0.18})`;
        ctx.lineWidth = isAccent ? 1.8 : 1.2;
        ctx.shadowBlur = isAccent ? 14 : 6;
        ctx.shadowColor = isAccent ? 'hsla(14, 85%, 55%, 0.6)' : 'hsla(36, 33%, 96%, 0.25)';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      t += 0.012;
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}