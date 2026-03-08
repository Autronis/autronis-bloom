// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Demo",
    title: "See automation in action",
    subtitle: "Watch in two minutes how a fully automated workflow operates — from trigger to result.",
    videoTime: "2:00 — Automation in action",
    tourTitle: "Interactive tour",
    tourDesc: "Soon you'll be able to click through an automation yourself and experience every step.",
    tourSoon: "Coming soon",
    convinced: "Convinced? Let's explore what we can automate for you.",
    cta: "Schedule Automation Scan",
  },
  nl: {
    label: "Demo",
    title: "Bekijk automatisering in actie",
    subtitle: "Bekijk in twee minuten hoe een volledig geautomatiseerde workflow werkt — van trigger tot resultaat.",
    videoTime: "2:00 — Automatisering in actie",
    tourTitle: "Interactieve tour",
    tourDesc: "Binnenkort kun je zelf door een automatisering heen klikken en elke stap ervaren.",
    tourSoon: "Binnenkort beschikbaar",
    convinced: "Overtuigd? Laten we verkennen wat we voor jou kunnen automatiseren.",
    cta: "Plan een Automation Scan",
  },
};

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
            <div className="relative aspect-video rounded-xl border border-border bg-card overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center transition-all group-hover:bg-primary/30 group-hover:scale-110">
                  <Play size={36} className="text-primary ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">{t.videoTime}</div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-12">
              <h2 className="text-xl font-semibold mb-2">{t.tourTitle}</h2>
              <p className="text-sm text-muted-foreground mb-6">{t.tourDesc}</p>
              <p className="text-xs text-muted-foreground mb-8">{t.tourSoon}</p>
            </div>

            <div className="mt-12">
              <p className="text-muted-foreground mb-4">{t.convinced}</p>
              <Button asChild size="lg">
                <Link to="/book">{t.cta} <ArrowRight size={18} /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Demo;
