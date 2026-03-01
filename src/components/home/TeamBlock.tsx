import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import teamPhoto from "@/assets/autronis_foto_samen.jpg";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const TeamBlock = () => {
  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Photo */}
          <ScrollRevealItem>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={teamPhoto}
                alt="Autronis founders — Sem en Syb"
                className="w-full h-full object-cover object-[center_10%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </ScrollRevealItem>

          {/* Text */}
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
      </div>
    </section>
  );
};

export default TeamBlock;
