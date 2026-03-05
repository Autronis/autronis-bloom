import { ReactNode, useEffect, useRef, useState } from "react";

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

const DURATION = 16;
const fmt = (n: number) => (Number.isFinite(n) ? n.toFixed(5).replace(/\.?0+$/, "") : "0");

/* Lucide-style SVG path data (24×24 viewBox) */
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

/* Build a SINGLE continuous SVG path from all segments */
const buildContinuousPath = (segments: Point[][]) => {
  const allPoints: Point[] = [];
  segments.forEach((seg) => {
    seg.forEach((p) => {
      // Avoid exact duplicates at segment boundaries
      const last = allPoints[allPoints.length - 1];
      if (!last || last.x !== p.x || last.y !== p.y) {
        allPoints.push(p);
      }
    });
  });
  if (!allPoints.length) return "";
  return allPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
};

const toPath = (pts: Point[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

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
      role="img" aria-label="Automatiseringsdiagram">
      {children}
    </svg>
  );
};

/* ─── Node card ───
   Styled to match MetricCard: border-primary/20, bg-primary/5,
   icon box bg-primary/10 with primary icon color.
   Uses HSL from CSS vars so it works in both themes. */
const NodeCard = ({ node, index, arrivalFrac }: { node: DiagramNode; index: number; arrivalFrac: number }) => {
  const padX = 7;
  const iconBoxSize = 20;
  const iconBoxX = node.x - node.w / 2 + padX;
  const iconBoxY = node.y - iconBoxSize / 2;

  // Smooth scale pulse: matches site hover (200ms ease-out, scale 1.015)
  // Mapped to fraction of DURATION with smooth splines
  const t0 = fmt(Math.max(0, arrivalFrac - 0.015));
  const t1 = fmt(arrivalFrac);
  const t2 = fmt(Math.min(1, arrivalFrac + 0.025));
  const t3 = fmt(Math.min(1, arrivalFrac + 0.065));
  const kT = `0;${t0};${t1};${t2};${t3};1`;
  const splines = "0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1";

  return (
    <g style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
      {/* Gentle float */}
      <animateTransform attributeName="transform" type="translate"
        values="0 0;0 -1;0 0" dur={`${3.5 + (index % 3) * 0.5}s`}
        begin={`${index * 0.15}s`} repeatCount="indefinite" />

      {/* Scale pulse – same feel as site hover: 1.015, ease-out */}
      <animateTransform attributeName="transform" type="scale"
        values="1;1;1;1.015;1.015;1" keyTimes={kT}
        calcMode="spline" keySplines={splines}
        dur={`${DURATION}s`} repeatCount="indefinite" additive="sum" />

      {/* ── Card background: matches MetricCard bg-primary/5 ── */}
      <rect x={node.x - node.w / 2} y={node.y - node.h / 2}
        width={node.w} height={node.h} rx={8}
        fill="hsl(var(--primary) / 0.05)" />

      {/* ── Card border: matches MetricCard border-primary/20 ── */}
      <rect x={node.x - node.w / 2} y={node.y - node.h / 2}
        width={node.w} height={node.h} rx={8}
        fill="none" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" />

      {/* ── Arrival glow border (turquoise pulse) ── */}
      <rect x={node.x - node.w / 2 - 1} y={node.y - node.h / 2 - 1}
        width={node.w + 2} height={node.h + 2} rx={9}
        fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0">
        <animate attributeName="opacity"
          values="0;0;0;0.55;0.55;0" keyTimes={kT}
          calcMode="spline" keySplines={splines}
          dur={`${DURATION}s`} repeatCount="indefinite" />
      </rect>

      {/* ── Icon container: matches bg-primary/10 rounded-md ── */}
      <rect x={iconBoxX} y={iconBoxY} width={iconBoxSize} height={iconBoxSize} rx={4}
        fill="hsl(var(--primary) / 0.1)" />
      <g transform={`translate(${iconBoxX + 3.5}, ${iconBoxY + 3.5})`}>
        <path d={ICONS[node.icon] || ""} fill="none"
          stroke="hsl(var(--primary))" strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round"
          transform="scale(0.542)" />
      </g>

      {/* ── Title: font-bold text-foreground ── */}
      <text x={iconBoxX + iconBoxSize + 6} y={node.y - 2}
        fontSize="8" fontWeight="700"
        fill="hsl(var(--foreground))" fontFamily="inherit" letterSpacing="0.1">
        {node.title}
      </text>

      {/* ── Description: text-muted-foreground ── */}
      <text x={iconBoxX + iconBoxSize + 6} y={node.y + 8.5}
        fontSize="6.5"
        fill="hsl(var(--muted-foreground))" fontFamily="inherit">
        {node.desc}
      </text>
    </g>
  );
};

