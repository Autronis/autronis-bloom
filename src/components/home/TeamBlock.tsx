import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import teamFoto from "@/assets/autronis_team_foto.png";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const TeamBlock = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const imgInView = useInView(imgRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-24 border-t border-border relative overflow-hidden"
    >
      {/* Animated grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(174 78% 30% / 0.07) 1px, transparent 1px),
            linear-gradient(90deg, hsl(174 78% 30% / 0.07) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      {/* Sporadic animated node dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "10%", y: "15%", delay: 0 },
          { x: "88%", y: "25%", delay: 1.2 },
          { x: "35%", y: "80%", delay: 0.6 },
          { x: "65%", y: "10%", delay: 1.8 },
          { x: "20%", y: "55%", delay: 0.3 },
          { x: "75%", y: "70%", delay: 2.1 },
          { x: "50%", y: "40%", delay: 0.9 },
          { x: "92%", y: "60%", delay: 1.5 },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/20 animate-pulse"
            style={{
              left: pos.x,
              top: pos.y,
              animationDelay: `${pos.delay}s`,
              animationDuration: "3s",
            }}
          />
        ))}
        {/* Data line pulses */}
        {[
          { x1: "10%", y1: "15%", x2: "35%", y2: "80%", delay: 0 },
          { x1: "88%", y1: "25%", x2: "65%", y2: "10%", delay: 2 },
          { x1: "50%", y1: "40%", x2: "75%", y2: "70%", delay: 1 },
        ].map((line, i) => (
          <svg
            key={`line-${i}`}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.06 }}
          >
            <line
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="hsl(174 78% 41%)"
              strokeWidth="0.5"
              strokeDasharray="4 8"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;-24"
                dur="4s"
                begin={`${line.delay}s`}
                repeatCount="indefinite"
              />
            </line>
          </svg>
        ))}
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text */}
          <ScrollReveal>
            <ScrollRevealItem>
              <div>
                <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                  Team
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                  Klaar om te zien hoe het werkt voor uw bedrijf?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Plan een vrijblijvend gesprek. Wij brengen uw workflows in kaart,
                  identificeren de quick wins en laten zien hoe het pad naar productie eruitziet.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg">
                    <Link to="/book">
                      Plan een kennismaking
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300">
                    <Link to="/team">
                      Bekijk ons team
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* Team photo */}
          <div ref={imgRef}>
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              animate={imgInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="rounded-xl overflow-hidden"
            >
              <img
                src={teamFoto}
                alt="Autronis team - Sem en Syb"
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamBlock;
