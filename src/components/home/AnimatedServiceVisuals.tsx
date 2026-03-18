import { motion } from "framer-motion";

// Process Automation — Clean flow pipeline with data moving through stages
export const ProcessAutomationVisual = () => {
  const stages = [
    { x: 15, label: "IN" },
    { x: 38, label: "01" },
    { x: 62, label: "02" },
    { x: 85, label: "OUT" },
  ];

  return (
    <div className="relative w-full h-full min-h-[280px] flex items-center justify-center">
      <svg viewBox="0 0 100 60" className="w-full h-full max-h-[280px]">
        {/* Horizontal pipeline line */}
        <line x1="10" y1="30" x2="90" y2="30" stroke="hsl(174, 78%, 41%)" strokeWidth="0.15" strokeOpacity="0.3" />

        {/* Stage nodes */}
        {stages.map((stage, i) => (
          <g key={i}>
            {/* Node circle */}
            <motion.circle
              cx={stage.x} cy="30" r="4"
              fill="none"
              stroke="hsl(174, 78%, 41%)"
              strokeWidth="0.3"
              strokeOpacity="0.4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
            />
            {/* Inner dot */}
            <motion.circle
              cx={stage.x} cy="30" r="1.2"
              fill="hsl(174, 78%, 41%)"
              fillOpacity="0.3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 + 0.1 }}
            />
            {/* Label */}
            <text x={stage.x} y="40" textAnchor="middle" fontSize="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.4" fontFamily="monospace">
              {stage.label}
            </text>
          </g>
        ))}

        {/* Traveling data packets — 3 staggered */}
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            width="3" height="1.5" rx="0.5"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.5"
            y="29.25"
            animate={{ x: [8, 88], opacity: [0, 0.6, 0.6, 0] }}
            transition={{
              duration: 4,
              delay: i * 1.3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Subtle vertical process lines at each stage */}
        {stages.slice(1, -1).map((stage, i) => (
          <motion.line
            key={`vline-${i}`}
            x1={stage.x} y1="24" x2={stage.x} y2="36"
            stroke="hsl(174, 78%, 41%)"
            strokeWidth="0.15"
            strokeOpacity="0.2"
            strokeDasharray="0.5 0.5"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
          />
        ))}
      </svg>
    </div>
  );
};

// System Integrations — Elegant hub with orbiting connections
export const SystemIntegrationVisual = () => {
  const orbitNodes = [
    { angle: 0, r: 18 },
    { angle: 72, r: 18 },
    { angle: 144, r: 18 },
    { angle: 216, r: 18 },
    { angle: 288, r: 18 },
  ];

  return (
    <div className="relative w-full h-full min-h-[280px] flex items-center justify-center">
      <svg viewBox="0 0 80 80" className="w-full h-full max-h-[280px]">
        {/* Orbit ring */}
        <circle cx="40" cy="40" r="18" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.15" strokeOpacity="0.2" />
        <circle cx="40" cy="40" r="12" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.1" strokeOpacity="0.1" strokeDasharray="1 1" />

        {/* Connection lines from center to nodes */}
        {orbitNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = 40 + Math.cos(rad) * node.r;
          const ny = 40 + Math.sin(rad) * node.r;
          return (
            <motion.line
              key={`line-${i}`}
              x1="40" y1="40" x2={nx} y2={ny}
              stroke="hsl(174, 78%, 41%)"
              strokeWidth="0.2"
              strokeOpacity="0.25"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            />
          );
        })}

        {/* Data pulses along connections */}
        {orbitNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = 40 + Math.cos(rad) * node.r;
          const ny = 40 + Math.sin(rad) * node.r;
          return (
            <motion.circle
              key={`pulse-${i}`}
              r="0.6"
              fill="hsl(174, 78%, 41%)"
              fillOpacity="0.7"
              animate={{
                cx: [40, nx, 40],
                cy: [40, ny, 40],
              }}
              transition={{
                duration: 3,
                delay: i * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Outer nodes */}
        {orbitNodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const nx = 40 + Math.cos(rad) * node.r;
          const ny = 40 + Math.sin(rad) * node.r;
          return (
            <g key={`node-${i}`}>
              <motion.circle
                cx={nx} cy={ny} r="2.5"
                fill="hsl(174, 78%, 41%)"
                fillOpacity="0.08"
                stroke="hsl(174, 78%, 41%)"
                strokeWidth="0.25"
                strokeOpacity="0.35"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.5, type: "spring" }}
              />
            </g>
          );
        })}

        {/* Center hub */}
        <motion.circle
          cx="40" cy="40" r="4"
          fill="hsl(174, 78%, 41%)"
          fillOpacity="0.1"
          stroke="hsl(174, 78%, 41%)"
          strokeWidth="0.3"
          strokeOpacity="0.5"
        />
        <motion.circle
          cx="40" cy="40" r="1.5"
          fill="hsl(174, 78%, 41%)"
          fillOpacity="0.4"
        />
        {/* Center pulse */}
        <motion.circle
          cx="40" cy="40" r="4"
          fill="none"
          stroke="hsl(174, 78%, 41%)"
          strokeWidth="0.2"
          animate={{ r: [4, 8], opacity: [0.3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

// Data & Reporting — Clean minimal dashboard with live data
export const DataReportingVisual = () => {
  const bars = [40, 65, 45, 80, 55, 70, 90, 60];

  return (
    <div className="relative w-full h-full min-h-[280px] flex items-center justify-center">
      <svg viewBox="0 0 100 70" className="w-full h-full max-h-[280px]">
        {/* Dashboard frame */}
        <rect x="8" y="8" width="84" height="54" rx="2" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.2" strokeOpacity="0.2" />

        {/* Top bar */}
        <line x1="8" y1="15" x2="92" y2="15" stroke="hsl(174, 78%, 41%)" strokeWidth="0.15" strokeOpacity="0.15" />
        <circle cx="13" cy="11.5" r="1" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
        <circle cx="17" cy="11.5" r="1" fill="hsl(174, 78%, 41%)" fillOpacity="0.1" />
        <circle cx="21" cy="11.5" r="1" fill="hsl(174, 78%, 41%)" fillOpacity="0.1" />

        {/* Bar chart */}
        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={14 + i * 9.5}
            width="6"
            rx="0.5"
            fill="hsl(174, 78%, 41%)"
            fillOpacity={0.15 + (h / 90) * 0.2}
            initial={{ y: 55, height: 0 }}
            animate={{ y: 55 - (h * 0.35), height: h * 0.35 }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
          />
        ))}

        {/* Baseline */}
        <line x1="12" y1="55" x2="90" y2="55" stroke="hsl(174, 78%, 41%)" strokeWidth="0.1" strokeOpacity="0.15" />

        {/* Trend line overlay */}
        <motion.path
          d="M 17 42 Q 26 30, 36 35 T 55 28 T 74 22 T 87 18"
          fill="none"
          stroke="hsl(174, 78%, 41%)"
          strokeWidth="0.4"
          strokeOpacity="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />

        {/* Trend dot at end */}
        <motion.circle
          cx="87" cy="18" r="1"
          fill="hsl(174, 78%, 41%)"
          fillOpacity="0.6"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 3, duration: 0.4 }}
        />

        {/* Scanning line */}
        <motion.line
          x1="12" x2="12" y1="16" y2="55"
          stroke="hsl(174, 78%, 41%)"
          strokeWidth="0.3"
          strokeOpacity="0.1"
          animate={{ x1: [12, 90], x2: [12, 90] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        />
      </svg>
    </div>
  );
};
