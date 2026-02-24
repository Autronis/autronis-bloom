import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import DomainsSection from "@/components/home/DomainsSection";
import ProcessSection from "@/components/home/ProcessSection";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import DemoBlock from "@/components/home/DemoBlock";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import MetamorphosisAnimation from "@/components/home/MetamorphosisAnimation";
import AuroraBackground from "@/components/home/AuroraBackground";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import teamPhoto from "@/assets/autronis_team_foto.png";

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <AuroraBackground />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 flex-1 flex items-center pb-32 sm:pb-28">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary mb-4 tracking-widest uppercase">Gedreven door technologie. Gebouwd voor transformatie.</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              Stop met handmatig werk.{" "}
              <span className="text-gradient">Start met schalen.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
              Wij bouwen AI-gedreven automatiseringen die uw processen versnellen, fouten elimineren en uw team laten focussen op wat écht telt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link to="/book">
                  Plan Automation Scan
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/demo">
                  <Play size={16} />
                  Bekijk 2-min demo
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex flex-shrink-0">
            <div className="relative w-72 h-72 xl:w-80 xl:h-80 rounded-2xl overflow-hidden border border-border/50">
              <img src={teamPhoto} alt="Autronis team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>
          </div>
          </div>
        </div>

        {/* Proof strip with metamorphosis animation */}
        <div className="border-t border-border bg-background/80 backdrop-blur-sm mt-auto relative overflow-hidden">
          {/* Background metamorphosis animation - subtle, full width */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
            <div className="scale-[2.5] sm:scale-[3] lg:scale-[4]">
              <MetamorphosisAnimation />
            </div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 py-6 sm:py-8 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
              <div className="flex gap-6 sm:gap-10 items-center">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    <AnimatedCounter target={500} suffix="+" />
                  </p>
                  <p className="text-xs text-muted-foreground">Uur bespaard</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    <AnimatedCounter target={50} suffix="+" />
                  </p>
                  <p className="text-xs text-muted-foreground">Automatiseringen</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-primary">
                    <AnimatedCounter target={98} suffix="%" />
                  </p>
                  <p className="text-xs text-muted-foreground">Klanttevredenheid</p>
                </div>
              </div>
              <div className="hidden md:flex gap-6 items-center opacity-30">
                {["Client A", "Client B", "Client C", "Client D"].map((name) => (
                  <div key={name} className="h-6 w-20 bg-muted-foreground/20 rounded" title={name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <DomainsSection />
      <ProcessSection />
      <CaseStudiesPreview />
      <DemoBlock />
      <FAQSection />
      <FinalCTA />
    </Layout>
  );
};

export default Index;
