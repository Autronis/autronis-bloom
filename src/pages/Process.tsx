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
  Clock,
  Target,
  Layers,
  Cog,
  ScanSearch,
  Rocket,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

/* ── Phase data ── */
const phases = [
  {
    step: "01",
    icon: Brain,
    title: "Analyse & Architectuur",
    timing: "Week 1",
    description:
      "We analyseren processen, systemen en datastromen en definiëren een onderbouwde strategie. Besluiten worden gebaseerd op impact-, risico- en ROI-berekeningen.",
    deliverables: [
      "Procesmapping",
      "Systeemanalyse",
      "Impact- en ROI-analyse",
      "Businesscase per kans",
      "Scope-definitie",
      "Risicoanalyse",
    ],
  },
  {
    step: "02",
    icon: Layers,
    title: "Ontwerp & Structuur",
    timing: "Week 1–2",
    description:
      "We ontwerpen een schaalbare en veilige architectuur waarin systemen logisch samenwerken en data gecontroleerd stroomt.",
    deliverables: [
      "Technisch architectuurdocument",
      "Integratieschema",
      "Datastroomontwerp",
      "Security- en toegangsmodel",
      "Datagovernance-richtlijnen",
      "Technische randvoorwaarden",
    ],
  },
  {
    step: "03",
    icon: Cog,
    title: "Bouw & Implementatie",
    timing: "Week 2–4",
    description:
      "We realiseren de oplossingen modulair, gecontroleerd en volgens vastgestelde architectuurprincipes.",
    deliverables: [
      "Werkende flows",
      "Testomgeving",
      "Logging en foutafhandeling",
      "Versiebeheer en configuratiebeheer",
      "Teststrategie en validatieverslagen",
    ],
  },
  {
    step: "04",
    icon: ScanSearch,
    title: "Validatie & Optimalisatie",
    timing: "Week 3–5",
    description:
      "We testen stabiliteit, performance en uitzonderingssituaties voordat livegang plaatsvindt.",
    deliverables: [
      "End-to-end testdekking",
      "Monitoringconfiguratie",
      "Performancevalidatie",
      "Gebruikersacceptatietest",
      "Failover- en fallbackstrategie",
      "SLA-afstemming",
    ],
  },
  {
    step: "05",
    icon: Rocket,
    title: "Livegang & Overdracht",
    timing: "Week 4–6",
    description:
      "We realiseren een gecontroleerde livegang en dragen het systeem volledig overdraagbaar over.",
    deliverables: [
      "Productie-implementatie",
      "Volledige technische documentatie",
      "Operationeel overdrachtsmodel",
      "Training & kennisoverdracht",
      "Nazorgperiode",
      "Governance- en eigenaarschapsoverdracht",
    ],
  },
  {
    step: "06",
    icon: RefreshCw,
    title: "Doorontwikkeling & ondersteuning",
    timing: "Doorlopend",
    description:
      "Na livegang blijven systemen zich ontwikkelen. Naarmate processen veranderen of nieuwe systemen worden toegevoegd, passen wij de architectuur waar nodig aan.",
    deliverables: [
      "Monitoring van integraties",
      "Optimalisatie van bestaande workflows",
      "Uitbreiding met nieuwe oplossingen",
      "Ondersteuning bij systeemwijzigingen",
    ],
  },
];

const securityClaims = [
  {
    icon: ShieldCheck,
    title: "Minimale rechten",
    description: "Toegang strikt beperkt op basis van rollen.",
  },
  {
    icon: FileText,
    title: "Documentatie",
    description: "Alles vastgelegd en overdraagbaar opgeleverd.",
  },
  {
    icon: BarChart3,
    title: "Logging",
    description: "Standaard foutdetectie en monitoring ingebouwd.",
  },
  {
    icon: Shield,
    title: "AVG-conform",
    description: "Ingericht conform privacywetgeving.",
  },
];

const introPoints = [
  { icon: Search, text: "Doordachte analyse", sub: "Elke implementatie start met een analyse van processen en systemen, inclusief impact- en ROI-berekening." },
  { icon: Brain, text: "Architectuur vóór automatisering", sub: "Structuur, datastromen en schaalbaarheid worden vastgesteld voordat er gebouwd wordt." },
  { icon: Target, text: "Meetbare besluitvorming", sub: "Automatisering wordt alleen geïmplementeerd wanneer de zakelijke impact aantoonbaar is." },
  { icon: TrendingUp, text: "Schaalbaar vanaf dag één", sub: "Systemen worden ontworpen om mee te groeien zonder lineaire stijging van personeelskosten." },
];

