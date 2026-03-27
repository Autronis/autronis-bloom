import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Brain, Layers, Cog, ScanSearch, Rocket, RefreshCw } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import useCanHover from "@/hooks/use-can-hover";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Approach",
    title: "From analysis to go-live",
    subtitle: "Structured. Predictable. Scalable.",
    securityNote: "Security and data quality are integrated into every phase.",
    securityLink: "View security approach",
    ctaBtn: "View our full process",
    ctaSub: "Our proven approach: from strategic analysis to sustainable optimization.",
    phases: [
      { step: "01", title: "Analysis & Architecture", desc: "Mapping processes, systems and data flows to find the highest-impact automation opportunities." },
      { step: "02", title: "Design & Structure", desc: "Designing a scalable system structure before development begins." },
      { step: "03", title: "Build & Implementation", desc: "Modular development with continuous testing of integrations and workflows." },
      { step: "04", title: "Validation & Testing", desc: "Testing stability, performance and edge cases before go-live." },
      { step: "05", title: "Go-Live & Handover", desc: "Controlled launch with complete documentation and ownership transfer." },
      { step: "06", title: "Continuous Growth", desc: "Monitoring, optimizing and scaling automations as your business grows." },
    ],
  },
  nl: {
    label: "Aanpak",
    title: "Van analyse tot go-live",
    subtitle: "Gestructureerd. Voorspelbaar. Schaalbaar.",
    securityNote: "Beveiliging en datakwaliteit zijn geïntegreerd in elke fase.",
    securityLink: "Bekijk beveiligingsaanpak",
    ctaBtn: "Bekijk ons volledige proces",
    ctaSub: "Onze bewezen aanpak: van strategische analyse tot duurzame optimalisatie.",
    phases: [
      { step: "01", title: "Analyse & Architectuur", desc: "Processen, systemen en datastromen in kaart brengen om de grootste automatiseringskansen te vinden." },
      { step: "02", title: "Ontwerp & Structuur", desc: "Een schaalbare systeemstructuur ontwerpen voordat de ontwikkeling begint." },
      { step: "03", title: "Bouw & Implementatie", desc: "Modulaire ontwikkeling met continu testen van integraties en workflows." },
      { step: "04", title: "Validatie & Testen", desc: "Stabiliteit, performance en edge cases testen vóór go-live." },
      { step: "05", title: "Go-Live & Overdracht", desc: "Gecontroleerde launch met volledige documentatie en eigendomsoverdracht." },
      { step: "06", title: "Doorontwikkeling", desc: "Monitoren, optimaliseren en schalen naarmate je bedrijf groeit." },
    ],
  },
};

const phaseIcons = [Brain, Layers, Cog, ScanSearch, Rocket, RefreshCw];

const ProcessSection = () => {
  const lang = useLanguage();
  const t = text[lang];
  const canHover = useCanHover();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-10 sm:py-20 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-6 sm:mb-12">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t.title}</h2>
            <p className="text-sm sm:text-base text-muted-foreground">{t.subtitle}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Horizontal grid — 3 columns, 2 rows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8">
          {t.phases.map((phase, i) => {
            const Icon = phaseIcons[i];
            const isHovered = canHover && hoveredIndex === i;

            return (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                onMouseEnter={canHover ? () => setHoveredIndex(i) : undefined}
                onMouseLeave={canHover ? () => setHoveredIndex(null) : undefined}
                className="relative rounded-xl border border-border bg-gradient-to-br from-primary/[0.06] to-card p-3 sm:p-4 transition-all duration-200"
                style={{
                  borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : undefined,
                  boxShadow: isHovered ? "0 0 20px hsl(174 78% 41% / 0.12)" : "none",
                }}
              >
                {/* Step number + icon row */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center text-primary shrink-0">
                    <Icon size={14} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-bold text-primary tracking-wider">{phase.step}</span>
                </div>
                <h3 className="font-semibold text-sm leading-tight mb-1">{phase.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{phase.desc}</p>

                {/* Connecting arrow (except last in each row) */}
                {i !== 2 && i !== 5 && (
                  <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 text-primary/30 hidden sm:block">
                    <ArrowRight size={12} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Security note */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-muted-foreground mb-6">
          <div className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-primary" /><span>{t.securityNote}</span></div>
          <a href="#beveiliging" className="group flex items-center gap-1 text-muted-foreground/70 hover:text-primary/80 transition-colors">{t.securityLink}<ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" /></a>
        </div>

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
