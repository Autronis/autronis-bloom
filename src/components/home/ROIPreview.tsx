import { ArrowRight, Building2, ShoppingCart, FileText, TrendingUp, Clock, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

const impactBlocks = [
  {
    icon: Building2,
    title: "Operations-team",
    highlight: "Tot €85.000 per jaar aan structurele besparing",
    bullets: [
      "40+ uur per week geautomatiseerd",
      "70% kortere doorlooptijden",
      "Minder handmatige overdrachten",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Sales-team",
    highlight: "Tot €52.000 per jaar aan efficiëntiewinst",
    bullets: [
      "Minder CRM-administratie",
      "60% snellere leadopvolging",
      "Meer tijd voor omzetgeneratie",
    ],
  },
  {
    icon: FileText,
    title: "Finance / Backoffice",
    highlight: "Tot €42.000 per jaar aan kostenreductie",
    bullets: [
      "Tot 80% foutreductie",
      "Snellere rapportages",
      "Minder correctiewerk",
    ],
  },
];

const kernpunten = [
  { icon: TrendingUp, text: "Tot 4x ROI binnen 12 maanden" },
  { icon: Timer, text: "Terugverdientijd vaak < 6 maanden" },
  { icon: Clock, text: "Structurele kostenoptimalisatie" },
];

const ROIPreview = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
      <AmbientLight />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Impact & ROI
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Wat automatisering concreet kan opleveren
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Indicatieve impact op basis van een gemiddeld MKB-bedrijf. Berekeningen zijn conservatief en gebaseerd op structurele procesoptimalisatie.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* 3 impact blocks */}
        <ScrollReveal>
          <ScrollRevealItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-12">
              {impactBlocks.map((block, idx) => (
                <motion.div
                  key={block.title}
                  className="rounded-xl border border-border bg-card p-6 sm:p-7 transition-all duration-300"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: "hsl(174, 78%, 41%, 0.5)",
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <block.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground">{block.title}</h3>
                  <p className="text-sm font-semibold text-primary mb-4 leading-snug">
                    {block.highlight}
                  </p>
                  <ul className="space-y-2">
                    {block.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Strategic text block */}
        <ScrollReveal className="max-w-4xl mx-auto">
          <ScrollRevealItem>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8 mb-10">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-start">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Efficiëntie zonder lineaire personeelsgroei
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Automatisering verlaagt niet alleen kosten, maar verhoogt ook schaalbaarheid en voorspelbaarheid. Vrijgekomen capaciteit kan worden ingezet voor groei, zonder dat personeelskosten evenredig stijgen.
                  </p>
                </div>
                <div className="flex flex-col gap-3 lg:min-w-[240px]">
                  {kernpunten.map((item) => (
                    <div key={item.text} className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <item.icon size={16} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Button asChild size="lg">
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
