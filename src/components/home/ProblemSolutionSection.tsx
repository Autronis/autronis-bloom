import { Layers, Users, BarChart3, Cog, Link2, PieChart, ArrowRight, X, Check } from "lucide-react";
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

const TransformRow = ({ problem, solution, pIcon: PIcon, sIcon: SIcon, index }: {
  problem: { title: string; sub: string };
  solution: { title: string; sub: string };
  pIcon: React.ElementType;
  sIcon: React.ElementType;
  index: number;
}) => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] items-center gap-3 md:gap-0"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
  >
    {/* Problem */}
    <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-rose-500/[0.04] border border-rose-500/10 group hover:border-rose-500/25 transition-all duration-200">
      <div className="w-9 h-9 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400/80 shrink-0">
        <PIcon size={16} strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground/80 leading-tight">{problem.title}</p>
        <p className="text-xs text-muted-foreground/60 mt-0.5 leading-relaxed">{problem.sub}</p>
      </div>
    </div>

    {/* Arrow */}
    <div className="hidden md:flex items-center justify-center">
      <motion.div
        className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
        animate={{ x: [0, 3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      >
        <ArrowRight size={14} className="text-primary" />
      </motion.div>
    </div>
    <div className="md:hidden flex justify-center -my-1">
      <motion.div
        className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center rotate-90"
        animate={{ y: [0, 2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      >
        <ArrowRight size={11} className="text-primary" />
      </motion.div>
    </div>

    {/* Solution */}
    <div className="flex items-start gap-3 p-3 sm:p-4 rounded-xl bg-primary/[0.04] border border-primary/10 group hover:border-primary/30 hover:shadow-[0_0_16px_hsl(174_78%_41%/0.08)] transition-all duration-200">
      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center text-primary shrink-0 shadow-[0_0_10px_hsl(174_78%_41%/0.15)]">
        <SIcon size={16} strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-foreground leading-tight">{solution.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{solution.sub}</p>
      </div>
    </div>
  </motion.div>
);

const ProblemSolutionSection = () => {
  const lang = useLanguage();
  const tx = text[lang];

  return (
    <section className="py-8 sm:py-16 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.problemLabel}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{tx.problemTitle1}<StrikeThroughText text={tx.strikeText} />.</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{tx.problemDesc}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Before/After comparison */}
        <div className="max-w-4xl mx-auto">
          {/* Column headers */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] mb-4">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <div className="w-6 h-6 rounded-full bg-rose-500/15 flex items-center justify-center">
                <X size={11} className="text-rose-400" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-rose-400/70">{tx.before}</span>
            </div>
            <div className="hidden md:block" />
            <div className="hidden md:flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <Check size={11} className="text-emerald-400" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-emerald-400/70">{tx.after}</span>
            </div>
          </div>

          {/* Transform rows */}
          <div className="space-y-3">
            {tx.problems.map((p, i) => (
              <TransformRow
                key={p.title}
                problem={p}
                solution={tx.solutions[i]}
                pIcon={problemIcons[i]}
                sIcon={solutionIcons[i]}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
