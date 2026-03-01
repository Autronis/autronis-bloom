import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Search, PenTool, Wrench, CheckCircle, BarChart3 } from "lucide-react";
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

/* ── Timeline card with glow ── */
const TimelineCard = ({
  phase,
  index,
  isActive,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  phase: (typeof phases)[0];
  index: number;
  isActive: boolean;
  hoveredIndex: number | null;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;
  const Icon = phase.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      className="relative rounded-xl border bg-card p-6 transition-all duration-[300ms] ease-out cursor-pointer overflow-hidden"
      style={{
        transform: isHovered ? "scale(1.01) translateY(-4px)" : "scale(1) translateY(0)",
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered
          ? "hsl(var(--primary) / 0.5)"
          : isActive
          ? "hsl(var(--primary) / 0.3)"
          : undefined,
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
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
          <Icon size={18} />
        </div>
        <p className="text-xs font-bold text-primary mb-1">Stap {phase.step}</p>
        <h3 className="font-semibold mb-2">{phase.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportH = window.innerHeight;

      // Progress: 0 when section top enters viewport, 1 when section bottom exits
      const progress = Math.max(0, Math.min(1, (viewportH - rect.top) / (sectionHeight + viewportH * 0.5)));
      setScrollProgress(progress);

      // Determine active card based on which is 40-60% in viewport
      let newActive = 0;
      cardRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const cardRect = ref.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        if (cardCenter < viewportH * 0.6 && cardCenter > viewportH * 0.2) {
          newActive = i;
        }
      });
      setActiveIndex(newActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-12 sm:py-24 border-t border-border" ref={sectionRef}>
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Aanpak
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Van analyse tot livegang</h2>
            <p className="text-muted-foreground">
              Gestructureerd. Voorspelbaar. Schaalbaar.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Timeline layout */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line (left) */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border hidden sm:block">
            <div
              className="w-full bg-primary transition-all duration-200"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Cards */}
          <div className="space-y-6 sm:space-y-8">
            {phases.map((phase, i) => (
              <div
                key={phase.step}
                ref={(el) => (cardRefs.current[i] = el)}
                className="flex items-start gap-4 sm:gap-6"
              >
                {/* Node */}
                <div className="hidden sm:flex flex-col items-center shrink-0 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      activeIndex >= i
                        ? "border-primary bg-primary text-primary-foreground shadow-[0_0_14px_hsl(174_78%_41%/0.4)]"
                        : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {phase.step}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1">
                  <TimelineCard
                    phase={phase}
                    index={i}
                    isActive={activeIndex === i}
                    hoveredIndex={hoveredIndex}
                    onHover={() => setHoveredIndex(i)}
                    onLeave={() => setHoveredIndex(null)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security line */}
        <ScrollReveal className="mt-10">
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
