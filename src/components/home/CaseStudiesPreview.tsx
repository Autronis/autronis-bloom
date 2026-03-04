import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, FileText, Users, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

interface CaseStudy {
  slug: string;
  icon: React.ElementType;
  title: string;
  description: string;
  results: string[];
  upcoming?: false;
}

interface UpcomingCase {
  slug: string;
  icon: React.ElementType;
  title: string;
  description: string;
  upcoming: true;
}

type CaseItem = CaseStudy | UpcomingCase;

const cases: CaseItem[] = [
  {
    slug: "e-commerce-product-orderautomatisering",
    icon: ShoppingCart,
    title: "E-commerce product- en orderautomatisering",
    description: "Automatisering van productdata, voorraadbeheer en orderverwerking tussen leverancierssystemen, webshop en interne systemen.",
    results: [
      "Tot 65% minder handmatig productbeheer",
      "Realtime voorraad- en prijsupdates",
      "Consistente productdata tussen systemen",
    ],
  },
  {
    slug: "financiele-procesautomatisering",
    icon: FileText,
    title: "Financiële procesautomatisering",
    description: "Automatisering van factuurverwerking, rapportages en financiële datastromen via integraties tussen boekhoudsoftware en dashboards.",
    results: [
      "Tot 70% minder handmatige verwerking",
      "Snellere maandrapportages",
      "Betere datakwaliteit in financiële systemen",
    ],
  },
  {
    slug: "leadmanagement-crm-automatisering",
    icon: Users,
    title: "Leadmanagement en CRM-automatisering",
    description: "Automatisch verrijken, synchroniseren en opvolgen van inkomende leads via CRM-integraties.",
    upcoming: true,
  },
];

const ImplementedCard = ({
  cs,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
}: {
  cs: CaseStudy;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const Icon = cs.icon;
  return (
    <Link
      to="/case-studies"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative group rounded-xl border border-border bg-card p-6 flex flex-col h-full overflow-hidden transition-all duration-200 ease-out"
      style={{
        transform: isHovered ? "scale(1.015) translateY(-2px)" : "scale(1) translateY(0)",
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : undefined,
        boxShadow: isHovered ? "0 0 20px hsl(174 78% 41% / 0.12)" : "none",
      }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Icon size={18} />
          </div>
          <h3 className="text-lg font-bold">{cs.title}</h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{cs.description}</p>

        <div className="border-t border-border pt-4 flex-1">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide uppercase">Resultaat</p>
          <ul className="space-y-1.5">
            {cs.results.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <span className="mt-5 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">
          Lees meer <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
};

const UpcomingCard = ({
  cs,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
}: {
  cs: UpcomingCase;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const Icon = cs.icon;
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative group rounded-xl border border-border bg-card p-6 flex flex-col h-full overflow-hidden transition-all duration-200 ease-out"
      style={{
        transform: isHovered ? "scale(1.015) translateY(-2px)" : "scale(1) translateY(0)",
        opacity: isAnyHovered && !isHovered ? 0.88 : 1,
        borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : undefined,
        boxShadow: isHovered ? "0 0 20px hsl(174 78% 41% / 0.12)" : "none",
      }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Icon size={18} />
          </div>
          <h3 className="text-lg font-bold">{cs.title}</h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-5">{cs.description}</p>

        <div className="flex items-center gap-1.5 mt-auto">
          <Clock size={12} className="text-primary" />
          <p className="text-xs font-semibold">Coming soon</p>
        </div>
      </div>
    </div>
  );
};

const CaseStudiesPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-12">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Case Studies</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Voorbeelden van automatiseringsimplementaties</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Concrete voorbeelden van hoe automatisering processen versnelt, fouten vermindert en schaalbaarheid mogelijk maakt.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cases.map((cs, i) => (
            <ScrollRevealItem key={cs.slug}>
              {cs.upcoming ? (
                <UpcomingCard
                  cs={cs}
                  isHovered={hoveredIndex === i}
                  isAnyHovered={hoveredIndex !== null}
                  onHover={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(null)}
                />
              ) : (
                <ImplementedCard
                  cs={cs as CaseStudy}
                  isHovered={hoveredIndex === i}
                  isAnyHovered={hoveredIndex !== null}
                  onHover={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(null)}
                />
              )}
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Button asChild size="lg">
              <Link to="/case-studies">
                Bekijk meer implementaties
                <ArrowRight size={18} />
              </Link>
            </Button>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CaseStudiesPreview;
