import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/i18n/context";
import GlowCTA from "@/components/GlowCTA";

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

      {/* Logo-inspired butterfly: gear body + circuit wings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: "-40px" }}>
        <svg
          width="700"
          height="560"
          viewBox="-120 -90 240 180"
          className="max-w-[90vw]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "scale(1)" : "scale(0.7)",
            transition: "opacity 1.2s cubic-bezier(0.25,0.46,0.45,0.94), transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
          aria-hidden="true"
        >
          {/* Left upper wing */}
          <path
            d="M -8 -4 L -20 -20 C -28 -38, -50 -52, -72 -42 C -82 -35, -78 -18, -60 -10 L -35 -4 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.12"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.3"
            strokeWidth="1.2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "rotate(0deg)" : "rotate(25deg)",
              transformOrigin: "-8px -4px",
              transition: "opacity 0.8s ease-out 0.3s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s",
            }}
          />
          <path
            d="M -8 4 L -22 12 C -38 22, -55 35, -58 50 C -52 60, -35 55, -25 40 L -10 12 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.09"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.25"
            strokeWidth="1"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "rotate(0deg)" : "rotate(-20deg)",
              transformOrigin: "-8px 4px",
              transition: "opacity 0.8s ease-out 0.4s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.4s",
            }}
          />
          <path
            d="M 8 -4 L 20 -20 C 28 -38, 50 -52, 72 -42 C 82 -35, 78 -18, 60 -10 L 35 -4 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.12"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.3"
            strokeWidth="1.2"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "rotate(0deg)" : "rotate(-25deg)",
              transformOrigin: "8px -4px",
              transition: "opacity 0.8s ease-out 0.3s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s",
            }}
          />
          <path
            d="M 8 4 L 22 12 C 38 22, 55 35, 58 50 C 52 60, 35 55, 25 40 L 10 12 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.09"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.25"
            strokeWidth="1"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "rotate(0deg)" : "rotate(20deg)",
              transformOrigin: "8px 4px",
              transition: "opacity 0.8s ease-out 0.4s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) 0.4s",
            }}
          />
          <g
            opacity="0.22"
            stroke="hsl(174, 78%, 41%)"
            strokeWidth="0.7"
            fill="none"
            style={{ opacity: isVisible ? 0.22 : 0, transition: "opacity 0.6s ease-out 0.7s" }}
          >
            <path d="M -8 -2 L -30 -15 L -50 -30" />
            <path d="M -8 0 L -40 -8 L -65 -20" />
            <path d="M -8 2 L -25 10 L -40 30" />
            <circle cx="-30" cy="-15" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
            <circle cx="-50" cy="-30" r="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
            <circle cx="-65" cy="-20" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
            <circle cx="-40" cy="30" r="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
            <circle cx="-25" cy="10" r="1.8" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
          </g>
          <g
            opacity="0.22"
            stroke="hsl(174, 78%, 41%)"
            strokeWidth="0.7"
            fill="none"
            style={{ opacity: isVisible ? 0.22 : 0, transition: "opacity 0.6s ease-out 0.7s" }}
          >
            <path d="M 8 -2 L 30 -15 L 50 -30" />
            <path d="M 8 0 L 40 -8 L 65 -20" />
            <path d="M 8 2 L 25 10 L 40 30" />
            <circle cx="30" cy="-15" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
            <circle cx="50" cy="-30" r="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
            <circle cx="65" cy="-20" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
            <circle cx="40" cy="30" r="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
            <circle cx="25" cy="10" r="1.8" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
          </g>
          <g
            opacity="0.25"
            style={{
              opacity: isVisible ? 0.25 : 0,
              transform: isVisible ? "scale(1)" : "scale(0)",
              transformOrigin: "0px 0px",
              transition: "opacity 0.6s ease-out 0.15s, transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.15s",
            }}
          >
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <rect
                key={angle}
                x="-3"
                y="-16"
                width="6"
                height="6"
                rx="1"
                fill="hsl(174, 78%, 41%)"
                stroke="hsl(174, 78%, 41%)"
                strokeWidth="0.5"
                transform={`rotate(${angle} 0 0)`}
              />
            ))}
            <circle cx="0" cy="0" r="12" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.35" strokeWidth="1.2" />
          </g>
          <circle cx="0" cy="0" r="8" fill="none" stroke="hsl(174, 78%, 41%)" strokeWidth="2.5" strokeOpacity="0.4" className={isVisible ? "animate-[finalcta-pulse_3s_ease-in-out_infinite]" : ""} style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.5s ease-out 0.2s" }} />
          <circle cx="0" cy="0" r="4" fill="hsl(174, 78%, 41%)" fillOpacity="0.13" style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.4s ease-out 0.1s" }} />
          <g style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease-out 0.6s" }}>
            <path d="M -2.5 -14 Q -8 -35 -12 -48 M 2.5 -14 Q 8 -35 12 -48" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.22" strokeWidth="0.8" fill="none" />
            <circle cx="-12" cy="-48" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.22" />
            <circle cx="12" cy="-48" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.22" />
          </g>
        </svg>
      </div>

      {/* Radial gradient glow behind text */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.04] blur-[120px] pointer-events-none"
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
