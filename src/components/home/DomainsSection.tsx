import { Link } from "react-router-dom";
import { TrendingUp, Settings, Headphones, Calculator, BarChart3, UserPlus } from "lucide-react";

const domains = [
  {
    icon: TrendingUp,
    title: "Sales & Marketing",
    description: "Automatiseer leadgeneratie, follow-ups en campagnebeheer. Meer deals, minder handwerk.",
  },
  {
    icon: Settings,
    title: "Operations",
    description: "Stroomlijn workflows, goedkeuringsprocessen en interne communicatie met slimme automatisering.",
  },
  {
    icon: Headphones,
    title: "Klantenservice",
    description: "AI-chatbots, ticket routing en slimme escalatie voor snellere responstijden.",
  },
  {
    icon: Calculator,
    title: "Finance & Backoffice",
    description: "Factuurverwerking, reconciliatie en rapportage — foutloos en op autopilot.",
  },
  {
    icon: BarChart3,
    title: "Data & Rapportage",
    description: "Real-time dashboards, geautomatiseerde rapportages en datavalidatie zonder spreadsheets.",
  },
  {
    icon: UserPlus,
    title: "Onboarding",
    description: "Klant- en medewerker-onboarding volledig geautomatiseerd met persoonlijke flows.",
  },
];

const DomainsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Wat we automatiseren</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Elk proces. Elke afdeling. Volledig geautomatiseerd.
          </h2>
          <p className="text-muted-foreground">
            Van sales tot finance — wij identificeren en automatiseren de processen die uw groei remmen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {domains.map((domain) => (
            <Link
              key={domain.title}
              to="/services"
              className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(174_78%_41%/0.08)]"
            >
              <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <domain.icon size={22} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{domain.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{domain.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DomainsSection;
