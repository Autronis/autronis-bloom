import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  const [videoOpen, setVideoOpen] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] sm:min-h-screen flex flex-col items-center justify-center overflow-hidden" >
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
              <Button asChild size="lg">
                <Link to="/book">
                  Plan een Automation Scan
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <div className="flex flex-col items-center">
                <Button size="lg" variant="outline" onClick={() => setVideoOpen(true)}>
                  <Play size={16} />
                  Bekijk 2 min demo
                </Button>
                <p className="text-[11px] italic text-muted-foreground mt-1.5">Zie hoe automatisering in de praktijk werkt in 2 minuten.</p>
              </div>
            </div>

            {/* Video Modal */}
            <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
              <DialogContent className="sm:max-w-4xl p-0 bg-card border-border overflow-hidden">
                <div className="p-4 pb-0">
                  <p className="text-[10px] font-semibold text-primary tracking-widest uppercase">Systeemdemo</p>
                </div>
                <div className="aspect-video bg-muted/10 flex items-center justify-center m-4 mt-2 rounded-lg border border-border">
                  <div className="text-center text-muted-foreground/50">
                    <div className="w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center mx-auto mb-3">
                      <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-primary/50 ml-1" />
                    </div>
                    <p className="text-xs">Video binnenkort beschikbaar</p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

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
