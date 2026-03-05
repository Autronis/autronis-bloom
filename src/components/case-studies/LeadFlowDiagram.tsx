import { ReactNode, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type DiagramNode = { title: string; desc: string; x: number; y: number; w: number; h: number };

const DURATION = 16;
const fmt = (n: number) => (Number.isFinite(n) ? n.toFixed(5).replace(/\.?0+$/, "") : "0");

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

/* Visibility wrapper – pauses SVG animations off-screen */
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
  // Tight pulse window so scale only happens right when dot arrives
  const a = Math.max(0, arrivalFrac - 0.008);
  const b = arrivalFrac;
  const c = Math.min(1, arrivalFrac + 0.04);
  const d = Math.min(1, arrivalFrac + 0.07);
  const kT = `0;${fmt(a)};${fmt(b)};${fmt(c)};${fmt(d)};1`;

  return (
    <g>
      {/* Gentle float */}
      <animateTransform
        attributeName="transform" type="translate"
        values="0 0;0 -1.2;0 0"
        dur={`${3.5 + (index % 3) * 0.5}s`}
        begin={`${index * 0.2}s`}
        repeatCount="indefinite"
      />

      {/* Card body – dark teal matching the uploaded swatch, NO border stroke */}
      <rect
        x={node.x - node.w / 2}
        y={node.y - node.h / 2}
        width={node.w}
        height={node.h}
        rx={9}
        fill="#0b2a2a"
      />

      {/* Scale pulse on dot arrival */}
      <rect
        x={node.x - node.w / 2}
        y={node.y - node.h / 2}
        width={node.w}
        height={node.h}
        rx={9}
        fill="#0b2a2a"
        opacity="0"
      >
        <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes={kT} dur={`${DURATION}s`} repeatCount="indefinite" />
      </rect>

      {/* Glow shadow behind card on arrival */}
      <rect
        x={node.x - node.w / 2 - 4}
        y={node.y - node.h / 2 - 4}
        width={node.w + 8}
        height={node.h + 8}
        rx={13}
        fill="hsl(174 78% 45% / 0.15)"
        opacity="0"
      >
        <animate attributeName="opacity" values="0;0;0;0.8;0;0" keyTimes={kT} dur={`${DURATION}s`} repeatCount="indefinite" />
      </rect>

      {/* Scale transform on arrival – uses transform-origin at card center */}
      <g style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
        <animateTransform
          attributeName="transform" type="scale"
          values="1;1;1;1.06;1;1"
          keyTimes={kT}
          dur={`${DURATION}s`}
          repeatCount="indefinite"
        />
        {/* Redraw card inside scale group so it scales */}
        <rect
          x={node.x - node.w / 2}
          y={node.y - node.h / 2}
          width={node.w}
          height={node.h}
          rx={9}
          fill="#0b2a2a"
        />
        <text x={node.x} y={node.y - 4} textAnchor="middle" fontSize="9.5" fontWeight="700"
          fill="hsl(var(--foreground))" fontFamily="inherit" letterSpacing="0.1">
          {node.title}
        </text>
        <text x={node.x} y={node.y + 10} textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" fontFamily="inherit">
          {node.desc}
        </text>
      </g>
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

  const segTimes = segLens.map((_, i) => ({
    start: cumulative[i],
    mid: (cumulative[i] + cumulative[i + 1]) / 2,
    end: cumulative[i + 1],
  }));

  // Clip-path: full viewport with card-shaped holes punched out
  const vb = viewBox.split(" ").map(Number);
  const clipHoles = nodes
    .map((n) => {
      const x = n.x - n.w / 2 - 3;
      const y = n.y - n.h / 2 - 3;
      const w = n.w + 6;
      const h = n.h + 6;
      const r = 10;
      return `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
    })
    .join(" ");

  return (
    <VisibleSvg viewBox={viewBox} className="w-full h-auto">
      <defs>
        <marker id="lead-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,7 L7,3.5 z" fill="hsl(174 78% 45% / 0.55)" />
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
            <path d={d} stroke="hsl(174 78% 45%)" strokeWidth="3" strokeOpacity="0.06" strokeLinecap="round" />
            <path d={d} stroke="hsl(174 78% 45%)" strokeWidth="1.2" strokeOpacity="0.22" strokeLinecap="round" markerEnd="url(#lead-arrow)">
              <animate
                attributeName="stroke-opacity"
                values="0.22;0.22;0.65;0.22;0.22"
                keyTimes={`0;${fmt(t.start)};${fmt(t.mid)};${fmt(t.end)};1`}
                dur={`${DURATION}s`}
                repeatCount="indefinite"
              />
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
        <circle r="9" fill="hsl(174 78% 45% / 0.1)">
          <animateMotion dur={`${DURATION}s`} repeatCount="indefinite"><mpath xlinkHref="#lead-flow-route" /></animateMotion>
        </circle>
        <circle r="3.5" fill="hsl(174 78% 50%)">
          <animate attributeName="r" values="2.8;4;2.8" dur="1.3s" repeatCount="indefinite" />
          <animateMotion dur={`${DURATION}s`} repeatCount="indefinite"><mpath xlinkHref="#lead-flow-route" /></animateMotion>
        </circle>
      </g>
    </VisibleSvg>
  );
};

/* ─── Layouts ─── */
const desktopNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", x: 86, y: 74, w: 108, h: 46 },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", x: 230, y: 74, w: 126, h: 46 },
  { title: "Data verwerking", desc: "Extractie & verrijking", x: 374, y: 74, w: 118, h: 46 },
  { title: "AI Analyse", desc: "Website & pijnpunten", x: 230, y: 194, w: 150, h: 50 },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", x: 230, y: 300, w: 168, h: 50 },
  { title: "CRM synchronisatie", desc: "Opslaan van leads", x: 230, y: 406, w: 148, h: 50 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", x: 230, y: 512, w: 148, h: 50 },
];

const desktopSegments: Point[][] = [
  [{ x: 140, y: 74 }, { x: 167, y: 74 }],
  [{ x: 293, y: 74 }, { x: 315, y: 74 }],
  [{ x: 374, y: 97 }, { x: 374, y: 140 }, { x: 230, y: 140 }, { x: 230, y: 169 }],
  [{ x: 230, y: 219 }, { x: 230, y: 275 }],
  [{ x: 230, y: 325 }, { x: 230, y: 381 }],
  [{ x: 230, y: 431 }, { x: 230, y: 487 }],
];

const mobileNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen & databases", x: 160, y: 58, w: 186, h: 44 },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", x: 160, y: 140, w: 200, h: 44 },
  { title: "Data verwerking", desc: "Extractie & verrijking", x: 160, y: 222, w: 192, h: 44 },
  { title: "AI Analyse", desc: "Website & pijnpunten", x: 160, y: 304, w: 192, h: 46 },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", x: 160, y: 390, w: 210, h: 46 },
  { title: "CRM synchronisatie", desc: "Opslaan van leads", x: 160, y: 476, w: 192, h: 46 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", x: 160, y: 562, w: 192, h: 46 },
];

const mobileSegments: Point[][] = [
  [{ x: 160, y: 80 }, { x: 160, y: 118 }],
  [{ x: 160, y: 162 }, { x: 160, y: 200 }],
  [{ x: 160, y: 244 }, { x: 160, y: 281 }],
  [{ x: 160, y: 327 }, { x: 160, y: 367 }],
  [{ x: 160, y: 413 }, { x: 160, y: 453 }],
  [{ x: 160, y: 499 }, { x: 160, y: 539 }],
];

const LeadFlowDiagram = () => (
  <div className="w-full">
    <div className="hidden sm:block">
      <FlowDiagramSvg viewBox="0 0 460 560" nodes={desktopNodes} segments={desktopSegments} />
    </div>
    <div className="sm:hidden">
      <FlowDiagramSvg viewBox="0 0 320 610" nodes={mobileNodes} segments={mobileSegments} />
    </div>
  </div>
);

export default LeadFlowDiagram;
