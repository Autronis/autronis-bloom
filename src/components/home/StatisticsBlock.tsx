import { useRef, useState, useCallback } from "react";
import { Workflow, Cable, BarChart3 } from "lucide-react";
import useCanHover from "@/hooks/use-can-hover";
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

const CapabilityCard = ({ cap, icon: Icon, isAnyHovered, isHovered, onHover, onLeave, canHover }: {
  cap: { title: string; description: string }; icon: React.ElementType;
  isAnyHovered: boolean; isHovered: boolean; onHover: () => void; onLeave: () => void; canHover: boolean;
}) => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const showHover = canHover && isHovered;
  const showDim = canHover && isAnyHovered && !isHovered;

  return (
    <div onMouseEnter={canHover ? onHover : undefined} onMouseLeave={canHover ? onLeave : undefined} onMouseMove={canHover ? handleMouseMove : undefined}
      className="relative rounded-lg border border-border bg-card p-2.5 sm:p-3 text-center overflow-hidden transition-all duration-200 ease-out"
      style={{ transform: showHover ? "scale(1.05) translateY(-4px)" : "none", opacity: showDim ? 0.88 : 1, borderColor: showHover ? "hsl(var(--primary) / 0.6)" : undefined, boxShadow: showHover ? "0 0 15px hsl(var(--primary) / 0.25), 0 0 30px hsl(var(--primary) / 0.1), inset 0 0 15px hsl(var(--primary) / 0.05)" : "none" }}>
      {showHover && <div className="absolute pointer-events-none inset-0 transition-opacity duration-300" style={{ background: `radial-gradient(250px circle at ${glowPos.x}px ${glowPos.y}px, hsl(174 78% 41% / 0.12), transparent 70%)` }} />}
      <div className="relative z-10">
        <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2"><Icon size={14} /></div>
        <p className="text-[10px] sm:text-xs font-semibold mb-1 leading-tight text-center">{cap.title}</p>
      </div>
    </div>
  );
};

const StatisticsBlock = () => {
  const lang = useLanguage();
  const caps = text[lang];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-xl mx-auto">
      {caps.map((cap, i) => (
        <CapabilityCard key={cap.title} cap={cap} icon={icons[i]} isAnyHovered={hoveredIndex !== null} isHovered={hoveredIndex === i} onHover={() => setHoveredIndex(i)} onLeave={() => setHoveredIndex(null)} canHover={canHover} />
      ))}
    </div>
  );
};

export default StatisticsBlock;
