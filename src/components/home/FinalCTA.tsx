import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AnimatedBubbles from "@/components/home/AnimatedBubbles";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });

  return (
    <section ref={sectionRef} className="py-16 sm:py-28 border-t border-border relative overflow-hidden">
      <AnimatedBubbles bubbles={[
        { x: "25%", y: "30%", size: 340, opacity: 0.13, delay: 0, skewX: 8, borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%" },
        { x: "75%", y: "50%", size: 300, opacity: 0.12, delay: 1, skewY: -6, borderRadius: "45% 55% 40% 60% / 55% 45% 60% 40%" },
        { x: "50%", y: "20%", size: 360, opacity: 0.11, delay: 1.5, skewX: -5, borderRadius: "50% 50% 45% 55% / 60% 40% 55% 45%" },
        { x: "15%", y: "70%", size: 280, opacity: 0.12, delay: 2, skewY: 7, borderRadius: "55% 45% 50% 50% / 40% 60% 45% 55%" },
        { x: "85%", y: "25%", size: 260, opacity: 0.13, delay: 0.5, skewX: 10, borderRadius: "40% 60% 50% 50% / 55% 45% 50% 50%" },
        { x: "40%", y: "80%", size: 300, opacity: 0.11, delay: 2.5, skewY: -4, borderRadius: "50% 50% 60% 40% / 45% 55% 50% 50%" },
      ]} />

      {/* Butterfly SVG - larger and more vivid */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.svg
          width="800"
          height="640"
          viewBox="-100 -80 200 160"
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

          {/* Left upper wing */}
          <motion.path
            d="M -4 -2 C -12 -18, -30 -50, -60 -45 C -75 -38, -70 -18, -50 -8 C -35 -2, -15 0, -4 2 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.14"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            animate={{
              d: [
                "M -4 -2 C -12 -18, -30 -50, -60 -45 C -75 -38, -70 -18, -50 -8 C -35 -2, -15 0, -4 2 Z",
                "M -4 -2 C -14 -22, -35 -55, -65 -48 C -78 -40, -72 -16, -52 -6 C -36 0, -15 2, -4 2 Z",
                "M -4 -2 C -12 -18, -30 -50, -60 -45 C -75 -38, -70 -18, -50 -8 C -35 -2, -15 0, -4 2 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Left lower wing */}
          <motion.path
            d="M -4 2 C -15 8, -40 18, -55 35 C -58 48, -40 52, -25 38 C -14 28, -6 12, -4 2 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.1"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.28"
            strokeWidth="1"
            animate={{
              d: [
                "M -4 2 C -15 8, -40 18, -55 35 C -58 48, -40 52, -25 38 C -14 28, -6 12, -4 2 Z",
                "M -4 2 C -16 10, -44 22, -58 40 C -60 52, -42 55, -26 40 C -14 30, -6 14, -4 2 Z",
                "M -4 2 C -15 8, -40 18, -55 35 C -58 48, -40 52, -25 38 C -14 28, -6 12, -4 2 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Right upper wing */}
          <motion.path
            d="M 4 -2 C 12 -18, 30 -50, 60 -45 C 75 -38, 70 -18, 50 -8 C 35 -2, 15 0, 4 2 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.14"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            animate={{
              d: [
                "M 4 -2 C 12 -18, 30 -50, 60 -45 C 75 -38, 70 -18, 50 -8 C 35 -2, 15 0, 4 2 Z",
                "M 4 -2 C 14 -22, 35 -55, 65 -48 C 78 -40, 72 -16, 52 -6 C 36 0, 15 2, 4 2 Z",
                "M 4 -2 C 12 -18, 30 -50, 60 -45 C 75 -38, 70 -18, 50 -8 C 35 -2, 15 0, 4 2 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right lower wing */}
          <motion.path
            d="M 4 2 C 15 8, 40 18, 55 35 C 58 48, 40 52, 25 38 C 14 28, 6 12, 4 2 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.1"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.28"
            strokeWidth="1"
            animate={{
              d: [
                "M 4 2 C 15 8, 40 18, 55 35 C 58 48, 40 52, 25 38 C 14 28, 6 12, 4 2 Z",
                "M 4 2 C 16 10, 44 22, 58 40 C 60 52, 42 55, 26 40 C 14 30, 6 14, 4 2 Z",
                "M 4 2 C 15 8, 40 18, 55 35 C 58 48, 40 52, 25 38 C 14 28, 6 12, 4 2 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Wing veins */}
          <g opacity="0.2" stroke="hsl(174, 78%, 41%)" strokeWidth="0.6" fill="none">
            <line x1="-4" y1="0" x2="-50" y2="-30" />
            <line x1="-4" y1="0" x2="-60" y2="-10" />
            <line x1="-4" y1="0" x2="-40" y2="30" />
            <line x1="4" y1="0" x2="50" y2="-30" />
            <line x1="4" y1="0" x2="60" y2="-10" />
            <line x1="4" y1="0" x2="40" y2="30" />
          </g>

          {/* Inner wing detail */}
          <g opacity="0.12" stroke="hsl(174, 78%, 41%)" strokeWidth="0.5" fill="none">
            <path d="M -4 -1 C -10 -12, -25 -35, -45 -35" />
            <path d="M -4 0 C -12 -8, -30 -20, -55 -20" />
            <path d="M -4 1 C -10 5, -25 12, -40 25" />
            <path d="M 4 -1 C 10 -12, 25 -35, 45 -35" />
            <path d="M 4 0 C 12 -8, 30 -20, 55 -20" />
            <path d="M 4 1 C 10 5, 25 12, 40 25" />
          </g>

          {/* Body */}
          <ellipse cx="0" cy="0" rx="3.5" ry="12" fill="hsl(174, 78%, 41%)" fillOpacity="0.2" stroke="hsl(174, 78%, 41%)" strokeOpacity="0.3" strokeWidth="1" />
          
          {/* Center pulse */}
          <motion.circle
            cx="0"
            cy="0"
            r="5"
            fill="none"
            stroke="hsl(174, 78%, 41%)"
            strokeWidth="1.5"
            animate={{ strokeOpacity: [0.2, 0.4, 0.2], r: [5, 7, 5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Outer glow ring */}
          <motion.circle
            cx="0"
            cy="0"
            r="10"
            fill="none"
            stroke="hsl(174, 78%, 41%)"
            strokeWidth="1"
            animate={{ strokeOpacity: [0.08, 0.2, 0.08], r: [10, 14, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Antennae */}
          <path
            d="M -1.5 -12 Q -8 -30 -14 -40 M 1.5 -12 Q 8 -30 14 -40"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.25"
            strokeWidth="0.8"
            fill="none"
          />
          <circle cx="-14" cy="-40" r="1.8" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
          <circle cx="14" cy="-40" r="1.8" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />
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
