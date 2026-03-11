import { useEffect, useRef } from "react";

const TEAL = "hsla(174, 78%, 41%,";
const TEAL2 = "hsla(174, 64%, 56%,";

/**
 * Subtle animated canvas overlay that sits ON TOP of the service pillar images.
 * Doesn't draw new shapes — adds glow dots, traveling pulses, and subtle
 * highlights that enhance the existing blueprint illustrations.
 *
 * variant 0 = process automation (rotating glow on gear areas + traveling dots along belt)
 * variant 1 = system integrations (dots traveling along connection lines in the image)
 * variant 2 = data & reporting (pulsing glow on bar/chart areas + traveling line dot)
 */
const ServiceAnimationOverlay = ({ variant }: { variant: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) return;

    let frame = 0;
    let raf: number;
    let isVisible = true;

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const resizeObs = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObs.observe(canvas.parentElement);

    /** Draw a soft radial glow */
    const glow = (x: number, y: number, r: number, opacity: number, color = TEAL2) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `${color}${opacity})`);
      grad.addColorStop(1, `${color}0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };

    /** Draw a small bright dot */
    const dot = (x: number, y: number, r: number, opacity: number, color = TEAL2) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${opacity})`;
      ctx.fill();
    };

    const animate = () => {
      if (!isVisible) { raf = requestAnimationFrame(animate); return; }
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) { raf = requestAnimationFrame(animate); return; }
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      if (variant === 0) {
        // ── PROCESS AUTOMATION ──
        // Rotating glow orbits on the gear/cog areas of the image
        // Gears in the image are roughly center-right area
        const gearCenters = [
          { x: w * 0.48, y: h * 0.35, r: w * 0.10 },
          { x: w * 0.62, y: h * 0.28, r: w * 0.07 },
          { x: w * 0.38, y: h * 0.50, r: w * 0.06 },
        ];

        // Orbiting glow dots around gear positions
        gearCenters.forEach((g, i) => {
          const speed = (i % 2 === 0 ? 1 : -1) * (0.012 + i * 0.005);
          const angle = frame * speed + i * 2.1;
          const ox = g.x + Math.cos(angle) * g.r;
          const oy = g.y + Math.sin(angle) * g.r;
          glow(ox, oy, 14, 0.25);
          dot(ox, oy, 2.5, 0.6);

          // Subtle pulsing glow on gear center
          const pulse = 0.08 + Math.sin(frame * 0.03 + i) * 0.05;
          glow(g.x, g.y, g.r * 0.8, pulse);
        });

        // Traveling dots along the conveyor belt area (bottom half of image)
        const beltY = h * 0.72;
        for (let i = 0; i < 3; i++) {
          const t = ((frame * 0.7 + i * 130) % 400) / 400;
          const x = w * 0.08 + t * w * 0.84;
          const fadeIn = Math.min(1, t * 6);
          const fadeOut = Math.min(1, (1 - t) * 6);
          const alpha = fadeIn * fadeOut;
          glow(x, beltY, 12, 0.3 * alpha);
          dot(x, beltY, 2, 0.5 * alpha);
        }

      } else if (variant === 1) {
        // ── SYSTEM INTEGRATIONS ──
        // Dots traveling along the connection lines visible in the image
        // The image shows connected nodes/systems — we add traveling light pulses

        // Approximate line paths from the blueprint image
        const paths = [
          // Horizontal-ish connections
          { x1: w * 0.12, y1: h * 0.30, x2: w * 0.45, y2: h * 0.25 },
          { x1: w * 0.45, y1: h * 0.25, x2: w * 0.80, y2: h * 0.32 },
          { x1: w * 0.15, y1: h * 0.55, x2: w * 0.50, y2: h * 0.50 },
          { x1: w * 0.50, y1: h * 0.50, x2: w * 0.85, y2: h * 0.55 },
          // Vertical-ish connections
          { x1: w * 0.30, y1: h * 0.20, x2: w * 0.28, y2: h * 0.60 },
          { x1: w * 0.60, y1: h * 0.18, x2: w * 0.62, y2: h * 0.62 },
          // Diagonals
          { x1: w * 0.20, y1: h * 0.35, x2: w * 0.50, y2: h * 0.65 },
          { x1: w * 0.75, y1: h * 0.30, x2: w * 0.55, y2: h * 0.60 },
          { x1: w * 0.40, y1: h * 0.70, x2: w * 0.70, y2: h * 0.75 },
        ];

        paths.forEach((p, i) => {
          const speed = 0.004 + (i % 4) * 0.001;
          const dir = i % 2 === 0 ? 1 : -1;
          const rawT = (frame * speed * dir + i * 0.12);
          const t = ((rawT % 1) + 1) % 1;
          const x = p.x1 + (p.x2 - p.x1) * t;
          const y = p.y1 + (p.y2 - p.y1) * t;

          glow(x, y, 10, 0.35);
          dot(x, y, 2.5, 0.65);

          // Trail
          for (let tr = 1; tr <= 3; tr++) {
            const tt = ((rawT - tr * 0.025) % 1 + 1) % 1;
            const tx = p.x1 + (p.x2 - p.x1) * tt;
            const ty = p.y1 + (p.y2 - p.y1) * tt;
            dot(tx, ty, 1.5, 0.15 / tr);
          }
        });

        // Subtle pulsing on node positions
        const nodes = [
          { x: w * 0.15, y: h * 0.30 }, { x: w * 0.45, y: h * 0.25 },
          { x: w * 0.80, y: h * 0.32 }, { x: w * 0.30, y: h * 0.60 },
          { x: w * 0.60, y: h * 0.60 }, { x: w * 0.50, y: h * 0.50 },
        ];
        nodes.forEach((n, i) => {
          const pulse = 0.06 + Math.sin(frame * 0.025 + i * 1.2) * 0.04;
          glow(n.x, n.y, 18, pulse);
        });

      } else {
        // ── DATA & REPORTING ──
        // Pulsing glow on dashboard bar areas + traveling dot on chart line

        // Pulsing bars (matching approximate bar positions in the image)
        const barCount = 5;
        const barStartX = w * 0.15;
        const barEndX = w * 0.65;
        const barBaseY = h * 0.70;

        for (let i = 0; i < barCount; i++) {
          const x = barStartX + (barEndX - barStartX) * (i / (barCount - 1));
          const barH = h * (0.15 + 0.2 * Math.abs(Math.sin(i * 1.3 + 0.5)));
          const topY = barBaseY - barH;

          // Pulsing highlight at the top of each bar
          const pulse = 0.15 + Math.sin(frame * 0.035 + i * 0.9) * 0.1;
          glow(x, topY, 14, pulse);

          // Subtle full-bar glow
          const barPulse = 0.03 + Math.sin(frame * 0.025 + i * 1.1) * 0.02;
          glow(x, topY + barH * 0.3, barH * 0.4, barPulse, TEAL);
        }

        // Traveling dot along a chart/line area (upper part of image)
        const lineY = h * 0.32;
        const dotProgress = ((frame * 1.2) % w);
        const lineYOffset = Math.sin(dotProgress * 0.025 + frame * 0.01) * h * 0.06;
        glow(dotProgress, lineY + lineYOffset, 10, 0.3);
        dot(dotProgress, lineY + lineYOffset, 2.5, 0.6);

        // Subtle scanning line effect
        const scanX = ((frame * 0.8) % (w * 1.3)) - w * 0.15;
        ctx.globalAlpha = 0.06;
        ctx.strokeStyle = `${TEAL2}0.3)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(scanX, 0);
        ctx.lineTo(scanX, h);
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Corner data-refresh pulse
        const cornerPulse = 0.08 + Math.sin(frame * 0.04) * 0.06;
        glow(w * 0.82, h * 0.22, 22, cornerPulse);
      }

      frame++;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObs.disconnect();
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[2] pointer-events-none"
      style={{ willChange: "transform" }}
      aria-hidden="true"
    />
  );
};

export default ServiceAnimationOverlay;
