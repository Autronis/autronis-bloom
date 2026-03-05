import { ArrowRight, Building2, ShoppingCart, FileText, TrendingUp, Clock, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const impactBlocks = [
  {
    icon: Building2,
    title: "Operations-team",
    highlight: "Tot €85.000 per jaar aan structurele besparing",
    sub: "Gebaseerd op 40+ uur per week aan repetitieve verwerking.",
    bullets: [
      "40+ uur per week geautomatiseerd",
      "Aanzienlijk kortere doorlooptijden",
      "Minder handmatige overdrachten",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Sales-team",
    highlight: "Tot €52.000 per jaar aan efficiëntiewinst",
    sub: "Gebaseerd op tijdsbesparing binnen CRM en opvolgprocessen.",
    bullets: [
      "Minder administratieve CRM-taken",
      "Snellere leadopvolging",
      "Meer tijd voor omzetgeneratie",
    ],
  },
  {
    icon: FileText,
    title: "Finance / Backoffice",
    highlight: "Tot €42.000 per jaar aan kostenreductie",
    sub: "Gebaseerd op foutreductie en automatisering van rapportage.",
    bullets: [
      "Aanzienlijke foutreductie",
      "Snellere rapportages",
      "Minder correctiewerk",
    ],
  },
];

const kernpunten = [
  { icon: TrendingUp, text: "Tot 4x ROI binnen 12 maanden*" },
  { icon: Timer, text: "Break-even vaak binnen 3–6 maanden" },
  { icon: Clock, text: "Structurele kostenoptimalisatie" },
];

const ROIPreview = () => {
  return (
    <section className="py-10 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-8 sm:mb-14">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Voorbeeldscenario's
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Indicatieve impact per team
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Onderstaande scenario's zijn gebaseerd op conservatieve aannames bij een gemiddeld MKB-bedrijf.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* 3 impact blocks */}
        <ScrollReveal>
          <ScrollRevealItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mb-4 sm:mb-6">
              {impactBlocks.map((block) => (
                <div
                  key={block.title}
                  className="rounded-xl border border-border bg-card p-4 sm:p-6 md:p-7 transition-all duration-200 ease-out md:hover:scale-[1.015] md:hover:-translate-y-[2px] md:hover:border-primary/50 md:hover:shadow-[0_0_20px_hsl(174_78%_41%_/_0.12)]"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <block.icon size={16} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">{block.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-primary mb-1 leading-snug">
                    {block.highlight}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3 sm:mb-4">
                    {block.sub}
                  </p>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {block.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto mb-8 sm:mb-12 italic">
              Scenario's gebaseerd op conservatieve aannames binnen middelgrote MKB-organisaties. Werkelijke impact is afhankelijk van procescomplexiteit en volumes.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Strategic text block */}
        <ScrollReveal className="max-w-4xl mx-auto">
          <ScrollRevealItem>
            <div
              className="rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 mb-8 sm:mb-10 transition-all duration-200 ease-out md:hover:scale-[1.015] md:hover:-translate-y-[2px] md:hover:border-primary/50 md:hover:shadow-[0_0_20px_hsl(174_78%_41%_/_0.12)]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-10 items-start">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
                    Efficiëntie zonder lineaire personeelsgroei
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Automatisering verlaagt niet alleen kosten, maar verhoogt ook schaalbaarheid en voorspelbaarheid. Vrijgekomen capaciteit kan worden ingezet voor groei, zonder dat personeelskosten evenredig stijgen.
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 sm:gap-3 lg:min-w-[240px]">
                  {kernpunten.map((item) => (
                    <div key={item.text} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <item.icon size={16} />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              *Afhankelijk van implementatieomvang en procescomplexiteit.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/impact-roi#roi-scan">
                Bereken uw potentiële impact
                <ArrowRight size={18} />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Gebruik onze ROI-calculator en ontvang direct een indicatieve businesscase inclusief terugverdientijd.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ROIPreview;
