import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cog, Link2, PieChart, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";


import { motion } from "framer-motion";
import serviceAutomation from "@/assets/service_automation_gen.png";
import serviceIntegration from "@/assets/service_integration_gen.png";
import serviceData from "@/assets/service_data_gen.png";

const services = [
  {
    icon: Cog,
    title: "Procesautomatisering",
    slug: "procesautomatisering",
    intro: "Wij automatiseren terugkerende processen zodat werk kan doorlopen zonder handmatige tussenstappen.",
    impact: [
      { title: "Minder handmatige verwerking", sub: "Tot 70% minder tijd besteed aan repetitieve taken." },
      { title: "Minder fouten", sub: "Gestandaardiseerde workflows zorgen voor consistente uitvoering." },
      { title: "Snellere doorlooptijden", sub: "Goedkeuringen en escalaties verlopen automatisch." },
      { title: "Schaalbaarheid", sub: "Processen kunnen groeien zonder dat personeelskosten evenredig toenemen." },
    ],
    image: serviceAutomation,
  },
  {
    icon: Link2,
    title: "Systeemintegraties",
    slug: "systeemintegraties",
    intro: "Wij koppelen systemen via API's zodat data automatisch en consistent wordt uitgewisseld.",
    impact: [
      { title: "Consistente datastromen", sub: "Kernsystemen werken met dezelfde actuele informatie." },
      { title: "Geen dubbele invoer", sub: "Data wordt één keer ingevoerd en automatisch gesynchroniseerd." },
      { title: "Realtime synchronisatie", sub: "Gegevens worden direct bijgewerkt zonder exports of handmatige bestanden." },
      { title: "Betrouwbare monitoring", sub: "Fouten worden vroegtijdig gedetecteerd en gelogd." },
    ],
    image: serviceIntegration,
  },
  {
    icon: PieChart,
    title: "Data & Rapportage",
    slug: "data-rapportage",
    intro: "Realtime dashboards en geautomatiseerde rapportages geven continu inzicht in prestaties en processen.",
    impact: [
      { title: "Direct inzicht in prestaties", sub: "Dashboards tonen actuele KPI's en trends." },
      { title: "Geautomatiseerde rapportages", sub: "Rapportages worden automatisch gegenereerd en verspreid." },
      { title: "Eén bron van waarheid", sub: "Alle teams werken met dezelfde consistente data." },
      { title: "Snelle signalering van afwijkingen", sub: "Problemen en afwijkingen worden vroegtijdig zichtbaar." },
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
          className="rounded-xl border border-primary/15 bg-card transition-all duration-300 ease-out overflow-hidden"
          style={{
            borderColor: hoveredIndex === i ? "hsl(var(--primary) / 0.4)" : undefined,
          }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
           <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center gap-0`}>
            {/* Text */}
              <div className="flex-1 px-4 py-8 sm:px-5 sm:py-10 flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <s.icon size={18} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{s.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{s.intro}</p>

              {/* Wat levert dit op? */}
              <div className="mb-2">
                <p className="text-xs font-semibold text-primary mb-1.5 tracking-widest uppercase">
                  Wat levert dit op?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {s.impact.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-card border border-primary/15 transition-all duration-300 ease-out group cursor-default"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08, duration: 0.4 }}
                      whileHover={{
                        scale: 1.03,
                        borderColor: "hsl(174, 78%, 41%, 0.5)",
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
              <Button asChild variant="link" size="sm" className="self-start text-primary px-0 hover:no-underline">
                <Link to={`/services#${s.slug}`}>
                  Bekijk meer over {s.title} <ArrowRight size={14} />
                </Link>
              </Button>

              {/* Security trust line */}
              <div className="mt-2 pt-1.5 border-t border-border/30">
                <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
                  Inclusief toegangsbeheer, logging en een overdraagbare architectuur.
                </p>
                <a href="#beveiliging" className="group inline-flex items-center gap-1 text-[11px] text-foreground/70 hover:text-primary/70 transition-colors mt-1">
                  Bekijk onze Beveiligingsaanpak
                  <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            {/* Image */}
            <div className="flex-1 relative overflow-hidden bg-card flex items-center justify-center min-h-[200px] md:min-h-0 aspect-[4/3] md:aspect-auto md:self-stretch">
              <motion.img
                src={s.image}
                alt={s.title}
                width={600}
                height={450}
                className="absolute inset-0 w-full h-full object-contain z-[1] scale-[1.5] dark:mix-blend-screen dark:invert-0 dark:hue-rotate-0 dark:brightness-[0.85] dark:opacity-85 invert hue-rotate-180 mix-blend-multiply brightness-100 opacity-80"
                animate={
                  hoveredIndex === i
                    ? { scale: 1.55 }
                    : { scale: 1.5 }
                }
                transition={{ duration: 0.35, ease: "easeOut" }}
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

        <div className="space-y-5 sm:space-y-6 mb-12">
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
