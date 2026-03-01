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
      className="relative rounded-lg border border-border bg-card p-4 sm:p-5 text-center overflow-hidden transition-all duration-[280ms] ease-out"
      style={{
        transform: isHovered ? "scale(1.05) translateY(-4px)" : "scale(1) translateY(0)",
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : undefined,
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
        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
          <stat.icon size={16} />
        </div>
        {stat.value !== null ? (
          <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">
            <AnimatedCounter target={stat.value} duration={850} suffix={stat.suffix} />
          </p>
        ) : (
          <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">✓</p>
        )}
        <p className="text-xs text-muted-foreground">{stat.label}</p>
      </div>
    </div>
  );
};

const StatisticsBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
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