/* ─── Diagram renderer ─── */
const FlowDiagramSvg = ({ viewBox, nodes, segments }: {
  viewBox: string; nodes: DiagramNode[]; segments: Point[][];
}) => {
  // Build one continuous path so the dot never jumps
  const continuousPath = buildContinuousPath(segments);

  const segLens = segments.map(polylineLength);
  const totalLen = segLens.reduce((a, b) => a + b, 0) || 1;
  const cumulative: number[] = [0];
  segLens.forEach((len, i) => cumulative.push(cumulative[i] + len / totalLen));
  const segTimes = segLens.map((_, i) => ({
    start: cumulative[i],
    mid: (cumulative[i] + cumulative[i + 1]) / 2,
    end: cumulative[i + 1],
  }));

  const vb = viewBox.split(" ").map(Number);

  // Clip-path: full viewport with card-shaped holes so dot is hidden behind cards
  // Use card dimensions + enough padding to cover dot glow radius (r=8)
  const PAD = 12;
  const clipHoles = nodes.map((n) => {
    const x = n.x - n.w / 2 - PAD;
    const y = n.y - n.h / 2 - PAD;
    const w = n.w + PAD * 2;
    const h = n.h + PAD * 2;
    const r = 10;
    // Counter-clockwise rect to punch a hole (evenodd fill rule)
    return `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
  }).join(" ");

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

      {/* ── Connector lines with arrows ── */}
      {segments.map((seg, idx) => {
        const d = toPath(seg);
        const t = segTimes[idx];
        return (
          <g key={idx}>
            {/* Soft glow underlay */}
            <path d={d} stroke="hsl(var(--primary))" strokeWidth="3"
              strokeOpacity="0.06" strokeLinecap="round" />
            {/* Main line with arrow */}
            <path d={d} stroke="hsl(var(--primary))" strokeWidth="1.2"
              strokeOpacity="0.22" strokeLinecap="round" markerEnd="url(#lead-arrow)">
              <animate attributeName="stroke-opacity"
                values="0.22;0.22;0.5;0.22;0.22"
                keyTimes={`0;${fmt(t.start)};${fmt(t.mid)};${fmt(t.end)};1`}
                dur={`${DURATION}s`} repeatCount="indefinite" />
            </path>
          </g>
        );
      })}

      {/* ── Cards (rendered on top of lines) ── */}
      {nodes.map((n, i) => (
        <NodeCard key={n.title} node={n} index={i} arrivalFrac={cumulative[i]} />
      ))}

      {/* ── Travelling dot – clipped behind cards ── */}
      <g clipPath="url(#dot-clip)">
        <path id="lead-flow-route" d={continuousPath} fill="none" stroke="none" />
        {/* Glow halo */}
        <circle r="8" fill="hsl(var(--primary) / 0.1)">
          <animateMotion dur={`${DURATION}s`} repeatCount="indefinite">
            <mpath xlinkHref="#lead-flow-route" />
          </animateMotion>
        </circle>
        {/* Core dot */}
        <circle r="3" fill="hsl(var(--primary))">
          <animate attributeName="r" values="2.5;3.8;2.5" dur="1.3s" repeatCount="indefinite" />
          <animateMotion dur={`${DURATION}s`} repeatCount="indefinite">
            <mpath xlinkHref="#lead-flow-route" />
          </animateMotion>
        </circle>
      </g>
    </VisibleSvg>
  );
};

/* ═══════════════════════════════════════
   Layout definitions
   ═══════════════════════════════════════ */

const CW = 128;
const CH = 40;

const desktopNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 86, y: 70, w: CW, h: CH },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", icon: "search", x: 240, y: 70, w: CW + 12, h: CH },
  { title: "Data verwerking", desc: "Extractie & verrijking", icon: "database", x: 394, y: 70, w: CW, h: CH },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 240, y: 180, w: CW + 18, h: CH + 4 },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", icon: "mail", x: 240, y: 278, w: CW + 28, h: CH + 4 },
  { title: "Dashboard synchronisatie", desc: "Opslaan van leads", icon: "dashboard", x: 240, y: 376, w: CW + 34, h: CH + 4 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 240, y: 474, w: CW + 18, h: CH + 4 },
];

/*
  Connector segments: each segment goes from one card edge to the next card edge.
  The continuous path builder merges them into one seamless path.
  Endpoints are placed at card edge + a small gap so the dot enters/exits cleanly.
*/
const desktopSegments: Point[][] = [
  // 0→1: Leadbronnen right → Leadverzameling left
  [{ x: 150, y: 70 }, { x: 174, y: 70 }],
  // 1→2: Leadverzameling right → Data verwerking left
  [{ x: 306, y: 70 }, { x: 330, y: 70 }],
  // 2→3: Data verwerking bottom → route down and left → AI Analyse top
  [{ x: 394, y: 90 }, { x: 394, y: 130 }, { x: 240, y: 130 }, { x: 240, y: 158 }],
  // 3→4: AI Analyse bottom → Outreach top
  [{ x: 240, y: 204 }, { x: 240, y: 256 }],
  // 4→5: Outreach bottom → Dashboard top
  [{ x: 240, y: 302 }, { x: 240, y: 354 }],
  // 5→6: Dashboard bottom → Sales top
  [{ x: 240, y: 400 }, { x: 240, y: 452 }],
];

/* Mobile: vertical pipeline */
const MW = 198;
const MH = 40;

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
