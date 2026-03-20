import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Brain, Layers, Cog, ScanSearch, Rocket, RefreshCw, Check } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import useCanHover from "@/hooks/use-can-hover";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Approach",
    title: "From analysis to go-live",
    subtitle: "Structured. Predictable. Scalable.",
    securityNote: "Security and data quality are integrated into every phase — with minimal access permissions, logging, and complete documentation.",
    securityLink: "View security approach",
    ctaBtn: "View our full process",
    ctaSub: "Our proven approach: from strategic analysis to sustainable, data-driven optimization.",
    phases: [
      { step: "01", title: "Analysis & Architecture", description: "We analyze processes, systems, and data flows to determine where automation has the greatest impact. Based on this, we define an evidence-based automation strategy." },
      { step: "02", title: "Design & Structure", description: "We design a scalable system structure where integrations, data flows, and access controls are logically organized before development begins." },
      { step: "03", title: "Build & Implementation", description: "Automations are developed modularly and connected to your existing systems. During the build, integrations and workflows are continuously tested." },
      { step: "04", title: "Validation & Optimization", description: "We test stability, performance, and edge cases so automations function reliably before going live." },
      { step: "05", title: "Go-Live & Handover", description: "We execute a controlled go-live and deliver complete documentation so your organization remains the owner of the system." },
      { step: "06", title: "Continuous Development & Support", description: "After go-live, we continue to monitor and optimize systems so automations keep pace with new processes and growth." },
    ],
    stepLabel: "Step",
  },
  nl: {
    label: "Aanpak",
    title: "Van analyse tot go-live",
    subtitle: "Gestructureerd. Voorspelbaar. Schaalbaar.",
    securityNote: "Beveiliging en datakwaliteit zijn geïntegreerd in elke fase — met minimale toegangsrechten, logging en volledige documentatie.",
    securityLink: "Bekijk beveiligingsaanpak",
    ctaBtn: "Bekijk ons volledige proces",
    ctaSub: "Onze bewezen aanpak: van strategische analyse tot duurzame, datagedreven optimalisatie.",
    phases: [
      { step: "01", title: "Analyse & Architectuur", description: "We analyseren processen, systemen en datastromen om te bepalen waar automatisering de grootste impact heeft. Op basis hiervan definiëren we een onderbouwde automatiseringsstrategie." },
      { step: "02", title: "Ontwerp & Structuur", description: "We ontwerpen een schaalbare systeemstructuur waarin integraties, datastromen en toegangscontroles logisch georganiseerd zijn voordat de ontwikkeling begint." },
      { step: "03", title: "Bouw & Implementatie", description: "Automatiseringen worden modulair ontwikkeld en gekoppeld aan je bestaande systemen. Tijdens de bouw worden integraties en workflows continu getest." },
      { step: "04", title: "Validatie & Optimalisatie", description: "We testen stabiliteit, performance en edge cases zodat automatiseringen betrouwbaar functioneren vóór go-live." },
      { step: "05", title: "Go-Live & Overdracht", description: "We voeren een gecontroleerde go-live uit en leveren volledige documentatie zodat jouw organisatie eigenaar blijft van het systeem." },
      { step: "06", title: "Doorontwikkeling & Ondersteuning", description: "Na go-live blijven we systemen monitoren en optimaliseren zodat automatiseringen meegroeien met nieuwe processen en groei." },
    ],
    stepLabel: "Stap",
  },
};

const phaseIcons = [Brain, Layers, Cog, ScanSearch, Rocket, RefreshCw];

