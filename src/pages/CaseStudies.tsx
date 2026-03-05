import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import { cases } from "@/components/case-studies/caseStudiesData";
import { useEffect } from "react";
import SEOHead from "@/components/SEOHead";

const CaseStudies = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [hash]);
  return (
    <>
    <SEOHead
      title="Autronis | Case Studies — Automatiseringsimplementaties"
      description="Bekijk concrete voorbeelden van hoe Autronis processen automatiseert, systemen integreert en schaalbaarheid realiseert voor groeiende bedrijven."
      path="/case-studies"
    />
    <section className="pt-16 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-16">
          <ScrollRevealItem>
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Case Studies</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Onze implementaties</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Concrete voorbeelden van hoe automatisering processen versnelt, fouten vermindert en schaalbaarheid mogelijk maakt.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        <div className="space-y-12">
          {cases.map((cs, i) => (
            <CaseStudyCard key={i} cs={cs} index={i} />
          ))}
        </div>

        <ScrollReveal className="text-center mt-12">
          <ScrollRevealItem>
            <Button asChild size="lg">
              <Link to="/book">
                Plan Automation Scan
                <ArrowRight size={18} />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Ontdek wat automatisering voor uw organisatie kan betekenen.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
    </>
  );
};

export default CaseStudies;
