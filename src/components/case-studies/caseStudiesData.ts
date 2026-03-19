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
  workflowImage?: { src: string; caption: string };
  beforeAfter?: { label: string; before: number; after: number; unit: string; }[];
}

type LangCases = Record<"en" | "nl", CaseStudy[]>;

export const casesByLang: LangCases = {
  en: [
    {
      title: "Lead generation and outreach automation", icon: Users, logoSrc: "/logo.png",
      metrics: [
        { icon: Clock, value: "25 → 5 min", label: "Lead processing per lead", animation: { from: 25, to: 5, suffix: " min", separator: " → " } },
        { icon: TrendingUp, value: "3–5×", label: "Higher outreach efficiency" },
        { icon: Mail, value: "3 → 50+", label: "Personalized emails/day", animation: { from: 3, to: 50, suffix: "+", separator: " → " } },
        { icon: Zap, value: "100%", label: "Automatic enrichment", animation: { from: 0, to: 100, suffix: "%" } },
      ],
      context: "Jobby wanted to reach more businesses with a small team. Finding leads and collecting contact information took a lot of time. The team primarily relied on manual searching and phone outreach.",
      problem: ["Manually searching for leads across platforms and databases", "Looking up contact info and company data separately (~25 min/lead)", "No insight into prospects' pain points", "Email outreach too time-consuming to deploy"],
      solution: ["Automatically collect leads from multiple sources", "Enrich company information directly via data APIs", "AI-driven generation of personalized outreach emails", "Automatic synchronization of lead data with dashboard"],
      results: ["Lead processing from 25 to 5 minutes per lead", "3–5× higher outreach efficiency", "From 3 to 50+ personalized emails per day", "More client conversations without additional team capacity"],
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
      workflowImage: { src: "/assets/jobby-workflow.png", caption: "The complete n8n workflow built for Jobby — lead scraping, AI enrichment, email generation and CRM sync." },
      beforeAfter: [
        { label: "Time per lead", before: 25, after: 5, unit: "min" },
        { label: "Daily emails", before: 3, after: 50, unit: "" },
        { label: "Outreach efficiency", before: 20, after: 80, unit: "%" },
      ],
      testimonial: { quote: "Thanks to Autronis, we work much more efficiently with our outreach. Where it used to take about 25 minutes to find and contact a lead, we now do it in about 5 to 10 minutes. On top of that, we now send dozens of personalized emails daily — something we barely did before. The system has truly helped us reach far more businesses with a small team.", name: "Rick Ruiterkamp", role: "Owner", company: "Jobby", logo: "/assets/jobby-logo.png", website: "https://teamjobby.nl/" },
    },
  ],
  nl: [
    {
      title: "Leadgeneratie en outreach-automatisering", icon: Users, logoSrc: "/logo.png",
      metrics: [
        { icon: Clock, value: "25 → 5 min", label: "Leadverwerking per lead", animation: { from: 25, to: 5, suffix: " min", separator: " → " } },
        { icon: TrendingUp, value: "3–5×", label: "Hogere outreach-efficiëntie" },
        { icon: Mail, value: "3 → 50+", label: "Gepersonaliseerde e-mails/dag", animation: { from: 3, to: 50, suffix: "+", separator: " → " } },
        { icon: Zap, value: "100%", label: "Automatische verrijking", animation: { from: 0, to: 100, suffix: "%" } },
      ],
      context: "Jobby wilde met een klein team meer bedrijven bereiken. Het vinden van leads en het verzamelen van contactgegevens kostte veel tijd. Het team vertrouwde voornamelijk op handmatig zoeken en telefonische outreach.",
      problem: ["Handmatig zoeken naar leads op platforms en in databases", "Contactgegevens en bedrijfsdata apart opzoeken (~25 min/lead)", "Geen inzicht in pijnpunten van prospects", "E-mail outreach te tijdrovend om in te zetten"],
      solution: ["Automatisch leads verzamelen uit meerdere bronnen", "Bedrijfsinformatie direct verrijken via data-API's", "AI-gestuurde generatie van gepersonaliseerde outreach-e-mails", "Automatische synchronisatie van leaddata met dashboard"],
      results: ["Leadverwerking van 25 naar 5 minuten per lead", "3–5× hogere outreach-efficiëntie", "Van 3 naar 50+ gepersonaliseerde e-mails per dag", "Meer klantgesprekken zonder extra teamcapaciteit"],
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
      workflowImage: { src: "/assets/jobby-workflow.png", caption: "De volledige n8n workflow gebouwd voor Jobby — lead scraping, AI-verrijking, e-mailgeneratie en CRM-sync." },
      beforeAfter: [
        { label: "Tijd per lead", before: 25, after: 5, unit: "min" },
        { label: "Dagelijkse e-mails", before: 3, after: 50, unit: "" },
        { label: "Outreach efficiëntie", before: 20, after: 80, unit: "%" },
      ],
      testimonial: { quote: "Dankzij Autronis werken we veel efficiënter met onze outreach. Waar het voorheen ongeveer 25 minuten kostte om een lead te vinden en te contacteren, doen we dat nu in ongeveer 5 tot 10 minuten. Daarnaast versturen we nu dagelijks tientallen gepersonaliseerde e-mails — iets wat we daarvoor nauwelijks deden. Het systeem heeft ons echt geholpen om met een klein team veel meer bedrijven te bereiken.", name: "Rick Ruiterkamp", role: "Eigenaar", company: "Jobby", logo: "/assets/jobby-logo.png", website: "https://teamjobby.nl/" },
    },
  ],
};

// Backward compatible export
export const cases = casesByLang.en;
