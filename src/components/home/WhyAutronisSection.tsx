import { Blocks, BarChart3, Users, ShieldCheck } from "lucide-react";
import { useState, useCallback } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const reasons = [
  {
    icon: Blocks,
    title: "Architectuur vóór automatisering",
    description:
      "Wij beginnen niet met tools, maar met structuur. Eerst begrijpen hoe processen en systemen samenwerken, dan pas bouwen.",
  },
  {
    icon: BarChart3,
    title: "Meetbare impact",
    description:
      "We definiëren vooraf KPI's en bouwen alleen wat aantoonbaar waarde toevoegt. Elke automatisering heeft een helder doel.",
  },
  {
    icon: Users,
    title: "Direct met de bouwers",
    description:
      "U werkt rechtstreeks met de engineers. Geen accountmanagers, geen tussenlagen, geen miscommunicatie.",
  },
  {
    icon: ShieldCheck,
    title: "Eigendom & controle",
    description:
      "Volledige documentatie. Geen vendor lock-in. Alles wat we bouwen is volledig uw eigendom — inclusief broncode en overdracht.",
  },
];

const ReasonCard = ({
  reason,
  index,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  reason: (typeof reasons)[0];
  index: number;
  hoveredIndex: number | null;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;
  const Icon = reason.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      className="relative rounded-xl border border-border bg-card p-6 overflow-hidden transition-all duration-[300ms] ease-out"
      style={{
        transform: isHovered ? "scale(1.01) translateY(-4px)" : "scale(1) translateY(0)",
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered ? "hsl(var(--primary) / 0.4)" : undefined,
      }}
    >
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 z-0"
          style={{
            background: `radial-gradient(200px circle at ${glowPos.x}px ${glowPos.y}px, hsl(174 78% 41% / 0.1), transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
          <Icon size={20} />
        </div>
        <h3 className="font-semibold mb-2">{reason.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
      </div>
    </div>
  );
};

const WhyAutronisSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Waarom Autronis
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Gebouwd op principes, niet op hype.
            </h2>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto" staggerChildren={0.08}>
          {reasons.map((r, i) => (
            <ScrollRevealItem key={r.title}>
              <ReasonCard
                reason={r}
                index={i}
                hoveredIndex={hoveredIndex}
                onHover={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
              />
            </ScrollRevealItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyAutronisSection;
