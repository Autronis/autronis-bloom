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
                    <Link to="/team#team-section">
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
