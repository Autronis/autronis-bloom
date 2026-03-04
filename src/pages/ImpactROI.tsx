import Layout from "@/components/Layout";
import ImpactSimulator from "@/components/impact/ImpactSimulator";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const factors = [
  { num: "1", title: "Reductie van handmatige uren", description: "Vrijgekomen tijd door automatisering wordt omgerekend naar structurele besparing op basis van volledig belaste loonkosten." },
  { num: "2", title: "Vermindering van fouten en correctiewerk", description: "Foutpercentages, herstelwerk en dubbele invoer worden vertaald naar directe kostenreductie." },
  { num: "3", title: "Vermindering van externe inzet", description: "Waar mogelijk wordt afhankelijkheid van externe capaciteit of tijdelijke inzet structureel teruggebracht." },
  { num: "4", title: "Capaciteitsgroei binnen bestaande teams", description: "Vrijgekomen tijd wordt beschouwd als beschikbare groeicapaciteit zonder extra personeelskosten." },
  { num: "5", title: "Risicoreductie en continuïteit", description: "Verstoringen, afhankelijkheden en operationele risico's worden meegenomen in de impactanalyse." },
  { num: "6", title: "Betere besluitvorming door realtime inzicht", description: "Snellere rapportage en realtime data zorgen voor efficiëntere sturing van processen." },
];

const ImpactROI = () => {
  return (
    <Layout>
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
                Hoe wij impact vertalen naar een businesscase
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Elke ROI-indicatie wordt gebaseerd op meetbare aannames en transparante rekenregels.
                Tijdens de impactanalyse vertalen wij operationele verbeteringen naar een financieel onderbouwde businesscase.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* Factors list */}
          <ScrollReveal className="max-w-3xl mx-auto mb-12">
            <ScrollRevealItem>
              <p className="text-sm font-semibold text-foreground mb-6">
                Waarop de impactberekening is gebaseerd
              </p>
              <div className="space-y-5">
                {factors.map((factor) => (
                  <div key={factor.num} className="flex gap-4">
                    <span className="text-sm font-bold text-primary tabular-nums mt-0.5 shrink-0">
                      {factor.num}.
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{factor.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{factor.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* Transparantieblok */}
          <ScrollReveal className="max-w-3xl mx-auto">
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
                Tijdens de impactanalyse vertalen wij deze factoren naar een volledige businesscase inclusief terugverdientijd, structurele besparing en ROI.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default ImpactROI;
