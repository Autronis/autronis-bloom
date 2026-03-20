import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Zap, FileText, Mail, CheckCircle2, Database, Bell, BarChart3 } from "lucide-react";
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
  {
    icon: ShoppingCart,
    en: "Order received",
    nl: "Bestelling ontvangen",
    color: "text-blue-400",
    detailEn: "Webhook triggers from Shopify",
    detailNl: "Webhook triggert vanuit Shopify",
  },
  {
    icon: Zap,
    en: "Payment verified",
    nl: "Betaling geverifieerd",
    color: "text-yellow-400",
    detailEn: "Stripe confirms €249.00",
    detailNl: "Stripe bevestigt €249,00",
  },
  {
    icon: Database,
    en: "Data enriched",
    nl: "Data verrijkt",
    color: "text-cyan-400",
    detailEn: "Customer matched in CRM",
    detailNl: "Klant gematcht in CRM",
  },
  {
    icon: FileText,
    en: "Invoice created",
    nl: "Factuur aangemaakt",
    color: "text-purple-400",
    detailEn: "Exact Online #INV-2847",
    detailNl: "Exact Online #INV-2847",
  },
  {
    icon: Bell,
    en: "Team notified",
    nl: "Team genotificeerd",
    color: "text-pink-400",
    detailEn: "Slack #orders channel",
    detailNl: "Slack #orders kanaal",
  },
  {
    icon: Mail,
    en: "Confirmation sent",
    nl: "Bevestiging verstuurd",
    color: "text-orange-400",
    detailEn: "Personalized email to customer",
    detailNl: "Gepersonaliseerde e-mail naar klant",
  },
  {
    icon: BarChart3,
    en: "Dashboard updated",
    nl: "Dashboard bijgewerkt",
    color: "text-emerald-400",
    detailEn: "Revenue KPI +€249",
    detailNl: "Omzet KPI +€249",
  },
  {
    icon: CheckCircle2,
    en: "Completed",
    nl: "Afgerond",
    color: "text-primary",
    detailEn: "Total time: 4.2 seconds",
    detailNl: "Totale tijd: 4,2 seconden",
  },
];

const LiveAutomationPreview = ({ embedded = false }: { embedded?: boolean }) => {
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
          timeout = setTimeout(advance, 500);
        } else {
          timeout = setTimeout(runCycle, 6000);
        }
      };
      timeout = setTimeout(advance, 300);
    };
    runCycle();
    return () => clearTimeout(timeout);
  }, [isVisible]);

  const content = (
    <>
      {!embedded && (
        <ScrollReveal className="text-center mb-10">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.title}</h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">{t.desc}</p>
          </ScrollRevealItem>
        </ScrollReveal>
      )}

        <motion.div
          className="max-w-xl mx-auto"
          onViewportEnter={() => setIsVisible(true)}
          onViewportLeave={() => setIsVisible(false)}
          viewport={{ margin: "-100px" }}
        >
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            {/* Terminal-style header */}
            <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-muted-foreground/50 ml-2 font-mono">autronis/workflow — order-pipeline.flow</span>
            </div>

            {/* Steps list */}
            <div className="p-4 space-y-0">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx <= activeStep;
                const isCurrent = idx === activeStep;
                const isPast = idx < activeStep;

                return (
                  <div key={step.en}>
                    <motion.div
                      className="flex items-center gap-3 py-1.5"
                      animate={{
                        opacity: isActive ? 1 : 0.25,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Step indicator */}
                      <div className="relative">
                        <motion.div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                            isActive ? "bg-primary/10" : "bg-muted/30"
                          }`}
                          animate={{
                            scale: isCurrent ? [1, 1.1, 1] : 1,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          <Icon size={14} className={`transition-colors duration-500 ${isActive ? step.color : "text-muted-foreground/30"}`} />
                        </motion.div>
                        {/* Pulse ring on current */}
                        {isCurrent && (
                          <motion.div
                            className="absolute inset-0 rounded-lg border border-primary/40"
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 1.4, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        )}
                      </div>

                      {/* Step content */}
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] font-medium transition-colors duration-200 ${isActive ? "text-foreground" : "text-muted-foreground/30"}`}>
                          {step[lang]}
                        </p>
                        <p className={`text-[10px] font-mono transition-opacity duration-200 ${isActive ? "text-muted-foreground opacity-100" : "text-muted-foreground/20 opacity-40"}`}>
                          {lang === "nl" ? step.detailNl : step.detailEn}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="shrink-0">
                        {isPast && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          >
                            <CheckCircle2 size={14} className="text-primary" />
                          </motion.div>
                        )}
                        {isCurrent && (
                          <motion.div
                            className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                        )}
                      </div>
                    </motion.div>

                    {/* Connector line */}
                    {idx < steps.length - 1 && (
                      <div className="ml-4 h-1 flex items-center">
                        <div className={`w-px h-full transition-colors duration-500 ${isPast ? "bg-primary/30" : "bg-border/30"}`} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom status bar */}
            <div className="px-5 py-3 border-t border-border bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${activeStep >= 0 ? "bg-primary animate-pulse" : "bg-muted-foreground/30"}`} />
                <span className="text-[11px] text-muted-foreground font-mono">
                  {activeStep < 0
                    ? (lang === "nl" ? "wacht op trigger..." : "waiting for trigger...")
                    : activeStep < steps.length - 1
                      ? (lang === "nl" ? `stap ${activeStep + 1}/${steps.length} — verwerking...` : `step ${activeStep + 1}/${steps.length} — processing...`)
                      : (lang === "nl" ? `✓ workflow afgerond in 4.2s` : `✓ workflow completed in 4.2s`)}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-16 sm:w-24 h-1 rounded-full bg-border overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  animate={{
                    width: activeStep >= 0
                      ? `${Math.min(((activeStep + 1) / steps.length) * 100, 100)}%`
                      : "0%",
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
    </>
  );

  if (embedded) return content;

  return (
    <section className="py-12 sm:py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        {content}
      </div>
    </section>
  );
};

export default LiveAutomationPreview;
