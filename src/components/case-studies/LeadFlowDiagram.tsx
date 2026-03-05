import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Search, Database, Bot, Mail, RefreshCw, Phone } from "lucide-react";

/* ─── Step data ─── */
const steps = [
  { icon: Globe, title: "Leadbronnen", desc: "Bedrijvengidsen, databases en websites" },
  { icon: Search, title: "Leadverzameling", desc: "Automatisch verzamelen van bedrijven en contactgegevens" },
  { icon: Database, title: "Data verwerking", desc: "Extractie en verrijking van bedrijfsinformatie" },
  { icon: Bot, title: "AI Analyse", desc: "Analyse van bedrijfswebsites en identificatie van pijnpunten" },
  { icon: Mail, title: "Outreach automatisering", desc: "Genereren en versturen van gepersonaliseerde e-mails" },
  { icon: RefreshCw, title: "CRM synchronisatie", desc: "Opslaan en beheren van leads in het CRM" },
  { icon: Phone, title: "Sales opvolging", desc: "Opvolgen via gesprekken, e-mail en pipeline" },
];

/* ─── Glowing animated dot on SVG path ─── */
const TravellingDot = ({ pathRef, active }: { pathRef: React.RefObject<SVGPathElement | null>; active: boolean }) => {
  const dotRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const raf = useRef<number>(0);
  const progress = useRef(0);

  useEffect(() => {
    if (!active) return;
    const path = pathRef.current;
    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!path || !dot || !glow) return;

    const totalLen = path.getTotalLength();
    const speed = 60; // px per second

    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      progress.current = (progress.current + (dt * speed) / totalLen) % 1;
      const pt = path.getPointAtLength(progress.current * totalLen);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      glow.setAttribute("cx", String(pt.x));
      glow.setAttribute("cy", String(pt.y));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, pathRef]);

  return (
    <>
      <circle ref={glowRef} r="10" fill="hsl(174 78% 50%)" opacity="0.18" />
      <circle ref={dotRef} r="4" fill="hsl(174 78% 65%)" opacity="0.95">
        <animate attributeName="r" values="3;5;3" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </>
  );
};

/* ─── Node card ─── */
const NodeCard = ({
  step,
  index,
  isActive,
  onHover,
}: {
  step: (typeof steps)[0];
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) => {
  const Icon = step.icon;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.09, duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        className="relative rounded-xl border border-primary/20 bg-card/80 backdrop-blur-sm px-5 py-4 flex items-start gap-3.5 cursor-default overflow-hidden transition-colors duration-200"
        animate={{
          borderColor: isActive ? "hsl(174 78% 45% / 0.55)" : "hsl(174 78% 45% / 0.15)",
          boxShadow: isActive
            ? "0 0 24px -4px hsl(174 78% 45% / 0.25), inset 0 1px 0 hsl(174 78% 80% / 0.06)"
            : "0 2px 12px -4px hsl(0 0% 0% / 0.3), inset 0 1px 0 hsl(174 78% 80% / 0.03)",
        }}
        transition={{ duration: 0.25 }}
        whileHover={{ scale: 1.015 }}
      >
        {/* Glow bg */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary/5 pointer-events-none"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
          <Icon size={18} />
        </div>

        <div className="relative z-10 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">{step.title}</p>
          <motion.p
            className="text-xs text-muted-foreground leading-snug mt-0.5 origin-top"
            initial={false}
            animate={{ height: isActive ? "auto" : "1.1em", opacity: isActive ? 1 : 0.7 }}
            transition={{ duration: 0.25 }}
          >
            {step.desc}
          </motion.p>
        </div>

        {/* Step number */}
        <span className="absolute top-2 right-3 text-[10px] font-bold text-primary/25 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main diagram ─── */
const LeadFlowDiagram = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [nodePositions, setNodePositions] = useState<{ x: number; y: number }[]>([]);
  const [visible, setVisible] = useState(false);

  const inView = useInView(containerRef, { once: false, amount: 0.15 });

  useEffect(() => {
    setVisible(inView);
  }, [inView]);

  /* Measure node positions for SVG connector path */
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-node]");
    const rect = container.getBoundingClientRect();
    const positions: { x: number; y: number }[] = [];
    cards.forEach((card) => {
      const cr = card.getBoundingClientRect();
      positions.push({
        x: cr.left - rect.left + cr.width / 2,
        y: cr.top - rect.top + cr.height / 2,
      });
    });
    setNodePositions(positions);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* Build SVG path through all nodes */
  const pathD =
    nodePositions.length >= 2
      ? nodePositions
          .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
          .join(" ")
      : "";

  return (
    <div ref={containerRef} className="relative w-full max-w-sm mx-auto py-4">
      {/* SVG connector lines */}
      {nodePositions.length >= 2 && (
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {/* Glow line */}
          <path d={pathD} fill="none" stroke="hsl(174 78% 45%)" strokeWidth="3" strokeOpacity="0.07" strokeLinecap="round" />
          {/* Main line */}
          <path ref={pathRef} d={pathD} fill="none" stroke="hsl(174 78% 45%)" strokeWidth="1.5" strokeOpacity="0.25" strokeLinecap="round" strokeDasharray="6 4" />
          {/* Travelling dot */}
          {visible && <TravellingDot pathRef={pathRef} active={visible} />}
          {/* Node glow circles */}
          {nodePositions.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="6"
              fill="hsl(174 78% 50%)"
              opacity={hovered === i ? 0.35 : 0.08}
              style={{ transition: "opacity 0.3s" }}
            />
          ))}
        </svg>
      )}

      {/* Node cards */}
      <div className="relative z-10 flex flex-col gap-3">
        {steps.map((step, i) => (
          <div key={i} data-node>
            <NodeCard
              step={step}
              index={i}
              isActive={hovered === i}
              onHover={setHovered}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadFlowDiagram;
