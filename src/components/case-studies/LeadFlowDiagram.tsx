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

type FlowDiagramProps = {
  viewBox: string;
  nodes: DiagramNode[];
  segments: Point[][];
};

const DURATION = 10;

const fmt = (n: number) => Number.isFinite(n) ? n.toFixed(4).replace(/\.?0+$/, "") : "0";

const polylineLength = (points: Point[]) => {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    total += Math.hypot(dx, dy);
  }
  return total;
};

const toPolylinePath = (points: Point[]) =>
  points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

const toFullPath = (segments: Point[][]) => {
  if (!segments.length || !segments[0].length) return "";
  let d = `M ${segments[0][0].x} ${segments[0][0].y}`;
  segments.forEach((segment) => {
    segment.slice(1).forEach((p) => {
      d += ` L ${p.x} ${p.y}`;
    });
  });
  return d;
};

const keyTimesForPulse = (t: number) => {
  const a = Math.max(0, t - 0.03);
  const b = t;
  const c = Math.min(1, t + 0.045);
  return `0;${fmt(a)};${fmt(b)};${fmt(c)};1`;
};

const VisibleSvg = ({ children, viewBox, className }: { children: ReactNode; viewBox: string; className?: string }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (visible) el.unpauseAnimations?.();
    else el.pauseAnimations?.();
  }, [visible]);

  return (
    <svg ref={ref} viewBox={viewBox} className={className} fill="none" role="img" aria-label="Geanimeerd automatiseringsdiagram">
      {children}
    </svg>
  );
};

const NodeCard = ({ node, index, arrival }: { node: DiagramNode; index: number; arrival: number }) => {
  const x = node.x - node.w / 2;
  const y = node.y - node.h / 2;

  return (
    <g>
      <g transform={`translate(${node.x} ${node.y})`}>
        <animateTransform
          attributeName="transform"
          type="translate"
          values={`${node.x} ${node.y}; ${node.x} ${node.y - 2}; ${node.x} ${node.y}`}
          dur={`${4 + (index % 3) * 0.6}s`}
          begin={`${index * 0.18}s`}
          repeatCount="indefinite"
        />

        <rect
          x={-node.w / 2 - 4}
          y={-node.h / 2 - 4}
          width={node.w + 8}
          height={node.h + 8}
          rx={11}
          fill="hsl(var(--primary) / 0.06)"
          opacity="0"
        >
          <animate
            attributeName="opacity"
            values="0;0;0.9;0;0"
            keyTimes={keyTimesForPulse(arrival)}
            dur={`${DURATION}s`}
            repeatCount="indefinite"
          />
        </rect>

        <rect
          x={-node.w / 2}
          y={-node.h / 2 + 2}
          width={node.w}
          height={node.h}
          rx={10}
          fill="hsl(var(--background) / 0.35)"
          opacity="0.55"
        />

        <rect
          x={-node.w / 2}
          y={-node.h / 2}
          width={node.w}
          height={node.h}
          rx={10}
          fill="hsl(var(--card) / 0.92)"
          stroke="hsl(var(--primary) / 0.34)"
          strokeWidth="1"
        />

        <text
          x="0"
          y="-5"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="hsl(var(--primary) / 0.92)"
          fontFamily="inherit"
          letterSpacing="0.2"
        >
          {node.title}
        </text>
        <text
          x="0"
          y="9"
          textAnchor="middle"
          fontSize="7.1"
          fill="hsl(var(--muted-foreground))"
          fontFamily="inherit"
        >
          {node.desc}
        </text>
      </g>

      <title>{`${index + 1}. ${node.title}`}</title>

      <rect
        x={x}
        y={y}
        width={node.w}
        height={node.h}
        rx={10}
        fill="transparent"
        className="cursor-pointer"
      />
    </g>
  );
};

