import React from "react";

/* ─── Isometric Platform ─── */
const IsoPlatform = ({
  x, y, w = 110, label, isHub = false, icon,
}: {
  x: number; y: number; w?: number; label: string;
  isHub?: boolean; icon?: React.ReactNode;
}) => {
  const h = isHub ? 18 : 12;
  const hw = w / 2;
  const hh = w * 0.28;

  const topPath = `M ${x},${y - h} L ${x + hw},${y - h + hh} L ${x},${y - h + hh * 2} L ${x - hw},${y - h + hh} Z`;
  const leftPath = `M ${x - hw},${y - h + hh} L ${x},${y - h + hh * 2} L ${x},${y - h + hh * 2 + h} L ${x - hw},${y - h + hh + h} Z`;
  const rightPath = `M ${x + hw},${y - h + hh} L ${x},${y - h + hh * 2} L ${x},${y - h + hh * 2 + h} L ${x + hw},${y - h + hh + h} Z`;

  const topFill = isHub ? "hsl(174, 78%, 20%)" : "hsl(192, 30%, 14%)";
  const leftFill = isHub ? "hsl(174, 78%, 12%)" : "hsl(192, 30%, 10%)";
  const rightFill = isHub ? "hsl(174, 78%, 8%)" : "hsl(192, 30%, 8%)";
  const strokeClr = "hsl(174, 78%, 45%)";
  const strokeOp = isHub ? "0.7" : "0.3";
  const strokeW = isHub ? "1.5" : "0.8";

  return (
    <g>
      {/* Glow under hub */}
      {isHub && (
        <ellipse cx={x} cy={y - h + hh * 2 + h + 4} rx={hw * 1.1} ry={hh * 0.5}
          fill="hsl(174, 78%, 45%)" fillOpacity="0.08" />
      )}
      <path d={leftPath} fill={leftFill} stroke={strokeClr} strokeWidth={strokeW} strokeOpacity={strokeOp} />
      <path d={rightPath} fill={rightFill} stroke={strokeClr} strokeWidth={strokeW} strokeOpacity={strokeOp} />
      <path d={topPath} fill={topFill} stroke={strokeClr} strokeWidth={strokeW} strokeOpacity={strokeOp} />
      {icon && <g transform={`translate(${x - 7}, ${y - h + hh - 18})`}>{icon}</g>}
      <text
        x={x} y={y - h + hh + (icon ? 6 : 2)}
        textAnchor="middle" fontSize={isHub ? "10" : "8.5"}
        fill={isHub ? "hsl(174, 78%, 85%)" : "hsl(174, 78%, 65%)"}
        fontWeight={isHub ? "700" : "500"} fontFamily="inherit"
        letterSpacing={isHub ? "1" : "0"}
      >
        {label}
      </text>
    </g>
  );
};

/* ─── Glowing connector line with arrow + animated dot ─── */
const Connector = ({ x1, y1, x2, y2, id, dur = 3 }: {
  x1: number; y1: number; x2: number; y2: number; id: string; dur?: number;
}) => {
  const d = `M ${x1},${y1} L ${x2},${y2}`;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ux = dx / len;
  const uy = dy / len;
  // Arrow at 65% along
  const ax = x1 + dx * 0.65;
  const ay = y1 + dy * 0.65;
  const sz = 5;
  const px = -uy * sz * 0.5;
  const py = ux * sz * 0.5;

  return (
    <g>
      {/* Glow line */}
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="hsl(174, 78%, 45%)" strokeWidth="3" strokeOpacity="0.1" />
      {/* Main line */}
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="hsl(174, 78%, 45%)" strokeWidth="1.2" strokeOpacity="0.5"
        strokeDasharray="4 3" />
      {/* Arrow */}
      <polygon
        points={`${ax + ux * sz},${ay + uy * sz} ${ax + px},${ay + py} ${ax - px},${ay - py}`}
        fill="hsl(174, 78%, 55%)" fillOpacity="0.7"
      />
      {/* Animated dot */}
      <path id={id} d={d} fill="none" stroke="none" />
      <circle r="3" fill="hsl(174, 78%, 70%)" fillOpacity="0.9">
        <animate attributeName="r" values="2.5;3.5;2.5" dur="1.5s" repeatCount="indefinite" />
        <animateMotion dur={`${dur}s`} repeatCount="indefinite">
          <mpath xlinkHref={`#${id}`} />
        </animateMotion>
      </circle>
      {/* Dot glow */}
      <circle r="6" fill="hsl(174, 78%, 50%)" fillOpacity="0.2">
        <animateMotion dur={`${dur}s`} repeatCount="indefinite">
          <mpath xlinkHref={`#${id}`} />
        </animateMotion>
      </circle>
    </g>
  );
};

