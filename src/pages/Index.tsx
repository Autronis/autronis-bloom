import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import HeroBackground from "@/components/home/HeroBackground";
import StatisticsBlock from "@/components/home/StatisticsBlock";
import ProblemSolutionSection from "@/components/home/ProblemSolutionSection";
import ServicePillars from "@/components/home/ServicePillars";
import ProcessSection from "@/components/home/ProcessSection";
import WhyAutronisSection from "@/components/home/WhyAutronisSection";
import TeamBlock from "@/components/home/TeamBlock";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import SecurityBlock from "@/components/home/SecurityBlock";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] sm:min-h-screen flex items-center overflow-hidden">
        <HeroBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-primary mb-4 tracking-widest uppercase">
              Automation & System Architecture
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Breng structuur in je groei.
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Wij transformeren processen tot slimme systemen die schaalbaar en beheersbaar blijven.
            </p>
            <Button asChild size="lg">
              <Link to="/book">
                Plan een Automation Scan
                <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <StatisticsBlock />
      <ProblemSolutionSection />
      <ServicePillars />
      <ProcessSection />
      <WhyAutronisSection />
      <TeamBlock />
      <CaseStudiesPreview />
      <SecurityBlock />
      <FAQSection />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
