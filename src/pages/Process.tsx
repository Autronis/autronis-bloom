import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import GlowCTA from "@/components/GlowCTA";
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
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";

/* ── i18n text ── */
const text = {
  en: {
    seoTitle: "Autronis | Process — From Analysis to Go-Live",
    seoDesc: "Discover our proven process: from strategic analysis and architecture to implementation, validation, and continuous development of automations.",
    heroLabel: "Approach",
    heroTitle: "From analysis to scalable automation",
    heroDesc: "We combine process automation, system integrations, and data architecture into one scalable foundation. Not standalone solutions, but a robust structure that grows with your organization.",
    approachTitle: "Our approach",
    approachDesc: "We combine process automation, system integrations, and data architecture into one scalable foundation. Not standalone solutions, but a robust structure that grows with your organization.",
    introPoints: [
      { text: "Thorough analysis", sub: "Every implementation starts with a process and system analysis, including impact and ROI calculations." },
      { text: "Architecture before automation", sub: "Structure, data flows, and scalability are defined before anything is built." },
      { text: "Measurable decision-making", sub: "Automation is only implemented when the business impact is demonstrable." },
      { text: "Scalable from day one", sub: "Systems are designed to grow without a linear increase in staffing costs." },
    ],
    securityClaims: [
      { title: "Minimal permissions", description: "Access strictly limited based on roles." },
      { title: "Documentation", description: "Everything documented and delivered in a transferable format." },
      { title: "Logging", description: "Error detection and monitoring built in by default." },
      { title: "GDPR compliant", description: "Set up in accordance with privacy legislation." },
    ],
    phases: [
      { step: "01", title: "Analysis & Architecture", timing: "Week 1", description: "We analyze processes, systems, and data flows, then define an evidence-based strategy. Decisions are grounded in impact, risk, and ROI calculations.", deliverables: ["Process mapping", "System analysis", "Impact & ROI analysis", "Business case per opportunity", "Scope definition", "Risk analysis"] },
      { step: "02", title: "Design & Structure", timing: "Week 1–2", description: "We design a scalable and secure architecture where systems work together logically and data flows in a controlled manner.", deliverables: ["Technical architecture document", "Integration schema", "Data flow design", "Security & access model", "Data governance guidelines", "Technical prerequisites"] },
      { step: "03", title: "Build & Implementation", timing: "Week 2–4", description: "We build solutions in a modular, controlled fashion according to established architecture principles.", deliverables: ["Working flows", "Test environment", "Logging and error handling", "Version control and configuration management", "Test strategy and validation reports"] },
      { step: "04", title: "Validation & Optimization", timing: "Week 3–5", description: "We test stability, performance, and edge cases before going live.", deliverables: ["End-to-end test coverage", "Monitoring configuration", "Performance validation", "User acceptance testing", "Failover & fallback strategy", "SLA alignment"] },
      { step: "05", title: "Go-Live & Handover", timing: "Week 4–6", description: "We execute a controlled go-live and hand over the system in a fully transferable state.", deliverables: ["Production deployment", "Complete technical documentation", "Operational handover model", "Training & knowledge transfer", "Post-launch support period", "Governance & ownership transfer"] },
      { step: "06", title: "Continuous Development & Support", timing: "Ongoing", description: "After go-live, systems continue to evolve. As processes change or new systems are added, we adapt the architecture as needed.", deliverables: ["Integration monitoring", "Optimization of existing workflows", "Expansion with new solutions", "Support for system changes"] },
    ],
    phaseLabel: "Phase",
    deliverablesLabel: "Deliverables",
    resultsLabel: "Results",
    resultsTitle: "Structural impact on time, cost, and continuity",
    resultsDesc: "Our automations deliver not cosmetic gains, but structural improvements in capacity, error reduction, and scalability — measurably translated into financial impact.",
    impactCards: [
      { title: "Up to 30–70% less manual work", description: "Repetitive tasks are structurally eliminated. Freed-up hours translate directly into redeployable capacity within existing teams.", primary: true, customIcon: null as string | null, iconKey: "clock" as const },
      { title: "Structural cost reduction", description: "Correction work, duplicate entry, and inefficient handovers disappear from the process. Savings compound as processes are further optimized.", primary: true, customIcon: "€", iconKey: "euro" as const },
      { title: "Lower operational risk", description: "Standardized processes with logging, access control, and documentation reduce error rates and escalations.", primary: false, customIcon: null as string | null, iconKey: "shield" as const },
      { title: "Scalability without linear headcount growth", description: "More output with the same team. Growth becomes possible without proportional increases in staffing costs.", primary: false, customIcon: null as string | null, iconKey: "trending" as const },
    ],
    proofStrip: ["Based on process analysis", "Financially validated", "Including risk and overhead factors", "Transparent ROI indication"],
    ctaTitle: "Ready to structurally improve your processes?",
    ctaDesc: "Schedule an Automation Scan and receive a concrete overview of optimization opportunities.",
    ctaBtn: "Schedule an Automation Scan",
  },
  nl: {
    seoTitle: "Autronis | Proces — Van Analyse tot Go-Live",
    seoDesc: "Ontdek ons bewezen proces: van strategische analyse en architectuur tot implementatie, validatie en doorontwikkeling van automatiseringen.",
    heroLabel: "Aanpak",
    heroTitle: "Van analyse tot schaalbare automatisering",
    heroDesc: "We combineren procesautomatisering, systeemintegraties en data-architectuur in één schaalbare basis. Geen losstaande oplossingen, maar een robuuste structuur die meegroeit met je organisatie.",
    approachTitle: "Onze aanpak",
    approachDesc: "We combineren procesautomatisering, systeemintegraties en data-architectuur in één schaalbare basis. Geen losstaande oplossingen, maar een robuuste structuur die meegroeit met je organisatie.",
    introPoints: [
      { text: "Grondige analyse", sub: "Elke implementatie begint met een proces- en systeemanalyse, inclusief impact- en ROI-berekeningen." },
      { text: "Architectuur vóór automatisering", sub: "Structuur, datastromen en schaalbaarheid worden bepaald voordat er iets gebouwd wordt." },
      { text: "Meetbare besluitvorming", sub: "Automatisering wordt alleen ingezet wanneer de business impact aantoonbaar is." },
      { text: "Schaalbaar vanaf dag één", sub: "Systemen zijn ontworpen om te groeien zonder lineaire stijging van personeelskosten." },
    ],
    securityClaims: [
      { title: "Minimale rechten", description: "Toegang strikt beperkt op basis van rollen." },
      { title: "Documentatie", description: "Alles gedocumenteerd en opgeleverd in een overdraagbaar formaat." },
      { title: "Logging", description: "Foutdetectie en monitoring standaard ingebouwd." },
      { title: "AVG-compliant", description: "Ingericht conform privacywetgeving." },
    ],
    phases: [
      { step: "01", title: "Analyse & Architectuur", timing: "Week 1", description: "We analyseren processen, systemen en datastromen en definiëren vervolgens een onderbouwde strategie. Beslissingen zijn gebaseerd op impact-, risico- en ROI-berekeningen.", deliverables: ["Procesmapping", "Systeemanalyse", "Impact- & ROI-analyse", "Business case per kans", "Scopedefinitie", "Risicoanalyse"] },
      { step: "02", title: "Ontwerp & Structuur", timing: "Week 1–2", description: "We ontwerpen een schaalbare en veilige architectuur waarbij systemen logisch samenwerken en data gecontroleerd stroomt.", deliverables: ["Technisch architectuurdocument", "Integratieschema", "Datastroomontwerp", "Security- & toegangsmodel", "Data governance richtlijnen", "Technische randvoorwaarden"] },
      { step: "03", title: "Bouw & Implementatie", timing: "Week 2–4", description: "We bouwen oplossingen modulair en gecontroleerd volgens vastgestelde architectuurprincipes.", deliverables: ["Werkende flows", "Testomgeving", "Logging en foutafhandeling", "Versiebeheer en configuratiemanagement", "Teststrategie en validatierapporten"] },
      { step: "04", title: "Validatie & Optimalisatie", timing: "Week 3–5", description: "We testen stabiliteit, performance en edge cases voordat er live gegaan wordt.", deliverables: ["End-to-end testdekking", "Monitoringconfiguratie", "Performancevalidatie", "User acceptance testing", "Failover- & fallbackstrategie", "SLA-afstemming"] },
      { step: "05", title: "Go-Live & Overdracht", timing: "Week 4–6", description: "We voeren een gecontroleerde go-live uit en dragen het systeem over in een volledig overdraagbare staat.", deliverables: ["Productie-deployment", "Volledige technische documentatie", "Operationeel overdrachtsmodel", "Training & kennisoverdracht", "Post-launch supportperiode", "Governance- & eigendomsoverdracht"] },
      { step: "06", title: "Doorontwikkeling & Ondersteuning", timing: "Doorlopend", description: "Na go-live blijven systemen evolueren. Wanneer processen veranderen of nieuwe systemen worden toegevoegd, passen we de architectuur aan waar nodig.", deliverables: ["Integratiemonitoring", "Optimalisatie van bestaande workflows", "Uitbreiding met nieuwe oplossingen", "Ondersteuning bij systeemwijzigingen"] },
    ],
    phaseLabel: "Fase",
    deliverablesLabel: "Deliverables",
    resultsLabel: "Resultaten",
    resultsTitle: "Structurele impact op tijd, kosten en continuïteit",
    resultsDesc: "Onze automatiseringen leveren geen cosmetische verbeteringen, maar structurele verbeteringen in capaciteit, foutreductie en schaalbaarheid — meetbaar vertaald naar financiële impact.",
    impactCards: [
      { title: "Tot 30–70% minder handmatig werk", description: "Repetitieve taken worden structureel geëlimineerd. Vrijgekomen uren vertalen zich direct naar herinzetbare capaciteit binnen bestaande teams.", primary: true, customIcon: null as string | null, iconKey: "clock" as const },
      { title: "Structurele kostenbesparing", description: "Correctiewerk, dubbele invoer en inefficiënte overdrachten verdwijnen uit het proces. Besparingen stapelen naarmate processen verder worden geoptimaliseerd.", primary: true, customIcon: "€", iconKey: "euro" as const },
      { title: "Lager operationeel risico", description: "Gestandaardiseerde processen met logging, toegangscontrole en documentatie verlagen foutratio's en escalaties.", primary: false, customIcon: null as string | null, iconKey: "shield" as const },
      { title: "Schaalbaarheid zonder lineaire groei in personeel", description: "Meer output met hetzelfde team. Groei wordt mogelijk zonder evenredige stijging van personeelskosten.", primary: false, customIcon: null as string | null, iconKey: "trending" as const },
    ],
    proofStrip: ["Gebaseerd op procesanalyse", "Financieel gevalideerd", "Inclusief risico- en overheadfactoren", "Transparante ROI-indicatie"],
    ctaTitle: "Klaar om je processen structureel te verbeteren?",
    ctaDesc: "Plan een Automation Scan en ontvang een concreet overzicht van optimalisatiekansen.",
    ctaBtn: "Plan een Automation Scan",
  },
};

