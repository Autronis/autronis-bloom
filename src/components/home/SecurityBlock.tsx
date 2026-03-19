import { Shield, Database, FileCheck, ShieldCheck, Lock, Globe, BrainCog, Eye, FolderLock, KeyRound, Server, FlaskConical, Link2, Unlock, ShieldOff, ClipboardList, Radio, Scale, FileText, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import useCanHover from "@/hooks/use-can-hover";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Security & Control",
    title: "Security as an architecture principle",
    desc: "Every automation and system integration is designed with data security, control, and transferability as the starting point — not as an afterthought.",
    closing: "\"We don't build automation without demonstrable control over risk, data, and continuity.\"",
    layers: [
      { label: "Layer 1", title: "Architecture Layer", intro: "The foundation everything rests on.", points: ["Access model based on the least-privilege principle", "Role and record-level security (RLS)", "Separate environments for development, testing, and production", "API connections with controlled access", "No vendor lock-in or hidden dependencies"], closing: "This layer determines how systems communicate and who has access, before any data is processed." },
      { label: "Layer 2", title: "Data Layer", intro: "Protection of your business data.", points: ["End-to-end encryption (TLS 1.2+ in transit, AES-256 at rest)", "Processing and storage within the EU where possible", "No use of business data for AI training", "Data is only accessible to authorized parties and is not shared with unauthorized entities", "Data segmentation and access control per role"], closing: "Your data remains under your control and ownership, both technically and contractually secured." },
      { label: "Layer 3", title: "Governance & Control", intro: "Demonstrable risk management.", points: ["Logging and audit trails active by default", "Continuous monitoring and documented incident procedures", "Compliance with GDPR including data processing agreements", "Complete technical documentation and transferability", "Collaboration with technology partners that meet SOC 2 Type II and ISO 27001"], closing: "Security is not only implemented technically, but also organizationally and legally secured." },
    ],
  },
  nl: {
    label: "Beveiliging & Controle",
    title: "Beveiliging als architectuurprincipe",
    desc: "Elke automatisering en systeemintegratie wordt ontworpen met databeveiliging, controle en overdraagbaarheid als uitgangspunt — niet als bijzaak.",
    closing: "\"Wij bouwen geen automatisering zonder aantoonbare controle over risico, data en continuïteit.\"",
    layers: [
      { label: "Laag 1", title: "Architectuurlaag", intro: "Het fundament waarop alles rust.", points: ["Toegangsmodel op basis van het least-privilege principe", "Rol- en record-level security (RLS)", "Gescheiden omgevingen voor ontwikkeling, testen en productie", "API-koppelingen met gecontroleerde toegang", "Geen vendor lock-in of verborgen afhankelijkheden"], closing: "Deze laag bepaalt hoe systemen communiceren en wie toegang heeft, voordat er data wordt verwerkt." },
      { label: "Laag 2", title: "Datalaag", intro: "Bescherming van je bedrijfsdata.", points: ["End-to-end encryptie (TLS 1.2+ in transit, AES-256 at rest)", "Verwerking en opslag binnen de EU waar mogelijk", "Geen gebruik van bedrijfsdata voor AI-training", "Data is alleen toegankelijk voor geautoriseerde partijen en wordt niet gedeeld met onbevoegden", "Datasegmentatie en toegangscontrole per rol"], closing: "Je data blijft onder jouw controle en eigendom, zowel technisch als contractueel geborgd." },
      { label: "Laag 3", title: "Governance & Controle", intro: "Aantoonbaar risicobeheer.", points: ["Logging en audit trails standaard actief", "Continue monitoring en gedocumenteerde incidentprocedures", "Compliance met AVG inclusief verwerkersovereenkomsten", "Volledige technische documentatie en overdraagbaarheid", "Samenwerking met technologiepartners die voldoen aan SOC 2 Type II en ISO 27001"], closing: "Beveiliging is niet alleen technisch geïmplementeerd, maar ook organisatorisch en juridisch geborgd." },
    ],
  },
};

