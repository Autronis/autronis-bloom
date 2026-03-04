import React from "react";

/* ─── Isometric Platform ─── */
const IsoPlatform = ({
  x, y, w = 110, label, isHub = false, icon,
}: {
  x: number; y: number; w?: number; label: string;
  isHub?: boolean; icon?: React.ReactNode;
}) => {
  const h = 14;
  const hw = w / 2;
  const hh = w * 0.28;

  const topPath = `M ${x},${y - h} L ${x + hw},${y - h + hh} L ${x},${y - h + hh * 2} L ${x - hw},${y - h + hh} Z`;
  const leftPath = `M ${x - hw},${y - h + hh} L ${x},${y - h + hh * 2} L ${x},${y - h + hh * 2 + 10} L ${x - hw},${y - h + hh + 10} Z`;
  const rightPath = `M ${x + hw},${y - h + hh} L ${x},${y - h + hh * 2} L ${x},${y - h + hh * 2 + 10} L ${x + hw},${y - h + hh + 10} Z`;

  const topFill = isHub ? "hsl(174, 78%, 22%)" : "hsl(192, 30%, 16%)";
  const leftFill = isHub ? "hsl(174, 78%, 14%)" : "hsl(192, 30%, 12%)";
  const rightFill = isHub ? "hsl(174, 78%, 10%)" : "hsl(192, 30%, 10%)";
  const strokeOp = isHub ? "0.8" : "0.35";
  const strokeW = isHub ? "1.2" : "0.8";

  return (
    <g>
      {isHub && (
        <ellipse cx={x} cy={y - h + hh} rx={w * 0.6} ry={w * 0.2} fill="hsl(174, 78%, 41%)" fillOpacity="0.1">
          <animate attributeName="fillOpacity" values="0.06;0.14;0.06" dur="3s" repeatCount="indefinite" />
        </ellipse>
      )}
      <path d={leftPath} fill={leftFill} stroke="hsl(174, 78%, 41%)" strokeWidth={strokeW} strokeOpacity={strokeOp} />
      <path d={rightPath} fill={rightFill} stroke="hsl(174, 78%, 41%)" strokeWidth={strokeW} strokeOpacity={strokeOp} />
      <path d={topPath} fill={topFill} stroke="hsl(174, 78%, 41%)" strokeWidth={strokeW} strokeOpacity={strokeOp} />
      {icon && (
        <g transform={`translate(${x - 7}, ${y - h + hh - 16})`}>{icon}</g>
      )}
      <text
        x={x} y={y - h + hh + (icon ? 8 : 2)}
        textAnchor="middle" fontSize="9"
        fill={isHub ? "hsl(174, 78%, 80%)" : "hsl(174, 78%, 65%)"}
        fontWeight={isHub ? "600" : "500"} fontFamily="inherit"
      >
        {label}
      </text>
    </g>
  );
};

/* Helper: get the center of a platform's top face */
const anchor = (x: number, y: number, w: number) => ({
  x, y: y - 14 + w * 0.28,
});

/* ─── Animated flow path (dashed stroke with moving offset) ─── */
const FlowPath = ({ d, dur = 6, id }: { d: string; dur?: number; id: string }) => (
  <g>
    {/* Static base line */}
    <path d={d} fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1" strokeOpacity="0.15" />
    {/* Glow */}
    <path d={d} fill="none" stroke="hsl(174, 78%, 50%)" strokeWidth="2.5" strokeOpacity="0.05" />
    {/* Animated dashed flow */}
    <path
      d={d} fill="none"
      stroke="hsl(174, 78%, 55%)" strokeWidth="1.2" strokeOpacity="0.5"
      strokeDasharray="6 14"
      strokeLinecap="round"
    >
      <animate attributeName="stroke-dashoffset" values="0;-60" dur={`${dur}s`} repeatCount="indefinite" />
    </path>
    {/* Small dot following the path */}
    <circle r="2" fill="hsl(174, 78%, 65%)" fillOpacity="0.7">
      <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto">
        <mpath xlinkHref={`#${id}`} />
      </animateMotion>
    </circle>
    {/* Hidden path for mpath reference */}
    <path id={id} d={d} fill="none" stroke="none" />
  </g>
);

/* ─── Small icons ─── */
const IcoGear = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="7" cy="7" r="2.5" />
    <path d="M7 1.5v1.5M7 11v1.5M1.5 7H3M11 7h1.5M3.2 3.2l1 1M9.8 9.8l1 1M10.8 3.2l-1 1M4.2 9.8l-1 1" />
  </g>
);

const IcoBox = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="10" height="10" rx="1.5" />
    <line x1="7" y1="2" x2="7" y2="12" />
    <line x1="2" y1="7" x2="12" y2="7" />
  </g>
);

const IcoCart = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1.5h2.5l2 8h6.5l2-5H5" />
    <circle cx="6.5" cy="12" r="1" />
    <circle cx="11" cy="12" r="1" />
  </g>
);

const IcoChart = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" />
    <polyline points="4,10 6,6 8.5,8 10.5,4" />
  </g>
);

const IcoDoc = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 1.5h5l3 3v8a1 1 0 01-1 1h-7a1 1 0 01-1-1v-10a1 1 0 011-1z" />
    <polyline points="8.5,1.5 8.5,4.5 11.5,4.5" />
    <line x1="5" y1="8" x2="9.5" y2="8" />
    <line x1="5" y1="10.5" x2="8" y2="10.5" />
  </g>
);