const introIcons = [Search, Brain, Target, TrendingUp];
const securityIcons = [ShieldCheck, FileText, BarChart3, Shield];
const phaseIcons = [Brain, Layers, Cog, ScanSearch, Rocket, RefreshCw];
const impactIconMap = { clock: Clock, euro: null, shield: Shield, trending: TrendingUp } as const;

// Per-phase icon animations
const phaseIconAnims: Record<number, { animate: Record<string, number[]>; transition: Record<string, unknown> }> = {
  0: { animate: { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } },
  1: { animate: { y: [0, -3, 0, -1.5, 0] }, transition: { duration: 1.8, repeat: Infinity, repeatDelay: 2 } },
  2: { animate: { rotate: [0, 360] }, transition: { duration: 4, repeat: Infinity, ease: "linear" } },
  3: { animate: { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }, transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } },
  4: { animate: { y: [0, -2, 2, -2, 0, -6, -12, -6, 0], rotate: [0, -3, 3, -2, 0, 0, 0, 0, 0], scale: [1, 1, 1, 1, 1, 1.15, 1.25, 1.15, 1] }, transition: { duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" } },
  5: { animate: { rotate: [0, 360] }, transition: { duration: 3, repeat: Infinity, ease: "linear" } },
};

/* ── Phase card ── */
const PhaseCard = ({
  phase,
  index,
  activeIndex,
  phaseLabel,
  deliverablesLabel,
}: {
  phase: { step: string; title: string; timing: string; description: string; deliverables: string[] };
  index: number;
  activeIndex: number;
  phaseLabel: string;
  deliverablesLabel: string;
}) => {
  const isActive = index <= activeIndex;
  const isCurrent = index === activeIndex;
  const isPast = index < activeIndex;
  const Icon = phaseIcons[index];
  const iconAnim = phaseIconAnims[index];

  return (
    <div
      className="relative grid grid-cols-[40px_1fr] sm:grid-cols-[48px_1fr] lg:grid-cols-[140px_48px_1fr] items-start"
      data-phase={index}
    >
      <div className="hidden lg:flex flex-col justify-center items-end pr-5 mt-4">
        <p className="uppercase tracking-[0.14em] transition-all duration-300 text-right" style={{ fontSize: isCurrent ? "0.85rem" : "0.75rem", fontWeight: isCurrent ? 700 : 600, color: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--muted-foreground))", opacity: isCurrent ? 1 : isActive ? 0.7 : 0.4 }}>
          {phaseLabel} {phase.step}
        </p>
        <p className="leading-tight transition-all duration-300 mt-0.5 text-right" style={{ fontSize: isCurrent ? "1rem" : "0.9rem", fontWeight: isCurrent ? 600 : 400, color: isCurrent ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))", opacity: isCurrent ? 1 : isActive ? 0.65 : 0.35 }}>
          {phase.title}
        </p>
      </div>

      <div className="flex flex-col items-center shrink-0 relative">
        <div className="w-5 h-5 rounded-full border-2 relative z-10 mt-5 transform-gpu" style={{ transform: isCurrent ? "scale(1.2)" : "scale(1)", borderColor: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--border) / 0.3)", backgroundColor: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--card))", boxShadow: isCurrent ? "0 0 10px hsl(174 78% 41% / 0.4), 0 0 24px hsl(174 78% 41% / 0.12)" : "none", transition: "all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
          {isCurrent && <div className="absolute inset-[-6px] rounded-full border border-primary/20" />}
        </div>
        {index < 5 && (
          <div className="w-[2px] flex-1 relative" style={{ backgroundColor: "hsl(var(--border) / 0.15)" }}>
            <div className="absolute inset-x-0 top-0 bg-primary transform-gpu" style={{ height: isActive ? "100%" : "0%", transition: "height 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} />
          </div>
        )}
      </div>

      <div className="relative mb-10 ml-4 sm:ml-5">
        <div className="absolute inset-0 rounded-xl transform-gpu" style={{ backgroundColor: "hsl(var(--border) / 0.04)", transform: isCurrent ? "translate(4px, 4px) scale(1.01)" : "translate(2px, 2px)", transition: "all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} />
        <div className="absolute inset-0 rounded-xl pointer-events-none transform-gpu" style={{ background: isCurrent ? "radial-gradient(ellipse at center, hsl(174 78% 41% / 0.08), transparent 70%)" : "none", opacity: isCurrent ? 1 : 0, transform: "scale(1.15)", transition: "opacity 500ms ease-out" }} />

        <motion.div
          className="relative rounded-xl border overflow-hidden p-5 sm:p-6 cursor-default transform-gpu"
          initial={{ opacity: 0, x: 32, scale: 1 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          animate={{ scale: 1, opacity: isPast ? 0.65 : 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: isCurrent ? "linear-gradient(135deg, hsl(174, 78%, 41%, 0.06) 0%, hsl(var(--card)) 60%)" : isPast ? "hsl(var(--card) / 0.7)" : "hsl(var(--card))",
            borderColor: isCurrent ? "hsl(174, 78%, 41%, 0.4)" : isPast ? "hsl(174, 78%, 41%, 0.1)" : "hsl(174, 78%, 41%, 0.15)",
            boxShadow: isCurrent ? "0 4px 24px hsl(174 78% 41% / 0.1), 0 0 40px hsl(174 78% 41% / 0.04)" : "none",
            transition: "background 500ms, border-color 500ms, box-shadow 500ms",
          }}
          whileHover={{ boxShadow: "0 6px 28px hsl(174 78% 41% / 0.1), 0 2px 8px hsl(0 0% 0% / 0.05)" }}
        >
          {isCurrent && (
            <motion.div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent z-20" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }} />
          )}
          {index === 4 && isCurrent && (
            <>
              {[0, 1, 2, 3, 4].map((p) => (
                <motion.div key={p} className="absolute rounded-full bg-primary/40 z-0" style={{ left: 24 + p * 5, top: 32, width: p % 2 === 0 ? 3 : 2, height: p % 2 === 0 ? 3 : 2 }} animate={{ y: [0, 16, 32], x: [(p - 2) * 2, (p - 2) * 4, (p - 2) * 6], opacity: [0.7, 0.3, 0], scale: [1, 0.5, 0] }} transition={{ duration: 1, delay: p * 0.15, repeat: Infinity, repeatDelay: 4, ease: "easeOut" }} />
              ))}
            </>
          )}
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 lg:hidden" style={{ color: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--muted-foreground))", transition: "color 300ms ease-out" }}>
              {phaseLabel} {phase.step}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <h3 className="text-base sm:text-lg font-bold flex items-center gap-2.5">
                <motion.div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-primary shrink-0"
                  style={{ backgroundColor: isCurrent ? "hsl(174, 78%, 41%, 0.2)" : "hsl(174, 78%, 41%, 0.1)", boxShadow: isCurrent ? "0 0 16px hsl(174, 78%, 41%, 0.25)" : "none", transition: "background-color 400ms, box-shadow 400ms" }}
                  animate={isCurrent ? iconAnim.animate : {}}
                  transition={isCurrent ? iconAnim.transition : {}}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </motion.div>
                {phase.title}
              </h3>
              <span className="text-xs font-bold px-3.5 py-1.5 rounded-full shrink-0 self-start transition-all duration-300" style={{ color: isCurrent ? "hsl(var(--primary-foreground))" : "hsl(174, 78%, 41%)", backgroundColor: isCurrent ? "hsl(174, 78%, 41%)" : "hsl(174, 78%, 41%, 0.1)", boxShadow: isCurrent ? "0 0 12px hsl(174, 78%, 41%, 0.3)" : "none" }}>
                {phase.timing}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{phase.description}</p>
            <div>
              <p className="text-[10px] text-primary/60 uppercase tracking-wider mb-2.5 font-bold">{deliverablesLabel}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {phase.deliverables.map((d, dIdx) => (
                  <motion.li key={d} className="text-sm text-foreground/80 flex items-start gap-2.5" initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + dIdx * 0.06, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5"><Check size={10} className="text-primary" /></span>
                    <span className="font-medium">{d}</span>
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
  const lang = useLanguage();
  const t = text[lang];
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [fillHeight, setFillHeight] = useState(0);

  const updateActivePhase = useCallback(() => {
    const viewportH = window.innerHeight;
    const timeline = timelineRef.current;
    let newActive = -1;

    t.phases.forEach((_, i) => {
      const el = document.querySelector(`[data-phase="${i}"]`);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      if (center < viewportH * 0.6) newActive = i;
    });

    setActiveIndex(newActive);

    if (newActive < 0 || !timeline) {
      setFillHeight(0);
    } else {
      const activeEl = document.querySelector(`[data-phase="${newActive}"]`);
      if (activeEl) {
        const timelineRect = timeline.getBoundingClientRect();
        const activeRect = activeEl.getBoundingClientRect();
        const nodeCenter = activeRect.top + 30 - timelineRect.top;
        setFillHeight(Math.max(0, nodeCenter));
      }
    }
  }, [t.phases]);

  useEffect(() => {
    window.addEventListener("scroll", updateActivePhase, { passive: true });
    updateActivePhase();
    return () => window.removeEventListener("scroll", updateActivePhase);
  }, [updateActivePhase]);

  return (
    <>
    <SEOHead title={t.seoTitle} description={t.seoDesc} path="/process" />
    <section className="pt-16 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Hero */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
          <ScrollRevealItem><p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.heroLabel}</p></ScrollRevealItem>
          <ScrollRevealItem><h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{t.heroTitle}</h1></ScrollRevealItem>
          <ScrollRevealItem><p className="text-sm text-muted-foreground leading-relaxed">{t.heroDesc}</p></ScrollRevealItem>
        </ScrollReveal>

        {/* Intro block */}
        <ScrollReveal className="max-w-3xl mx-auto mb-20">
          <ScrollRevealItem>
            <motion.div className="rounded-xl border border-border bg-gradient-to-br from-primary/[0.06] to-card p-8 sm:p-10 relative overflow-hidden" whileHover={{ scale: 1.015, borderColor: "hsl(174, 78%, 41%, 0.5)", boxShadow: "0 4px 24px hsl(174, 78%, 41%, 0.08)", transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] } }}>
              <h2 className="text-xl sm:text-2xl font-bold mb-3">{t.approachTitle}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{t.approachDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.introPoints.map((point, idx) => {
                  const PIco = introIcons[idx];
                  return (
                    <motion.div key={point.text} className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-primary/[0.06] to-card border border-border" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.4 }} whileHover={{ borderColor: "hsl(174, 78%, 41%, 0.5)", boxShadow: "0 0 14px hsl(174, 78%, 41%, 0.1)" }}>
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5"><PIco size={16} /></div>
                      <div><p className="text-sm font-bold mb-0.5">{point.text}</p><p className="text-xs text-muted-foreground leading-relaxed">{point.sub}</p></div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Security */}
        <ScrollReveal className="max-w-4xl mx-auto mb-20">
          <ScrollRevealItem>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.securityClaims.map((claim, idx) => {
                const SIco = securityIcons[idx];
                return (
                  <motion.div key={claim.title} className="rounded-xl border border-border bg-gradient-to-br from-primary/[0.06] to-card p-5 group cursor-default" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.4 }} whileHover={{ scale: 1.04, borderColor: "hsl(174, 78%, 41%, 0.5)", boxShadow: "0 0 16px hsl(174, 78%, 41%, 0.1), 0 0 8px hsl(174, 78%, 41%, 0.06)" }} style={{ transition: "all 300ms ease-out" }}>
                    <div className="flex items-center gap-2.5 sm:block mb-2 sm:mb-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-colors sm:mb-3"><SIco size={16} className="sm:w-[18px] sm:h-[18px]" /></div>
                      <h4 className="text-sm font-bold sm:hidden">{claim.title}</h4>
                    </div>
                    <h4 className="hidden sm:block text-sm font-bold mb-1">{claim.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{claim.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto mb-20 relative">
          <div className="absolute top-0 bottom-0 w-[2px] pointer-events-none left-[19px] sm:left-[23px] lg:left-[163px]" style={{ backgroundColor: "hsl(var(--border) / 0.15)" }}>
            <div className="absolute inset-x-0 top-0 bg-primary rounded-full" style={{ height: `${fillHeight}px`, transition: "height 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} />
          </div>
          {t.phases.map((phase, i) => (
            <PhaseCard key={phase.step} phase={phase} index={i} activeIndex={activeIndex} phaseLabel={t.phaseLabel} deliverablesLabel={t.deliverablesLabel} />
          ))}
        </div>

        {/* Impact */}
        <div className="max-w-4xl mx-auto mb-20 relative">
          <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ background: "radial-gradient(ellipse at center, hsl(174 78% 41% / 0.04), transparent 70%)" }} />
          <div className="relative z-10">
            <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.resultsLabel}</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.resultsTitle}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">{t.resultsDesc}</p>
            </motion.div>

            {[true, false].map((isPrimary) => (
              <div key={String(isPrimary)} className={`grid grid-cols-1 sm:grid-cols-2 gap-5 ${isPrimary ? "mb-5" : "mb-10"}`}>
                {t.impactCards.filter(c => c.primary === isPrimary).map((card, idx) => {
                  const IconComp = impactIconMap[card.iconKey];
                  return (
                    <motion.div key={card.title} className="rounded-2xl border border-border p-6 sm:p-7 cursor-default group" style={{ backgroundColor: `hsl(var(--card) / ${isPrimary ? 0.8 : 0.6})`, backdropFilter: `blur(${isPrimary ? 8 : 6}px)` }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (isPrimary ? 0 : 0.16) + idx * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }} whileHover={{ scale: 1.02, borderColor: "hsl(174, 78%, 41%, 0.4)", boxShadow: "0 0 12px hsl(174, 78%, 41%, 0.08)" }}>
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          {card.customIcon ? <span className="text-lg font-bold">{card.customIcon}</span> : IconComp ? <IconComp size={20} /> : null}
                        </div>
                        <h3 className="text-base font-bold">{card.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            ))}

            <motion.div className="flex flex-wrap justify-center gap-x-6 gap-y-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.5 }}>
              {t.proofStrip.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60"><span className="text-primary">✔</span>{item}</span>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.ctaTitle}</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.ctaDesc}</p>
            <GlowCTA to="/book">{t.ctaBtn}</GlowCTA>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
    </>
  );
};

export default Process;
