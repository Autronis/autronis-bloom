import { useRef, useState, useCallback } from "react";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import { Workflow, Clock, Building2 } from "lucide-react";

const stats = [
  {
    icon: Workflow,
    value: 50,
    suffix: "+",
    label: "Workflows geïmplementeerd",
  },
  {
    icon: Clock,
    value: 500,
    suffix: "+",
    label: "Uur aan handmatig werk geautomatiseerd",
  },
  {
    icon: Building2,
    value: null,
    suffix: "",
    label: "Projecten voor groeiende MKB-bedrijven",
  },
];

const StatCard = ({
  stat,
  isAnyHovered,
  isHovered,
  onHover,
  onLeave,
}: {
  stat: (typeof stats)[0];
  isAnyHovered: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      ref={cardRef}
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
      {/* Mouse-following radial glow */}
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
          <stat.icon size={14} />
        </div>
        {stat.value !== null ? (
          <p className="text-lg sm:text-xl font-bold text-primary mb-0.5">
            <AnimatedCounter target={stat.value} duration={850} suffix={stat.suffix} />
          </p>
        ) : (
          <p className="text-lg sm:text-xl font-bold text-primary mb-0.5">✓</p>
        )}
        <p className="text-[11px] text-muted-foreground">{stat.label}</p>
      </div>
    </div>
  );
};

const StatisticsBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto">
      {stats.map((stat, i) => (
        <StatCard
          key={stat.label}
          stat={stat}
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
