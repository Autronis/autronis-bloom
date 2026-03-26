import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, RotateCcw, Zap, ArrowDown, Clock, TrendingUp, ChevronRight, Users, FileText, ShoppingCart, MessageSquare, BarChart3, Share2, Database, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/context";

type SystemCategory = "crm" | "finance" | "ecommerce" | "communication" | "data" | "productivity" | "ai";

interface SystemOption {
  id: string;
  name: string;
  logo: string;
  category: SystemCategory;
  desc: { en: string; nl: string };
}

type StepDef = { text: { en: string; nl: string }; tools?: string[] };

interface AutomationResult {
  icon: typeof Zap;
  title: { en: string; nl: string };
  description: { en: string; nl: string };
  steps: StepDef[];
  timeSaved: string;
  impact: { en: string; nl: string };
  systems: string[];
}

export const workflowSystems: SystemOption[] = [
  // CRM
  { id: "hubspot", name: "HubSpot", logo: "/logos/hubspot.svg", category: "crm", desc: { en: "Marketing, sales & CRM platform", nl: "Marketing, sales & CRM platform" } },
  { id: "salesforce", name: "Salesforce", logo: "/logos/salesforce.svg", category: "crm", desc: { en: "Enterprise CRM & cloud platform", nl: "Enterprise CRM & cloudplatform" } },
  { id: "pipedrive", name: "Pipedrive", logo: "/logos/pipedrive.svg", category: "crm", desc: { en: "Sales pipeline management", nl: "Sales pipeline management" } },
  { id: "mailchimp", name: "Mailchimp", logo: "/logos/mailchimp.svg", category: "crm", desc: { en: "Email marketing & automation", nl: "E-mailmarketing & automatisering" } },
  // Finance
  { id: "exact", name: "Exact", logo: "/logos/exact.svg", category: "finance", desc: { en: "Dutch accounting & ERP software", nl: "Nederlandse boekhouding & ERP" } },
  { id: "xero", name: "Xero", logo: "/logos/xero.svg", category: "finance", desc: { en: "Cloud accounting software", nl: "Cloud boekhoudsoftware" } },
  { id: "quickbooks", name: "QuickBooks", logo: "/logos/quickbooks.svg", category: "finance", desc: { en: "Accounting & invoicing", nl: "Boekhouding & facturatie" } },
  { id: "stripe", name: "Stripe", logo: "/logos/stripe.svg", category: "finance", desc: { en: "Online payment processing", nl: "Online betalingsverwerking" } },
  { id: "mollie", name: "Mollie", logo: "/logos/mollie.svg", category: "finance", desc: { en: "European payment provider", nl: "Europese betaalprovider" } },
  { id: "paypal", name: "PayPal", logo: "/logos/paypal.svg", category: "finance", desc: { en: "Global payment platform", nl: "Wereldwijd betaalplatform" } },
  // E-commerce
  { id: "shopify", name: "Shopify", logo: "/logos/shopify.svg", category: "ecommerce", desc: { en: "E-commerce platform", nl: "E-commerce platform" } },
  { id: "woocommerce", name: "WooCommerce", logo: "/logos/woocommerce.svg", category: "ecommerce", desc: { en: "WordPress webshop plugin", nl: "WordPress webshop plugin" } },
  { id: "magento", name: "Magento", logo: "/logos/magento.svg", category: "ecommerce", desc: { en: "Enterprise e-commerce", nl: "Enterprise e-commerce" } },
  // Communication
  { id: "slack", name: "Slack", logo: "/logos/slack.svg", category: "communication", desc: { en: "Team messaging & collaboration", nl: "Team messaging & samenwerking" } },
  { id: "whatsapp", name: "WhatsApp", logo: "/logos/whatsapp.svg", category: "communication", desc: { en: "Business messaging", nl: "Zakelijke messaging" } },
  { id: "twilio", name: "Twilio", logo: "/logos/twilio.svg", category: "communication", desc: { en: "SMS, voice & video API's", nl: "SMS, voice & video API's" } },
  { id: "google-workspace", name: "Google Workspace", logo: "/logos/google-workspace.svg", category: "communication", desc: { en: "Gmail, Drive, Calendar & Docs", nl: "Gmail, Drive, Calendar & Docs" } },
  { id: "microsoft-365", name: "Microsoft 365", logo: "/logos/microsoft-365.svg", category: "communication", desc: { en: "Outlook, Teams, OneDrive & Office", nl: "Outlook, Teams, OneDrive & Office" } },
  { id: "instagram", name: "Instagram", logo: "/logos/instagram.svg", category: "communication", desc: { en: "Social media & marketing", nl: "Social media & marketing" } },
  // Data
  { id: "supabase", name: "Supabase", logo: "/logos/supabase.svg", category: "data", desc: { en: "Open-source backend & database", nl: "Open-source backend & database" } },
  { id: "postgresql", name: "PostgreSQL", logo: "/logos/postgresql.svg", category: "data", desc: { en: "Relational database", nl: "Relationele database" } },
  { id: "mongodb", name: "MongoDB", logo: "/logos/mongodb.svg", category: "data", desc: { en: "NoSQL document database", nl: "NoSQL document database" } },
  { id: "mysql", name: "MySQL", logo: "/logos/mysql.svg", category: "data", desc: { en: "Relational database", nl: "Relationele database" } },
  { id: "power-bi", name: "Power BI", logo: "/logos/power-bi.svg", category: "data", desc: { en: "Microsoft BI & dashboards", nl: "Microsoft BI & dashboards" } },
  { id: "google-analytics", name: "Google Analytics", logo: "/logos/google-analytics.svg", category: "data", desc: { en: "Website & app analytics", nl: "Website & app analytics" } },
  { id: "google-sheets", name: "Google Sheets", logo: "/logos/google-sheets.svg", category: "data", desc: { en: "Cloud spreadsheets", nl: "Cloud spreadsheets" } },
  { id: "looker-studio", name: "Looker Studio", logo: "/logos/looker-studio.svg", category: "data", desc: { en: "Google data visualization", nl: "Google datavisualisatie" } },
  // Productivity
  { id: "airtable", name: "Airtable", logo: "/logos/airtable.svg", category: "productivity", desc: { en: "Spreadsheet-database hybrid", nl: "Spreadsheet-database hybride" } },
  { id: "notion", name: "Notion", logo: "/logos/notion.svg", category: "productivity", desc: { en: "Docs, wikis & project management", nl: "Docs, wiki's & projectmanagement" } },
  { id: "retool", name: "Retool", logo: "/logos/retool.svg", category: "productivity", desc: { en: "Internal tool builder", nl: "Interne tool builder" } },
  { id: "github", name: "GitHub", logo: "/logos/github.svg", category: "productivity", desc: { en: "Code hosting & version control", nl: "Code hosting & versiebeheer" } },
  // AI
  { id: "openai", name: "OpenAI", logo: "/logos/openai.svg", category: "ai", desc: { en: "GPT models & AI API", nl: "GPT modellen & AI API" } },
  { id: "anthropic", name: "Anthropic", logo: "/logos/anthropic.svg", category: "ai", desc: { en: "Claude AI models", nl: "Claude AI modellen" } },
  { id: "langchain", name: "LangChain", logo: "/logos/langchain.svg", category: "ai", desc: { en: "LLM application framework", nl: "LLM applicatie framework" } },
];

