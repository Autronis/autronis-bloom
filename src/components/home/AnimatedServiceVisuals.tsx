import { motion } from "framer-motion";

// Gear SVG path helper
const gearPath = (cx: number, cy: number, r: number, teeth: number) => {
  const inner = r * 0.65;
  const outer = r;
  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2;
    const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
    const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
    const a4 = ((i + 0.8) / teeth) * Math.PI * 2;
    points.push(`${cx + Math.cos(a1) * inner},${cy + Math.sin(a1) * inner}`);
    points.push(`${cx + Math.cos(a2) * outer},${cy + Math.sin(a2) * outer}`);
    points.push(`${cx + Math.cos(a3) * outer},${cy + Math.sin(a3) * outer}`);
    points.push(`${cx + Math.cos(a4) * inner},${cy + Math.sin(a4) * inner}`);
  }
  return `M ${points.join(" L ")} Z`;
};

// Process Automation — Settings gears + flowing documents
export const ProcessAutomationVisual = () => (
  <div className="relative w-full h-full min-h-[320px] flex items-center justify-center p-2">
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Large gear */}
      <motion.path
        d={gearPath(130, 55, 32, 8)}
        fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1" strokeOpacity="0.25"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "130px 55px" }}
      />
      <circle cx="130" cy="55" r="12" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.15" />
      <circle cx="130" cy="55" r="4" fill="hsl(174, 78%, 41%)" fillOpacity="0.1" />

      {/* Medium gear — counter-rotating */}
      <motion.path
        d={gearPath(90, 90, 22, 6)}
        fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.2"
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "90px 90px" }}
      />
      <circle cx="90" cy="90" r="8" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.12" />
      <circle cx="90" cy="90" r="3" fill="hsl(174, 78%, 41%)" fillOpacity="0.08" />

      {/* Small gear */}
      <motion.path
        d={gearPath(155, 100, 15, 6)}
        fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.15"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "155px 100px" }}
      />
      <circle cx="155" cy="100" r="5" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.1" />

      {/* Flowing documents */}
      {[0, 1, 2].map((i) => (
        <motion.g
          key={i}
          animate={{
            x: [0, 60],
            y: [0, 10 + i * 5],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: 5,
            delay: i * 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Document shape */}
          <rect
            x={15 + i * 8} y={30 + i * 20}
            width="18" height="22" rx="2"
            fill="hsl(174, 78%, 41%)" fillOpacity="0.06"
            stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.3"
          />
          {/* Document lines */}
          <line x1={19 + i * 8} y1={36 + i * 20} x2={29 + i * 8} y2={36 + i * 20} stroke="hsl(174, 78%, 41%)" strokeWidth="0.4" strokeOpacity="0.2" />
          <line x1={19 + i * 8} y1={39 + i * 20} x2={27 + i * 8} y2={39 + i * 20} stroke="hsl(174, 78%, 41%)" strokeWidth="0.4" strokeOpacity="0.15" />
          <line x1={19 + i * 8} y1={42 + i * 20} x2={28 + i * 8} y2={42 + i * 20} stroke="hsl(174, 78%, 41%)" strokeWidth="0.4" strokeOpacity="0.15" />
          {/* Checkmark on document */}
          <motion.path
            d={`M ${20 + i * 8} ${46 + i * 20} l 3 3 l 5 -6`}
            fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 0.5, delay: i * 1.8 + 2, repeat: Infinity, repeatDelay: 4.5 }}
          />
        </motion.g>
      ))}

      {/* Flow arrows */}
      {[0, 1, 2, 3].map((i) => (
        <motion.path
          key={`arrow-${i}`}
          d={`M ${40 + i * 35} 130 l 8 0 l -3 -3 m 3 3 l -3 3`}
          fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.5"
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
        />
      ))}
    </svg>
  </div>
);

