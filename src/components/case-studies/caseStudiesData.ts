import { Bot, FileText, Users, TrendingUp, Clock, Zap, Mail, BarChart3, Target } from "lucide-react";
import SupportFlowDiagram from "./SupportFlowDiagram";
import MarketingFlowDiagram from "./MarketingFlowDiagram";
import LeadFlowDiagram from "./LeadFlowDiagram";
import type { TagCategory, TechTagData } from "./TechTag";

export interface MetricAnimation { from: number; to: number; suffix?: string; prefix?: string; separator?: string; fromSuffix?: string; toSuffix?: string; }
export interface CaseMetric { icon: React.ElementType; value: string; label: string; animation?: MetricAnimation; }
export interface CaseStudy {
  title: string; icon: React.ElementType; metrics: CaseMetric[]; context: string; problem: string[]; solution: string[]; results: string[];
  technology: string[]; technologyTags: TechTagData[]; visual: React.ElementType; videoUrl?: string;
  testimonial?: { quote: string; name: string; role: string; company: string; logo?: string; website?: string };
  implementationResult?: string; logoSrc?: string;
}

type LangCases = Record<"en" | "nl", CaseStudy[]>;

export const casesByLang: LangCases = {
  en: [
    {
      title: "Lead generation and outreach automation", icon: Users, logoSrc: "/logo.png",
      metrics: [
        { icon: Clock, value: "25 → 5 min", label: "Lead processing per lead", animation: { from: 25, to: 5, suffix: " min", separator: " → " } },
        { icon: TrendingUp, value: "3–5×", label: "Higher outreach efficiency" },
        { icon: Mail, value: "0 → 50+", label: "Personalized emails/day", animation: { from: 0, to: 50, suffix: "+", separator: " → " } },
        { icon: Zap, value: "100%", label: "Automatic enrichment", animation: { from: 0, to: 100, suffix: "%" } },
      ],
      context: "Jobby wanted to reach more businesses with a small team. Finding leads and collecting contact information took a lot of time. The team primarily relied on manual searching and phone outreach.",
      problem: ["Manually searching for leads across platforms and databases", "Looking up contact info and company data separately (~25 min/lead)", "No insight into prospects' pain points", "Email outreach too time-consuming to deploy"],
      solution: ["Automatically collect leads from multiple sources", "Enrich company information directly via data APIs", "AI-driven generation of personalized outreach emails", "Automatic synchronization of lead data with dashboard"],
      results: ["Lead processing from 25 to 5 minutes per lead", "3–5× higher outreach efficiency", "From 0 to 50+ personalized emails per day", "More client conversations without additional team capacity"],
      technology: ["LLM personalization", "Web scraping pipelines", "Data enrichment APIs", "Workflow orchestration", "Lead scoring AI", "Batch outreach automation", "CRM synchronization", "API integrations", "Data processing pipelines", "Prospect intelligence"],
      technologyTags: [
        { label: "LLM personalization", category: "ai", tooltip: "AI writes outreach based on company context." },
        { label: "Web scraping pipelines", category: "data", tooltip: "Automatically collect leads from directories and sites." },
        { label: "Data enrichment APIs", category: "data", tooltip: "Enriches company data via external data providers." },
        { label: "Workflow orchestration", category: "automation", tooltip: "Orchestrates steps and routes in the pipeline." },
        { label: "Lead scoring AI", category: "ai", tooltip: "Prioritizes leads based on match and intent signals." },
        { label: "Batch outreach automation", category: "automation", tooltip: "Sends outreach in batches with throttling and logging." },
        { label: "CRM synchronization", category: "integrations", tooltip: "Writes leads and status back to CRM automatically." },
        { label: "API integrations", category: "integrations", tooltip: "Connections between tools and systems via APIs." },
        { label: "Data processing pipelines", category: "data", tooltip: "Cleaning, normalizing, and deduplicating data." },
        { label: "Prospect intelligence", category: "ai", tooltip: "Extracts signals from website/sector for better targeting." },
      ],
      visual: LeadFlowDiagram,
      testimonial: { quote: "Thanks to Autronis, we work much more efficiently with our outreach. Where it used to take about 25 minutes to find and contact a lead, we now do it in about 5 to 10 minutes. On top of that, we now send dozens of personalized emails daily — something we barely did before. The system has truly helped us reach far more businesses with a small team.", name: "Rick Ruiterkamp", role: "Owner", company: "Jobby", logo: "/assets/jobby-logo.png", website: "https://teamjobby.nl/" },
    },
  ],
  nl: [
    {
      title: "Leadgeneratie en outreach-automatisering", icon: Users, logoSrc: "/logo.png",
      metrics: [
        { icon: Clock, value: "25 → 5 min", label: "Leadverwerking per lead", animation: { from: 25, to: 5, suffix: " min", separator: " → " } },
        { icon: TrendingUp, value: "3–5×", label: "Hogere outreach-efficiëntie" },
        { icon: Mail, value: "0 → 50+", label: "Gepersonaliseerde e-mails/dag", animation: { from: 0, to: 50, suffix: "+", separator: " → " } },
        { icon: Zap, value: "100%", label: "Automatische verrijking", animation: { from: 0, to: 100, suffix: "%" } },
      ],
      context: "Jobby wilde met een klein team meer bedrijven bereiken. Het vinden van leads en het verzamelen van contactgegevens kostte veel tijd. Het team vertrouwde voornamelijk op handmatig zoeken en telefonische outreach.",
      problem: ["Handmatig zoeken naar leads op platforms en in databases", "Contactgegevens en bedrijfsdata apart opzoeken (~25 min/lead)", "Geen inzicht in pijnpunten van prospects", "E-mail outreach te tijdrovend om in te zetten"],
      solution: ["Automatisch leads verzamelen uit meerdere bronnen", "Bedrijfsinformatie direct verrijken via data-API's", "AI-gestuurde generatie van gepersonaliseerde outreach-e-mails", "Automatische synchronisatie van leaddata met dashboard"],
      results: ["Leadverwerking van 25 naar 5 minuten per lead", "3–5× hogere outreach-efficiëntie", "Van 0 naar 50+ gepersonaliseerde e-mails per dag", "Meer klantgesprekken zonder extra teamcapaciteit"],
      technology: ["LLM-personalisatie", "Web scraping pipelines", "Data enrichment API's", "Workflow-orchestratie", "Lead scoring AI", "Batch outreach-automatisering", "CRM-synchronisatie", "API-integraties", "Dataverwerkingspipelines", "Prospect intelligence"],
      technologyTags: [
        { label: "LLM-personalisatie", category: "ai", tooltip: "AI schrijft outreach op basis van bedrijfscontext." },
        { label: "Web scraping pipelines", category: "data", tooltip: "Verzamelt automatisch leads uit gidsen en websites." },
        { label: "Data enrichment API's", category: "data", tooltip: "Verrijkt bedrijfsdata via externe dataproviders." },
        { label: "Workflow-orchestratie", category: "automation", tooltip: "Orkestreert stappen en routes in de pipeline." },
        { label: "Lead scoring AI", category: "ai", tooltip: "Prioriteert leads op basis van match- en intentsignalen." },
        { label: "Batch outreach-automatisering", category: "automation", tooltip: "Verstuurt outreach in batches met throttling en logging." },
        { label: "CRM-synchronisatie", category: "integrations", tooltip: "Schrijft leads en status automatisch terug naar CRM." },
        { label: "API-integraties", category: "integrations", tooltip: "Koppelingen tussen tools en systemen via API's." },
        { label: "Dataverwerkingspipelines", category: "data", tooltip: "Opschonen, normaliseren en dedupliceren van data." },
        { label: "Prospect intelligence", category: "ai", tooltip: "Haalt signalen uit website/sector voor betere targeting." },
      ],
      visual: LeadFlowDiagram,
      testimonial: { quote: "Dankzij Autronis werken we veel efficiënter met onze outreach. Waar het voorheen ongeveer 25 minuten kostte om een lead te vinden en te contacteren, doen we dat nu in ongeveer 5 tot 10 minuten. Daarnaast versturen we nu dagelijks tientallen gepersonaliseerde e-mails — iets wat we daarvoor nauwelijks deden. Het systeem heeft ons echt geholpen om met een klein team veel meer bedrijven te bereiken.", name: "Rick Ruiterkamp", role: "Eigenaar", company: "Jobby", logo: "/assets/jobby-logo.png", website: "https://teamjobby.nl/" },
    },
    {
      title: "AI-klantenservice automatisering", icon: Bot,
      metrics: [
        { icon: Target, value: "70%+", label: "Vragen automatisch afgehandeld", animation: { from: 0, to: 70, suffix: "%+" } },
        { icon: Clock, value: "2 uur → direct", label: "Responstijd" },
        { icon: TrendingUp, value: "60%+", label: "Minder supporttickets", animation: { from: 0, to: 60, suffix: "%+" } },
        { icon: Zap, value: "24/7", label: "Beschikbaarheid" },
      ],
      context: "Een groeiend e-commercebedrijf ontving dagelijks veel klantvragen over bestellingen, verzending en retouren. Het supportteam besteedde het grootste deel van de tijd aan repetitieve vragen.",
      problem: ["Hoog volume repetitieve vragen (orderstatus, retouren, verzending)", "Responstijd liep op door groeiende volumes", "Supportteam overbelast met terugkerende vragen", "Geen klantenservice buiten kantooruren"],
      solution: ["AI-gestuurd systeem dat veelgestelde vragen automatisch beantwoordt", "Automatische orderstatuscontroles via API-integraties", "Complexe vragen automatisch gerouteerd naar een teamlid", "Klantinteracties opgeslagen in CRM voor context"],
      results: ["70% van alle klantvragen automatisch afgehandeld", "Responstijd van uren naar direct", "Aanzienlijk minder supporttickets", "Klantenservice 24/7 beschikbaar"],
      technology: ["LLM support agent", "RAG knowledge retrieval", "Vector search", "Intent classificatie", "Conversatie-orchestratie", "API-integraties", "CRM-synchronisatie", "Context-verrijking", "Geautomatiseerde escalatie", "Antwoordgeneratie"],
      technologyTags: [
        { label: "LLM support agent", category: "ai", tooltip: "AI-agent die vragen oplost in natuurlijke taal." },
        { label: "RAG knowledge retrieval", category: "ai", tooltip: "Doorzoekt relevante kennis en laat AI op basis daarvan antwoorden." },
        { label: "Vector search", category: "data", tooltip: "Semantisch zoeken op basis van embeddings." },
        { label: "Intent classificatie", category: "ai", tooltip: "Detecteert vraagtype: orderstatus, retour, klacht, etc." },
        { label: "Conversatie-orchestratie", category: "automation", tooltip: "Regels en flows voor gesprekken en overdrachten." },
        { label: "API-integraties", category: "integrations", tooltip: "Koppelt webshop, ticketsysteem en CRM." },
        { label: "CRM-synchronisatie", category: "integrations", tooltip: "Slaat interacties op voor context en opvolging." },
        { label: "Context-verrijking", category: "data", tooltip: "Voegt order- en klantdata toe aan het gesprek." },
        { label: "Geautomatiseerde escalatie", category: "automation", tooltip: "Routeert complexe cases automatisch naar een teamlid." },
        { label: "Antwoordgeneratie", category: "ai", tooltip: "Genereert consistente antwoorden in de juiste tone of voice." },
      ],
      visual: SupportFlowDiagram,
      implementationResult: "Na implementatie wordt een groot deel van de supportvragen automatisch afgehandeld. Hierdoor kan het team sneller reageren op complexere vragen en zijn de responstijden aanzienlijk verbeterd.",
    },
    {
      title: "Marketing- en rapportage-automatisering", icon: BarChart3,
      metrics: [
        { icon: Clock, value: "6 uur → 10 min", label: "Rapportagetijd", animation: { from: 6, to: 0, suffix: " uur", separator: " → " } },
        { icon: Zap, value: "100%", label: "Automatische dataverzameling", animation: { from: 0, to: 100, suffix: "%" } },
        { icon: TrendingUp, value: "Realtime", label: "Klantdashboards" },
        { icon: Target, value: "0", label: "Handmatige rapporten", animation: { from: 10, to: 0, suffix: "" } },
      ],
      context: "Een marketingbureau moest wekelijks rapporten maken voor klanten over advertentieprestaties en websiteverkeer. Deze werden handmatig samengesteld in spreadsheets.",
      problem: ["Handmatig data verzamelen uit Google Ads, Meta Ads en Analytics", "Meerdere uren werk per klantrapport per week", "Foutgevoelig door handmatige data-invoer", "Geen realtime inzicht in marketingprestaties"],
      solution: ["Automatisch marketingdata verzamelen en visualiseren", "Data ophalen uit advertentieplatforms via API's", "Automatisch data uit verschillende bronnen combineren", "Realtime dashboards en automatische rapportlevering"],
      results: ["Rapporten van uren naar automatisch gegenereerd", "Aanzienlijke tijdsbesparing per week", "Realtime inzicht in marketingprestaties", "Minder handmatig werk en minder fouten"],
      technology: ["Marketing data pipelines", "API data-ingestie", "Realtime dataverwerking", "Datatransformatie", "AI-prestatieanalyse", "Dashboard-automatisering", "Workflow-orchestratie", "Cross-platform integraties", "Geautomatiseerde rapportage", "Attributie-analytics"],
      technologyTags: [
        { label: "Marketing data pipelines", category: "data", tooltip: "Datastromen van ads en analytics naar één model." },
        { label: "API data-ingestie", category: "integrations", tooltip: "Haalt data op via Google/Meta/GA API's." },
        { label: "Realtime dataverwerking", category: "data", tooltip: "Verwerkt nieuwe data continu of op intervallen." },
        { label: "Datatransformatie", category: "data", tooltip: "Normaliseert metrics en maakt berekeningen uniform." },
        { label: "AI-prestatieanalyse", category: "ai", tooltip: "AI analyseert trends en anomalieën in prestaties." },
        { label: "Dashboard-automatisering", category: "automation", tooltip: "Vult dashboards automatisch en houdt ze up-to-date." },
        { label: "Workflow-orchestratie", category: "automation", tooltip: "Jobs, retries en monitoring van de pipeline." },
        { label: "Cross-platform integraties", category: "integrations", tooltip: "Combineert data over meerdere platforms." },
        { label: "Geautomatiseerde rapportage", category: "analytics", tooltip: "Genereert en verstuurt rapporten automatisch." },
        { label: "Attributie-analytics", category: "analytics", tooltip: "Inzicht in kanaalbijdrage en conversie-impact." },
      ],
      visual: MarketingFlowDiagram,
      implementationResult: "Rapporten die voorheen meerdere uren per week kostten om samen te stellen, worden nu automatisch gegenereerd. Teams hebben realtime inzicht in marketingprestaties en kunnen campagnes sneller optimaliseren.",
    },
  ],
};

// Backward compatible export
export const cases = casesByLang.en;
