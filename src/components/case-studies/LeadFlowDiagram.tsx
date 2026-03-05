import { ReactNode, useEffect, useRef, useState, useCallback, useId, useMemo } from "react";

type Point = { x: number; y: number };
type DiagramNode = {
  title: string;
  desc: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const ICONS: Record<string, string> = {
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z",
  search: "M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5zM16 16l4.5 4.5",
  database: "M12 2C6.5 2 4 3.8 4 5s2.5 3 8 3 8-1.8 8-3-2.5-3-8-3zM4 5v14c0 1.2 2.5 3 8 3s8-1.8 8-3V5M4 12c0 1.2 2.5 3 8 3s8-1.8 8-3",
  bot: "M12 8V4H8M4 14a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4zM9 18v2M15 18v2M9 15h0M15 15h0",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  dashboard: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.65 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.76.29 1.55.52 2.36.65A2 2 0 0 1 22 16.92z",
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
  const checkpoints = [0, ...segmentEndIndices.map((idx) => cumulative[idx] / total)];

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
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

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
      const opacity = Math.max(0, Math.min(1, (scale - 1) / 0.06)) * 0.55;
      glow.setAttribute("opacity", String(opacity));
    }
  }, [node.x, node.y]);

  useEffect(() => {
    setVisualState(1);
  }, [setVisualState]);

  useEffect(() => {
    if (pulseSignal === 0) return;

    cancelAnimationFrame(rafRef.current);

    const UP = 250;
    const HOLD = 200;
    const DOWN = 250;
    const TOTAL = UP + HOLD + DOWN;

    let start = 0;

    const run = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;

      let scale = 1;
      if (elapsed < UP) {
        scale = 1 + 0.06 * easeOut(elapsed / UP);
      } else if (elapsed < UP + HOLD) {
        scale = 1.06;
      } else if (elapsed < TOTAL) {
        scale = 1.06 - 0.06 * easeOut((elapsed - UP - HOLD) / DOWN);
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

  const padX = 7;
  const iconBoxSize = 20;
  const iconBoxX = node.x - node.w / 2 + padX;
  const iconBoxY = node.y - iconBoxSize / 2;

  return (
    <g ref={gRef}>
      <rect x={node.x - node.w / 2} y={node.y - node.h / 2}
        width={node.w} height={node.h} rx={8}
        fill="hsl(var(--primary) / 0.05)" />
      <rect x={node.x - node.w / 2} y={node.y - node.h / 2}
        width={node.w} height={node.h} rx={8}
        fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" />
      <rect ref={glowRef}
        x={node.x - node.w / 2 - 1} y={node.y - node.h / 2 - 1}
        width={node.w + 2} height={node.h + 2} rx={9}
        fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0" />

      <rect x={iconBoxX} y={iconBoxY} width={iconBoxSize} height={iconBoxSize} rx={4}
        fill="hsl(var(--primary) / 0.1)" />
      <g transform={`translate(${iconBoxX + 3.5}, ${iconBoxY + 3.5})`}>
        <path d={ICONS[node.icon] || ""} fill="none"
          stroke="hsl(var(--primary))" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round"
          transform="scale(0.542)" />
      </g>

      <text x={iconBoxX + iconBoxSize + 6} y={node.y - 2}
        fontSize="8" fontWeight="700"
        fill="hsl(var(--foreground))" fontFamily="inherit" letterSpacing="0.1">
        {node.title}
      </text>
      <text x={iconBoxX + iconBoxSize + 6} y={node.y + 8.5}
        fontSize="6.5"
        fill="hsl(var(--muted-foreground))" fontFamily="inherit">
        {node.desc}
      </text>
    </g>
  );
};

/* ─── Main diagram with smooth single-path dot + strict mask ─── */
const FlowDiagramSvg = ({ viewBox, nodes, segments }: {
  viewBox: string; nodes: DiagramNode[]; segments: Point[][];
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const glowDotRef = useRef<SVGCircleElement>(null);
  const [pulseSignals, setPulseSignals] = useState<number[]>(() => nodes.map(() => 0));
  const visibleRef = useRef(false);
  const animIdRef = useRef(0);
  const startRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const prevElapsedRef = useRef(0);
  const checkpointIndexRef = useRef(-1);
  const pathLengthRef = useRef(1);

  const uid = useId().replace(/:/g, "");
  const markerId = `${uid}-lead-arrow`;
  const maskId = `${uid}-flow-mask`;

  const { path: continuousPath, checkpoints } = useMemo(() => buildPathData(segments), [segments]);
  const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);

  const TRAVEL_DURATION = 16000;
  const END_PAUSE = 1000;
  const TOTAL_CYCLE = TRAVEL_DURATION + END_PAUSE;
  const MASK_PAD = 2;

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

  const tick = useCallback((now: number) => {
    if (!visibleRef.current) return;

    const path = pathRef.current;
    const dot = dotRef.current;
    const glow = glowDotRef.current;

    if (!path || !dot || !glow) {
      animIdRef.current = requestAnimationFrame(tick);
      return;
    }

    if (startRef.current === null) startRef.current = now - elapsedRef.current;

    const elapsedInCycle = (now - startRef.current) % TOTAL_CYCLE;
    const wrapped = elapsedInCycle < prevElapsedRef.current;

    if (wrapped) checkpointIndexRef.current = -1;

    prevElapsedRef.current = elapsedInCycle;
    elapsedRef.current = elapsedInCycle;

    const progress = Math.min(elapsedInCycle / TRAVEL_DURATION, 1);

    if (progress < 1) {
      const pt = path.getPointAtLength(progress * pathLengthRef.current);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      glow.setAttribute("cx", String(pt.x));
      glow.setAttribute("cy", String(pt.y));
      dot.setAttribute("opacity", "1");
      glow.setAttribute("opacity", "1");

      for (let i = checkpointIndexRef.current + 1; i < checkpoints.length; i++) {
        if (progress >= checkpoints[i]) {
          checkpointIndexRef.current = i;
          triggerHighlight(i);
        } else {
          break;
        }
      }
    } else {
      dot.setAttribute("opacity", "0");
      glow.setAttribute("opacity", "0");
    }

    animIdRef.current = requestAnimationFrame(tick);
  }, [checkpoints, TOTAL_CYCLE, TRAVEL_DURATION, triggerHighlight]);

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
        <marker id={markerId} markerWidth="7" markerHeight="7" refX="6" refY="3.5"
          orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,7 L7,3.5 z" fill="hsl(var(--primary) / 0.45)" />
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
              strokeOpacity="0.06" strokeLinecap="round" />
            <path d={toPath(seg)} stroke="hsl(var(--primary))" strokeWidth="1.2"
              strokeOpacity="0.22" strokeLinecap="round" markerEnd={`url(#${markerId})`} />
          </g>
        ))}

        <path ref={pathRef} d={continuousPath} fill="none" stroke="none" />
        <circle ref={glowDotRef} cx="0" cy="0" r="8" fill="hsl(var(--primary) / 0.12)" opacity="0" />
        <circle ref={dotRef} cx="0" cy="0" r="3.5" fill="hsl(var(--primary))" opacity="0" />
      </g>

      {nodes.map((n, i) => (
        <NodeCard key={n.title} node={n} pulseSignal={pulseSignals[i] ?? 0} />
      ))}
    </VisibleSvg>
  );
};

