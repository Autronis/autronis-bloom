import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cog, Link2, PieChart, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

import { motion } from "framer-motion";
import serviceAutomation from "@/assets/service_automation_gen.png";
import serviceIntegration from "@/assets/service_integration_gen.png";
import serviceData from "@/assets/service_data_gen.png";

const services = [
  {
    icon: Cog,
    title: "Procesautomatisering",
    slug: "procesautomatisering",
    intro: "Wij automatiseren terugkerende processen zodat werk doorloopt zonder handmatige tussenstappen.",
    impact: [
      { title: "Tot 70% minder handmatige verwerkingstijd", sub: "Routinetaken worden volledig geautomatiseerd" },
      { title: "Foutreductie door gestandaardiseerde workflows", sub: "Consistente uitvoering zonder menselijke fouten" },
      { title: "Snellere doorlooptijden bij goedkeuringen", sub: "Escalaties en approvals verlopen automatisch" },
      { title: "Schaalbaarheid zonder extra personeel", sub: "Groei zonder lineaire personeelskosten" },
    ],
    image: serviceAutomation,
  },
  {
    icon: Link2,
    title: "Systeemintegraties",
    slug: "systeemintegraties",
    intro: "Wij koppelen systemen via API's zodat data automatisch en consistent stroomt.",
    impact: [
      { title: "Eén consistente datastroom tussen kernsystemen", sub: "Alle data synchroon en betrouwbaar" },
      { title: "Eliminatie van dubbele data-invoer", sub: "Eénmalig invoeren, overal beschikbaar" },
      { title: "Realtime synchronisatie zonder exports", sub: "Geen handmatige CSV- of Excel-exports meer" },
      { title: "Proactieve foutdetectie en logging", sub: "Problemen worden gesignaleerd vóór ze escaleren" },
    ],
    image: serviceIntegration,
  },
  {
    icon: PieChart,
    title: "Data & Rapportage",
    slug: "data-rapportage",
    intro: "Realtime dashboards en geautomatiseerde rapportages voor volledig inzicht.",
    impact: [
      { title: "Direct inzicht in KPI's en prestaties", sub: "Realtime dashboards altijd up-to-date" },
      { title: "Geautomatiseerde rapportages zonder handmatig werk", sub: "Wekelijks, maandelijks of op maat" },
      { title: "Eén bron van waarheid voor alle bedrijfsdata", sub: "Geen conflicterende spreadsheets meer" },
      { title: "Vroegtijdige detectie van afwijkingen", sub: "Anomalieën worden direct gesignaleerd" },
    ],
    image: serviceData,
  },
];

const ServiceCard = ({
  s,
  i,
  hoveredIndex,
  setHoveredIndex,
}: {
  s: (typeof services)[0];
  i: number;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) => {
  const isEven = i % 2 === 0;

  return (
    <ScrollReveal key={s.title}>
      <ScrollRevealItem>
         <div
          className="rounded-xl border border-border bg-card"
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 sm:gap-8`}>
            {/* Text */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <s.icon size={18} />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">{s.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{s.intro}</p>

              {/* Wat levert dit op? */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                  Wat levert dit op?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {s.impact.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-primary/[0.04] hover:bg-primary/[0.08] transition-all duration-200 group"
                      style={{
                        border: "1px solid hsl(174, 78%, 41%, 0.2)",
                        boxShadow: "0 0 8px hsl(174, 78%, 41%, 0.08)",
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      whileHover={{
                        borderColor: "hsl(174, 78%, 41%, 0.45)",
                        boxShadow: "0 0 12px hsl(174, 78%, 41%, 0.15), inset 0 0 8px hsl(174, 78%, 41%, 0.03)",
                      }}
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                        <CheckCircle2 size={12} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA to service page */}
              <Button asChild variant="outline" size="sm" className="self-start border-primary/30 text-primary hover:bg-primary/10">
                <Link to={`/services#${s.slug}`}>
                  Bekijk meer over {s.title} <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
            {/* Image */}
            <div className={`flex-1 ${i === 0 ? 'min-h-[340px] sm:min-h-[460px]' : 'min-h-[220px] sm:min-h-[280px]'} relative overflow-hidden rounded-xl bg-white dark:bg-background`}>
              {/* Glow only on hover */}
              <motion.div
                className="absolute inset-0 z-[2] pointer-events-none"
                animate={{ opacity: hoveredIndex === i ? 0.18 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15), transparent 70%)" }}
              />
              <motion.img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover relative z-[1] dark:mix-blend-screen"
                animate={
                  hoveredIndex === i
                    ? { scale: 1.06, filter: `brightness(calc(1.12 + (1 - var(--img-invert)) * 0.18)) saturate(1.1) invert(var(--img-invert)) hue-rotate(var(--img-hue))` }
                    : { scale: 1, filter: `brightness(calc(1 + (1 - var(--img-invert)) * 0.18)) saturate(1) invert(var(--img-invert)) hue-rotate(var(--img-hue))` }
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
                loading="lazy"
              />
              {/* Edge gradient overlay */}
              <div
                className="absolute inset-0 z-[3] pointer-events-none"
                style={{
                  background: isEven
                    ? "linear-gradient(to right, hsl(var(--card)) 0%, transparent 25%)"
                    : "linear-gradient(to left, hsl(var(--card)) 0%, transparent 25%)",
                }}
              />
              <div
                className="absolute inset-0 z-[3] pointer-events-none"
                style={{ background: "linear-gradient(to bottom, hsl(var(--card)) 0%, transparent 8%, transparent 92%, hsl(var(--card)) 100%)" }}
              />
              {/* Hover glow overlay */}
              <motion.div
                className="absolute inset-0 z-[4] pointer-events-none"
                animate={{ opacity: hoveredIndex === i ? 0.15 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.3), transparent 60%)" }}
              />
            </div>
          </div>
        </div>
      </ScrollRevealItem>
    </ScrollReveal>
  );
};

const ServicePillars = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      <AmbientLight />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Drie pijlers. Één geïntegreerd systeem.</h2>
            <p className="text-muted-foreground">
              Wij combineren procesautomatisering, systeemintegraties en data-inzichten tot een schaalbare architectuur.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        <div className="space-y-8 sm:space-y-12 mb-12">
          {services.map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
          ))}
        </div>

        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Button asChild size="lg">
              <Link to="/services">
                Bekijk onze services <ArrowRight size={18} />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Ontdek hoe wij uw processen, systemen en data-inzichten structureel verbeteren.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicePillars;
