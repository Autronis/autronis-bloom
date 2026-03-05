/**
 * Shared flow diagram engine — reusable across all case study diagrams.
 * Provides: types, icons, path building, visibility wrapper, node card, and main SVG renderer.
 */
import { ReactNode, useEffect, useRef, useState, useCallback, useId, useMemo } from "react";

export type Point = { x: number; y: number };
export type DiagramNode = {
  title: string;
  desc: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

export const ICONS: Record<string, string> = {
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z",
  search: "M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5zM16 16l4.5 4.5",
  database: "M12 2C6.5 2 4 3.8 4 5s2.5 3 8 3 8-1.8 8-3-2.5-3-8-3zM4 5v14c0 1.2 2.5 3 8 3s8-1.8 8-3V5M4 12c0 1.2 2.5 3 8 3s8-1.8 8-3",
  bot: "M12 8V4H8M4 14a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4zM9 18v2M15 18v2M9 15h0M15 15h0",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  dashboard: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.65 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.76.29 1.55.52 2.36.65A2 2 0 0 1 22 16.92z",
  // New icons for support & marketing diagrams
  messageCircle: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  brain: "M12 2a4 4 0 0 0-4 4v1a3 3 0 0 0-3 3v1a3 3 0 0 0 0 6v1a3 3 0 0 0 3 3v1a4 4 0 0 0 8 0v-1a3 3 0 0 0 3-3v-1a3 3 0 0 0 0-6v-1a3 3 0 0 0-3-3V6a4 4 0 0 0-4-4z",
  reply: "M9 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5l-5 5v-5z",
  userCheck: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM17 11l2 2 4-4",
  alertTriangle: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  barChart: "M12 20V10M18 20V4M6 20v-4",
  trendingUp: "M23 6l-9.5 9.5-5-5L1 18",
  pieChart: "M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z",
  fileText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4z",
  lightbulb: "M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z",
};

const toPath = (pts: Point[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

const buildPathData = (segments: Point[][]) => {
  const points: Point[] = [];
  const segmentEndIndices: number[] = [];

  segments.forEach((seg) => {
    seg.forEach((p) => {
      const last = points[points.length - 1];
      if (!last || last.x !== p.x || last.y !== p.y) points.push(p);
    });
    segmentEndIndices.push(points.length - 1);
  });

  if (!points.length) return { path: "", checkpoints: [0] };

  const cumulative: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    cumulative[i] = cumulative[i - 1] + Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }

  const total = cumulative[cumulative.length - 1] || 1;
  const checkpoints = [0, ...segmentEndIndices.map((idx) => Math.min(cumulative[idx] / total, 0.999))];

  return {
    path: points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" "),
    checkpoints,
  };
};

/* ─── Visibility wrapper ─── */
const VisibleSvg = ({ children, viewBox, className, onVisibilityChange }: {
  children: ReactNode; viewBox: string; className?: string;
  onVisibilityChange?: (vis: boolean) => void;
}) => {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => onVisibilityChange?.(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onVisibilityChange]);
  return (
    <svg ref={ref} viewBox={viewBox} className={className} fill="none" overflow="visible"
      role="img" aria-label="Automatiseringsdiagram">{children}</svg>
  );
};

/* ─── Node card (arrival pulse animation) ─── */
const easeInOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const NodeCard = ({ node, pulseSignal }: {
  node: DiagramNode; pulseSignal: number;
}) => {
  const gRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGRectElement>(null);
  const rafRef = useRef(0);

  const setVisualState = useCallback((scale: number) => {
    const g = gRef.current;
    if (g) g.setAttribute("transform", `translate(${node.x}, ${node.y}) scale(${scale}) translate(${-node.x}, ${-node.y})`);

    const glow = glowRef.current;
    if (glow) {
      const opacity = Math.max(0, Math.min(1, (scale - 1) / 0.06)) * 0.35;
      glow.setAttribute("opacity", String(opacity));
    }
  }, [node.x, node.y]);

  useEffect(() => {
    setVisualState(1);
  }, [setVisualState]);

  useEffect(() => {
    if (pulseSignal === 0) return;

    cancelAnimationFrame(rafRef.current);

    const UP = 220;
    const HOLD = 450;
    const DOWN = 430;
    const TOTAL = UP + HOLD + DOWN;

    let start = 0;

    const run = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;

      let scale = 1;
      if (elapsed < UP) {
        scale = 1 + 0.06 * easeInOut(elapsed / UP);
      } else if (elapsed < UP + HOLD) {
        scale = 1.06;
      } else if (elapsed < TOTAL) {
        scale = 1.06 - 0.06 * easeInOut((elapsed - UP - HOLD) / DOWN);
      }

      setVisualState(scale);

      if (elapsed < TOTAL) {
        rafRef.current = requestAnimationFrame(run);
      } else {
        setVisualState(1);
      }
    };

    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  }, [pulseSignal, setVisualState]);

  const padX = 6;
  const iconBoxSize = 17;
  const iconBoxX = node.x - node.w / 2 + padX;
  const iconBoxY = node.y - iconBoxSize / 2;

  return (
    <g ref={gRef}>
      <rect x={node.x - node.w / 2} y={node.y - node.h / 2}
        width={node.w} height={node.h} rx={7}
        fill="hsl(var(--primary) / 0.05)" />
      <rect x={node.x - node.w / 2} y={node.y - node.h / 2}
        width={node.w} height={node.h} rx={7}
        fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" />
      <rect ref={glowRef}
        x={node.x - node.w / 2 - 1} y={node.y - node.h / 2 - 1}
        width={node.w + 2} height={node.h + 2} rx={8}
        fill="none" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity="0" />

      <rect x={iconBoxX} y={iconBoxY} width={iconBoxSize} height={iconBoxSize} rx={3.5}
        fill="hsl(var(--primary) / 0.1)" />
      <g transform={`translate(${iconBoxX + 3}, ${iconBoxY + 3})`}>
        <path d={ICONS[node.icon] || ""} fill="none"
          stroke="hsl(var(--primary))" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round"
          transform="scale(0.458)" />
      </g>

      <text x={iconBoxX + iconBoxSize + 5} y={node.y - 2}
        fontSize="7.5" fontWeight="700"
        fill="hsl(var(--foreground))" fontFamily="inherit" letterSpacing="0.1">
        {node.title}
      </text>
      <text x={iconBoxX + iconBoxSize + 5} y={node.y + 7.5}
        fontSize="6"
        fill="hsl(var(--muted-foreground))" fontFamily="inherit">
        {node.desc}
      </text>
    </g>
  );
};

