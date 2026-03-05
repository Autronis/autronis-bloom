// Layout is provided by App.tsx
import ImpactSimulator from "@/components/impact/ImpactSimulator";
import SEOHead from "@/components/SEOHead";
import { Clock, CheckCircle, Users, TrendingUp, Shield, BarChart3, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const factors = [
  {
    icon: Clock,
    title: "Reductie van handmatige uren",
    description: "Repetitieve en tijdsintensieve werkzaamheden worden geïdentificeerd en waar mogelijk geautomatiseerd.",
    financial: "Vrijgekomen tijd wordt omgerekend naar structurele kostenbesparing op basis van volledig belaste loonkosten.",
  },
  {
    icon: CheckCircle,
    title: "Vermindering van fouten en correctiewerk",
    description: "Foutpercentages, herstelwerk en dubbele invoer binnen processen worden geanalyseerd.",
    financial: "De tijd en kosten van correcties worden vertaald naar directe kostenreductie.",
  },
  {
    icon: Users,
    title: "Vermindering van externe inzet",
    description: "We analyseren waar externe capaciteit of tijdelijke inzet structureel kan worden teruggebracht.",
    financial: "Besparing op externe inhuur wordt meegenomen in de totale businesscase.",
  },
  {
    icon: TrendingUp,
    title: "Capaciteitsgroei binnen bestaande teams",
    description: "Vrijgekomen tijd wordt beschouwd als beschikbare groeicapaciteit binnen bestaande teams.",
    financial: "We berekenen hoeveel extra output mogelijk is zonder stijging van personeelskosten.",
  },
  {
    icon: Shield,
    title: "Risicoreductie en continuïteit",
    description: "Verstoringen, afhankelijkheden en operationele risico's worden meegenomen in de analyse.",
    financial: "Potentiële kosten van uitval en verstoringen worden opgenomen in de impactberekening.",
  },
  {
    icon: BarChart3,
    title: "Betere besluitvorming door realtime inzicht",
    description: "Realtime data en snellere rapportage verbeteren de sturing van processen.",
    financial: "Efficiëntere besluitvorming vertaalt zich naar hogere operationele prestaties.",
  },
];

const ImpactROI = () => {
  return (
    <>
      {/* Impact Simulator */}
      <ImpactSimulator />

      {/* Methodiek */}
      <section className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Methodiek
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Waarop onze impact- en ROI-berekening is gebaseerd
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                De factoren die bepalen hoe automatisering wordt vertaald naar financiële impact.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* 3x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10 auto-rows-fr">
            {factors.map((factor, idx) => (
              <ScrollReveal key={factor.title} className="h-full">
                <ScrollRevealItem className="h-full">
                  <motion.div
                    className="rounded-xl border border-border bg-card p-5 flex flex-col h-full"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                    whileHover={{
                      scale: 1.015,
                      y: -2,
                      borderColor: "hsl(174, 78%, 41%, 0.5)",
                      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
                    }}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <factor.icon size={18} />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{factor.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {factor.description}
                    </p>
                    <div className="flex items-start gap-2 mt-auto pt-3 border-t border-border/50">
                      <Calculator size={12} className="text-primary mt-[2px] shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground">Doorrekening:</span>{" "}
                        {factor.financial}
                      </p>
                    </div>
                  </motion.div>
                </ScrollRevealItem>
              </ScrollReveal>
            ))}
          </div>

          {/* Transparantieblok */}
          <ScrollReveal className="max-w-5xl mx-auto">
            <ScrollRevealItem>
              <div className="rounded-xl border border-border/50 bg-card/50 p-6">
                <p className="text-sm font-medium text-foreground mb-4">
                  Onze berekeningen zijn gebaseerd op:
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-2.5">
                  {[
                    "Geen black-box berekeningen",
                    "Geen aannames zonder onderbouwing",
                    "Transparante rekenregels",
                    "Herleidbaar naar uw eigen cijfers",
                  ].map((item) => (
                    <span key={item} className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide">
                      <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-8 leading-relaxed max-w-2xl mx-auto">
                Tijdens de impactanalyse vertalen wij deze factoren naar een volledige businesscase met terugverdientijd, structurele besparing en ROI.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default ImpactROI;
