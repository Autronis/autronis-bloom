import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import AuroraBackground from "@/components/home/AuroraBackground";

const FinalCTA = () => {
  return (
    <section className="py-24 border-t border-border relative overflow-hidden">
      <AuroraBackground intensity={0.05} speed={12} />

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
