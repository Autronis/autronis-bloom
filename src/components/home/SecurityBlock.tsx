import { Shield, Database, FileCheck, ShieldCheck, Lock, Globe, BrainCog, Eye, FolderLock, KeyRound, Server, FlaskConical, Link2, Unlock, ShieldOff, ClipboardList, Radio, Scale, FileText, BadgeCheck } from "lucide-react";
import { useState } from "react";

import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const layers = [
  {
    icon: Shield,
    label: "Laag 1",
    title: "Architectuurlaag",
    intro: "De basis waarop alles rust.",
    points: [
      { icon: KeyRound, text: "Toegangsmodel volgens het least-privilege principe" },
      { icon: ShieldCheck, text: "Rol- en recordniveau beveiliging (RLS)" },
      { icon: FlaskConical, text: "Gescheiden omgevingen voor ontwikkeling, test en productie" },
      { icon: Link2, text: "API-koppelingen met gecontroleerde toegang" },
      { icon: Unlock, text: "Geen vendor lock-in of verborgen afhankelijkheden" },
    ],
    closing: "In deze laag wordt bepaald hoe systemen met elkaar communiceren en wie toegang heeft, voordat data wordt verwerkt.",
  },
  {
    icon: Database,
    label: "Laag 2",
    title: "Datalaag",
    intro: "Bescherming van uw bedrijfsgegevens.",
    points: [
      { icon: Lock, text: "End-to-end versleuteling (TLS 1.2+ tijdens transport, AES-256 bij opslag)" },
      { icon: Globe, text: "Verwerking en opslag binnen de EU waar mogelijk" },
      { icon: BrainCog, text: "Geen gebruik van bedrijfsdata voor AI-training" },
      { icon: Eye, text: "Data is alleen toegankelijk voor geautoriseerde partijen en wordt niet gedeeld met onbevoegden" },
      { icon: FolderLock, text: "Datasegmentatie en toegangscontrole per rol" },
    ],
    closing: "Uw data blijft onder uw controle en eigendom, zowel technisch als contractueel geborgd.",
  },
  {
    icon: FileCheck,
    label: "Laag 3",
    title: "Governance & controle",
    intro: "Aantoonbare beheersing van risico.",
    points: [
      { icon: ClipboardList, text: "Logging en audittrails standaard actief" },
      { icon: Radio, text: "Continue monitoring en vastgelegde incidentprocedures" },
      { icon: Scale, text: "Naleving van AVG / GDPR inclusief verwerkersovereenkomsten" },
      { icon: FileText, text: "Volledige technische documentatie en overdraagbaarheid" },
      { icon: BadgeCheck, text: "Samenwerking met technologiepartners die voldoen aan SOC 2 Type II en ISO 27001" },
    ],
    closing: "Beveiliging wordt niet alleen technisch ingericht, maar ook organisatorisch en juridisch geborgd.",
  },
];

const SecurityBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="beveiliging" className="relative overflow-hidden border-t border-primary/10">

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
                  <div
                    className="rounded-2xl border bg-card overflow-hidden transition-all duration-300 ease-out hover:scale-[1.015] hover:-translate-y-[2px]"
                    style={{
                      borderColor: isHovered ? "hsl(var(--primary) / 0.35)" : "hsl(var(--border))",
                      boxShadow: isHovered ? "0 4px 24px hsl(174 78% 33% / 0.08)" : "0 0 0 transparent",
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 shrink-0">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <div className="flex items-baseline gap-2.5">
                          <span className="text-base font-bold tracking-widest uppercase text-primary">
                            {layer.label}
                          </span>
                          <h3 className="text-lg font-semibold text-foreground">{layer.title}</h3>
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
                              <PointIcon size={15} className="text-primary mt-[2px] shrink-0" />
                              <span className="text-foreground/85">{point.text}</span>
                            </li>
                          );
                        })}
                      </ul>

                      <p className="text-sm font-medium text-muted-foreground/80 italic pl-12">
                        {layer.closing}
                      </p>
                    </div>
                  </div>
                </ScrollRevealItem>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-14 sm:mt-20">
          <ScrollRevealItem>
            <p className="text-center text-xs font-medium text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
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
