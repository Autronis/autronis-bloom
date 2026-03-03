import Layout from "@/components/Layout";
import ImpactSimulator from "@/components/impact/ImpactSimulator";
import { Clock, Users, TrendingUp, Calculator, Building2, Shield } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

const ImpactROI = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-16 sm:pt-24 pb-16 overflow-hidden">
        <AmbientLight />
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
        <AmbientLight />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-14">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Methodiek
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Hoe wij Impact & ROI berekenen
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Onze ROI-indicatie is gebaseerd op zes kwantificeerbare impactfactoren die tijdens de analysefase worden doorgerekend naar een financiële businesscase.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto auto-rows-fr">
            {[
              {
                num: "01",
                icon: Clock,
                title: "Reductie van handmatige uren",
                description: "Wij analyseren hoeveel repetitieve, handmatige werkzaamheden structureel kunnen worden geëlimineerd.",
                financial: "Deze uren worden omgerekend naar FTE-waarde op basis van gemiddelde loonkosten inclusief werkgeverslasten en overhead.",
              },
              {
                num: "02",
                icon: Shield,
                title: "Vermindering van correctie- en herstelkosten",
                description: "We identificeren foutpercentages, herstelwerk en dubbele data-invoer binnen processen.",
                financial: "De tijd en kosten van correcties worden berekend en vertaald naar directe kostenreductie.",
              },
              {
                num: "03",
                icon: Calculator,
                title: "Optimalisatie van externe inhuur en overhead",
                description: "We beoordelen in hoeverre externe capaciteit of ondersteunende processen kunnen worden teruggebracht.",
                financial: "Reductie van externe inhuur en operationele overhead wordt direct meegenomen in de businesscase.",
              },
              {
                num: "04",
                icon: TrendingUp,
                title: "Capaciteitsgroei zonder personeelsuitbreiding",
                description: "Vrijgekomen tijd wordt geanalyseerd als beschikbare groeicapaciteit binnen bestaande teams.",
                financial: "We berekenen hoeveel extra output mogelijk is zonder lineaire stijging van personeelskosten.",
              },
              {
                num: "05",
                icon: Building2,
                title: "Risicoreductie en continuïteit",
                description: "We analyseren verstoringen, escalaties, compliance-risico's en handmatige afhankelijkheden.",
                financial: "Potentiële kosten van uitval, herstel en operationele verstoring worden meegenomen in de ROI-berekening.",
              },
              {
                num: "06",
                icon: Users,
                title: "Verbeterde besluitvorming door realtime inzicht",
                description: "We beoordelen de impact van realtime data, snellere rapportage en betere stuurinformatie.",
                financial: "Operationele vertragingen en inefficiënties worden gekwantificeerd op basis van verbeterde informatiestromen.",
              },
            ].map((factor, idx) => (
              <ScrollReveal key={factor.num}>
                <ScrollRevealItem>
                  <motion.div
                    className="rounded-2xl border border-border bg-card p-6 flex flex-col"
                    style={{ minHeight: 280 }}
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
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <factor.icon size={20} className="text-primary" />
                      </div>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-xs font-bold tracking-widest text-primary">{factor.num}</span>
                        <h3 className="text-base font-semibold text-foreground">{factor.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed mb-4">
                      – {factor.description}
                    </p>
                    <div className="flex items-start gap-2.5 mt-auto">
                      <Calculator size={14} className="text-primary mt-[3px] shrink-0" />
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        <span className="font-medium text-foreground">Financiële vertaling:</span>{" "}
                        {factor.financial}
                      </p>
                    </div>
                  </motion.div>
                </ScrollRevealItem>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal className="mt-14">
            <ScrollRevealItem>
              <p className="text-sm text-muted-foreground text-center max-w-3xl mx-auto leading-relaxed">
                Tijdens de impactanalyse vertalen wij deze factoren naar een volledige businesscase inclusief terugverdientijd, ROI-multiple en risico-inschatting.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default ImpactROI;
