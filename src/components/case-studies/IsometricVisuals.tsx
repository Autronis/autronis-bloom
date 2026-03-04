import React from "react";

/* ─── Shared helpers ─── */

const IsoPlatform = ({
  x,
  y,
  w = 90,
  h = 24,
  label,
  icon,
  glow = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  icon?: React.ReactNode;
  glow?: boolean;
}) => {
  // Isometric diamond (top face)
  const topPath = `M ${x},${y - h} L ${x + w / 2},${y - h + w * 0.28} L ${x},${y - h + w * 0.56} L ${x - w / 2},${y - h + w * 0.28} Z`;
  // Front-left face
  const leftPath = `M ${x - w / 2},${y - h + w * 0.28} L ${x},${y - h + w * 0.56} L ${x},${y + w * 0.56 - h + 12} L ${x - w / 2},${y + w * 0.28 - h + 12} Z`;
  // Front-right face
  const rightPath = `M ${x + w / 2},${y - h + w * 0.28} L ${x},${y - h + w * 0.56} L ${x},${y + w * 0.56 - h + 12} L ${x + w / 2},${y + w * 0.28 - h + 12} Z`;

  return (
    <g>
      {glow && (
        <ellipse
          cx={x}
          cy={y - h + w * 0.28}
          rx={w * 0.55}
          ry={w * 0.22}
          fill="hsl(174, 78%, 41%)"
          fillOpacity="0.08"
        />
      )}
      <path d={leftPath} fill="hsl(192, 30%, 12%)" stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.3" />
      <path d={rightPath} fill="hsl(192, 30%, 10%)" stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.3" />
      <path d={topPath} fill="hsl(192, 30%, 14%)" stroke="hsl(174, 78%, 41%)" strokeWidth="0.7" strokeOpacity="0.5" />
      {icon && (
        <g transform={`translate(${x - 6}, ${y - h + w * 0.28 - 14})`}>
          {icon}
        </g>
      )}
      <text
        x={x}
        y={y - h + w * 0.28 + (icon ? 6 : 0)}
        textAnchor="middle"
        fontSize="7"
        fill="hsl(174, 78%, 70%)"
        fontWeight="500"
        fontFamily="inherit"
      >
        {label}
      </text>
    </g>
  );
};

const FlowLine = ({
  x1,
  y1,
  x2,
  y2,
  animated = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  animated?: boolean;
}) => (
  <g>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="hsl(174, 78%, 41%)"
      strokeWidth="0.8"
      strokeOpacity="0.25"
    />
    {/* Glow line */}
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="hsl(174, 78%, 50%)"
      strokeWidth="1.5"
      strokeOpacity="0.08"
    />
    {/* Flow dot */}
    {animated && (
      <circle r="2" fill="hsl(174, 78%, 60%)" fillOpacity="0.7">
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path={`M ${x1} ${y1} L ${x2} ${y2}`}
        />
      </circle>
    )}
    {/* Arrow */}
    <circle cx={x2} cy={y2} r="1.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.4" />
  </g>
);

/* ─── Icons (tiny SVG) ─── */

const IconBox = () => (
  <g fill="none" stroke="hsl(174, 78%, 60%)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="8" height="8" rx="1" />
    <line x1="6" y1="2" x2="6" y2="10" />
    <line x1="2" y1="6" x2="10" y2="6" />
  </g>
);

const IconCart = () => (
  <g fill="none" stroke="hsl(174, 78%, 60%)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1h2l1.5 7h6L12 3H4" />
    <circle cx="5" cy="10" r="1" />
    <circle cx="9" cy="10" r="1" />
  </g>
);

const IconGear = () => (
  <g fill="none" stroke="hsl(174, 78%, 60%)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="2" />
    <path d="M6 1v1M6 10v1M1 6h1M10 6h1M2.5 2.5l.7.7M8.8 8.8l.7.7M9.5 2.5l-.7.7M3.2 8.8l-.7.7" />
  </g>
);

const IconChart = () => (
  <g fill="none" stroke="hsl(174, 78%, 60%)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="1" width="10" height="10" rx="1" />
    <polyline points="3,8 5,5 7,7 9,3" />
  </g>
);

const IconDoc = () => (
  <g fill="none" stroke="hsl(174, 78%, 60%)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 1h4l3 3v7a1 1 0 01-1 1H3a1 1 0 01-1-1V2a1 1 0 011-1z" />
    <polyline points="7,1 7,4 10,4" />
    <line x1="4" y1="7" x2="8" y2="7" />
    <line x1="4" y1="9" x2="6" y2="9" />
  </g>
);

