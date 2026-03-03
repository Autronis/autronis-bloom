import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
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
      <section className="relative min-h-[80vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ backgroundColor: "color-mix(in hsl, hsl(var(--background)), hsl(var(--card)) 30%)" }}>
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

      {/* Security Trust Strip */}
      <motion.div
        className="border-t border-border/50 bg-background"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <motion.div
                whileHover={{ scale: 1.03, filter: "drop-shadow(0 0 4px hsl(174 78% 41% / 0.35))" }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <ShieldCheck size={15} className="text-primary" />
              </motion.div>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Beveiliging en datakwaliteit zijn geïntegreerd in elke fase van onze aanpak — met minimale toegangsrechten, logging en volledige documentatie.
              </p>
            </div>
            <Link to="/services#kwaliteitsnorm" className="group text-xs text-muted-foreground/70 hover:text-primary/80 transition-colors whitespace-nowrap flex items-center gap-1 shrink-0">
              Bekijk onze kwaliteitsnorm
              <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>

      <CaseStudiesPreview />
      <SecurityBlock />
      <FAQSection />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
