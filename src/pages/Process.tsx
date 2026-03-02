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
import { useRef, useState, useEffect } from "react";
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

/* ── Phase card with label left of line ── */
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

  return (
    <div className="relative grid grid-cols-[80px_40px_1fr] sm:grid-cols-[120px_40px_1fr] items-start phase-item" data-index={index}>
      {/* Left: Fase label */}
      <div className="flex items-center h-10 justify-end pr-4">
        <span
          className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300"
          style={{
            color: isActive ? "hsl(174, 78%, 41%)" : undefined,
            opacity: isActive ? 1 : 0.5,
          }}
        >
          Fase {phase.step}
        </span>
      </div>

      {/* Center: Node */}
      <div className="flex flex-col items-center shrink-0 relative">
        <motion.div
          className="w-4 h-4 rounded-full border-2 relative z-10 mt-3"
          animate={{
            scale: isCurrent ? 1.12 : 1,
            borderColor: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--border))",
            backgroundColor: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--card))",
            boxShadow: isCurrent
              ? "0 0 12px hsl(174 78% 41% / 0.5)"
              : "none",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        {/* Line segment */}
        {index < phases.length - 1 && (
          <div className="w-[2px] flex-1 bg-border/40 relative overflow-hidden">
            <motion.div
              className="absolute inset-x-0 top-0 bg-primary"
              animate={{ height: isActive ? "100%" : "0%" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        )}
      </div>

      {/* Right: Content card */}
      <motion.div
        className="rounded-xl border border-border bg-card p-5 sm:p-6 mb-8 ml-3 sm:ml-4 cursor-default"
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.35,
          delay: 0.05,
          ease: [0.23, 1, 0.32, 1],
        }}
        whileHover={{
          y: -4,
          scale: 1.01,
          borderColor: "hsl(174, 78%, 41%, 0.4)",
          boxShadow:
            "0 0 24px hsl(174, 78%, 41%, 0.1), inset 0 0 12px hsl(174, 78%, 41%, 0.03)",
        }}
        style={{ transition: "border-color 0.3s, box-shadow 0.3s" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <h3 className="text-base sm:text-lg font-bold">{phase.title}</h3>
          <span className="text-[10px] sm:text-xs text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full shrink-0 self-start">
            {phase.timing}
          </span>
        </div>

        <motion.p
          className="text-sm text-muted-foreground mb-4 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {phase.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.3 }}
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
            Deliverables
          </p>
          <ul className="space-y-1.5">
            {phase.deliverables.map((d) => (
              <li key={d} className="text-sm text-foreground/80 flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0">▸</span>
                {d}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ── Main page ── */
const Process = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const items = document.querySelectorAll(".phase-item");
    if (!items.length) return;

    const observers: IntersectionObserver[] = [];
    items.forEach((el) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = parseInt(el.getAttribute("data-index") || "0");
              setActiveIndex((prev) => Math.max(prev, idx));
            }
          });
        },
        { threshold: 0.4, rootMargin: "0px 0px -20% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="pt-16 pb-24 relative overflow-hidden">
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
        <div ref={timelineRef} className="max-w-3xl mx-auto mb-20 relative">
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
                    borderColor: "hsl(174, 78%, 41%, 0.35)",
                    boxShadow:
                      "0 0 16px hsl(174, 78%, 41%, 0.1), 0 0 32px hsl(174, 78%, 41%, 0.05)",
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
