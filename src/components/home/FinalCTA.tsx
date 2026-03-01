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
      {/* Large butterfly silhouette behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.svg
          width="500"
          height="400"
          viewBox="-60 -50 120 100"
          className="max-w-[90vw]"
          aria-hidden="true"
          initial={{ scale: 0.15, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.15, opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Left wing */}
          <path
            d="M 0 0 C -8 -30, -45 -45, -40 -10 C -50 10, -35 40, 0 15 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.18"
          />
          {/* Left wing detail */}
          <path
            d="M 0 0 C -5 -18, -28 -28, -24 -6 C -30 6, -20 24, 0 9 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.1"
          />

          {/* Right wing */}
          <path
            d="M 0 0 C 8 -30, 45 -45, 40 -10 C 50 10, 35 40, 0 15 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.18"
          />
          {/* Right wing detail */}
          <path
            d="M 0 0 C 5 -18, 28 -28, 24 -6 C 30 6, 20 24, 0 9 Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.1"
          />

          {/* Body */}
          <ellipse cx="0" cy="3" rx="2" ry="14" fill="hsl(174, 78%, 41%)" fillOpacity="0.25" />

          {/* Antennae */}
          <path
            d="M -1.5 -10 Q -6 -22 -9 -26 M 1.5 -10 Q 6 -22 9 -26"
            stroke="hsl(174, 78%, 41%)"
            strokeOpacity="0.2"
            strokeWidth="1"
            fill="none"
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
