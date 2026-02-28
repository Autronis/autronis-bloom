import { Link } from "react-router-dom";
import { ArrowRight, Cog, Link2, PieChart } from "lucide-react";

const pillars = [
  {
    icon: Cog,
    title: "Process Automation",
    description:
      "Terugkerende processen worden geautomatiseerd zodat uw team zich focust op werk dat er toe doet. Van goedkeuringsflows tot volledige order pipelines.",
  },
  {
    icon: Link2,
    title: "System Integrations",
    description:
      "Uw CRM, boekhouding, operations en maatwerksystemen gekoppeld via API's. Data stroomt automatisch en consistent — zonder handmatige tussenstappen.",
  },
  {
    icon: PieChart,
    title: "Data & Reporting",
    description:
      "Realtime dashboards en geautomatiseerde rapportages. Altijd actueel inzicht in prestaties, knelpunten en kansen — zonder handmatig werk.",
  },
];

const ServicePillars = () => {
  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Drie pijlers. Één geïntegreerd systeem.
          </h2>
          <p className="text-muted-foreground">
            Wij combineren procesautomatisering, systeemintegraties en data-inzichten tot
            een schaalbare architectuur.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(174_78%_41%/0.08)]"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <p.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/services"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            Bekijk onze services <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicePillars;
