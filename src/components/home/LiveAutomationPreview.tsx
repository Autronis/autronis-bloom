import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Zap, FileText, Mail, CheckCircle2 } from "lucide-react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Live Preview",
    title: "See automation in real-time",
    desc: "This is how a fully automated order workflow operates — no manual steps required.",
  },
  nl: {
    label: "Live Preview",
    title: "Zie automatisering in real-time",
    desc: "Zo werkt een volledig geautomatiseerde orderworkflow — geen handmatige stappen nodig.",
  },
};

const steps = [
  { icon: ShoppingCart, en: "Order received", nl: "Bestelling ontvangen", color: "text-blue-400" },
  { icon: Zap, en: "Payment verified", nl: "Betaling geverifieerd", color: "text-yellow-400" },
  { icon: FileText, en: "Invoice created", nl: "Factuur aangemaakt", color: "text-purple-400" },
  { icon: Mail, en: "Confirmation sent", nl: "Bevestiging verstuurd", color: "text-orange-400" },
  { icon: CheckCircle2, en: "Completed", nl: "Afgerond", color: "text-primary" },
];

const LiveAutomationPreview = () => {
  const lang = useLanguage();
  const t = text[lang];
  const [activeStep, setActiveStep] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: ReturnType<typeof setTimeout>;
    const runCycle = () => {
      setActiveStep(-1);
      let step = 0;
      const advance = () => {
        setActiveStep(step);
        step++;
        if (step <= steps.length) {
          timeout = setTimeout(advance, 1200);
        } else {
          timeout = setTimeout(runCycle, 3000);
        }
      };
      timeout = setTimeout(advance, 800);
    };
    runCycle();
    return () => clearTimeout(timeout);
  }, [isVisible]);

  return (
    <section className="py-12 sm:py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-10">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.title}</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">{t.desc}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        <motion.div
          className="max-w-3xl mx-auto"
          onViewportEnter={() => setIsVisible(true)}
          onViewportLeave={() => setIsVisible(false)}
          viewport={{ margin: "-100px" }}
        >
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            {/* Flow visualization */}
            <div className="flex items-center justify-between relative">
              {/* Connection line */}
              <div className="absolute top-5 left-8 right-8 h-px bg-border" />
              <motion.div
                className="absolute top-5 left-8 h-px bg-primary"
                animate={{
                  width: activeStep >= 0
                    ? `${Math.min((activeStep / (steps.length - 1)) * 100, 100)}%`
                    : "0%",
                }}
                style={{ maxWidth: "calc(100% - 64px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />

              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx <= activeStep;
                const isCurrent = idx === activeStep;

                return (
                  <div key={step.en} className="relative z-10 flex flex-col items-center gap-2">
                    <motion.div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card"
                      }`}
                      animate={{
                        scale: isCurrent ? [1, 1.15, 1] : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon
                        size={16}
                        className={`transition-colors duration-300 ${
                          isActive ? step.color : "text-muted-foreground/40"
                        }`}
                      />
                    </motion.div>
                    <AnimatePresence>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] sm:text-xs font-medium text-foreground whitespace-nowrap"
                        >
                          {step[lang]}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    {!isActive && (
                      <p className="text-[10px] sm:text-xs text-muted-foreground/40 whitespace-nowrap">
                        {step[lang]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Status bar */}
            <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${activeStep >= 0 ? "bg-primary animate-pulse" : "bg-muted-foreground/30"}`} />
                <span className="text-xs text-muted-foreground">
                  {activeStep >= 0 && activeStep < steps.length
                    ? (lang === "nl" ? "Verwerking..." : "Processing...")
                    : activeStep >= steps.length - 1
                      ? (lang === "nl" ? "Workflow afgerond" : "Workflow completed")
                      : (lang === "nl" ? "Wacht op trigger..." : "Waiting for trigger...")}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground/50">
                {activeStep >= 0 ? `${Math.min(activeStep + 1, steps.length)}/${steps.length}` : `0/${steps.length}`}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveAutomationPreview;
