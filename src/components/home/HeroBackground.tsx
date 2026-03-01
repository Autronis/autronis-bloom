import { useEffect, useRef } from "react";

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();
    window.addEventListener("resize", resize);

    const drawWave = (
      yBase: number,
      amplitude: number,
      frequency: number,
      speed: number,
      opacity: number,
      lineWidth: number
    ) => {
      const w = window.innerWidth;
      ctx.beginPath();
      ctx.strokeStyle = `hsla(174, 78%, 41%, ${opacity})`;
      ctx.lineWidth = lineWidth;

      for (let x = 0; x <= w; x += 2) {
        const y =
          yBase +
          Math.sin(x * frequency + time * speed) * amplitude +
          Math.sin(x * frequency * 0.5 + time * speed * 0.7) * amplitude * 0.5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const drawGlow = (x: number, y: number, radius: number, opacity: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `hsla(174, 78%, 41%, ${opacity})`);
      gradient.addColorStop(1, "hsla(174, 78%, 41%, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // Subtle ambient glow — keep as-is
      drawGlow(w * 0.2, h * 0.4, 300, 0.03 + Math.sin(time * 0.3) * 0.01);
      drawGlow(w * 0.8, h * 0.6, 250, 0.025 + Math.sin(time * 0.4 + 1) * 0.01);
      drawGlow(w * 0.5, h * 0.3, 350, 0.02 + Math.sin(time * 0.2 + 2) * 0.01);

      // Denser wave lines with more contrast and system-like feel
      const lineCount = 12;
      for (let i = 0; i < lineCount; i++) {
        const t = (i + 1) / (lineCount + 1);
        const yBase = h * (0.15 + t * 0.7);
        const amp = 15 + Math.sin(i * 1.2) * 10;
        const freq = 0.002 + (i % 3) * 0.001;
        const speed = 0.15 + (i % 4) * 0.05;
        const opacity = i % 2 === 0 ? 0.14 : 0.07;
        const width = i % 3 === 0 ? 1.5 : 0.8;
        drawWave(yBase, amp, freq, speed, opacity, width);
      }

      time += 0.008; // Very slow movement
      animationId = requestAnimationFrame(animate);
    };

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!motionQuery.matches) {
      animate();
    } else {
      time = 0;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      drawGlow(w * 0.3, h * 0.4, 300, 0.03);
      drawGlow(w * 0.7, h * 0.5, 250, 0.025);
    }

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default HeroBackground;
