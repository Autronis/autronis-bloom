// Layout is provided by App.tsx
import ImpactSimulator from "@/components/impact/ImpactSimulator";
import SEOHead from "@/components/SEOHead";
import { Clock, CheckCircle, Users, TrendingUp, Shield, BarChart3, Calculator } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const factors = [
  {
    icon: Clock,
    title: "Reduction of manual hours",
    description: "Repetitive and time-intensive tasks are identified and automated where possible.",
    financial: "Freed-up time is converted into structural cost savings based on fully loaded labor costs.",
  },
  {
    icon: CheckCircle,
    title: "Reduction of errors and rework",
    description: "Error rates, rework, and duplicate entry within processes are analyzed.",
    financial: "The time and cost of corrections are translated into direct cost reduction.",
  },
  {
    icon: Users,
    title: "Reduction of external staffing",
    description: "We analyze where external capacity or temporary staffing can be structurally reduced.",
    financial: "Savings on external hires are included in the total business case.",
  },
  {
    icon: TrendingUp,
    title: "Capacity growth within existing teams",
    description: "Freed-up time is treated as available growth capacity within existing teams.",
    financial: "We calculate how much additional output is possible without increasing staffing costs.",
  },
  {
    icon: Shield,
    title: "Risk reduction and continuity",
    description: "Disruptions, dependencies, and operational risks are included in the analysis.",
    financial: "Potential costs of downtime and disruptions are factored into the impact calculation.",
  },
  {
    icon: BarChart3,
    title: "Better decision-making through real-time insight",
    description: "Real-time data and faster reporting improve process management.",
    financial: "More efficient decision-making translates into higher operational performance.",
  },
];

const ImpactROI = () => {
  return (
    <>
      <SEOHead
        title="Autronis | Impact & ROI — Calculate Your Automation Potential"
        description="Calculate the ROI of automation for your organization. Discover how much time and costs you can save with our impact calculator."
        path="/impact-roi"
      />
      {/* Impact Simulator */}
      <ImpactSimulator />

      {/* Methodology */}
      <section className="py-16 sm:py-24 border-t border-border relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-12">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Methodology
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                What our impact & ROI calculation is based on
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                The factors that determine how automation is translated into financial impact.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto mb-10 auto-rows-fr">
            {factors.map((factor, idx) => (
              <ScrollReveal key={factor.title} className="h-full">
                <ScrollRevealItem className="h-full">
                  <motion.div
                    className="rounded-xl border border-border bg-card p-5 flex flex-col h-full"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                    whileHover={{
                      scale: 1.015,
                      y: -2,
                      borderColor: "hsl(174, 78%, 41%, 0.5)",
                      transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] },
                    }}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <factor.icon size={18} />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground">{factor.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {factor.description}
                    </p>
                    <div className="flex items-start gap-2 mt-auto pt-3 border-t border-border/50">
                      <Calculator size={12} className="text-primary mt-[2px] shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="font-medium text-foreground">Calculation:</span>{" "}
                        {factor.financial}
                      </p>
                    </div>
                  </motion.div>
                </ScrollRevealItem>
              </ScrollReveal>
            ))}
          </div>

          {/* Transparency block */}
          <ScrollReveal className="max-w-5xl mx-auto">
            <ScrollRevealItem>
              <div className="rounded-xl border border-border/50 bg-card/50 p-6">
                <p className="text-sm font-medium text-foreground mb-4">
                  Our calculations are based on:
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-2.5">
                  {[
                    "No black-box calculations",
                    "No assumptions without evidence",
                    "Transparent calculation rules",
                    "Traceable to your own figures",
                  ].map((item) => (
                    <span key={item} className="flex items-center gap-2 text-xs text-muted-foreground tracking-wide">
                      <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-8 leading-relaxed max-w-2xl mx-auto">
                During the impact analysis, we translate these factors into a complete business case with payback period, structural savings, and ROI.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default ImpactROI;
