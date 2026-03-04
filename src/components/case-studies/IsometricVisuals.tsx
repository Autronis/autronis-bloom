import React from "react";

/* ─── Isometric Platform ─── */
const IsoPlatform = ({
  x, y, w = 110, label, isHub = false,
  icon,
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
      {/* Glow under hub */}
      {isHub && (
        <>
          <ellipse cx={x} cy={y - h + hh} rx={w * 0.6} ry={w * 0.2} fill="hsl(174, 78%, 41%)" fillOpacity="0.12">
            <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="3s" repeatCount="indefinite" />
          </ellipse>
        </>
      )}
      <path d={leftPath} fill={leftFill} stroke="hsl(174, 78%, 41%)" strokeWidth={strokeW} strokeOpacity={strokeOp} />
      <path d={rightPath} fill={rightFill} stroke="hsl(174, 78%, 41%)" strokeWidth={strokeW} strokeOpacity={strokeOp} />
      <path d={topPath} fill={topFill} stroke="hsl(174, 78%, 41%)" strokeWidth={strokeW} strokeOpacity={strokeOp} />

      {/* Icon */}
      {icon && (
        <g transform={`translate(${x - 7}, ${y - h + hh - 16})`}>
          {icon}
        </g>
      )}

      {/* Label */}
      <text
        x={x}
        y={y - h + hh + (icon ? 8 : 2)}
        textAnchor="middle"
        fontSize="9"
        fill={isHub ? "hsl(174, 78%, 80%)" : "hsl(174, 78%, 65%)"}
        fontWeight={isHub ? "600" : "500"}
        fontFamily="inherit"
      >
        {label}
      </text>
    </g>
  );
};

/* ─── Animated flow line ─── */
const FlowLine = ({ x1, y1, x2, y2, delay = 0 }: {
  x1: number; y1: number; x2: number; y2: number; delay?: number;
}) => (
  <g>
    {/* Base line */}
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(174, 78%, 41%)" strokeWidth="1" strokeOpacity="0.2" />
    {/* Glow line */}
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(174, 78%, 50%)" strokeWidth="2.5" strokeOpacity="0.06" />
    {/* Animated dot */}
    <circle r="2.5" fill="hsl(174, 78%, 60%)" fillOpacity="0.8">
      <animateMotion dur="2.5s" repeatCount="indefinite" begin={`${delay}s`}>
        <mpath href="" />
      </animateMotion>
      <animate attributeName="cx" values={`${x1};${x2}`} dur="2.5s" repeatCount="indefinite" begin={`${delay}s`} />
      <animate attributeName="cy" values={`${y1};${y2}`} dur="2.5s" repeatCount="indefinite" begin={`${delay}s`} />
    </circle>
    {/* End dot */}
    <circle cx={x2} cy={y2} r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
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
   ═══════════════════════════════════════════ */
export const EcommerceIsometric = () => (
  <svg viewBox="0 0 400 320" className="w-full" fill="none">
    {/* Central hub */}
    <IsoPlatform x={200} y={165} w={130} label="Automatisering" icon={<IcoGear />} isHub />

    {/* Surrounding nodes */}
    <IsoPlatform x={80} y={80} w={100} label="Leverancier" icon={<IcoDb />} />
    <IsoPlatform x={320} y={80} w={100} label="Productdata" icon={<IcoBox />} />
    <IsoPlatform x={200} y={50} w={100} label="Webshop" icon={<IcoCart />} />
    <IsoPlatform x={80} y={260} w={100} label="ERP" icon={<IcoChart />} />
    <IsoPlatform x={320} y={260} w={100} label="Fulfilment" icon={<IcoTruck />} />

    {/* Flow lines — inward to hub */}
    <FlowLine x1={110} y1={85} x2={170} y2={140} delay={0} />
    <FlowLine x1={290} y1={85} x2={230} y2={140} delay={0.5} />
    <FlowLine x1={200} y1={60} x2={200} y2={130} delay={0.3} />
    {/* Flow lines — outward from hub */}
    <FlowLine x1={170} y1={190} x2={110} y2={245} delay={0.8} />
    <FlowLine x1={230} y1={190} x2={290} y2={245} delay={1.1} />
  </svg>
);

/* ═══════════════════════════════════════════
   CASE 2 — Finance Pipeline
   ═══════════════════════════════════════════ */
export const FinanceIsometric = () => (
  <svg viewBox="0 0 400 260" className="w-full" fill="none">
    {/* Pipeline nodes staggered */}
    <IsoPlatform x={55} y={140} w={100} label="Facturen" icon={<IcoDoc />} />
    <IsoPlatform x={165} y={100} w={100} label="Parsing" icon={<IcoGear />} isHub />
    <IsoPlatform x={275} y={140} w={105} label="Boekhouding" icon={<IcoDb />} />
    <IsoPlatform x={365} y={100} w={90} label="Rapportage" icon={<IcoChart />} />

    {/* Flow lines */}
    <FlowLine x1={95} y1={128} x2={130} y2={108} delay={0} />
    <FlowLine x1={200} y1={105} x2={237} y2={128} delay={0.6} />
    <FlowLine x1={315} y1={128} x2={335} y2={108} delay={1.2} />

    {/* Automation layer line */}
    <line x1={100} y1={200} x2={340} y2={200} stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.12" />
    <text x={220} y={215} textAnchor="middle" fontSize="7" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" fontFamily="inherit" letterSpacing="3" fontWeight="500">
      AUTOMATION LAYER
    </text>
  </svg>
);

/* ═══════════════════════════════════════════
   CASE 3 — Lead Pipeline (Coming Soon)
   ═══════════════════════════════════════════ */
export const LeadIsometric = () => (
  <svg viewBox="0 0 400 240" className="w-full" fill="none">
    <IsoPlatform x={70} y={120} w={100} label="Formulier" icon={<IcoDoc />} />
    <IsoPlatform x={200} y={90} w={105} label="Verrijking" icon={<IcoGear />} />
    <IsoPlatform x={330} y={120} w={100} label="CRM" icon={<IcoDb />} />

    <FlowLine x1={110} y1={110} x2={162} y2={92} delay={0} />
    <FlowLine x1={238} y1={92} x2={292} y2={110} delay={0.7} />

    {/* Dim overlay */}
    <rect x={0} y={0} width={400} height={240} fill="hsl(192, 30%, 8%)" fillOpacity="0.35" rx="8" />
    <text x={200} y={200} textAnchor="middle" fontSize="9" fill="hsl(174, 78%, 41%)" fillOpacity="0.5" fontFamily="inherit" letterSpacing="4" fontWeight="600">
      COMING SOON
    </text>
  </svg>
);