const IcoTruck = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="8" height="7" rx="0.5" />
    <path d="M9 5.5h2.5l2 2.5v2h-4.5z" />
    <circle cx="4.5" cy="11.5" r="1.2" />
    <circle cx="11.5" cy="11.5" r="1.2" />
  </g>
);

const IcoDb = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round">
    <ellipse cx="7" cy="3.5" rx="5" ry="2" />
    <path d="M2 3.5v7c0 1.1 2.2 2 5 2s5-.9 5-2v-7" />
    <path d="M2 7c0 1.1 2.2 2 5 2s5-.9 5-2" />
  </g>
);

/* ═══════════════════════════════════════════
   CASE 1 — E-commerce Hub & Spoke
   
   Nodes & anchors:
   Hub:         (200, 165, w=130) → anchor (200, 187.4)
   Leverancier: (80,  80,  w=100) → anchor (80,  94)
   Productdata: (320, 80,  w=100) → anchor (320, 94)
   Webshop:     (200, 50,  w=100) → anchor (200, 64)
   ERP:         (80,  260, w=100) → anchor (80,  274)
   Fulfilment:  (320, 260, w=100) → anchor (320, 274)
   ═══════════════════════════════════════════ */
export const EcommerceIsometric = () => {
  // Continuous flow: Leverancier → Hub → Webshop → Productdata → Hub → ERP → Fulfilment → Hub (loop)
  const flowPath = [
    "M 80,94",        // Leverancier
    "L 200,187",      // → Hub
    "L 200,64",       // → Webshop
    "L 320,94",       // → Productdata
    "L 200,187",      // → Hub
    "L 80,274",       // → ERP
    "L 320,274",      // → Fulfilment
    "L 200,187",      // → Hub
    "L 80,94",        // → back to Leverancier
  ].join(" ");

  return (
    <svg viewBox="0 0 400 320" className="w-full" fill="none">
      {/* Flow path (drawn first, behind platforms) */}
      <FlowPath d={flowPath} dur={12} id="ecom-flow" />

      {/* Platforms (drawn on top) */}
      <IsoPlatform x={200} y={165} w={130} label="Automatisering" icon={<IcoGear />} isHub />
      <IsoPlatform x={80} y={80} w={100} label="Leverancier" icon={<IcoDb />} />
      <IsoPlatform x={320} y={80} w={100} label="Productdata" icon={<IcoBox />} />
      <IsoPlatform x={200} y={50} w={100} label="Webshop" icon={<IcoCart />} />
      <IsoPlatform x={80} y={260} w={100} label="ERP" icon={<IcoChart />} />
      <IsoPlatform x={320} y={260} w={100} label="Fulfilment" icon={<IcoTruck />} />
    </svg>
  );
};

/* ═══════════════════════════════════════════
   CASE 2 — Finance Pipeline
   
   Nodes & anchors:
   Facturen:    (70,  140, w=100) → anchor (70,  154)
   Parsing:     (175, 100, w=100) → anchor (175, 114)
   Boekhouding: (280, 140, w=105) → anchor (280, 155.4)
   Rapportage:  (370, 100, w=90)  → anchor (370, 111.2)
   ═══════════════════════════════════════════ */
export const FinanceIsometric = () => {
  const flowPath = [
    "M 70,154",       // Facturen
    "L 175,114",      // → Parsing
    "L 280,155",      // → Boekhouding
    "L 370,111",      // → Rapportage
    "L 280,155",      // → back through Boekhouding
    "L 175,114",      // → back through Parsing
    "L 70,154",       // → back to Facturen (smooth loop)
  ].join(" ");

  return (
    <svg viewBox="0 0 420 220" className="w-full" fill="none">
      <FlowPath d={flowPath} dur={8} id="fin-flow" />

      <IsoPlatform x={70} y={140} w={100} label="Facturen" icon={<IcoDoc />} />
      <IsoPlatform x={175} y={100} w={100} label="Parsing" icon={<IcoGear />} isHub />
      <IsoPlatform x={280} y={140} w={105} label="Boekhouding" icon={<IcoDb />} />
      <IsoPlatform x={370} y={100} w={90} label="Rapportage" icon={<IcoChart />} />
    </svg>
  );
};

/* ═══════════════════════════════════════════
   CASE 3 — Lead Pipeline (Coming Soon)
   ═══════════════════════════════════════════ */
export const LeadIsometric = () => {
  const flowPath = "M 70,134 L 200,104 L 330,134 L 200,104 L 70,134";

  return (
    <svg viewBox="0 0 400 220" className="w-full" fill="none">
      <FlowPath d={flowPath} dur={6} id="lead-flow" />

      <IsoPlatform x={70} y={120} w={100} label="Formulier" icon={<IcoDoc />} />
      <IsoPlatform x={200} y={90} w={105} label="Verrijking" icon={<IcoGear />} />
      <IsoPlatform x={330} y={120} w={100} label="CRM" icon={<IcoDb />} />

      {/* Coming soon text only, no background rect */}
      <text x={200} y={195} textAnchor="middle" fontSize="9" fill="hsl(174, 78%, 41%)" fillOpacity="0.45" fontFamily="inherit" letterSpacing="4" fontWeight="600">
        COMING SOON
      </text>
    </svg>
  );
};
