import { useState, useCallback } from "react";
import { Workflow, Cable, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import useCanHover from "@/hooks/use-can-hover";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/i18n/context";

const text = {
  en: [
    { title: "Workflow automation", description: "Recurring processes are fully automated so work flows without manual steps." },
    { title: "System integrations", description: "Business systems like CRM, ERP and other tools are connected so data syncs automatically." },
    { title: "Data and dashboards", description: "Real-time insight into processes via automated reports and dashboards." },
  ],
  nl: [
    { title: "Workflow-automatisering", description: "Terugkerende processen worden volledig geautomatiseerd zodat werk doorloopt zonder handmatige stappen." },
    { title: "Systeemintegraties", description: "Bedrijfssystemen zoals CRM, ERP en andere tools worden verbonden zodat data automatisch synchroniseert." },
    { title: "Data en dashboards", description: "Realtime inzicht in processen via geautomatiseerde rapportages en dashboards." },
  ],
};

const icons = [Workflow, Cable, BarChart3];

const CapabilityCard = ({ cap, icon: Icon, index, isAnyHovered, isHovered, onHover, onLeave, canHover }: {
  cap: { title: string; description: string }; icon: React.ElementType; index: number;
  isAnyHovered: boolean; isHovered: boolean; onHover: () => void; onLeave: () => void; canHover: boolean;
}) => {
  const isMobile = useIsMobile();
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const showHover = canHover && isHovered;
  const showDim = canHover && isAnyHovered && !isHovered;

  return (
    <motion.div
      onMouseEnter={canHover ? onHover : undefined}
      onMouseLeave={canHover ? onLeave : undefined}
      onMouseMove={canHover ? handleMouseMove : undefined}
      className="relative rounded-xl border bg-gradient-to-br from-primary/[0.06] to-card p-3 sm:p-4 text-center overflow-hidden cursor-default"
      initial={isMobile ? false : { opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.12 + 0.3, ease: [0.23, 1, 0.32, 1] }}
      style={{
        transform: showHover ? "scale(1.06) translateY(-6px)" : showDim ? "scale(0.97)" : "none",
        opacity: showDim ? 0.7 : 1,
        borderColor: showHover ? "hsl(174, 78%, 41%)" : "hsl(var(--border))",
        boxShadow: showHover
          ? "0 0 20px hsl(174 78% 41% / 0.3), 0 0 40px hsl(174 78% 41% / 0.12), 0 8px 32px hsl(174 78% 41% / 0.08)"
          : "none",
        transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
    >
      {/* Cursor-follow glow */}
      {showHover && (
        <div className="absolute pointer-events-none inset-0 transition-opacity duration-300 z-0"
          style={{ background: `radial-gradient(200px circle at ${glowPos.x}px ${glowPos.y}px, hsl(174 78% 41% / 0.18), transparent 70%)` }}
        />
      )}
      {/* Shimmer line */}
      {!isMobile && (
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent z-10"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.2, delay: index * 0.2 + 0.8, ease: "easeInOut" }}
      />
      )}
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-10" />
      <div className="relative z-10">
        <motion.div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary mx-auto mb-2.5 shadow-[0_0_12px_hsl(174_78%_41%/0.15)]"
          animate={showHover ? { boxShadow: "0 0 24px hsl(174, 78%, 41%, 0.4)" } : { boxShadow: "0 0 12px hsl(174, 78%, 41%, 0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <Icon size={18} strokeWidth={2.5} />
        </motion.div>
        <p className="text-xs sm:text-sm font-bold leading-tight text-center tracking-tight">{cap.title}</p>
      </div>
    </motion.div>
  );
};

const StatisticsBlock = () => {
  const lang = useLanguage();
  const caps = text[lang];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <div className="grid grid-cols-3 gap-2.5 sm:gap-3 max-w-xl mx-auto">
      {caps.map((cap, i) => (
        <CapabilityCard key={cap.title} cap={cap} icon={icons[i]} index={i} isAnyHovered={hoveredIndex !== null} isHovered={hoveredIndex === i} onHover={() => setHoveredIndex(i)} onLeave={() => setHoveredIndex(null)} canHover={canHover} />
      ))}
    </div>
  );
};

export default StatisticsBlock;
