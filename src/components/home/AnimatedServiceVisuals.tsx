import { motion } from "framer-motion";

// Process Automation — Flowing pipeline with processing stages
export const ProcessAutomationVisual = () => {
  const steps = [
    { x: 50, y: 15, w: 56, label: "TRIGGER" },
    { x: 50, y: 38, w: 56, label: "VALIDATE" },
    { x: 50, y: 61, w: 56, label: "EXECUTE" },
    { x: 50, y: 84, w: 56, label: "COMPLETE" },
  ];

  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center p-4">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Vertical flow connections */}
        {[0, 1, 2].map((i) => (
          <g key={`conn-${i}`}>
            <line
              x1="50" y1={steps[i].y + 5}
              x2="50" y2={steps[i + 1].y - 5}
              stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.2"
            />
            <motion.circle
              r="1" fill="hsl(174, 78%, 41%)" fillOpacity="0.7"
              animate={{
                cy: [steps[i].y + 5, steps[i + 1].y - 5],
                cx: [50, 50],
              }}
              transition={{ duration: 1.2, delay: i * 1.2 + 0.5, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
            />
          </g>
        ))}

        {/* Stage boxes */}
        {steps.map((step, i) => (
          <g key={i}>
            <motion.rect
              x={step.x - step.w / 2} y={step.y - 4.5}
              width={step.w} height="9" rx="1.5"
              fill="hsl(174, 78%, 41%)"
              fillOpacity="0.04"
              stroke="hsl(174, 78%, 41%)"
              strokeWidth="0.3"
              strokeOpacity="0.3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            />
            {/* Status indicator */}
            <motion.circle
              cx={step.x - step.w / 2 + 5} cy={step.y}
              r="1.2"
              fill="hsl(174, 78%, 41%)"
              animate={{ fillOpacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 2, delay: i * 1.2, repeat: Infinity }}
            />
            {/* Label */}
            <text
              x={step.x + 2} y={step.y + 1}
              textAnchor="middle"
              fontSize="3.2" fontWeight="600" letterSpacing="0.15"
              fill="hsl(174, 78%, 41%)" fillOpacity="0.6"
              fontFamily="system-ui, sans-serif"
            >
              {step.label}
            </text>
            {/* Step number */}
            <text
              x={step.x + step.w / 2 - 4} y={step.y + 1}
              textAnchor="middle"
              fontSize="2.5" fontFamily="monospace"
              fill="hsl(174, 78%, 41%)" fillOpacity="0.3"
            >
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        ))}

        {/* Side decorative lines */}
        <line x1="18" y1="12" x2="18" y2="88" stroke="hsl(174, 78%, 41%)" strokeWidth="0.1" strokeOpacity="0.1" />
        <line x1="82" y1="12" x2="82" y2="88" stroke="hsl(174, 78%, 41%)" strokeWidth="0.1" strokeOpacity="0.1" />
      </svg>
    </div>
  );
};

// System Integrations — Large hub with clean radiating connections
export const SystemIntegrationVisual = () => {
  const nodes = [
    { angle: -90, label: "API" },
    { angle: -30, label: "CRM" },
    { angle: 30, label: "ERP" },
    { angle: 90, label: "DB" },
    { angle: 150, label: "BI" },
    { angle: 210, label: "WEB" },
  ];
  const R = 32;

  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center p-4">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Outer orbit */}
        <circle cx="50" cy="50" r={R} fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.15" strokeOpacity="0.15" strokeDasharray="1.5 1.5" />

        {/* Connections + nodes */}
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = 50 + Math.cos(rad) * R;
          const ny = 50 + Math.sin(rad) * R;
          return (
            <g key={i}>
              {/* Connection line */}
              <motion.line
                x1="50" y1="50" x2={nx} y2={ny}
                stroke="hsl(174, 78%, 41%)" strokeWidth="0.25" strokeOpacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
              />
              {/* Data pulse */}
              <motion.circle
                r="0.8" fill="hsl(174, 78%, 41%)" fillOpacity="0.8"
                animate={{
                  cx: [50, nx], cy: [50, ny],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, delay: i * 0.5 + 1, repeat: Infinity, repeatDelay: 2.5 }}
              />
              {/* Node */}
              <motion.circle
                cx={nx} cy={ny} r="5"
                fill="hsl(174, 78%, 41%)" fillOpacity="0.05"
                stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.35"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.12 + 0.3, type: "spring", stiffness: 200 }}
              />
              {/* Node label */}
              <motion.text
                x={nx} y={ny + 1}
                textAnchor="middle" fontSize="2.8" fontWeight="600"
                fill="hsl(174, 78%, 41%)" fillOpacity="0.5"
                fontFamily="system-ui, sans-serif"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.12 + 0.5 }}
              >
                {node.label}
              </motion.text>
            </g>
          );
        })}

        {/* Center hub */}
        <motion.circle
          cx="50" cy="50" r="8"
          fill="hsl(174, 78%, 41%)" fillOpacity="0.06"
          stroke="hsl(174, 78%, 41%)" strokeWidth="0.4" strokeOpacity="0.4"
        />
        <motion.circle cx="50" cy="50" r="3" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
        <motion.circle
          cx="50" cy="50" r="8" fill="none"
          stroke="hsl(174, 78%, 41%)" strokeWidth="0.2"
          animate={{ r: [8, 14], opacity: [0.25, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        {/* Center label */}
        <text x="50" y="51" textAnchor="middle" fontSize="2.5" fontWeight="700" fill="hsl(174, 78%, 41%)" fillOpacity="0.6" fontFamily="system-ui, sans-serif">
          HUB
        </text>
      </svg>
    </div>
  );
};

// Data & Reporting — Premium dashboard with animated charts
export const DataReportingVisual = () => {
  const barData = [35, 55, 40, 70, 50, 85, 60, 75, 45, 90];

  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center p-4">
      <svg viewBox="0 0 100 80" className="w-full h-full">
        {/* Window frame */}
        <rect x="5" y="5" width="90" height="70" rx="2.5" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.25" strokeOpacity="0.25" />

        {/* Title bar */}
        <rect x="5" y="5" width="90" height="8" rx="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.03" />
        <line x1="5" y1="13" x2="95" y2="13" stroke="hsl(174, 78%, 41%)" strokeWidth="0.15" strokeOpacity="0.15" />
        <circle cx="10" cy="9" r="1" fill="hsl(174, 78%, 41%)" fillOpacity="0.2" />
        <circle cx="14" cy="9" r="1" fill="hsl(174, 78%, 41%)" fillOpacity="0.12" />
        <circle cx="18" cy="9" r="1" fill="hsl(174, 78%, 41%)" fillOpacity="0.12" />

        {/* KPI cards row */}
        {[0, 1, 2].map((i) => (
          <g key={`kpi-${i}`}>
            <rect x={10 + i * 28} y="16" width="24" height="10" rx="1" fill="hsl(174, 78%, 41%)" fillOpacity="0.03" stroke="hsl(174, 78%, 41%)" strokeWidth="0.15" strokeOpacity="0.15" />
            <motion.text
              x={22 + i * 28} y="22.5"
              textAnchor="middle" fontSize="3.5" fontWeight="700"
              fill="hsl(174, 78%, 41%)" fontFamily="monospace"
              animate={{ fillOpacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity }}
            >
              {["€12.4K", "89.2%", "2,847"][i]}
            </motion.text>
          </g>
        ))}

        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <line key={`grid-${i}`} x1="10" y1={32 + i * 8} x2="90" y2={32 + i * 8} stroke="hsl(174, 78%, 41%)" strokeWidth="0.08" strokeOpacity="0.1" />
        ))}

        {/* Axis */}
        <line x1="10" y1="64" x2="90" y2="64" stroke="hsl(174, 78%, 41%)" strokeWidth="0.15" strokeOpacity="0.2" />

        {/* Bar chart */}
        {barData.map((h, i) => {
          const barH = h * 0.3;
          return (
            <motion.rect
              key={i}
              x={12 + i * 8} width="5" rx="0.5"
              fill="hsl(174, 78%, 41%)"
              initial={{ y: 64, height: 0, fillOpacity: 0 }}
              animate={{ y: 64 - barH, height: barH, fillOpacity: 0.12 + (h / 90) * 0.18 }}
              transition={{ duration: 0.6, delay: i * 0.06 + 0.3, ease: "easeOut" }}
            />
          );
        })}

        {/* Trend line */}
        <motion.path
          d="M 14 55 Q 22 45, 30 48 T 50 38 T 66 42 T 80 32 L 88 28"
          fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 1.2 }}
        />

        {/* End point glow */}
        <motion.circle
          cx="88" cy="28" r="1.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 3.7, duration: 0.5 }}
        />
        <motion.circle
          cx="88" cy="28" r="1.5" fill="none"
          stroke="hsl(174, 78%, 41%)" strokeWidth="0.2"
          animate={{ r: [1.5, 4], opacity: [0.4, 0] }}
          transition={{ delay: 4, duration: 2, repeat: Infinity }}
        />

        {/* Scanning highlight line */}
        <motion.rect
          x="10" width="0.5" rx="0.25"
          y="30" height="34"
          fill="hsl(174, 78%, 41%)" fillOpacity="0.08"
          animate={{ x: [10, 90] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
        />
      </svg>
    </div>
  );
};
