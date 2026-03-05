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

const ICONS: Record<string, string> = {
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z",
  search: "M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5zM16 16l4.5 4.5",
  database: "M12 2C6.5 2 4 3.8 4 5s2.5 3 8 3 8-1.8 8-3-2.5-3-8-3zM4 5v14c0 1.2 2.5 3 8 3s8-1.8 8-3V5M4 12c0 1.2 2.5 3 8 3s8-1.8 8-3",
  bot: "M12 8V4H8M4 14a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4zM9 18v2M15 18v2M9 15h0M15 15h0",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  dashboard: "M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.65 2.36a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.76.29 1.55.52 2.36.65A2 2 0 0 1 22 16.92z",
};

const CLIP_PAD = 14; // generous padding so dot+glow fully hidden behind cards

const polylineLength = (pts: Point[]) => {
  let t = 0;
  for (let i = 1; i < pts.length; i++) t += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  return t;
};
const toPath = (pts: Point[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
const toFullPath = (segs: Point[][]) => {
  if (!segs.length) return "";
  let d = `M ${segs[0][0].x} ${segs[0][0].y}`;
  segs.forEach((s) => s.slice(1).forEach((p) => (d += ` L ${p.x} ${p.y}`)));
  return d;
};

/* Visibility wrapper */
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
    <svg ref={ref} viewBox={viewBox} className={className} fill="none" role="img" aria-label="Automatiseringsdiagram">
      {children}
    </svg>
  );
};

/* ─── Node card ─── */
const NodeCard = ({ node, index, arrivalFrac }: { node: DiagramNode; index: number; arrivalFrac: number }) => {
  const padX = 8;
  const iconBoxSize = 22;
  const iconBoxX = node.x - node.w / 2 + padX;
  const iconBoxY = node.y - iconBoxSize / 2;

  // Smooth scale pulse: wider window for smoother ease
  const a = fmt(Math.max(0, arrivalFrac - 0.01));
  const peak = fmt(Math.min(1, arrivalFrac + 0.025));
  const end = fmt(Math.min(1, arrivalFrac + 0.08));
  const kT = `0;${a};${peak};${end};1`;

  return (
    <g>
      {/* Gentle float */}
      <animateTransform attributeName="transform" type="translate"
        values="0 0;0 -1;0 0" dur={`${3.5 + (index % 3) * 0.5}s`} begin={`${index * 0.15}s`} repeatCount="indefinite" />

      {/* Card body – matching metric card style (dark teal with subtle primary border) */}
      <rect x={node.x - node.w / 2} y={node.y - node.h / 2} width={node.w} height={node.h} rx={10}
        fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.2)" strokeWidth="1" />

      {/* Smooth scale pulse on arrival – uses CSS-like smooth keySplines */}
      <rect x={node.x - node.w / 2 - 3} y={node.y - node.h / 2 - 3} width={node.w + 6} height={node.h + 6} rx={12}
        fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0">
        <animate attributeName="opacity"
          values="0;0;0.45;0;0" keyTimes={kT}
          calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
          dur={`${DURATION}s`} repeatCount="indefinite" />
      </rect>

      {/* Scale effect via animated rect overlay */}
      <animateTransform attributeName="transform" type="scale"
        values="1;1;1.015;1;1" keyTimes={kT}
        calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
        dur={`${DURATION}s`} repeatCount="indefinite" additive="sum" />

      {/* Icon box */}
      <rect x={iconBoxX} y={iconBoxY} width={iconBoxSize} height={iconBoxSize} rx={5}
        fill="hsl(var(--primary) / 0.12)" />
      <g transform={`translate(${iconBoxX + 4}, ${iconBoxY + 4})`}>
        <path d={ICONS[node.icon] || ""} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
          transform="scale(0.583)" />
      </g>

      {/* Title – same style as site card titles */}
      <text x={iconBoxX + iconBoxSize + 7} y={node.y - 2} fontSize="8.5" fontWeight="700"
        fill="hsl(var(--foreground))" fontFamily="inherit" letterSpacing="0.1">
        {node.title}
      </text>
      {/* Description – primary muted color */}
      <text x={iconBoxX + iconBoxSize + 7} y={node.y + 9} fontSize="6.8"
        fill="hsl(var(--primary) / 0.7)" fontFamily="inherit">
        {node.desc}
      </text>
    </g>
  );
};

