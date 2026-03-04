import { useRef, useState, useCallback } from "react";
import { Workflow, Cable, BarChart3 } from "lucide-react";

const capabilities = [
  {
    icon: Workflow,
    title: "Workflow automatisering",
    description: "Terugkerende processen worden volledig geautomatiseerd zodat werk zonder handmatige tussenstappen kan doorlopen.",
  },
  {
    icon: Cable,
    title: "Systeemintegraties",
    description: "Bedrijfssystemen zoals CRM, ERP en andere tools worden verbonden zodat data automatisch wordt gesynchroniseerd.",
  },
  {
    icon: BarChart3,
    title: "Data en dashboards",
    description: "Realtime inzicht in processen via automatische rapportages en dashboards.",
  },
];

const CapabilityCard = ({
  cap,
  isAnyHovered,
  isHovered,
  onHover,
  onLeave,
}: {
  cap: (typeof capabilities)[0];
  isAnyHovered: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      className="relative rounded-lg border border-border bg-card p-2.5 sm:p-3 text-center overflow-hidden transition-all duration-[280ms] ease-out"
      style={{
        transform: isHovered ? "scale(1.05) translateY(-4px)" : "scale(1) translateY(0)",
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered ? "hsl(var(--primary) / 0.6)" : undefined,
        boxShadow: isHovered ? "0 0 15px hsl(var(--primary) / 0.25), 0 0 30px hsl(var(--primary) / 0.1), inset 0 0 15px hsl(var(--primary) / 0.05)" : "none",
      }}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(250px circle at ${glowPos.x}px ${glowPos.y}px, hsl(174 78% 41% / 0.12), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10">
        <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary mx-auto mb-2">
          <cap.icon size={14} />
        </div>
        <p className="text-xs font-semibold mb-1">{cap.title}</p>
        <p className="text-[11px] text-muted-foreground leading-relaxed">{cap.description}</p>
      </div>
    </div>
  );
};

const StatisticsBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto">
      {capabilities.map((cap, i) => (
        <CapabilityCard
          key={cap.title}
          cap={cap}
          isAnyHovered={hoveredIndex !== null}
          isHovered={hoveredIndex === i}
          onHover={() => setHoveredIndex(i)}
          onLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
};

export default StatisticsBlock;
