import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Search, PenTool, Wrench, CheckCircle, BarChart3 } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

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
      className="relative rounded-xl border bg-card p-6 cursor-pointer overflow-hidden"
      style={{
        transform: isActive
          ? "scale(1.02) translateY(-2px)"
          : isHovered
          ? "scale(1.01) translateY(-4px)"
          : "scale(1) translateY(0)",
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isActive
          ? "hsl(var(--primary) / 0.5)"
          : isHovered
          ? "hsl(var(--primary) / 0.5)"
          : undefined,
        boxShadow: "none",
        transition: "all 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      <div className="relative z-10">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-all duration-500"
          style={{
            backgroundColor: isActive ? "hsl(var(--primary) / 0.15)" : "hsl(var(--primary) / 0.1)",
          }}
        >
          <Icon size={18} className="text-primary" />
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
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !timelineRef.current) return;
      const viewportH = window.innerHeight;

      // Calculate fill height based on active card positions
      let newActive = -1;
      let targetFillHeight = 0;

      cardRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const cardRect = ref.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        // Card becomes active when its center passes 60% of viewport
        if (cardCenter < viewportH * 0.6) {
          newActive = i;
        }
      });

      // Calculate fill height to reach the active node
      if (newActive >= 0 && timelineRef.current) {
        const timelineRect = timelineRef.current.getBoundingClientRect();
        const activeCard = cardRefs.current[newActive];
        if (activeCard) {
          const activeRect = activeCard.getBoundingClientRect();
          // Fill to the center of the active node (which is at the top of the card + ~20px for the node center)
          targetFillHeight = activeRect.top + 20 - timelineRect.top;
        }
      }

      setActiveIndex(newActive);
      setFillHeight(Math.max(0, targetFillHeight));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden" ref={sectionRef}>
      <AmbientLight />


      <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
        <div className="relative max-w-3xl mx-auto" ref={timelineRef}>
          {/* Vertical line (left) */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border hidden sm:block">
            <div
              className="w-full bg-primary rounded-full"
              style={{
                height: `${fillHeight}px`,
                transition: "height 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
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
                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{
                      borderColor: activeIndex >= i ? "hsl(var(--primary))" : "hsl(var(--border))",
                      backgroundColor: activeIndex >= i ? "hsl(var(--primary))" : "hsl(var(--card))",
                      color: activeIndex >= i ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                      boxShadow: activeIndex >= i ? "0 0 16px hsl(174 78% 41% / 0.45)" : "none",
                      transition: "all 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
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
            <Button asChild size="lg">
              <Link to="/process">
                Bekijk ons volledige proces
                <ArrowRight size={18} />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Onze bewezen methodiek: van analyse tot continue optimalisatie.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProcessSection;
