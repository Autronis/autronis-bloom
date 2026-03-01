import { Blocks, BarChart3, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import teamFoto from "@/assets/autronis_team_foto.png";

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
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, amount: 0.3 });

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      {/* Subtle background activity (no grid, just some floating dots) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "15%", y: "20%", delay: 0 },
          { x: "80%", y: "35%", delay: 1.5 },
          { x: "50%", y: "70%", delay: 0.8 },
          { x: "30%", y: "85%", delay: 2 },
          { x: "70%", y: "15%", delay: 0.4 },
          { x: "90%", y: "60%", delay: 1.2 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/10 animate-pulse"
            style={{
              left: pos.x,
              top: pos.y,
              animationDelay: `${pos.delay}s`,
              animationDuration: "4s",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
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

        <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16 sm:mb-20" staggerChildren={0.08}>
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

        {/* Team photo + CTA block */}
        <ScrollReveal>
          <ScrollRevealItem>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Text side */}
                <div className="p-8 sm:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                    Klaar om te zien hoe het werkt voor uw bedrijf?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Plan een vrijblijvend gesprek. Wij brengen uw workflows in kaart,
                    identificeren de quick wins en laten zien hoe het pad naar productie eruitziet.
                  </p>
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

                {/* Image side */}
                <div ref={imgRef} className="relative min-h-[300px] lg:min-h-0">
                  <motion.img
                    src={teamFoto}
                    alt="Autronis team - Sem en Syb"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={imgInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    loading="lazy"
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
