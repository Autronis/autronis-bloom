import { useRef, useEffect, useState } from "react";

/**
 * Animated lead-generation flow diagram matching the uploaded reference.
 * Uses distinct shapes per node type, connector arrows, and glowing flow-dots.
 */

const W = 420;
const H = 620;

/* ─── Shape helpers ─── */

/** Parallelogram (skewed input shape) */
const Parallelogram = ({ cx, cy, w, h }: { cx: number; cy: number; w: number; h: number }) => {
  const skew = 14;
  const points = `${cx - w / 2 + skew},${cy - h / 2} ${cx + w / 2 + skew},${cy - h / 2} ${cx + w / 2 - skew},${cy + h / 2} ${cx - w / 2 - skew},${cy + h / 2}`;
  return <polygon points={points} fill="hsl(192 30% 12%)" stroke="hsl(174 78% 45%)" strokeWidth="1" strokeOpacity="0.4" />;
};

/** Rounded rectangle */
const RoundedRect = ({ cx, cy, w, h }: { cx: number; cy: number; w: number; h: number }) => (
  <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={8}
    fill="hsl(192 30% 12%)" stroke="hsl(174 78% 45%)" strokeWidth="1" strokeOpacity="0.4" />
);

/** Cylinder (database shape) */
const Cylinder = ({ cx, cy, w, h }: { cx: number; cy: number; w: number; h: number }) => {
  const ry = 8;
  return (
    <g>
      <ellipse cx={cx} cy={cy + h / 2 - ry} rx={w / 2} ry={ry}
        fill="hsl(192 30% 10%)" stroke="hsl(174 78% 45%)" strokeWidth="1" strokeOpacity="0.4" />
      <rect x={cx - w / 2} y={cy - h / 2 + ry} width={w} height={h - ry * 2}
        fill="hsl(192 30% 12%)" stroke="hsl(174 78% 45%)" strokeWidth="1" strokeOpacity="0.4" />
      <line x1={cx - w / 2} y1={cy - h / 2 + ry} x2={cx - w / 2} y2={cy + h / 2 - ry}
        stroke="hsl(174 78% 45%)" strokeWidth="1" strokeOpacity="0.4" />
      <line x1={cx + w / 2} y1={cy - h / 2 + ry} x2={cx + w / 2} y2={cy + h / 2 - ry}
        stroke="hsl(174 78% 45%)" strokeWidth="1" strokeOpacity="0.4" />
      <ellipse cx={cx} cy={cy - h / 2 + ry} rx={w / 2} ry={ry}
        fill="hsl(192 30% 14%)" stroke="hsl(174 78% 45%)" strokeWidth="1" strokeOpacity="0.4" />
    </g>
  );
};

/** Stadium / pill shape */
const Stadium = ({ cx, cy, w, h }: { cx: number; cy: number; w: number; h: number }) => (
  <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h / 2}
    fill="hsl(192 30% 12%)" stroke="hsl(174 78% 45%)" strokeWidth="1" strokeOpacity="0.4" />
);

/* ─── Node data ─── */
interface FlowNode {
  id: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  shape: "parallelogram" | "rect" | "cylinder" | "stadium";
  title: string;
  desc: string;
}

const nodes: FlowNode[] = [
  { id: "n0", cx: 100, cy: 50,  w: 140, h: 52, shape: "parallelogram", title: "Leadbronnen", desc: "Bedrijvengidsen, databases" },
  { id: "n1", cx: 240, cy: 50,  w: 155, h: 52, shape: "rect",          title: "Leadverzameling", desc: "Automatisch verzamelen" },
  { id: "n2", cx: 370, cy: 50,  w: 130, h: 52, shape: "rect",          title: "Data verwerking", desc: "Extractie en verrijking" },
  { id: "n3", cx: 210, cy: 170, w: 200, h: 60, shape: "rect",          title: "AI Analyse", desc: "Websiteanalyse & pijnpunten" },
  { id: "n4", cx: 210, cy: 300, w: 210, h: 60, shape: "rect",          title: "Outreach automatisering", desc: "Gepersonaliseerde e-mails" },
  { id: "n5", cx: 210, cy: 420, w: 180, h: 60, shape: "cylinder",      title: "CRM synchronisatie", desc: "Opslaan en beheren" },
  { id: "n6", cx: 210, cy: 545, w: 180, h: 55, shape: "stadium",       title: "Sales opvolging", desc: "Gesprekken & pipeline" },
];

