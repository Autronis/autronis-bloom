import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const useIsVisible = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

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
  const { ref, visible } = useIsVisible();
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
    <div ref={ref}>{visible ? (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center">
      <svg viewBox="0 0 200 150" className="w-full h-full" style={{ overflow: "hidden" }}>
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

        {/* Shooting stars along the belt */}
        {[0, 1, 2].map((i) => (
          <motion.g
            key={`star-${i}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{
              x: [-20, 210],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 1.5,
              delay: i * 2.5 + 1,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeIn",
            }}
          >
            <circle cx="0" cy={beltY - 15} r="1" fill="hsl(174, 78%, 41%)" fillOpacity="0.9" />
            <line x1="0" y1={beltY - 15} x2="-10" y2={beltY - 14} stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.4" strokeLinecap="round" />
            <line x1="-10" y1={beltY - 14} x2="-18" y2={beltY - 13.5} stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.15" strokeLinecap="round" />
          </motion.g>
        ))}

        {/* Documents on belt — each a different automation type */}
        {[
          { label: "INVOICE", icon: "€", color: "#4ADE80" },
          { label: "ORDER", icon: "#", color: "#60A5FA" },
          { label: "EMAIL", icon: "@", color: "#F59E0B" },
          { label: "REPORT", icon: "%", color: "#A78BFA" },
          { label: "CONTRACT", icon: "§", color: "#F472B6" },
        ].map((doc, i) => (
          <motion.g key={`doc-${i}`}
            initial={{ x: -30 }}
            animate={{ x: [-30, 200] }}
            transition={{ duration: 8, delay: i * 1.6, repeat: Infinity, ease: "linear" }}
          >
            {/* Document bg */}
            <rect x="5" y={beltY - 24} width="22" height="23" rx="1.5"
              fill="transparent"
            />
            <rect x="5" y={beltY - 24} width="22" height="23" rx="1.5"
              fill="hsl(174, 78%, 41%)" fillOpacity="0.07"
              stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" strokeOpacity="0.5"
            />
            {/* Folded corner */}
            <path d={`M 21 ${beltY - 24} l 6 0 l 0 6`} fill="hsl(174, 78%, 41%)" fillOpacity="0.04" stroke="hsl(174, 78%, 41%)" strokeWidth="0.4" strokeOpacity="0.3" />
            {/* Document body lines */}
            <line x1="9" y1={beltY - 20} x2="18" y2={beltY - 20} stroke={doc.color} strokeWidth="0.4" strokeOpacity="0.4" />
            <line x1="9" y1={beltY - 17.5} x2="23" y2={beltY - 17.5} stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.15" />
            <line x1="9" y1={beltY - 15.5} x2="20" y2={beltY - 15.5} stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.1" />
            <line x1="9" y1={beltY - 13.5} x2="22" y2={beltY - 13.5} stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.1" />
            {/* Icon centered */}
            <text x="16" y={beltY - 10} textAnchor="middle" fontSize="5.5" fontWeight="700" fill={doc.color} fillOpacity="0.25">
              {doc.icon}
            </text>
            {/* Type label at bottom */}
            <text x="16" y={beltY - 4} textAnchor="middle" fontSize="2.8" fontWeight="700" fill={doc.color} fillOpacity="0.6" fontFamily="monospace" letterSpacing="0.3">
              {doc.label}
            </text>
            {/* Checkmark — appears at right side of document at 50% of travel */}
            <motion.path
              d={`M 29 ${beltY - 14} l 2 2 l 4 -4.5`}
              fill="none" stroke="#4ADE80" strokeWidth="0.8" strokeOpacity="0.7"
              strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 0, 0, 0, 0, 1, 1, 1] }}
              transition={{ duration: 8, delay: i * 1.6, repeat: Infinity }}
            />
          </motion.g>
        ))}
      </svg>
    </div>
    ) : <div style={{ aspectRatio: "4/3" }} />}</div>
  );
};

// System Integrations — Large hub with active connections
export const SystemIntegrationVisual = () => {
  const { ref, visible } = useIsVisible();
  // Clean grid layout — systems as rounded rectangles with logos
  const systems = [
    { x: 30, y: 25, label: "Salesforce", logo: "/logos/salesforce.svg" },
    { x: 100, y: 25, label: "Shopify", logo: "/logos/shopify.svg" },
    { x: 170, y: 25, label: "HubSpot", logo: "/logos/hubspot.svg" },
    { x: 30, y: 75, label: "Slack", logo: "/logos/slack.svg" },
    { x: 100, y: 75, label: "AUTRONIS", isCenter: true },
    { x: 170, y: 75, label: "Stripe", logo: "/logos/stripe.svg" },
    { x: 30, y: 125, label: "Google", logo: "/logos/google-workspace.svg" },
    { x: 100, y: 125, label: "PostgreSQL", logo: "/logos/postgresql.svg" },
    { x: 170, y: 125, label: "OpenAI", logo: "/logos/openai.svg", dark: true },
  ];

  // Only connections to center hub
  const connections = [
    [0, 4], [1, 4], [2, 4], [3, 4], [5, 4], [6, 4], [7, 4], [8, 4],
  ];

  const nodeW = 38, nodeH = 20;

  return (
    <div ref={ref}>{visible ? (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center">
      <svg viewBox="0 0 200 150" className="w-full h-full">
        {/* Connection lines — only to hub */}
        {connections.map(([from, to], i) => (
          <g key={`conn-${i}`}>
            <line
              x1={systems[from].x} y1={systems[from].y}
              x2={systems[to].x} y2={systems[to].y}
              stroke="hsl(174, 78%, 41%)"
              strokeWidth="0.3"
              strokeOpacity="0.12"
            />
            {/* Data pulse: node → hub */}
            <motion.circle
              r="1.5"
              fill="hsl(174, 78%, 41%)"
              animate={{
                cx: [systems[from].x, systems[to].x],
                cy: [systems[from].y, systems[to].y],
                fillOpacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.6,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            />
            {/* Return pulse: hub → node (delayed) */}
            <motion.circle
              r="1"
              fill="#4ADE80"
              animate={{
                cx: [systems[to].x, systems[from].x],
                cy: [systems[to].y, systems[from].y],
                fillOpacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.6 + 2,
                repeat: Infinity,
                repeatDelay: 5.3,
              }}
            />
            {/* Line glow on data transfer */}
            <motion.line
              x1={systems[from].x} y1={systems[from].y}
              x2={systems[to].x} y2={systems[to].y}
              stroke="hsl(174, 78%, 41%)"
              strokeWidth="0.8"
              animate={{ strokeOpacity: [0, 0.25, 0] }}
              transition={{
                duration: 1.5,
                delay: i * 0.6,
                repeat: Infinity,
                repeatDelay: 5,
              }}
            />
          </g>
        ))}

        {/* System nodes */}
        {systems.map((sys, i) => (
          <g key={i}>
            {/* Pulse glow on data arrival */}
            {!sys.isCenter && (
              <motion.rect
                x={sys.x - nodeW / 2 - 2} y={sys.y - nodeH / 2 - 2}
                width={nodeW + 4} height={nodeH + 4} rx="5"
                fill="none"
                stroke="hsl(174, 78%, 41%)"
                strokeWidth="0.6"
                animate={{ strokeOpacity: [0, 0.4, 0] }}
                transition={{ duration: 1.5, delay: i * 0.6 + 0.8, repeat: Infinity, repeatDelay: 5.5 }}
              />
            )}
            {/* Solid background so lines don't show through */}
            <rect
              x={sys.x - nodeW / 2} y={sys.y - nodeH / 2}
              width={nodeW} height={nodeH} rx="3"
              fill="transparent"
            />
            <motion.rect
              x={sys.x - nodeW / 2} y={sys.y - nodeH / 2}
              width={nodeW} height={nodeH} rx="3"
              fill="hsl(174, 78%, 41%)"
              fillOpacity={sys.isCenter ? "0.12" : "0.03"}
              stroke="hsl(174, 78%, 41%)"
              strokeWidth={sys.isCenter ? "0.8" : "0.5"}
              strokeOpacity={sys.isCenter ? "0.6" : "0.3"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.06 + 0.2, type: "spring", stiffness: 200 }}
            />
            {/* Glow behind center card — breathing + data arrival pulse */}
            {sys.isCenter && (
              <>
              <motion.rect
                x={sys.x - nodeW / 2 - 2} y={sys.y - nodeH / 2 - 2}
                width={nodeW + 4} height={nodeH + 4} rx="5"
                fill="none"
                stroke="hsl(174, 78%, 41%)"
                strokeWidth="0.4"
                animate={{ opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Expanding ring on data arrival */}
              <motion.rect
                x={sys.x - nodeW / 2 - 5} y={sys.y - nodeH / 2 - 5}
                width={nodeW + 10} height={nodeH + 10} rx="7"
                fill="none"
                stroke="hsl(174, 78%, 41%)"
                strokeWidth="0.3"
                animate={{ opacity: [0, 0.3, 0], scale: [0.9, 1.05, 1.1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                style={{ transformOrigin: `${sys.x}px ${sys.y}px` }}
              />
              </>
            )}
            {/* Logo or center logo */}
            {"logo" in sys && sys.logo ? (
              <image
                href={sys.logo}
                x={sys.x - 6} y={sys.y - 6}
                width="12" height="12"
                opacity="0.85"
                className={("dark" in sys && sys.dark) ? "dark:invert" : undefined}
              />
            ) : (
              <image
                href="/logo.png"
                x={sys.x - 7} y={sys.y - 7}
                width="14" height="14"
                opacity="0.8"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
    ) : <div style={{ aspectRatio: "4/3" }} />}</div>
  );
};

// Data & Reporting — Rich dashboard
export const DataReportingVisual = () => {
  const { ref, visible } = useIsVisible();
  const bars = [30, 50, 38, 65, 48, 78, 55, 72, 42, 85, 60, 70];

  return (
    <div ref={ref}>{visible ? (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center">
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Window */}
        <rect x="10" y="8" width="180" height="144" rx="4" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" strokeOpacity="0.25" />
        <rect x="10" y="8" width="180" height="14" rx="4" fill="hsl(174, 78%, 41%)" fillOpacity="0.04" />
        <line x1="10" y1="22" x2="190" y2="22" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.2" />
        <circle cx="19" cy="15" r="2" fill="#FF5F57" fillOpacity="0.7" />
        <circle cx="26" cy="15" r="2" fill="#FEBC2E" fillOpacity="0.7" />
        <circle cx="33" cy="15" r="2" fill="#28C840" fillOpacity="0.7" />

        {/* KPI row */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`kpi-${i}`}>
            <rect x={18 + i * 44} y="27" width="38" height="18" rx="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.04" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.15" />
            <motion.text x={37 + i * 44} y="38" textAnchor="middle" fontSize="6" fontWeight="700"
              fill={["hsl(174, 78%, 41%)", "#60A5FA", "hsl(174, 78%, 41%)", "#4ADE80"][i]} fontFamily="monospace"
              animate={{ fillOpacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            >
              {["€24.8K", "94.1%", "1,247", "+18%"][i]}
            </motion.text>
            <text x={37 + i * 44} y="43" textAnchor="middle" fontSize="2.5" fill={["hsl(174, 78%, 41%)", "#60A5FA", "hsl(174, 78%, 41%)", "#4ADE80"][i]} fillOpacity="0.35" fontFamily="system-ui">
              {["Revenue", "Uptime", "Users", "Growth"][i]}
            </text>
          </g>
        ))}

        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`g-${i}`} x1="18" y1={55 + i * 16} x2="185" y2={55 + i * 16} stroke="hsl(174, 78%, 41%)" strokeWidth="0.1" strokeOpacity="0.08" />
        ))}

        {/* Bars — animate up then pulse */}
        {bars.map((h, i) => {
          const barH = h * 0.85;
          const baseOpacity = 0.1 + (h / 85) * 0.2;
          return (
            <motion.rect key={i} x={20 + i * 13.8} width="9" rx="1"
              fill="hsl(174, 78%, 41%)"
              initial={{ y: 119, height: 0, fillOpacity: 0 }}
              animate={{
                y: 119 - barH,
                height: barH,
                fillOpacity: [0, baseOpacity, baseOpacity + 0.05, baseOpacity],
              }}
              transition={{
                y: { duration: 0.7, delay: i * 0.06 + 0.3, ease: "easeOut" },
                height: { duration: 0.7, delay: i * 0.06 + 0.3, ease: "easeOut" },
                fillOpacity: { duration: 4, delay: i * 0.06 + 0.3, repeat: Infinity, repeatDelay: 2 },
              }}
            />
          );
        })}

        <line x1="18" y1="119" x2="185" y2="119" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.2" />

        {/* Area fill under trend */}
        <motion.path d="M 24 105 Q 45 85, 65 90 T 105 70 T 140 75 T 165 55 L 180 48 L 180 119 L 24 119 Z"
          fill="url(#areaGrad)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
        />
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(174, 78%, 41%)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(174, 78%, 41%)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Trend line */}
        <motion.path d="M 24 105 Q 45 85, 65 90 T 105 70 T 140 75 T 165 55 L 180 48"
          fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="1.2" strokeOpacity="0.7"
          strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 1.5 }}
        />

        {/* End point with pulse */}
        <motion.circle cx="180" cy="48" r="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.6"
          initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 4.5, duration: 0.5 }}
        />
        <motion.circle cx="180" cy="48" r="2.5" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.5"
          animate={{ r: [2.5, 8], opacity: [0.5, 0] }}
          transition={{ delay: 5, duration: 2, repeat: Infinity }}
        />
        <motion.circle cx="180" cy="48" r="2.5" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3"
          animate={{ r: [2.5, 12], opacity: [0.3, 0] }}
          transition={{ delay: 5.3, duration: 2.5, repeat: Infinity }}
        />

        {/* Data point highlights on trend */}
        {[
          { cx: 65, cy: 90 },
          { cx: 105, cy: 70 },
          { cx: 140, cy: 75 },
          { cx: 165, cy: 55 },
        ].map((pt, i) => (
          <motion.circle key={`pt-${i}`} cx={pt.cx} cy={pt.cy} r="1.5"
            fill="hsl(174, 78%, 41%)" fillOpacity="0.6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 + i * 0.4, duration: 0.3 }}
          />
        ))}

        {/* Scanner */}
        <motion.rect width="1.5" rx="0.75" y="50" height="70"
          fill="hsl(174, 78%, 41%)" fillOpacity="0.08"
          animate={{ x: [18, 185] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
        />

        {/* Animated cursor hovering over bars */}
        <motion.g
          animate={{ x: [60, 100, 140, 160, 120, 80, 60] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Cursor */}
          <motion.path d="M 0 70 l 0 8 l 3 -2 l 2 4 l 1.5 -0.8 l -2 -4 l 3.5 -0.5 Z"
            fill="white" fillOpacity="0.4" stroke="white" strokeWidth="0.3" strokeOpacity="0.5"
          />
          {/* Tooltip that follows cursor */}
          <motion.g
            animate={{ opacity: [0, 0, 1, 1, 1, 0, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          >
            <rect x="-12" y="58" width="30" height="10" rx="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.3" />
            <text x="3" y="65" textAnchor="middle" fontSize="3.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.7" fontFamily="monospace">€4,827</text>
          </motion.g>
        </motion.g>

        {/* Mini notification popup */}
        <motion.g
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -3] }}
          transition={{ duration: 4, delay: 6, repeat: Infinity, repeatDelay: 8 }}
        >
          <rect x="130" y="55" width="52" height="12" rx="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.12" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.3" />
          <circle cx="136" cy="61" r="2" fill="#4ADE80" fillOpacity="0.5" />
          <text x="142" y="63" fontSize="3" fill="hsl(174, 78%, 41%)" fillOpacity="0.6" fontFamily="monospace">+12% vs last week</text>
        </motion.g>

        {/* Second notification — different timing */}
        <motion.g
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, -3] }}
          transition={{ duration: 3.5, delay: 14, repeat: Infinity, repeatDelay: 10 }}
        >
          <rect x="20" y="55" width="48" height="12" rx="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.12" stroke="hsl(174, 78%, 41%)" strokeWidth="0.3" strokeOpacity="0.3" />
          <circle cx="26" cy="61" r="2" fill="#60A5FA" fillOpacity="0.5" />
          <text x="32" y="63" fontSize="3" fill="hsl(174, 78%, 41%)" fillOpacity="0.6" fontFamily="monospace">New record high</text>
        </motion.g>

        {/* Status bar */}
        <line x1="10" y1="125" x2="190" y2="125" stroke="hsl(174, 78%, 41%)" strokeWidth="0.2" strokeOpacity="0.12" />
        <motion.circle cx="20" cy="138" r="1.5" fill="#4ADE80" animate={{ fillOpacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
        <text x="27" y="139.5" fontSize="3.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" fontFamily="monospace">Live · Updated 2s ago</text>
      </svg>
    </div>
    ) : <div style={{ aspectRatio: "4/3" }} />}</div>
  );
};
