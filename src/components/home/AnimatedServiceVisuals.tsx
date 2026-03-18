import { motion } from "framer-motion";

// Gear path centered at (0,0). Tooth and gap each take exactly half a step.
// toothRatio controls what fraction of each half-step is the flat part vs transition
const gearPathAt0 = (outer: number, inner: number, teeth: number) => {
  const s = (Math.PI * 2) / teeth;
  const tw = s * 0.23; // tooth angular half-width (flat top)
  const gw = s * 0.23; // gap angular half-width (flat bottom)
  const d: string[] = [];

  for (let i = 0; i < teeth; i++) {
    const c = i * s; // center of tooth
    const gc = c + s / 2; // center of gap
    // Tooth flat top
    const t0x = Math.cos(c - tw) * outer, t0y = Math.sin(c - tw) * outer;
    const t1x = Math.cos(c + tw) * outer, t1y = Math.sin(c + tw) * outer;
    // Gap flat bottom
    const g0x = Math.cos(gc - gw) * inner, g0y = Math.sin(gc - gw) * inner;
    const g1x = Math.cos(gc + gw) * inner, g1y = Math.sin(gc + gw) * inner;

    if (i === 0) d.push(`M ${t0x} ${t0y}`);
    // Tooth top arc
    d.push(`A ${outer} ${outer} 0 0 1 ${t1x} ${t1y}`);
    // Transition down to gap
    d.push(`L ${g0x} ${g0y}`);
    // Gap bottom arc
    d.push(`A ${inner} ${inner} 0 0 1 ${g1x} ${g1y}`);
    // Transition up to next tooth
    const nt = (i + 1) * s;
    d.push(`L ${Math.cos(nt - tw) * outer} ${Math.sin(nt - tw) * outer}`);
  }
  return d.join(" ") + " Z";
};