// Per-phase icon animations that trigger when card becomes active
const iconAnimations: Record<number, { animate: Record<string, number[]>; transition: Record<string, unknown> }> = {
  0: { // Brain — pulse scale
    animate: { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  1: { // Layers — bounce stack
    animate: { y: [0, -4, 0, -2, 0] },
    transition: { duration: 1.8, repeat: Infinity, repeatDelay: 2 },
  },
  2: { // Cog — spin
    animate: { rotate: [0, 360] },
    transition: { duration: 4, repeat: Infinity, ease: "linear" },
  },
  3: { // ScanSearch — scan pulse
    animate: { scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
  4: { // Rocket — shake then launch
    animate: { y: [0, -2, 2, -2, 0, -6, -12, -6, 0], rotate: [0, -3, 3, -2, 0, 0, 0, 0, 0], scale: [1, 1, 1, 1, 1, 1.15, 1.25, 1.15, 1] },
    transition: { duration: 2.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" },
  },
  5: { // RefreshCw — continuous rotate
    animate: { rotate: [0, 360] },
    transition: { duration: 3, repeat: Infinity, ease: "linear" },
  },
};

const TimelineCard = ({ phase, index, isActive, hoveredIndex, onHover, onLeave, canHover, stepLabel }: {
  phase: { step: string; title: string; description: string }; index: number; isActive: boolean; hoveredIndex: number | null; onHover: () => void; onLeave: () => void; canHover: boolean; stepLabel: string;
}) => {
  const isHovered = canHover && hoveredIndex === index;
  const isAnyHovered = canHover && hoveredIndex !== null;
  const Icon = phaseIcons[index];
  const iconAnim = iconAnimations[index];

  return (
    <div onMouseEnter={canHover ? onHover : undefined} onMouseLeave={canHover ? onLeave : undefined} className="relative rounded-xl border border-border bg-gradient-to-br from-primary/[0.06] to-card p-4 sm:p-6 cursor-pointer overflow-hidden" style={{ opacity: isAnyHovered && !isHovered ? 0.88 : 1, borderColor: isActive || isHovered ? "hsl(var(--primary) / 0.5)" : undefined, boxShadow: isActive || isHovered ? "0 0 20px hsl(174 78% 41% / 0.12)" : "none", transition: "opacity 500ms ease-out, border-color 500ms ease-out, box-shadow 500ms ease-out" }}>
      {/* Rocket particles for step 05 */}
      {index === 4 && isActive && (
        <>
          {[0, 1, 2].map((p) => (
            <motion.div
              key={p}
              className="absolute w-1 h-1 rounded-full bg-primary/50"
              style={{ left: 20 + p * 6, top: 36 }}
              animate={{ y: [0, 20, 40], opacity: [0.8, 0.4, 0], scale: [1, 0.6, 0.2] }}
              transition={{ duration: 1.2, delay: p * 0.2, repeat: Infinity, repeatDelay: 4, ease: "easeOut" }}
            />
          ))}
        </>
      )}
      <div className="relative z-10">
        <motion.div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 sm:mb-3 transition-colors duration-500"
          style={{
            backgroundColor: isActive ? "hsl(var(--primary) / 0.2)" : "hsl(var(--primary) / 0.1)",
            boxShadow: isActive ? "0 0 16px hsl(174, 78%, 41%, 0.25)" : "none",
          }}
          animate={isActive ? iconAnim.animate : {}}
          transition={isActive ? iconAnim.transition : {}}
        >
          <Icon size={18} strokeWidth={2.5} className="text-primary" />
        </motion.div>
        <p className="text-xs font-bold text-primary mb-1">{stepLabel} {phase.step}</p>
        <h3 className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2">{phase.title}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{phase.description}</p>
      </div>
    </div>
  );
};

const ProcessSection = () => {
  const lang = useLanguage();
  const t = text[lang];
  const canHover = useCanHover();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!sectionRef.current || !timelineRef.current) return;
        const viewportH = window.innerHeight;
        let newActive = -1;
        let targetFillHeight = 0;
        cardRefs.current.forEach((ref, i) => { if (!ref) return; const cardRect = ref.getBoundingClientRect(); if (cardRect.top + cardRect.height * 0.3 < viewportH * 0.45) newActive = i; });
        if (newActive >= 0 && timelineRef.current) { const timelineRect = timelineRef.current.getBoundingClientRect(); const activeCard = cardRefs.current[newActive]; if (activeCard) { targetFillHeight = activeCard.getBoundingClientRect().top + 20 - timelineRect.top; } }
        setActiveIndex(newActive);
        setFillHeight(Math.max(0, targetFillHeight));
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="py-10 sm:py-24 border-t border-border relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-6 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t.title}</h2>
            <p className="text-sm sm:text-base text-muted-foreground">{t.subtitle}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto" ref={timelineRef}>
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border hidden sm:block">
            <div className="w-full bg-primary rounded-full" style={{ height: `${fillHeight}px`, transition: "height 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }} />
          </div>
          <div className="space-y-4 sm:space-y-8">
            {t.phases.map((phase, i) => (
              <div key={phase.step} ref={(el) => (cardRefs.current[i] = el)} className="flex items-start gap-2 sm:gap-6" style={{ scrollMarginTop: "100px" }}>
                <div className="hidden sm:flex flex-col items-center shrink-0 relative z-10">
                  <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold" style={{ borderColor: activeIndex >= i ? "hsl(var(--primary))" : "hsl(var(--border))", backgroundColor: activeIndex >= i ? "hsl(var(--primary))" : "hsl(var(--card))", color: activeIndex >= i ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))", boxShadow: activeIndex >= i ? "0 0 16px hsl(174 78% 41% / 0.45)" : "none", transition: "all 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>{phase.step}</div>
                </div>
                <div className="flex-1">
                  <TimelineCard phase={phase} index={i} isActive={activeIndex === i} hoveredIndex={hoveredIndex} onHover={() => setHoveredIndex(i)} onLeave={() => setHoveredIndex(null)} canHover={canHover} stepLabel={t.stepLabel} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <ScrollReveal className="mt-10">
          <ScrollRevealItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-muted-foreground mb-8">
              <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-primary" /><span>{t.securityNote}</span></div>
              <a href="#beveiliging" className="group flex items-center gap-1 text-muted-foreground/70 hover:text-primary/80 transition-colors whitespace-nowrap shrink-0">{t.securityLink}<ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" /></a>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/process">{t.ctaBtn}<ArrowRight size={18} /></Link></Button>
            <p className="text-xs text-muted-foreground mt-3">{t.ctaSub}</p>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProcessSection;
