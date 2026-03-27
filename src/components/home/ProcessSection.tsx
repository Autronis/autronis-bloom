import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Brain, Layers, Cog, ScanSearch, Rocket, RefreshCw } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Approach",
    title: "From analysis to go-live",
    subtitle: "Structured. Predictable. Scalable.",
    securityNote: "Security and data quality are integrated into every phase.",
    ctaBtn: "View our full process",
    phases: [
      { title: "Analysis", desc: "Mapping processes & data flows" },
      { title: "Design", desc: "Scalable system architecture" },
      { title: "Build", desc: "Modular development & testing" },
      { title: "Validate", desc: "Stability & edge case testing" },
      { title: "Go-Live", desc: "Controlled launch & handover" },
      { title: "Grow", desc: "Monitor, optimize & scale" },
    ],
  },
  nl: {
    label: "Aanpak",
    title: "Van analyse tot go-live",
    subtitle: "Gestructureerd. Voorspelbaar. Schaalbaar.",
    securityNote: "Beveiliging en datakwaliteit zijn geïntegreerd in elke fase.",
    ctaBtn: "Bekijk ons volledige proces",
    phases: [
      { title: "Analyse", desc: "Processen & datastromen in kaart" },
      { title: "Ontwerp", desc: "Schaalbare systeemarchitectuur" },
      { title: "Bouw", desc: "Modulaire ontwikkeling & testen" },
      { title: "Validatie", desc: "Stabiliteit & edge cases" },
      { title: "Go-Live", desc: "Gecontroleerde launch & overdracht" },
      { title: "Groei", desc: "Monitoren, optimaliseren & schalen" },
    ],
  },
};

const phaseIcons = [Brain, Layers, Cog, ScanSearch, Rocket, RefreshCw];

const ProcessSection = () => {
  const lang = useLanguage();
  const t = text[lang];
  const [activeStep, setActiveStep] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Activate steps one by one when section is in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let done = false;

    const onScroll = () => {
      if (done) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
        done = true;
        setHasScrolled(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { done = true; window.removeEventListener("scroll", onScroll); };
  }, []);

  // Stagger step activation
  useEffect(() => {
    if (!hasScrolled) return;
    const timers = t.phases.map((_, i) =>
      setTimeout(() => setActiveStep(i), 600 + i * 700)
    );
    return () => timers.forEach(clearTimeout);
  }, [hasScrolled, t.phases]);

  return (
    <section className="py-10 sm:py-20 border-t border-border relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t.title}</h2>
            <p className="text-sm sm:text-base text-muted-foreground">{t.subtitle}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Horizontal step flow */}
        <div className="max-w-4xl mx-auto mb-8">
          {/* Progress line with glowing dots */}
          <div className="relative h-0.5 bg-border/30 rounded-full mx-6 sm:mx-12 mb-8">
            {/* Animated fill */}
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(174 78% 41% / 0.3), hsl(174 78% 41% / 0.7))" }}
              initial={{ width: "0%" }}
              animate={{ width: hasScrolled ? "100%" : "0%" }}
              transition={{ duration: 4.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            {/* Glow sweep on the line */}
            {hasScrolled && (
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-12 h-4 rounded-full blur-md"
                style={{ background: "hsl(174 78% 50% / 0.4)" }}
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 4.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )}
            {/* Step dots */}
            {t.phases.map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${(i / (t.phases.length - 1)) * 100}%` }}
              >
                {/* Outer glow ring */}
                <motion.div
                  className="absolute -inset-1.5 rounded-full"
                  style={{ background: "hsl(174 78% 41% / 0.15)" }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={activeStep >= i ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                />
                {/* Main dot */}
                <motion.div
                  className="relative rounded-full"
                  initial={{ scale: 0 }}
                  animate={activeStep >= i
                    ? { scale: activeStep === i ? 1.3 : 1 }
                    : { scale: 0 }
                  }
                  transition={{ type: "spring", stiffness: 250, damping: 12 }}
                  style={{
                    width: 10,
                    height: 10,
                    background: activeStep >= i
                      ? "radial-gradient(circle, hsl(174 78% 50%), hsl(174 78% 35%))"
                      : "hsl(var(--border))",
                    boxShadow: activeStep >= i
                      ? "0 0 12px hsl(174 78% 41% / 0.6), 0 0 4px hsl(174 78% 41% / 0.3)"
                      : "none",
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {t.phases.map((phase, i) => {
              const Icon = phaseIcons[i];
              const isActive = activeStep >= i;

              return (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mx-auto mb-2 flex items-center justify-center"
                    style={{
                      backgroundColor: isActive ? "hsl(174 78% 41% / 0.15)" : "hsl(var(--muted))",
                      boxShadow: activeStep === i ? "0 0 20px hsl(174 78% 41% / 0.35)" : isActive ? "0 0 10px hsl(174 78% 41% / 0.15)" : "none",
                    }}
                    animate={activeStep === i
                      ? { scale: [1, 1.2, 1.1], transition: { duration: 0.6 } }
                      : { scale: isActive ? 1 : 0.85 }
                    }
                  >
                    <Icon
                      size={activeStep === i ? 22 : 18}
                      className="transition-all duration-300"
                      style={{ color: isActive ? "hsl(174, 78%, 41%)" : "hsl(var(--muted-foreground))" }}
                    />
                  </motion.div>
                  {/* Step number */}
                  <p className="text-[10px] font-bold text-primary mb-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-semibold leading-tight mb-0.5">{phase.title}</h3>
                  {/* Description — hidden on mobile for compactness */}
                  <p className="text-[10px] text-muted-foreground leading-tight hidden sm:block">{phase.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Security + CTA */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-4">
            <ShieldCheck size={13} className="text-primary" />
            <span>{t.securityNote}</span>
          </div>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/process">{t.ctaBtn}<ArrowRight size={18} /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
