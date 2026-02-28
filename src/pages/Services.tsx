import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ToolStackBlock from "@/components/home/ToolStackBlock";

const categories = [
  {
    title: "Revenue & Sales Automation",
    services: [
      {
        title: "Sales & Marketing Automatisering",
        description: "Lead scoring, follow-up sequences, CRM-synchronisatie en pipeline rapportages.",
      },
      {
        title: "Lead Generatie Systemen",
        description: "Geautomatiseerde outreach, lead kwalificatie en multi-channel prospecting.",
      },
      {
        title: "E-commerce Automatisering",
        description: "Orderverwerking, voorraadbeheer, retourafhandeling en dynamische pricing.",
      },
    ],
  },
  {
    title: "Operations & Workflow Automation",
    services: [
      {
        title: "Operations Automatisering",
        description: "Goedkeuringsflows, taaktoewijzing, notificaties en documentgeneratie.",
      },
      {
        title: "Onboarding Automatisering",
        description: "Klant- en medewerker-onboarding met checklists, account-creatie en e-signatures.",
      },
      {
        title: "API & Systeemkoppelingen",
        description: "CRM, boekhouding, webshop en legacy systemen verbonden via API's en webhooks.",
      },
    ],
  },
  {
    title: "Finance & Reporting Automation",
    services: [
      {
        title: "Finance & Backoffice Automatisering",
        description: "Factuurverwerking, reconciliatie, onkostendeclaraties en budgetbewaking.",
      },
      {
        title: "Dashboards & Inzichten",
        description: "Real-time KPI dashboards met data uit meerdere bronnen en afwijkingsdetectie.",
      },
      {
        title: "Automatische Rapportages",
        description: "Wekelijkse en maandelijkse rapportages op autopilot naar stakeholders.",
      },
      {
        title: "Excel & Spreadsheet Automatisering",
        description: "Van rommelige spreadsheets naar gestructureerde, geautomatiseerde processen.",
      },
    ],
  },
  {
    title: "Customer & Service Automation",
    services: [
      {
        title: "Klantenservice Automatisering",
        description: "AI-chatbots, intelligente ticket routing, follow-ups en SLA-monitoring.",
      },
      {
        title: "WhatsApp Automatisering",
        description: "Afspraakherinneringen, order-updates, support flows en broadcasts.",
      },
      {
        title: "AI-gedreven Automatisering",
        description: "Documentverwerking, e-mail classificatie, chatbots en voice AI geïntegreerd in workflows.",
      },
      {
        title: "Webscraping & Data Verzameling",
        description: "Concurrentiemonitoring, lead lists, marktdata en voorraadmonitoring.",
      },
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Services
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Automatisering voor groeiende MKB-bedrijven die vastlopen op handmatige
              processen en losse systemen.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Wij bouwen maatwerk automatiseringen die direct tijd en kosten besparen.
            </p>
          </div>
        </div>
      </section>

      <ToolStackBlock />

      {/* Service categories */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8 space-y-16">
          {categories.map((category) => (
            <div key={category.title}>
              <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service) => (
                  <div
                    key={service.title}
                    className="rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/20"
                  >
                    <h3 className="font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Uw proces staat er niet tussen?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Wij automatiseren elk voorspelbaar proces. Plan een vrijblijvende scan en
            ontdek wat er mogelijk is.
          </p>
          <Button asChild size="lg">
            <Link to="/book">
              Plan Automation Scan <ArrowRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
