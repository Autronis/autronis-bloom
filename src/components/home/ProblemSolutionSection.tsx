import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Users, BarChart3, Cog, Link2, PieChart } from "lucide-react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

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
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Probleem
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Het probleem is niet "te weinig capaciteit".
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Veel groeiende organisaties denken dat ze meer mensen nodig hebben om bij te
                blijven. In werkelijkheid ontstaan vertragingen doordat processen versnipperd
                zijn en systemen niet goed samenwerken.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {problems.map((p) => (
              <ScrollRevealItem key={p.title}>
                <div className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive mb-4">
                    <p.icon size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>
        </div>

        {/* OPLOSSING */}
        <div>
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Oplossing
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Structuur vóór capaciteit.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Wanneer systemen geïntegreerd zijn en processen logisch zijn ingericht, groeit
                de organisatie zonder dat de personeelsdruk meegroeit.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {solutions.map((s) => (
              <ScrollRevealItem key={s.title}>
                <div className="rounded-xl border border-primary/20 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(174_78%_41%/0.08)]">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <s.icon size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal className="text-center">
            <ScrollRevealItem>
              <Button asChild size="lg">
                <Link to="/book">
                  Plan een Automation Scan
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  30 min intake
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Concrete optimalisaties
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Inzicht in verwachte impact
                </span>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
