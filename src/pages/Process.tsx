import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  FileText,
  BarChart3,
  Shield,
  Search,
  Brain,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import AmbientLight from "@/components/AmbientLight";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

/* ── Phase data ── */
const phases = [
  {
    step: "01",
    title: "Analyse & Architectuur",
    timing: "Week 1",
    description:
      "We analyseren processen, knelpunten en datastructuur. Geen aannames — alleen onderbouwde keuzes.",
    deliverables: [
      "Procesmapping",
      "Systeemanalyse",
      "Automatiseringskansen met impactscore",
    ],
  },
  {
    step: "02",
    title: "Design & Structuur",
    timing: "Week 1–2",
    description:
      "We ontwerpen een schaalbare architectuur waarin systemen logisch samenwerken.",
    deliverables: [
      "Technische architectuur",
      "Integratieschema",
      "Datastromen ontwerp",
    ],
  },
  {
    step: "03",
    title: "Build & Iteratie",
    timing: "Week 2–4",
    description:
      "We bouwen modulair en testen continu. U ziet elke week voortgang.",
    deliverables: [
      "Werkende automatiseringen",
      "Testomgeving",
      "Live demo's",
    ],
  },
  {
    step: "04",
    title: "Validatie & Optimalisatie",
    timing: "Week 3–5",
    description:
      "We testen edge cases, performance en stabiliteit voordat iets live gaat.",
    deliverables: [
      "End-to-end test coverage",
      "Logging & monitoring setup",
      "Performance validatie",
    ],
  },
  {
    step: "05",
    title: "Livegang & Overdracht",
    timing: "Week 4–6",
    description:
      "Stabiele livegang met volledige documentatie en kennisoverdracht.",
    deliverables: [
      "Productie deployment",
      "Documentatie",
      "Training & overdracht",
    ],
  },
];

const securityClaims = [
  {
    icon: ShieldCheck,
    title: "Minimale toegangsrechten",
    description: "Toegang wordt strikt beperkt per rol en per systeem.",
  },
  {
    icon: FileText,
    title: "Volledige documentatie",
    description: "Architectuur, datastromen en logica zijn volledig vastgelegd.",
  },
  {
    icon: BarChart3,
    title: "Logging & monitoring",
    description: "Elke integratie bevat foutdetectie en audit logging.",
  },
  {
    icon: Shield,
    title: "AVG-proof aanpak",
    description: "Dataverwerking wordt afgestemd op privacyrichtlijnen.",
  },
];

const introPoints = [
  { icon: Search, text: "Analyse met ROI-focus" },
  { icon: Brain, text: "Architectuur vóór automatisering" },
  { icon: TrendingUp, text: "Schaalbaar vanaf dag één" },
];

/* ── Moving dash CSS for progress line ── */
const movingDashStyle = `
@keyframes flowDash {
  0% { background-position: 0 0; }
  100% { background-position: 0 40px; }
}
`;

/* PhaseRail removed — labels integrated into PhaseCard grid */

