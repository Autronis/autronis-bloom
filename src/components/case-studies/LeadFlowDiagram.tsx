import { ReactNode, useEffect, useRef, useState, useCallback } from "react";

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

const polylineLength = (pts: Point[]) => {
  let t = 0;
  for (let i = 1; i < pts.length; i++) t += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return t;
};

const toPath = (pts: Point[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

const buildContinuousPath = (segments: Point[][]) => {
  const all: Point[] = [];
  segments.forEach((seg) => seg.forEach((p) => {
    const last = all[all.length - 1];
    if (!last || last.x !== p.x || last.y !== p.y) all.push(p);
  }));
  return all.length ? all.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") : "";
};

/* ─── Visibility wrapper ─── */
const VisibleSvg = ({ children, viewBox, className }: { children: ReactNode; viewBox: string; className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    vis ? el.unpauseAnimations?.() : el.pauseAnimations?.();
  }, [vis]);
  return (
    <svg ref={ref} viewBox={viewBox} className={className} fill="none" overflow="visible"
      role="img" aria-label="Automatiseringsdiagram">{children}</svg>
  );
};

/* ─── Node card (JS-driven highlight) ─── */
const NodeCard = ({ node, index, highlighted }: {
  node: DiagramNode; index: number; highlighted: boolean;
}) => {
  const gRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGRectElement>(null);
  const scaleRef = useRef(1);
  const targetRef = useRef(1);
  const raf = useRef(0);

  // Smooth spring-like interpolation for scale
  useEffect(() => {
    targetRef.current = highlighted ? 1.06 : 1;
    const animate = () => {
      const diff = targetRef.current - scaleRef.current;
      // Speed: ramp up fast (350ms feel), ramp down slower (450ms feel)
      const speed = diff > 0 ? 0.08 : 0.055;
      scaleRef.current += diff * speed;
      if (Math.abs(diff) < 0.0005) scaleRef.current = targetRef.current;

      const g = gRef.current;
      if (g) {
        g.setAttribute("transform", `translate(${node.x}, ${node.y}) scale(${scaleRef.current}) translate(${-node.x}, ${-node.y})`);
      }
      const glow = glowRef.current;
      if (glow) {
        const opacity = Math.max(0, (scaleRef.current - 1) / 0.06) * 0.55;
        glow.setAttribute("opacity", String(opacity));
      }

      if (scaleRef.current !== targetRef.current) {
        raf.current = requestAnimationFrame(animate);
      }
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [highlighted, node.x, node.y]);

  const padX = 7;
  const iconBoxSize = 20;
  const iconBoxX = node.x - node.w / 2 + padX;
  const iconBoxY = node.y - iconBoxSize / 2;

  return (
    <g ref={gRef}>

      {/* Card bg */}
      <rect x={node.x - node.w / 2} y={node.y - node.h / 2}
        width={node.w} height={node.h} rx={8}
        fill="hsl(var(--primary) / 0.05)" />
      {/* Card border */}
      <rect x={node.x - node.w / 2} y={node.y - node.h / 2}
        width={node.w} height={node.h} rx={8}
        fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" />
      {/* Glow border on highlight */}
      <rect ref={glowRef}
        x={node.x - node.w / 2 - 1} y={node.y - node.h / 2 - 1}
        width={node.w + 2} height={node.h + 2} rx={9}
        fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0" />

      {/* Icon box */}
      <rect x={iconBoxX} y={iconBoxY} width={iconBoxSize} height={iconBoxSize} rx={4}
        fill="hsl(var(--primary) / 0.1)" />
      <g transform={`translate(${iconBoxX + 3.5}, ${iconBoxY + 3.5})`}>
        <path d={ICONS[node.icon] || ""} fill="none"
          stroke="hsl(var(--primary))" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round"
          transform="scale(0.542)" />
      </g>

      {/* Title */}
      <text x={iconBoxX + iconBoxSize + 6} y={node.y - 2}
        fontSize="8" fontWeight="700"
        fill="hsl(var(--foreground))" fontFamily="inherit" letterSpacing="0.1">
        {node.title}
      </text>
      {/* Desc */}
      <text x={iconBoxX + iconBoxSize + 6} y={node.y + 8.5}
        fontSize="6.5"
        fill="hsl(var(--muted-foreground))" fontFamily="inherit">
        {node.desc}
      </text>
    </g>
  );
};

/* ─── Main diagram with JS-driven dot + per-node highlights ─── */
const FlowDiagramSvg = ({ viewBox, nodes, segments }: {
  viewBox: string; nodes: DiagramNode[]; segments: Point[][];
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const glowDotRef = useRef<SVGCircleElement>(null);
  const [highlightedNode, setHighlightedNode] = useState<number>(-1);
  const highlightTimers = useRef<number[]>([]);

  const continuousPath = buildContinuousPath(segments);
  const segLens = segments.map(polylineLength);
  const totalLen = segLens.reduce((a, b) => a + b, 0) || 1;
  const segTimes = segments.map((_, i) => ({
    start: segLens.slice(0, i).reduce((a, b) => a + b, 0) / totalLen,
    mid: (segLens.slice(0, i).reduce((a, b) => a + b, 0) + segLens[i] / 2) / totalLen,
    end: segLens.slice(0, i + 1).reduce((a, b) => a + b, 0) / totalLen,
  }));

  // Node arrival fractions (where each node sits along the full path)
  // Node 0 = start, Node 1 = after seg 0, Node 2 = after seg 1, etc.
  const nodeArrivals = [0, ...segLens.map((_, i) => segLens.slice(0, i + 1).reduce((a, b) => a + b, 0) / totalLen)];

  const vb = viewBox.split(" ").map(Number);
  const PAD = 12;

  // Mask rectangles for card areas
  const clipHoles = nodes.map((n) => {
    const x = n.x - n.w / 2 - PAD;
    const y = n.y - n.h / 2 - PAD;
    const w = n.w + PAD * 2;
    const h = n.h + PAD * 2;
    const r = 10;
    return `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
  }).join(" ");

  // JS animation loop for the dot
  const TRAVEL_DURATION = 12000; // ms for full path travel
  const END_PAUSE = 600; // ms pause after last node
  const HOLD_DURATION = 350; // ms hold at scale
  const TOTAL_CYCLE = TRAVEL_DURATION + END_PAUSE;

  const triggerHighlight = useCallback((nodeIndex: number) => {
    // Clear any existing timer for this node
    if (highlightTimers.current[nodeIndex]) {
      clearTimeout(highlightTimers.current[nodeIndex]);
    }
    setHighlightedNode(nodeIndex);
    highlightTimers.current[nodeIndex] = window.setTimeout(() => {
      setHighlightedNode((current) => current === nodeIndex ? -1 : current);
    }, HOLD_DURATION);
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    const glow = glowDotRef.current;
    if (!path || !dot || !glow) return;

    const pathLength = path.getTotalLength();
    let start: number | null = null;
    let lastTriggered = -1;
    let animId = 0;

    const tick = (now: number) => {
      if (start === null) start = now;
      const elapsed = (now - start) % TOTAL_CYCLE;
      const fraction = Math.min(elapsed / TRAVEL_DURATION, 1);

      if (fraction < 1) {
        const pt = path.getPointAtLength(fraction * pathLength);
        dot.setAttribute("cx", String(pt.x));
        dot.setAttribute("cy", String(pt.y));
        glow.setAttribute("cx", String(pt.x));
        glow.setAttribute("cy", String(pt.y));
        dot.setAttribute("opacity", "1");
        glow.setAttribute("opacity", "1");

        // Check if dot has reached a node
        for (let i = 0; i < nodeArrivals.length; i++) {
          if (fraction >= nodeArrivals[i] - 0.005 && lastTriggered < i) {
            lastTriggered = i;
            triggerHighlight(i);
          }
        }
      } else {
        // End pause: hide dot
        dot.setAttribute("opacity", "0");
        glow.setAttribute("opacity", "0");
        if (elapsed >= TOTAL_CYCLE - 50) {
          lastTriggered = -1; // reset for next loop
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      highlightTimers.current.forEach(clearTimeout);
    };
  }, [nodeArrivals, triggerHighlight]);

  return (
    <VisibleSvg viewBox={viewBox} className="w-full h-auto">
      <defs>
        <marker id="lead-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5"
          orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,7 L7,3.5 z" fill="hsl(var(--primary) / 0.45)" />
        </marker>
        <clipPath id="dot-clip">
          <path d={`M0,0 H${vb[2]} V${vb[3]} H0 Z ${clipHoles}`}
            fillRule="evenodd" fill="white" />
        </clipPath>
      </defs>

      {/* Connector lines */}
      {segments.map((seg, idx) => (
        <g key={idx}>
          <path d={toPath(seg)} stroke="hsl(var(--primary))" strokeWidth="3"
            strokeOpacity="0.06" strokeLinecap="round" />
          <path d={toPath(seg)} stroke="hsl(var(--primary))" strokeWidth="1.2"
            strokeOpacity="0.22" strokeLinecap="round" markerEnd="url(#lead-arrow)" />
        </g>
      ))}

      {/* Cards on top */}
      {nodes.map((n, i) => (
        <NodeCard key={n.title} node={n} index={i} highlighted={highlightedNode === i} />
      ))}

      {/* Dot – clipped behind cards */}
      <g clipPath="url(#dot-clip)">
        <path ref={pathRef} id="lead-flow-route" d={continuousPath} fill="none" stroke="none" />
        <circle ref={glowDotRef} cx="0" cy="0" r="8" fill="hsl(var(--primary) / 0.12)" opacity="0" />
        <circle ref={dotRef} cx="0" cy="0" r="3.5" fill="hsl(var(--primary))" opacity="0" />
      </g>
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
