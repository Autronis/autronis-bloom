import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ButterflyBg = () => (
  <motion.svg
    viewBox="0 0 200 180"
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] lg:w-[520px] h-auto pointer-events-none"
    initial={{ scale: 0.15, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 0.08 }}
    viewport={{ once: false, amount: 0.5 }}
    transition={{ duration: 2.5, ease: "easeOut" }}
  >
    <path d="M100 90 Q60 20 20 40 Q10 60 40 80 Q60 90 100 90" fill="hsl(var(--primary))" />
    <path d="M100 90 Q140 20 180 40 Q190 60 160 80 Q140 90 100 90" fill="hsl(var(--primary))" />
    <path d="M100 90 Q60 100 30 130 Q25 150 60 140 Q80 120 100 100" fill="hsl(var(--primary) / 0.7)" />
    <path d="M100 90 Q140 100 170 130 Q175 150 140 140 Q120 120 100 100" fill="hsl(var(--primary) / 0.7)" />
    <ellipse cx={100} cy={95} rx={3.5} ry={22} fill="hsl(var(--foreground) / 0.5)" />
    <path d="M98 74 Q90 58 84 50" fill="none" stroke="hsl(var(--primary))" strokeWidth={1} strokeLinecap="round" />
    <path d="M102 74 Q110 58 116 50" fill="none" stroke="hsl(var(--primary))" strokeWidth={1} strokeLinecap="round" />
  </motion.svg>
);

const FinalCTA = () => {
  return (
    <section className="py-24 border-t border-border relative overflow-hidden">
      <ButterflyBg />

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
