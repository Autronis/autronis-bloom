// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, GitBranch, Bell, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/i18n/context";
import { motion } from "framer-motion";

const text = {
  en: {
    label: "Demo",
    title: "See automation in action",
    subtitle: "Watch in two minutes how a fully automated workflow operates — from trigger to result.",
    tourTitle: "Interactive tour",
    tourDesc: "Walk through a real automation step by step. See exactly how data flows between your systems.",
    tourSoon: "Coming soon",
    tourSteps: [
      { icon: "zap", label: "Trigger fires", desc: "New order, form submission, or scheduled event" },
      { icon: "branch", label: "Data flows", desc: "Systems connected, data transformed and routed" },
      { icon: "bell", label: "Actions execute", desc: "Invoices, emails, and updates happen automatically" },
      { icon: "check", label: "Result logged", desc: "Full audit trail with monitoring and alerts" },
    ],
    convinced: "Convinced? Let's explore what we can automate for you.",
    cta: "Schedule Automation Scan",
  },
  nl: {
    label: "Demo",
    title: "Bekijk automatisering in actie",
    subtitle: "Bekijk in twee minuten hoe een volledig geautomatiseerde workflow werkt — van trigger tot resultaat.",
    tourTitle: "Interactieve tour",
    tourDesc: "Loop stap voor stap door een echte automatisering. Zie precies hoe data stroomt tussen je systemen.",
    tourSoon: "Binnenkort beschikbaar",
    tourSteps: [
      { icon: "zap", label: "Trigger vuurt", desc: "Nieuwe bestelling, formulier, of gepland event" },
      { icon: "branch", label: "Data stroomt", desc: "Systemen verbonden, data getransformeerd en gerouteerd" },
      { icon: "bell", label: "Acties uitgevoerd", desc: "Facturen, e-mails en updates gebeuren automatisch" },
      { icon: "check", label: "Resultaat gelogd", desc: "Volledige audit trail met monitoring en alerts" },
    ],
    convinced: "Overtuigd? Laten we verkennen wat we voor jou kunnen automatiseren.",
    cta: "Plan een Automation Scan",
  },
};

const stepIcons = { zap: Zap, branch: GitBranch, bell: Bell, check: CheckCircle2 };

const Demo = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">{t.label}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative aspect-video rounded-xl border border-border bg-card overflow-hidden">
              <video
                className="w-full h-full block"
                controls playsInline preload="metadata"
                controlsList="nodownload noplaybackrate" disablePictureInPicture
              >
                <source src="https://qmtnmisdmchydrriuont.supabase.co/storage/v1/object/public/Jobby%20lead%20systeem/demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Interactive tour preview */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{t.tourTitle}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">{t.tourDesc}</p>
                </div>
                <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {t.tourSoon}
                </span>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {t.tourSteps.map((step, idx) => {
                    const Icon = stepIcons[step.icon as keyof typeof stepIcons];
                    return (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative text-center p-4 rounded-lg bg-muted/30 border border-border/50"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <p className="text-sm font-semibold text-foreground mb-1">{step.label}</p>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
                        {idx < t.tourSteps.length - 1 && (
                          <div className="hidden sm:block absolute top-1/2 -right-2.5 w-5 text-primary/30">
                            <ArrowRight size={14} />
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Animated flow line */}
                <div className="hidden sm:block mt-4 relative h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary/30 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">{t.convinced}</p>
            <Button asChild size="lg">
              <Link to="/book">{t.cta} <ArrowRight size={18} /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Demo;
