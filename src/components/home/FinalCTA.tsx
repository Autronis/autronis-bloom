import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

  return (
    <section ref={sectionRef} className="py-16 sm:py-28 border-t border-border relative overflow-hidden">
      

      {/* Logo-inspired butterfly: gear body + circuit wings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.svg
          width="700"
          height="560"
          viewBox="-120 -90 240 180"
          className="max-w-[90vw]"
          aria-hidden="true"
          initial={{ scale: 0.15, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.15, opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 0 0;1.5 0 0;0 0 0;-1.5 0 0;0 0 0"
            dur="10s"
            repeatCount="indefinite"
          />

          {/* Left upper wing - more angular/circuit-like */}
          <motion.path
            d="M -8 -4 L -20 -20 C -28 -38, -50 -52, -72 -42 C -82 -35, -78 -18, -60 -10 L -35 -4 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.12"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.3"
            strokeWidth="1.2"
            animate={{
              d: [
                "M -8 -4 L -20 -20 C -28 -38, -50 -52, -72 -42 C -82 -35, -78 -18, -60 -10 L -35 -4 Z",
                "M -8 -4 L -22 -24 C -32 -42, -54 -56, -76 -45 C -85 -37, -80 -16, -62 -8 L -35 -2 Z",
                "M -8 -4 L -20 -20 C -28 -38, -50 -52, -72 -42 C -82 -35, -78 -18, -60 -10 L -35 -4 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Left lower wing */}
          <motion.path
            d="M -8 4 L -22 12 C -38 22, -55 35, -58 50 C -52 60, -35 55, -25 40 L -10 12 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.09"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.25"
            strokeWidth="1"
            animate={{
              d: [
                "M -8 4 L -22 12 C -38 22, -55 35, -58 50 C -52 60, -35 55, -25 40 L -10 12 Z",
                "M -8 4 L -24 14 C -42 26, -58 40, -60 55 C -54 64, -36 58, -26 42 L -10 14 Z",
                "M -8 4 L -22 12 C -38 22, -55 35, -58 50 C -52 60, -35 55, -25 40 L -10 12 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Right upper wing */}
          <motion.path
            d="M 8 -4 L 20 -20 C 28 -38, 50 -52, 72 -42 C 82 -35, 78 -18, 60 -10 L 35 -4 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.12"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.3"
            strokeWidth="1.2"
            animate={{
              d: [
                "M 8 -4 L 20 -20 C 28 -38, 50 -52, 72 -42 C 82 -35, 78 -18, 60 -10 L 35 -4 Z",
                "M 8 -4 L 22 -24 C 32 -42, 54 -56, 76 -45 C 85 -37, 80 -16, 62 -8 L 35 -2 Z",
                "M 8 -4 L 20 -20 C 28 -38, 50 -52, 72 -42 C 82 -35, 78 -18, 60 -10 L 35 -4 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right lower wing */}
          <motion.path
            d="M 8 4 L 22 12 C 38 22, 55 35, 58 50 C 52 60, 35 55, 25 40 L 10 12 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.09"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.25"
            strokeWidth="1"
            animate={{
              d: [
                "M 8 4 L 22 12 C 38 22, 55 35, 58 50 C 52 60, 35 55, 25 40 L 10 12 Z",
                "M 8 4 L 24 14 C 42 26, 58 40, 60 55 C 54 64, 36 58, 26 42 L 10 14 Z",
                "M 8 4 L 22 12 C 38 22, 55 35, 58 50 C 52 60, 35 55, 25 40 L 10 12 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Circuit traces on wings - left */}
          <g opacity="0.22" stroke="hsl(174, 78%, 41%)" strokeWidth="0.7" fill="none">
            <path d="M -8 -2 L -30 -15 L -50 -30" />
            <path d="M -8 0 L -40 -8 L -65 -20" />
            <path d="M -8 2 L -25 10 L -40 30" />
            {/* Circuit nodes */}
            <circle cx="-30" cy="-15" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
            <circle cx="-50" cy="-30" r="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
            <circle cx="-65" cy="-20" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
            <circle cx="-40" cy="30" r="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
            <circle cx="-25" cy="10" r="1.8" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
          </g>

          {/* Circuit traces on wings - right */}
          <g opacity="0.22" stroke="hsl(174, 78%, 41%)" strokeWidth="0.7" fill="none">
            <path d="M 8 -2 L 30 -15 L 50 -30" />
            <path d="M 8 0 L 40 -8 L 65 -20" />
            <path d="M 8 2 L 25 10 L 40 30" />
            <circle cx="30" cy="-15" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
            <circle cx="50" cy="-30" r="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
            <circle cx="65" cy="-20" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
            <circle cx="40" cy="30" r="2.5" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
            <circle cx="25" cy="10" r="1.8" fill="hsl(174, 78%, 41%)" fillOpacity="0.3" />
          </g>

          {/* Gear body - 6 teeth */}
          <g opacity="0.25">
            {/* Gear teeth */}
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
            {/* Gear body circle */}
            <circle cx="0" cy="0" r="12" fill="hsl(174, 78%, 41%)" fillOpacity="0.15" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.35" strokeWidth="1.2" />
          </g>

          {/* Inner turquoise ring (like logo) */}
          <motion.circle
            cx="0"
            cy="0"
            r="8"
            fill="none"
            stroke="hsl(174, 78%, 41%)"
            strokeWidth="2.5"
            animate={{ strokeOpacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Center pulse */}
          <motion.circle
            cx="0"
            cy="0"
            r="4"
            fill="hsl(174, 78%, 41%)"
            animate={{ fillOpacity: [0.08, 0.18, 0.08], r: [4, 5, 4] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Antennae */}
          <path
            d="M -2.5 -14 Q -8 -35 -12 -48 M 2.5 -14 Q 8 -35 12 -48"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.22"
            strokeWidth="0.8"
            fill="none"
          />
          <circle cx="-12" cy="-48" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.22" />
          <circle cx="12" cy="-48" r="2" fill="hsl(174, 78%, 41%)" fillOpacity="0.22" />
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
