import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import { useState } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

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
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Aanpak
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hoe wij werken</h2>
            <p className="text-muted-foreground">
              Een gestructureerde aanpak van analyse tot optimalisatie. Geen losse
              automatiseringen, maar systemen die duurzaam en schaalbaar functioneren.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Desktop: horizontal with arrows */}
        <ScrollReveal className="hidden lg:flex items-start gap-2 mb-10" staggerChildren={0.08}>
          {phases.map((phase, index) => (
            <ScrollRevealItem key={phase.step} className="flex items-start flex-1">
              <div
                className={`rounded-xl border bg-card p-6 transition-all duration-300 cursor-pointer flex-1 ${
                  activePhase === index
                    ? "border-primary/60 shadow-[0_0_40px_hsl(174_78%_41%/0.15)] bg-primary/5"
                    : "border-border hover:border-primary/40 hover:shadow-[0_0_30px_hsl(174_78%_41%/0.1)]"
                }`}
                onMouseEnter={() => setActivePhase(index)}
                onMouseLeave={() => setActivePhase(null)}
              >
                <p className="text-xs font-bold text-primary mb-2">{phase.step}</p>
                <h3 className="font-semibold mb-2 text-sm">{phase.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </div>
              {index < phases.length - 1 && (
                <div className="flex items-center px-1 pt-10 shrink-0">
                  <ChevronRight
                    size={18}
                    className={`transition-colors duration-300 ${
                      activePhase === index ? "text-primary" : "text-muted-foreground/30"
                    }`}
                  />
                </div>
              )}
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        {/* Mobile: vertical cards */}
        <ScrollReveal className="lg:hidden space-y-4 mb-10" staggerChildren={0.08}>
          {phases.map((phase, index) => (
            <ScrollRevealItem key={phase.step}>
              <div
                className="rounded-xl border border-border bg-card p-6 transition-all duration-300 active:border-primary/40"
                onClick={() => setActivePhase(activePhase === index ? null : index)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-xs font-bold text-primary">{phase.step}</p>
                  <h3 className="font-semibold text-sm">{phase.title}</h3>
                  {index < phases.length - 1 && (
                    <ArrowRight size={14} className="ml-auto text-muted-foreground/30" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollReveal>

        {/* Security line */}
        <ScrollReveal>
          <ScrollRevealItem>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-8">
              <ShieldCheck size={14} className="text-primary" />
              <span>
                Beveiliging en datakwaliteit zijn geïntegreerd in elke fase — met minimale
                toegangsrechten, logging en volledige documentatie.
              </span>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>

        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Link
              to="/process"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              Bekijk ons volledige proces <ArrowRight size={14} />
            </Link>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProcessSection;
