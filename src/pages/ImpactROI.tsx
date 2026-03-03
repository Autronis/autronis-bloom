import Layout from "@/components/Layout";
import ImpactSimulator from "@/components/impact/ImpactSimulator";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, TrendingUp, Calculator, Building2, ShoppingCart, FileText, Shield } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

const methodItems = [
  { icon: Clock, title: "Directe tijdsbesparing", description: "Uren die vrijkomen door het elimineren van handmatige, repetitieve taken." },
  { icon: TrendingUp, title: "Indirecte foutreductie", description: "Minder fouten, minder correctiewerk, hogere kwaliteit van output." },
  { icon: Users, title: "Vermeden personeelsgroei", description: "Schaalbaarheid realiseren zonder lineaire stijging in personeelskosten." },
  { icon: Building2, title: "Vermindering van operationeel risico", description: "Gestandaardiseerde processen verlagen de kans op kostbare fouten." },
  { icon: Calculator, title: "Structurele kostenoptimalisatie", description: "Doorlopende besparingen die elk kwartaal cumulatief doorwerken." },
];

const scenarios = [
  {
    icon: Building2,
    title: "Operations-team",
    focus: "Workflow-automatisering",
    items: [
      "40+ uur per week aan handmatige verwerking",
      "Indicatieve besparing: €62.000 – €85.000 per jaar",
      "Doorlooptijd goedkeuringen: -70%",
    ],
  },
  {
    icon: ShoppingCart,
    title: "Sales-team",
    focus: "CRM-integraties & leadopvolging",
    items: [
      "25+ uur per week aan handmatige data-invoer",
      "Indicatieve besparing: €38.000 – €52.000 per jaar",
      "Responstijd leads: -60%",
    ],
  },
  {
    icon: FileText,
    title: "Finance / Backoffice",
    focus: "Foutreductie & rapportage",
    items: [
      "15+ uur per week aan correctie- en rapportagewerk",
      "Indicatieve besparing: €28.000 – €42.000 per jaar",
      "Foutpercentage: -80%",
    ],
  },
];

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


      {/* Voorbeeldscenario's */}
      <section className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
        <AmbientLight />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-12">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Voorbeeldscenario's
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Indicatieve impact per team</h2>
              <p className="text-muted-foreground leading-relaxed">
                Onderstaande scenario's zijn gebaseerd op conservatieve aannames bij een gemiddeld MKB-bedrijf.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal>
            <ScrollRevealItem>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {scenarios.map((scenario, idx) => (
                   <motion.div
                    key={scenario.title}
                    className="rounded-xl border border-border bg-card p-6 sm:p-8 transition-all duration-300 ease-out"
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
                      <scenario.icon size={20} />
                    </div>
                    <h3 className="text-lg font-bold mb-1 text-foreground">{scenario.title}</h3>
                    <p className="text-sm text-primary mb-4">{scenario.focus}</p>
                    <ul className="space-y-2.5">
                      {scenario.items.map((item) => (
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
