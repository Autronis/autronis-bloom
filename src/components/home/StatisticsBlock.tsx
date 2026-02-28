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
    <section className="py-12 sm:py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6 sm:p-8 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(174_78%_41%/0.08)]"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4">
                <stat.icon size={20} />
              </div>
              {stat.value !== null ? (
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
              ) : (
                <p className="text-3xl sm:text-4xl font-bold text-primary mb-2">✓</p>
              )}
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsBlock;
