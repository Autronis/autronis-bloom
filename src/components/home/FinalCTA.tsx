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
      {/* Abstract butterfly silhouette */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.svg
          width="600"
          height="500"
          viewBox="-70 -60 140 120"
          className="max-w-[90vw]"
          aria-hidden="true"
          initial={{ scale: 0.15, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.15, opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left wing - breathing animation */}
          <motion.path
            d="M 0 0 C -10 -35, -50 -50, -45 -12 C -55 12, -38 45, 0 18 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.14"
            animate={{
              d: [
                "M 0 0 C -10 -35, -50 -50, -45 -12 C -55 12, -38 45, 0 18 Z",
                "M 0 0 C -12 -38, -55 -48, -48 -10 C -58 14, -40 48, 0 20 Z",
                "M 0 0 C -10 -35, -50 -50, -45 -12 C -55 12, -38 45, 0 18 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Left wing inner */}
          <motion.path
            d="M 0 0 C -6 -20, -30 -30, -26 -7 C -32 8, -22 28, 0 11 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.08"
            animate={{
              d: [
                "M 0 0 C -6 -20, -30 -30, -26 -7 C -32 8, -22 28, 0 11 Z",
                "M 0 0 C -7 -22, -33 -28, -28 -5 C -34 10, -24 30, 0 13 Z",
                "M 0 0 C -6 -20, -30 -30, -26 -7 C -32 8, -22 28, 0 11 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Right wing - breathing animation */}
          <motion.path
            d="M 0 0 C 10 -35, 50 -50, 45 -12 C 55 12, 38 45, 0 18 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.14"
            animate={{
              d: [
                "M 0 0 C 10 -35, 50 -50, 45 -12 C 55 12, 38 45, 0 18 Z",
                "M 0 0 C 12 -38, 55 -48, 48 -10 C 58 14, 40 48, 0 20 Z",
                "M 0 0 C 10 -35, 50 -50, 45 -12 C 55 12, 38 45, 0 18 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Right wing inner */}
          <motion.path
            d="M 0 0 C 6 -20, 30 -30, 26 -7 C 32 8, 22 28, 0 11 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.08"
            animate={{
              d: [
                "M 0 0 C 6 -20, 30 -30, 26 -7 C 32 8, 22 28, 0 11 Z",
                "M 0 0 C 7 -22, 33 -28, 28 -5 C 34 10, 24 30, 0 13 Z",
                "M 0 0 C 6 -20, 30 -30, 26 -7 C 32 8, 22 28, 0 11 Z",
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Body - pulse */}
          <motion.ellipse
            cx="0"
            cy="3"
            rx="2.5"
            ry="16"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.18"
            animate={{ fillOpacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Antennae */}
          <path
            d="M -1.5 -12 Q -7 -25 -10 -30 M 1.5 -12 Q 7 -25 10 -30"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.15"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Subtle rotation wrapper */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="0 0 3;2 0 3;0 0 3;-2 0 3;0 0 3"
            dur="9s"
            repeatCount="indefinite"
          />
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
