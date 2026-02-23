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

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-full circuit-line animate-data-pulse" />
          <div className="absolute top-1/2 left-0 w-full circuit-line animate-data-pulse [animation-delay:1s]" />
          <div className="absolute top-3/4 left-0 w-full circuit-line animate-data-pulse [animation-delay:2s]" />
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-primary/5 blur-[80px]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
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
        </div>

        {/* Proof strip */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="flex gap-10 items-center">
                <div>
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-xs text-muted-foreground">Uur bespaard</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-xs text-muted-foreground">Automatiseringen</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-xs text-muted-foreground">Klanttevredenheid</p>
                </div>
              </div>
              <div className="flex gap-6 items-center opacity-30">
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
