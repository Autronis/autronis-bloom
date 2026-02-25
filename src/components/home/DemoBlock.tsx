import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const DemoBlock = () => {
  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Demo</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Zie automatisering in actie
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              In twee minuten laten we zien hoe een volledig geautomatiseerde workflow eruitziet — van trigger tot resultaat.
            </p>
            <Button asChild size="lg">
              <Link to="/demo">
                <Play size={16} />
                Bekijk de tour
              </Link>
            </Button>
          </div>

          {/* Video placeholder */}
          <div className="relative aspect-video rounded-xl border border-border bg-card overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center transition-all group-hover:bg-primary/30 group-hover:scale-110">
                <Play size={28} className="text-primary ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
              2:00 — Automation in actie
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoBlock;
