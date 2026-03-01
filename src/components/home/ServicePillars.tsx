import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";
import serviceAutomation from "@/assets/service_automation.png";
import serviceIntegration from "@/assets/service_integration.png";
import serviceData from "@/assets/service_data.png";

const services = [
  {
    title: "Process Automation",
    intro: "Terugkerende processen worden geautomatiseerd zodat uw team zich focust op werk dat ertoe doet.",
    bullets: [
      "Goedkeuringsflows en notificaties",
      "Order- en facturatiepipelines",
      "Onboarding- en offboardingprocessen",
      "Taakroutering en escalaties",
    ],
    image: serviceAutomation,
  },
  {
    title: "System Integrations",
    intro: "Uw CRM, boekhouding, operations en maatwerksystemen gekoppeld via API's.",
    bullets: [
      "Bi-directionele datasynchronisatie",
      "API-koppelingen met CRM, ERP en finance",
      "Webhook-gebaseerde event triggers",
      "Foutafhandeling en retry-logica",
    ],
    image: serviceIntegration,
  },
  {
    title: "Data & Reporting",
    intro: "Realtime dashboards en geautomatiseerde rapportages — altijd actueel inzicht.",
    bullets: [
      "Geconsolideerde data uit meerdere bronnen",
      "Realtime KPI-dashboards",
      "Geautomatiseerde wekelijkse rapportages",
      "Anomaly detection en alerts",
    ],
    image: serviceData,
  },
];

const ServicePillars = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
          <ScrollRevealItem>
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
          </ScrollRevealItem>
        </ScrollReveal>

        <div className="space-y-8 sm:space-y-12 mb-12">
          {services.map((s, i) => {
            const isEven = i % 2 === 0;
            return (
              <ScrollReveal key={s.title}>
                <ScrollRevealItem>
                  <GlowCard
                    className="rounded-xl border border-border bg-card"
                    isAnyHovered={hoveredIndex !== null}
                    isHovered={hoveredIndex === i}
                    onHover={() => setHoveredIndex(i)}
                    onLeave={() => setHoveredIndex(null)}
                  >
                    <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-6 sm:gap-8`}>
                      {/* Text */}
                      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2">{s.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{s.intro}</p>
                        <ul className="space-y-2">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Image */}
                      <div className="flex-1 min-h-[220px] sm:min-h-[280px]">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover rounded-b-xl md:rounded-b-none transition-transform duration-300"
                          style={{
                            borderTopRightRadius: isEven ? "0.75rem" : undefined,
                            borderBottomRightRadius: isEven ? "0.75rem" : undefined,
                            borderTopLeftRadius: !isEven ? "0.75rem" : undefined,
                            borderBottomLeftRadius: !isEven ? "0.75rem" : undefined,
                            transform: hoveredIndex === i ? "scale(1.02)" : "scale(1)",
                          }}
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </GlowCard>
                </ScrollRevealItem>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="text-center">
          <ScrollRevealItem>
            <Button asChild size="lg">
              <Link to="/services">
                Bekijk onze services
                <ArrowRight size={18} />
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Ontdek hoe wij uw processen, systemen en data-inzichten structureel verbeteren.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ServicePillars;
