// Layout is provided by App.tsx
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/i18n/context";
import { useTheme } from "next-themes";

const text = {
  en: {
    seoTitle: "Autronis | Schedule Your Automation Scan",
    seoDesc: "Schedule a free Automation Scan and discover where automation can have the biggest impact for your organization.",
    label: "Schedule your scan",
    title: "Schedule your Automation Scan",
    desc: "Pick a time slot that works for you. We'll discuss your biggest automation opportunities in a 30-minute call.",
    loading: "Loading calendar...",
    fallback: "The calendar could not be loaded. Please try again later or contact us at zakelijk@autronis.com.",
  },
  nl: {
    seoTitle: "Autronis | Plan je Automation Scan",
    seoDesc: "Plan een gratis Automation Scan en ontdek waar automatisering de grootste impact kan hebben voor je organisatie.",
    label: "Plan je scan",
    title: "Plan je Automation Scan",
    desc: "Kies een tijdslot dat jou uitkomt. In een gesprek van 30 minuten bespreken we de grootste automatiseringskansen.",
    loading: "Kalender laden...",
    fallback: "De kalender kon niet worden geladen. Probeer het later opnieuw of neem contact op via zakelijk@autronis.com.",
  },
};

const Book = () => {
  const lang = useLanguage();
  const t = text[lang];
  const { resolvedTheme } = useTheme();
  const calTheme = resolvedTheme === "light" ? "light" : "dark";
  const [calState, setCalState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCalState((prev) => (prev === "loading" ? "error" : prev));
    }, 15000);

    (async () => {
      try {
        const cal = await getCalApi();
        cal("ui", {
          theme: calTheme,
          cssVarsPerTheme: {
            dark: {
              "cal-brand": "#0f9d8a",
              "cal-brand-emphasis": "#0d8676",
            },
            light: {
              "cal-brand": "#0f9d8a",
              "cal-brand-emphasis": "#0d8676",
            },
          },
          hideEventTypeDetails: false,
        });
        setCalState("ready");
      } catch {
        setCalState("error");
      }
    })();

    return () => clearTimeout(timeout);
  }, [calTheme]);

  return (
    <>
      <SEOHead title={t.seoTitle} description={t.seoDesc} path="/book" />
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">{t.label}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-muted-foreground">{t.desc}</p>
          </div>
          <div className="max-w-4xl mx-auto relative">
            {calState === "loading" && (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                <Loader2 size={24} className="animate-spin text-primary" />
                <p className="text-sm">{t.loading}</p>
              </div>
            )}
            {calState === "error" && (
              <div className="rounded-xl border border-border bg-card p-8 text-center">
                <p className="text-sm text-muted-foreground">{t.fallback}</p>
              </div>
            )}
            <div className={calState === "loading" ? "opacity-0 h-0 overflow-hidden" : ""}>
              <Cal
                calLink="autronis/30min"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{
                  layout: "month_view",
                  theme: calTheme,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;
