import { Bot, FileText, Users, TrendingUp, Clock, Zap, Mail, BarChart3, Target } from "lucide-react";
import SupportFlowDiagram from "./SupportFlowDiagram";
import MarketingFlowDiagram from "./MarketingFlowDiagram";
import LeadFlowDiagram from "./LeadFlowDiagram";

export interface MetricAnimation {
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  separator?: string; // e.g. " → " for "25 → 5 min"
  fromSuffix?: string;
  toSuffix?: string;
}

export interface CaseMetric {
  icon: React.ElementType;
  value: string;
  label: string;
  animation?: MetricAnimation;
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
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    company: string;
    logo?: string;
  };
  logoSrc?: string;
}

export const cases: CaseStudy[] = [
  {
    title: "Leadgeneratie en outreach automatisering",
    icon: Users,
    logoSrc: "/logo.png",
    metrics: [
      { icon: Clock, value: "25 → 5 min", label: "Leadverwerking per lead", animation: { from: 25, to: 5, suffix: " min", separator: " → " } },
      { icon: TrendingUp, value: "3–5×", label: "Hogere outreach efficiëntie" },
      { icon: Mail, value: "0 → 50+", label: "Gepersonaliseerde e-mails/dag", animation: { from: 0, to: 50, suffix: "+", separator: " → " } },
      { icon: Zap, value: "100%", label: "Automatische verrijking", animation: { from: 0, to: 100, suffix: "%" } },
    ],
    context: "Jobby wilde met een klein team meer bedrijven bereiken. Het vinden van leads en verzamelen van contactinformatie kostte veel tijd. Het team werkte voornamelijk met handmatig zoeken en telefonische outreach.",
    problem: [
      "Leads handmatig zoeken via platformen en databases",
      "Contactinfo en bedrijfsgegevens apart opzoeken (±25 min/lead)",
      "Geen inzicht in pijnpunten van prospects",
      "E-mail outreach te tijdrovend om in te zetten",
    ],
    solution: [
      "Automatisch leads verzamelen uit meerdere bronnen",
      "Bedrijfsinformatie direct verrijken via data-API's",
      "AI-gestuurde generatie van gepersonaliseerde outreach e-mails",
      "Automatische synchronisatie van leaddata met dashboard",
    ],
    results: [
      "Leadverwerking van 25 naar 5 minuten per lead",
      "3–5× hogere outreach efficiëntie",
      "Van 0 naar 50+ gepersonaliseerde e-mails per dag",
      "Meer klantgesprekken zonder extra teamcapaciteit",
    ],
    technology: [
      "AI personalisatie",
      "Lead scraping",
      "Data verrijking",
      "API integraties",
      "Batch e-mail outreach",
      "CRM synchronisatie",
    ],
    visual: LeadFlowDiagram,
    testimonial: {
      quote: "Dankzij Autronis werken we een stuk efficiënter met onze outreach. Waar het eerst ongeveer 25 minuten kostte om een lead te vinden en te benaderen, doen we dat nu in zo'n 5 tot 10 minuten. Daarnaast versturen we nu dagelijks tientallen gepersonaliseerde e-mails, iets wat we voorheen nauwelijks deden. Het systeem heeft ons echt geholpen om met een klein team veel meer bedrijven te bereiken.",
      name: "Naam",
      role: "Functie",
      company: "Jobby",
      logo: "/assets/jobby-logo.png",
    },
  },
  {
    title: "AI klantenservice automatisering",
    icon: Bot,
    metrics: [
      { icon: Target, value: "70%+", label: "Vragen automatisch afgehandeld", animation: { from: 0, to: 70, suffix: "%+" } },
      { icon: Clock, value: "2 uur → direct", label: "Reactietijd" },
      { icon: TrendingUp, value: "60%+", label: "Minder support tickets", animation: { from: 0, to: 60, suffix: "%+" } },
      { icon: Zap, value: "24/7", label: "Beschikbaarheid" },
    ],
    context: "Een groeiend e-commerce bedrijf ontving dagelijks veel klantvragen over bestellingen, verzending en retouren. Het supportteam besteedde het merendeel van hun tijd aan repetitieve vragen.",
    problem: [
      "Hoog volume repetitieve vragen (orderstatus, retouren, verzending)",
      "Responstijd liep op door stijgende volumes",
      "Supportteam overbelast met terugkerende vragen",
      "Geen klantenservice buiten kantooruren",
    ],
    solution: [
      "AI-gedreven systeem dat veelgestelde vragen automatisch beantwoordt",
      "Automatische controle van orderstatussen via API-integraties",
      "Complexe vragen automatisch doorgestuurd naar een medewerker",
      "Klantinteracties opgeslagen in CRM voor context",
    ],
    results: [
      "70% van alle klantvragen automatisch afgehandeld",
      "Reactietijd van uren naar direct",
      "Aanzienlijk minder support tickets",
      "Klantenservice 24/7 beschikbaar",
    ],
    technology: [
      "AI chatbot",
      "API integraties",
      "Workflow automatisering",
      "Knowledge base",
      "CRM synchronisatie",
    ],
    visual: SupportFlowDiagram,
  },
  {
    title: "Marketing en rapportage automatisering",
    icon: BarChart3,
    metrics: [
      { icon: Clock, value: "6 uur → 10 min", label: "Rapportagetijd", animation: { from: 6, to: 0, suffix: " uur", separator: " → " } },
      { icon: Zap, value: "100%", label: "Automatische dataverzameling", animation: { from: 0, to: 100, suffix: "%" } },
      { icon: TrendingUp, value: "Realtime", label: "Dashboards voor klanten" },
      { icon: Target, value: "0", label: "Handmatige rapportages", animation: { from: 10, to: 0, suffix: "" } },
    ],
    context: "Een marketingbureau moest wekelijks rapportages maken voor klanten over advertentieprestaties en websiteverkeer. Deze werden handmatig samengesteld in spreadsheets.",
    problem: [
      "Data handmatig verzamelen uit Google Ads, Meta Ads en Analytics",
      "Meerdere uren werk per klantrapportage per week",
      "Foutgevoelig door handmatige data-invoer",
      "Geen realtime inzicht in marketingprestaties",
    ],
    solution: [
      "Automatisch marketingdata verzamelen en visualiseren",
      "Data uit advertentieplatforms ophalen via API's",
      "Gegevens uit verschillende bronnen automatisch combineren",
      "Realtime dashboards en automatische rapportverzending",
    ],
    results: [
      "Rapportages van uren naar automatisch gegenereerd",
      "Aanzienlijke tijdsbesparing per week",
      "Realtime inzicht in marketingprestaties",
      "Minder handmatig werk en fouten",
    ],
    technology: [
      "Data pipelines",
      "API integraties",
      "Realtime dashboards",
      "Workflow automatisering",
      "Marketing platform koppelingen",
    ],
    visual: MarketingFlowDiagram,
  },
];
