import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Users, BarChart3, Cog, Link2, PieChart } from "lucide-react";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";


const problems = [
  {
    icon: Layers,
    title: "Losstaande systemen",
    description:
      "Afdelingen werken vaak in verschillende tools zonder één gedeelde datastroom. Informatie wordt handmatig overgezet tussen bijvoorbeeld CRM, finance en operations, wat extra werk en vertraging kan veroorzaken.",
  },
  {
    icon: Users,
    title: "Afhankelijkheid van handmatige stappen",
    description:
      "In veel processen zitten nog handmatige overdrachten en controles. Naarmate het volume toeneemt, groeit ook de werkdruk en neemt de kans op fouten toe.",
  },
  {
    icon: BarChart3,
    title: "Beperkt actueel inzicht",
    description:
      "Rapportages zijn regelmatig gebaseerd op data die achteraf wordt verzameld. Daardoor ontbreekt realtime overzicht en wordt bijsturen minder tijdig.",
  },
];

const solutions = [
  {
    icon: Cog,
    title: "Procesautomatisering",
    description:
      "Terugkerende en handmatige taken worden geautomatiseerd, zodat processen consistenter en met minder tussenkomst verlopen.",
  },
  {
    icon: Link2,
    title: "Systeemintegraties",
    description:
      "Applicaties worden via API-koppelingen met elkaar verbonden, waardoor data automatisch en betrouwbaar tussen systemen wordt uitgewisseld.",
  },
  {
    icon: PieChart,
    title: "Data & rapportage",
    description:
      "Realtime dashboards bieden actueel inzicht in prestaties, capaciteit en knelpunten, zodat tijdig kan worden bijgestuurd.",
  },
];

const StrikeThroughText = () => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      ref={ref}
      className="relative inline-block cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className="transition-all duration-[1200ms]"
        style={{
          opacity: isInView ? 0.4 : 1,
          color: isHovered ? "hsl(174, 78%, 55%)" : undefined,
        }}
      >
        "te weinig capaciteit"
      </span>
      <svg
        className="absolute left-0 top-1/2 w-full pointer-events-none"
        style={{ height: "8px", transform: "translateY(-50%)" }}
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="4"
          x2="100"
          y2="4"
          stroke={isHovered ? "hsl(174, 78%, 55%)" : "hsl(174, 78%, 41%)"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset={isInView ? "0" : "100"}
          style={{
            transition: "stroke-dashoffset 1500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), stroke 300ms ease-out",
            filter: isHovered
              ? "drop-shadow(0 0 8px hsl(174, 78%, 41%))"
              : isInView
              ? "drop-shadow(0 0 3px hsl(174, 78%, 41% / 0.4))"
              : "none",
          }}
        />
      </svg>
    </span>
  );
};

const ProblemSolutionSection = () => {
  const [problemHovered, setProblemHovered] = useState<number | null>(null);
  const [solutionHovered, setSolutionHovered] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      


      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* PROBLEEM */}
        <div className="mb-16 sm:mb-24">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Probleem
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Het probleem is niet <StrikeThroughText />.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Veel groeiende organisaties denken dat ze extra personeel nodig hebben om bij te
                blijven. In werkelijkheid ontstaan vertragingen doordat processen niet goed op
                elkaar zijn afgestemd en systemen onvoldoende samenwerken.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {problems.map((p, i) => (
              <ScrollRevealItem key={p.title}>
                <GlowCard
                  className="rounded-xl border border-border bg-card p-6"
                  isAnyHovered={problemHovered !== null}
                  isHovered={problemHovered === i}
                  onHover={() => setProblemHovered(i)}
                  onLeave={() => setProblemHovered(null)}
                >
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive mb-4">
                    <p.icon size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </GlowCard>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>

        {/* OPLOSSING */}
        <div>
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Oplossing
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Structuur vóór capaciteit.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Wanneer systemen goed op elkaar aansluiten en processen logisch zijn ingericht, kan een organisatie groeien zonder dat de personeelsdruk evenredig toeneemt.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {solutions.map((s, i) => (
              <ScrollRevealItem key={s.title}>
                <GlowCard
                  className="rounded-xl border border-primary/20 bg-card p-6"
                  isAnyHovered={solutionHovered !== null}
                  isHovered={solutionHovered === i}
                  onHover={() => setSolutionHovered(i)}
                  onLeave={() => setSolutionHovered(null)}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <s.icon size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </GlowCard>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
