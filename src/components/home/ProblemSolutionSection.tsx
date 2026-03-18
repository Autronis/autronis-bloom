import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Users, BarChart3, Cog, Link2, PieChart } from "lucide-react";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    problemLabel: "Problem",
    problemTitle1: "The problem isn't ",
    strikeText: '"not enough capacity"',
    problemDesc: "Many growing organizations think they need more staff to keep up. In reality, delays occur because processes are not well aligned and systems don't work together effectively.",
    solutionLabel: "Solution",
    solutionTitle: "Structure before capacity.",
    solutionDesc: "When systems are properly aligned and processes are logically structured, an organization can grow without staffing pressure increasing proportionally.",
    problems: [
      { title: "Disconnected systems", description: "Departments often work in different tools without a shared data flow. Information is manually transferred between CRM, finance and operations, causing extra work and delays." },
      { title: "Dependency on manual steps", description: "Many processes still contain manual handoffs and checks. As volume increases, so does workload and the chance of errors." },
      { title: "Limited real-time insight", description: "Reports are often based on data collected after the fact. This means real-time overview is missing and adjustments are less timely." },
    ],
    solutions: [
      { title: "Process automation", description: "Recurring and manual tasks are automated, so processes run more consistently with less intervention." },
      { title: "System integrations", description: "Applications are connected via API integrations, allowing data to be exchanged automatically and reliably between systems." },
      { title: "Data & reporting", description: "Real-time dashboards provide up-to-date insight into performance, capacity and bottlenecks, enabling timely adjustments." },
    ],
  },
  nl: {
    problemLabel: "Probleem",
    problemTitle1: "Het probleem is niet ",
    strikeText: '"te weinig capaciteit"',
    problemDesc: "Veel groeiende organisaties denken dat ze meer personeel nodig hebben om bij te blijven. In werkelijkheid ontstaan vertragingen omdat processen niet goed op elkaar zijn afgestemd en systemen niet effectief samenwerken.",
    solutionLabel: "Oplossing",
    solutionTitle: "Structuur vóór capaciteit.",
    solutionDesc: "Wanneer systemen goed op elkaar zijn afgestemd en processen logisch zijn ingericht, kan een organisatie groeien zonder dat de personeelsdruk evenredig toeneemt.",
    problems: [
      { title: "Losgekoppelde systemen", description: "Afdelingen werken vaak in verschillende tools zonder gedeelde datastroom. Informatie wordt handmatig overgedragen tussen CRM, finance en operations, wat extra werk en vertragingen veroorzaakt." },
      { title: "Afhankelijkheid van handmatige stappen", description: "Veel processen bevatten nog handmatige overdrachten en controles. Naarmate het volume toeneemt, neemt ook de werkdruk en de kans op fouten toe." },
      { title: "Beperkt realtime inzicht", description: "Rapportages zijn vaak gebaseerd op achteraf verzamelde data. Hierdoor ontbreekt realtime overzicht en worden aanpassingen minder tijdig gedaan." },
    ],
    solutions: [
      { title: "Procesautomatisering", description: "Terugkerende en handmatige taken worden geautomatiseerd, zodat processen consistenter verlopen met minder tussenkomst." },
      { title: "Systeemintegraties", description: "Applicaties worden via API-integraties verbonden, waardoor data automatisch en betrouwbaar tussen systemen wordt uitgewisseld." },
      { title: "Data & rapportage", description: "Realtime dashboards bieden actueel inzicht in prestaties, capaciteit en knelpunten, waardoor tijdig bijgestuurd kan worden." },
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
  const [problemHovered, setProblemHovered] = useState<number | null>(null);
  const [solutionHovered, setSolutionHovered] = useState<number | null>(null);

  return (
    <section className="py-10 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="mb-12 sm:mb-24">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.problemLabel}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{tx.problemTitle1}<StrikeThroughText text={tx.strikeText} />.</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{tx.problemDesc}</p>
            </ScrollRevealItem>
          </ScrollReveal>
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-fr">
            {tx.problems.map((p, i) => { const PIcon = problemIcons[i]; return (
              <ScrollRevealItem key={p.title} className="h-full">
                <GlowCard className="rounded-xl border border-border bg-card p-4 sm:p-6 h-full relative overflow-hidden" isAnyHovered={problemHovered !== null} isHovered={problemHovered === i} onHover={() => setProblemHovered(i)} onLeave={() => setProblemHovered(null)}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/60 via-orange-500/40 to-transparent" />
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive shrink-0"><PIcon size={16} /></div>
                    <h3 className="font-semibold text-sm sm:text-base">{p.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  <span className="absolute top-3 right-3 text-[10px] font-mono text-destructive/20">{String(i + 1).padStart(2, "0")}</span>
                </GlowCard>
              </ScrollRevealItem>
            ); })}
          </ScrollReveal>
        </div>
        <div>
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.solutionLabel}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{tx.solutionTitle}</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{tx.solutionDesc}</p>
            </ScrollRevealItem>
          </ScrollReveal>
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 auto-rows-fr">
            {tx.solutions.map((s, i) => { const SIcon = solutionIcons[i]; return (
              <ScrollRevealItem key={s.title} className="h-full">
                <GlowCard className="rounded-xl border border-border bg-card p-4 sm:p-6 h-full relative overflow-hidden" isAnyHovered={solutionHovered !== null} isHovered={solutionHovered === i} onHover={() => setSolutionHovered(i)} onLeave={() => setSolutionHovered(null)}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/60 via-emerald-500/40 to-transparent" />
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0"><SIcon size={16} /></div>
                    <h3 className="font-semibold text-sm sm:text-base">{s.title}</h3>
                  </div>
                  <span className="absolute top-3 right-3 text-[10px] font-mono text-primary/20">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </GlowCard>
              </ScrollRevealItem>
            ); })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
