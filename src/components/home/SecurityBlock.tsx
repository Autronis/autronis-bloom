import { Shield, Database, FileCheck } from "lucide-react";
import { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import AmbientLight from "@/components/AmbientLight";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const layers = [
  {
    icon: Shield,
    label: "Laag 1",
    title: "Architectuurlaag",
    intro: "De basis waarop alles rust.",
    points: [
      "Least-privilege toegangsmodel als standaard",
      "Rol- en recordniveau beveiliging (Row Level Security)",
      "Gescheiden omgevingen (ontwikkeling, test, productie)",
      "API-gebaseerde integraties met gecontroleerde toegang",
      "Geen vendor lock-in of verborgen afhankelijkheden",
    ],
    closing: "Hier bepalen we hoe systemen communiceren en wie toegang krijgt — vóórdat er data stroomt.",
  },
  {
    icon: Database,
    label: "Laag 2",
    title: "Datalaag",
    intro: "Bescherming van uw bedrijfsgegevens.",
    points: [
      "End-to-end versleuteling (TLS 1.2+ tijdens transport, AES-256 bij opslag)",
      "Verwerking en opslag binnen de EU waar mogelijk",
      "Geen AI-training op uw bedrijfsdata",
      "Data niet toegankelijk voor onbevoegden — ook niet voor derden",
      "Datasegmentatie en gecontroleerde toegang per rol",
    ],
    closing: "Uw data blijft van u, technisch én contractueel.",
  },
  {
    icon: FileCheck,
    label: "Laag 3",
    title: "Governance & controle",
    intro: "Aantoonbare beheersing van risico.",
    points: [
      "Logging en audittrails standaard actief",
      "Monitoring en incidentprocedures",
      "AVG / GDPR-compliance inclusief verwerkersovereenkomsten (DPA's)",
      "Volledige technische documentatie en overdraagbaarheid",
      "Samenwerking met SOC 2 Type II en ISO 27001 gecertificeerde technologiepartners (zoals Supabase, OpenAI, Anthropic en Vercel)",
    ],
    closing: "Beveiliging wordt niet alleen technisch geborgd, maar ook juridisch en operationeel.",
  },
];

const LayerCard = ({ layer, index }: { layer: typeof layers[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.6 });
  const Icon = layer.icon;

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl border border-border bg-card overflow-hidden"
      animate={{
        borderColor: isInView ? "hsl(var(--primary) / 0.35)" : "hsl(var(--border))",
        boxShadow: isInView ? "0 4px 24px hsl(174 78% 41% / 0.08)" : "0 0 0 transparent",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 sm:p-8">
        {/* Layer header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 shrink-0">
            <Icon size={18} className="text-primary" />
          </div>
          <div className="flex items-baseline gap-2.5">
            <motion.span
              className="font-bold tracking-widest uppercase text-primary/70"
              animate={{ fontSize: isInView ? "16px" : "14px" }}
              transition={{ duration: 0.25 }}
            >
              {layer.label}
            </motion.span>
            <span className="text-muted-foreground/40">—</span>
            <motion.h3
              className="font-semibold"
              animate={{ fontSize: isInView ? "22px" : "18px" }}
              transition={{ duration: 0.25 }}
            >
              {layer.title}
            </motion.h3>
          </div>
        </div>

        {/* Intro */}
        <p className="text-sm text-muted-foreground mt-3 pl-12">
          {layer.intro}
        </p>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {isInView && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <ul className="space-y-2.5 pl-12 mt-5 mb-5">
                {layer.points.map((point, pi) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: pi * 0.04, duration: 0.3 }}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                  >
                    <span className="mt-[7px] w-[6px] h-[6px] rounded-full bg-primary/60 shrink-0" />
                    <span className="text-foreground/85">{point}</span>
                  </motion.li>
                ))}
              </ul>

              <p className="text-sm font-medium text-muted-foreground/80 italic pl-12 border-l-2 border-primary/20 ml-12 py-1">
                {layer.closing}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const SecurityBlock = () => {
  return (
    <section id="beveiliging" className="relative overflow-hidden border-t border-primary/10">
      <AmbientLight />

      <div className="container mx-auto px-4 lg:px-8 py-16 sm:py-24 relative z-10">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <ScrollRevealItem>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-primary">
              Beveiliging & Controle
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Beveiliging als architectuurprincipe
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Elke automatisering en systeemintegratie wordt ontworpen met dataveiligheid, controle
              en overdraagbaarheid als uitgangspunt — niet als toevoeging achteraf.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-4">
          {layers.map((layer, i) => (
            <LayerCard key={layer.title} layer={layer} index={i} />
          ))}
        </div>

        <ScrollReveal className="mt-14 sm:mt-20">
          <ScrollRevealItem>
            <p className="text-center text-sm sm:text-base font-medium text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              "Wij bouwen geen automatisering zonder aantoonbare beheersing van risico, data en
              continuïteit."
            </p>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SecurityBlock;
