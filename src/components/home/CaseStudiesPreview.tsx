import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState, useCallback } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const caseStudies = [
  {
    slug: "logistiek-bedrijf",
    industry: "Logistiek",
    client: "TransFlow B.V.",
    metric: "73% snellere orderverwerking",
    summary: "Van handmatige orderinvoer naar een volledig geautomatiseerde pipeline — inclusief validatie, routeplanning en klantcommunicatie.",
  },
  {
    slug: "saas-scale-up",
    industry: "SaaS",
    client: "CloudMetrics",
    metric: "40 uur/week bespaard",
    summary: "Onboarding, billing en churn-alerts geautomatiseerd waardoor het CS-team zich kon focussen op strategische accounts.",
  },
  {
    slug: "e-commerce-groei",
    industry: "E-commerce",
    client: "StyleDirect",
    metric: "2.4x meer conversies",
    summary: "AI-gedreven productaanbevelingen, geautomatiseerde follow-ups en dynamische pricing in één geïntegreerd systeem.",
  },
];

const CaseCard = ({
  cs,
  index,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  cs: (typeof caseStudies)[0];
  index: number;
  hoveredIndex: number | null;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlowPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <Link
      to={`/case-studies/${cs.slug}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onMouseMove={handleMouseMove}
      className="relative group rounded-xl border border-border bg-card p-6 flex flex-col h-full overflow-hidden transition-all duration-[300ms] ease-out"
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
      <div className="relative z-10 flex flex-col h-full">
        <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full self-start mb-4">
          {cs.industry}
        </span>
        <p className="text-2xl font-bold mb-1 text-primary">{cs.metric}</p>
        <p className="text-sm font-medium mb-3">{cs.client}</p>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{cs.summary}</p>
        <span className="mt-4 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">
          Lees meer <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
};

const CaseStudiesPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(174 78% 30% / 0.045) 1px, transparent 1px),
            linear-gradient(90deg, hsl(174 78% 30% / 0.045) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "15%", y: "25%", delay: 0 },
          { x: "80%", y: "18%", delay: 1.4 },
          { x: "50%", y: "80%", delay: 0.6 },
          { x: "30%", y: "65%", delay: 2.1 },
          { x: "90%", y: "50%", delay: 0.9 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/12 animate-pulse"
            style={{
              left: pos.x,
              top: pos.y,
              animationDelay: `${pos.delay}s`,
              animationDuration: "3.5s",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Case Studies</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Resultaten die spreken</h2>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {caseStudies.map((cs, i) => (
            <ScrollRevealItem key={cs.slug}>
              <CaseCard
                cs={cs}
                index={i}
                hoveredIndex={hoveredIndex}
                onHover={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
              />
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Button asChild size="lg">
              <Link to="/case-studies">
                Alle case studies
                <ArrowRight size={18} />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Bekijk hoe wij bedrijven helpen met meetbare resultaten.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CaseStudiesPreview;
