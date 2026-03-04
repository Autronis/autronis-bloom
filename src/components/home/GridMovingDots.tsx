import { useEffect, useRef } from "react";

const GRID_SPACING = 50;

interface GridDot {
  axis: "x" | "y";
  lineIndex: number;
  duration: number;
  delay: number;
  reverse?: boolean;
}

interface DotState {
  lineIndex: number;
  t: number;
  speed: number;
  radius: number;
  maxOpacity: number;
  glowPhase: number;
}

const GridMovingDots = ({ dots: _dots }: { dots?: GridDot[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const visObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visObserver.observe(canvas);

    // Create dots that move horizontally along grid lines
    const dotStates: DotState[] = [
      { lineIndex: 4, t: 0, speed: 0.0007, radius: 1.8, maxOpacity: 0.3, glowPhase: 0 },
      { lineIndex: 7, t: 0.4, speed: 0.0006, radius: 1.6, maxOpacity: 0.25, glowPhase: 1.8 },
      { lineIndex: 10, t: 0.7, speed: 0.0008, radius: 1.8, maxOpacity: 0.3, glowPhase: 3.5 },
      { lineIndex: 13, t: 0.2, speed: 0.0005, radius: 1.6, maxOpacity: 0.25, glowPhase: 5.0 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let time = 0;

    const animate = () => {
      if (!isVisible) { animId = requestAnimationFrame(animate); return; }
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const dot of dotStates) {
        dot.t += dot.speed;
        if (dot.t > 1) dot.t -= 1;

        const x = dot.t * w;
        const y = dot.lineIndex * GRID_SPACING;

        if (y > h) continue;

        // Glow pulse
        const glow = Math.sin(time * 0.8 + dot.glowPhase) * 0.5 + 0.5;
        const opacity = dot.maxOpacity * (0.6 + glow * 0.4);
        const radius = dot.radius * (1 + glow * 0.6);

        // Outer glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 5);
        grad.addColorStop(0, `hsla(174, 78%, 50%, ${opacity * 0.4})`);
        grad.addColorStop(0.5, `hsla(174, 78%, 45%, ${opacity * 0.1})`);
        grad.addColorStop(1, "hsla(174, 78%, 41%, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(x - radius * 5, y - radius * 5, radius * 10, radius * 10);

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(174, 78%, 60%, ${opacity})`;
        ctx.fill();
      }

      time += 0.016;
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      visObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default GridMovingDots;
export type { GridDot };
