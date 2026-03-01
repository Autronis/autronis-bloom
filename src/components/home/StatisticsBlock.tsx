import AnimatedCounter from "@/components/home/AnimatedCounter";
import { Workflow, Clock, Building2 } from "lucide-react";

const stats = [
  {
    icon: Workflow,
    value: 50,
    suffix: "+",
    label: "Workflows geïmplementeerd",
  },
  {
    icon: Clock,
    value: 500,
    suffix: "+",
    label: "Uur aan handmatig werk geautomatiseerd",
  },
  {
    icon: Building2,
    value: null,
    suffix: "",
    label: "Projecten voor groeiende MKB-bedrijven",
  },
];

const StatisticsBlock = () => {
  return (
    <section className="py-8 sm:py-12 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-card p-4 sm:p-5 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_20px_hsl(174_78%_41%/0.06)]"
            >
              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                <stat.icon size={16} />
              </div>
              {stat.value !== null ? (
                <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
              ) : (
                <p className="text-2xl sm:text-3xl font-bold text-primary mb-1">✓</p>
              )}
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsBlock;
