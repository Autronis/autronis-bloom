import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import GlowCTA from "@/components/GlowCTA";
import { casesByLang } from "@/components/case-studies/caseStudiesData";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    seoTitle: "Autronis | Work — Case Studies & Portfolio",
    seoDesc: "See our implementations and the websites we've built. Real results from real automation projects.",
    caseLabel: "Case Studies",
    caseTitle: "Real results from real projects",
    portfolioLabel: "Portfolio",
    portfolioTitle: "Built by Autronis",
    portfolioDesc: "Websites with integrated animations, automations and smart systems.",
    cta: "Start your project",
  },
  nl: {
    seoTitle: "Autronis | Werk — Case Studies & Portfolio",
    seoDesc: "Bekijk onze implementaties en de websites die wij gebouwd hebben. Echte resultaten van echte projecten.",
    caseLabel: "Case Studies",
    caseTitle: "Echte resultaten van echte projecten",
    portfolioLabel: "Portfolio",
    portfolioTitle: "Gebouwd door Autronis",
    portfolioDesc: "Websites met geïntegreerde animaties, automatiseringen en slimme systemen.",
    cta: "Start jouw project",
  },
};

const LaptopPreview = ({ url, title, desc, delay = 0 }: { url: string; title: string; desc: string; delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="relative mx-auto">
        {/* Screen */}
        <div className="relative rounded-t-xl border-[5px] border-gray-800 bg-gray-900 overflow-hidden aspect-[16/10] shadow-xl">
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gray-700 z-10" />
          <div className="w-full h-full overflow-hidden">
            {isVisible && (
              <iframe
                src={`${url}${url.includes("?") ? "&" : "?"}embed=1`}
                title={title}
                className="w-[400%] h-[400%] origin-top-left border-0 pointer-events-none"
                style={{ transform: "scale(0.25)" }}
                loading="eager"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        </div>
        {/* Base */}
        <div className="h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg mx-[-1%] shadow-md" />
        <div className="absolute bottom-[3px] left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-b-full" />
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </motion.div>
  );
};

const Work = () => {
  const lang = useLanguage();
  const t = text[lang];
  const cases = casesByLang[lang];

  const caseItems = cases.map((cs, i) => ({
    url: `/case-studies/${cs.slug || `case-${i}`}`,
    title: cs.title,
    desc: cs.metrics?.[0] ? `${cs.metrics[0].label}: ${cs.metrics[0].value}` : "",
  }));

  const portfolioItems = [
    { url: "/", title: "Autronis.com", desc: lang === "nl" ? "3D animaties & webarchitectuur" : "3D animations & web architecture" },
    { url: "/services", title: lang === "nl" ? "Diensten" : "Services", desc: lang === "nl" ? "Interactieve diensten & workflow builder" : "Interactive services & workflow builder" },
    { url: "/impact-roi", title: "Impact & ROI", desc: lang === "nl" ? "ROI-calculator & datavisualisaties" : "ROI calculator & data visualizations" },
  ];

  return (
    <>
      <SEOHead title={t.seoTitle} description={t.seoDesc} path="/work" />

      {/* Case Studies */}
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.caseLabel}</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{t.caseTitle}</h1>
            </ScrollRevealItem>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {caseItems.map((item, i) => (
              <Link key={item.url} to={item.url} className="group">
                <LaptopPreview url={item.url} title={item.title} desc={item.desc} delay={i * 0.1} />
              </Link>
            ))}
            {/* Placeholder if only 1 case study — fill with "Coming soon" */}
            {caseItems.length < 3 && Array.from({ length: 3 - caseItems.length }).map((_, i) => (
              <motion.div
                key={`placeholder-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (caseItems.length + i) * 0.1, duration: 0.5 }}
              >
                <div className="relative mx-auto">
                  <div className="relative rounded-t-xl border-[5px] border-gray-800 bg-gray-900 overflow-hidden aspect-[16/10] shadow-xl flex items-center justify-center">
                    <p className="text-gray-500 text-sm font-medium">Coming soon</p>
                  </div>
                  <div className="h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg mx-[-1%] shadow-md" />
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-sm font-bold text-muted-foreground/50">Coming soon</h3>
                  <p className="text-xs text-muted-foreground/30">New case study in progress</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <ScrollReveal className="text-center mb-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.portfolioLabel}</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t.portfolioTitle}</h2>
              <p className="text-sm text-muted-foreground">{t.portfolioDesc}</p>
            </ScrollRevealItem>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {portfolioItems.map((item, i) => (
              <LaptopPreview key={item.url} url={item.url} title={item.title} desc={item.desc} delay={i * 0.1} />
            ))}
          </div>

          <div className="text-center">
            <GlowCTA to="/book">{t.cta}</GlowCTA>
          </div>
        </div>
      </section>
    </>
  );
};

export default Work;