// Process Automation — Meshing settings gears + conveyor belt with documents
export const ProcessAutomationVisual = () => {
  // All gears share the same tooth height (outer - inner) = "module"
  // This ensures teeth from one gear fit into gaps of the other
  const toothH = 7; // tooth height for all gears

  const teethA = 10, innerA = 22, outerA = innerA + toothH; // 22/29
  const teethB = 8,  innerB = 18, outerB = innerB + toothH; // 18/25
  const teethC = 6,  innerC = 13, outerC = innerC + toothH; // 13/20

  // For meshing: distance between centers = innerA + innerB + toothH
  // (tooth of A extends toothH beyond innerA, reaching to innerB of the neighbor)
  const dAB = innerA + innerB + toothH;
  const dAC = innerA + innerC + toothH;

  const cxA = 108, cyA = 68;
  const angAB = 215 * (Math.PI / 180);
  const cxB = cxA + Math.cos(angAB) * dAB;
  const cyB = cyA + Math.sin(angAB) * dAB;
  const angAC = 325 * (Math.PI / 180);
  const cxC = cxA + Math.cos(angAC) * dAC;
  const cyC = cyA + Math.sin(angAC) * dAC;

  // Speed proportional to teeth count
  const baseDur = 20;
  const durA = baseDur;
  const durB = baseDur * (teethB / teethA);
  const durC = baseDur * (teethC / teethA);

  // Phase: angle from A center to B center, then offset by half a tooth step
  const angAToBdeg = 215;
  const angAToCdeg = 325;
  const halfStepB = 360 / teethB / 2;
  const halfStepC = 360 / teethC / 2;
  // The contact angle determines where teeth must mesh
  // B must have a gap (not a tooth) pointing toward A at the contact angle
  // Contact angle from B's perspective = angAtoB + 180
  const contactFromB = angAToBdeg + 180;
  const contactFromC = angAToCdeg + 180;
  // Offset B so that a gap center aligns with contactFromB
  // Gap centers are at stepB/2, stepB*1.5, stepB*2.5...
  // We need: offsetB + gap_center ≡ contactFromB (mod stepB)
  const stepDegB = 360 / teethB;
  const stepDegC = 360 / teethC;
  const offsetB = contactFromB - stepDegB / 2;
  const offsetC = contactFromC - stepDegC / 2;

  const pathA = gearPathAt0(outerA, innerA, teethA);
  const pathB = gearPathAt0(outerB, innerB, teethB);
  const pathC = gearPathAt0(outerC, innerC, teethC);

  const beltY = 128;

  return (
    <div className="relative w-full h-full min-h-[260px] flex items-center justify-center p-2">
      <svg viewBox="0 0 200 150" className="w-full h-full">
        {/* Gear A — clockwise */}
        <g transform={`translate(${cxA},${cyA})`}>
          <motion.g
            animate={{ rotate: [0, 360] }}
            transition={{ duration: durA, repeat: Infinity, ease: "linear" }}
          >
            <path d={pathA}
              fill="hsl(174, 78%, 41%)" fillOpacity="0.07"
              stroke="hsl(174, 78%, 41%)" strokeWidth="1" strokeOpacity="0.5" />
          </motion.g>
          <circle r={innerA * 0.45} fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.3" />
          <circle r={innerA * 0.18} fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
        </g>

        {/* Gear B — counter-clockwise */}
        <g transform={`translate(${cxB},${cyB})`}>
          <motion.g
            animate={{ rotate: [offsetB, offsetB - 360] }}
            transition={{ duration: durB, repeat: Infinity, ease: "linear" }}
          >
            <path d={pathB}
              fill="hsl(174, 78%, 41%)" fillOpacity="0.06"
              stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.45" />
          </motion.g>
          <circle r={innerB * 0.45} fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.7" strokeOpacity="0.25" />
          <circle r={innerB * 0.18} fill="hsl(174, 78%, 41%)" fillOpacity="0.2" />
        </g>

        {/* Gear C — counter-clockwise */}
        <g transform={`translate(${cxC},${cyC})`}>
          <motion.g
            animate={{ rotate: [offsetC, offsetC - 360] }}
            transition={{ duration: durC, repeat: Infinity, ease: "linear" }}
          >
            <path d={pathC}
              fill="hsl(174, 78%, 41%)" fillOpacity="0.05"
              stroke="hsl(174, 78%, 41%)" strokeWidth="0.7" strokeOpacity="0.4" />
          </motion.g>
          <circle r={innerC * 0.45} fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.2" />
          <circle r={innerC * 0.18} fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
        </g>

        {/* Shooting stars / sparks flying left to right */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.g
            key={`star-${i}`}
            animate={{
              x: [-20, 210],
              y: [20 + i * 12, 25 + i * 10],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.2 + i * 0.2,
              delay: i * 1.5,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeIn",
            }}
          >
            {/* Star head */}
            <circle r="1.2" fill="hsl(174, 78%, 41%)" fillOpacity="0.8" />
            {/* Trail */}
            <line x1="0" y1="0" x2="-8" y2="1" stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.4" strokeLinecap="round" />
            <line x1="-8" y1="1" x2="-14" y2="1.5" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.15" strokeLinecap="round" />
          </motion.g>
        ))}

        {/* ═══ Conveyor belt ═══ */}
        {/* Belt line */}
        <line x1="5" y1={beltY} x2="195" y2={beltY} stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="5" y1={beltY + 4} x2="195" y2={beltY + 4} stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.15" />

        {/* Belt rollers */}
        {[15, 60, 105, 150, 190].map((x) => (
          <g key={`roller-${x}`}>
            <circle cx={x} cy={beltY + 2} r="3" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.4" strokeOpacity="0.2" />
            <motion.circle cx={x} cy={beltY + 2} r="1" fill="hsl(174, 78%, 41%)" fillOpacity="0.15"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: `${x}px ${beltY + 2}px` }}
            />
          </g>
        ))}

        {/* Belt movement dashes */}
        <motion.line x1="5" y1={beltY + 2} x2="195" y2={beltY + 2}
          stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.1"
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -8] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        {/* Documents on belt */}
        {[0, 1, 2].map((i) => (
          <motion.g key={`doc-${i}`}
            animate={{ x: [-30, 200] }}
            transition={{ duration: 8, delay: i * 2.7, repeat: Infinity, ease: "linear" }}
          >
            {/* Document */}
            <rect x="5" y={beltY - 22} width="20" height="21" rx="1.5"
              fill="hsl(174, 78%, 41%)" fillOpacity="0.07"
              stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.5"
            />
            {/* Folded corner */}
            <path d={`M 20 ${beltY - 22} l 5 0 l 0 5`} fill="hsl(174, 78%, 41%)" fillOpacity="0.04" stroke="hsl(174, 78%, 41%)" strokeWidth="0.4" strokeOpacity="0.3" />
            {/* Lines */}
            <rect x="8" y={beltY - 17} width="13" height="0.8" rx="0.4" fill="hsl(174, 78%, 41%)" fillOpacity="0.35" />
            <rect x="8" y={beltY - 14.5} width="10" height="0.8" rx="0.4" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
            <rect x="8" y={beltY - 12} width="12" height="0.8" rx="0.4" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
            <rect x="8" y={beltY - 9.5} width="8" height="0.8" rx="0.4" fill="hsl(174, 78%, 41%)" fillOpacity="0.2" />
            {/* Checkmark */}
            <motion.path
              d={`M 10 ${beltY - 6} l 2.5 2.5 l 5 -5.5`}
              fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.6"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 0, 0, 1, 1] }}
              transition={{ duration: 8, delay: i * 2.7, repeat: Infinity }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
  );
};

// System Integrations — Large hub with active connections
export const SystemIntegrationVisual = () => {
  const nodes = [
    { angle: -90, label: "API" },
    { angle: -30, label: "CRM" },
    { angle: 30, label: "ERP" },
    { angle: 90, label: "DB" },
    { angle: 150, label: "MAIL" },
    { angle: 210, label: "SHOP" },
  ];
  const cx = 100, cy = 80, R = 55;

  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center p-2">
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Orbit ring */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.4" strokeOpacity="0.12" />
        <circle cx={cx} cy={cy} r={R * 0.6} fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.2" strokeOpacity="0.08" strokeDasharray="3 3" />

        {/* Cross connections */}
        {nodes.map((_, i) => {
          const next = (i + 1) % nodes.length;
          const r1 = (nodes[i].angle * Math.PI) / 180;
          const r2 = (nodes[next].angle * Math.PI) / 180;
          return (
            <line key={`x-${i}`}
              x1={cx + Math.cos(r1) * R} y1={cy + Math.sin(r1) * R}
              x2={cx + Math.cos(r2) * R} y2={cy + Math.sin(r2) * R}
              stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.08"
            />
          );
        })}

        {/* Lines + pulses + nodes */}
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = cx + Math.cos(rad) * R;
          const ny = cy + Math.sin(rad) * R;
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.2" />
              <motion.circle r="2" fill="hsl(174, 78%, 41%)"
                animate={{ cx: [cx, nx], cy: [cy, ny], fillOpacity: [0, 0.8, 0] }}
                transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity, repeatDelay: 3 }}
              />
              <motion.circle r="1.5" fill="hsl(174, 78%, 41%)"
                animate={{ cx: [nx, cx], cy: [ny, cy], fillOpacity: [0, 0.5, 0] }}
                transition={{ duration: 2.5, delay: i * 0.7 + 1.5, repeat: Infinity, repeatDelay: 3 }}
              />
              <motion.circle cx={nx} cy={ny} r="10"
                fill="hsl(174, 78%, 41%)" fillOpacity="0.05"
                stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.4"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 150 }}
              />
              <text x={nx} y={ny + 1.5} textAnchor="middle" fontSize="5" fontWeight="600"
                fill="hsl(174, 78%, 41%)" fillOpacity="0.6" fontFamily="system-ui">
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Center hub */}
        <circle cx={cx} cy={cy} r="14" fill="hsl(174, 78%, 41%)" fillOpacity="0.06" stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.4" />
        <circle cx={cx} cy={cy} r="5" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
        <motion.circle cx={cx} cy={cy} r="14" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.4"
          animate={{ r: [14, 24], opacity: [0.25, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <text x={cx} y={cy + 2} textAnchor="middle" fontSize="5" fontWeight="700" fill="hsl(174, 78%, 41%)" fillOpacity="0.6" fontFamily="system-ui">HUB</text>
      </svg>
    </div>
  );
};

// Data & Reporting — Rich dashboard
export const DataReportingVisual = () => {
  const bars = [30, 50, 38, 65, 48, 78, 55, 72, 42, 85, 60, 70];

  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center p-2">
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Window */}
        <rect x="10" y="8" width="180" height="144" rx="4" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.25" />
        <rect x="10" y="8" width="180" height="14" rx="4" fill="hsl(174, 78%, 41%)" fillOpacity="0.04" />
        <line x1="10" y1="22" x2="190" y2="22" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.2" />
        <circle cx="19" cy="15" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.2" />
        <circle cx="26" cy="15" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.13" />
        <circle cx="33" cy="15" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.13" />

        {/* KPI row */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`kpi-${i}`}>
            <rect x={18 + i * 44} y="27" width="38" height="18" rx="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.04" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.15" />
            <motion.text x={37 + i * 44} y="38" textAnchor="middle" fontSize="6" fontWeight="700"
              fill="hsl(174, 78%, 41%)" fontFamily="monospace"
              animate={{ fillOpacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            >
              {["€24.8K", "94.1%", "1,247", "+18%"][i]}
            </motion.text>
            <text x={37 + i * 44} y="43" textAnchor="middle" fontSize="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" fontFamily="system-ui">
              {["Revenue", "Uptime", "Users", "Growth"][i]}
            </text>
          </g>
        ))}

        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`g-${i}`} x1="18" y1={55 + i * 16} x2="185" y2={55 + i * 16} stroke="hsl(174, 78%, 41%)" strokeWidth="0.1" strokeOpacity="0.08" />
        ))}

        {/* Bars */}
        {bars.map((h, i) => {
          const barH = h * 0.85;
          return (
            <motion.rect key={i} x={20 + i * 13.8} width="9" rx="1"
              fill="hsl(174, 78%, 41%)"
              initial={{ y: 119, height: 0, fillOpacity: 0 }}
              animate={{ y: 119 - barH, height: barH, fillOpacity: 0.1 + (h / 85) * 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.06 + 0.3, ease: "easeOut" }}
            />
          );
        })}

        <line x1="18" y1="119" x2="185" y2="119" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.2" />

        {/* Trend line */}
        <motion.path d="M 24 105 Q 45 85, 65 90 T 105 70 T 140 75 T 165 55 L 180 48"
          fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1" strokeOpacity="0.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
        />
        <motion.circle cx="180" cy="48" r="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.5"
          initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 4.5, duration: 0.5 }}
        />
        <motion.circle cx="180" cy="48" r="2.5" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.4"
          animate={{ r: [2.5, 7], opacity: [0.4, 0] }}
          transition={{ delay: 5, duration: 2.5, repeat: Infinity }}
        />

        {/* Scanner */}
        <motion.rect width="1.5" rx="0.75" y="50" height="70"
          fill="hsl(174, 78%, 41%)" fillOpacity="0.08"
          animate={{ x: [18, 185] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />

        {/* Status bar */}
        <line x1="10" y1="125" x2="190" y2="125" stroke="hsl(174, 78%, 41%)" strokeWidth="0.2" strokeOpacity="0.12" />
        <motion.circle cx="20" cy="138" r="1.5" fill="hsl(174, 78%, 41%)" animate={{ fillOpacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2, repeat: Infinity }} />
        <text x="27" y="139.5" fontSize="3.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" fontFamily="monospace">Live · Updated 2s ago</text>
      </svg>
    </div>
  );
};