/* ─── Small icons ─── */
const IcoGear = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="7" cy="7" r="2.5" />
    <path d="M7 1.5v1.5M7 11v1.5M1.5 7H3M11 7h1.5M3.2 3.2l1 1M9.8 9.8l1 1M10.8 3.2l-1 1M4.2 9.8l-1 1" />
  </g>
);
const IcoBox = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="10" height="10" rx="1.5" /><line x1="7" y1="2" x2="7" y2="12" /><line x1="2" y1="7" x2="12" y2="7" />
  </g>
);
const IcoCart = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 1.5h2.5l2 8h6.5l2-5H5" /><circle cx="6.5" cy="12" r="1" /><circle cx="11" cy="12" r="1" />
  </g>
);
const IcoChart = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1.5" y="1.5" width="11" height="11" rx="1.5" /><polyline points="4,10 6,6 8.5,8 10.5,4" />
  </g>
);
const IcoDoc = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.5 1.5h5l3 3v8a1 1 0 01-1 1h-7a1 1 0 01-1-1v-10a1 1 0 011-1z" />
    <polyline points="8.5,1.5 8.5,4.5 11.5,4.5" /><line x1="5" y1="8" x2="9.5" y2="8" /><line x1="5" y1="10.5" x2="8" y2="10.5" />
  </g>
);
const IcoTruck = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="8" height="7" rx="0.5" /><path d="M9 5.5h2.5l2 2.5v2h-4.5z" />
    <circle cx="4.5" cy="11.5" r="1.2" /><circle cx="11.5" cy="11.5" r="1.2" />
  </g>
);
const IcoDb = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round">
    <ellipse cx="7" cy="3.5" rx="5" ry="2" /><path d="M2 3.5v7c0 1.1 2.2 2 5 2s5-.9 5-2v-7" /><path d="M2 7c0 1.1 2.2 2 5 2s5-.9 5-2" />
  </g>
);
const IcoSearch = () => (
  <g fill="none" stroke="hsl(174, 78%, 70%)" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="6.5" cy="6.5" r="4" /><line x1="9.5" y1="9.5" x2="13" y2="13" />
  </g>
);

