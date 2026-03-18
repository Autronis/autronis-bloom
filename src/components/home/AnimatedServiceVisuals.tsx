import { motion } from "framer-motion";

// Animated gears for Process Automation
export const ProcessAutomationVisual = () => (
  <div className="relative w-full h-full min-h-[280px] flex items-center justify-center overflow-hidden">
    {/* Large gear */}
    <motion.svg
      width="120" height="120" viewBox="0 0 120 120"
      className="absolute"
      style={{ right: "20%", top: "15%" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M60 10 L65 25 L75 15 L72 32 L88 28 L78 42 L95 45 L82 55 L95 65 L78 62 L85 78 L70 70 L68 88 L60 75 L52 88 L50 70 L35 78 L42 62 L25 65 L38 55 L25 45 L42 42 L32 28 L48 32 L45 15 L55 25 Z"
        fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1.5" opacity="0.4"
      />
      <circle cx="60" cy="60" r="18" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1.5" opacity="0.3" />
    </motion.svg>

    {/* Medium gear */}
    <motion.svg
      width="80" height="80" viewBox="0 0 80 80"
      className="absolute"
      style={{ left: "15%", top: "35%" }}
      animate={{ rotate: -360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M40 8 L44 18 L52 12 L50 24 L62 21 L55 32 L67 34 L57 40 L67 46 L55 48 L62 59 L50 56 L52 68 L44 62 L40 72 L36 62 L28 68 L30 56 L18 59 L25 48 L13 46 L23 40 L13 34 L25 32 L18 21 L30 24 L28 12 L36 18 Z"
        fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1.5" opacity="0.35"
      />
      <circle cx="40" cy="40" r="12" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1.5" opacity="0.25" />
    </motion.svg>

    {/* Small gear */}
    <motion.svg
      width="50" height="50" viewBox="0 0 50 50"
      className="absolute"
      style={{ right: "25%", bottom: "20%" }}
      animate={{ rotate: 360 }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M25 5 L28 13 L34 8 L33 17 L42 15 L37 23 L46 25 L37 27 L42 35 L33 33 L34 42 L28 37 L25 45 L22 37 L16 42 L17 33 L8 35 L13 27 L4 25 L13 23 L8 15 L17 17 L16 8 L22 13 Z"
        fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1.5" opacity="0.3"
      />
      <circle cx="25" cy="25" r="8" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1" opacity="0.2" />
    </motion.svg>

    {/* Floating documents */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute w-8 h-10 rounded border border-primary/20 bg-primary/5"
        style={{ left: `${20 + i * 25}%`, top: `${60 + i * 5}%` }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
      >
        <div className="p-1.5 space-y-1">
          <div className="h-px w-4 bg-primary/30 rounded" />
          <div className="h-px w-3 bg-primary/20 rounded" />
          <div className="h-px w-5 bg-primary/20 rounded" />
        </div>
      </motion.div>
    ))}

    {/* Conveyor arrows */}
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={`arrow-${i}`}
        className="absolute text-primary/20"
        style={{ left: `${15 + i * 20}%`, bottom: "12%" }}
        animate={{ x: [0, 20, 0], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
      >
        <svg width="16" height="12" viewBox="0 0 16 12"><path d="M0 6h12M8 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
      </motion.div>
    ))}
  </div>
);

// Animated network nodes for System Integrations
export const SystemIntegrationVisual = () => {
  const nodes = [
    { x: 50, y: 50, label: "CRM", delay: 0 },
    { x: 20, y: 25, label: "ERP", delay: 0.3 },
    { x: 80, y: 25, label: "API", delay: 0.6 },
    { x: 15, y: 75, label: "DB", delay: 0.9 },
    { x: 85, y: 75, label: "BI", delay: 1.2 },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [3, 4],
  ];

  return (
    <div className="relative w-full h-full min-h-[280px]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Connection lines with animated dashes */}
        {connections.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={nodes[from].x} y1={nodes[from].y}
            x2={nodes[to].x} y2={nodes[to].y}
            stroke="hsl(174, 78%, 41%)"
            strokeWidth="0.4"
            strokeDasharray="2 2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}

        {/* Data particles traveling along connections */}
        {connections.map(([from, to], i) => (
          <motion.circle
            key={`particle-${i}`}
            r="0.8"
            fill="hsl(174, 78%, 41%)"
            opacity="0.6"
            animate={{
              cx: [nodes[from].x, nodes[to].x],
              cy: [nodes[from].y, nodes[to].y],
            }}
            transition={{
              duration: 2,
              delay: i * 0.5 + 1.5,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            <motion.circle
              cx={node.x} cy={node.y} r={i === 0 ? "8" : "6"}
              fill="hsl(174, 78%, 41%)"
              fillOpacity={i === 0 ? 0.15 : 0.08}
              stroke="hsl(174, 78%, 41%)"
              strokeWidth={i === 0 ? "0.8" : "0.5"}
              strokeOpacity={0.5}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: node.delay, stiffness: 200 }}
            />
            {/* Pulse ring on center node */}
            {i === 0 && (
              <motion.circle
                cx={node.x} cy={node.y} r="8"
                fill="none"
                stroke="hsl(174, 78%, 41%)"
                strokeWidth="0.3"
                animate={{ r: [8, 14], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            <text
              x={node.x} y={node.y + 1}
              textAnchor="middle"
              fontSize="3"
              fontWeight="600"
              fill="hsl(174, 78%, 41%)"
              fillOpacity="0.7"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Animated dashboard for Data & Reporting
export const DataReportingVisual = () => (
  <div className="relative w-full h-full min-h-[280px] flex items-center justify-center overflow-hidden">
    {/* Dashboard frame */}
    <div className="relative w-[85%] max-w-[280px]">
      <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-3 space-y-3">
        {/* Top bar */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
          <div className="h-1.5 w-16 bg-primary/10 rounded-full ml-2" />
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2">
          {[72, 48, 91].map((val, i) => (
            <div key={i} className="rounded bg-primary/[0.05] border border-primary/10 p-1.5">
              <motion.div
                className="text-[10px] font-bold text-primary tabular-nums"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
              >
                {val}%
              </motion.div>
              <div className="h-0.5 w-8 bg-primary/10 rounded-full mt-1" />
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-1.5 h-16 px-1">
          {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-primary/20 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.5, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Line chart */}
        <svg viewBox="0 0 200 40" className="w-full h-8">
          <motion.path
            d="M 0 30 Q 25 10, 50 20 T 100 15 T 150 25 T 200 8"
            fill="none"
            stroke="hsl(174, 78%, 41%)"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <motion.path
            d="M 0 30 Q 25 10, 50 20 T 100 15 T 150 25 T 200 8 V 40 H 0 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.05"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          />
        </svg>

        {/* Data rows */}
        <div className="space-y-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
            >
              <div className="w-1 h-1 rounded-full bg-primary/40" />
              <div className={`h-1 bg-primary/15 rounded-full`} style={{ width: `${50 + i * 15}%` }} />
              <div className="h-1 w-6 bg-primary/10 rounded-full ml-auto" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Floating data particles */}
    {[0, 1, 2, 3, 4].map((i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 rounded-full bg-primary/40"
        style={{ left: `${10 + i * 20}%`, bottom: "5%" }}
        animate={{
          y: [0, -120 - i * 20],
          opacity: [0, 0.6, 0],
          x: [0, (i % 2 === 0 ? 15 : -15)],
        }}
        transition={{ duration: 3, delay: i * 0.6, repeat: Infinity }}
      />
    ))}
  </div>
);