const categoryLabels: Record<SystemCategory, { en: string; nl: string }> = {
  crm: { en: "CRM", nl: "CRM" },
  finance: { en: "Finance & Payments", nl: "Finance & Betalingen" },
  ecommerce: { en: "E-commerce", nl: "E-commerce" },
  communication: { en: "Communication", nl: "Communicatie" },
  data: { en: "Data & Analytics", nl: "Data & Analytics" },
  productivity: { en: "Productivity", nl: "Productiviteit" },
  ai: { en: "AI & Machine Learning", nl: "AI & Machine Learning" },
};

const automationTemplates: AutomationResult[] = [
  {
    icon: Users,
    title: { en: "Lead-to-Deal Pipeline", nl: "Lead-naar-Deal Pipeline" },
    description: { en: "Automatically capture, enrich, score, and route leads through your entire sales pipeline — from first touch to closed deal.", nl: "Vang automatisch leads op, verrijk ze, scoor ze en routeer ze door je hele sales pipeline — van eerste contact tot gesloten deal." },
    steps: [
      { text: { en: "New lead captured via form, ad, or import into CRM", nl: "Nieuwe lead binnengehaald via formulier, advertentie of import in CRM" }, tools: ["hubspot", "salesforce", "pipedrive"] },
      { text: { en: "AI enriches contact with company size, industry, and revenue data", nl: "AI verrijkt contact met bedrijfsgrootte, branche en omzetgegevens" }, tools: ["openai"] },
      { text: { en: "Lead score calculated based on behavior, fit, and engagement", nl: "Leadscore berekend op basis van gedrag, fit en engagement" }, tools: ["hubspot", "salesforce"] },
      { text: { en: "High-scoring leads auto-assigned to the right sales rep via Slack", nl: "Hoog scorende leads automatisch toegewezen aan juiste sales rep via Slack" }, tools: ["slack"] },
      { text: { en: "Personalized follow-up email sequence triggered based on lead segment", nl: "Gepersonaliseerde follow-up e-mailreeks getriggerd op basis van segment" }, tools: ["mailchimp", "hubspot"] },
      { text: { en: "Deal stage updates automatically as prospect engages — no manual CRM updates", nl: "Deal-fase updatet automatisch naarmate prospect interacteert — geen handmatige CRM-updates" }, tools: ["hubspot", "salesforce", "pipedrive"] },
    ],
    timeSaved: "15-20", impact: { en: "2x faster lead response time", nl: "2x snellere lead responstijd" },
    systems: ["hubspot", "salesforce", "pipedrive", "mailchimp", "slack", "google-workspace", "microsoft-365", "openai"],
  },
  {
    icon: ShoppingCart,
    title: { en: "Order & Invoice Automation", nl: "Order- & Facturatieflow" },
    description: { en: "End-to-end order processing — from webshop order to invoice, inventory update, and customer notification, fully automated.", nl: "End-to-end orderverwerking — van webshop bestelling tot factuur, voorraadupdate en klantnotificatie, volledig geautomatiseerd." },
    steps: [
      { text: { en: "Customer places order in webshop — webhook triggers automation", nl: "Klant plaatst bestelling in webshop — webhook triggert automatisering" }, tools: ["shopify", "woocommerce", "magento"] },
      { text: { en: "Payment status verified — fraud check completed", nl: "Betaalstatus geverifieerd — fraudecheck uitgevoerd" }, tools: ["stripe", "mollie", "paypal"] },
      { text: { en: "Invoice automatically created with correct VAT and line items", nl: "Factuur automatisch aangemaakt met juiste BTW en regelitems" }, tools: ["exact", "xero", "quickbooks"] },
      { text: { en: "Inventory levels updated across all sales channels in real-time", nl: "Voorraadniveaus bijgewerkt over alle verkoopkanalen in realtime" }, tools: ["shopify", "airtable"] },
      { text: { en: "Shipping label generated and tracking number sent to customer", nl: "Verzendlabel gegenereerd en trackingnummer verstuurd naar klant" }, tools: ["google-workspace"] },
      { text: { en: "Post-delivery: review request email sent after 7 days", nl: "Na levering: review-verzoek e-mail na 7 dagen" }, tools: ["mailchimp", "hubspot"] },
    ],
    timeSaved: "10-15", impact: { en: "73% faster order processing", nl: "73% snellere orderverwerking" },
    systems: ["shopify", "woocommerce", "magento", "exact", "xero", "quickbooks", "stripe", "mollie", "paypal", "slack"],
  },
  {
    icon: BarChart3,
    title: { en: "Real-time KPI Dashboard", nl: "Realtime KPI Dashboard" },
    description: { en: "Consolidate data from all your tools into one live dashboard with automated alerts, weekly reports, and AI-powered trend analysis.", nl: "Consolideer data uit al je tools in één live dashboard met automatische alerts, wekelijkse rapporten en AI-gestuurde trendanalyse." },
    steps: [
      { text: { en: "Data sources connected: CRM, accounting, webshop, marketing, and databases", nl: "Databronnen verbonden: CRM, boekhouding, webshop, marketing en databases" }, tools: ["postgresql", "supabase", "mongodb", "mysql"] },
      { text: { en: "ETL pipeline transforms raw data into clean, normalized metrics every 15 min", nl: "ETL-pipeline transformeert ruwe data naar genormaliseerde metrics elke 15 min" }, tools: ["supabase", "google-sheets"] },
      { text: { en: "Interactive dashboard built with drill-down per team, region, and time period", nl: "Interactief dashboard gebouwd met drill-down per team, regio en tijdsperiode" }, tools: ["power-bi", "looker-studio"] },
      { text: { en: "Anomaly detection alerts team when KPIs deviate from expected ranges", nl: "Anomaliedetectie alert team bij KPI-afwijkingen van verwachte ranges" }, tools: ["slack"] },
      { text: { en: "Automated PDF/email report generated and distributed every Monday morning", nl: "Geautomatiseerd PDF/e-mail rapport verstuurd elke maandagochtend" }, tools: ["google-workspace"] },
      { text: { en: "AI analyzes trends weekly and surfaces actionable insights for management", nl: "AI analyseert trends wekelijks en brengt actionable inzichten voor management" }, tools: ["openai"] },
    ],
    timeSaved: "8-12", impact: { en: "Single source of truth for all KPIs", nl: "Eén waarheid voor alle KPI's" },
    systems: ["supabase", "postgresql", "mongodb", "mysql", "power-bi", "looker-studio", "google-sheets", "airtable", "google-analytics", "openai"],
  },
  {
    icon: MessageSquare,
    title: { en: "Customer Communication Hub", nl: "Klantcommunicatie Hub" },
    description: { en: "Centralize all customer touchpoints — route messages from every channel to one inbox with AI categorization and smart auto-replies.", nl: "Centraliseer alle klantcontactpunten — routeer berichten van elk kanaal naar één inbox met AI-categorisatie en slimme auto-replies." },
    steps: [
      { text: { en: "Message arrives via WhatsApp, email, Instagram DM, or Slack — unified queue", nl: "Bericht komt binnen via WhatsApp, email, Instagram DM of Slack — één wachtrij" }, tools: ["whatsapp", "instagram", "slack"] },
      { text: { en: "AI classifies intent (support, sales, billing, urgent) and sentiment", nl: "AI classificeert intentie (support, sales, facturatie, urgent) en sentiment" }, tools: ["openai", "anthropic"] },
      { text: { en: "Routed to the right team member based on topic and availability", nl: "Gerouteerd naar juiste teamlid op basis van onderwerp en beschikbaarheid" }, tools: ["slack", "microsoft-365"] },
      { text: { en: "For FAQ-type questions: AI drafts a response or auto-sends", nl: "Voor FAQ-vragen: AI stelt antwoord op of stuurt automatisch" }, tools: ["openai", "anthropic"] },
      { text: { en: "Conversation logged as activity in CRM with full context and tags", nl: "Conversatie gelogd als activiteit in CRM met volledige context en tags" }, tools: ["hubspot", "salesforce"] },
      { text: { en: "Response time and resolution metrics tracked per channel and agent", nl: "Responstijd en resolutie-metrics bijgehouden per kanaal en agent" }, tools: ["power-bi", "google-sheets"] },
    ],
    timeSaved: "12-18", impact: { en: "60% faster response times", nl: "60% snellere responstijden" },
    systems: ["slack", "whatsapp", "twilio", "google-workspace", "microsoft-365", "instagram", "hubspot", "anthropic", "openai"],
  },
  {
    icon: Globe,
    title: { en: "E-commerce Growth Engine", nl: "E-commerce Groei Engine" },
    description: { en: "Automate your entire e-commerce operations — product syncing, dynamic pricing, inventory, abandoned carts, and personalized retargeting.", nl: "Automatiseer je hele e-commerce operatie — productsync, dynamische prijzen, voorraad, verlaten wagens en gepersonaliseerde retargeting." },
    steps: [
      { text: { en: "Products synced across webshop, marketplaces, and POS", nl: "Producten gesynchroniseerd over webshop, marketplaces en POS" }, tools: ["shopify", "woocommerce", "magento"] },
      { text: { en: "Dynamic pricing engine adjusts based on demand and margins", nl: "Dynamische pricing-engine past aan op basis van vraag en marge" }, tools: ["shopify", "airtable"] },
      { text: { en: "Inventory alerts trigger at low stock — auto-reorder to supplier", nl: "Voorraadalerts bij lage stock — automatische herbestelling naar leverancier" }, tools: ["shopify", "slack"] },
      { text: { en: "Abandoned cart detected → personalized recovery email within 1 hour", nl: "Verlaten winkelwagen → gepersonaliseerde herstel-e-mail binnen 1 uur" }, tools: ["mailchimp", "hubspot"] },
      { text: { en: "Post-purchase: segmented email flows for upsell and loyalty", nl: "Na aankoop: gesegmenteerde e-mailflows voor upsell en loyaliteit" }, tools: ["mailchimp", "hubspot", "stripe"] },
      { text: { en: "Weekly performance report: revenue, conversion rate, CAC, LTV per channel", nl: "Wekelijks rapport: omzet, conversieratio, CAC, LTV per kanaal" }, tools: ["google-analytics", "google-sheets"] },
    ],
    timeSaved: "20-25", impact: { en: "2.4x more conversions", nl: "2,4x meer conversies" },
    systems: ["shopify", "woocommerce", "magento", "hubspot", "mailchimp", "stripe", "google-workspace", "google-analytics", "instagram"],
  },
  {
    icon: FileText,
    title: { en: "Smart Document Processing", nl: "Slimme Documentverwerking" },
    description: { en: "AI reads invoices, contracts, and forms — extracts data, validates it, and routes it to the right system without human intervention.", nl: "AI leest facturen, contracten en formulieren — extraheert data, valideert het en routeert het naar het juiste systeem zonder menselijke tussenkomst." },
    steps: [
      { text: { en: "Document arrives via email attachment, upload portal, or scan", nl: "Document komt binnen via e-mailbijlage, upload-portaal of scan" }, tools: ["google-workspace", "microsoft-365"] },
      { text: { en: "AI extracts structured data: amounts, dates, names, line items", nl: "AI extraheert gestructureerde data: bedragen, datums, namen, regelitems" }, tools: ["openai", "anthropic", "langchain"] },
      { text: { en: "Extracted data validated against business rules and existing records", nl: "Geëxtraheerde data gevalideerd tegen bedrijfsregels en bestaande records" } },
      { text: { en: "Matched to correct vendor/customer in CRM and accounting", nl: "Gematcht aan juiste leverancier/klant in CRM en boekhouding" }, tools: ["hubspot", "exact", "xero"] },
      { text: { en: "Entry created in database with full audit trail and confidence score", nl: "Entry aangemaakt in database met audit trail en betrouwbaarheidsscore" }, tools: ["supabase", "airtable"] },
      { text: { en: "Exceptions flagged for human review — team notified with context", nl: "Uitzonderingen gemarkeerd voor review — team genotificeerd met context" }, tools: ["slack", "notion"] },
    ],
    timeSaved: "15-20", impact: { en: "95% less manual data entry", nl: "95% minder handmatige invoer" },
    systems: ["openai", "anthropic", "langchain", "google-workspace", "microsoft-365", "exact", "xero", "supabase", "airtable", "notion"],
  },
  {
    icon: Share2,
    title: { en: "Social Media & Marketing Automation", nl: "Social Media & Marketing Automatisering" },
    description: { en: "Automate your entire marketing pipeline — content creation, scheduling, lead capture, CRM enrichment, and performance analytics.", nl: "Automatiseer je hele marketingpipeline — contentcreatie, scheduling, lead capture, CRM-verrijking en prestatieanalytics." },
    steps: [
      { text: { en: "AI generates content ideas based on trending topics and performance data", nl: "AI genereert content-ideeën op basis van trending topics en prestatiedata" }, tools: ["openai"] },
      { text: { en: "Content scheduled and published across Instagram, LinkedIn, and email", nl: "Content gepland en gepubliceerd over Instagram, LinkedIn en e-mail" }, tools: ["instagram", "mailchimp"] },
      { text: { en: "Lead magnet downloads and form fills auto-create enriched CRM contacts", nl: "Lead magnet downloads maken automatisch verrijkte CRM-contacten" }, tools: ["hubspot", "mailchimp"] },
      { text: { en: "Leads segmented by interest and behavior — tagged for nurturing", nl: "Leads gesegmenteerd op interesse en gedrag — getagd voor nurturing" }, tools: ["hubspot"] },
      { text: { en: "Campaign performance tracked: engagement, CTR, conversions, cost per lead", nl: "Campagneprestaties: engagement, CTR, conversies, kosten per lead" }, tools: ["google-analytics"] },
      { text: { en: "Weekly AI-generated marketing report with recommendations sent to team", nl: "Wekelijks AI-rapport met aanbevelingen naar team gestuurd" }, tools: ["openai", "slack", "notion"] },
    ],
    timeSaved: "10-15", impact: { en: "3x more consistent posting", nl: "3x consistentere posting" },
    systems: ["instagram", "hubspot", "mailchimp", "google-analytics", "openai", "slack", "notion", "google-workspace"],
  },
  {
    icon: Database,
    title: { en: "Data Sync & Backup", nl: "Data Sync & Backup" },
    description: { en: "Keep all databases and tools in perfect sync with bi-directional data flows, intelligent conflict resolution, and automated backups.", nl: "Houd alle databases en tools perfect gesynchroniseerd met tweerichtings-dataflows, intelligente conflictresolutie en automatische backups." },
    steps: [
      { text: { en: "Change detection via webhooks monitors all connected systems in real-time", nl: "Wijzigingsdetectie via webhooks monitort alle verbonden systemen in realtime" }, tools: ["supabase", "postgresql"] },
      { text: { en: "Bi-directional sync ensures updates reflect everywhere within seconds", nl: "Tweerichtings-sync zorgt dat updates overal binnen seconden reflecteren" }, tools: ["airtable", "google-sheets"] },
      { text: { en: "Conflict resolution rules handle simultaneous edits by priority", nl: "Conflictresolutieregels handelen gelijktijdige bewerkingen af op prioriteit" } },
      { text: { en: "Data transformation layer normalizes formats across systems", nl: "Datatransformatielaag normaliseert formaten over systemen" }, tools: ["retool"] },
      { text: { en: "Scheduled full backups to secure cloud storage with encryption", nl: "Geplande volledige backups naar beveiligde cloudopslag met encryptie" }, tools: ["supabase", "github"] },
      { text: { en: "Health dashboard monitors sync status — alerts on failures with auto-retry", nl: "Health dashboard monitort sync-status — alerts bij fouten met auto-retry" }, tools: ["slack", "notion"] },
    ],
    timeSaved: "5-8", impact: { en: "Zero data inconsistencies", nl: "Nul data-inconsistenties" },
    systems: ["supabase", "postgresql", "mongodb", "mysql", "airtable", "google-sheets", "retool", "notion", "github", "google-workspace"],
  },
];

