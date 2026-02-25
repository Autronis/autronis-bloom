import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import DomainsSection from "@/components/home/DomainsSection";
import ProcessSection from "@/components/home/ProcessSection";
import WhyAutronisSection from "@/components/home/WhyAutronisSection";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import DemoBlock from "@/components/home/DemoBlock";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import MetamorphosisAnimation from "@/components/home/MetamorphosisAnimation";

import AnimatedCounter from "@/components/home/AnimatedCounter";
import teamPhoto from "@/assets/autronis_foto_samen.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] sm:min-h-screen flex flex-col overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex-1 flex flex-col justify-center pb-16 sm:pb-28">
          <div className="flex flex-row items-center gap-4 sm:gap-8 lg:gap-16 w-full">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary mb-4 tracking-widest uppercase">Automation & AI agency voor MKB</p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 sm:mb-6">
                Stop met handmatig werk.{" "}
                <span className="text-gradient">Start met schaalbare systemen.</span>
              </h1>
              <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mb-6 sm:mb-8 leading-relaxed">
                Wij bouwen automatiseringen en AI-systemen die processen versnellen, fouten elimineren en bedrijven laten groeien — zonder extra personeel.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button asChild size="lg">
                  <Link to="/book">
                    Plan Automation Scan
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/demo">
                    <Play size={16} />
                    Bekijk demo
                  </Link>
                </Button>
              </div>
            </div>

            {/* Team photo - always beside text */}
            <div className="flex-shrink-0 self-center">
              <div className="relative w-28 h-36 sm:w-44 sm:h-56 lg:w-64 lg:h-80 xl:w-72 xl:h-[24rem] rounded-2xl overflow-hidden">
                <img src={teamPhoto} alt="Autronis team" className="w-full h-full object-cover object-[center_10%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 dark:from-background via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/20 dark:from-background/40 via-transparent to-transparent" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
              </div>
            </div>
          </div>

          {/* Metamorphosis animation */}
          <div className="mt-4 sm:mt-8 w-full flex items-center justify-center opacity-[0.30] pointer-events-none">
            <MetamorphosisAnimation />
          </div>
        </div>

        {/* Proof strip */}
        <div className="border-t border-border bg-background/80 backdrop-blur-sm mt-auto relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 py-5 sm:py-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
              <div className="flex gap-6 sm:gap-10 items-center">
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-primary">
                    <AnimatedCounter target={50} suffix="+" />
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Automatiseringen gebouwd</p>
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-primary">
                    <AnimatedCounter target={500} suffix="+" />
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Uur bespaard</p>
                </div>
                <div>
                  <p className="text-lg sm:text-2xl font-bold text-primary">
                    <AnimatedCounter target={98} suffix="%" />
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">Klanttevredenheid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DomainsSection />
      <ProcessSection />
      <WhyAutronisSection />
      <CaseStudiesPreview />
      <DemoBlock />
      <FAQSection />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
