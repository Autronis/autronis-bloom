import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  TrendingUp, Settings, Headphones, Calculator, BarChart3, UserPlus,
  ArrowRight, Brain, Table, Target, Globe, Link2, ShoppingCart,
  MessageCircle, FileBarChart
} from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Sales & Marketing Automatisering",
    description: "Genereer meer leads, sluit sneller deals en beheer campagnes zonder handwerk. Wij integreren met uw bestaande CRM en marketing stack — niet gebonden aan specifieke tools.",
    examples: [
      "Automatische lead scoring & routing naar de juiste salesperson",
      "Follow-up sequences op basis van gedrag en engagement",
      "CRM-synchronisatie tussen marketing en sales tools",
      "Geautomatiseerde rapportages over pipeline en conversie",
    ],
    tools: "Tools die we vaak inzetten: HubSpot, Salesforce, Pipedrive, Mailchimp, Lemlist, Instantly, LinkedIn tools en maatwerk API-koppelingen.",
  },
  {
    icon: Settings,
    title: "Operations Automatisering",
    description: "Stroomlijn interne workflows, goedkeuringsprocessen en cross-team communicatie. Minder bottlenecks, snellere doorlooptijden.",
    examples: [
      "Goedkeuringsflows voor inkoop, HR-verzoeken en projecten",
      "Automatische taaktoewijzing en statusupdates",
      "Notificaties en escalaties bij deadlines of bottlenecks",
      "Documentgeneratie en -distributie",
    ],
    tools: "Voorbeelden van platformen: Asana, ClickUp, Monday.com, Slack, Microsoft Teams en bestaande interne systemen.",
  },
  {
    icon: Headphones,
    title: "Klantenservice Automatisering",
    description: "Snellere responstijden, slimmere routing en 24/7 ondersteuning met AI. Consistente service zonder extra personeel.",
    examples: [
      "AI-chatbot voor veelgestelde vragen en eerste lijn support",
      "Intelligente ticket routing op basis van urgentie en categorie",
      "Automatische follow-ups en klanttevredenheidsenquêtes",
      "Escalatieregels met SLA-monitoring",
    ],
    tools: "Wij werken met uw bestaande stack: Zendesk, Intercom, Freshdesk, custom chatbots en meer.",
  },
  {
    icon: Calculator,
    title: "Finance & Backoffice Automatisering",
    description: "Foutloze factuurverwerking, reconciliatie en financiële rapportage — volledig op autopilot. Meer controle, minder handwerk.",
    examples: [
      "Automatische factuurverwerking en goedkeuring",
      "Bankreconciliatie met slimme matching",
      "Periodieke financiële rapportages zonder spreadsheets",
      "Onkostendeclaraties en budgetbewaking",
    ],
    tools: "Voorbeelden van platformen die we vaak inzetten: Exact, Twinfield, Xero, QuickBooks en custom ERP-systemen.",
  },
  {
    icon: Table,
    title: "Excel & Spreadsheet Automatisering",
    description: "Van rommelige spreadsheets naar gestructureerde, betrouwbare systemen. Veel MKB-bedrijven draaien op Excel — wij bouwen daar een professioneel systeem omheen.",
    examples: [
      "Spreadsheet workflows omzetten naar geautomatiseerde processen",
      "Data-invoer automatiseren en valideren",
      "Rapportages die zichzelf genereren uit meerdere bronnen",
      "Excel-afhankelijkheden elimineren zonder uw team te verstoren",
    ],
    tools: "Wij werken met Google Sheets, Excel, Airtable, Supabase, databases en maatwerk koppelingen.",
  },
  {
    icon: BarChart3,
    title: "Dashboards & Inzichten",
    description: "Real-time inzichten zonder handmatig data verzamelen. Altijd actuele KPI's, direct beschikbaar voor iedereen die ze nodig heeft.",
    examples: [
      "Geautomatiseerde dashboards met live data uit meerdere bronnen",
      "Datavalidatie en opschoning op schema",
      "Alerts bij afwijkingen of drempelwaarden",
      "Cross-platform rapportages (sales + marketing + finance)",
    ],
    tools: "Voorbeelden van platformen: Google Sheets, BigQuery, Looker, Power BI, custom API's en databases.",
  },
  {
    icon: Target,
    title: "Lead Generatie Systemen",
    description: "Systematisch nieuwe leads vinden, kwalificeren en opwarmen. Van geautomatiseerde outreach tot volledige prospecting pipelines die uw salesteam voeden met gekwalificeerde leads.",
    examples: [
      "Geautomatiseerde outreach en connectie-flows via meerdere kanalen",
      "Lead kwalificatie en scoring op basis van uw ideale klantprofiel",
      "Multi-channel prospecting (email, social, telefoon)",
      "Verrijking van leads met bedrijfs- en contactdata",
    ],
    tools: "Wij werken met uw bestaande tools en bouwen maatwerk integraties voor lead generatie en prospecting.",
  },
  {
    icon: Brain,
    title: "AI-gedreven Automatisering",
    description: "Kunstmatige intelligentie geïntegreerd in uw dagelijkse workflows. Van documentverwerking tot slimme beslissingen — met de mogelijkheid om mensen in de loop te houden waar dat nodig is.",
    examples: [
      "AI-gestuurde documentverwerking en data-extractie",
      "Slimme e-mail classificatie en automatisch antwoorden",
      "AI chatbots met bedrijfskennis voor support en sales",
      "Voice AI voor telefonische afhandeling",
    ],
    tools: "Wij integreren AI-modellen (OpenAI, Claude, custom) met uw bestaande systemen en workflows.",
  },
  {
    icon: UserPlus,
    title: "Onboarding Automatisering",
    description: "Klant- en medewerker-onboarding volledig geautomatiseerd. Persoonlijke flows die consistent en professioneel aanvoelen.",
    examples: [
      "Welkomstflows met stapsgewijze checklists",
      "Automatische account- en toegangscreatie",
      "Documentverzameling en e-signature flows",
      "Gepersonaliseerde trainingsschema's",
    ],
    tools: "Tools die we vaak inzetten: DocuSign, PandaDoc, BambooHR, custom portals en bestaande HR-systemen.",
  },
  {
    icon: Globe,
    title: "Webscraping & Data Verzameling",
    description: "Geautomatiseerd data verzamelen van websites, marktplaatsen en openbare bronnen. Altijd actuele informatie zonder handmatig werk.",
    examples: [
      "Concurrentie- en prijsmonitoring",
      "Lead lists opbouwen uit openbare bronnen",
      "Marktdata en reviews verzamelen",
      "Product- en voorraadmonitoring bij leveranciers",
    ],
    tools: "Wij bouwen maatwerk scrapers en integreren met uw CRM, databases en rapportagetools.",
  },
  {
    icon: Link2,
    title: "API & Systeemkoppelingen",
    description: "Uw systemen met elkaar verbinden — ongeacht de technologie. CRM met boekhouding, webshop met voorraad, of custom middleware tussen legacy en modern.",
    examples: [
      "CRM ↔ boekhoudsoftware synchronisatie",
      "Webhooks en event-driven integraties",
      "Custom middleware tussen legacy en moderne systemen",
      "Realtime data-sync tussen meerdere platformen",
    ],
    tools: "Wij koppelen alles: REST API's, webhooks, databases, legacy systemen en custom software.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Automatisering",
    description: "Orderverwerking, voorraadbeheer en retourafhandeling volledig geautomatiseerd. Schaal uw webshop zonder extra personeel.",
    examples: [
      "Automatische orderverwerking en fulfillment",
      "Voorraadsynchronisatie over meerdere kanalen",
      "Retourverwerking en klantupdates",
      "Dynamische pricing en productfeed beheer",
    ],
    tools: "Wij integreren met Shopify, WooCommerce, Bol.com, Amazon, Lightspeed en custom platformen.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automatisering",
    description: "Professionele WhatsApp-communicatie op schaal. Herinneringen, bevestigingen en support flows — persoonlijk maar volledig geautomatiseerd.",
    examples: [
      "Automatische afspraakherinneringen en bevestigingen",
      "Order- en leveringsupdates via WhatsApp",
      "Support flows met slimme routing",
      "Marketing broadcasts met personalisatie",
    ],
    tools: "Wij werken met de WhatsApp Business API, Twilio, custom integraties en uw bestaande CRM.",
  },
  {
    icon: FileBarChart,
    title: "Automatische Rapportages",
    description: "Wekelijkse cijfers, maandrapportages en KPI-mails die zichzelf versturen. Nooit meer handmatig rapportages samenstellen.",
    examples: [
      "Wekelijkse en maandelijkse rapportages op autopilot",
      "KPI-samenvattingen per e-mail naar stakeholders",
      "Cross-afdeling rapportages uit meerdere databronnen",
      "Afwijkingsdetectie en automatische alerts",
    ],
    tools: "Voorbeelden van platformen: Google Sheets, Looker, Power BI, e-mail en custom dashboards.",
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
              Wij analyseren uw workflows en bouwen maatwerk automatiseringen die direct impact leveren. Tool-agnostisch, volledig op maat en geïntegreerd met uw bestaande systemen.
            </p>
          </div>
        </div>
      </section>

      {/* Service blocks */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8 space-y-10">
          {services.map((service) => (
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

      {/* Bottom CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Uw proces staat er niet tussen?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Wij automatiseren elk voorspelbaar proces. Plan een vrijblijvende scan en ontdek wat er mogelijk is voor uw organisatie.
          </p>
          <Button asChild size="lg">
            <Link to="/book">Plan Automation Scan <ArrowRight size={18} /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
