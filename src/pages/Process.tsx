import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, FileText, BarChart3, Shield } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AmbientLight from "@/components/AmbientLight";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const phases = [
  {
    step: "Fase 1",
    title: "Analyse & Prioritering",
    timing: "Week 1",
    deliverables: [
      "Procesinventarisatie",
      "Prioriteitenlijst",
      "Scope + KPI-definitie",
    ],
  },
  {
    step: "Fase 2",
    title: "Architectuur & Blueprint",
    timing: "Week 2",
    deliverables: [
      "Architectuuroverzicht",
      "Integratieschema",
      "Datastroom-definitie",
      "Impactinschatting",
    ],
  },
  {
    step: "Fase 3",
    title: "Build & Integratie",
    timing: "Week 3–5",
    deliverables: [
      "Werkende automatiseringen",
      "API-integraties",
      "Logging & foutafhandeling",
      "Testomgeving",
    ],
  },
  {
    step: "Fase 4",
    title: "Validatie & Livegang",
    timing: "Week 5–6",
    deliverables: [
      "End-to-end tests",
      "Performancevalidatie",
      "Documentatie",
      "Overdrachtsmoment",
    ],
  },
  {
    step: "Fase 5",
    title: "Monitoring & Optimalisatie",
    timing: "Doorlopend",
    deliverables: [
      "Monitoring & alerts",
      "Optimalisatierondes",
      "Doorontwikkelvoorstellen",
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

const PhaseCard = ({
  phase,
  index,
  total,
}: {
  phase: (typeof phases)[0];
  index: number;
  total: number;
}) => {
  const isLast = index === total - 1;

  return (
    <motion.div
      className="relative flex gap-6 sm:gap-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center shrink-0 w-8">
        {/* Dot */}
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-primary bg-background z-10 shrink-0"
          whileInView={{
            boxShadow: "0 0 12px hsl(174 78% 41% / 0.5), 0 0 24px hsl(174 78% 41% / 0.2)",
            backgroundColor: "hsl(174, 78%, 41%)",
          }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        />
        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="w-px flex-1 bg-border mt-0"
            whileInView={{ backgroundColor: "hsl(174, 78%, 41%)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
          />
        )}
        {/* Arrow between phases */}
        {!isLast && (
          <motion.div
            className="text-primary text-xs my-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            ▾
          </motion.div>
        )}
      </div>

      {/* Content card */}
      <motion.div
        className="flex-1 rounded-xl border border-border bg-card p-6 sm:p-8 mb-8 group cursor-default transition-all duration-300"
        whileHover={{
          y: -4,
          scale: 1.01,
          borderColor: "hsl(174, 78%, 41%, 0.4)",
          boxShadow:
            "0 0 20px hsl(174, 78%, 41%, 0.12), 0 0 40px hsl(174, 78%, 41%, 0.06), inset 0 0 12px hsl(174, 78%, 41%, 0.03)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
              {phase.step}
            </span>
            <h3 className="text-lg sm:text-xl font-bold mt-2">{phase.title}</h3>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full shrink-0 self-start">
            {phase.timing}
          </span>
        </div>

        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3 font-semibold">
          Deliverables
        </p>
        <ul className="space-y-2">
          {phase.deliverables.map((d) => (
            <li
              key={d}
              className="text-sm text-foreground/80 flex items-start gap-2"
            >
              <span className="text-primary mt-0.5 shrink-0">▸</span>
              {d}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

const Process = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <AmbientLight />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Hero */}
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-20">
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

          {/* Timeline */}
          <div ref={timelineRef} className="max-w-2xl mx-auto mb-20 relative">
            {/* Scroll-reactive progress line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border z-0">
              <motion.div
                className="w-full bg-primary origin-top"
                style={{ height: lineHeight }}
              />
            </div>

            {phases.map((phase, i) => (
              <PhaseCard
                key={phase.step}
                phase={phase}
                index={i}
                total={phases.length}
              />
            ))}
          </div>

          {/* Security & Reliability Block */}
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

          {/* CTA */}
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
    </Layout>
  );
};

export default Process;
