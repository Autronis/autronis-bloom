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

      {/* Methodiek — 6 waardecomponenten */}
      <section className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
        <AmbientLight />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Methodiek
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                De 6 structurele waardecomponenten achter onze ROI-berekening
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Wij kwantificeren impact op basis van meetbare operationele en financiële factoren, vertaald naar een concrete businesscase.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal>
            <ScrollRevealItem>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {[
                  {
                    icon: Clock,
                    title: "Directe productiviteitswinst",
                    items: [
                      "Eliminatie van handmatige, repetitieve taken",
                      "Automatisering van goedkeurings- en overdrachtsflows",
                      "Directe capaciteitsvergroting zonder extra FTE",
                    ],
                  },
                  {
                    icon: Shield,
                    title: "Structurele foutreductie",
                    items: [
                      "Minder data-invoerfouten en correctiewerk",
                      "Gestandaardiseerde procesuitvoering",
                      "Hogere kwaliteit en betrouwbaarheid van output",
                    ],
                  },
                  {
                    icon: Calculator,
                    title: "Kostenoptimalisatie",
                    items: [
                      "Vermeden externe inhuur en operationele overhead",
                      "Efficiëntere inzet van personeel",
                      "Cumulatieve besparingen per kwartaal",
                    ],
                  },
                  {
                    icon: Building2,
                    title: "Operationele risicoreductie",
                    items: [
                      "Logging, monitoring en audittrails",
                      "Failover- en fallbackstrategieën",
                      "Compliance en traceerbaarheid",
                    ],
                  },
                  {
                    icon: TrendingUp,
                    title: "Schaalbaarheid zonder lineaire kosten",
                    items: [
                      "Groei zonder evenredige FTE-toename",
                      "Systemen die meeschalen met volume",
                      "Capaciteitsvergroting zonder extra loonkosten",
                    ],
                  },
                  {
                    icon: Users,
                    title: "Datagedreven sturing",
                    items: [
                      "Realtime inzicht in KPI's en operationele prestaties",
                      "Vroegtijdige detectie van afwijkingen",
                      "Onderbouwde besluitvorming op directieniveau",
                    ],
                  },
                ].map((block, idx) => (
                  <motion.div
                    key={block.title}
                    className="rounded-2xl border border-primary/15 bg-card/80 backdrop-blur-sm p-6 cursor-default"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.07, duration: 0.45 }}
                    whileHover={{
                      scale: 1.03,
                      y: -4,
                      borderColor: "hsl(174, 78%, 41%, 0.5)",
                      boxShadow: "0 8px 28px hsl(174, 78%, 41%, 0.08)",
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                      <block.icon size={20} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-3">{block.title}</h3>
                    <ul className="space-y-2">
                      {block.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground text-center mt-10 max-w-3xl mx-auto leading-relaxed italic">
                Tijdens de impactanalyse vertalen wij deze factoren naar een volledige businesscase inclusief risico-inschatting en terugverdientijd.
              </p>

            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default ImpactROI;