/* ─── Edges ─── */
const edges: [number, number][] = [
  [0, 1], [1, 2], [1, 3], [2, 3], [3, 4], [4, 5], [5, 6],
];

/* ─── Arrow connector ─── */
const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  const tipX = x2 - ux * 4;
  const tipY = y2 - uy * 4;
  const sz = 5;
  const px = -uy * sz;
  const py = ux * sz;

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="hsl(174 78% 45%)" strokeWidth="1.2" strokeOpacity="0.35" />
      <polygon
        points={`${x2},${y2} ${tipX + px * 0.6},${tipY + py * 0.6} ${tipX - px * 0.6},${tipY - py * 0.6}`}
        fill="hsl(174 78% 55%)" fillOpacity="0.5"
      />
    </g>
  );
};

/* ─── Anchor points on node edges ─── */
const getAnchor = (from: FlowNode, to: FlowNode): { x1: number; y1: number; x2: number; y2: number } => {
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;
  const horizontal = Math.abs(dx) > Math.abs(dy);

  let x1: number, y1: number, x2: number, y2: number;
  if (horizontal) {
    x1 = from.cx + (dx > 0 ? from.w / 2 : -from.w / 2);
    y1 = from.cy;
    x2 = to.cx + (dx > 0 ? -to.w / 2 : to.w / 2);
    y2 = to.cy;
  } else {
    x1 = from.cx;
    y1 = from.cy + (dy > 0 ? from.h / 2 : -from.h / 2);
    x2 = to.cx;
    y2 = to.cy + (dy > 0 ? -to.h / 2 : to.h / 2);
  }
  return { x1, y1, x2, y2 };
};

/* ─── Animated dot ─── */
const FlowDot = ({ pathId }: { pathId: string }) => (
  <g>
    <circle r="3" fill="hsl(174 78% 70%)" fillOpacity="0.9">
      <animate attributeName="r" values="2;3.5;2" dur="1.5s" repeatCount="indefinite" />
      <animateMotion dur="2.5s" repeatCount="indefinite">
        <mpath xlinkHref={`#${pathId}`} />
      </animateMotion>
    </circle>
    <circle r="7" fill="hsl(174 78% 50%)" fillOpacity="0.12">
      <animateMotion dur="2.5s" repeatCount="indefinite">
        <mpath xlinkHref={`#${pathId}`} />
      </animateMotion>
    </circle>
  </g>
);

/* ─── Visibility wrapper ─── */
const VisibleSvg = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
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
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md mx-auto" fill="none">
      {children}
    </svg>
  );
};

/* ─── Main component ─── */
const LeadFlowDiagram = () => {
  const shapeMap = {
    parallelogram: Parallelogram,
    rect: RoundedRect,
    cylinder: Cylinder,
    stadium: Stadium,
  };

  return (
    <VisibleSvg>
      {/* Title */}
      <text x={W / 2} y={12} textAnchor="middle" fontSize="11" fontWeight="600"
        fill="hsl(174 78% 75%)" fontFamily="inherit" letterSpacing="0.5">
        Leadgeneratie automatiseringsproces
      </text>

      {/* Edges + flow dots */}
      <g>
        {edges.map(([fi, ti], i) => {
          const a = getAnchor(nodes[fi], nodes[ti]);
          const pathId = `lfd-e${i}`;
          return (
            <g key={i}>
              <path id={pathId} d={`M ${a.x1},${a.y1} L ${a.x2},${a.y2}`} fill="none" stroke="none" />
              <Arrow x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} />
              <FlowDot pathId={pathId} />
            </g>
          );
        })}
      </g>

      {/* Nodes */}
      {nodes.map((n) => {
        const Shape = shapeMap[n.shape];
        return (
          <g key={n.id}>
            <Shape cx={n.cx} cy={n.cy} w={n.w} h={n.h} />
            <text x={n.cx} y={n.cy - 4} textAnchor="middle" fontSize="9.5" fontWeight="600"
              fill="hsl(174 78% 80%)" fontFamily="inherit">
              {n.title}
            </text>
            <text x={n.cx} y={n.cy + 10} textAnchor="middle" fontSize="7.5"
              fill="hsl(174 78% 55%)" fontFamily="inherit" fillOpacity="0.8">
              {n.desc}
            </text>
          </g>
        );
      })}
    </VisibleSvg>
  );
};

export default LeadFlowDiagram;
