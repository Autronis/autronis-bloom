import { Search, FileText, Wrench, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Analyse",
    description: "Wij brengen uw processen, tools en knelpunten in kaart tijdens een grondige automation scan.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Blueprint",
    description: "U ontvangt een helder automatiseringsplan met prioriteiten, verwachte ROI en een realistisch tijdspad.",
  },
  {
    icon: Wrench,
    step: "03",
    title: "Bouw & Integratie",
    description: "Wij bouwen de automatiseringen en integreren ze naadloos met uw bestaande systemen. Geen verstoringen, geen downtime.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Lancering & Optimalisatie",
    description: "Go-live met monitoring, continue optimalisatie en directe support. Wij laten u niet vallen na oplevering.",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Hoe we werken</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Van analyse tot resultaat in vier stappen
          </h2>
          <p className="text-muted-foreground">
            Een bewezen aanpak die complexiteit omzet in werkende, schaalbare automatisering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-border">
            <div className="absolute inset-0 circuit-line animate-data-pulse" />
          </div>

          {steps.map((s) => (
            <div key={s.step} className="relative text-center group">
              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-border bg-background mb-5 transition-all group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsl(174_78%_41%/0.15)]">
                <s.icon size={22} className="text-primary" />
              </div>
              <p className="text-xs font-semibold text-primary mb-1">{s.step}</p>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
