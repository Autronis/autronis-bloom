import { Bot, FileText, Users, TrendingUp, Clock, Zap, Mail, BarChart3, Target } from "lucide-react";
import SupportFlowDiagram from "./SupportFlowDiagram";
import MarketingFlowDiagram from "./MarketingFlowDiagram";
import LeadFlowDiagram from "./LeadFlowDiagram";
import type { TagCategory, TechTagData } from "./TechTag";

export interface MetricAnimation {
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  separator?: string;
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
  technologyTags: TechTagData[];
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
      "LLM personalisatie", "Web scraping pipelines", "Data enrichment APIs",
      "Workflow orchestration", "Lead scoring AI", "Batch outreach automation",
      "CRM synchronisatie", "API integraties", "Data processing pipelines", "Prospect intelligence",
    ],
    technologyTags: [
      { label: "LLM personalisatie", category: "ai", tooltip: "AI schrijft outreach op basis van bedrijfscontext. Voorbeeld: pijnpunt + aanbod." },
      { label: "Web scraping pipelines", category: "data", tooltip: "Automatisch leads verzamelen uit directories en sites." },
      { label: "Data enrichment APIs", category: "data", tooltip: "Verrijkt bedrijfsdata via externe dataproviders." },
      { label: "Workflow orchestration", category: "automation", tooltip: "Orkestreert stappen en routes in de pipeline." },
      { label: "Lead scoring AI", category: "ai", tooltip: "Prioriteert leads op match en intent-signalen." },
      { label: "Batch outreach automation", category: "automation", tooltip: "Verstuurt outreach in batches met throttling en logging." },
      { label: "CRM synchronisatie", category: "integrations", tooltip: "Schrijft leads en status terug naar CRM automatisch." },
      { label: "API integraties", category: "integrations", tooltip: "Koppelingen tussen tools en systemen via API's." },
      { label: "Data processing pipelines", category: "data", tooltip: "Opschonen, normaliseren en dedupliceren van data." },
      { label: "Prospect intelligence", category: "ai", tooltip: "Haalt signalen uit website/sector voor betere targeting." },
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
      "LLM support agent", "RAG knowledge retrieval", "Vector search",
      "Intent classification", "Conversation orchestration", "API integraties",
      "CRM synchronisatie", "Context enrichment", "Automated escalation", "Response generation",
    ],
    technologyTags: [
      { label: "LLM support agent", category: "ai", tooltip: "AI-agent die vragen oplost in natuurlijke taal." },
      { label: "RAG knowledge retrieval", category: "ai", tooltip: "Zoekt relevante kennis en laat AI daarop antwoorden." },
      { label: "Vector search", category: "data", tooltip: "Semantisch zoeken op basis van embeddings." },
      { label: "Intent classification", category: "ai", tooltip: "Detecteert type vraag: orderstatus, retour, klacht, etc." },
      { label: "Conversation orchestration", category: "automation", tooltip: "Regels en flows voor gesprekken en handoffs." },
      { label: "API integraties", category: "integrations", tooltip: "Koppelt webshop, ticketsysteem en CRM." },
      { label: "CRM synchronisatie", category: "integrations", tooltip: "Slaat interacties op voor context en follow-up." },
      { label: "Context enrichment", category: "data", tooltip: "Voegt order- en klantdata toe aan het gesprek." },
      { label: "Automated escalation", category: "automation", tooltip: "Stuurt complexe cases automatisch door naar medewerker." },
      { label: "Response generation", category: "ai", tooltip: "Genereert consistente antwoorden in tone-of-voice." },
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
      "Marketing data pipelines", "API data ingestion", "Realtime data processing",
      "Data transformation", "AI performance analysis", "Dashboard automation",
      "Workflow orchestration", "Cross-platform integraties", "Automated reporting", "Attribution analytics",
    ],
    technologyTags: [
      { label: "Marketing data pipelines", category: "data", tooltip: "Datastromen uit ads en analytics naar één model." },
      { label: "API data ingestion", category: "integrations", tooltip: "Haalt data op via Google/Meta/GA API's." },
      { label: "Realtime data processing", category: "data", tooltip: "Verwerkt nieuwe data continu of op interval." },
      { label: "Data transformation", category: "data", tooltip: "Normaliseert metrics en maakt berekeningen uniform." },
      { label: "AI performance analysis", category: "ai", tooltip: "AI analyseert trends en afwijkingen in performance." },
      { label: "Dashboard automation", category: "automation", tooltip: "Automatisch dashboards vullen en updaten." },
      { label: "Workflow orchestration", category: "automation", tooltip: "Jobs, retries en monitoring van de pipeline." },
      { label: "Cross-platform integraties", category: "integrations", tooltip: "Combineert data over meerdere platformen." },
      { label: "Automated reporting", category: "analytics", tooltip: "Automatisch rapporten genereren en versturen." },
      { label: "Attribution analytics", category: "analytics", tooltip: "Inzicht in kanaalbijdrage en conversie-impact." },
    ],
    visual: MarketingFlowDiagram,
  },
];