const impactCards = [
  {
    icon: Clock,
    title: "Tot 30–70% minder handmatig werk",
    description: "Repetitieve taken worden structureel geëlimineerd. Vrijgekomen uren worden direct vertaald naar herinzetbare capaciteit binnen bestaande teams.",
    sub: "Gebaseerd op procesanalyse en gemiddelde loonkosten inclusief overhead.",
    primary: true,
    customIcon: null,
  },
  {
    icon: null,
    title: "Structurele kostenreductie",
    description: "Correctiewerk, dubbele invoer en inefficiënte overdracht verdwijnen uit het proces. Besparingen werken cumulatief door naarmate processen verder worden geoptimaliseerd.",
    sub: "Direct vertaald naar operationele kostenbesparing in de businesscase.",
    primary: true,
    customIcon: "€",
  },
  {
    icon: Shield,
    title: "Lager operationeel risico",
    description: "Gestandaardiseerde processen met logging, toegangsbeheer en documentatie verminderen foutkans en escalaties.",
    primary: false,
    customIcon: null,
  },
  {
    icon: TrendingUp,
    title: "Schaalbaarheid zonder lineaire personeelsgroei",
    description: "Meer output met hetzelfde team. Groei wordt mogelijk zonder proportionele stijging in personeelskosten.",
    primary: false,
    customIcon: null,
  },
];

