import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";
import GlowCTA from "@/components/GlowCTA";

const text = {
  en: {
    label: "Portfolio",
    title: "Built by Autronis",
    desc: "Websites with integrated animations, automations and smart systems — live preview.",
    cta: "Start your project",
  },
  nl: {
    label: "Portfolio",
    title: "Gebouwd door Autronis",
    desc: "Websites met geïntegreerde animaties, automatiseringen en slimme systemen — live preview.",
    cta: "Start jouw project",
  },
};

const LaptopLivePreview = ({ url }: { url: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setIsVisible(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative mx-auto max-w-4xl">
      {/* Laptop screen bezel */}
      <div className="relative rounded-t-2xl border-[6px] border-gray-800 bg-gray-900 overflow-hidden aspect-[16/10] shadow-2xl">
        {/* Camera dot */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gray-700 z-10" />
        {/* Iframe container */}
        <div className="w-full h-full overflow-hidden">
          {isVisible && (
            <iframe
              src={url}
              title="Autronis live preview"
              className="w-[400%] h-[400%] origin-top-left border-0 pointer-events-none"
              style={{ transform: "scale(0.25)" }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
        </div>
        {/* Subtle screen reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
      </div>
      {/* Laptop base / hinge */}
      <div className="relative">
        <div className="h-4 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-xl mx-[-2%] shadow-lg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-600 rounded-b-full" />
      </div>
      {/* Shadow under laptop */}
      <div className="absolute -bottom-4 left-[10%] right-[10%] h-6 bg-black/10 blur-xl rounded-full" />
    </div>
  );
};

const ProjectShowcase = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <section className="py-16 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">{t.title}</h2>
            <p className="text-sm sm:text-base text-muted-foreground">{t.desc}</p>
          </ScrollRevealItem>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {[
            { url: "/", title: "Autronis.com", desc: { en: "3D animations & modern web architecture", nl: "3D animaties & moderne webarchitectuur" } },
            { url: "/services", title: "Services", desc: { en: "Interactive service pillars & workflow builder", nl: "Interactieve diensten & workflow builder" } },
            { url: "/impact-roi", title: "Impact & ROI", desc: { en: "ROI calculator & data visualizations", nl: "ROI-calculator & datavisualisaties" } },
          ].map((project, idx) => (
            <motion.div
              key={project.url}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
            >
              <LaptopLivePreview url={project.url} />
              <div className="mt-3 text-center">
                <h3 className="text-base font-bold">{project.title}</h3>
                <p className="text-xs text-muted-foreground">{project.desc[lang]}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <GlowCTA to="/book">{t.cta}</GlowCTA>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
