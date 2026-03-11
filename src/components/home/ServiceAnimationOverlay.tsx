import { useEffect, useRef } from "react";

const TEAL = "hsla(174, 78%, 41%,";
const TEAL2 = "hsla(174, 64%, 56%,";

/**
 * Animated SVG overlay for the 3 service pillar images.
 * variant: 0 = process automation (gears + docs on belt)
 *          1 = system integrations (dots moving along lines)
 *          2 = data & reporting (pulsing dashboard bars)
 */
const ServiceAnimationOverlay = ({ variant }: { variant: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect reduced motion
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

    const drawGear = (cx: number, cy: number, r: number, teeth: number, angle: number, opacity: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `${TEAL}0.6)`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < teeth; i++) {
        const a0 = (i / teeth) * Math.PI * 2;
        const a1 = ((i + 0.15) / teeth) * Math.PI * 2;
        const a2 = ((i + 0.5) / teeth) * Math.PI * 2;
        const a3 = ((i + 0.65) / teeth) * Math.PI * 2;
        const inner = r * 0.75;
        ctx.lineTo(Math.cos(a0) * inner, Math.sin(a0) * inner);
        ctx.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
        ctx.lineTo(Math.cos(a2) * r, Math.sin(a2) * r);
        ctx.lineTo(Math.cos(a3) * inner, Math.sin(a3) * inner);
      }
      ctx.closePath();
      ctx.stroke();
      // center circle
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = `${TEAL}0.4)`;
      ctx.fill();
      ctx.restore();
    };

    const drawDoc = (x: number, y: number, w: number, h: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = `${TEAL}0.5)`;
      ctx.lineWidth = 1.2;
      ctx.strokeRect(x - w / 2, y - h / 2, w, h);
      // lines inside doc
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(x - w / 2 + 4, y - h / 2 + 8 + i * 6);
        ctx.lineTo(x + w / 2 - 4 - i * 3, y - h / 2 + 8 + i * 6);
        ctx.strokeStyle = `${TEAL}${0.3 - i * 0.05})`;
        ctx.stroke();
      }
      ctx.restore();
    };

    const animate = () => {
      if (!isVisible) { raf = requestAnimationFrame(animate); return; }
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) { raf = requestAnimationFrame(animate); return; }
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      if (variant === 0) {
        // Process Automation: rotating gears + moving docs on a belt
        const beltY = h * 0.65;
        // Belt line
        ctx.strokeStyle = `${TEAL}0.15)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w * 0.05, beltY);
        ctx.lineTo(w * 0.95, beltY);
        ctx.stroke();

        // Gears
        drawGear(w * 0.72, h * 0.32, Math.min(w, h) * 0.12, 8, frame * 0.015, 0.5);
        drawGear(w * 0.85, h * 0.42, Math.min(w, h) * 0.07, 6, -frame * 0.025, 0.4);
        drawGear(w * 0.65, h * 0.45, Math.min(w, h) * 0.05, 6, frame * 0.02, 0.3);

        // Moving docs on belt
        for (let i = 0; i < 3; i++) {
          const docW = Math.min(w, h) * 0.08;
          const docH = docW * 1.3;
          const progress = ((frame * 0.8 + i * 120) % 360) / 360;
          const x = w * 0.05 + progress * w * 0.9;
          const fadeIn = Math.min(1, progress * 5);
          const fadeOut = Math.min(1, (1 - progress) * 5);
          drawDoc(x, beltY - docH / 2 - 4, docW, docH, 0.5 * fadeIn * fadeOut);
        }
      } else if (variant === 1) {
        // System Integrations: dots moving along connection lines
        const nodes = [
          { x: w * 0.2, y: h * 0.3 },
          { x: w * 0.5, y: h * 0.2 },
          { x: w * 0.8, y: h * 0.3 },
          { x: w * 0.35, y: h * 0.6 },
          { x: w * 0.65, y: h * 0.6 },
          { x: w * 0.5, y: h * 0.8 },
        ];
        const connections = [
          [0, 1], [1, 2], [0, 3], [2, 4], [3, 4], [3, 5], [4, 5], [1, 3], [1, 4],
        ];

        // Draw lines
        ctx.strokeStyle = `${TEAL}0.1)`;
        ctx.lineWidth = 1;
        connections.forEach(([a, b]) => {
          ctx.beginPath();
          ctx.moveTo(nodes[a].x, nodes[a].y);
          ctx.lineTo(nodes[b].x, nodes[b].y);
          ctx.stroke();
        });

        // Draw nodes
        nodes.forEach((n) => {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `${TEAL}0.3)`;
          ctx.fill();
        });

        // Moving dots along connections
        connections.forEach(([a, b], i) => {
          const speed = 0.003 + (i % 3) * 0.001;
          const t = ((frame * speed + i * 0.15) % 1);
          const x = nodes[a].x + (nodes[b].x - nodes[a].x) * t;
          const y = nodes[a].y + (nodes[b].y - nodes[a].y) * t;

          // Glow
          const grad = ctx.createRadialGradient(x, y, 0, x, y, 8);
          grad.addColorStop(0, `${TEAL2}0.5)`);
          grad.addColorStop(1, `${TEAL2}0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(x - 8, y - 8, 16, 16);

          // Dot
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${TEAL2}0.7)`;
          ctx.fill();
        });
      } else {
        // Data & Reporting: pulsing/animated dashboard bars and chart elements
        const barCount = 6;
        const barW = w * 0.06;
        const barGap = w * 0.04;
        const totalBarW = barCount * barW + (barCount - 1) * barGap;
        const startX = (w - totalBarW) / 2;
        const baseY = h * 0.75;
        const maxH = h * 0.4;

        for (let i = 0; i < barCount; i++) {
          const barHeight = maxH * (0.3 + 0.7 * Math.abs(Math.sin(frame * 0.02 + i * 0.8)));
          const x = startX + i * (barW + barGap);
          const y = baseY - barHeight;

          ctx.fillStyle = `${TEAL}${0.15 + 0.1 * Math.sin(frame * 0.03 + i)})`;
          ctx.fillRect(x, y, barW, barHeight);

          // Top glow
          const grad = ctx.createLinearGradient(x, y, x, y + 8);
          grad.addColorStop(0, `${TEAL2}0.4)`);
          grad.addColorStop(1, `${TEAL2}0)`);
          ctx.fillStyle = grad;
          ctx.fillRect(x, y, barW, 8);
        }

        // Sine wave line across
        ctx.beginPath();
        ctx.strokeStyle = `${TEAL2}0.25)`;
        ctx.lineWidth = 1.5;
        for (let x = 0; x <= w; x += 3) {
          const y = h * 0.35 + Math.sin(x * 0.02 + frame * 0.03) * h * 0.08 + Math.sin(x * 0.008 + frame * 0.015) * h * 0.05;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Dot on sine wave
        const dotX = ((frame * 1.5) % w);
        const dotY = h * 0.35 + Math.sin(dotX * 0.02 + frame * 0.03) * h * 0.08 + Math.sin(dotX * 0.008 + frame * 0.015) * h * 0.05;
        const dGrad = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 6);
        dGrad.addColorStop(0, `${TEAL2}0.6)`);
        dGrad.addColorStop(1, `${TEAL2}0)`);
        ctx.fillStyle = dGrad;
        ctx.fillRect(dotX - 6, dotY - 6, 12, 12);
        ctx.beginPath();
        ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `${TEAL2}0.8)`;
        ctx.fill();
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
