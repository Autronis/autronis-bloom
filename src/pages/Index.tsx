import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dialog = lazy(() => import("@/components/ui/dialog").then(m => ({ default: m.Dialog })));
const DialogContent = lazy(() => import("@/components/ui/dialog").then(m => ({ default: m.DialogContent })));
const DialogTitle = lazy(() => import("@/components/ui/dialog").then(m => ({ default: m.DialogTitle })));
const HeroBackground = lazy(() => import("@/components/home/HeroBackground"));
import StatisticsBlock from "@/components/home/StatisticsBlock";
import { AnimatePresence, motion } from "framer-motion";
import SEOHead, { organizationSchema, websiteSchema } from "@/components/SEOHead";
import { useLanguage } from "@/i18n/context";
import GlowCTA from "@/components/GlowCTA";

const ProblemSolutionSection = lazy(() => import("@/components/home/ProblemSolutionSection"));
const ServicePillars = lazy(() => import("@/components/home/ServicePillars"));
const ProcessSection = lazy(() => import("@/components/home/ProcessSection"));
const WhyAutronisSection = lazy(() => import("@/components/home/WhyAutronisSection"));
const ROIPreview = lazy(() => import("@/components/home/ROIPreview"));
const CaseStudiesPreview = lazy(() => import("@/components/home/CaseStudiesPreview"));
const SecurityBlock = lazy(() => import("@/components/home/SecurityBlock"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const FinalCTA = lazy(() => import("@/components/home/FinalCTA"));
const LiveAutomationPreview = lazy(() => import("@/components/home/LiveAutomationPreview"));

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

const text = {
  en: {
    rotatingWords: ["growth", "processes", "systems", "data flows", "scalability"],
    tagline: "System Architecture & Automation",
    heroTitle1: "Bring structure to your",
    heroDesc: "We transform processes into smart systems that remain scalable and manageable.",
    cta: "Schedule an Automation Scan",
    watchDemo: "Watch 2 min demo",
    watchDemoSub: "See how automation works in practice in 2 min.",
    skipIntro: "Skip intro →",
    demoTitle: "Lead System Demo Jobby",
    seoTitle: "Autronis | AI Automation & Workflow Automation for Growing Businesses",
    seoDesc: "Autronis automates processes, integrates systems and builds real-time data insights. Scalable architecture for growing businesses.",
  },
  nl: {
    rotatingWords: ["groei", "processen", "systemen", "datastromen", "schaalbaarheid"],
    tagline: "Systeemarchitectuur & Automatisering",
    heroTitle1: "Breng structuur in je",
    heroDesc: "Wij transformeren processen naar slimme systemen die schaalbaar en beheersbaar blijven.",
    cta: "Plan een Automation Scan",
    watchDemo: "Bekijk 2 min demo",
    watchDemoSub: "Zie hoe automatisering werkt in de praktijk in 2 min.",
    skipIntro: "Intro overslaan →",
    demoTitle: "Lead Systeem Demo Jobby",
    seoTitle: "Autronis | AI Automatisering & Workflow Automatisering voor Groeiende Bedrijven",
    seoDesc: "Autronis automatiseert processen, integreert systemen en bouwt realtime data-inzichten. Schaalbare architectuur voor groeiende bedrijven.",
  },
};

const SectionFallback = () => (
  <div className="py-20 px-4">
    <div className="max-w-3xl mx-auto animate-pulse space-y-4">
      <div className="h-3 w-24 bg-muted rounded-full mx-auto" />
      <div className="h-6 w-72 bg-muted rounded-full mx-auto" />
      <div className="h-3 w-96 max-w-full bg-muted/60 rounded-full mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="h-32 bg-muted/40 rounded-xl" />
        <div className="h-32 bg-muted/40 rounded-xl" />
        <div className="h-32 bg-muted/40 rounded-xl" />
      </div>
    </div>
  </div>
);

const Index = () => {
  const lang = useLanguage();
  const t = text[lang];
  const rotatingWords = t.rotatingWords;

  const [wordIndex, setWordIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [showSkip, setShowSkip] = useState(true);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleViewportChange = () => setIsMobileViewport(window.innerWidth < 768);
    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);

    const isDesktop = window.innerWidth >= 768;
    const preloadTimer = setTimeout(preloadSections, isDesktop ? 500 : 3000);

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
    };
  }, []);


  return (
    <>
      <SEOHead
        title={t.seoTitle}
        description={t.seoDesc}
        path="/"
        jsonLd={[organizationSchema, websiteSchema, {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Autronis — System Architecture & Automation",
          description: t.seoDesc,
          url: "https://autronis.com/",
          publisher: { "@type": "Organization", name: "Autronis" },
        }]}
      />
      <section className="hero-section relative min-h-[75vh] sm:min-h-[85vh] flex flex-col items-center justify-center pt-20 sm:pt-28">
        <Suspense fallback={null}><HeroBackground /></Suspense>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold text-primary mb-4 tracking-widest uppercase">{t.tagline}</p>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.35] tracking-tight mb-4 sm:mb-6">
              {t.heroTitle1}
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
                <span className="invisible">{lang === "nl" ? "schaalbaarheid." : "scalability."}</span>
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">{t.heroDesc}</p>
            <div className="flex flex-col items-center mb-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-center gap-3 w-full sm:w-auto">
                <GlowCTA to="/book">{t.cta}</GlowCTA>
                <div className="flex flex-col items-center">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => setVideoOpen(true)}>
                    <Play size={16} />{t.watchDemo}
                  </Button>
                  <p className="text-[11px] italic text-muted-foreground mt-1.5">{t.watchDemoSub}</p>
                </div>
              </div>
            </div>

            <Suspense fallback={null}><Dialog
              open={videoOpen}
              onOpenChange={(open) => {
                if (!open && videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
                setVideoOpen(open);
                setShowSkip(true);
              }}
            >
              <DialogContent className="sm:max-w-4xl p-0 bg-card border-border overflow-hidden" aria-describedby={undefined}>
                <DialogTitle className="sr-only">{t.demoTitle}</DialogTitle>
                <div className="p-4 pb-0 flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-primary tracking-widest uppercase">{t.demoTitle}</p>
                </div>
                <div className="relative m-4 mt-2 rounded-lg overflow-hidden border border-border bg-black">
                  {videoOpen && (
                    <>
                      <video
                        ref={videoRef}
                        className="w-full aspect-video block"
                        autoPlay controls playsInline preload="metadata"
                        controlsList="nodownload noplaybackrate" disablePictureInPicture
                        onTimeUpdate={(e) => { if (e.currentTarget.currentTime >= 10) setShowSkip(false); }}
                      >
                        <source src="https://qmtnmisdmchydrriuont.supabase.co/storage/v1/object/public/Jobby%20lead%20systeem/demo.mp4" type="video/mp4" />
                      </video>
                      {showSkip && (
                        <button
                          onClick={() => { if (videoRef.current) { videoRef.current.currentTime = 10; setShowSkip(false); } }}
                          className="absolute left-3 bottom-14 sm:bottom-20 px-5 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-primary/40 text-sm font-semibold text-white hover:bg-primary/30 hover:border-primary transition-all duration-300 shadow-2xl"
                        >
                          {t.skipIntro}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </DialogContent>
            </Dialog></Suspense>

            <StatisticsBlock />
          </div>

          {/* Live Preview — below hero, centered */}
          <div className="max-w-md mx-auto mt-8 sm:mt-10 mb-8 sm:mb-12">
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase text-center">Live Preview</p>
            <Suspense fallback={<SectionFallback />}><LiveAutomationPreview embedded /></Suspense>
          </div>

        </div>
      </section>

      <Suspense fallback={<SectionFallback />}><ProblemSolutionSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><ServicePillars /></Suspense>
      <Suspense fallback={<SectionFallback />}><ProcessSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><WhyAutronisSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><ROIPreview /></Suspense>
      <Suspense fallback={<SectionFallback />}><CaseStudiesPreview /></Suspense>
      <Suspense fallback={<SectionFallback />}><SecurityBlock /></Suspense>
      <Suspense fallback={<SectionFallback />}><FAQSection /></Suspense>
      <Suspense fallback={<SectionFallback />}><FinalCTA /></Suspense>
    </>
  );
};

export default Index;
