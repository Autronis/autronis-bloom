import { Bot, FileText, Users, TrendingUp, Clock, Zap, Mail, BarChart3, Target } from "lucide-react";
import SupportFlowDiagram from "./SupportFlowDiagram";
import MarketingFlowDiagram from "./MarketingFlowDiagram";
import LeadFlowDiagram from "./LeadFlowDiagram";

export interface CaseMetric {
  icon: React.ElementType;
  value: string;
  label: string;
}

export interface CaseStudy {
  title: string;
  icon: React.ElementType;
  metrics: CaseMetric[];
  context: string;
  problem: string[];
  solution: string[];
  results: string[];
  technology: string[];
  visual: React.ElementType;
  videoUrl?: string;
}

export const cases: CaseStudy[] = [
  {
    title: "AI klantenservice automatisering",
    icon: Bot,
    metrics: [
      { icon: Target, value: "70%", label: "Klantvragen automatisch afgehandeld" },
      { icon: Clock, value: "Direct", label: "Snellere reactietijd (was 2 uur)" },
      { icon: TrendingUp, value: "60%", label: "Minder support tickets" },
      { icon: Zap, value: "24/7", label: "Automatische klantenservice" },
    ],
    context: "Een groeiend e-commerce bedrijf ontving dagelijks veel klantvragen over bestellingen, verzending en retouren. Het supportteam besteedde een groot deel van hun tijd aan het beantwoorden van dezelfde vragen.",
    problem: [
      "Veel klantvragen waren repetitief (orderstatus, retouren, verzendinformatie)",
      "Responstijd liep op door hoge volumes",
      "Supportteam steeds meer belast met terugkerende vragen",
      "Geen klantenservice buiten kantooruren",
    ],
    solution: [
      "AI-gedreven klantenservice systeem dat veelgestelde vragen automatisch beantwoordt",
      "AI begrijpt klantvragen en geeft passende antwoorden op basis van bedrijfsinformatie",
      "Automatische controle van orderstatussen via integraties met het ordersysteem",
      "Complexe vragen worden automatisch doorgestuurd naar een medewerker",
      "Klantinteracties worden opgeslagen in CRM voor context",
    ],
    results: [
      "Circa 70% van alle klantvragen automatisch afgehandeld",
      "Aanzienlijk minder support tickets",
      "Snellere reacties voor klanten (van uren naar direct)",
      "Lagere werkdruk voor het supportteam",
      "Klantenservice 24/7 beschikbaar",
    ],
    technology: [
      "AI chatbot",
      "Knowledge base automatisering",
      "API-integraties",
      "Workflow automatisering",
      "Ordersysteem koppeling",
    ],
    visual: SupportFlowDiagram,
  },
  {
    title: "Marketing en rapportage automatisering",
    icon: BarChart3,
    metrics: [
      { icon: Clock, value: "6u → 10 min", label: "Snellere rapportages" },
      { icon: Zap, value: "100%", label: "Automatische dataverzameling" },
      { icon: TrendingUp, value: "Realtime", label: "Dashboards voor klanten" },
      { icon: Target, value: "0", label: "Handmatige Excel rapportages" },
    ],
    context: "Een marketingbureau moest wekelijks rapportages maken voor klanten over advertentieprestaties en websiteverkeer. Deze rapportages werden handmatig samengesteld in spreadsheets.",
    problem: [
      "Data handmatig verzamelen uit Google Ads, Meta Ads en Google Analytics",
      "Wekelijks meerdere uren werk per klantrapportage",
      "Foutgevoelig door handmatige data-invoer in spreadsheets",
      "Geen realtime inzicht in marketingprestaties",
    ],
    solution: [
      "Automatiseringssysteem dat marketingdata automatisch verzamelt en visualiseert",
      "Data verzamelen uit advertentieplatforms via API's",
      "Gegevens uit verschillende bronnen automatisch combineren",
      "Automatische dashboards genereren met realtime data",
      "Rapportages automatisch versturen naar klanten",
    ],
    results: [
      "Rapportages van meerdere uren naar automatisch gegenereerd",
      "Aanzienlijke tijdsbesparing per week",
      "Realtime inzicht in marketingprestaties",
      "Minder handmatig werk en foutgevoeligheid",
      "Betere en snellere rapportages voor klanten",
    ],
    technology: [
      "API-integraties",
      "Data pipelines",
      "Dashboard automatisering",
      "Workflow automatisering",
      "Marketing platform integraties",
    ],
    visual: MarketingFlowDiagram,
  },
  {
    title: "Leadwerving en outreach automatisering",
    icon: Users,
    metrics: [
      { icon: Clock, value: "25→5 min", label: "Leadverwerking per lead" },
      { icon: TrendingUp, value: "3–5×", label: "Hogere outreach efficiëntie" },
      { icon: Mail, value: "50+", label: "Gepersonaliseerde e-mails per dag" },
      { icon: Zap, value: "0→50+", label: "Dagelijkse e-mail outreach" },
    ],
    context: "Jobby wilde met een klein team meer bedrijven bereiken. Het vinden van nieuwe leads en het verzamelen van contactinformatie kostte veel tijd. Het team werkte voornamelijk met handmatig zoeken en telefonische outreach.",
    problem: [
      "Leads handmatig zoeken via verschillende platformen en databases",
      "Contactinformatie en bedrijfsgegevens afzonderlijk opzoeken (±25 min per lead)",
      "Geen inzicht in mogelijke pijnpunten van prospects",
      "E-mail outreach werd niet ingezet omdat het te tijdrovend was",
    ],
    solution: [
      "Automatisch leads verzamelen uit meerdere bronnen",
      "Bedrijfsinformatie en contactgegevens direct verrijken via data-API's",
      "Website-analyse automatisering om pijnpunten te identificeren",
      "AI-gestuurde generatie van gepersonaliseerde outreach e-mails",
      "Batch e-mail outreach systeem voor schaalbare campagnes",
      "Automatische synchronisatie van leaddata met dashboard",
    ],
    results: [
      "Leadverwerking van 25 naar 5–10 minuten per lead",
      "3–5× hogere outreach efficiëntie",
      "Van 0 naar 50+ gepersonaliseerde e-mails per dag",
      "Snellere toegang tot contactinformatie en bedrijfscontext",
      "Meer klantgesprekken zonder extra teamcapaciteit",
    ],
    technology: [
      "AI personalisatie (LLM / OpenAI)",
      "Lead scraping automatisering",
      "Bedrijfsdata verrijking",
      "Website-analyse automatisering",
      "API-integraties",
      "Batch e-mail outreach systeem",
      "Dashboard-synchronisatie",
      "Workflow automatisering",
    ],
    visual: LeadFlowDiagram,
  },
];
