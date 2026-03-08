import { Blocks, BarChart3, Users, ShieldCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import useCanHover from "@/hooks/use-can-hover";

import teamFoto from "@/assets/team_wall_cropped.png";

const reasons = [
  {
    icon: Blocks,
    title: "Architecture before automation",
    description:
      "We don't start with tools, but with structure. First understand how processes and systems work together, then build.",
  },
  {
    icon: BarChart3,
    title: "Measurable impact",
    description:
      "We define KPIs upfront and only build what demonstrably adds value. Every automation has a clear purpose.",
  },
  {
    icon: Users,
    title: "Direct with the builders",
    description:
      "You work directly with the engineers. No account managers, no intermediaries, no miscommunication.",
  },
  {
    icon: ShieldCheck,
    title: "Ownership & control",
    description:
      "Full documentation and transferability. Custom configurations and developed code remain under your control, without vendor lock-in.",
  },
];

const ReasonCard = ({
  reason, index, hoveredIndex, onHover, onLeave, canHover,
}: {
  reason: (typeof reasons)[0]; index: number; hoveredIndex: number | null;
  onHover: () => void; onLeave: () => void; canHover: boolean;
}) => {
  const isHovered = canHover && hoveredIndex === index;
  const isAnyHovered = canHover && hoveredIndex !== null;
  const Icon = reason.icon;

  return (
    <div
      onMouseEnter={canHover ? onHover : undefined}
      onMouseLeave={canHover ? onLeave : undefined}
      className="relative rounded-xl border border-border p-4 sm:p-6 overflow-hidden transition-all duration-200 ease-out bg-card"
      style={{
        transform: isHovered ? "scale(1.015) translateY(-2px)" : "none",
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : undefined,
        boxShadow: isHovered ? "0 0 20px hsl(174 78% 41% / 0.12)" : "none",
      }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Icon size={16} />
          </div>
          <h3 className="font-semibold text-sm sm:text-base text-foreground">{reason.title}</h3>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
      </div>
    </div>
  );
};

const WhyAutronisSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <section className="py-10 sm:py-24 border-t border-border relative overflow-hidden">

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-6 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Why Autronis
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              From chaos to control.
            </h2>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal>
          <ScrollRevealItem>
            <div className="rounded-2xl border border-primary/20 bg-card overflow-hidden max-w-6xl mx-auto shadow-sm dark:shadow-none">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-4 sm:p-6 md:p-8 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    {reasons.map((r, i) => (
                      <ReasonCard key={r.title} reason={r} index={i} hoveredIndex={hoveredIndex} onHover={() => setHoveredIndex(i)} onLeave={() => setHoveredIndex(null)} canHover={canHover} />
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <Link to="/book">
                        Schedule an introduction
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300">
                      <Link to="/team">
                        Meet our team
                        <ArrowRight size={18} />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="relative min-h-[250px] sm:min-h-[400px] lg:min-h-0 overflow-hidden">
                  <img src={teamFoto} alt="Autronis team - Sem and Syb" width={800} height={600} className="w-full h-full object-cover object-center scale-110" loading="lazy" decoding="async" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 55% 65% at 50% 40%, transparent 0%, hsl(0 0% 0% / 0.55) 100%)" }} />
                  <div className="absolute inset-0 pointer-events-none dark:hidden lg:dark:block hidden" style={{ background: "linear-gradient(to right, hsl(var(--card)) 0%, hsl(var(--card) / 0.3) 8%, transparent 25%)" }} />
                  <div className="absolute inset-0 pointer-events-none dark:hidden hidden lg:block" style={{ background: "linear-gradient(to right, hsl(var(--card)) 0%, hsl(var(--card) / 0.15) 6%, transparent 18%)" }} />
                  <div className="absolute inset-0 pointer-events-none lg:hidden" style={{ background: "linear-gradient(to bottom, hsl(var(--card)) 0%, hsl(var(--card) / 0.3) 8%, transparent 25%)" }} />
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
