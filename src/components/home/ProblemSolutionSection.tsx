import { Layers, Users, BarChart3, Cog, Link2, PieChart, X, Check, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Problem → Solution",
    title1: "The problem isn't ",
    strikeText: '"not enough capacity"',
    desc: "Delays occur because processes are not aligned and systems don't work together. We fix the structure.",
    items: [
      { problem: "Disconnected systems", solution: "Process automation" },
      { problem: "Manual steps", solution: "System integrations" },
      { problem: "No real-time insight", solution: "Data & reporting" },
    ],
  },
  nl: {
    label: "Probleem → Oplossing",
    title1: "Het probleem is niet ",
    strikeText: '"te weinig capaciteit"',
    desc: "Vertragingen ontstaan omdat processen niet afgestemd zijn en systemen niet samenwerken. Wij fixen de structuur.",
    items: [
      { problem: "Losgekoppelde systemen", solution: "Procesautomatisering" },
      { problem: "Handmatige stappen", solution: "Systeemintegraties" },
      { problem: "Geen realtime inzicht", solution: "Data & rapportage" },
    ],
  },
};

const problemIcons = [Layers, Users, BarChart3];
const solutionIcons = [Cog, Link2, PieChart];

const StrikeThroughText = ({ text: strikeText, active }: { text: string; active: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="relative inline-block cursor-default" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <span className="transition-all duration-[1200ms]" style={{ opacity: active ? 0.4 : 1, color: isHovered ? "hsl(174, 78%, 55%)" : undefined }}>{strikeText}</span>
      <svg className="absolute left-0 top-1/2 w-full pointer-events-none" style={{ height: "8px", transform: "translateY(-50%)" }} viewBox="0 0 100 8" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="100" y2="4" stroke={isHovered ? "hsl(174, 78%, 55%)" : "hsl(174, 78%, 41%)"} strokeWidth="3" strokeLinecap="round" strokeDasharray="100" strokeDashoffset={active ? "0" : "100"} style={{ transition: "stroke-dashoffset 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), stroke 300ms ease-out", filter: isHovered ? "drop-shadow(0 0 8px hsl(174, 78%, 41%))" : active ? "drop-shadow(0 0 3px hsl(174, 78%, 41% / 0.4))" : "none" }} />
      </svg>
    </span>
  );
};

const TransformCard = ({ item, index, pIcon: PIcon, sIcon: SIcon, isTransformed }: {
  item: { problem: string; solution: string };
  index: number;
  pIcon: React.ElementType;
  sIcon: React.ElementType;
  isTransformed: boolean;
}) => (
  <motion.div
    className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/[0.06] to-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    style={{
      borderColor: isTransformed ? "hsl(174, 78%, 41%, 0.3)" : "hsl(var(--border))",
      boxShadow: isTransformed ? "0 0 24px hsl(174, 78%, 41%, 0.1)" : "none",
      transition: "border-color 600ms ease-out, box-shadow 600ms ease-out",
    }}
  >
    {/* Sweep effect */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent z-10 pointer-events-none"
      initial={{ x: "-100%" }}
      animate={{ x: isTransformed ? "100%" : "-100%" }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    />

    <div className="relative z-0 p-3 sm:p-4 md:p-5 flex items-center gap-4">
      {/* Icon morphs */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0">
        <AnimatePresence mode="wait">
          {!isTransformed ? (
            <motion.div
              key="problem"
              className="absolute inset-0 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400/70"
              initial={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, rotate: -10 }}
              transition={{ duration: 0.3 }}
            >
              <PIcon size={18} />
            </motion.div>
          ) : (
            <motion.div
              key="solution"
              className="absolute inset-0 rounded-lg bg-primary/15 flex items-center justify-center text-primary shadow-[0_0_12px_hsl(174_78%_41%/0.2)]"
              initial={{ scale: 0.5, opacity: 0, rotate: 10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
            >
              <SIcon size={18} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text morphs */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {!isTransformed ? (
            <motion.div
              key="problem-text"
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <X size={12} className="text-rose-400/50 shrink-0" />
                <p className="text-sm sm:text-base font-semibold text-foreground/60 break-words">{item.problem}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="solution-text"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2">
                <Check size={12} className="text-emerald-400 shrink-0" />
                <p className="text-sm sm:text-base font-bold text-foreground break-words">{item.solution}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Status badge */}
      <AnimatePresence mode="wait">
        {isTransformed && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2, type: "spring", stiffness: 400 }}
            className="shrink-0"
          >
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-[10px] font-bold text-emerald-400 tracking-wide">
              <Zap size={10} />
              LIVE
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);

const ProblemSolutionSection = () => {
  const lang = useLanguage();
  const tx = text[lang];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [transformedIndices, setTransformedIndices] = useState<Set<number>>(new Set());
  const [triggered, setTriggered] = useState(false);

  // Only trigger after user has scrolled AND the cards are visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let hasScrolled = false;
    let cleaned = false;

    const onScroll = () => { hasScrolled = true; };
    window.addEventListener("scroll", onScroll, { once: true, passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasScrolled && !cleaned) {
        setTriggered(true);
        observer.disconnect();
        cleaned = true;
      }
    }, { rootMargin: "-150px 0px" });
    observer.observe(el);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      cleaned = true;
    };
  }, []);

  useEffect(() => {
    if (!triggered) return;
    const timers = tx.items.map((_, i) =>
      setTimeout(() => {
        setTransformedIndices(prev => new Set([...prev, i]));
      }, 400 + i * 1000)
    );
    return () => timers.forEach(clearTimeout);
  }, [triggered, tx.items]);

  return (
    <section className="py-10 sm:py-20 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.label}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{tx.title1}<StrikeThroughText text={tx.strikeText} active={triggered} />.</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">{tx.desc}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        <div ref={sectionRef} className="max-w-xl mx-auto space-y-3">
          {tx.items.map((item, i) => (
            <TransformCard
              key={item.problem}
              item={item}
              index={i}
              pIcon={problemIcons[i]}
              sIcon={solutionIcons[i]}
              isTransformed={transformedIndices.has(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
