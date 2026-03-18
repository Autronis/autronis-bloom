import { motion } from "framer-motion";

// Gear SVG path — proper tooth profile
const gearPath = (cx: number, cy: number, outerR: number, innerR: number, teeth: number) => {
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const toothWidth = (Math.PI * 2) / teeth;
    const a1 = a - toothWidth * 0.2;
    const a2 = a - toothWidth * 0.05;
    const a3 = a + toothWidth * 0.05;
    const a4 = a + toothWidth * 0.2;
    points.push(
      `${cx + Math.cos(a1) * innerR},${cy + Math.sin(a1) * innerR}`,
      `${cx + Math.cos(a2) * outerR},${cy + Math.sin(a2) * outerR}`,
      `${cx + Math.cos(a3) * outerR},${cy + Math.sin(a3) * outerR}`,
      `${cx + Math.cos(a4) * innerR},${cy + Math.sin(a4) * innerR}`,
    );
  }
  return `M ${points.join(" L ")} Z`;
};

// Process Automation — Meshing gears + documents
export const ProcessAutomationVisual = () => {
  // Two gears that mesh: teeth must interlock
  // Large gear: 10 teeth, centered at (120, 60)
  // Medium gear: 8 teeth, positioned so teeth mesh
  const largeR = 35;
  const largeInner = 27;
  const medR = 24;
  const medInner = 18;
  // Distance = sum of pitch radii for meshing
  const meshDist = largeInner + medInner + 2;
  const medCx = 120 - meshDist * 0.85;
  const medCy = 60 + meshDist * 0.52;

  const smallR = 16;
  const smallInner = 12;
  const smallDist = medInner + smallInner + 2;
  const smallCx = medCx - smallDist * 0.7;
  const smallCy = medCy - smallDist * 0.7;

  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center p-2">
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Large gear — clockwise */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "120px 60px" }}
        >
          <path d={gearPath(120, 60, largeR, largeInner, 10)} fill="hsl(174, 78%, 41%)" fillOpacity="0.08" stroke="hsl(174, 78%, 41%)" strokeWidth="1.2" strokeOpacity="0.5" />
          <circle cx="120" cy="60" r="10" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="120" cy="60" r="4" fill="hsl(174, 78%, 41%)" fillOpacity="0.2" />
        </motion.g>

        {/* Medium gear — counter-clockwise, meshed */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 16 * (8 / 10), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${medCx}px ${medCy}px` }}
        >
          <path d={gearPath(medCx, medCy, medR, medInner, 8)} fill="hsl(174, 78%, 41%)" fillOpacity="0.06" stroke="hsl(174, 78%, 41%)" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx={medCx} cy={medCy} r="7" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.25" />
          <circle cx={medCx} cy={medCy} r="3" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
        </motion.g>

        {/* Small gear — clockwise, meshed with medium */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 16 * (6 / 10), repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${smallCx}px ${smallCy}px` }}
        >
          <path d={gearPath(smallCx, smallCy, smallR, smallInner, 6)} fill="hsl(174, 78%, 41%)" fillOpacity="0.05" stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.35" />
          <circle cx={smallCx} cy={smallCy} r="5" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.2" />
          <circle cx={smallCx} cy={smallCy} r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.12" />
        </motion.g>

        {/* Documents flowing from left to right */}
        {[0, 1, 2].map((i) => (
          <motion.g
            key={i}
            animate={{
              x: [-20, 180],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 7,
              delay: i * 2.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Document body */}
            <rect
              x="10" y={115 + i * 2}
              width="22" height="28" rx="2"
              fill="hsl(174, 78%, 41%)" fillOpacity="0.06"
              stroke="hsl(174, 78%, 41%)" strokeWidth="0.7" strokeOpacity="0.45"
            />
            {/* Folded corner */}
            <path d={`M 26 ${115 + i * 2} l 6 0 l 0 6`} fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.3" />
            {/* Text lines */}
            <rect x="14" y={121 + i * 2} width="14" height="1" rx="0.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
            <rect x="14" y={124 + i * 2} width="11" height="1" rx="0.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.2" />
            <rect x="14" y={127 + i * 2} width="13" height="1" rx="0.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.2" />
            <rect x="14" y={130 + i * 2} width="9" height="1" rx="0.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
            {/* Checkmark */}
            <motion.path
              d={`M 16 ${134 + i * 2} l 3 3 l 6 -7`}
              fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1" strokeOpacity="0.6"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 0, 1, 1] }}
              transition={{ duration: 7, delay: i * 2.3, repeat: Infinity }}
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
