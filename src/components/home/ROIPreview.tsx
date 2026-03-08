import { ArrowRight, Building2, ShoppingCart, FileText, TrendingUp, Clock, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Example Scenarios",
    title: "Indicative impact per team",
    desc: "The scenarios below are based on conservative assumptions for an average SMB company.",
    disclaimer: "Scenarios based on conservative assumptions within mid-sized SMB organizations. Actual impact depends on process complexity and volumes.",
    stratTitle: "Efficiency without linear headcount growth",
    stratDesc: "Automation not only reduces costs but also increases scalability and predictability. Freed-up capacity can be deployed for growth without proportional increases in staffing costs.",
    kernpunten: [
      { text: "Structural annual savings*" },
      { text: "Instant insight into saved hours" },
      { text: "Structural cost optimization" },
    ],
    footnote: "*Dependent on implementation scope and process complexity.",
    ctaBtn: "Calculate your potential impact",
    ctaSub: "Use our ROI calculator and receive an indicative business case including payback period.",
    blocks: [
      { title: "Operations team", highlight: "Up to €85,000 per year in structural savings", sub: "Based on 40+ hours per week of repetitive processing.", bullets: ["40+ hours per week automated", "Significantly shorter turnaround times", "Fewer manual handovers"] },
      { title: "Sales team", highlight: "Up to €52,000 per year in efficiency gains", sub: "Based on time savings within CRM and follow-up processes.", bullets: ["Fewer administrative CRM tasks", "Faster lead follow-up", "More time for revenue generation"] },
      { title: "Finance / Back office", highlight: "Up to €42,000 per year in cost reduction", sub: "Based on error reduction and reporting automation.", bullets: ["Significant error reduction", "Faster reporting", "Less correction work"] },
    ],
  },
  nl: {
    label: "Voorbeeldscenario's",
    title: "Indicatieve impact per team",
    desc: "De scenario's hieronder zijn gebaseerd op conservatieve aannames voor een gemiddeld MKB-bedrijf.",
    disclaimer: "Scenario's gebaseerd op conservatieve aannames binnen middelgrote MKB-organisaties. Werkelijke impact hangt af van procescomplexiteit en volumes.",
    stratTitle: "Efficiëntie zonder lineaire personeelsgroei",
    stratDesc: "Automatisering verlaagt niet alleen kosten, maar verhoogt ook schaalbaarheid en voorspelbaarheid. Vrijgekomen capaciteit kan worden ingezet voor groei zonder evenredige stijging van personeelskosten.",
    kernpunten: [
      { text: "Structurele jaarlijkse besparing*" },
      { text: "Direct inzicht in bespaarde uren" },
      { text: "Structurele kostenoptimalisatie" },
    ],
    footnote: "*Afhankelijk van implementatiescope en procescomplexiteit.",
    ctaBtn: "Bereken jouw potentiële impact",
    ctaSub: "Gebruik onze ROI-calculator en ontvang een indicatieve businesscase inclusief terugverdientijd.",
    blocks: [
      { title: "Operations-team", highlight: "Tot €85.000 per jaar aan structurele besparingen", sub: "Gebaseerd op 40+ uur per week aan repetitieve verwerking.", bullets: ["40+ uur per week geautomatiseerd", "Aanzienlijk kortere doorlooptijden", "Minder handmatige overdrachten"] },
      { title: "Sales-team", highlight: "Tot €52.000 per jaar aan efficiëntiewinst", sub: "Gebaseerd op tijdsbesparing binnen CRM- en opvolgprocessen.", bullets: ["Minder administratieve CRM-taken", "Snellere lead-opvolging", "Meer tijd voor omzetgeneratie"] },
      { title: "Finance / Backoffice", highlight: "Tot €42.000 per jaar aan kostenreductie", sub: "Gebaseerd op foutreductie en rapportage-automatisering.", bullets: ["Aanzienlijke foutreductie", "Snellere rapportage", "Minder correctiewerk"] },
    ],
  },
};

const blockIcons = [Building2, ShoppingCart, FileText];
const kernIcons = [TrendingUp, Timer, Clock];

const ROIPreview = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <section className="py-10 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-8 sm:mb-14">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t.title}</h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">{t.desc}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal><ScrollRevealItem>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mb-4 sm:mb-6">
            {t.blocks.map((block, i) => {
              const Icon = blockIcons[i];
              return (
                <div key={block.title} className="rounded-xl border border-border bg-card p-4 sm:p-6 md:p-7 transition-all duration-200 ease-out md:hover:scale-[1.015] md:hover:-translate-y-[2px] md:hover:border-primary/50 md:hover:shadow-[0_0_20px_hsl(174_78%_41%_/_0.12)]">
                  <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3"><div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0"><Icon size={16} /></div><h3 className="text-base sm:text-lg font-bold text-foreground">{block.title}</h3></div>
                  <p className="text-xs sm:text-sm font-semibold text-primary mb-1 leading-snug">{block.highlight}</p>
                  <p className="text-xs text-muted-foreground mb-3 sm:mb-4">{block.sub}</p>
                  <ul className="space-y-1.5 sm:space-y-2">{block.bullets.map((item) => <li key={item} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-muted-foreground"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{item}</li>)}</ul>
                </div>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto mb-8 sm:mb-12 italic">{t.disclaimer}</p>
        </ScrollRevealItem></ScrollReveal>

        <ScrollReveal className="max-w-4xl mx-auto"><ScrollRevealItem>
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 mb-8 sm:mb-10 transition-all duration-200 ease-out md:hover:scale-[1.015] md:hover:-translate-y-[2px] md:hover:border-primary/50 md:hover:shadow-[0_0_20px_hsl(174_78%_41%_/_0.12)]">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 sm:gap-6 lg:gap-10 items-start">
              <div><h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">{t.stratTitle}</h3><p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t.stratDesc}</p></div>
              <div className="flex flex-col gap-2.5 sm:gap-3 lg:min-w-[240px]">
                {t.kernpunten.map((item, i) => { const KIcon = kernIcons[i]; return <div key={item.text} className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0"><KIcon size={16} /></div><span className="text-xs sm:text-sm font-medium text-foreground">{item.text}</span></div>; })}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto mb-8 sm:mb-10">{t.footnote}</p>
        </ScrollRevealItem></ScrollReveal>

        <ScrollReveal className="text-center"><ScrollRevealItem>
          <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/impact-roi#roi-scan">{t.ctaBtn}<ArrowRight size={18} /></Link></Button>
          <p className="text-xs text-muted-foreground mt-3">{t.ctaSub}</p>
        </ScrollRevealItem></ScrollReveal>
      </div>
    </section>
  );
};

export default ROIPreview;
