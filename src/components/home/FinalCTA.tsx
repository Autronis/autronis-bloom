import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const FinalCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !svgRef.current) return;

    const svg = svgRef.current;
    const butterfly = svg.querySelector("#final-butterfly") as SVGGElement;
    const path = svg.querySelector("#flight-path") as SVGPathElement;
    if (!butterfly || !path) return;

    const totalLength = path.getTotalLength();
    let startTime: number | null = null;
    const duration = 3000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const point = path.getPointAtLength(eased * totalLength);

      // Scale from small to large
      const scale = 0.3 + eased * 0.7;
      butterfly.setAttribute(
        "transform",
        `translate(${point.x}, ${point.y}) scale(${scale})`
      );
      butterfly.style.opacity = String(Math.min(progress * 3, 1));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView]);

  return (
    <section ref={sectionRef} className="py-16 sm:py-28 border-t border-border relative overflow-hidden">
      {/* Butterfly SVG animation */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <path
            id="flight-path"
            d="M 100 350 C 300 200, 500 100, 600 180 C 700 260, 800 150, 600 200"
            fill="none"
          />
        </defs>
        <g id="final-butterfly" style={{ opacity: 0 }}>
          {/* Left wing */}
          <path
            d="M -12 0 C -20 -18, -8 -28, 0 -12 C -4 -22, -18 -16, -12 0Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.25"
          />
          {/* Right wing */}
          <path
            d="M 12 0 C 20 -18, 8 -28, 0 -12 C 4 -22, 18 -16, 12 0Z"
            fill="hsl(174, 78%, 41%)"
            fillOpacity="0.25"
          />
          {/* Body */}
          <ellipse cx="0" cy="-4" rx="1.5" ry="8" fill="hsl(174, 78%, 41%)" fillOpacity="0.4" />
          {/* Glow */}
          <circle cx="0" cy="0" r="20" fill="hsl(174, 78%, 41%)" fillOpacity="0.06" />
        </g>
      </svg>

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
