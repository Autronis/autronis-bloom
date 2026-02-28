import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

const phases = [
  {
    step: "01",
    title: "Analyse & Prioritering",
    description:
      "Wij brengen uw processen, systemen en knelpunten in kaart. U ontvangt een geprioriteerd overzicht van de grootste verbetermogelijkheden.",
  },
  {
    step: "02",
    title: "Architectuur & Blueprint",
    description:
      "We ontwerpen een schaalbare systeemarchitectuur met duidelijke integratiepunten, dataflows en verwachte impact per automatisering.",
  },
  {
    step: "03",
    title: "Bouw & Integratie",
    description:
      "De automatiseringen worden gebouwd en geïntegreerd met uw bestaande systemen. Iteratief, met tussentijdse validatie.",
  },
  {
    step: "04",
    title: "Validatie & Overdracht",
    description:
      "Uitgebreid testen, documentatie en kennisoverdracht. U bent volledig eigenaar van het resultaat.",
  },
  {
    step: "05",
    title: "Monitoring & Optimalisatie",
    description:
      "Na go-live monitoren we prestaties en optimaliseren we continu. Uw systemen worden beter over tijd.",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
            Aanpak
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hoe wij werken</h2>
          <p className="text-muted-foreground">
            Een gestructureerde aanpak van analyse tot optimalisatie. Geen losse
            automatiseringen, maar systemen die duurzaam en schaalbaar functioneren.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {phases.map((phase) => (
            <div
              key={phase.step}
              className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_hsl(174_78%_41%/0.1)] group"
            >
              <p className="text-xs font-bold text-primary mb-2">{phase.step}</p>
              <h3 className="font-semibold mb-2 text-sm">{phase.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        {/* Security line */}
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-8">
          <ShieldCheck size={14} className="text-primary" />
          <span>
            Beveiliging en datakwaliteit zijn geïntegreerd in elke fase — met minimale
            toegangsrechten, logging en volledige documentatie.
          </span>
        </div>

        <div className="text-center">
          <Link
            to="/process"
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            Bekijk ons volledige proces <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
