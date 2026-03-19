import { Layers, Users, BarChart3, Cog, Link2, PieChart, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Problem → Solution",
    title1: "The problem isn't ",
    strikeText: '"not enough capacity"',
    desc: "Delays occur because processes are not aligned and systems don't work together. We fix the structure.",
    problems: [
      { title: "Disconnected systems", sub: "Manual data transfer between tools" },
      { title: "Manual steps", sub: "Handoffs that scale with volume" },
      { title: "No real-time insight", sub: "Outdated reports, slow decisions" },
    ],
    solutions: [
      { title: "Process automation", sub: "Tasks run automatically" },
      { title: "System integrations", sub: "Data syncs between systems" },
      { title: "Data & reporting", sub: "Real-time KPI dashboards" },
    ],
  },
  nl: {
    label: "Probleem → Oplossing",
    title1: "Het probleem is niet ",
    strikeText: '"te weinig capaciteit"',
    desc: "Vertragingen ontstaan omdat processen niet afgestemd zijn en systemen niet samenwerken. Wij fixen de structuur.",
    problems: [
      { title: "Losgekoppelde systemen", sub: "Handmatige dataoverdracht tussen tools" },
      { title: "Handmatige stappen", sub: "Overdrachten die schalen met volume" },
      { title: "Geen realtime inzicht", sub: "Verouderde rapportages, trage beslissingen" },
    ],
    solutions: [
      { title: "Procesautomatisering", sub: "Taken draaien automatisch" },
      { title: "Systeemintegraties", sub: "Data synchroniseert tussen systemen" },
      { title: "Data & rapportage", sub: "Realtime KPI-dashboards" },
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
    <section className="py-10 sm:py-20 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.label}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{tx.title1}<StrikeThroughText text={tx.strikeText} />.</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">{tx.desc}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Transform rows */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {tx.problems.map((p, i) => {
            const PIcon = problemIcons[i];
            const SIcon = solutionIcons[i];
            const s = tx.solutions[i];
            return (
              <motion.div
                key={p.title}
                className="relative grid grid-cols-[1fr_32px_1fr] sm:grid-cols-[1fr_48px_1fr] items-center gap-0 overflow-hidden rounded-xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Light beam that shoots across the row — repeating */}
                <motion.div
                  className="absolute inset-y-0 w-[80px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20 pointer-events-none"
                  animate={{ left: ["-80px", "calc(100% + 80px)"] }}
                  transition={{ duration: 1.5, delay: i * 0.8, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
                />

                {/* Problem */}
                <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 bg-muted/30 rounded-l-xl">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-rose-500/8 flex items-center justify-center text-rose-400/60 shrink-0">
                    <PIcon size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-foreground/60 leading-tight truncate">{p.title}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground/50 leading-snug truncate hidden sm:block">{p.sub}</p>
                  </div>
                </div>

                {/* Animated center */}
                <div className="flex items-center justify-center h-full bg-muted/15 relative">
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute w-8 h-8 rounded-full border border-primary/30"
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: i * 0.6 }}
                  />
                  <motion.div
                    className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/20 flex items-center justify-center shadow-[0_0_10px_hsl(174_78%_41%/0.2)]"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                  >
                    <ArrowRight size={12} className="text-primary" />
                  </motion.div>
                </div>

                {/* Solution */}
                <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-4 rounded-r-xl bg-primary/[0.05] border-l border-primary/10">
                  <motion.div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/12 flex items-center justify-center text-primary shrink-0"
                    animate={{ boxShadow: ["0 0 4px hsl(174,78%,41%,0.1)", "0 0 20px hsl(174,78%,41%,0.35)", "0 0 4px hsl(174,78%,41%,0.1)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
                  >
                    <SIcon size={15} strokeWidth={2.5} />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-foreground leading-tight truncate">{s.title}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground/70 leading-snug truncate hidden sm:block">{s.sub}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