/* ── Phase card ── */
const PhaseCard = ({
  phase,
  index,
  activeIndex,
}: {
  phase: (typeof phases)[0];
  index: number;
  activeIndex: number;
}) => {
  const isActive = index <= activeIndex;
  const isCurrent = index === activeIndex;
  const isPast = index < activeIndex;

  return (
    <div
      className="relative grid grid-cols-[40px_1fr] sm:grid-cols-[48px_1fr] lg:grid-cols-[140px_48px_1fr] items-start"
      data-phase={index}
    >
      {/* Left: Fase label (desktop only) */}
      <div className="hidden lg:flex flex-col justify-center items-end pr-5 mt-4">
        <p
          className="uppercase tracking-[0.14em] transition-all duration-300 text-right"
          style={{
            fontSize: isCurrent ? "0.7rem" : "0.625rem",
            fontWeight: isCurrent ? 700 : 600,
            color: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--muted-foreground))",
            opacity: isCurrent ? 1 : isActive ? 0.7 : 0.4,
          }}
        >
          Fase {phase.step}
        </p>
        <p
          className="leading-tight transition-all duration-300 mt-0.5 text-right"
          style={{
            fontSize: isCurrent ? "0.8rem" : "0.7rem",
            fontWeight: isCurrent ? 600 : 400,
            color: isCurrent ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
            opacity: isCurrent ? 1 : isActive ? 0.65 : 0.35,
          }}
        >
          {phase.title}
        </p>
      </div>

      {/* Node column */}
      <div className="flex flex-col items-center shrink-0 relative">
        <div
          className="w-5 h-5 rounded-full border-2 relative z-10 mt-5 transform-gpu"
          style={{
            transform: isCurrent ? "scale(1.2)" : "scale(1)",
            borderColor: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--border) / 0.3)",
            backgroundColor: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--card))",
            boxShadow: isCurrent
              ? "0 0 10px hsl(174 78% 41% / 0.4), 0 0 24px hsl(174 78% 41% / 0.12)"
              : "none",
            transition: "all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          {isCurrent && (
            <div className="absolute inset-[-6px] rounded-full border border-primary/20" />
          )}
        </div>
        {index < phases.length - 1 && (
          <div
            className="w-[2px] flex-1 relative"
            style={{ backgroundColor: "hsl(var(--border) / 0.15)" }}
          >
            <div
              className="absolute inset-x-0 top-0 bg-primary transform-gpu"
              style={{
                height: isActive ? "100%" : "0%",
                transition: "height 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          </div>
        )}
      </div>

      {/* Content card with depth layer */}
      <div className="relative mb-10 ml-4 sm:ml-5">
        {/* Depth shadow layer */}
        <div
          className="absolute inset-0 rounded-xl transform-gpu"
          style={{
            backgroundColor: "hsl(var(--border) / 0.04)",
            transform: isCurrent ? "translate(4px, 4px) scale(1.01)" : "translate(2px, 2px)",
            transition: "all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

        {/* Spotlight behind card */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transform-gpu"
          style={{
            background: isCurrent
              ? "radial-gradient(ellipse at center, hsl(174 78% 41% / 0.06), transparent 70%)"
              : "none",
            opacity: isCurrent ? 1 : 0,
            transform: "scale(1.15)",
            transition: "opacity 500ms ease-out",
          }}
        />

        <motion.div
          className="relative rounded-xl border p-5 sm:p-6 cursor-default transform-gpu"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.3,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{
            backgroundColor: isCurrent
              ? "hsl(var(--card))"
              : "hsl(var(--card) / 0.7)",
            borderColor: isCurrent
              ? "hsl(174, 78%, 41%, 0.25)"
              : isPast
              ? "hsl(var(--border) / 0.6)"
              : "hsl(var(--border))",
            boxShadow: isCurrent
              ? "0 4px 20px hsl(174 78% 41% / 0.06), 0 1px 6px hsl(0 0% 0% / 0.04)"
              : "none",
            opacity: isPast ? 0.7 : 1,
            transform: isCurrent ? "scale(1.02)" : "scale(1)",
            transition: "all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 6px 24px hsl(174 78% 41% / 0.08), 0 2px 8px hsl(0 0% 0% / 0.05)",
          }}
        >
          {/* Subtle grid overlay when active */}
          {isCurrent && (
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(174 78% 41% / 0.025) 1px, transparent 1px), linear-gradient(90deg, hsl(174 78% 41% / 0.025) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                opacity: 1,
                transition: "opacity 500ms ease-out",
              }}
            />
          )}

          <div className="relative z-10">
            {/* Mobile phase label */}
            <p
              className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 lg:hidden"
              style={{
                color: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--muted-foreground))",
                transition: "color 300ms ease-out",
              }}
            >
              Fase {phase.step}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <h3 className="text-base sm:text-lg font-bold">{phase.title}</h3>
              <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full shrink-0 self-start">
                {phase.timing}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {phase.description}
            </p>

            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
                Deliverables
              </p>
              <ul className="space-y-1.5">
                {phase.deliverables.map((d, dIdx) => (
                  <motion.li
                    key={d}
                    className="text-sm text-foreground/80 flex items-start gap-2"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.1 + dIdx * 0.08,
                      duration: 0.3,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <span className="text-primary mt-0.5 shrink-0">▸</span>
                    {d}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Main page ── */
const Process = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [fillPercent, setFillPercent] = useState(0);

  const updateActivePhase = useCallback(() => {
    const viewportH = window.innerHeight;
    let newActive = -1;

    phases.forEach((_, i) => {
      const el = document.querySelector(`[data-phase="${i}"]`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      if (center < viewportH * 0.6) {
        newActive = i;
      }
    });

    setActiveIndex(newActive);

    // Calculate rail fill percent
    if (newActive < 0) {
      setFillPercent(0);
    } else {
      // Each phase = 1 segment, fill proportionally
      const totalSegments = phases.length - 1;
      setFillPercent(Math.min(100, (newActive / totalSegments) * 100));
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActivePhase, { passive: true });
    updateActivePhase();
    return () => window.removeEventListener("scroll", updateActivePhase);
  }, [updateActivePhase]);

  return (
    <section className="pt-16 pb-24 relative overflow-hidden">
      <style>{movingDashStyle}</style>
      <AmbientLight />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Hero */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Aanpak
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Van analyse tot livegang
            </h1>
          </ScrollRevealItem>
          <ScrollRevealItem>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Gestructureerd. Voorspelbaar. Schaalbaar.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* ── Intro block ── */}
        <ScrollReveal className="max-w-3xl mx-auto mb-20">
          <ScrollRevealItem>
            <div
              className="rounded-xl border border-primary/20 bg-card p-8 sm:p-10 relative overflow-hidden"
              style={{
                boxShadow:
                  "0 0 40px hsl(174 78% 41% / 0.06), inset 0 0 60px hsl(174 78% 41% / 0.02)",
              }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                Onze manier van bouwen
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Wij combineren procesautomatisering, systeemintegraties en
                data-architectuur tot één schaalbaar fundament. Geen losse
                oplossingen — maar een robuuste structuur die met u meegroeit.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {introPoints.map((point, idx) => (
                  <motion.div
                    key={point.text}
                    className="flex items-center gap-3 p-3 rounded-lg bg-primary/[0.04] border border-primary/10"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <point.icon size={16} />
                    </div>
                    <p className="text-sm font-medium">{point.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="max-w-4xl mx-auto mb-20 relative">
          {phases.map((phase, i) => (
            <PhaseCard
              key={phase.step}
              phase={phase}
              index={i}
              activeIndex={activeIndex}
            />
          ))}
        </div>

        {/* ── Security & Reliability ── */}
        <ScrollReveal className="mb-20">
          <ScrollRevealItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {securityClaims.map((claim, idx) => (
                <motion.div
                  key={claim.title}
                  className="rounded-xl border border-border bg-card p-5 group cursor-default transition-all duration-300"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  whileHover={{
                    borderColor: "hsl(174, 78%, 41%, 0.25)",
                    boxShadow: "0 0 12px hsl(174, 78%, 41%, 0.06)",
                  }}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:bg-primary/15 transition-colors">
                    <claim.icon size={18} />
                  </div>
                  <h4 className="text-sm font-bold mb-1">{claim.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {claim.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* ── CTA ── */}
        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Klaar om uw processen structureel te verbeteren?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Plan een Automation Scan en ontvang een concreet overzicht van
              optimalisatiekansen.
            </p>
            <Button asChild size="lg">
              <Link to="/book">
                Plan een Automation Scan <ArrowRight size={18} />
              </Link>
            </Button>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Process;