const proofStrip = [
  "Gebaseerd op procesanalyse",
  "Financieel doorgerekend",
  "Inclusief risico- en overheadfactoren",
  "Transparante ROI-indicatie",
];

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
            fontSize: isCurrent ? "0.85rem" : "0.75rem",
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
            fontSize: isCurrent ? "1rem" : "0.9rem",
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

      {/* Content card */}
      <div className="relative mb-10 ml-4 sm:ml-5">
        <div
          className="absolute inset-0 rounded-xl transform-gpu"
          style={{
            backgroundColor: "hsl(var(--border) / 0.04)",
            transform: isCurrent ? "translate(4px, 4px) scale(1.01)" : "translate(2px, 2px)",
            transition: "all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        />

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
          initial={{ opacity: 0, x: 32, scale: 1 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          animate={{
            scale: isCurrent ? 1.05 : isPast ? 0.96 : 0.98,
            opacity: isPast ? 0.65 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            backgroundColor: isCurrent ? "hsl(var(--card))" : "hsl(var(--card) / 0.7)",
            borderColor: isCurrent
              ? "hsl(174, 78%, 41%, 0.3)"
              : isPast
              ? "hsl(174, 78%, 41%, 0.1)"
              : "hsl(174, 78%, 41%, 0.15)",
            boxShadow: isCurrent
              ? "0 4px 20px hsl(174 78% 41% / 0.06), 0 1px 6px hsl(0 0% 0% / 0.04)"
              : "none",
            transition: "background-color 500ms, border-color 500ms, box-shadow 500ms",
          }}
          whileHover={{
            scale: isCurrent ? 1.06 : 1.02,
            boxShadow: "0 6px 24px hsl(174 78% 41% / 0.08), 0 2px 8px hsl(0 0% 0% / 0.05)",
          }}
        >
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
              <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                <phase.icon size={18} className="text-primary shrink-0" />
                {phase.title}
              </h3>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full shrink-0 self-start">
                {phase.timing}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {phase.description}
            </p>

            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
                Resultaten
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                {phase.deliverables.map((d, dIdx) => (
                  <motion.li
                    key={d}
                    className="text-sm text-foreground/80 flex items-start gap-2"
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.1 + dIdx * 0.06,
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
  const [fillHeight, setFillHeight] = useState(0);

  const updateActivePhase = useCallback(() => {
    const viewportH = window.innerHeight;
    const timeline = timelineRef.current;
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

    if (newActive < 0 || !timeline) {
      setFillHeight(0);
    } else {
      // Calculate fill height based on actual node position
      const activeEl = document.querySelector(`[data-phase="${newActive}"]`);
      if (activeEl) {
        const timelineRect = timeline.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        // The node dot is at mt-5 (20px) from the top of the phase element + half the dot height (10px)
        const nodeCenter = activeRect.top + 30 - timelineRect.top;
        setFillHeight(Math.max(0, nodeCenter));
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", updateActivePhase, { passive: true });
    updateActivePhase();
    return () => window.removeEventListener("scroll", updateActivePhase);
  }, [updateActivePhase]);

  return (
    <section className="pt-16 pb-24 relative overflow-hidden">
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Hero */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Aanpak
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Van analyse naar schaalbare automatisering
            </h1>
          </ScrollRevealItem>
          <ScrollRevealItem>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wij combineren procesautomatisering, systeemintegraties en data-architectuur tot één schaalbaar fundament. Geen losse oplossingen, maar een robuuste structuur die met uw organisatie meegroeit.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* ── Intro block: Onze werkwijze ── */}
        <ScrollReveal className="max-w-3xl mx-auto mb-20">
          <ScrollRevealItem>
            <motion.div
              className="rounded-xl border border-border bg-card p-8 sm:p-10 relative overflow-hidden"
              whileHover={{
                scale: 1.015,
                borderColor: "hsl(174, 78%, 41%, 0.5)",
                boxShadow: "0 4px 24px hsl(174, 78%, 41%, 0.08)",
                transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
              }}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                Onze werkwijze
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Wij combineren procesautomatisering, systeemintegraties en
                data-architectuur tot één schaalbaar fundament. Geen losse
                oplossingen, maar een robuuste structuur die met uw organisatie meegroeit.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {introPoints.map((point, idx) => (
                  <motion.div
                    key={point.text}
                    className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    whileHover={{
                      borderColor: "hsl(174, 78%, 41%, 0.5)",
                      boxShadow: "0 0 14px hsl(174, 78%, 41%, 0.1)",
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                      <point.icon size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold mb-0.5">{point.text}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{point.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* ── Security & Reliability ── */}
        <ScrollReveal className="max-w-4xl mx-auto mb-20">
          <ScrollRevealItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {securityClaims.map((claim, idx) => (
                <motion.div
                  key={claim.title}
                  className="rounded-xl border border-border bg-card p-5 group cursor-default"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  whileHover={{
                    scale: 1.04,
                    borderColor: "hsl(174, 78%, 41%, 0.5)",
                    boxShadow: "0 0 16px hsl(174, 78%, 41%, 0.1), 0 0 8px hsl(174, 78%, 41%, 0.06)",
                  }}
                  style={{ transition: "all 300ms ease-out" }}
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

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="max-w-4xl mx-auto mb-20 relative">
          <div
            className="absolute top-0 bottom-0 w-[2px] pointer-events-none left-[19px] sm:left-[23px] lg:left-[163px]"
            style={{ backgroundColor: "hsl(var(--border) / 0.15)" }}
          >
            <div
              className="absolute inset-x-0 top-0 bg-primary rounded-full"
              style={{
                height: `${fillHeight}px`,
                transition: "height 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              }}
            />
          </div>
          {phases.map((phase, i) => (
            <PhaseCard
              key={phase.step}
              phase={phase}
              index={i}
              activeIndex={activeIndex}
            />
          ))}
        </div>

        {/* ── Impact section ── */}
        <div className="max-w-4xl mx-auto mb-20 relative">
          {/* Subtle background glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background: "radial-gradient(ellipse at center, hsl(174 78% 41% / 0.04), transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Resultaat
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Structurele impact op tijd, kosten en continuïteit
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Onze automatiseringen leveren geen cosmetische winst, maar structurele verbetering in capaciteit, foutreductie en schaalbaarheid — meetbaar vertaald naar financiële impact.
              </p>
            </motion.div>

            {/* Primary cards – row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {impactCards.filter(c => c.primary).map((card, idx) => (
                <motion.div
                  key={card.title}
                  className="rounded-2xl border border-border p-6 sm:p-7 cursor-default group"
                  style={{
                    backgroundColor: "hsl(var(--card) / 0.8)",
                    backdropFilter: "blur(8px)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "hsl(174, 78%, 41%, 0.4)",
                    boxShadow: "0 0 12px hsl(174, 78%, 41%, 0.08)",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {card.customIcon ? (
                      <span className="text-lg font-bold">{card.customIcon}</span>
                    ) : card.icon ? (
                      <card.icon size={20} />
                    ) : null}
                  </div>
                  <h3 className="text-base font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Secondary cards – row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              {impactCards.filter(c => !c.primary).map((card, idx) => (
                <motion.div
                  key={card.title}
                  className="rounded-2xl border border-border p-6 sm:p-7 cursor-default group"
                  style={{
                    backgroundColor: "hsl(var(--card) / 0.6)",
                    backdropFilter: "blur(6px)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.16 + idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "hsl(174, 78%, 41%, 0.35)",
                    boxShadow: "0 0 12px hsl(174, 78%, 41%, 0.06)",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {card.customIcon ? (
                      <span className="text-lg font-bold">{card.customIcon}</span>
                    ) : card.icon ? (
                      <card.icon size={20} />
                    ) : null}
                  </div>
                  <h3 className="text-base font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Micro proof strip */}
            <motion.div
              className="flex flex-wrap justify-center gap-x-6 gap-y-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {proofStrip.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
                  <span className="text-primary">✔</span>
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

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
