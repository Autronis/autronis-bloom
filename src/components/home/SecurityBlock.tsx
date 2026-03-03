import { Shield, Database, FileCheck, ShieldCheck, Lock, Globe, BrainCog, Eye, FolderLock, KeyRound, Server, FlaskConical, Link2, Unlock, ShieldOff, ClipboardList, Radio, Scale, FileText, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import AmbientLight from "@/components/AmbientLight";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const layers = [
  {
    icon: Shield,
    label: "Laag 1",
    title: "Architectuurlaag",
    intro: "De basis waarop alles rust.",
    points: [
      { icon: KeyRound, text: "Least-privilege toegangsmodel als standaard" },
      { icon: ShieldCheck, text: "Rol- en recordniveau beveiliging (Row Level Security)" },
      { icon: FlaskConical, text: "Gescheiden omgevingen (ontwikkeling, test, productie)" },
      { icon: Link2, text: "API-gebaseerde integraties met gecontroleerde toegang" },
      { icon: Unlock, text: "Geen vendor lock-in of verborgen afhankelijkheden" },
    ],
    closing: "Hier bepalen we hoe systemen communiceren en wie toegang krijgt — vóórdat er data stroomt.",
  },
  {
    icon: Database,
    label: "Laag 2",
    title: "Datalaag",
    intro: "Bescherming van uw bedrijfsgegevens.",
    points: [
      { icon: Lock, text: "End-to-end versleuteling (TLS 1.2+ tijdens transport, AES-256 bij opslag)" },
      { icon: Globe, text: "Verwerking en opslag binnen de EU waar mogelijk" },
      { icon: BrainCog, text: "Geen AI-training op uw bedrijfsdata" },
      { icon: Eye, text: "Data niet toegankelijk voor onbevoegden — ook niet voor derden" },
      { icon: FolderLock, text: "Datasegmentatie en gecontroleerde toegang per rol" },
    ],
    closing: "Uw data blijft van u, technisch én contractueel.",
  },
  {
    icon: FileCheck,
    label: "Laag 3",
    title: "Governance & controle",
    intro: "Aantoonbare beheersing van risico.",
    points: [
      { icon: ClipboardList, text: "Logging en audittrails standaard actief" },
      { icon: Radio, text: "Monitoring en incidentprocedures" },
      { icon: Scale, text: "AVG / GDPR-compliance inclusief verwerkersovereenkomsten (DPA's)" },
      { icon: FileText, text: "Volledige technische documentatie en overdraagbaarheid" },
      { icon: BadgeCheck, text: "Samenwerking met SOC 2 Type II en ISO 27001 gecertificeerde technologiepartners (zoals Supabase, OpenAI, Anthropic en Vercel)" },
    ],
    closing: "Beveiliging wordt niet alleen technisch geborgd, maar ook juridisch en operationeel.",
  },
];

const SecurityBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="beveiliging" className="relative overflow-hidden border-t border-primary/10">
      <AmbientLight />

      <div className="container mx-auto px-4 lg:px-8 py-16 sm:py-24 relative z-10">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <ScrollRevealItem>
            <div className="inline-flex items-center gap-2 mb-4">
              <ShieldCheck size={16} className="text-primary" />
              <p className="text-xs font-semibold tracking-widest uppercase text-primary">
                Beveiliging & Controle
              </p>
            </div>
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
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            const isHovered = hoveredIndex === i;

            return (
              <ScrollReveal key={layer.title}>
                <ScrollRevealItem>
                  <motion.div
                    className="rounded-2xl border bg-card overflow-hidden"
                    animate={{
                      borderColor: isHovered ? "hsl(var(--primary) / 0.35)" : "hsl(var(--border))",
                      boxShadow: isHovered ? "0 4px 24px hsl(174 78% 33% / 0.08)" : "0 0 0 transparent",
                    }}
                    whileHover={{ scale: 1.015, y: -2 }}
                    transition={{ duration: 0.3 }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 shrink-0">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <div className="flex items-baseline gap-2.5">
                          <span className="text-base font-bold tracking-widest uppercase text-primary/70">
                            {layer.label}
                          </span>
                          <span className="text-muted-foreground/40">—</span>
                          <h3 className="text-lg font-semibold">{layer.title}</h3>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground pl-12 mb-5">
                        {layer.intro}
                      </p>

                      <ul className="space-y-2.5 pl-12 mb-5">
                        {layer.points.map((point) => {
                          const PointIcon = point.icon;
                          return (
                            <li
                              key={point.text}
                              className="flex items-start gap-3 text-sm leading-relaxed"
                            >
                              <PointIcon size={15} className="text-foreground mt-[2px] shrink-0" />
                              <span className="text-muted-foreground/40 text-xs">–</span>
                              <span className="text-foreground/85">{point.text}</span>
                            </li>
                          );
                        })}
                      </ul>

                      <p className="text-sm font-medium text-muted-foreground/80 italic pl-12">
                        {layer.closing}
                      </p>
                    </div>
                  </motion.div>
                </ScrollRevealItem>
              </ScrollReveal>
            );
          })}
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
