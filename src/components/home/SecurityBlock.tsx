import { KeyRound, FileText, Activity, Scale } from "lucide-react";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AnimatedBubbles from "@/components/home/AnimatedBubbles";

const items = [
  { icon: KeyRound, label: "Minimale toegangsrechten" },
  { icon: FileText, label: "Volledige documentatie" },
  { icon: Activity, label: "Logging & monitoring" },
  { icon: Scale, label: "AVG-proof aanpak" },
];

const SecurityCard = ({
  item,
  index,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  item: (typeof items)[0];
  index: number;
  hoveredIndex: number | null;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;
  const Icon = item.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      className="relative flex items-center gap-3 rounded-lg border-2 border-primary/25 bg-card px-4 py-3.5 overflow-hidden transition-all duration-[300ms] ease-out cursor-default"
      style={{
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : undefined,
        transform: isHovered ? "scale(1.06)" : "scale(1)",
      }}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 z-0"
          style={{
            background: `radial-gradient(150px circle at ${glowPos.x}px ${glowPos.y}px, hsl(174 78% 41% / 0.1), transparent 70%)`,
          }}
        />
      )}
      <Icon size={16} className="text-primary shrink-0 relative z-10" />
      <span className="text-sm font-medium text-foreground relative z-10">{item.label}</span>
    </div>
  );
};

const SecurityBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-20 border-t border-border relative overflow-hidden">
      <AnimatedBubbles bubbles={[
        { x: "20%", y: "30%", size: 320, opacity: 0.14, delay: 0.5, skewX: 8, borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" },
        { x: "70%", y: "20%", size: 360, opacity: 0.13, delay: 1.3, skewY: -6, borderRadius: "45% 55% 40% 60% / 55% 45% 60% 40%" },
        { x: "50%", y: "70%", size: 340, opacity: 0.14, delay: 0.9, skewX: -5, borderRadius: "50% 50% 45% 55% / 60% 40% 55% 45%" },
        { x: "85%", y: "60%", size: 300, opacity: 0.12, delay: 1.8, skewY: 7, borderRadius: "55% 45% 50% 50% / 40% 60% 45% 55%" },
        { x: "10%", y: "65%", size: 280, opacity: 0.13, delay: 2.2, skewX: 10, borderRadius: "40% 60% 50% 50% / 55% 45% 50% 50%" },
        { x: "40%", y: "15%", size: 260, opacity: 0.12, delay: 0.3, skewY: -4, borderRadius: "50% 50% 60% 40% / 45% 55% 50% 50%" },
        { x: "90%", y: "35%", size: 240, opacity: 0.14, delay: 1.6, skewX: -8, borderRadius: "45% 55% 50% 50% / 50% 50% 55% 45%" },
        { x: "30%", y: "85%", size: 300, opacity: 0.11, delay: 2.5, skewY: 5, borderRadius: "55% 45% 45% 55% / 50% 50% 40% 60%" },
      ]} />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Beveiliging
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Gebouwd met beveiliging als fundament
            </h2>
            <p className="text-muted-foreground mb-10">
              Beveiliging en datakwaliteit zijn geen afterthought — ze zijn geïntegreerd in
              elke fase van ons proces.
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map((item, i) => (
                <SecurityCard
                  key={item.label}
                  item={item}
                  index={i}
                  hoveredIndex={hoveredIndex}
                  onHover={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SecurityBlock;
