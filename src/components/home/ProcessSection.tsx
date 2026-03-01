import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, ChevronRight, Search, PenTool, Wrench, CheckCircle, BarChart3 } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const phases = [
  {
    step: "01",
    icon: Search,
    title: "Analyse & Prioritering",
    description:
      "Wij brengen uw processen, systemen en knelpunten in kaart. U ontvangt een geprioriteerd overzicht van de grootste verbetermogelijkheden.",
  },
  {
    step: "02",
    icon: PenTool,
    title: "Architectuur & Blueprint",
    description:
      "We ontwerpen een schaalbare systeemarchitectuur met duidelijke integratiepunten, dataflows en verwachte impact per automatisering.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Bouw & Integratie",
    description:
      "De automatiseringen worden gebouwd en geïntegreerd met uw bestaande systemen. Iteratief, met tussentijdse validatie.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Validatie & Overdracht",
    description:
      "Uitgebreid testen, documentatie en kennisoverdracht. U bent volledig eigenaar van het resultaat.",
  },
  {
    step: "05",
    icon: BarChart3,
    title: "Monitoring & Optimalisatie",
    description:
      "Na go-live monitoren we prestaties en optimaliseren we continu. Uw systemen worden beter over tijd.",
  },
];

const DesktopCard = ({
  phase,
  index,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  phase: (typeof phases)[0];
  index: number;
  hoveredIndex: number | null;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;
  const Icon = phase.icon;

  return (
    <div className="flex items-start flex-1">
      <div
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onMouseMove={handleMouseMove}
        className="relative rounded-xl border bg-card p-5 transition-all duration-[300ms] ease-out cursor-pointer flex-1 overflow-hidden"
        style={{
          transform: isHovered ? "scale(1.01) translateY(-4px)" : "scale(1) translateY(0)",
          opacity: isAnyHovered && !isHovered ? 0.88 : 1,
          borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : undefined,
        }}
      >
        {isHovered && (
          <div
            className="absolute pointer-events-none inset-0 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(200px circle at ${glowPos.x}px ${glowPos.y}px, hsl(174 78% 41% / 0.12), transparent 70%)`,
            }}
          />
        )}
        <div className="relative z-10">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
            <Icon size={16} />
          </div>
          <p className="text-xs font-bold text-primary mb-1">Stap {phase.step}</p>
          <h3 className="font-semibold mb-2 text-sm">{phase.title}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {phase.description}
          </p>
        </div>
      </div>
      {index < phases.length - 1 && (
        <div className="flex items-center px-1 pt-12 shrink-0">
          <ChevronRight
            size={18}
            className={`transition-colors duration-300 ${
              isHovered ? "text-primary" : "text-muted-foreground/30"
            }`}
          />
        </div>
      )}
    </div>
  );
};

const MobileNode = ({
  phase,
  index,
  isActive,
  isLast,
  onTap,
}: {
  phase: (typeof phases)[0];
  index: number;
  isActive: boolean;
  isLast: boolean;
  onTap: () => void;
}) => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [tapped, setTapped] = useState(false);
  const Icon = phase.icon;

  const handleTap = () => {
    setTapped(true);
    onTap();
    setTimeout(() => setTapped(false), 250);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <button
          onClick={handleTap}
          className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-200 shrink-0 ${
            isActive
              ? "border-primary bg-primary text-primary-foreground shadow-[0_0_12px_hsl(174_78%_41%/0.4)]"
              : "border-primary/40 text-primary hover:bg-primary/10"
          } ${tapped ? "scale-110" : ""}`}
        >
          {phase.step}
        </button>
        {!isLast && (
          <div className={`w-0.5 flex-1 min-h-[20px] transition-colors duration-300 ${
            isActive ? "bg-primary/60" : "bg-border"
          }`} />
        )}
      </div>
      {/* Card */}
      <div
        onClick={handleTap}
        onMouseMove={handleMouseMove}
        className={`relative rounded-xl border bg-card p-5 mb-4 flex-1 overflow-hidden transition-all duration-200 ${
          isActive ? "border-primary/40" : "border-border"
        } ${tapped ? "border-primary/60" : ""}`}
      >
        {(isActive || tapped) && (
          <div
            className="absolute pointer-events-none inset-0 z-0"
            style={{
              background: `radial-gradient(180px circle at ${glowPos.x || 60}px ${glowPos.y || 40}px, hsl(174 78% 41% / 0.1), transparent 70%)`,
            }}
          />
        )}
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Icon size={14} />
            </div>
            <h3 className="font-semibold text-sm">{phase.title}</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {phase.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeNode, setActiveNode] = useState(0);

  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Aanpak
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hoe wij werken</h2>
            <p className="text-muted-foreground">
              Een gestructureerde aanpak van analyse tot optimalisatie. Geen losse
              automatiseringen, maar systemen die duurzaam en schaalbaar functioneren.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Desktop: horizontal with icons and arrows */}
        <ScrollReveal className="hidden lg:flex items-start gap-2 mb-10" staggerChildren={0.08}>
          {phases.map((phase, index) => (
            <ScrollRevealItem key={phase.step} className="flex items-start flex-1">
              <DesktopCard
                phase={phase}
                index={index}
                hoveredIndex={hoveredIndex}
                onHover={() => setHoveredIndex(index)}
                onLeave={() => setHoveredIndex(null)}
              />
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        {/* Mobile: vertical stepper */}
        <ScrollReveal className="lg:hidden mb-10" staggerChildren={0.08}>
          {phases.map((phase, index) => (
            <ScrollRevealItem key={phase.step}>
              <MobileNode
                phase={phase}
                index={index}
                isActive={activeNode === index}
                isLast={index === phases.length - 1}
                onTap={() => setActiveNode(index)}
              />
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        {/* Security line */}
        <ScrollReveal>
          <ScrollRevealItem>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-8">
              <ShieldCheck size={14} className="text-primary" />
              <span>
                Beveiliging en datakwaliteit zijn geïntegreerd in elke fase — met minimale
                toegangsrechten, logging en volledige documentatie.
              </span>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Link
              to="/process"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              Bekijk ons volledige proces <ArrowRight size={14} />
            </Link>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProcessSection;
