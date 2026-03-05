import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import HeroBackground from "@/components/home/HeroBackground";
import StatisticsBlock from "@/components/home/StatisticsBlock";
import { AnimatePresence, motion } from "framer-motion";

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

// Preload all lazy sections after initial render so they're ready before scrolling
const preloadSections = () => {
  import("@/components/home/ProblemSolutionSection");
  import("@/components/home/ServicePillars");
  import("@/components/home/ProcessSection");
  import("@/components/home/WhyAutronisSection");
  import("@/components/home/ROIPreview");
  import("@/components/home/CaseStudiesPreview");
  import("@/components/home/SecurityBlock");
  import("@/components/home/FAQSection");
  import("@/components/home/FinalCTA");
};

const rotatingWords = ["groei", "processen", "systemen", "datastromen", "schaalbaarheid"];

const SectionFallback = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [showSkip, setShowSkip] = useState(true);
  const [mobileControlsActive, setMobileControlsActive] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleViewportChange = () => setIsMobileViewport(window.innerWidth < 768);

    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);

    // Preload all sections shortly after hero renders
    const preloadTimer = setTimeout(preloadSections, 1000);

    // Delay first word rotation to reduce initial JS work and let LCP paint
    let interval: ReturnType<typeof setInterval> | undefined;
    const startDelay = setTimeout(() => {
      interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
      }, 3500);
    }, 2000);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
      clearTimeout(preloadTimer);
      clearTimeout(startDelay);
      if (interval) clearInterval(interval);
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, []);

  const bumpSkipAboveControls = () => {
    if (!isMobileViewport) return;
    setMobileControlsActive(true);

    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => {
      setMobileControlsActive(false);
    }, 2200);
  };

  return (
    <>
      {/* Hero */}
      <section className="hero-section relative min-h-[75vh] sm:min-h-screen flex flex-col items-center justify-center pt-16 sm:pt-0" >
        <HeroBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-primary mb-4 tracking-widest uppercase">
              Systeemarchitectuur & Automatisering
            </p>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.35] tracking-tight mb-4 sm:mb-6">
              Breng structuur in je
              <br />
              <span className="relative inline-block min-w-[14ch] align-bottom" style={{ height: "1.25em" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    className="absolute left-0 right-0 bottom-0 text-center text-primary"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {rotatingWords[wordIndex]}.
                  </motion.span>
                </AnimatePresence>
                {/* Invisible sizer for width */}
                <span className="invisible">schaalbaarheid.</span>
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
            <Dialog
              open={videoOpen}
              onOpenChange={(open) => {
                setVideoOpen(open);
                setMobileControlsActive(false);
                if (open) setShowSkip(true);
              }}
            >
              <DialogContent className="sm:max-w-4xl p-0 bg-card border-border overflow-hidden" aria-describedby={undefined}>
                <DialogTitle className="sr-only">Lead-systeem Demo Jobby</DialogTitle>
                <div className="p-4 pb-0 flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-primary tracking-widest uppercase">Lead-systeem Demo Jobby</p>
                </div>
                <div className="relative m-4 mt-2 rounded-lg overflow-hidden border border-border bg-black">
                  {videoOpen && (
                    <>
                      <video
                        ref={videoRef}
                        src="https://www.autronis.nl/videos/videodemo.mp4"
                        className="w-full aspect-video block"
                        autoPlay
                        controls
                        controlsList="nodownload noplaybackrate"
                        disablePictureInPicture
                        onTouchStart={bumpSkipAboveControls}
                        onClick={bumpSkipAboveControls}
                        onPlay={bumpSkipAboveControls}
                        onTimeUpdate={(e) => {
                          if (e.currentTarget.currentTime >= 10) setShowSkip(false);
                        }}
                      />
                      {showSkip && (
                        <button
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = 10;
                              setShowSkip(false);
                            }
                          }}
                          className={`absolute left-3 px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-xl border border-white/15 text-sm font-medium text-foreground hover:bg-white/15 transition-all duration-300 shadow-2xl sm:bottom-20 ${
                            mobileControlsActive ? "bottom-24" : "bottom-10"
                          }`}
                        >
                          Skip intro →
                        </button>
                      )}
                    </>
                  )}
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
