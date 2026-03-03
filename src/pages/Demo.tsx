import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";


const Demo = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Demo</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Zie automatisering in actie</h1>
            <p className="text-lg text-muted-foreground">
              Bekijk in twee minuten hoe een volledig geautomatiseerde workflow werkt — van trigger tot resultaat.
            </p>
          </div>

          {/* Video placeholder */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative aspect-video rounded-xl border border-border bg-card overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center transition-all group-hover:bg-primary/30 group-hover:scale-110">
                  <Play size={36} className="text-primary ml-1" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                2:00 — Automation in actie
              </div>
            </div>
          </div>

          {/* Interactive tour placeholder */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-12">
              <h2 className="text-xl font-semibold mb-2">Interactieve tour</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Binnenkort kunt u hier zelf door een automatisering klikken en elke stap ervaren.
              </p>
              <p className="text-xs text-muted-foreground mb-8">Coming soon</p>
            </div>

            <div className="mt-12">
              <p className="text-muted-foreground mb-4">Overtuigd? Laten we kijken wat we voor u kunnen automatiseren.</p>
              <Button asChild size="lg">
                <Link to="/book">Plan Automation Scan <ArrowRight size={18} /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Demo;
