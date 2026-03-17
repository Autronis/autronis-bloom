// Layout is provided by App.tsx
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    seoTitle: "Autronis | Schedule Your Automation Scan",
    seoDesc: "Schedule a free Automation Scan and discover where automation can have the biggest impact for your organization.",
    label: "Schedule your scan",
    title: "Schedule your Automation Scan",
    desc: "Pick a time slot that works for you. We'll discuss your biggest automation opportunities in a 30-minute call.",
  },
  nl: {
    seoTitle: "Autronis | Plan je Automation Scan",
    seoDesc: "Plan een gratis Automation Scan en ontdek waar automatisering de grootste impact kan hebben voor je organisatie.",
    label: "Plan je scan",
    title: "Plan je Automation Scan",
    desc: "Kies een tijdslot dat jou uitkomt. In een gesprek van 30 minuten bespreken we de grootste automatiseringskansen.",
  },
};

const Book = () => {
  const lang = useLanguage();
  const t = text[lang];

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: {
            "cal-brand": "#0f9d8a",
            "cal-brand-emphasis": "#0d8676",
          },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

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
          <div className="max-w-4xl mx-auto">
            <Cal
              calLink="autronis/30min"
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{
                layout: "month_view",
                theme: "dark",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;
