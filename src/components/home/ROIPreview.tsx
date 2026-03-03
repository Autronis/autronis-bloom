import { ArrowRight, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

const ROIPreview = () => {
  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      <AmbientLight />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
          <ScrollRevealItem>
            <Badge variant="outline" className="mb-4 text-primary border-transparent bg-primary/10">
              Impact & ROI
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Financiële impact inzichtelijk gemaakt
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Automatisering is geen kostenpost, maar een rendementsbeslissing. Elke implementatie wordt onderbouwd met een impact- en ROI-analyse.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal>
          <ScrollRevealItem>
            <div className="max-w-2xl mx-auto">
              <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
                <p className="text-sm font-medium text-muted-foreground mb-5">
                  Indicatieve impact bij een gemiddeld MKB-team
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Repetitieve taken</span>
                    <span className="text-sm font-medium text-foreground">40 uur / week</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Gemiddelde kostprijs</span>
                    <span className="text-sm font-medium text-foreground">€55 / uur</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-sm text-muted-foreground">Automatiseringsgraad</span>
                    <span className="text-sm font-medium text-foreground">65%</span>
                  </div>
                </div>

                <motion.div
                  className="rounded-lg border border-primary/30 bg-primary/[0.04] p-5 text-center mb-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-xs text-muted-foreground mb-1">Structurele jaarlijkse kostenreductie</p>
                  <p className="text-4xl sm:text-5xl font-bold text-primary">€74.000</p>
                </motion.div>

                <p className="text-xs text-muted-foreground mb-6 leading-relaxed italic flex items-start gap-1.5">
                  <AlertTriangle size={13} className="text-primary shrink-0 mt-0.5 not-italic" /> Deze berekening is indicatief. Tijdens de analysefase wordt een volledige businesscase opgesteld inclusief risico- en impactanalyse.
                </p>

                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/impact-roi#roi-scan">
                    Bekijk uw persoonlijke impactanalyse
                    <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ROIPreview;
