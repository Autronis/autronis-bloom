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
    website?: string;
  };
  implementationResult?: string;
  logoSrc?: string;
}

export const cases: CaseStudy[] = [
  {
    title: "Lead generation and outreach automation",
    icon: Users,
    logoSrc: "/logo.png",
    metrics: [
      { icon: Clock, value: "25 → 5 min", label: "Lead processing per lead", animation: { from: 25, to: 5, suffix: " min", separator: " → " } },
      { icon: TrendingUp, value: "3–5×", label: "Higher outreach efficiency" },
      { icon: Mail, value: "0 → 50+", label: "Personalized emails/day", animation: { from: 0, to: 50, suffix: "+", separator: " → " } },
      { icon: Zap, value: "100%", label: "Automatic enrichment", animation: { from: 0, to: 100, suffix: "%" } },
    ],
    context: "Jobby wanted to reach more businesses with a small team. Finding leads and collecting contact information took a lot of time. The team primarily relied on manual searching and phone outreach.",
    problem: [
      "Manually searching for leads across platforms and databases",
      "Looking up contact info and company data separately (~25 min/lead)",
      "No insight into prospects' pain points",
      "Email outreach too time-consuming to deploy",
    ],
    solution: [
      "Automatically collect leads from multiple sources",
      "Enrich company information directly via data APIs",
      "AI-driven generation of personalized outreach emails",
      "Automatic synchronization of lead data with dashboard",
    ],
    results: [
      "Lead processing from 25 to 5 minutes per lead",
      "3–5× higher outreach efficiency",
      "From 0 to 50+ personalized emails per day",
      "More client conversations without additional team capacity",
    ],
    technology: [
      "LLM personalization", "Web scraping pipelines", "Data enrichment APIs",
      "Workflow orchestration", "Lead scoring AI", "Batch outreach automation",
      "CRM synchronization", "API integrations", "Data processing pipelines", "Prospect intelligence",
    ],
    technologyTags: [
      { label: "LLM personalization", category: "ai", tooltip: "AI writes outreach based on company context. Example: pain point + offer." },
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
    testimonial: {
      quote: "Thanks to Autronis, we work much more efficiently with our outreach. Where it used to take about 25 minutes to find and contact a lead, we now do it in about 5 to 10 minutes. On top of that, we now send dozens of personalized emails daily — something we barely did before. The system has truly helped us reach far more businesses with a small team.",
      name: "Rick Ruiterkamp",
      role: "Owner",
      company: "Jobby",
      logo: "/assets/jobby-logo.png",
      website: "https://teamjobby.nl/",
    },
  },
  {
    title: "AI customer service automation",
    icon: Bot,
    metrics: [
      { icon: Target, value: "70%+", label: "Questions handled automatically", animation: { from: 0, to: 70, suffix: "%+" } },
      { icon: Clock, value: "2 hrs → instant", label: "Response time" },
      { icon: TrendingUp, value: "60%+", label: "Fewer support tickets", animation: { from: 0, to: 60, suffix: "%+" } },
      { icon: Zap, value: "24/7", label: "Availability" },
    ],
    context: "A growing e-commerce company received many daily customer questions about orders, shipping, and returns. The support team spent most of their time on repetitive inquiries.",
    problem: [
      "High volume of repetitive questions (order status, returns, shipping)",
      "Response time increased due to growing volumes",
      "Support team overwhelmed with recurring questions",
      "No customer service outside business hours",
    ],
    solution: [
      "AI-driven system that automatically answers frequently asked questions",
      "Automatic order status checks via API integrations",
      "Complex questions automatically routed to a team member",
      "Customer interactions stored in CRM for context",
    ],
    results: [
      "70% of all customer questions handled automatically",
      "Response time from hours to instant",
      "Significantly fewer support tickets",
      "Customer service available 24/7",
    ],
    technology: [
      "LLM support agent", "RAG knowledge retrieval", "Vector search",
      "Intent classification", "Conversation orchestration", "API integrations",
      "CRM synchronization", "Context enrichment", "Automated escalation", "Response generation",
    ],
    technologyTags: [
      { label: "LLM support agent", category: "ai", tooltip: "AI agent that resolves questions in natural language." },
      { label: "RAG knowledge retrieval", category: "ai", tooltip: "Searches relevant knowledge and has AI answer based on it." },
      { label: "Vector search", category: "data", tooltip: "Semantic search based on embeddings." },
      { label: "Intent classification", category: "ai", tooltip: "Detects question type: order status, return, complaint, etc." },
      { label: "Conversation orchestration", category: "automation", tooltip: "Rules and flows for conversations and handoffs." },
      { label: "API integrations", category: "integrations", tooltip: "Connects webshop, ticket system, and CRM." },
      { label: "CRM synchronization", category: "integrations", tooltip: "Stores interactions for context and follow-up." },
      { label: "Context enrichment", category: "data", tooltip: "Adds order and customer data to the conversation." },
      { label: "Automated escalation", category: "automation", tooltip: "Automatically routes complex cases to a team member." },
      { label: "Response generation", category: "ai", tooltip: "Generates consistent answers in the right tone of voice." },
    ],
    visual: SupportFlowDiagram,
    implementationResult: "After implementation, a large portion of support questions are handled automatically. This allows the team to respond faster to more complex questions, and response times have improved significantly.",
  },
  {
    title: "Marketing and reporting automation",
    icon: BarChart3,
    metrics: [
      { icon: Clock, value: "6 hrs → 10 min", label: "Reporting time", animation: { from: 6, to: 0, suffix: " hrs", separator: " → " } },
      { icon: Zap, value: "100%", label: "Automatic data collection", animation: { from: 0, to: 100, suffix: "%" } },
      { icon: TrendingUp, value: "Real-time", label: "Client dashboards" },
      { icon: Target, value: "0", label: "Manual reports", animation: { from: 10, to: 0, suffix: "" } },
    ],
    context: "A marketing agency had to create weekly reports for clients on advertising performance and website traffic. These were manually compiled in spreadsheets.",
    problem: [
      "Manually collecting data from Google Ads, Meta Ads, and Analytics",
      "Multiple hours of work per client report per week",
      "Error-prone due to manual data entry",
      "No real-time insight into marketing performance",
    ],
    solution: [
      "Automatically collect and visualize marketing data",
      "Pull data from advertising platforms via APIs",
      "Automatically combine data from different sources",
      "Real-time dashboards and automatic report delivery",
    ],
    results: [
      "Reports from hours to automatically generated",
      "Significant time savings per week",
      "Real-time insight into marketing performance",
      "Less manual work and fewer errors",
    ],
    technology: [
      "Marketing data pipelines", "API data ingestion", "Real-time data processing",
      "Data transformation", "AI performance analysis", "Dashboard automation",
      "Workflow orchestration", "Cross-platform integrations", "Automated reporting", "Attribution analytics",
    ],
    technologyTags: [
      { label: "Marketing data pipelines", category: "data", tooltip: "Data flows from ads and analytics into one model." },
      { label: "API data ingestion", category: "integrations", tooltip: "Pulls data via Google/Meta/GA APIs." },
      { label: "Real-time data processing", category: "data", tooltip: "Processes new data continuously or at intervals." },
      { label: "Data transformation", category: "data", tooltip: "Normalizes metrics and makes calculations uniform." },
      { label: "AI performance analysis", category: "ai", tooltip: "AI analyzes trends and anomalies in performance." },
      { label: "Dashboard automation", category: "automation", tooltip: "Automatically populates and updates dashboards." },
      { label: "Workflow orchestration", category: "automation", tooltip: "Jobs, retries, and monitoring of the pipeline." },
      { label: "Cross-platform integrations", category: "integrations", tooltip: "Combines data across multiple platforms." },
      { label: "Automated reporting", category: "analytics", tooltip: "Automatically generates and sends reports." },
      { label: "Attribution analytics", category: "analytics", tooltip: "Insight into channel contribution and conversion impact." },
    ],
    visual: MarketingFlowDiagram,
    implementationResult: "Reports that previously took multiple hours per week to compile are now generated automatically. Teams have real-time insight into marketing performance and can optimize campaigns faster.",
  },
];