/* ─── Main diagram with smooth single-path dot + strict mask ─── */
export const FlowDiagramSvg = ({ viewBox, nodes, segments }: {
  viewBox: string; nodes: DiagramNode[]; segments: Point[][];
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const trailRefs = useRef<(SVGCircleElement | null)[]>([]);
  const dotPulseRef = useRef(0);
  const [pulseSignals, setPulseSignals] = useState<number[]>(() => nodes.map(() => 0));
  const visibleRef = useRef(false);
  const animIdRef = useRef(0);
  const startRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const prevElapsedRef = useRef(0);
  const checkpointIndexRef = useRef(-1);
  const pathLengthRef = useRef(1);

  const uid = useId().replace(/:/g, "");
  const markerId = `${uid}-arrow`;
  const maskId = `${uid}-mask`;

  const { path: continuousPath, checkpoints } = useMemo(() => buildPathData(segments), [segments]);
  const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);

  const TRAVEL_DURATION = 16000;
  const END_PAUSE = 1000;
  const TOTAL_CYCLE = TRAVEL_DURATION + END_PAUSE;
  const MASK_PAD = 2;

  // Remap progress so the L-shaped connector (segment[2], between checkpoint[2] and checkpoint[3]) moves 40% faster
  const remapProgress = useCallback((t: number) => {
    if (checkpoints.length < 5) return t;
    const segStart = checkpoints[2]; // start of L-connector
    const segEnd = checkpoints[3];   // end of L-connector
    const segLen = segEnd - segStart;
    const fastSegLen = segLen * 0.6; // 40% faster
    const shift = segLen - fastSegLen;
    if (t <= segStart) return t;
    if (t <= segStart + fastSegLen) {
      return segStart + ((t - segStart) / fastSegLen) * segLen;
    }
    return t + shift;
  }, [checkpoints]);

  useEffect(() => {
    setPulseSignals(nodes.map(() => 0));
    checkpointIndexRef.current = -1;
    prevElapsedRef.current = 0;
  }, [nodes]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    pathLengthRef.current = path.getTotalLength() || 1;
  }, [continuousPath, viewBox]);

  const triggerHighlight = useCallback((nodeIndex: number) => {
    setPulseSignals((prev) => {
      const next = prev.length === nodes.length ? [...prev] : nodes.map(() => 0);
      next[nodeIndex] = (next[nodeIndex] ?? 0) + 1;
      return next;
    });
  }, [nodes]);

  const TRAIL_COUNT = 5;
  const TRAIL_SPACING = 0.008; // progress gap between trail dots

  const tick = useCallback((now: number) => {
    if (!visibleRef.current) return;

    const path = pathRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;

    if (!path || !dot || !glow) {
      animIdRef.current = requestAnimationFrame(tick);
      return;
    }

    if (startRef.current === null) {
      startRef.current = now - elapsedRef.current;
      if (checkpointIndexRef.current < 0 && checkpoints.length) {
        checkpointIndexRef.current = 0;
        triggerHighlight(0);
        dotPulseRef.current = now;
      }
    }

    const elapsedInCycle = (now - startRef.current) % TOTAL_CYCLE;
    const wrapped = elapsedInCycle < prevElapsedRef.current;

    if (wrapped) {
      checkpointIndexRef.current = 0;
      if (checkpoints.length) {
        triggerHighlight(0);
        dotPulseRef.current = now;
      }
    }

    prevElapsedRef.current = elapsedInCycle;
    elapsedRef.current = elapsedInCycle;

    const linearProgress = Math.min(elapsedInCycle / TRAVEL_DURATION, 1);
    const progress = remapProgress(linearProgress);

    if (progress < 1) {
      const len = pathLengthRef.current;
      const pt = path.getPointAtLength(progress * len);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      dot.setAttribute("opacity", "1");
      glow.setAttribute("cx", String(pt.x));
      glow.setAttribute("cy", String(pt.y));
      glow.setAttribute("opacity", "1");

      // Dot pulse on checkpoint arrival
      if (dotPulseRef.current > 0) {
        const pulseAge = now - dotPulseRef.current;
        if (pulseAge < 300) {
          const p = pulseAge / 300;
          const s = 1 + 0.4 * Math.sin(p * Math.PI);
          dot.setAttribute("r", String(3.5 * s));
          glow.setAttribute("r", String(9 * s));
        } else {
          dot.setAttribute("r", "3.5");
          glow.setAttribute("r", "9");
          dotPulseRef.current = 0;
        }
      }

      // Trail dots
      for (let t = 0; t < TRAIL_COUNT; t++) {
        const trailEl = trailRefs.current[t];
        if (!trailEl) continue;
        const tp = Math.max(0, progress - TRAIL_SPACING * (t + 1));
        const tpt = path.getPointAtLength(tp * len);
        trailEl.setAttribute("cx", String(tpt.x));
        trailEl.setAttribute("cy", String(tpt.y));
        trailEl.setAttribute("opacity", String(0.3 - t * 0.055));
      }

      for (let i = checkpointIndexRef.current + 1; i < checkpoints.length; i++) {
        if (progress >= checkpoints[i]) {
          checkpointIndexRef.current = i;
          triggerHighlight(i);
          dotPulseRef.current = now;
        } else {
          break;
        }
      }
    } else {
      dot.setAttribute("opacity", "0");
      glow.setAttribute("opacity", "0");
      dot.setAttribute("r", "3.5");
      glow.setAttribute("r", "9");
      for (let t = 0; t < TRAIL_COUNT; t++) {
        trailRefs.current[t]?.setAttribute("opacity", "0");
      }
    }

    animIdRef.current = requestAnimationFrame(tick);
  }, [checkpoints, TOTAL_CYCLE, TRAVEL_DURATION, triggerHighlight, remapProgress]);

  const handleVisibility = useCallback((vis: boolean) => {
    visibleRef.current = vis;

    if (vis) {
      cancelAnimationFrame(animIdRef.current);
      animIdRef.current = requestAnimationFrame(tick);
      return;
    }

    if (startRef.current !== null) {
      const now = performance.now();
      elapsedRef.current = (now - startRef.current) % TOTAL_CYCLE;
      prevElapsedRef.current = elapsedRef.current;
    }

    startRef.current = null;
    cancelAnimationFrame(animIdRef.current);
  }, [tick, TOTAL_CYCLE]);

  useEffect(() => {
    return () => cancelAnimationFrame(animIdRef.current);
  }, []);

  return (
    <VisibleSvg viewBox={viewBox} className="w-full h-auto" onVisibilityChange={handleVisibility}>
      <defs>
        <marker id={markerId} markerWidth="5" markerHeight="5" refX="1" refY="2.5"
          orient="auto" markerUnits="strokeWidth" overflow="visible">
          <path d="M0,0.4 L0,4.6 L4.6,2.5 z" fill="hsl(var(--primary))" />
        </marker>

        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={vbWidth} height={vbHeight}>
          <rect x="0" y="0" width={vbWidth} height={vbHeight} fill="white" />
          {nodes.map((n) => (
            <rect
              key={`mask-${n.title}`}
              x={n.x - n.w / 2 - MASK_PAD}
              y={n.y - n.h / 2 - MASK_PAD}
              width={n.w + MASK_PAD * 2}
              height={n.h + MASK_PAD * 2}
              rx={8 + MASK_PAD}
              fill="black"
            />
          ))}
        </mask>
      </defs>

      <g mask={`url(#${maskId})`}>
        {segments.map((seg, idx) => (
          <g key={idx}>
            <path d={toPath(seg)} stroke="hsl(var(--primary))" strokeWidth="3"
              strokeOpacity="0.08" strokeLinecap="round" />
            <path d={toPath(seg)} stroke="hsl(var(--primary))" strokeWidth="1.2"
              strokeOpacity="1" strokeLinecap="round" markerEnd={`url(#${markerId})`} />
          </g>
        ))}

        <path ref={pathRef} d={continuousPath} fill="none" stroke="none" />
        {Array.from({ length: 5 }).map((_, i) => (
          <circle key={`trail-${i}`} ref={(el) => { trailRefs.current[i] = el; }}
            cx="0" cy="0" r={3 - i * 0.4} fill="hsl(var(--primary))" opacity="0" />
        ))}
        <circle ref={glowRef} cx="0" cy="0" r="9" fill="hsl(var(--primary) / 0.12)" opacity="0" />
        <circle ref={dotRef} cx="0" cy="0" r="3.5" fill="hsl(var(--primary))" opacity="0" />
      </g>

      {nodes.map((n, i) => (
        <NodeCard key={n.title} node={n} pulseSignal={pulseSignals[i] ?? 0} />
      ))}
    </VisibleSvg>
  );
};
