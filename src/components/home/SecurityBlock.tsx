import { KeyRound, FileText, Activity, Scale } from "lucide-react";
import { useState, useCallback } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

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
      className="relative flex items-center gap-3 rounded-lg border border-border bg-card px-5 py-4 overflow-hidden transition-all duration-[300ms] ease-out"
      style={{
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered ? "hsl(var(--primary) / 0.4)" : undefined,
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
      <span className="text-sm text-foreground relative z-10">{item.label}</span>
    </div>
  );
};

const SecurityBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-20 border-t border-border relative overflow-hidden">
      {/* Blurred bubbles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "20%", y: "30%", size: 220, opacity: 0.06, delay: 0.5 },
          { x: "70%", y: "20%", size: 260, opacity: 0.05, delay: 1.3 },
          { x: "50%", y: "70%", size: 240, opacity: 0.06, delay: 0.9 },
          { x: "85%", y: "60%", size: 200, opacity: 0.05, delay: 1.8 },
          { x: "10%", y: "65%", size: 180, opacity: 0.06, delay: 2.2 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: b.x,
              top: b.y,
              width: b.size,
              height: b.size,
              background: `radial-gradient(circle, hsl(174 78% 41% / ${b.opacity}), transparent 70%)`,
              filter: "blur(50px)",
              animationDelay: `${b.delay}s`,
              animationDuration: "5s",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

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
