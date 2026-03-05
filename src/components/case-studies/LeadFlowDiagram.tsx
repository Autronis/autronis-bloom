import { ReactNode, useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

type DiagramNode = {
  title: string;
  desc: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const DURATION = 16; // slower loop

const fmt = (n: number) => Number.isFinite(n) ? n.toFixed(5).replace(/\.?0+$/, "") : "0";

const polylineLength = (points: Point[]) => {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return total;
};

const toPolylinePath = (points: Point[]) =>
  points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

const toFullPath = (segments: Point[][]) => {
  if (!segments.length) return "";
  let d = `M ${segments[0][0].x} ${segments[0][0].y}`;
  segments.forEach((seg) => seg.slice(1).forEach((p) => { d += ` L ${p.x} ${p.y}`; }));
  return d;
};

/* ─── Visibility wrapper ─── */
const VisibleSvg = ({ children, viewBox, className }: { children: ReactNode; viewBox: string; className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible) el.unpauseAnimations?.();
    else el.pauseAnimations?.();
  }, [visible]);

  return (
    <svg ref={ref} viewBox={viewBox} className={className} fill="none" role="img" aria-label="Automatiseringsdiagram">
      {children}
    </svg>
  );
};

/* ─── Node card ─── */
const NodeCard = ({ node, index, arrival }: { node: DiagramNode; index: number; arrival: number }) => {
  // Glow + scale pulse synced to dot arrival
  const pulseStart = Math.max(0, arrival - 0.02);
  const pulseEnd = Math.min(1, arrival + 0.06);
  const kT = `0;${fmt(pulseStart)};${fmt(arrival)};${fmt(pulseEnd)};1`;

  return (
    <g>
      {/* Floating animation */}
      <animateTransform
        attributeName="transform"
        type="translate"
        values={`0 0; 0 -1.5; 0 0`}
        dur={`${3.5 + (index % 3) * 0.5}s`}
        begin={`${index * 0.2}s`}
        repeatCount="indefinite"
      />

      {/* Outer glow on arrival */}
      <rect
        x={node.x - node.w / 2 - 5}
        y={node.y - node.h / 2 - 5}
        width={node.w + 10}
        height={node.h + 10}
        rx={13}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2"
        opacity="0"
      >
        <animate attributeName="opacity" values="0;0;0.6;0;0" keyTimes={kT} dur={`${DURATION}s`} repeatCount="indefinite" />
      </rect>

      {/* Scale pulse on arrival */}
      <g>
        <animateTransform
          attributeName="transform"
          type="scale"
          values="1;1;1.06;1;1"
          keyTimes={kT}
          dur={`${DURATION}s`}
          repeatCount="indefinite"
          additive="sum"
        />
        {/* We need to offset because scale is from origin */}
      </g>

      {/* Card shadow */}
      <rect
        x={node.x - node.w / 2}
        y={node.y - node.h / 2 + 2}
        width={node.w}
        height={node.h}
        rx={9}
        fill="hsl(var(--background))"
        opacity="0.5"
      />

      {/* Card body – opaque so dot is hidden behind */}
      <rect
        x={node.x - node.w / 2}
        y={node.y - node.h / 2}
        width={node.w}
        height={node.h}
        rx={9}
        fill="hsl(var(--card))"
        stroke="hsl(var(--primary) / 0.3)"
        strokeWidth="1"
      />

      {/* Title – matches reference card title style */}
      <text
        x={node.x}
        y={node.y - 4}
        textAnchor="middle"
        fontSize="9.5"
        fontWeight="700"
        fill="hsl(var(--foreground))"
        fontFamily="inherit"
        letterSpacing="0.1"
      >
        {node.title}
      </text>
      {/* Description */}
      <text
        x={node.x}
        y={node.y + 10}
        textAnchor="middle"
        fontSize="7"
        fill="hsl(var(--muted-foreground))"
        fontFamily="inherit"
      >
        {node.desc}
      </text>
    </g>
  );
};