/* ═══ Layouts ═══ */
const CW = 128, CH = 40;

const desktopNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 86, y: 70, w: CW, h: CH },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", icon: "search", x: 240, y: 70, w: CW + 12, h: CH },
  { title: "Data verwerking", desc: "Extractie & verrijking", icon: "database", x: 394, y: 70, w: CW, h: CH },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 240, y: 180, w: CW + 18, h: CH + 4 },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", icon: "mail", x: 240, y: 278, w: CW + 28, h: CH + 4 },
  { title: "Dashboard synchronisatie", desc: "Opslaan van leads", icon: "dashboard", x: 240, y: 376, w: CW + 34, h: CH + 4 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 240, y: 474, w: CW + 18, h: CH + 4 },
];

const desktopSegments: Point[][] = [
  [{ x: 150, y: 70 }, { x: 174, y: 70 }],
  [{ x: 306, y: 70 }, { x: 330, y: 70 }],
  [{ x: 394, y: 90 }, { x: 394, y: 130 }, { x: 240, y: 130 }, { x: 240, y: 158 }],
  [{ x: 240, y: 204 }, { x: 240, y: 256 }],
  [{ x: 240, y: 302 }, { x: 240, y: 354 }],
  [{ x: 240, y: 400 }, { x: 240, y: 452 }],
];

const MW = 198, MH = 40;

const mobileNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 155, y: 48, w: MW, h: MH },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", icon: "search", x: 155, y: 122, w: MW + 8, h: MH },
  { title: "Data verwerking", desc: "Extractie & verrijking", icon: "database", x: 155, y: 196, w: MW, h: MH },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 155, y: 270, w: MW, h: MH },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", icon: "mail", x: 155, y: 348, w: MW + 12, h: MH },
  { title: "Dashboard synchronisatie", desc: "Opslaan van leads", icon: "dashboard", x: 155, y: 426, w: MW + 8, h: MH },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 155, y: 504, w: MW, h: MH },
];

const mobileSegments: Point[][] = [
  [{ x: 155, y: 68 }, { x: 155, y: 102 }],
  [{ x: 155, y: 142 }, { x: 155, y: 176 }],
  [{ x: 155, y: 216 }, { x: 155, y: 250 }],
  [{ x: 155, y: 290 }, { x: 155, y: 328 }],
  [{ x: 155, y: 368 }, { x: 155, y: 406 }],
  [{ x: 155, y: 446 }, { x: 155, y: 484 }],
];

const LeadFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 480 520" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 310 545" nodes={mobileNodes} segments={mobileSegments} />
    </div>
  </div>
);

export default LeadFlowDiagram;
