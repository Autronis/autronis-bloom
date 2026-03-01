import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import fotoSem from "@/assets/foto_sem.jpg";
import fotoSyb from "@/assets/foto_syb.jpg";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const team = [
  {
    name: "Sem",
    role: "Co-founder & Engineer",
    description: "Systeemarchitectuur, API-integraties en procesautomatisering.",
    tags: ["Make", "n8n", "API's", "Python"],
    image: fotoSem,
  },
  {
    name: "Syb",
    role: "Co-founder & Engineer",
    description: "Data pipelines, dashboards en schaalbare automatiseringsarchitectuur.",
    tags: ["Data", "Dashboards", "Zapier", "SQL"],
    image: fotoSyb,
  },
];

const TeamCard = ({
  person,
  index,
  hoveredIndex,
  onHover,
  onLeave,
}: {
  person: (typeof team)[0];
  index: number;
  hoveredIndex: number | null;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const isHovered = hoveredIndex === index;
  const isAnyHovered = hoveredIndex !== null;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        opacity: isAnyHovered && !isHovered ? 0.85 : 1,
      }}
    >
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
          loading="lazy"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-all duration-300"
          style={{
            background: isHovered
              ? "linear-gradient(to top, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.7) 50%, hsl(var(--background) / 0.3) 100%)"
              : "linear-gradient(to top, hsl(var(--background) / 0.8) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.div
          animate={{
            y: isHovered ? 0 : 8,
            opacity: 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-bold text-lg mb-0.5">{person.name}</h3>
          <p className="text-xs text-primary mb-2">{person.role}</p>
        </motion.div>

        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3, delay: isHovered ? 0.05 : 0 }}
        >
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            {person.description}
          </p>
        </motion.div>

        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
          className="flex flex-wrap gap-1.5 mb-3"
        >
          {person.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full border border-primary/30 text-primary bg-primary/5"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 10,
          }}
          transition={{ duration: 0.3, delay: isHovered ? 0.15 : 0 }}
        >
          <Link
            to="/team"
            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
          >
            Bekijk expertise <ArrowRight size={12} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

const TeamBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(174 78% 30% / 0.06) 1px, transparent 1px),
            linear-gradient(90deg, hsl(174 78% 30% / 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Sporadic node dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { x: "15%", y: "20%" },
          { x: "85%", y: "35%" },
          { x: "40%", y: "75%" },
          { x: "70%", y: "15%" },
          { x: "25%", y: "60%" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/15"
            style={{ left: pos.x, top: pos.y }}
          />
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
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Werk met de mensen die het bouwen.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Wij zijn geen doorgeefluik tussen accountmanagers en developers. U werkt
                  direct met de engineers die uw systemen ontwerpen, bouwen en optimaliseren.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg">
                    <Link to="/book">
                      Plan een kennismaking
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                  <Link
                    to="/team"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1 self-center"
                  >
                    Bekijk ons team <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* Team cards */}
          <ScrollReveal className="grid grid-cols-2 gap-4" staggerChildren={0.15}>
            {team.map((person, i) => (
              <ScrollRevealItem key={person.name}>
                <TeamCard
                  person={person}
                  index={i}
                  hoveredIndex={hoveredIndex}
                  onHover={() => setHoveredIndex(i)}
                  onLeave={() => setHoveredIndex(null)}
                />
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default TeamBlock;