function getRelevantAutomations(selectedIds: string[]): AutomationResult[] {
  if (selectedIds.length === 0) return [];

  const scored = automationTemplates.map((template) => {
    const matchCount = template.systems.filter((s) => selectedIds.includes(s)).length;
    return { template, score: matchCount };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((s) => s.template);
}

const t2 = {
  en: {
    step1Title: "Select your current tools",
    step1Desc: "Click on the systems and tools you currently use in your business.",
    step2Title: "Your automation opportunities",
    step2Desc: "Based on your tool stack, here's what we can automate for you.",
    selected: "tools selected",
    showResults: "Show automation opportunities",
    reset: "Start over",
    timeSaved: "Saved weekly",
    automatedFlow: "Automated flow",
    ctaTitle: "Want to see the full picture?",
    ctaDesc: "These are just examples. Schedule a free Automation Scan and we'll map every opportunity specific to your business.",
    ctaButton: "Schedule Free Automation Scan",
    noResults: "Select at least 2 tools to see automation opportunities.",
    totalSaved: "Total estimated time saved",
    perWeek: "/week",
  },
  nl: {
    step1Title: "Selecteer je huidige tools",
    step1Desc: "Klik op de systemen en tools die je momenteel gebruikt in je bedrijf.",
    step2Title: "Jouw automatiseringsmogelijkheden",
    step2Desc: "Op basis van je tool stack, dit is wat we voor je kunnen automatiseren.",
    selected: "tools geselecteerd",
    showResults: "Toon automatiseringsmogelijkheden",
    reset: "Opnieuw beginnen",
    timeSaved: "Besparing per week",
    automatedFlow: "Geautomatiseerde flow",
    ctaTitle: "Wil je het volledige plaatje zien?",
    ctaDesc: "Dit zijn slechts voorbeelden. Plan een gratis Automation Scan en we brengen elke mogelijkheid specifiek voor jouw bedrijf in kaart.",
    ctaButton: "Plan Gratis Automation Scan",
    noResults: "Selecteer minimaal 2 tools om automatiseringsmogelijkheden te zien.",
    totalSaved: "Totale geschatte tijdsbesparing",
    perWeek: "/week",
  },
};

interface WorkflowBuilderProps {
  externalSelected?: string[];
  onExternalToggle?: (id: string) => void;
}

const WorkflowBuilder = ({ externalSelected, onExternalToggle }: WorkflowBuilderProps = {}) => {
  const lang = useLanguage();
  const tx = t2[lang];
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const selected = externalSelected ?? internalSelected;

  const toggleSystem = useCallback((id: string) => {
    if (onExternalToggle) {
      onExternalToggle(id);
    } else {
      setInternalSelected((prev) =>
        prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
      );
    }
    setShowResults(false);
    setExpandedCard(null);
  }, [onExternalToggle]);

  const reset = () => {
    if (onExternalToggle) {
      selected.forEach((id) => onExternalToggle(id));
    } else {
      setInternalSelected([]);
    }
    setShowResults(false);
    setExpandedCard(null);
  };

  const results = getRelevantAutomations(selected);
  const categories = Object.keys(categoryLabels) as SystemCategory[];

  // Calculate total time saved
  const totalTimeSaved = results.reduce((acc, r) => {
    const match = r.timeSaved.match(/(\d+)-(\d+)/);
    if (match) return acc + (parseInt(match[1]) + parseInt(match[2])) / 2;
    return acc;
  }, 0);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Step 1: System Selection */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            1
          </span>
          <h3 className="text-xl font-bold">{tx.step1Title}</h3>
        </div>
        <p className="text-sm text-muted-foreground ml-11 mb-6">{tx.step1Desc}</p>

        <div className="space-y-5 ml-11">
          {categories.map((category) => {
            const categorySystems = workflowSystems.filter((s) => s.category === category);
            if (categorySystems.length === 0) return null;

            return (
              <div key={category}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">
                  {categoryLabels[category][lang]}
                </p>
                <div className="flex flex-wrap gap-2">
                  <TooltipProvider delayDuration={200}>
                    {categorySystems.map((system) => {
                      const isSelected = selected.includes(system.id);
                      return (
                        <Tooltip key={system.id}>
                          <TooltipTrigger asChild>
                            <motion.button
                              onClick={() => toggleSystem(system.id)}
                              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                isSelected
                                  ? "border-primary bg-primary/10 text-foreground shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
                                  : "border-border bg-card hover:border-primary/30 text-muted-foreground hover:text-foreground"
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <img
                                src={system.logo}
                                alt={system.name}
                                className={`w-5 h-5 object-contain `}
                              />
                              {system.name}
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                                >
                                  <Check size={10} className="text-primary-foreground" />
                                </motion.div>
                              )}
                            </motion.button>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-[11px]">
                            {system.desc[lang]}
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </TooltipProvider>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected count + show results */}
        <div className="ml-11 mt-8 flex items-center gap-4 flex-wrap">
          {selected.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm"
            >
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                {selected.length}
              </span>
              <span className="text-muted-foreground">{tx.selected}</span>
            </motion.div>
          )}
          {selected.length >= 2 && !showResults && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <Button onClick={() => setShowResults(true)} size="lg" className="gap-2">
                <Zap size={16} />
                {tx.showResults}
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          )}
          {selected.length > 0 && (
            <button
              onClick={reset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              <RotateCcw size={14} />
              {tx.reset}
            </button>
          )}
        </div>

        {selected.length > 0 && selected.length < 2 && (
          <p className="ml-11 mt-4 text-sm text-muted-foreground/70">{tx.noResults}</p>
        )}
      </div>

      {/* Animated arrow */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
            >
              <ArrowDown size={24} className="text-primary" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: Results */}
      <AnimatePresence>
        {showResults && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </span>
              <h3 className="text-xl font-bold">{tx.step2Title}</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-11 mb-4">{tx.step2Desc}</p>

            {/* Total time saved banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="ml-11 mb-6 rounded-xl bg-primary/5 border border-primary/20 px-5 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{tx.totalSaved}</p>
                  <p className="text-2xl font-bold text-primary">
                    ~{Math.round(totalTimeSaved)}h <span className="text-sm font-normal text-muted-foreground">{tx.perWeek}</span>
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4 ml-11">
              {results.map((result, idx) => {
                const matchedSystems = workflowSystems.filter(
                  (s) => result.systems.includes(s.id) && selected.includes(s.id)
                );
                const isExpanded = expandedCard === idx;

                return (
                  <motion.div
                    key={result.title[lang]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-xl border border-border bg-card overflow-hidden hover:border-primary/30 transition-all duration-300"
                  >
                    {/* Card header */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <result.icon size={16} className="text-primary" />
                          </div>
                          <h4 className="text-base font-bold text-foreground">
                            {result.title[lang]}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                            <Clock size={11} />
                            {result.timeSaved}h {tx.perWeek}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {result.description[lang]}
                      </p>

                      {/* Connected systems */}
                      <div className="flex items-center gap-1.5 flex-wrap mb-3">
                        {matchedSystems.map((sys, sysIdx) => (
                          <div key={sys.id} className="flex items-center">
                            <div className="w-8 h-8 rounded-lg bg-muted/80 flex items-center justify-center border border-border/50">
                              <img
                                src={sys.logo}
                                alt={sys.name}
                                className={`w-4 h-4 object-contain `}
                              />
                            </div>
                            {sysIdx < matchedSystems.length - 1 && (
                              <div className="w-4 flex items-center justify-center">
                                <ChevronRight size={12} className="text-primary/40" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Impact badge */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-foreground/70 bg-muted px-2.5 py-1 rounded-md">
                          {result.impact[lang]}
                        </span>
                      </div>

                      {/* Expand button */}
                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : idx)}
                        className="mt-3 text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                      >
                        {isExpanded
                          ? (lang === "nl" ? "Verberg flow" : "Hide flow")
                          : (lang === "nl" ? "Bekijk geautomatiseerde flow" : "View automated flow")}
                        <ChevronRight
                          size={12}
                          className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Expandable flow steps */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-2 border-t border-border/50">
                            <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wider">
                              {tx.automatedFlow}
                            </p>
                            <div className="space-y-0">
                              {result.steps.map((step, stepIdx) => {
                                const stepTools = (step.tools ?? [])
                                  .map((tid) => workflowSystems.find((s) => s.id === tid))
                                  .filter(Boolean);
                                return (
                                <motion.div
                                  key={step.text[lang]}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: stepIdx * 0.06 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                                      <span className="text-[10px] font-bold text-primary">{stepIdx + 1}</span>
                                    </div>
                                    {stepIdx < result.steps.length - 1 && (
                                      <div className="w-px h-5 bg-primary/20" />
                                    )}
                                  </div>
                                  <div className="pt-0.5 flex-1 min-w-0">
                                    <p className="text-sm text-foreground/80">{step.text[lang]}</p>
                                    {stepTools.length > 0 && (
                                      <div className="flex items-center gap-1.5 mt-1.5">
                                        {stepTools.map((sys) => sys && (
                                          <div key={sys.id} className="w-5 h-5 rounded bg-muted/60 flex items-center justify-center" title={sys.name}>
                                            <img src={sys.logo} alt={sys.name} className={`w-3 h-3 object-contain `} />
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </motion.div>);
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="ml-11 mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center"
            >
              <h4 className="text-lg font-bold text-foreground mb-2">{tx.ctaTitle}</h4>
              <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">{tx.ctaDesc}</p>
              <Button asChild size="lg">
                <Link to="/book">
                  {tx.ctaButton} <ArrowRight size={18} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorkflowBuilder;
