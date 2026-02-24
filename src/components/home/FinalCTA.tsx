import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="py-24 border-t border-border relative overflow-hidden">
      {/* Butterfly silhouette background — centered behind text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-y-8">
        <motion.svg
          viewBox="0 0 200 180"
          className="w-[400px] sm:w-[500px] lg:w-[600px] h-auto opacity-[0.13]"
          initial={{ scale: 0.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ amount: 0.1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <path d="M100 90 Q60 20 20 40 Q10 60 40 80 Q60 90 100 90" fill="hsl(174, 78%, 55%)" />
          <path d="M100 90 Q140 20 180 40 Q190 60 160 80 Q140 90 100 90" fill="hsl(174, 78%, 55%)" />
          <path d="M100 90 Q60 100 30 130 Q25 150 60 140 Q80 120 100 100" fill="hsl(174, 64%, 45%)" />
          <path d="M100 90 Q140 100 170 130 Q175 150 140 140 Q120 120 100 100" fill="hsl(174, 64%, 45%)" />
          <ellipse cx={100} cy={95} rx={3.5} ry={22} fill="hsl(174, 50%, 60%)" />
          <path d="M98 74 Q90 58 84 50" fill="none" stroke="hsl(174, 78%, 55%)" strokeWidth={1} strokeLinecap="round" />
          <path d="M102 74 Q110 58 116 50" fill="none" stroke="hsl(174, 78%, 55%)" strokeWidth={1} strokeLinecap="round" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 max-w-2xl mx-auto">
          Klaar om handmatig werk te elimineren?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Plan een vrijblijvende Automation Scan en ontdek hoeveel tijd en geld u kunt besparen.
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
