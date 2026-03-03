import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, TrendingUp, Calculator, Building2, ShoppingCart, FileText, Shield } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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

const ROIScanModule = () => {
  const [employees, setEmployees] = useState<string>("");
  const [hourlyRate, setHourlyRate] = useState<string>("");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("");
  const [automationRate, setAutomationRate] = useState<string>("");
  const [calculated, setCalculated] = useState(false);

  const results = useMemo(() => {
    const emp = parseFloat(employees) || 0;
    const rate = parseFloat(hourlyRate) || 0;
    const hours = parseFloat(hoursPerWeek) || 0;
    const autoRate = (parseFloat(automationRate) || 0) / 100;

    const weeklyHoursSaved = hours * autoRate;
    const yearlyHoursSaved = weeklyHoursSaved * 48;
    const yearlySavings = yearlyHoursSaved * rate;
    const implementationCost = yearlySavings * 0.3; // conservative estimate
    const paybackMonths = implementationCost > 0 ? Math.round((implementationCost / yearlySavings) * 12 * 10) / 10 : 0;

    return {
      yearlyHoursSaved: Math.round(yearlyHoursSaved),
      yearlySavings: Math.round(yearlySavings),
      paybackMonths,
      isValid: emp > 0 && rate > 0 && hours > 0 && autoRate > 0,
    };
  }, [employees, hourlyRate, hoursPerWeek, automationRate]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="rounded-xl border border-border bg-card p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold">ROI-scan</h3>
            <p className="text-sm text-muted-foreground">Indicatieve impactanalyse</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Aantal medewerkers</label>
            <Input
              type="number"
              placeholder="bijv. 12"
              value={employees}
              onChange={(e) => { setEmployees(e.target.value); setCalculated(false); }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gemiddelde uurkost (€)</label>
            <Input
              type="number"
              placeholder="bijv. 55"
              value={hourlyRate}
              onChange={(e) => { setHourlyRate(e.target.value); setCalculated(false); }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Uren per week aan repetitieve taken</label>
            <Input
              type="number"
              placeholder="bijv. 40"
              value={hoursPerWeek}
              onChange={(e) => { setHoursPerWeek(e.target.value); setCalculated(false); }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Verwachte automatiseringsgraad (%)</label>
            <Input
              type="number"
              placeholder="bijv. 65"
              value={automationRate}
              onChange={(e) => { setAutomationRate(e.target.value); setCalculated(false); }}
            />
          </div>
        </div>

        <div className="mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setCalculated(true)}
            disabled={!results.isValid}
          >
            Bereken indicatieve impact
            <ArrowRight size={18} />
          </Button>
        </div>

        {calculated && results.isValid && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-8 pt-8 border-t border-border"
          >
            <p className="text-xs font-semibold text-primary mb-5 tracking-widest uppercase">
              Indicatieve resultaten
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-lg border border-border bg-muted/50 p-5">
                <p className="text-xs text-muted-foreground mb-1">Vrijgespeelde capaciteit</p>
                <p className="text-2xl font-bold text-foreground">{results.yearlyHoursSaved.toLocaleString("nl-NL")}</p>
                <p className="text-sm text-muted-foreground">uur per jaar</p>
              </div>
              <div className="rounded-lg border border-primary/30 bg-primary/[0.04] p-5">
                <p className="text-xs text-muted-foreground mb-1">Structurele kostenreductie</p>
                <p className="text-3xl font-bold text-primary">€{results.yearlySavings.toLocaleString("nl-NL")}</p>
                <p className="text-sm text-muted-foreground">per jaar</p>
              </div>
              <div className="rounded-lg border border-border bg-muted/50 p-5">
                <p className="text-xs text-muted-foreground mb-1">Indicatieve terugverdientijd</p>
                <p className="text-2xl font-bold text-foreground">{results.paybackMonths}</p>
                <p className="text-sm text-muted-foreground">maanden</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            Deze berekening is indicatief. Tijdens de analysefase wordt een volledige businesscase opgesteld inclusief risico- en impactanalyse.
          </p>
          <Button asChild size="lg">
            <Link to="/book">
              Plan een impactanalyse
              <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

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

      {/* ROI-scan Module */}
      <section className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
        <AmbientLight />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-12">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                ROI-scan
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Bereken uw indicatieve impact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Vul onderstaande gegevens in voor een eerste indicatie van de zakelijke impact van automatisering.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ROIScanModule />
        </div>
      </section>

      {/* Methodiek onderbouwing */}
      <section className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
        <AmbientLight />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-12">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Methodiek
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Waarop wij deze berekening baseren
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                De ROI-indicatie is gebaseerd op vijf structurele impactfactoren die wij tijdens de analysefase kwantificeren.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal>
            <ScrollRevealItem>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {[
                  {
                    icon: Clock,
                    title: "Directe tijdsbesparing",
                    items: [
                      "Analyse van repetitieve taken",
                      "Eliminatie van handmatige overdrachten",
                      "Automatisering van goedkeuringsflows",
                    ],
                  },
                  {
                    icon: TrendingUp,
                    title: "Indirecte foutreductie",
                    items: [
                      "Minder correctiewerk",
                      "Minder data-invoerfouten",
                      "Gestandaardiseerde procesuitvoering",
                    ],
                  },
                  {
                    icon: Calculator,
                    title: "Structurele kostenoptimalisatie",
                    items: [
                      "Vermeden externe inhuur",
                      "Minder operationele overhead",
                      "Efficiëntere inzet van personeel",
                    ],
                  },
                  {
                    icon: Building2,
                    title: "Vermindering van operationeel risico",
                    items: [
                      "Logging & monitoring",
                      "Failover- en fallbackstrategieën",
                      "Compliance & auditability",
                    ],
                  },
                  {
                    icon: Users,
                    title: "Vermeden personeelsgroei",
                    items: [
                      "Schaalbaarheid zonder lineaire FTE-toename",
                      "Capaciteitsvergroting zonder extra loonkosten",
                    ],
                  },
                ].map((block, idx) => (
                  <motion.div
                    key={block.title}
                    className="rounded-xl border border-border bg-card p-6 transition-all duration-300 ease-out"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.4 }}
                    whileHover={{
                      scale: 1.02,
                      borderColor: "hsl(174, 78%, 41%, 0.5)",
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <block.icon size={20} />
                    </div>
                    <h3 className="font-semibold mb-3 text-foreground">{block.title}</h3>
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

              <p className="text-sm text-muted-foreground text-center mt-10 max-w-2xl mx-auto leading-relaxed">
                Tijdens de impactanalyse worden deze factoren vertaald naar een volledige businesscase inclusief risico-inschatting en terugverdientijd.
              </p>

            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default ImpactROI;