/* ─── Main SVG diagram ─── */
const FlowDiagramSvg = ({
  viewBox,
  nodes,
  segments,
}: {
  viewBox: string;
  nodes: DiagramNode[];
  segments: Point[][];
}) => {
  const fullPath = toFullPath(segments);
  const segLens = segments.map(polylineLength);
  const totalLen = segLens.reduce((a, b) => a + b, 0) || 1;

  // Cumulative arrival fraction at each node boundary
  const cumulative: number[] = [0];
  segLens.forEach((len, i) => cumulative.push(cumulative[i] + len / totalLen));

  // For line glow timing
  const segTimes = segLens.map((_, i) => ({
    start: cumulative[i],
    mid: (cumulative[i] + cumulative[i + 1]) / 2,
    end: cumulative[i + 1],
  }));

  // Build a clip-path mask that covers everything EXCEPT the card areas
  // so the dot is hidden behind cards
  const vbParts = viewBox.split(" ").map(Number);
  const vbW = vbParts[2];
  const vbH = vbParts[3];

  return (
    <VisibleSvg viewBox={viewBox} className="w-full h-auto">
      <defs>
        <marker id="lead-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,7 L7,3.5 z" fill="hsl(var(--primary) / 0.6)" />
        </marker>

        {/* Clip path: full viewport minus card rectangles → dot hidden behind cards */}
        <clipPath id="dot-clip">
          <path
            d={`M0,0 H${vbW} V${vbH} H0 Z ${nodes
              .map((n) => {
                const x = n.x - n.w / 2 - 2;
                const y = n.y - n.h / 2 - 2;
                const w = n.w + 4;
                const h = n.h + 4;
                const r = 9;
                // Rounded rect as hole (counter-clockwise)
                return `M${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h - r} Q${x + w},${y + h} ${x + w - r},${y + h} H${x + r} Q${x},${y + h} ${x},${y + h - r} V${y + r} Q${x},${y} ${x + r},${y} Z`;
              })
              .join(" ")}`}
            fillRule="evenodd"
            fill="white"
          />
        </clipPath>
      </defs>

      {/* Connector lines (behind cards) */}
      {segments.map((seg, idx) => {
        const d = toPolylinePath(seg);
        const t = segTimes[idx];
        return (
          <g key={idx}>
            {/* Soft glow line */}
            <path d={d} fill="none" stroke="hsl(var(--primary))" strokeWidth="3.5" strokeOpacity="0.06" strokeLinecap="round" />
            {/* Main line */}
            <path d={d} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeOpacity="0.25" strokeLinecap="round" markerEnd="url(#lead-arrow)">
              <animate
                attributeName="stroke-opacity"
                values="0.25;0.25;0.7;0.25;0.25"
                keyTimes={`0;${fmt(t.start)};${fmt(t.mid)};${fmt(t.end)};1`}
                dur={`${DURATION}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        );
      })}

      {/* Node cards (opaque, on top of lines) */}
      {nodes.map((node, i) => (
        <NodeCard key={node.title} node={node} index={i} arrival={cumulative[i]} />
      ))}

      {/* Travelling dot – clipped so hidden behind cards */}
      <g clipPath="url(#dot-clip)">
        <path id="lead-flow-route" d={fullPath} fill="none" stroke="none" />
        <circle r="9" fill="hsl(var(--primary) / 0.12)">
          <animateMotion dur={`${DURATION}s`} repeatCount="indefinite">
            <mpath xlinkHref="#lead-flow-route" />
          </animateMotion>
        </circle>
        <circle r="3.5" fill="hsl(var(--primary))">
          <animate attributeName="r" values="2.8;4;2.8" dur="1.3s" repeatCount="indefinite" />
          <animateMotion dur={`${DURATION}s`} repeatCount="indefinite">
            <mpath xlinkHref="#lead-flow-route" />
          </animateMotion>
        </circle>
      </g>
    </VisibleSvg>
  );
};

/* ─── Desktop layout: top row → center → vertical ─── */
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
  [{ x: 140, y: 74 }, { x: 167, y: 74 }],                                            // 0→1
  [{ x: 293, y: 74 }, { x: 315, y: 74 }],                                            // 1→2
  [{ x: 374, y: 97 }, { x: 374, y: 140 }, { x: 230, y: 140 }, { x: 230, y: 169 }],  // 2→3
  [{ x: 230, y: 219 }, { x: 230, y: 275 }],                                          // 3→4
  [{ x: 230, y: 325 }, { x: 230, y: 381 }],                                          // 4→5
  [{ x: 230, y: 431 }, { x: 230, y: 487 }],                                          // 5→6
];

/* ─── Mobile layout: vertical pipeline ─── */
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

/* ─── Export ─── */
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
