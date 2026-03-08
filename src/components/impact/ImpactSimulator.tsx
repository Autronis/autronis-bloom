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
  `€${Math.round(v).toLocaleString("en-US")}`;

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
    const totalValue3Year = totalYearlySavings * 3;
    const savedHoursPerWeek = Math.round(hours * autoFraction);

    const hoursFactor = Math.min(hours / 60, 1) * 35;
    const autoFactor = autoFraction * 45;
    const errorFactor = Math.min(errorPercent / 15, 1) * 15;
    const confidence = Math.round(Math.min(hoursFactor + autoFactor + errorFactor, 95));

    return {
      monthlySavings: totalMonthlySavings,
      yearlySavings: totalYearlySavings,
      totalValue3Year,
      savedHoursPerWeek,
      autoPercent,
      confidence,
    };
  }, [hours, rate, autoPercent, errorPercent]);

  const animYearly = useAnimatedValue(Math.round(results.yearlySavings));
  const animMonthly = useAnimatedValue(Math.round(results.monthlySavings));
  const animTotal3Year = useAnimatedValue(Math.round(results.totalValue3Year));
  const animSavedHours = useAnimatedValue(results.savedHoursPerWeek);

  const chartData = [
    { name: "Current costs", value: Math.round(hours * rate * 4.33), type: "current" },
    { name: "After automation", value: Math.round(hours * (1 - autoPercent / 100) * rate * 4.33), type: "automated" },
    { name: "Savings", value: Math.round(results.monthlySavings), type: "savings" },
  ];

  const sliders = [
    { id: "hours", label: "Manual hours per week", value: hours, onChange: setHours, min: 5, max: 80, step: 1, display: `${hours} hrs`, hint: "Time spent on repetitive or manual processes." },
    { id: "rate", label: "Average hourly cost", value: rate, onChange: setRate, min: 25, max: 120, step: 5, display: `€${rate}`, hint: "Including salary, employer costs, and other personnel expenses." },
    { id: "auto", label: "Automation percentage", value: autoPercent, onChange: setAutoPercent, min: 30, max: 85, step: 1, display: `${autoPercent}%`, hint: "Conservative estimate after validation and review." },
    { id: "error", label: "Estimated error rate", value: errorPercent, onChange: setErrorPercent, min: 0, max: 25, step: 1, display: `${errorPercent}%`, hint: "Percentage of total work time spent on corrections, rework, or duplicate entry.", subHint: "For administrative processes this is typically between 2–8%." },
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
              Impact is measurable. That's why we calculate before we build.
            </h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Automation is only valuable when the business impact is demonstrable.
              That's why we calculate a conservative business case upfront with expected savings and time gains.
            </p>
            <p className="text-sm text-foreground/80 mt-6 font-medium">
              Enter your situation and calculate the potential impact directly.
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
                <p className="text-sm font-semibold text-foreground mb-4">Results</p>
                <div className="grid grid-cols-2 gap-4">
                  <KPICard
                    label="Annual savings"
                    value={formatCurrency(animYearly)}
                    icon={<TrendingUp size={16} />}
                    highlight
                  />
                  <KPICard
                    label="Hours saved per week"
                    value={`${animSavedHours} hrs`}
                    icon={<Calendar size={16} />}
                    subtitle="Estimated time savings through automation."
                  />
                </div>
              </div>

              {/* Secondary KPIs */}
              <div className="grid grid-cols-2 gap-4">
                <KPICard
                  label="Savings over 3 years"
                  value={formatCurrency(animTotal3Year)}
                  icon={<TrendingUp size={16} />}
                />
                <KPICard
                  label="Automation potential"
                  value={`${results.autoPercent}%`}
                  icon={<Percent size={16} />}
                  highlight
                  subtitle="Percentage of manual work that can be automated."
                />
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
                  Indication of how realistic this calculation is, based on automation percentage, error reduction, and comparable implementations at SMB organizations.
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

              <div className="mt-7" />

              {/* Disclaimer + CTA */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic flex items-start gap-1.5">
                  <AlertTriangle size={14} className="text-primary shrink-0 mt-0.5 not-italic" />
                  This calculation is indicative. During the impact analysis, a complete business case is prepared including risk assessment and implementation planning.
                </p>
                <Button asChild size="lg">
                  <Link to="/book">
                    Schedule an impact analysis
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
                      <p className="text-sm font-medium text-foreground">What's included in this calculation?</p>
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
                            <p className="text-xs font-medium text-foreground mb-1.5">Included</p>
                            <ul className="space-y-1">
                              {["Savings on manual processing time", "Savings through error reduction", "Structural capacity release"].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-xs text-foreground/80">
                                  <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-foreground mb-1.5">Not included</p>
                            <ul className="space-y-1">
                              {["Additional revenue growth", "Strategic scaling advantages", "Long-term optimizations"].map((item) => (
                                <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                            During the impact analysis, we translate these assumptions into a complete business case based on your processes and systems.
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
                    View our Security Approach
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
  label, value, icon, highlight, subtitle,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
  subtitle?: string;
}) => (
  <div
    className={`rounded-xl border p-4 transition-colors duration-300 ${
      highlight ? "border-primary/30 bg-primary/[0.04]" : "border-border bg-card"
    }`}
  >
    <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
      <div className="text-primary shrink-0">{icon}</div>
      <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{label}</p>
    </div>
    <p className={`text-2xl font-bold tabular-nums ${highlight ? "text-primary" : "text-foreground"}`}>
      {value}
    </p>
    {subtitle && (
      <p className="text-[10px] text-muted-foreground mt-1.5 leading-snug">{subtitle}</p>
    )}
  </div>
);

/* ─── Bar Chart ─── */
const BarChart = ({ data }: { data: { name: string; value: number; type: string }[] }) => {
  const maxVal = Math.max(...data.map((d) => d.value));
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-sm font-medium text-foreground mb-5">Monthly cost overview</p>
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