/* ═══ CASE 1 — E-commerce (matching reference layout) ═══ 
   Layout like reference image:
   - Leverancier top
   - Productontdekking middle-top  
   - AUTOMATISERING center hub (large)
   - Webshop bottom-left, ERP bottom-right
   - Fulfilment bottom-center
*/
export const EcommerceIsometric = () => {
  // Center hub
  const hub = { x: 220, y: 200 };
  // Top nodes (above hub)
  const lev = { x: 220, y: 50 };
  const prod = { x: 220, y: 120 };
  // Bottom nodes (below hub, spread out)
  const web = { x: 90, y: 310 };
  const erp = { x: 350, y: 310 };
  const ful = { x: 220, y: 340 };

  return (
    <svg viewBox="0 0 440 400" className="w-full" fill="none">
      {/* Connectors: all flow through hub */}
      <Connector x1={lev.x} y1={lev.y} x2={prod.x} y2={prod.y} id="ec-lev-prod" dur={2} />
      <Connector x1={prod.x} y1={prod.y} x2={hub.x} y2={hub.y} id="ec-prod-hub" dur={2} />
      <Connector x1={hub.x} y1={hub.y} x2={web.x} y2={web.y} id="ec-hub-web" dur={2.5} />
      <Connector x1={hub.x} y1={hub.y} x2={erp.x} y2={erp.y} id="ec-hub-erp" dur={2.5} />
      <Connector x1={hub.x} y1={hub.y} x2={ful.x} y2={ful.y} id="ec-hub-ful" dur={2.5} />

      {/* Platforms */}
      <IsoPlatform x={lev.x} y={lev.y} w={100} label="Leverancier" icon={<IcoBox />} />
      <IsoPlatform x={prod.x} y={prod.y} w={110} label="Productontdekking" icon={<IcoSearch />} />
      <IsoPlatform x={hub.x} y={hub.y} w={150} label="AUTOMATISERING" icon={<IcoGear />} isHub />
      <IsoPlatform x={web.x} y={web.y} w={100} label="Webshop" icon={<IcoCart />} />
      <IsoPlatform x={erp.x} y={erp.y} w={100} label="ERP" icon={<IcoChart />} />
      <IsoPlatform x={ful.x} y={ful.y} w={100} label="Fulfilment" icon={<IcoTruck />} />
    </svg>
  );
};

/* ═══ CASE 2 — Finance Pipeline ═══ */
export const FinanceIsometric = () => {
  const fact = { x: 70,  y: 154 };
  const pars = { x: 175, y: 114 };
  const boek = { x: 280, y: 155 };
  const rapp = { x: 370, y: 111 };

  return (
    <svg viewBox="0 0 420 220" className="w-full" fill="none">
      <Connector x1={fact.x} y1={fact.y} x2={pars.x} y2={pars.y} id="fn1" dur={2} />
      <Connector x1={pars.x} y1={pars.y} x2={boek.x} y2={boek.y} id="fn2" dur={2} />
      <Connector x1={boek.x} y1={boek.y} x2={rapp.x} y2={rapp.y} id="fn3" dur={2} />

      <IsoPlatform x={70} y={140} w={100} label="Facturen" icon={<IcoDoc />} />
      <IsoPlatform x={175} y={100} w={100} label="Parsing" icon={<IcoGear />} />
      <IsoPlatform x={280} y={140} w={105} label="Boekhouding" icon={<IcoDb />} />
      <IsoPlatform x={370} y={100} w={90} label="Rapportage" icon={<IcoChart />} />
    </svg>
  );
};

/* ═══ CASE 3 — Lead Pipeline (Coming Soon) ═══ */
export const LeadIsometric = () => {
  const form = { x: 70,  y: 134 };
  const verr = { x: 200, y: 104 };
  const crm  = { x: 330, y: 134 };

  return (
    <svg viewBox="0 0 400 210" className="w-full" fill="none">
      <Connector x1={form.x} y1={form.y} x2={verr.x} y2={verr.y} id="ld1" dur={2.5} />
      <Connector x1={verr.x} y1={verr.y} x2={crm.x} y2={crm.y} id="ld2" dur={2.5} />

      <IsoPlatform x={70} y={120} w={100} label="Formulier" icon={<IcoDoc />} />
      <IsoPlatform x={200} y={90} w={105} label="Verrijking" icon={<IcoGear />} />
      <IsoPlatform x={330} y={120} w={100} label="CRM" icon={<IcoDb />} />

      <text x={200} y={190} textAnchor="middle" fontSize="9" fill="hsl(174, 78%, 41%)" fillOpacity="0.45" fontFamily="inherit" letterSpacing="4" fontWeight="600">
        COMING SOON
      </text>
    </svg>
  );
};