// System Integrations — Large hub with labeled nodes and active connections
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
        {/* Orbit rings */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.1" />
        <circle cx={cx} cy={cy} r={R * 0.6} fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.2" strokeOpacity="0.07" strokeDasharray="3 3" />

        {/* Cross connections between adjacent nodes */}
        {nodes.map((_, i) => {
          const next = (i + 1) % nodes.length;
          const r1 = (nodes[i].angle * Math.PI) / 180;
          const r2 = (nodes[next].angle * Math.PI) / 180;
          return (
            <line
              key={`cross-${i}`}
              x1={cx + Math.cos(r1) * R} y1={cy + Math.sin(r1) * R}
              x2={cx + Math.cos(r2) * R} y2={cy + Math.sin(r2) * R}
              stroke="hsl(174, 78%, 41%)" strokeWidth="0.2" strokeOpacity="0.08"
            />
          );
        })}

        {/* Lines from center to nodes + data pulses */}
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = cx + Math.cos(rad) * R;
          const ny = cy + Math.sin(rad) * R;
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="hsl(174, 78%, 41%)" strokeWidth="0.4" strokeOpacity="0.15" />
              {/* Bi-directional data pulse */}
              <motion.circle
                r="1.5" fill="hsl(174, 78%, 41%)"
                animate={{
                  cx: [cx, nx], cy: [cy, ny],
                  fillOpacity: [0, 0.6, 0],
                }}
                transition={{ duration: 2.5, delay: i * 0.7, repeat: Infinity, repeatDelay: 3 }}
              />
              <motion.circle
                r="1" fill="hsl(174, 78%, 41%)"
                animate={{
                  cx: [nx, cx], cy: [ny, cy],
                  fillOpacity: [0, 0.4, 0],
                }}
                transition={{ duration: 2.5, delay: i * 0.7 + 1.5, repeat: Infinity, repeatDelay: 3 }}
              />
              {/* Node circle */}
              <motion.circle
                cx={nx} cy={ny} r="10"
                fill="hsl(174, 78%, 41%)" fillOpacity="0.04"
                stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.3, type: "spring", stiffness: 150 }}
              />
              {/* Node label */}
              <text
                x={nx} y={ny + 1.5}
                textAnchor="middle" fontSize="5" fontWeight="600"
                fill="hsl(174, 78%, 41%)" fillOpacity="0.5"
                fontFamily="system-ui, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Center hub */}
        <circle cx={cx} cy={cy} r="14" fill="hsl(174, 78%, 41%)" fillOpacity="0.05" stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.3" />
        <circle cx={cx} cy={cy} r="5" fill="hsl(174, 78%, 41%)" fillOpacity="0.12" />
        <motion.circle
          cx={cx} cy={cy} r="14" fill="none"
          stroke="hsl(174, 78%, 41%)" strokeWidth="0.3"
          animate={{ r: [14, 22], opacity: [0.2, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <text x={cx} y={cy + 2} textAnchor="middle" fontSize="5" fontWeight="700" fill="hsl(174, 78%, 41%)" fillOpacity="0.5" fontFamily="system-ui">HUB</text>
      </svg>
    </div>
  );
};

// Data & Reporting — Rich animated dashboard
export const DataReportingVisual = () => {
  const bars = [30, 50, 38, 65, 48, 78, 55, 72, 42, 85, 60, 70];

  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center p-2">
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Window chrome */}
        <rect x="10" y="8" width="180" height="144" rx="4" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.4" strokeOpacity="0.2" />
        <rect x="10" y="8" width="180" height="14" rx="4" fill="hsl(174, 78%, 41%)" fillOpacity="0.03" />
        <line x1="10" y1="22" x2="190" y2="22" stroke="hsl(174, 78%, 41%)" strokeWidth="0.2" strokeOpacity="0.15" />
        <circle cx="19" cy="15" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
        <circle cx="26" cy="15" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.1" />
        <circle cx="33" cy="15" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.1" />

        {/* KPI row */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`kpi-${i}`}>
            <rect x={18 + i * 44} y="27" width="38" height="18" rx="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.03" stroke="hsl(174, 78%, 41%)" strokeWidth="0.2" strokeOpacity="0.12" />
            <motion.text
              x={37 + i * 44} y="38"
              textAnchor="middle" fontSize="6" fontWeight="700"
              fill="hsl(174, 78%, 41%)" fontFamily="monospace"
              animate={{ fillOpacity: [0.25, 0.6, 0.25] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            >
              {["€24.8K", "94.1%", "1,247", "+18%"][i]}
            </motion.text>
            <text x={37 + i * 44} y="43" textAnchor="middle" fontSize="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" fontFamily="system-ui">
              {["Revenue", "Uptime", "Users", "Growth"][i]}
            </text>
          </g>
        ))}

        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`g-${i}`} x1="18" y1={55 + i * 16} x2="185" y2={55 + i * 16} stroke="hsl(174, 78%, 41%)" strokeWidth="0.1" strokeOpacity="0.07" />
        ))}

        {/* Bar chart */}
        {bars.map((h, i) => {
          const barH = h * 0.85;
          return (
            <motion.rect
              key={i}
              x={20 + i * 13.8} width="9" rx="1"
              fill="hsl(174, 78%, 41%)"
              initial={{ y: 119, height: 0, fillOpacity: 0 }}
              animate={{ y: 119 - barH, height: barH, fillOpacity: 0.08 + (h / 85) * 0.18 }}
              transition={{ duration: 0.7, delay: i * 0.06 + 0.3, ease: "easeOut" }}
            />
          );
        })}

        {/* Axis */}
        <line x1="18" y1="119" x2="185" y2="119" stroke="hsl(174, 78%, 41%)" strokeWidth="0.2" strokeOpacity="0.15" />

        {/* Trend line */}
        <motion.path
          d="M 24 105 Q 45 85, 65 90 T 105 70 T 140 75 T 165 55 L 180 48"
          fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.8" strokeOpacity="0.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
        />
        {/* Trend endpoint */}
        <motion.circle
          cx="180" cy="48" r="2.5"
          fill="hsl(174, 78%, 41%)" fillOpacity="0.4"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 4.5, duration: 0.5 }}
        />
        <motion.circle
          cx="180" cy="48" r="2.5" fill="none"
          stroke="hsl(174, 78%, 41%)" strokeWidth="0.3"
          animate={{ r: [2.5, 7], opacity: [0.3, 0] }}
          transition={{ delay: 5, duration: 2.5, repeat: Infinity }}
        />

        {/* Scanning line */}
        <motion.rect
          width="1" rx="0.5" y="50" height="70"
          fill="hsl(174, 78%, 41%)" fillOpacity="0.06"
          animate={{ x: [18, 185] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />

        {/* Bottom status bar */}
        <rect x="10" y="125" width="180" height="27" fill="hsl(174, 78%, 41%)" fillOpacity="0.02" />
        <line x1="10" y1="125" x2="190" y2="125" stroke="hsl(174, 78%, 41%)" strokeWidth="0.15" strokeOpacity="0.1" />
        <motion.circle cx="20" cy="138" r="1.5" fill="hsl(174, 78%, 41%)" animate={{ fillOpacity: [0.15, 0.5, 0.15] }} transition={{ duration: 2, repeat: Infinity }} />
        <text x="27" y="139.5" fontSize="3" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" fontFamily="monospace">Live · Updated 2s ago</text>
      </svg>
    </div>
  );
};
