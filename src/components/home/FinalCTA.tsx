import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });

  return (
    <section ref={sectionRef} className="py-16 sm:py-28 border-t border-border relative overflow-hidden">
      {/* Logo-inspired butterfly: gear body + circuit wings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.svg
          width="600"
          height="500"
          viewBox="-80 -65 160 130"
          className="max-w-[90vw]"
          aria-hidden="true"
          initial={{ scale: 0.15, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.15, opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle rotation */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 0 3;1.5 0 3;0 0 3;-1.5 0 3;0 0 3"
            dur="10s"
            repeatCount="indefinite"
          />

          {/* Left wing outline - breathing */}
          <motion.path
            d="M -6 0 C -14 -30, -55 -48, -50 -14 C -58 8, -42 42, -6 16 Z"
            fill="none"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.12"
            strokeWidth="1.5"
            animate={{
              d: [
                "M -6 0 C -14 -30, -55 -48, -50 -14 C -58 8, -42 42, -6 16 Z",
                "M -6 0 C -16 -34, -60 -46, -54 -12 C -62 10, -44 45, -6 18 Z",
                "M -6 0 C -14 -30, -55 -48, -50 -14 C -58 8, -42 42, -6 16 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Left wing fill */}
          <motion.path
            d="M -6 0 C -14 -30, -55 -48, -50 -14 C -58 8, -42 42, -6 16 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.06"
            animate={{
              d: [
                "M -6 0 C -14 -30, -55 -48, -50 -14 C -58 8, -42 42, -6 16 Z",
                "M -6 0 C -16 -34, -60 -46, -54 -12 C -62 10, -44 45, -6 18 Z",
                "M -6 0 C -14 -30, -55 -48, -50 -14 C -58 8, -42 42, -6 16 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Left wing circuit lines */}
          <motion.g
            animate={{
              x: [0, -2, 0],
              y: [0, -2, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="-12" y1="-8" x2="-38" y2="-28" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.1" strokeWidth="0.8" />
            <line x1="-15" y1="5" x2="-40" y2="-5" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.08" strokeWidth="0.6" />
            <line x1="-12" y1="10" x2="-35" y2="25" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.08" strokeWidth="0.6" />
            {/* Circuit nodes */}
            <circle cx="-38" cy="-28" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
            <circle cx="-40" cy="-5" r="1.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.12" />
            <circle cx="-35" cy="25" r="1.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.12" />
          </motion.g>

          {/* Right wing outline - breathing */}
          <motion.path
            d="M 6 0 C 14 -30, 55 -48, 50 -14 C 58 8, 42 42, 6 16 Z"
            fill="none"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.12"
            strokeWidth="1.5"
            animate={{
              d: [
                "M 6 0 C 14 -30, 55 -48, 50 -14 C 58 8, 42 42, 6 16 Z",
                "M 6 0 C 16 -34, 60 -46, 54 -12 C 62 10, 44 45, 6 18 Z",
                "M 6 0 C 14 -30, 55 -48, 50 -14 C 58 8, 42 42, 6 16 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right wing fill */}
          <motion.path
            d="M 6 0 C 14 -30, 55 -48, 50 -14 C 58 8, 42 42, 6 16 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.06"
            animate={{
              d: [
                "M 6 0 C 14 -30, 55 -48, 50 -14 C 58 8, 42 42, 6 16 Z",
                "M 6 0 C 16 -34, 60 -46, 54 -12 C 62 10, 44 45, 6 18 Z",
                "M 6 0 C 14 -30, 55 -48, 50 -14 C 58 8, 42 42, 6 16 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Right wing circuit lines */}
          <motion.g
            animate={{
              x: [0, 2, 0],
              y: [0, -2, 0],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <line x1="12" y1="-8" x2="38" y2="-28" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.1" strokeWidth="0.8" />
            <line x1="15" y1="5" x2="40" y2="-5" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.08" strokeWidth="0.6" />
            <line x1="12" y1="10" x2="35" y2="25" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.08" strokeWidth="0.6" />
            <circle cx="38" cy="-28" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
            <circle cx="40" cy="-5" r="1.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.12" />
            <circle cx="35" cy="25" r="1.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.12" />
          </motion.g>

          {/* Gear body (6 teeth) */}
          <motion.path
            d="M -3 -14 L -1.5 -12 L -4 -10 L -6 -8 L -6 -4 L -8 -2 L -8 2 L -6 4 L -6 8 L -4 10 L -1.5 12 L -3 14 L 3 14 L 1.5 12 L 4 10 L 6 8 L 6 4 L 8 2 L 8 -2 L 6 -4 L 6 -8 L 4 -10 L 1.5 -12 L 3 -14 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.1"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.15"
            strokeWidth="0.8"
            animate={{ fillOpacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Center circle (turquoise ring like logo) */}
          <circle cx="0" cy="0" r="6" fill="none" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.2" strokeWidth="2" />
          <motion.circle
            cx="0"
            cy="0"
            r="6"
            fill="none"
            stroke="hsl(174, 78%, 41%)"
            strokeWidth="2"
            strokeOpacity="0.3"
            animate={{ strokeOpacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="0" cy="0" r="3.5" fill="hsl(var(--background))" fillOpacity="0.5" />

          {/* Antennae */}
          <path
            d="M -2 -14 Q -7 -28 -10 -34 M 2 -14 Q 7 -28 10 -34"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.12"
            strokeWidth="0.8"
            fill="none"
          />
          <circle cx="-10" cy="-34" r="1.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
          <circle cx="10" cy="-34" r="1.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 max-w-2xl mx-auto">
          Klaar om uw processen structureel te verbeteren?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Plan een vrijblijvende Automation Scan en ontdek waar de grootste impact ligt
          voor uw organisatie.
        </p>
        <Button asChild size="lg" className="text-base px-10">
          <Link to="/book">
            Plan Automation Scan
            <ArrowRight size={18} />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
