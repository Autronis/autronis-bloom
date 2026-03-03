import { Shield, Database, FileCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

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
    closing:
      "Hier bepalen we hoe systemen communiceren en wie toegang krijgt — vóórdat er data stroomt.",
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
    closing:
      "Beveiliging wordt niet alleen technisch geborgd, maar ook juridisch en operationeel.",
  },
];

const SecurityBlock = () => {
  return (
    <section id="beveiliging" className="relative overflow-hidden border-t border-primary/10">
      <AmbientLight />

      <div className="container mx-auto px-4 lg:px-8 py-16 sm:py-24 relative z-10">
        {/* Header */}
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

        {/* Layers */}
        <div className="max-w-4xl mx-auto space-y-6">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <ScrollReveal key={layer.title}>
                <ScrollRevealItem>
                  <motion.div
                    className="rounded-2xl border border-border bg-card p-6 sm:p-8"
                    whileHover={{
                      borderColor: "hsl(var(--primary) / 0.35)",
                      boxShadow: "0 4px 24px hsl(174 78% 41% / 0.08)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Layer header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 shrink-0">
                        <Icon size={18} className="text-primary" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-[11px] font-semibold tracking-widest uppercase text-primary/70">
                          {layer.label}
                        </span>
                        <span className="text-xs text-muted-foreground/40">—</span>
                        <h3 className="text-lg font-semibold">{layer.title}</h3>
                      </div>
                    </div>

                    {/* Intro */}
                    <p className="text-sm text-muted-foreground mb-5 pl-12">
                      {layer.intro}
                    </p>

                    {/* Points */}
                    <ul className="space-y-2.5 pl-12 mb-5">
                      {layer.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed">
                          <ChevronRight
                            size={14}
                            className="text-primary/60 mt-[3px] shrink-0"
                          />
                          <span className="text-foreground/85">{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Closing statement */}
                    <p className="text-sm font-medium text-muted-foreground/80 italic pl-12 border-l-2 border-primary/20 ml-12 py-1">
                      {layer.closing}
                    </p>
                  </motion.div>
                </ScrollRevealItem>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Final statement */}
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
