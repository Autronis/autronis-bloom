import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

const phases = [
  {
    step: "01",
    title: "Analyse & Prioritering",
    description:
      "Wij brengen uw processen, systemen en knelpunten in kaart. U ontvangt een geprioriteerd overzicht van de grootste verbetermogelijkheden.",
    deliverables: [
      "Proces- en systeemanalyse",
      "Knelpunten- en impactmatrix",
      "Geprioriteerde automatiseringskansen",
      "Verwachte ROI per automatisering",
    ],
  },
  {
    step: "02",
    title: "Architectuur & Blueprint",
    description:
      "We ontwerpen een schaalbare systeemarchitectuur met duidelijke integratiepunten, dataflows en verwachte impact.",
    deliverables: [
      "Systeemarchitectuur document",
      "Integratie- en dataflow diagrammen",
      "Technische specificaties",
      "Projectplanning met milestones",
    ],
  },
  {
    step: "03",
    title: "Bouw & Integratie",
    description:
      "De automatiseringen worden gebouwd en geïntegreerd met uw bestaande systemen. Iteratief, met tussentijdse validatie.",
    deliverables: [
      "Werkende automatiseringen",
      "API-koppelingen en integraties",
      "Tussentijdse demo's en validatie",
      "Voortgangsrapportage",
    ],
  },
  {
    step: "04",
    title: "Validatie & Overdracht",
    description:
      "Uitgebreid testen, documentatie en kennisoverdracht. U bent volledig eigenaar van het resultaat.",
    deliverables: [
      "Testresultaten en acceptatie",
      "Volledige technische documentatie",
      "Gebruikersinstructies",
      "Kennisoverdracht sessies",
    ],
  },
  {
    step: "05",
    title: "Monitoring & Optimalisatie",
    description:
      "Na go-live monitoren we prestaties en optimaliseren we continu. Uw systemen worden beter over tijd.",
    deliverables: [
      "Performance monitoring",
      "Proactieve optimalisaties",
      "Maandelijkse rapportages",
      "Doorlopende support",
    ],
  },
];

const Process = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Aanpak
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Van analyse tot livegang — gestructureerd en voorspelbaar.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Elk project volgt dezelfde bewezen methodiek. Van de eerste analyse tot
              continue optimalisatie — u weet precies wat u kunt verwachten.
            </p>
          </div>

          {/* Phases */}
          <div className="space-y-8 mb-20">
            {phases.map((phase) => (
              <div
                key={phase.step}
                className="rounded-xl border border-border bg-card p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(174_78%_41%/0.06)]"
              >
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                      {phase.step}
                    </span>
                    <h2 className="text-xl font-bold">{phase.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {phase.description}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                    Deliverables
                  </p>
                  <ul className="space-y-2">
                    {phase.deliverables.map((d) => (
                      <li
                        key={d}
                        className="text-sm text-foreground/80 flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">▸</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Security */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-16">
            <ShieldCheck size={16} className="text-primary" />
            <span>
              Beveiliging en datakwaliteit zijn geïntegreerd in elke fase — met minimale
              toegangsrechten, logging en volledige documentatie.
            </span>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Klaar om uw processen structureel te verbeteren?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Plan een vrijblijvende Automation Scan en ontdek waar de grootste impact
              ligt.
            </p>
            <Button asChild size="lg">
              <Link to="/book">
                Plan Automation Scan <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Process;
