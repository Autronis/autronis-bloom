import { Blocks, Wrench, Users, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Blocks,
    title: "Geen standaard software",
    description: "Wij verkopen geen licenties of templates. Elke oplossing wordt op maat gebouwd voor uw specifieke processen en systemen.",
  },
  {
    icon: Wrench,
    title: "Geen losse tools",
    description: "Wij zijn geen tool-verkopers. Wij bouwen complete, geïntegreerde systemen die uw hele workflow verbinden — ongeacht welke tools u gebruikt.",
  },
  {
    icon: Users,
    title: "Direct met de bouwers",
    description: "Geen accountmanagers, geen tussenlagen. U werkt rechtstreeks met de engineers die uw systemen ontwerpen en bouwen.",
  },
  {
    icon: ShieldCheck,
    title: "Eigendom & transparantie",
    description: "Alles wat we bouwen is volledig uw eigendom. Inclusief documentatie, broncode en overdracht. Geen lock-in, geen verborgen kosten.",
  },
];

const WhyAutronisSection = () => {
  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Waarom Autronis</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Geen templates. Geen tool-verkopers. <span className="text-gradient">Complete systemen.</span>
          </h2>
          <p className="text-muted-foreground">
            Wij zijn uw automation partner — niet zomaar een leverancier.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-xl border border-border bg-card p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                <r.icon size={20} />
              </div>
              <h3 className="font-semibold mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAutronisSection;
