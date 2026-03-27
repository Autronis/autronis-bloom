import { useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import GlowCTA from "@/components/GlowCTA";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import { casesByLang } from "@/components/case-studies/caseStudiesData";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/context";

const ProjectShowcase = lazy(() => import("@/components/home/ProjectShowcase"));

const text = {
  en: {
    seoTitle: "Autronis | Work — Case Studies & Portfolio",
    seoDesc: "See our implementations and the websites we've built. Real results from real automation projects.",
    caseLabel: "Case Studies",
    caseTitle: "Our implementations",
    caseDesc: "Concrete examples of how automation accelerates processes, reduces errors, and enables scalability.",
    cta: "Schedule Automation Scan",
    ctaSub: "Discover what automation can do for your organization.",
  },
  nl: {
    seoTitle: "Autronis | Werk — Case Studies & Portfolio",
    seoDesc: "Bekijk onze implementaties en de websites die wij gebouwd hebben. Echte resultaten van echte projecten.",
    caseLabel: "Case Studies",
    caseTitle: "Onze implementaties",
    caseDesc: "Concrete voorbeelden van hoe automatisering processen versnelt, fouten vermindert en schaalbaarheid mogelijk maakt.",
    cta: "Plan een Automation Scan",
    ctaSub: "Ontdek wat automatisering kan doen voor jouw organisatie.",
  },
};

const Work = () => {
  const lang = useLanguage();
  const t = text[lang];
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [hash]);

  return (
    <>
      <SEOHead title={t.seoTitle} description={t.seoDesc} path="/work" />

      {/* Case Studies */}
      <section id="case-studies" className="pt-16 pb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-12">
            <ScrollRevealItem>
              <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">{t.caseLabel}</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t.caseTitle}</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.caseDesc}</p>
            </ScrollRevealItem>
          </ScrollReveal>
          <div className="space-y-12">
            {casesByLang[lang].map((cs, i) => <CaseStudyCard key={i} cs={cs} index={i} />)}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <Suspense fallback={null}>
        <ProjectShowcase />
      </Suspense>

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal className="text-center">
            <ScrollRevealItem>
              <GlowCTA to="/book">{t.cta}</GlowCTA>
              <p className="text-xs text-muted-foreground mt-3">{t.ctaSub}</p>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Work;
