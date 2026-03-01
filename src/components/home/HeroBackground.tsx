import { useEffect, useRef } from "react";

interface GlowDot {
  lineIndex: number;
  t: number;
  speed: number;
  radius: number;
  opacity: number;
}

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const lineCount = 14;

    const dots: GlowDot[] = [];
    for (let i = 0; i < 14; i++) {
      dots.push({
        lineIndex: Math.floor(Math.random() * lineCount),
        t: Math.random(),
        speed: 0.0002 + Math.random() * 0.0005,
        radius: 2 + Math.random() * 2.5,
        opacity: 0.1 + Math.random() * 0.12,
      });
    }

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

    const getWaveY = (x: number, lineIdx: number, h: number) => {
      const t_pos = (lineIdx + 1) / (lineCount + 1);
      const yBase = h * (0.38 + t_pos * 0.22);
      const freq = 0.0018 + (lineIdx % 3) * 0.0008;
      const speed = 0.12 + (lineIdx % 4) * 0.04;
      const amp = 8 + Math.sin(lineIdx * 1.1) * 5;
      return (
        yBase +
        Math.sin(x * freq + time * speed) * amp +
        Math.sin(x * freq * 0.5 + time * speed * 0.7) * amp * 0.4
      );
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

      drawGlow(w * 0.2, h * 0.4, 300, 0.03 + Math.sin(time * 0.3) * 0.01);
      drawGlow(w * 0.8, h * 0.6, 250, 0.025 + Math.sin(time * 0.4 + 1) * 0.01);
      drawGlow(w * 0.5, h * 0.3, 350, 0.02 + Math.sin(time * 0.2 + 2) * 0.01);

      for (let i = 0; i < lineCount; i++) {
        const opacity = i % 2 === 0 ? 0.14 : 0.07;
        const lineWidth = i % 3 === 0 ? 3.5 : 2;

        ctx.beginPath();
        ctx.strokeStyle = `hsla(174, 78%, 41%, ${opacity})`;
        ctx.lineWidth = lineWidth;

        for (let x = 0; x <= w; x += 2) {
          const y = getWaveY(x, i, h);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      for (const dot of dots) {
        dot.t += dot.speed;
        if (dot.t > 1) dot.t -= 1;

        const xPos = dot.t * w;
        const yPos = getWaveY(xPos, dot.lineIndex, h);

        const dotGrad = ctx.createRadialGradient(xPos, yPos, 0, xPos, yPos, dot.radius * 5);
        dotGrad.addColorStop(0, `hsla(174, 78%, 55%, ${dot.opacity * 0.3})`);
        dotGrad.addColorStop(0.5, `hsla(174, 78%, 45%, ${dot.opacity * 0.08})`);
        dotGrad.addColorStop(1, "hsla(174, 78%, 41%, 0)");
        ctx.fillStyle = dotGrad;
        ctx.fillRect(xPos - dot.radius * 5, yPos - dot.radius * 5, dot.radius * 10, dot.radius * 10);

        ctx.beginPath();
        ctx.arc(xPos, yPos, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(174, 78%, 60%, ${dot.opacity})`;
        ctx.fill();
      }

      time += 0.008;
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
