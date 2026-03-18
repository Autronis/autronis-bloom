import { useLocation } from "react-router-dom";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import GlowCTA from "@/components/GlowCTA";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import { casesByLang } from "@/components/case-studies/caseStudiesData";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    seoTitle: "Autronis | Case Studies — Automation Implementations",
    seoDesc: "See concrete examples of how Autronis automates processes, integrates systems, and delivers scalability for growing businesses.",
    label: "Case Studies",
    title: "Our implementations",
    desc: "Concrete examples of how automation accelerates processes, reduces errors, and enables scalability.",
    cta: "Schedule Automation Scan",
    ctaSub: "Discover what automation can do for your organization.",
  },
  nl: {
    seoTitle: "Autronis | Case Studies — Automatiseringsimplementaties",
    seoDesc: "Bekijk concrete voorbeelden van hoe Autronis processen automatiseert, systemen integreert en schaalbaarheid levert voor groeiende bedrijven.",
    label: "Case Studies",
    title: "Onze implementaties",
    desc: "Concrete voorbeelden van hoe automatisering processen versnelt, fouten vermindert en schaalbaarheid mogelijk maakt.",
    cta: "Plan een Automation Scan",
    ctaSub: "Ontdek wat automatisering kan doen voor jouw organisatie.",
  },
};

const CaseStudies = () => {
  const lang = useLanguage();
  const t = text[lang];
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [hash]);

  return (
    <>
      <SEOHead title={t.seoTitle} description={t.seoDesc} path="/case-studies" />
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-16">
            <ScrollRevealItem>
              <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">{t.label}</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
            </ScrollRevealItem>
          </ScrollReveal>
          <div className="space-y-12">
            {casesByLang[lang].map((cs, i) => <CaseStudyCard key={i} cs={cs} index={i} />)}
          </div>
          <ScrollReveal className="text-center mt-12">
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

export default CaseStudies;
