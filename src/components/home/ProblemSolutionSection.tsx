import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Users, BarChart3, Cog, Link2, PieChart } from "lucide-react";

const problems = [
  {
    icon: Layers,
    title: "Gefragmenteerde systemen",
    description:
      "Afdelingen werken in losse tools zonder centrale datastroom. Informatie wordt handmatig overgezet tussen CRM, finance, operations en spreadsheets.",
  },
  {
    icon: Users,
    title: "Handmatige afhankelijkheid",
    description:
      "Belangrijke workflows zijn afhankelijk van menselijke tussenstappen. Naarmate volume groeit, groeit ook het handwerk — en daarmee de personeelsdruk.",
  },
  {
    icon: BarChart3,
    title: "Gebrek aan realtime inzicht",
    description:
      "Rapportages zijn achteraf in plaats van actueel, waardoor bijsturen te laat gebeurt.",
  },
];

const solutions = [
  {
    icon: Cog,
    title: "Process Automation",
    description:
      "Terugkerende taken worden geautomatiseerd zodat processen zelfstandig verlopen.",
  },
  {
    icon: Link2,
    title: "System Integrations",
    description:
      "Systemen worden gekoppeld via API's zodat data automatisch en consistent stroomt.",
  },
  {
    icon: PieChart,
    title: "Data & Reporting",
    description:
      "Realtime dashboards geven direct inzicht in prestaties en knelpunten.",
  },
];

const ProblemSolutionSection = () => {
  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        {/* PROBLEEM */}
        <div className="mb-16 sm:mb-24">
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
            Probleem
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 max-w-2xl">
            Het probleem is niet "te weinig capaciteit".
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Veel groeiende organisaties denken dat ze meer mensen nodig hebben om bij te
            blijven. In werkelijkheid ontstaan vertragingen doordat processen versnipperd
            zijn en systemen niet goed samenwerken.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {problems.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20"
              >
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive mb-4">
                  <p.icon size={20} />
                </div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* OPLOSSING */}
        <div>
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
            Oplossing
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 max-w-2xl">
            Structuur vóór capaciteit.
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Wanneer systemen geïntegreerd zijn en processen logisch zijn ingericht, groeit
            de organisatie zonder dat de personeelsdruk meegroeit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {solutions.map((s) => (
              <div
                key={s.title}
                className="rounded-xl border border-primary/20 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(174_78%_41%/0.08)]"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <s.icon size={20} />
                </div>
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/book">
                Plan een Automation Scan
                <ArrowRight size={18} />
              </Link>
            </Button>
            <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs text-muted-foreground">
              <span>30 min intake</span>
              <span>Concrete optimalisaties</span>
              <span>Inzicht in verwachte impact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
