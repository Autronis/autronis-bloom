import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Calendar, Percent, Euro, ArrowRight, Calculator } from "lucide-react";

import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

const formatCurrency = (v: number) =>
  `€${Math.round(v).toLocaleString("nl-NL")}`;

const ImpactSimulator = () => {
  const [hours, setHours] = useState(40);
  const [rate, setRate] = useState(55);
  const [autoPercent, setAutoPercent] = useState(65);
  const [errorPercent, setErrorPercent] = useState(8);

  const results = useMemo(() => {
    const autoFraction = autoPercent / 100;
    const weeksPerMonth = 4.33;

    // Core savings
    const monthlySavings = hours * autoFraction * rate * weeksPerMonth;
    const yearlySavings = monthlySavings * 12;

    // Error correction savings
    const errorFraction = errorPercent / 100;
    const monthlyErrorSavings = hours * errorFraction * rate * weeksPerMonth * 0.5; // 50% of error time recoverable
    const yearlyErrorSavings = monthlyErrorSavings * 12;

    const totalMonthlySavings = monthlySavings + monthlyErrorSavings;
    const totalYearlySavings = yearlySavings + yearlyErrorSavings;

    // Auto-calculated investment based on hours and complexity
    const complexityMultiplier = autoPercent <= 50 ? 1 : autoPercent <= 70 ? 1.4 : 1.8;
    const baseInvestment = hours * rate * 6; // ~6 weeks equivalent
    const investment = Math.round(baseInvestment * complexityMultiplier / 500) * 500;

    const netBenefitYear1 = totalYearlySavings - investment;
    const paybackMonths = totalMonthlySavings > 0 ? investment / totalMonthlySavings : 0;
    const roiMultiplier = investment > 0 ? totalYearlySavings / investment : 0;

    // Confidence score
    const hoursFactor = Math.min(hours / 60, 1) * 30;
    const autoFactor = autoFraction * 40;
    const investFactor = Math.min(investment / 30000, 1) * 30;
    const confidence = Math.round(Math.min(hoursFactor + autoFactor + investFactor, 95));

    return {
      monthlySavings: totalMonthlySavings,
      yearlySavings: totalYearlySavings,
      investment,
      netBenefitYear1,
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      roiMultiplier,
      confidence,
    };
  }, [hours, rate, autoPercent, errorPercent]);

  const chartData = [
    { name: "Huidige kosten", value: Math.round(hours * rate * 4.33), type: "current" },
    { name: "Na automatisering", value: Math.round(hours * (1 - autoPercent / 100) * rate * 4.33), type: "automated" },
    { name: "Besparing", value: Math.round(results.monthlySavings), type: "savings" },
  ];

  const sliders = [
    {
      label: "Handmatige uren per week",
      value: hours,
      onChange: setHours,
      min: 5,
      max: 80,
      step: 1,
      display: `${hours} uur`,
      hint: "Tijd besteed aan repetitieve of handmatige processen.",
    },
    {
      label: "Gemiddelde uurkosten",
      value: rate,
      onChange: setRate,
      min: 25,
      max: 120,
      step: 5,
      display: `€${rate}`,
      hint: "Inclusief salaris, werkgeverslasten en overhead.",
    },
    {
      label: "Automatiseringspercentage",
      value: autoPercent,
      onChange: setAutoPercent,
      min: 30,
      max: 85,
      step: 1,
      display: `${autoPercent}%`,
      hint: "Conservatieve inschatting na validatie en controle.",
    },
    {
      label: "Geschat foutpercentage",
      value: errorPercent,
      onChange: setErrorPercent,
      min: 0,
      max: 25,
      step: 1,
      display: `${errorPercent}%`,
      hint: "Percentage tijd besteed aan correcties en herstelwerk.",
    },
  ];

  return (
    <section id="roi-scan" className="relative overflow-hidden border-t border-border scroll-mt-24">
      <AmbientLight />

      <div className="container mx-auto px-4 lg:px-8 py-16 sm:py-24 relative z-10">
        {/* Header */}
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Impact & ROI
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Impact & ROI Simulator
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Op basis van uw situatie berekenen wij een conservatieve businesscase inclusief besparing, terugverdientijd en ROI.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Single outer block */}
        <div className="max-w-6xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10">
          {/* 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* LEFT — Inputs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-sm font-semibold text-foreground mb-6">Parameters</p>
              <div className="space-y-7">
                {sliders.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="text-sm font-medium text-foreground">{s.label}</label>
                      <span className="text-sm font-semibold text-primary tabular-nums">{s.display}</span>
                    </div>
                    <Slider
                      value={[s.value]}
                      onValueChange={([v]) => s.onChange(v)}
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1.5">{s.hint}</p>
                  </div>
                ))}
              </div>

              {/* Investment indication */}
              <div className="mt-7 pt-5 border-t border-border">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Calculator size={14} className="text-primary" />
                    <p className="text-sm font-medium text-foreground">Indicatieve projectinvestering</p>
                  </div>
                  <span className="text-lg font-bold text-foreground tabular-nums">{formatCurrency(results.investment)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Indicatief op basis van vergelijkbare implementaties binnen MKB-organisaties.
                </p>
              </div>

              {/* Disclaimer + CTAs */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic flex items-start gap-1.5">
                  <AlertTriangle size={14} className="text-primary shrink-0 mt-0.5 not-italic" />
                  Deze berekening is indicatief. Tijdens de analysefase wordt een volledige businesscase opgesteld inclusief risico- en impactanalyse.
                </p>
                <Button asChild size="lg">
                  <Link to="/book">
                    Plan een impactanalyse
                    <ArrowRight size={18} />
                  </Link>
                </Button>
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

            {/* RIGHT — Results dashboard */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* KPI cards */}
              <div className="grid grid-cols-2 gap-4">
                <KPICard
                  label="Maandelijkse besparing"
                  value={formatCurrency(results.monthlySavings)}
                  icon={<Euro size={16} />}
                />
                <KPICard
                  label="Jaarlijkse besparing"
                  value={formatCurrency(results.yearlySavings)}
                  icon={<TrendingUp size={16} />}
                  highlight
                />
                <KPICard
                  label="Netto voordeel jaar 1"
                  value={formatCurrency(results.netBenefitYear1)}
                  icon={<Euro size={16} />}
                />
                <KPICard
                  label="Terugverdientijd"
                  value={`${results.paybackMonths} mnd`}
                  icon={<Calendar size={16} />}
                />
              </div>

              {/* ROI Multiplier */}
              <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent size={16} className="text-primary" />
                    <p className="text-sm font-medium text-foreground">ROI Multiplier</p>
                  </div>
                  <span className="text-2xl font-bold text-primary tabular-nums">{results.roiMultiplier.toFixed(1)}x</span>
                </div>
              </div>

              {/* Confidence score */}
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-foreground">Impact Confidence Score</p>
                  <span className="text-sm font-semibold text-primary tabular-nums">{results.confidence}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${results.confidence}%` }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2.5">
                  Gebaseerd op vergelijkbare implementaties binnen MKB-organisaties.
                </p>
              </div>

              {/* Bar chart */}
              <div className="rounded-xl border border-border p-4">
                <p className="text-sm font-medium text-foreground mb-5">Maandelijks kostenoverzicht</p>
                <div className="space-y-4">
                  {chartData.map((item) => {
                    const maxVal = Math.max(...chartData.map((d) => d.value));
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
                              initial={{ width: 0 }}
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

              {/* Bottom disclaimer */}
              <p className="text-xs text-muted-foreground leading-relaxed text-center">
                Deze berekening is indicatief. Tijdens de impactanalyse wordt een volledige businesscase opgesteld inclusief risico-inschatting.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const KPICard = ({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) => (
  <div
    className={`rounded-xl border p-4 transition-colors duration-300 ${
      highlight
        ? "border-primary/30 bg-primary/[0.04]"
        : "border-border bg-card"
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

export default ImpactSimulator;