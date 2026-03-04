import { Blocks, BarChart3, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

import teamFoto from "@/assets/team_wall_cropped.png";

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
      "Volledige documentatie en overdraagbaarheid. Maatwerkconfiguraties en ontwikkelde code blijven onder uw controle, zonder vendor lock-in.",
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
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;
  const Icon = reason.icon;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative rounded-xl border border-border p-6 overflow-hidden transition-all duration-[300ms] ease-out bg-card"
      style={{
        transform: isHovered ? "scale(1.01) translateY(-4px)" : "scale(1) translateY(0)",
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered ? "hsl(var(--primary) / 0.4)" : undefined,
      }}
    >
      <div className="relative z-10">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
          <Icon size={20} />
        </div>
        <h3 className="font-semibold mb-2 text-foreground">{reason.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
      </div>
    </div>
  );
};

const WhyAutronisSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Waarom Autronis
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Van chaos naar controle.
            </h2>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal>
          <ScrollRevealItem>
            <div className="rounded-2xl border-[3px] border-primary/40 dark:border-[2px] dark:border-primary/20 bg-card overflow-hidden max-w-6xl mx-auto shadow-sm dark:shadow-none">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left: cards + CTAs */}
                <div className="p-6 sm:p-8 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {reasons.map((r, i) => (
                      <ReasonCard
                        key={r.title}
                        reason={r}
                        index={i}
                        hoveredIndex={hoveredIndex}
                        onHover={() => setHoveredIndex(i)}
                        onLeave={() => setHoveredIndex(null)}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg">
                      <Link to="/book">
                        Plan een kennismaking
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300"
                    >
                      <Link to="/team">
                        Bekijk ons team
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right: Team photo */}
                <div className="relative min-h-[400px] lg:min-h-0 overflow-hidden">
                  <img
                    src={teamFoto}
                    alt="Autronis team - Sem en Syb"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover object-center scale-110 rotate-[2deg]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Radial vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 55% 65% at 50% 40%, transparent 0%, hsl(0 0% 0% / 0.55) 100%)",
                    }}
                  />
                  {/* Left fade into card - dark mode */}
                  <div
                    className="absolute inset-0 pointer-events-none dark:block hidden"
                    style={{
                      background: "linear-gradient(to right, hsl(var(--card)) 0%, hsl(var(--card) / 0.3) 8%, transparent 25%)",
                    }}
                  />
                  {/* Left fade into card - light mode */}
                  <div
                    className="absolute inset-0 pointer-events-none dark:hidden"
                    style={{
                      background: "linear-gradient(to right, hsl(var(--card)) 0%, hsl(var(--card) / 0.15) 6%, transparent 18%)",
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyAutronisSection;
