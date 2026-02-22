import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Settings, Headphones, Calculator, BarChart3, UserPlus, ArrowRight } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Sales & Marketing Automatisering",
    description: "Genereer meer leads, sluit sneller deals en beheer campagnes zonder handwerk.",
    examples: [
      "Automatische lead scoring & routing naar de juiste salesperson",
      "Follow-up sequences op basis van gedrag en engagement",
      "CRM-synchronisatie tussen marketing en sales tools",
      "Geautomatiseerde rapportages over pipeline en conversie",
    ],
    tools: "HubSpot, Salesforce, Mailchimp, ActiveCampaign, LinkedIn",
  },
  {
    icon: Settings,
    title: "Operations Automatisering",
    description: "Stroomlijn interne workflows, goedkeuringsprocessen en cross-team communicatie.",
    examples: [
      "Goedkeuringsflows voor inkoop, HR-verzoeken en projecten",
      "Automatische taaktoewijzing en statusupdates",
      "Notificaties en escalaties bij deadlines of bottlenecks",
      "Documentgeneratie en -distributie",
    ],
    tools: "Slack, Microsoft Teams, Asana, Monday.com, Notion",
  },
  {
    icon: Headphones,
    title: "Klantenservice Automatisering",
    description: "Snellere responstijden, slimmere routing en 24/7 ondersteuning met AI.",
    examples: [
      "AI-chatbot voor veelgestelde vragen en eerste lijn support",
      "Intelligente ticket routing op basis van urgentie en categorie",
      "Automatische follow-ups en klanttevredenheidsenquêtes",
      "Escalatieregels met SLA-monitoring",
    ],
    tools: "Zendesk, Intercom, Freshdesk, custom chatbots",
  },
  {
    icon: Calculator,
    title: "Finance & Backoffice Automatisering",
    description: "Foutloze factuurverwerking, reconciliatie en financiële rapportage op autopilot.",
    examples: [
      "Automatische factuurverwerking en goedkeuring",
      "Bankreconciliatie met slimme matching",
      "Periodieke financiële rapportages zonder spreadsheets",
      "Onkostendeclaraties en budgetbewaking",
    ],
    tools: "Exact, Twinfield, Xero, QuickBooks, custom ERP",
  },
  {
    icon: BarChart3,
    title: "Data & Rapportage Automatisering",
    description: "Real-time inzichten zonder handmatig data verzamelen en formatteren.",
    examples: [
      "Geautomatiseerde dashboards met live data uit meerdere bronnen",
      "Datavalidatie en opschoning op schema",
      "Alerts bij afwijkingen of drempelwaarden",
      "Cross-platform rapportages (sales + marketing + finance)",
    ],
    tools: "Google Sheets, BigQuery, Looker, Power BI, custom API's",
  },
  {
    icon: UserPlus,
    title: "Onboarding Automatisering",
    description: "Klant- en medewerker-onboarding volledig geautomatiseerd met persoonlijke flows.",
    examples: [
      "Welkomstflows met stapsgewijze checklists",
      "Automatische account- en toegangscreatie",
      "Documentverzameling en e-signature flows",
      "Gepersonaliseerde trainingsschema's",
    ],
    tools: "DocuSign, PandaDoc, BambooHR, custom portals",
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-16 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Services</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Elke afdeling. Elk proces. <span className="text-gradient">Geautomatiseerd.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Wij analyseren uw workflows en bouwen op maat gemaakte automatiseringen die direct impact leveren.
            </p>
          </div>
        </div>
      </section>

      {/* Service blocks */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8 space-y-12">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="rounded-xl border border-border bg-card p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <service.icon size={20} />
                  </div>
                  <h2 className="text-xl font-bold">{service.title}</h2>
                </div>
                <p className="text-muted-foreground mb-5">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.examples.map((ex) => (
                    <li key={ex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">▸</span>
                      {ex}
                    </li>
                  ))}
                </ul>
                <Button asChild size="sm">
                  <Link to="/book">
                    Plan Automation Scan <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Tools & platformen</p>
                <p className="text-sm text-foreground/80">{service.tools}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Services;
