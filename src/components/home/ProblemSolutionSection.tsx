import { Layers, Users, BarChart3, Cog, Link2, PieChart, Zap, X, Check } from "lucide-react";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    problemLabel: "Problem",
    problemTitle1: "The problem isn't ",
    strikeText: '"not enough capacity"',
    problemDesc: "Many growing organizations think they need more staff to keep up. In reality, delays occur because processes are not well aligned and systems don't work together effectively.",
    before: "Before",
    after: "After",
    problems: [
      { title: "Disconnected systems", sub: "Manual data transfer between CRM, finance and operations." },
      { title: "Manual steps", sub: "Handoffs and checks that scale linearly with volume." },
      { title: "No real-time insight", sub: "Reports based on outdated, after-the-fact data." },
    ],
    solutions: [
      { title: "Process automation", sub: "Recurring tasks run automatically, consistently." },
      { title: "System integrations", sub: "Data syncs reliably between all connected systems." },
      { title: "Data & reporting", sub: "Real-time dashboards with up-to-date KPIs." },
    ],
  },
  nl: {
    problemLabel: "Probleem",
    problemTitle1: "Het probleem is niet ",
    strikeText: '"te weinig capaciteit"',
    problemDesc: "Veel groeiende organisaties denken dat ze meer personeel nodig hebben om bij te blijven. In werkelijkheid ontstaan vertragingen omdat processen niet goed op elkaar zijn afgestemd en systemen niet effectief samenwerken.",
    before: "Voor",
    after: "Na",
    problems: [
      { title: "Losgekoppelde systemen", sub: "Handmatige dataoverdracht tussen CRM, finance en operations." },
      { title: "Handmatige stappen", sub: "Overdrachten en controles die lineair schalen met volume." },
      { title: "Geen realtime inzicht", sub: "Rapportages gebaseerd op verouderde, achteraf verzamelde data." },
    ],
    solutions: [
      { title: "Procesautomatisering", sub: "Terugkerende taken draaien automatisch en consistent." },
      { title: "Systeemintegraties", sub: "Data synchroniseert betrouwbaar tussen alle systemen." },
      { title: "Data & rapportage", sub: "Realtime dashboards met actuele KPI's." },
    ],
  },
};

const problemIcons = [Layers, Users, BarChart3];
const solutionIcons = [Cog, Link2, PieChart];

const StrikeThroughText = ({ text: strikeText }: { text: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span ref={ref} className="relative inline-block cursor-default" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <span className="transition-all duration-[1200ms]" style={{ opacity: isInView ? 0.4 : 1, color: isHovered ? "hsl(174, 78%, 55%)" : undefined }}>{strikeText}</span>
      <svg className="absolute left-0 top-1/2 w-full pointer-events-none" style={{ height: "8px", transform: "translateY(-50%)" }} viewBox="0 0 100 8" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="100" y2="4" stroke={isHovered ? "hsl(174, 78%, 55%)" : "hsl(174, 78%, 41%)"} strokeWidth="3" strokeLinecap="round" strokeDasharray="100" strokeDashoffset={isInView ? "0" : "100"} style={{ transition: "stroke-dashoffset 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), stroke 300ms ease-out", filter: isHovered ? "drop-shadow(0 0 8px hsl(174, 78%, 41%))" : isInView ? "drop-shadow(0 0 3px hsl(174, 78%, 41% / 0.4))" : "none" }} />
      </svg>
    </span>
  );
};

const ProblemSolutionSection = () => {
  const lang = useLanguage();
  const tx = text[lang];

  return (
    <section className="py-8 sm:py-16 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header with strikethrough */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.problemLabel}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{tx.problemTitle1}<StrikeThroughText text={tx.strikeText} />.</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{tx.problemDesc}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Compact Before / After block */}
        <motion.div
          className="max-w-4xl mx-auto rounded-2xl border border-border bg-card overflow-hidden relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent z-10"
            initial={{ x: "-100%" }}
            whileInView={{ x: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
            {/* Before column */}
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-rose-500/15 flex items-center justify-center">
                  <X size={12} className="text-rose-400" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-rose-400/80">{tx.before}</span>
              </div>
              <div className="space-y-4">
                {tx.problems.map((p, i) => {
                  const PIcon = problemIcons[i];
                  return (
                    <motion.div
                      key={p.title}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400/70 shrink-0 mt-0.5">
                        <PIcon size={15} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground/80 leading-tight">{p.title}</p>
                        <p className="text-xs text-muted-foreground/70 mt-0.5 leading-relaxed">{p.sub}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Center divider */}
            <div className="hidden md:flex flex-col items-center justify-center px-2">
              <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-border to-transparent" />
              <motion.div
                className="w-10 h-10 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center my-3"
                animate={{ boxShadow: ["0 0 0px hsl(174, 78%, 41%, 0)", "0 0 16px hsl(174, 78%, 41%, 0.3)", "0 0 0px hsl(174, 78%, 41%, 0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap size={16} className="text-primary" />
              </motion.div>
              <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-border to-transparent" />
            </div>

            {/* Mobile divider */}
            <div className="md:hidden flex items-center gap-3 px-5">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
              <motion.div
                className="w-8 h-8 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center"
                animate={{ boxShadow: ["0 0 0px hsl(174, 78%, 41%, 0)", "0 0 12px hsl(174, 78%, 41%, 0.3)", "0 0 0px hsl(174, 78%, 41%, 0)"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Zap size={14} className="text-primary" />
              </motion.div>
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* After column */}
            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <Check size={12} className="text-emerald-400" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-emerald-400/80">{tx.after}</span>
              </div>
              <div className="space-y-4">
                {tx.solutions.map((s, i) => {
                  const SIcon = solutionIcons[i];
                  return (
                    <motion.div
                      key={s.title}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary shrink-0 mt-0.5 shadow-[0_0_10px_hsl(174_78%_41%/0.15)]">
                        <SIcon size={15} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground leading-tight">{s.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{s.sub}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
