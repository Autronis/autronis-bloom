import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/i18n/context";
import GlowCTA from "@/components/GlowCTA";

const CTAAnimation = lazy(() => import("@/components/home/CTAAnimation"));

const text = {
  en: {
    title: "Ready to structurally improve your processes?",
    desc: "Schedule a free Automation Scan and discover where the biggest impact lies for your organization.",
    cta: "Schedule Automation Scan",
  },
  nl: {
    title: "Klaar om je processen structureel te verbeteren?",
    desc: "Plan een gratis Automation Scan en ontdek waar de grootste impact ligt voor jouw organisatie.",
    cta: "Plan een Automation Scan",
  },
};

const FinalCTA = () => {
  const lang = useLanguage();
  const t = text[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-28 border-t border-border relative overflow-hidden">

      {/* 3D butterfly animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: "-20px" }}>
        <div className="w-[320px] sm:w-[500px]">
          <Suspense fallback={null}><CTAAnimation /></Suspense>
        </div>
      </div>

      {/* Radial gradient glow behind text */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none"
        initial={isMobile ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      />

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 max-w-2xl mx-auto"
          initial={isMobile ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          {t.title}
        </motion.h2>
        <motion.p
          className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto"
          initial={isMobile ? false : { opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
        >
          {t.desc}
        </motion.p>
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <GlowCTA to="/book">{t.cta}</GlowCTA>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