const IconTruck = () => (
  <g fill="none" stroke="hsl(174, 78%, 60%)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="7" height="6" rx="0.5" />
    <path d="M8 5h2l2 2v2h-4z" />
    <circle cx="4" cy="10" r="1" />
    <circle cx="10" cy="10" r="1" />
  </g>
);

const IconDatabase = () => (
  <g fill="none" stroke="hsl(174, 78%, 60%)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="6" cy="3" rx="5" ry="2" />
    <path d="M1 3v6c0 1.1 2.2 2 5 2s5-.9 5-2V3" />
    <path d="M1 6c0 1.1 2.2 2 5 2s5-.9 5-2" />
  </g>
);

/* ─── Case 1: E-commerce hub-and-spoke ─── */

export const EcommerceIsometric = () => (
  <svg viewBox="0 0 320 260" className="w-full max-w-[300px]" fill="none">
    {/* Center hub */}
    <IsoPlatform x={160} y={130} w={100} h={20} label="Automatisering" icon={<IconGear />} glow />

    {/* Surrounding platforms */}
    <IsoPlatform x={60} y={70} w={85} label="Leverancier" icon={<IconDatabase />} />
    <IsoPlatform x={260} y={70} w={85} label="Productdata" icon={<IconBox />} />
    <IsoPlatform x={60} y={200} w={85} label="ERP" icon={<IconChart />} />
    <IsoPlatform x={260} y={200} w={85} label="Fulfilment" icon={<IconTruck />} />
    <IsoPlatform x={160} y={40} w={85} label="Webshop" icon={<IconCart />} />

    {/* Flow lines to center hub */}
    <FlowLine x1={85} y1={72} x2={135} y2={115} animated />
    <FlowLine x1={235} y1={72} x2={185} y2={115} animated />
    <FlowLine x1={160} y1={50} x2={160} y2={105} animated />
    <FlowLine x1={85} y1={190} x2={135} y2={150} />
    <FlowLine x1={235} y1={190} x2={185} y2={150} />
  </svg>
);

/* ─── Case 2: Finance pipeline ─── */

export const FinanceIsometric = () => (
  <svg viewBox="0 0 320 220" className="w-full max-w-[300px]" fill="none">
    {/* Pipeline left to right, staggered isometric */}
    <IsoPlatform x={45} y={110} w={75} label="Facturen" icon={<IconDoc />} />
    <IsoPlatform x={125} y={80} w={80} label="Parsing" icon={<IconGear />} />
    <IsoPlatform x={205} y={110} w={85} label="Boekhouding" icon={<IconDatabase />} />
    <IsoPlatform x={280} y={80} w={80} label="Rapportage" icon={<IconChart />} glow />

    {/* Flow lines */}
    <FlowLine x1={75} y1={100} x2={95} y2={85} animated />
    <FlowLine x1={155} y1={82} x2={175} y2={100} animated />
    <FlowLine x1={235} y1={100} x2={250} y2={85} animated />

    {/* Subtle automation layer bar */}
    <rect x={80} y={155} width={180} height={1} rx={0.5} fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
    <text x={170} y={168} textAnchor="middle" fontSize="6" fill="hsl(174, 78%, 41%)" fillOpacity="0.4" fontFamily="inherit" letterSpacing="2">
      AUTOMATION LAYER
    </text>
  </svg>
);

/* ─── Case 3: Lead pipeline (coming soon) ─── */

export const LeadIsometric = () => (
  <svg viewBox="0 0 320 200" className="w-full max-w-[300px]" fill="none">
    <IsoPlatform x={55} y={100} w={80} label="Formulier" icon={<IconDoc />} />
    <IsoPlatform x={150} y={75} w={85} label="Verrijking" icon={<IconGear />} />
    <IsoPlatform x={240} y={100} w={80} label="CRM" icon={<IconDatabase />} />

    <FlowLine x1={85} y1={92} x2={118} y2={80} animated />
    <FlowLine x1={182} y1={78} x2={210} y2={92} animated />

    {/* Coming soon overlay */}
    <rect x={0} y={0} width={320} height={200} fill="hsl(192, 30%, 8%)" fillOpacity="0.3" />
    <text x={160} y={170} textAnchor="middle" fontSize="8" fill="hsl(174, 78%, 41%)" fillOpacity="0.5" fontFamily="inherit" letterSpacing="3" fontWeight="500">
      COMING SOON
    </text>
  </svg>
);
