import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cog, Link2, PieChart, ChevronDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";
import { motion, AnimatePresence } from "framer-motion";
import serviceAutomation from "@/assets/service_automation_gen.png";
import serviceIntegration from "@/assets/service_integration_gen.png";
import serviceData from "@/assets/service_data_gen.png";

const services = [
  {
    icon: Cog,
    title: "Procesautomatisering",
    intro: "Wij automatiseren terugkerende processen zodat werk doorloopt zonder handmatige tussenstappen.",
    impact: [
      "Tot 70% minder handmatige verwerkingstijd",
      "Foutreductie door gestandaardiseerde workflows",
      "Snellere doorlooptijden bij goedkeuringen en escalaties",
      "Schaalbaarheid zonder extra personeel",
    ],
    toepassingen: [
      {
        label: "Interne Workflow Automatisering",
        items: ["Goedkeuringsflows", "Taaktoewijzing", "Notificaties en escalaties", "Documentgeneratie"],
      },
      {
        label: "Sales- en Orderautomatisering",
        items: ["Orderverwerking", "CRM-updates", "Facturatie workflows", "Leadopvolging"],
      },
      {
        label: "Onboarding & Offboarding",
        items: ["Accountcreatie", "Checklist automatisering", "Rolgebaseerde toegangsrechten", "E-signature integraties"],
      },
      {
        label: "E-commerce Automatisering",
        items: ["Voorraadbeheer", "Retourafhandeling", "Orderstatus synchronisatie", "Dynamische pricing"],
      },
    ],
    image: serviceAutomation,
  },
  {
    icon: Link2,
    title: "Systeemintegraties",
    intro: "Wij koppelen systemen via API's zodat data automatisch en consistent stroomt.",
    impact: [
      "Eén consistente datastroom tussen alle kernsystemen",
      "Eliminatie van dubbele data-invoer",
      "Realtime synchronisatie zonder handmatige exports",
      "Proactieve foutdetectie en logging",
    ],
    toepassingen: [
      {
        label: "API Koppelingen",
        items: ["REST API integraties", "Webhooks", "Event-based triggers", "Retry-logica"],
      },
      {
        label: "CRM & Finance Integraties",
        items: ["CRM ↔ Boekhouding synchronisatie", "ERP koppelingen", "Grootboekkoppelingen", "Realtime data-uitwisseling"],
      },
      {
        label: "Legacy Systemen",
        items: ["Datamigraties", "Middleware implementatie", "Maatwerk API lagen", "Systeemmodernisering"],
      },
      {
        label: "Monitoring & Logging",
        items: ["Foutdetectie", "Audit logging", "Datavalidatie", "Integratie monitoring"],
      },
    ],
    image: serviceIntegration,
  },
  {
    icon: PieChart,
    title: "Data & Rapportage",
    intro: "Realtime dashboards en geautomatiseerde rapportages voor volledig inzicht.",
    impact: [
      "Direct inzicht in KPI's en prestaties",
      "Geautomatiseerde rapportages zonder handmatig werk",
      "Eén bron van waarheid voor alle bedrijfsdata",
      "Vroegtijdige detectie van afwijkingen en risico's",
    ],
    toepassingen: [
      {
        label: "KPI Dashboards",
        items: ["Management dashboards", "Team dashboards", "Realtime visualisaties", "Performance monitoring"],
      },
      {
        label: "Geautomatiseerde Rapportages",
        items: ["Wekelijkse exports", "PDF rapportages", "E-mail distributie", "Custom rapportageflows"],
      },
      {
        label: "Dataconsolidatie",
        items: ["Multi-source data", "Eén bron van waarheid", "Datamodel optimalisatie", "Datakwaliteitscontrole"],
      },
      {
        label: "Alerts & Monitoring",
        items: ["Anomaly detection", "Performance alerts", "SLA bewaking", "Datastroom monitoring"],
      },
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
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollReveal key={s.title}>
      <ScrollRevealItem>
        <GlowCard
          className="rounded-xl border border-border bg-card"
          isAnyHovered={hoveredIndex !== null}
          isHovered={hoveredIndex === i}
          onHover={() => setHoveredIndex(i)}
          onLeave={() => setHoveredIndex(null)}
        >
          <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 sm:gap-8`}>
            {/* Text */}
            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <s.icon size={18} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{s.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{s.intro}</p>

              {/* Wat levert dit op? */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                  Wat levert dit op?
                </p>
                <ul className="space-y-2">
                  {s.impact.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expandable toggle */}
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200 group self-start"
              >
                <span>Bekijk concrete toepassingen</span>
                <ChevronDown
                  size={16}
                  className="transition-transform duration-300 ease-out"
                  style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              <AnimatePresence>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 space-y-4 pt-4 border-t border-border">
                      {s.toepassingen.map((cat) => (
                        <div key={cat.label}>
                          <p className="text-sm font-medium text-foreground mb-2">{cat.label}</p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {cat.items.map((item) => (
                              <span key={item} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                                <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Image */}
            <div className="flex-1 min-h-[220px] sm:min-h-[280px] relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-background" />
              {/* Subtle pulsing glow */}
              <motion.div
                className="absolute inset-0 z-[2] pointer-events-none"
                animate={{
                  opacity: [0, 0.18, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.3,
                }}
                style={{
                  background: "radial-gradient(ellipse at center, hsl(174 78% 41% / 0.15), transparent 70%)",
                }}
              />
              <motion.img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover relative z-[1]"
                animate={
                  hoveredIndex === i
                    ? { scale: 1.03, filter: "brightness(1.1)" }
                    : { scale: 1, filter: "brightness(1)" }
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
              {/* Top/bottom fade */}
              <div
                className="absolute inset-0 z-[3] pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, hsl(var(--card)) 0%, transparent 8%, transparent 92%, hsl(var(--card)) 100%)",
                }}
              />
            </div>
          </div>
        </GlowCard>
      </ScrollRevealItem>
    </ScrollReveal>
  );
};

const ServicePillars = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      {/* Blurred bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "15%", y: "20%", size: 300, opacity: 0.11, delay: 0 },
          { x: "80%", y: "15%", size: 260, opacity: 0.1, delay: 1.2 },
          { x: "50%", y: "50%", size: 340, opacity: 0.09, delay: 0.6 },
          { x: "25%", y: "75%", size: 240, opacity: 0.11, delay: 1.8 },
          { x: "70%", y: "80%", size: 280, opacity: 0.1, delay: 2.2 },
          { x: "90%", y: "40%", size: 220, opacity: 0.11, delay: 0.4 },
          { x: "5%", y: "55%", size: 200, opacity: 0.09, delay: 3 },
          { x: "60%", y: "30%", size: 220, opacity: 0.08, delay: 1.6 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [b.opacity, b.opacity * 1.8, b.opacity],
            }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
            }}
            style={{
              left: b.x,
              top: b.y,
              width: b.size,
              height: b.size,
              background: `radial-gradient(circle, hsl(174 78% 41% / ${b.opacity}), transparent 70%)`,
              filter: "blur(50px)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Drie pijlers. Één geïntegreerd systeem.
            </h2>
            <p className="text-muted-foreground">
              Wij combineren procesautomatisering, systeemintegraties en data-inzichten tot
              een schaalbare architectuur.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        <div className="space-y-8 sm:space-y-12 mb-12">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              s={s}
              i={i}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>

        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Button asChild size="lg">
              <Link to="/services">
                Bekijk onze services
                <ArrowRight size={18} />
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
