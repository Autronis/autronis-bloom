import Layout from "@/components/Layout";
import ImpactSimulator from "@/components/impact/ImpactSimulator";
import { Clock, Users, TrendingUp, Calculator, Building2, Shield } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";


const ImpactROI = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-16 sm:pt-24 pb-16 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Impact & ROI
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Impact is meetbaar. Wij rekenen voordat we bouwen.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Automatisering is alleen waardevol wanneer de zakelijke impact aantoonbaar is. Daarom onderbouwen wij elke implementatie met een gestructureerde ROI-analyse.
            </p>
          </motion.div>
        </div>
      </section>





      {/* Impact Simulator */}
      <ImpactSimulator />

      {/* Methodiek — 6 impactfactoren */}
      <section className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-14">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Methodiek
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Van impact naar onderbouwde businesscase
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Elke ROI-indicatie wordt gebaseerd op meetbare aannames, expliciete rekenregels en transparante uitgangspunten. Tijdens de analysefase vertalen wij operationele impact naar een financieel onderbouwde businesscase.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto auto-rows-fr">
            {[
              {
                num: "01",
                icon: Clock,
                title: "Reductie van handmatige uren",
                description: "Wij analyseren repetitieve, foutgevoelige en tijdsintensieve werkzaamheden die structureel geautomatiseerd kunnen worden.",
                financial: "Vrijgekomen uren worden omgerekend naar structurele FTE-besparing op basis van volledig belaste loonkosten (inclusief werkgeverslasten en overhead).",
              },
              {
                num: "02",
                icon: Shield,
                title: "Vermindering van correctie- en herstelkosten",
                description: "Wij identificeren foutpercentages, herstelwerk, dubbele data-invoer en inefficiënte overdrachtsmomenten binnen processen.",
                financial: "De tijd en kosten van correcties worden gekwantificeerd en vertaald naar directe kostenreductie en lagere operationele druk.",
              },
              {
                num: "03",
                icon: Calculator,
                title: "Optimalisatie van externe inhuur en overhead",
                description: "Wij beoordelen in hoeverre externe capaciteit, ondersteunende processen of tijdelijke inzet structureel kan worden teruggebracht.",
                financial: "Reductie van externe inhuur en operationele overhead wordt direct meegenomen in de totale businesscase-impact.",
              },
              {
                num: "04",
                icon: TrendingUp,
                title: "Capaciteitsgroei zonder personeelsuitbreiding",
                description: "Vrijgekomen tijd wordt geanalyseerd als beschikbare groeicapaciteit binnen bestaande teams.",
                financial: "Wij berekenen hoeveel extra output mogelijk is zonder lineaire stijging van personeelskosten.",
              },
              {
                num: "05",
                icon: Building2,
                title: "Risicoreductie en continuïteit",
                description: "Wij analyseren verstoringen, escalaties, afhankelijkheden en compliance-risico's binnen kritieke processen.",
                financial: "Potentiële kosten van uitval, herstel en operationele verstoring worden meegenomen in de ROI-berekening.",
              },
              {
                num: "06",
                icon: Users,
                title: "Verbeterde besluitvorming door realtime inzicht",
                description: "Wij beoordelen de impact van realtime data, snellere rapportage en verbeterde stuurinformatie op operationele prestaties.",
                financial: "Operationele vertragingen en inefficiënties worden gekwantificeerd op basis van verbeterde informatiestromen en besluitvorming.",
              },
            ].map((factor, idx) => (
              <ScrollReveal key={factor.num}>
                <ScrollRevealItem>
                  <motion.div
                    className="rounded-2xl border border-border bg-card p-5 flex flex-col"
                    style={{ minHeight: 220 }}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06, duration: 0.45 }}
                    whileHover={{
                      scale: 1.015,
                      y: -2,
                      borderColor: "hsl(174, 78%, 41%, 0.5)",
                      boxShadow: "0 4px 24px hsl(174, 78%, 33%, 0.08)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <factor.icon size={20} className="text-primary" />
                      </div>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-sm font-bold tracking-widest text-primary">{factor.num}</span>
                        <h3 className="text-base font-semibold text-foreground">{factor.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed mb-2">
                      – {factor.description}
                    </p>
                    <div className="flex items-start gap-2.5 mt-auto">
                      <Calculator size={14} className="text-primary mt-[3px] shrink-0" />
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        <span className="font-medium text-foreground">Doorrekening:</span>{" "}
                        {factor.financial}
                      </p>
                    </div>
                  </motion.div>
                </ScrollRevealItem>
              </ScrollReveal>
            ))}
          </div>

          {/* Autoriteitsbalk */}
          <ScrollReveal className="mt-10 max-w-5xl mx-auto">
            <ScrollRevealItem>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 py-5 px-6 rounded-xl border border-border/50 bg-card/50">
                {[
                  "Geen black-box berekeningen",
                  "Geen aannames zonder onderbouwing",
                  "Transparante rekenmodellen",
                  "Herleidbaar naar uw eigen cijfers",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide">
                    <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                    {item}
                  </span>
                ))}
              </div>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal className="mt-14">
            <ScrollRevealItem>
              <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
                Tijdens de impactanalyse vertalen wij deze factoren naar een volledige businesscase inclusief terugverdientijd, structurele besparing en strategische waarde.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default ImpactROI;