const FlowDiagramSvg = ({ viewBox, nodes, segments }: FlowDiagramProps) => {
  const fullPath = toFullPath(segments);
  const segmentLengths = segments.map(polylineLength);
  const totalLength = segmentLengths.reduce((sum, len) => sum + len, 0) || 1;

  const segmentTimes = segmentLengths.map((len, i) => {
    const start = segmentLengths.slice(0, i).reduce((sum, v) => sum + v, 0) / totalLength;
    const end = (segmentLengths.slice(0, i + 1).reduce((sum, v) => sum + v, 0)) / totalLength;
    return { start, mid: (start + end) / 2, end };
  });

  const arrivalTimes = [0, ...segmentLengths.map((_, i) => segmentLengths.slice(0, i + 1).reduce((sum, v) => sum + v, 0) / totalLength)];

  return (
    <VisibleSvg viewBox={viewBox} className="w-full h-auto">
      <defs>
        <marker id="flow-arrow" markerWidth="8" markerHeight="8" refX="6.8" refY="3.8" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,7.6 L7.2,3.8 z" fill="hsl(var(--primary) / 0.7)" />
        </marker>
      </defs>

      {segments.map((segment, idx) => {
        const d = toPolylinePath(segment);
        const t = segmentTimes[idx];

        return (
          <g key={`segment-${idx}`}>
            <path d={d} fill="none" stroke="hsl(var(--primary) / 0.09)" strokeWidth="4" strokeLinecap="round" />
            <path d={d} fill="none" stroke="hsl(var(--primary) / 0.28)" strokeWidth="1.25" strokeLinecap="round" markerEnd="url(#flow-arrow)">
              <animate
                attributeName="stroke-opacity"
                values="0.28;0.28;0.8;0.28;0.28"
                keyTimes={`0;${fmt(t.start)};${fmt(t.mid)};${fmt(t.end)};1`}
                dur={`${DURATION}s`}
                repeatCount="indefinite"
              />
            </path>
          </g>
        );
      })}

      <path id="automation-flow-route" d={fullPath} fill="none" stroke="none" />

      <circle r="8" fill="hsl(var(--primary) / 0.14)">
        <animateMotion dur={`${DURATION}s`} repeatCount="indefinite" rotate="auto">
          <mpath xlinkHref="#automation-flow-route" />
        </animateMotion>
      </circle>
      <circle r="3.2" fill="hsl(var(--primary) / 0.95)">
        <animate attributeName="r" values="2.6;3.6;2.6" dur="1.1s" repeatCount="indefinite" />
        <animateMotion dur={`${DURATION}s`} repeatCount="indefinite" rotate="auto">
          <mpath xlinkHref="#automation-flow-route" />
        </animateMotion>
      </circle>

      {nodes.map((node, index) => (
        <NodeCard key={node.title} node={node} index={index} arrival={arrivalTimes[index]} />
      ))}
    </VisibleSvg>
  );
};

const desktopNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen, databases", x: 86, y: 74, w: 104, h: 48 },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", x: 230, y: 74, w: 124, h: 48 },
  { title: "Data verwerking", desc: "Extractie & verrijking", x: 374, y: 74, w: 116, h: 48 },
  { title: "AI Analyse", desc: "Website & pijnpunten", x: 230, y: 206, w: 152, h: 52 },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", x: 230, y: 316, w: 170, h: 52 },
  { title: "CRM synchronisatie", desc: "Opslaan van leads", x: 230, y: 426, w: 150, h: 52 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", x: 230, y: 536, w: 150, h: 52 },
];

const desktopSegments: Point[][] = [
  [{ x: 138, y: 74 }, { x: 168, y: 74 }],
  [{ x: 292, y: 74 }, { x: 316, y: 74 }],
  [{ x: 374, y: 98 }, { x: 374, y: 152 }, { x: 230, y: 152 }, { x: 230, y: 180 }],
  [{ x: 230, y: 232 }, { x: 230, y: 290 }],
  [{ x: 230, y: 342 }, { x: 230, y: 400 }],
  [{ x: 230, y: 452 }, { x: 230, y: 510 }],
];

const mobileNodes: DiagramNode[] = [
  { title: "Leadbronnen", desc: "Gidsen, databases", x: 180, y: 68, w: 190, h: 48 },
  { title: "Leadverzameling", desc: "Automatisch verzamelen", x: 180, y: 156, w: 206, h: 48 },
  { title: "Data verwerking", desc: "Extractie & verrijking", x: 180, y: 244, w: 198, h: 48 },
  { title: "AI Analyse", desc: "Website & pijnpunten", x: 180, y: 332, w: 198, h: 50 },
  { title: "Outreach automatisering", desc: "Persoonlijke e-mails", x: 180, y: 424, w: 214, h: 50 },
  { title: "CRM synchronisatie", desc: "Opslaan van leads", x: 180, y: 516, w: 198, h: 50 },
  { title: "Sales opvolging", desc: "Gesprekken & pipeline", x: 180, y: 608, w: 198, h: 50 },
];

const mobileSegments: Point[][] = [
  [{ x: 180, y: 92 }, { x: 180, y: 132 }],
  [{ x: 180, y: 180 }, { x: 180, y: 220 }],
  [{ x: 180, y: 268 }, { x: 180, y: 306 }],
  [{ x: 180, y: 357 }, { x: 180, y: 398 }],
  [{ x: 180, y: 449 }, { x: 180, y: 490 }],
  [{ x: 180, y: 541 }, { x: 180, y: 582 }],
];

const LeadFlowDiagram = () => {
  return (
    <div className="w-full rounded-xl border border-primary/15 bg-gradient-to-b from-background via-card/30 to-background p-2 sm:p-3">
      <div className="hidden sm:block">
        <FlowDiagramSvg viewBox="0 0 460 590" nodes={desktopNodes} segments={desktopSegments} />
      </div>
      <div className="sm:hidden">
        <FlowDiagramSvg viewBox="0 0 360 670" nodes={mobileNodes} segments={mobileSegments} />
      </div>
    </div>
  );
};

export default LeadFlowDiagram;
