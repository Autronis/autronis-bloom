import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroBackground from "@/components/home/HeroBackground";
import StatisticsBlock from "@/components/home/StatisticsBlock";
import ProblemSolutionSection from "@/components/home/ProblemSolutionSection";
import ServicePillars from "@/components/home/ServicePillars";
import ProcessSection from "@/components/home/ProcessSection";
import WhyAutronisSection from "@/components/home/WhyAutronisSection";
import ROIPreview from "@/components/home/ROIPreview";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import SecurityBlock from "@/components/home/SecurityBlock";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

const rotatingWords = ["groei", "processen", "systemen", "datastromen", "schaalbaarheid"];

const Index = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-primary mb-4 tracking-widest uppercase">
              Systeemarchitectuur & Automatisering
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.3] tracking-tight mb-6">
              Breng structuur in je
              <br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="inline-block text-primary"
                >
                  {rotatingWords[wordIndex]}.
                </motion.span>
              </AnimatePresence>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Wij transformeren processen tot slimme systemen die schaalbaar en beheersbaar blijven.
            </p>
            <Button asChild size="lg" className="mb-12">
              <Link to="/book">
                Plan een Automation Scan
                <ArrowRight size={18} />
              </Link>
            </Button>

            {/* Statistics directly under CTA */}
            <StatisticsBlock />
          </div>
        </div>
      </section>



      <ProblemSolutionSection />
      <ServicePillars />
      <ProcessSection />
      <WhyAutronisSection />
      <ROIPreview />
      <CaseStudiesPreview />
      <SecurityBlock />
      <FAQSection />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
