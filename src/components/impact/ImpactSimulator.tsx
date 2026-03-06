import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle, TrendingUp, Calendar, Percent, Euro,
  ArrowRight, Info, ChevronDown,
} from "lucide-react";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";


/* ─── helpers ─── */
const formatCurrency = (v: number) =>
  `€${Math.round(v).toLocaleString("nl-NL")}`;

const useAnimatedValue = (target: number, duration = 600) => {
  const [display, setDisplay] = useState(target);
  const raf = useRef<number>();
  const prev = useRef(target);

  useEffect(() => {
    const from = prev.current;
    const diff = target - from;
    if (Math.abs(diff) < 1) { setDisplay(target); prev.current = target; return; }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + diff * ease));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else prev.current = target;
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration]);

  return display;
};

/* ─── main ─── */
const ImpactSimulator = () => {
  const [hours, setHours] = useState(40);
  const [rate, setRate] = useState(55);
  const [autoPercent, setAutoPercent] = useState(65);
  const [errorPercent, setErrorPercent] = useState(5);
  const [activeSlider, setActiveSlider] = useState<string | null>(null);
  const [showTransparency, setShowTransparency] = useState(false);

  const results = useMemo(() => {
    const autoFraction = autoPercent / 100;
    const errorFraction = errorPercent / 100;
    const weeksPerMonth = 4.33;
    const monthlySavingsHours = hours * autoFraction * rate * weeksPerMonth;
    const monthlyErrorSavings = hours * errorFraction * rate * weeksPerMonth * 0.5;
    const totalMonthlySavings = monthlySavingsHours + monthlyErrorSavings;
    const totalYearlySavings = totalMonthlySavings * 12;

    const complexityVariation = autoPercent <= 50 ? 0 : autoPercent <= 70 ? 800 : 1500;
    const investment = 18500 + complexityVariation;

    const netBenefitYear1 = totalYearlySavings - investment;
    const totalValue3Year = (totalYearlySavings * 3) - investment;
    const breakEvenMonths = totalMonthlySavings > 0 ? investment / totalMonthlySavings : 0;
    const roiMultiplier = investment > 0 ? totalYearlySavings / investment : 0;

    const hoursFactor = Math.min(hours / 60, 1) * 30;
    const autoFactor = autoFraction * 40;
    const investFactor = Math.min(investment / 30000, 1) * 30;
    const confidence = Math.round(Math.min(hoursFactor + autoFactor + investFactor, 95));

    return {
      monthlySavings: totalMonthlySavings,
      yearlySavings: totalYearlySavings,
      investment,
      netBenefitYear1,
      totalValue3Year,
      breakEvenMonths: Math.round(breakEvenMonths * 10) / 10,
      roiMultiplier,
      confidence,
    };
  }, [hours, rate, autoPercent, errorPercent]);

  const animYearly = useAnimatedValue(Math.round(results.yearlySavings));
  const animMonthly = useAnimatedValue(Math.round(results.monthlySavings));
  const animNet = useAnimatedValue(Math.round(results.netBenefitYear1));
  const animTotal3Year = useAnimatedValue(Math.round(results.totalValue3Year));

  const chartData = [
    { name: "Huidige kosten", value: Math.round(hours * rate * 4.33), type: "current" },
    { name: "Na automatisering", value: Math.round(hours * (1 - autoPercent / 100) * rate * 4.33), type: "automated" },
    { name: "Besparing", value: Math.round(results.monthlySavings), type: "savings" },
  ];

  const sliders = [
    { id: "hours", label: "Handmatige uren per week", value: hours, onChange: setHours, min: 5, max: 80, step: 1, display: `${hours} uur`, hint: "Tijd besteed aan repetitieve of handmatige processen." },
    { id: "rate", label: "Gemiddelde uurkosten", value: rate, onChange: setRate, min: 25, max: 120, step: 5, display: `€${rate}`, hint: "Inclusief salaris, werkgeverslasten en overige personeelskosten." },
    { id: "auto", label: "Automatiseringspercentage", value: autoPercent, onChange: setAutoPercent, min: 30, max: 85, step: 1, display: `${autoPercent}%`, hint: "Conservatieve inschatting na validatie en controle." },
    { id: "error", label: "Geschat foutpercentage", value: errorPercent, onChange: setErrorPercent, min: 0, max: 25, step: 1, display: `${errorPercent}%`, hint: "Percentage van totale werktijd besteed aan correcties, herstelwerk of dubbele invoer.", subHint: "Bij administratieve processen ligt dit vaak tussen 2–8%." },
  ];

  const handleSliderChange = useCallback((setter: (v: number) => void, id: string) => (v: number) => {
    setter(v);
    setActiveSlider(id);
  }, []);

  const handleSliderEnd = useCallback(() => setActiveSlider(null), []);

  return (
    <section id="roi-scan" className="relative overflow-hidden scroll-mt-24">
      
      <div className="container mx-auto px-4 lg:px-8 py-16 sm:py-24 relative z-10">
        {/* Header */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Impact & ROI</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Impact is meetbaar. Daarom rekenen wij voordat we bouwen.
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Automatisering is alleen waardevol wanneer de zakelijke impact aantoonbaar is.
              Daarom berekenen wij vooraf een conservatieve businesscase met verwachte besparing, break-even punt en ROI.
            </p>
            <p className="text-sm text-foreground/80 mt-6 font-medium">
              Vul uw situatie in en bereken direct de potentiële impact.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Single block */}
        <div className="max-w-6xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* LEFT — Results first */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Primary KPIs */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-4">Resultaten</p>
                <div className="grid grid-cols-2 gap-4">
                  <KPICard
                    label="Jaarlijkse besparing"
                    value={formatCurrency(animYearly)}
                    icon={<TrendingUp size={16} />}
                    highlight
                  />
                  <KPICard
                    label="Terugverdientijd"
                    value={`${results.breakEvenMonths} mnd`}
                    icon={<Calendar size={16} />}
                  />
                </div>
              </div>

              {/* Secondary KPIs */}
              <div className="grid grid-cols-2 gap-4">
                <KPICard
                  label="Netto besparing jaar 1"
                  value={formatCurrency(animNet)}
                  icon={<Euro size={16} />}
                />
                <KPICard
                  label="Totale waarde (3 jaar)"
                  value={formatCurrency(animTotal3Year)}
                  icon={<TrendingUp size={16} />}
                />
              </div>

              {/* ROI Multiplier */}
              <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Percent size={16} className="text-primary" />
                  <p className="text-xs text-muted-foreground">ROI Multiplier</p>
                </div>
                <p className="text-2xl font-bold text-primary tabular-nums">
                  {results.roiMultiplier.toFixed(1)}x
                </p>
              </div>

              {/* Bar chart */}
              <BarChart data={chartData} />

              {/* Confidence score */}
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">Impact Confidence Score</p>
                  <span className="text-sm font-semibold text-primary tabular-nums">{results.confidence}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    animate={{ width: `${results.confidence}%` }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2.5">
                  Indicatie van hoe realistisch deze berekening is, gebaseerd op automatiseringspercentage, foutreductie en vergelijkbare implementaties bij MKB-organisaties.
                </p>
              </div>

            </motion.div>

            {/* RIGHT — Parameters */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-sm font-semibold text-foreground mb-6">Parameters</p>
              <div className="space-y-7">
                {sliders.map((s) => (
                  <motion.div
                    key={s.id}
                    animate={{ opacity: activeSlider && activeSlider !== s.id ? 0.5 : 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-sm font-medium text-foreground">{s.label}</label>
                      <span className="text-sm font-semibold text-primary tabular-nums">{s.display}</span>
                    </div>
                    <Slider
                      value={[s.value]}
                      onValueChange={([v]) => handleSliderChange(s.onChange, s.id)(v)}
                      onValueCommit={() => handleSliderEnd()}
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">{s.hint}</p>
                    {"subHint" in s && s.subHint && (
                      <p className="text-xs text-muted-foreground/70 mt-0.5 italic">{s.subHint}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Spacer */}
              <div className="mt-7" />

              {/* Disclaimer + CTA */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic flex items-start gap-1.5">
                  <AlertTriangle size={14} className="text-primary shrink-0 mt-0.5 not-italic" />
                  Deze berekening is indicatief. Tijdens de impactanalyse wordt een volledige businesscase opgesteld inclusief risico-inschatting en implementatieplanning.
                </p>
                <Button asChild size="lg">
                  <Link to="/book">
                    Plan een impactanalyse
                    <ArrowRight size={18} />
                  </Link>
                </Button>

                <div className="mt-5 rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setShowTransparency((p) => !p)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Info size={14} className="text-primary" />
                      <p className="text-sm font-medium text-foreground">Wat zit er in deze berekening?</p>
                    </div>
                    <motion.div animate={{ rotate: showTransparency ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown size={16} className="text-muted-foreground" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {showTransparency && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-3">
                          <div>
                            <p className="text-xs font-medium text-foreground mb-1.5">Inbegrepen</p>
                            <ul className="space-y-1">
                              {["Besparing op handmatige verwerkingstijd", "Besparing door foutreductie", "Structurele capaciteitsvrijmaking"].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-xs text-foreground/80">
                                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground mb-1.5">Niet inbegrepen</p>
                            <ul className="space-y-1">
                              {["Extra omzetgroei", "Strategische schaalvoordelen", "Langetermijnoptimalisaties"].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                            Tijdens de impactanalyse vertalen wij deze aannames naar een volledige businesscase op basis van uw processen en systemen.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-4">
                  <Link
                    to="/#beveiliging"
                    className="group inline-flex items-center gap-1 text-[11px] text-foreground/70 hover:text-primary/70 transition-colors"
                  >
                    Bekijk onze Beveiligingsaanpak
                    <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>



          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── KPI Card ─── */
const KPICard = ({
  label, value, icon, highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-xl border p-4 transition-colors duration-300 ${
      highlight ? "border-primary/30 bg-primary/[0.04]" : "border-border bg-card"
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      <div className="text-primary">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
    <p className={`text-2xl font-bold tabular-nums ${highlight ? "text-primary" : "text-foreground"}`}>
      {value}
    </p>
  </div>
);

/* ─── Bar Chart ─── */
const BarChart = ({ data }: { data: { name: string; value: number; type: string }[] }) => {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-sm font-medium text-foreground mb-5">Maandelijks kostenoverzicht</p>
      <div className="space-y-4">
        {data.map((item) => {
          const pct = maxVal > 0 ? (item.value / maxVal) * 100 : 0;
          return (
            <div key={item.name}>
              {item.type === "savings" && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground font-medium">−</span>
                </div>
              )}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-medium text-foreground tabular-nums">{formatCurrency(item.value)}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor:
                        item.type === "savings"
                          ? "hsl(174, 78%, 41%)"
                          : item.type === "automated"
                          ? "hsl(192, 20%, 30%)"
                          : "hsl(192, 15%, 45%)",
                    }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImpactSimulator;