const layerIcons = [Shield, Database, FileCheck];
const pointIcons = [
  [KeyRound, ShieldCheck, FlaskConical, Link2, Unlock],
  [Lock, Globe, BrainCog, Eye, FolderLock],
  [ClipboardList, Radio, Scale, FileText, BadgeCheck],
];

const SecurityBlock = () => {
  const lang = useLanguage();
  const t = text[lang];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <section id="beveiliging" className="relative overflow-hidden border-t border-primary/10">
      {/* Animated shield background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Shield size={400} strokeWidth={0.5} />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 py-10 sm:py-16 md:py-24 relative z-10">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-8 sm:mb-14 md:mb-20">
          <ScrollRevealItem>
            <motion.div className="inline-flex items-center gap-2 mb-3 sm:mb-4" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity }}><ShieldCheck size={16} className="text-primary" /></motion.div><p className="text-xs font-semibold tracking-widest uppercase text-primary">{t.label}</p></motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t.title}</h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">{t.desc}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical connector line between layers */}
          <div className="absolute left-8 sm:left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/20 via-primary/10 to-transparent hidden sm:block" />

          <div className="space-y-4 sm:space-y-6">
          {t.layers.map((layer, i) => {
            const Icon = layerIcons[i];
            const isHovered = canHover && hoveredIndex === i;
            const layerColors = ["#34D399", "#60A5FA", "#A78BFA"];
            return (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              >
                <div className="rounded-xl sm:rounded-2xl border bg-gradient-to-br from-primary/[0.06] to-transparent overflow-hidden transition-all duration-200 ease-out relative" style={{ transform: isHovered ? "scale(1.01) translateY(-2px)" : "none", borderColor: isHovered ? `${layerColors[i]}50` : "hsl(var(--border))", boxShadow: isHovered ? `0 0 24px ${layerColors[i]}18` : "0 0 0 transparent" }} onMouseEnter={canHover ? () => setHoveredIndex(i) : undefined} onMouseLeave={canHover ? () => setHoveredIndex(null) : undefined}>
                  {/* Shimmer line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.12 + 0.3, ease: "easeInOut" }}
                  />
                  {/* Colored top accent */}
                  <div className="h-[2px]" style={{ background: `linear-gradient(to right, ${layerColors[i]}80, ${layerColors[i]}20, transparent)` }} />
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                  <div className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                      <motion.div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 relative shadow-[0_0_12px_hsl(174_78%_41%/0.15)]"
                        style={{ backgroundColor: `${layerColors[i]}20` }}
                        whileInView={{ scale: [0.8, 1.1, 1] }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
                      >
                        <Icon size={18} style={{ color: layerColors[i] }} />
                        {/* Pulse ring */}
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0 rounded-lg"
                            style={{ border: `1px solid ${layerColors[i]}` }}
                            animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                      <div className="flex items-baseline gap-2 sm:gap-2.5">
                        <span className="text-sm sm:text-base font-bold tracking-widest uppercase" style={{ color: layerColors[i] }}>{layer.label}</span>
                        <h3 className="text-base sm:text-lg font-semibold text-foreground">{layer.title}</h3>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground pl-11 sm:pl-[52px] mb-3 sm:mb-5">{layer.intro}</p>
                    <ul className="space-y-2 sm:space-y-2.5 pl-11 sm:pl-[52px] mb-3 sm:mb-5">
                      {layer.points.map((point, j) => {
                        const PointIcon = pointIcons[i][j];
                        return (
                          <motion.li
                            key={point}
                            className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 + j * 0.05 + 0.3, duration: 0.3 }}
                          >
                            <PointIcon size={14} className="mt-[2px] shrink-0 sm:w-[15px] sm:h-[15px]" style={{ color: layerColors[i] }} />
                            <span className="text-foreground/85">{point}</span>
                          </motion.li>
                        );
                      })}
                    </ul>
                    <p className="text-xs sm:text-sm font-medium text-muted-foreground/80 italic pl-11 sm:pl-[52px]">{layer.closing}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
          </div>
        </div>

        <motion.div
          className="mt-10 sm:mt-14 md:mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs font-medium text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">{t.closing}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityBlock;