/* ─── Diagram renderer ─── */
const FlowDiagramSvg = ({ viewBox, nodes, segments }: { viewBox: string; nodes: DiagramNode[]; segments: Point[][] }) => {
  const fullPath = toFullPath(segments);
  const segLens = segments.map(polylineLength);
  const totalLen = segLens.reduce((a, b) => a + b, 0) || 1;
  const cumulative: number[] = [0];
  segLens.forEach((len, i) => cumulative.push(cumulative[i] + len / totalLen));
  const segTimes = segLens.map((_, i) => ({ start: cumulative[i], mid: (cumulative[i] + cumulative[i + 1]) / 2, end: cumulative[i + 1] }));

  const vb = viewBox.split(" ").map(Number);

  // Clip mask with generous padding so dot (r=8 glow) fully disappears behind cards
  const clipHoles = nodes.map((n) => {
    const x = n.x - n.w / 2 - CLIP_PAD;
    const y = n.y - n.h / 2 - CLIP_PAD;
    const w = n.w + CLIP_PAD * 2;
    const h = n.h + CLIP_PAD * 2;
    const r = 14;
    return `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
  }).join(" ");

  return (
    <VisibleSvg viewBox={viewBox} className="w-full h-auto">
      <defs>
        <marker id="lead-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,7 L7,3.5 z" fill="hsl(var(--primary) / 0.5)" />
        </marker>
        <clipPath id="dot-clip">
          <path d={`M0,0 H${vb[2]} V${vb[3]} H0 Z ${clipHoles}`} fillRule="evenodd" fill="white" />
        </clipPath>
      </defs>

      {/* Connector lines */}
      {segments.map((seg, idx) => {
        const d = toPath(seg);
        const t = segTimes[idx];
        return (
          <g key={idx}>
            <path d={d} stroke="hsl(var(--primary))" strokeWidth="3" strokeOpacity="0.05" strokeLinecap="round" />
            <path d={d} stroke="hsl(var(--primary))" strokeWidth="1.2" strokeOpacity="0.2" strokeLinecap="round" markerEnd="url(#lead-arrow)">
              <animate attributeName="stroke-opacity"
                values="0.2;0.2;0.55;0.2;0.2"
                keyTimes={`0;${fmt(t.start)};${fmt(t.mid)};${fmt(t.end)};1`}
                dur={`${DURATION}s`} repeatCount="indefinite" />
            </path>
          </g>
        );
      })}

      {/* Cards on top of lines */}
      {nodes.map((n, i) => (
        <NodeCard key={n.title} node={n} index={i} arrivalFrac={cumulative[i]} />
      ))}

      {/* Dot – clipped so hidden behind cards */}
      <g clipPath="url(#dot-clip)">
        <path id="lead-flow-route" d={fullPath} fill="none" stroke="none" />
        <circle r="8" fill="hsl(var(--primary) / 0.1)">
          <animateMotion dur={`${DURATION}s`} repeatCount="indefinite"><mpath xlinkHref="#lead-flow-route" /></animateMotion>
        </circle>
        <circle r="3" fill="hsl(var(--primary))">
          <animate attributeName="r" values="2.5;3.8;2.5" dur="1.3s" repeatCount="indefinite" />
          <animateMotion dur={`${DURATION}s`} repeatCount="indefinite"><mpath xlinkHref="#lead-flow-route" /></animateMotion>
        </circle>
      </g>
    </VisibleSvg>
  );
};

/* ─── Desktop layout ─── */
const CW = 130;
const CH = 42;

const desktopNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 86, y: 70, w: CW, h: CH },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", icon: "search", x: 240, y: 70, w: CW + 10, h: CH },
  { title: "Data verwerking", desc: "Extractie & verrijking", icon: "database", x: 394, y: 70, w: CW, h: CH },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 240, y: 185, w: CW + 20, h: CH + 4 },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", icon: "mail", x: 240, y: 285, w: CW + 30, h: CH + 4 },
  { title: "Dashboard synchronisatie", desc: "Opslaan van leads", icon: "dashboard", x: 240, y: 385, w: CW + 36, h: CH + 4 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 240, y: 485, w: CW + 20, h: CH + 4 },
];

// Segments: endpoints pulled away from card edges so dot fully disappears
const desktopSegments: Point[][] = [
  [{ x: 152, y: 70 }, { x: 174, y: 70 }],    // Leadbronnen → Leadverzameling
  [{ x: 306, y: 70 }, { x: 328, y: 70 }],    // Leadverzameling → Data verwerking
  [{ x: 394, y: 92 }, { x: 394, y: 132 }, { x: 240, y: 132 }, { x: 240, y: 162 }], // Data verwerking → AI Analyse
  [{ x: 240, y: 210 }, { x: 240, y: 262 }],  // AI Analyse → Outreach
  [{ x: 240, y: 310 }, { x: 240, y: 362 }],  // Outreach → Dashboard
  [{ x: 240, y: 410 }, { x: 240, y: 462 }],  // Dashboard → Sales
];

/* ─── Mobile layout ─── */
const MW = 200;
const MH = 42;

const mobileNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", icon: "globe", x: 155, y: 50, w: MW, h: MH },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", icon: "search", x: 155, y: 126, w: MW + 10, h: MH },
  { title: "Data verwerking", desc: "Extractie & verrijking", icon: "database", x: 155, y: 202, w: MW, h: MH },
  { title: "AI Analyse", desc: "Website & pijnpunten", icon: "bot", x: 155, y: 278, w: MW, h: MH },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", icon: "mail", x: 155, y: 358, w: MW + 14, h: MH },
  { title: "Dashboard synchronisatie", desc: "Opslaan van leads", icon: "dashboard", x: 155, y: 438, w: MW + 10, h: MH },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", icon: "phone", x: 155, y: 518, w: MW, h: MH },
];

const mobileSegments: Point[][] = [
  [{ x: 155, y: 72 }, { x: 155, y: 104 }],
  [{ x: 155, y: 148 }, { x: 155, y: 180 }],
  [{ x: 155, y: 224 }, { x: 155, y: 256 }],
  [{ x: 155, y: 300 }, { x: 155, y: 336 }],
  [{ x: 155, y: 380 }, { x: 155, y: 416 }],
  [{ x: 155, y: 460 }, { x: 155, y: 496 }],
];

const LeadFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 480 530" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 310 560" nodes={mobileNodes} segments={mobileSegments} />
    </div>
  </div>
);

export default LeadFlowDiagram;
