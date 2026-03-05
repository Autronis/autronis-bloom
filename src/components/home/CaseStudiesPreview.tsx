import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, FileText, Users, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import useCanHover from "@/hooks/use-can-hover";

interface CaseStudy {
  slug: string;
  icon: React.ElementType;
  title: string;
  description: string;
  results: string[];
  quotePreview: string;
  quoteAttribution?: string;
  quoteLabel: string;
}

const cases: CaseStudy[] = [
  {
    slug: "e-commerce-product-orderautomatisering",
    icon: ShoppingCart,
    title: "E-commerce product- en orderautomatisering",
    description: "Automatisering van productdata, voorraadbeheer en orderverwerking tussen leverancierssystemen, webshop en interne systemen.",
    results: [
      "Tot 65% minder handmatig productbeheer",
      "Realtime voorraad- en prijsupdates",
    ],
    quoteLabel: "Implementatieresultaat",
    quotePreview: "Na implementatie wordt een groot deel van de supportvragen automatisch afgehandeld en kan het team sneller reageren op complexere vragen...",
  },
  {
    slug: "financiele-procesautomatisering",
    icon: FileText,
    title: "Financiële procesautomatisering",
    description: "Automatisering van factuurverwerking, rapportages en financiële datastromen via integraties tussen boekhoudsoftware en dashboards.",
    results: [
      "Tot 70% minder handmatige verwerking",
      "Snellere maandrapportages",
    ],
    quoteLabel: "Implementatieresultaat",
    quotePreview: "Rapportages die voorheen meerdere uren per week kostten om samen te stellen worden nu automatisch gegenereerd. Teams hebben realtime inzicht...",
  },
  {
    slug: "leadwerving-outreach-automatisering",
    icon: Users,
    title: "Leadwerving en outreach automatisering",
    description: "Automatisch leads verzamelen, contactinformatie verrijken en gepersonaliseerde e-mail outreach genereren met AI.",
    results: [
      "Leadverwerking van 25 naar 5–10 min per lead",
      "3–5× hogere outreach efficiëntie",
      "50+ gepersonaliseerde e-mails per dag",
    ],
    quoteLabel: "Klantreview",
    quotePreview: "Dankzij Autronis werken we een stuk efficiënter met onze outreach. Waar het eerst ongeveer 25 minuten kostte om een lead te vinden en te benaderen...",
    quoteAttribution: "Jobby",
  },
];

const ImplementedCard = ({
  cs,
  isHovered,
  isAnyHovered,
  onHover,
  onLeave,
  canHover,
}: {
  cs: CaseStudy;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  canHover: boolean;
}) => {
  const Icon = cs.icon;
  const showHover = canHover && isHovered;
  const showDim = canHover && isAnyHovered && !isHovered;

  return (
    <Link
      to="/case-studies"
      onMouseEnter={canHover ? onHover : undefined}
      onMouseLeave={canHover ? onLeave : undefined}
      className="relative group rounded-xl border border-border bg-card p-4 sm:p-6 flex flex-col h-full overflow-hidden transition-all duration-200 ease-out"
      style={{
        transform: showHover ? "scale(1.015) translateY(-2px)" : "none",
        opacity: showDim ? 0.88 : 1,
        borderColor: showHover ? "hsl(var(--primary) / 0.5)" : undefined,
        boxShadow: showHover ? "0 0 20px hsl(174 78% 41% / 0.12)" : "none",
      }}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Icon size={16} />
          </div>
          <h3 className="text-base sm:text-lg font-bold">{cs.title}</h3>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-5">{cs.description}</p>

        <div className="border-t border-border pt-3 sm:pt-4 flex-1">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide uppercase">Resultaat</p>
          <ul className="space-y-1.5">
            {cs.results.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border pt-3 sm:pt-4 mt-3 sm:mt-4">
          <p className="text-xs font-semibold text-primary mb-2 tracking-wide uppercase">{cs.quoteLabel}</p>
          <p className="text-[12px] sm:text-[13px] text-foreground/70 leading-relaxed italic">
            "{cs.quotePreview}"
          </p>
          {cs.quoteAttribution && (
            <p className="text-[11px] text-muted-foreground mt-1.5">— {cs.quoteAttribution}</p>
          )}
        </div>

        <span className="mt-4 sm:mt-5 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">
          Lees volledige case <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
};


const CaseStudiesPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <section className="py-10 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-8 sm:mb-12">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Case Studies</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Voorbeelden van automatiseringsimplementaties</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Concrete voorbeelden van hoe automatisering processen versnelt, fouten vermindert en schaalbaarheid mogelijk maakt.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {cases.map((cs, i) => (
            <ScrollRevealItem key={cs.slug}>
              <ImplementedCard
                cs={cs}
                isHovered={hoveredIndex === i}
                isAnyHovered={hoveredIndex !== null}
                onHover={() => setHoveredIndex(i)}
                onLeave={() => setHoveredIndex(null)}
                canHover={canHover}
              />
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Button asChild size="lg" className="w-full sm:w-auto">
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
