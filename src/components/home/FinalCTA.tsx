import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !svgRef.current) return;

    const butterfly = svgRef.current.querySelector("#cta-butterfly") as SVGGElement;
    if (!butterfly) return;

    let startTime: number | null = null;
    const duration = 2500;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      // Scale from small to large
      const scale = 0.2 + eased * 1.8;
      const opacity = Math.min(progress * 3, 1);

      butterfly.setAttribute("transform", `scale(${scale})`);
      butterfly.style.opacity = String(opacity);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-28 border-t border-border relative overflow-hidden">
      {/* Centered static butterfly that scales up */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          ref={svgRef}
          width="300"
          height="300"
          viewBox="-50 -50 100 100"
          className="opacity-80"
          aria-hidden="true"
        >
          <g id="cta-butterfly" style={{ opacity: 0, transformOrigin: "center" }}>
            {/* Glow */}
            <circle cx="0" cy="0" r="40" fill="hsl(174, 78%, 41%)" fillOpacity="0.05" />

            {/* Left wing upper */}
            <path
              d="M 0 0 C -10 -20, -30 -25, -22 -5 C -28 5, -15 18, 0 8 Z"
              fill="hsl(174, 78%, 41%)"
              fillOpacity="0.2"
            />
            {/* Left wing inner */}
            <path
              d="M 0 0 C -6 -12, -18 -15, -13 -3 C -16 3, -8 10, 0 4 Z"
              fill="hsl(174, 78%, 41%)"
              fillOpacity="0.1"
            />

            {/* Right wing upper */}
            <path
              d="M 0 0 C 10 -20, 30 -25, 22 -5 C 28 5, 15 18, 0 8 Z"
              fill="hsl(174, 78%, 41%)"
              fillOpacity="0.2"
            />
            {/* Right wing inner */}
            <path
              d="M 0 0 C 6 -12, 18 -15, 13 -3 C 16 3, 8 10, 0 4 Z"
              fill="hsl(174, 78%, 41%)"
              fillOpacity="0.1"
            />

            {/* Body */}
            <ellipse cx="0" cy="2" rx="1.2" ry="8" fill="hsl(174, 78%, 41%)" fillOpacity="0.35" />

            {/* Antennae */}
            <path
              d="M -1 -6 Q -4 -14 -6 -16 M 1 -6 Q 4 -14 6 -16"
              stroke="hsl(174, 78%, 41%)"
              strokeOpacity="0.3"
              strokeWidth="0.6"
              fill="none"
            />
          </g>
        </svg>
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
