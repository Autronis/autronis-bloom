import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useState, useEffect, lazy, Suspense, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import HeroBackground from "@/components/home/HeroBackground";
import StatisticsBlock from "@/components/home/StatisticsBlock";

// Lazy-load all below-fold sections
const ProblemSolutionSection = lazy(() => import("@/components/home/ProblemSolutionSection"));
const ServicePillars = lazy(() => import("@/components/home/ServicePillars"));
const ProcessSection = lazy(() => import("@/components/home/ProcessSection"));
const WhyAutronisSection = lazy(() => import("@/components/home/WhyAutronisSection"));
const ROIPreview = lazy(() => import("@/components/home/ROIPreview"));
const CaseStudiesPreview = lazy(() => import("@/components/home/CaseStudiesPreview"));
const SecurityBlock = lazy(() => import("@/components/home/SecurityBlock"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const FinalCTA = lazy(() => import("@/components/home/FinalCTA"));

const rotatingWords = ["groei", "processen", "systemen", "datastromen", "schaalbaarheid"];

const SectionFallback = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  useEffect(() => {
    // Delay first word rotation to reduce initial JS work and let LCP paint
    let interval: ReturnType<typeof setInterval> | undefined;
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
      }, 3500);
    }, 2000);
    return () => {
      clearTimeout(startDelay);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[75vh] sm:min-h-screen flex flex-col items-center justify-center pt-16 sm:pt-0" >
        <HeroBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-primary mb-4 tracking-widest uppercase">
              Systeemarchitectuur & Automatisering
            </p>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.35] tracking-tight mb-4 sm:mb-6">
              Breng structuur in je
              <br />
              <span className="inline-block relative h-[1.35em] align-bottom">
                {rotatingWords.map((word, i) => (
                  <span
                    key={word}
                    className="absolute left-0 w-full text-primary transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                    style={{
                      opacity: i === wordIndex ? 1 : 0,
                      transform: i === wordIndex ? "translateY(0) blur(0)" : "translateY(18px)",
                      filter: i === wordIndex ? "blur(0px)" : "blur(4px)",
                    }}
                  >
                    {word}.
                  </span>
                ))}
                {/* Invisible sizer for width */}
                <span className="invisible">{rotatingWords[wordIndex]}.</span>
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
              Wij transformeren processen tot slimme systemen die schaalbaar en beheersbaar blijven.
            </p>
            <div className="flex flex-col items-center mb-8 sm:mb-12">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-center gap-3 w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto mt-0">
                  <Link to="/book">
                    Plan een Automation Scan
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <div className="flex flex-col items-center">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => setVideoOpen(true)}>
                    <Play size={16} />
                    Bekijk 2 min demo
                  </Button>
                  <p className="text-[11px] italic text-muted-foreground mt-1.5 hidden sm:block">Zie hoe automatisering in de praktijk werkt in 2 minuten.</p>
                </div>
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

      <Suspense fallback={<SectionFallback />}>
        <ProblemSolutionSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ServicePillars />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProcessSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <WhyAutronisSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ROIPreview />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CaseStudiesPreview />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SecurityBlock />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FAQSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FinalCTA />
      </Suspense>
    </>
  );
};

export default Index;
