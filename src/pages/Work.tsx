import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/context";

const ProjectShowcase = lazy(() => import("@/components/home/ProjectShowcase"));

const text = {
  en: {
    seoTitle: "Autronis | Portfolio — Websites & Automations",
    seoDesc: "See what we've built. Websites with integrated animations, automations and smart systems.",
  },
  nl: {
    seoTitle: "Autronis | Portfolio — Websites & Automatiseringen",
    seoDesc: "Bekijk wat we gebouwd hebben. Websites met geïntegreerde animaties, automatiseringen en slimme systemen.",
  },
};

const Work = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <>
      <SEOHead title={t.seoTitle} description={t.seoDesc} path="/work" />
      <div className="pt-8">
        <Suspense fallback={null}>
          <ProjectShowcase />
        </Suspense>
      </div>
    </>
  );
};

export default Work;
