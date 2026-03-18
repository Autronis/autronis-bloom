import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, RotateCcw, Zap, ArrowDown, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/context";

type SystemCategory = "crm" | "finance" | "ecommerce" | "communication" | "data" | "productivity" | "ai";

interface SystemOption {
  id: string;
  name: string;
  logo: string;
  dark?: boolean;
  category: SystemCategory;
}

interface AutomationResult {
  title: { en: string; nl: string };
  description: { en: string; nl: string };
  steps: { en: string[]; nl: string[] };
  timeSaved: string;
  impact: { en: string; nl: string };
  systems: string[];
}

export const workflowSystems: SystemOption[] = [
  // CRM
  { id: "hubspot", name: "HubSpot", logo: "/logos/hubspot.svg", category: "crm" },
  { id: "salesforce", name: "Salesforce", logo: "/logos/salesforce.svg", category: "crm" },
  { id: "pipedrive", name: "Pipedrive", logo: "/logos/pipedrive.svg", category: "crm" },
  // Finance
  { id: "exact", name: "Exact", logo: "/logos/exact.svg", category: "finance" },
  { id: "stripe", name: "Stripe", logo: "/logos/stripe.svg", category: "finance" },
  { id: "mollie", name: "Mollie", logo: "/logos/mollie.svg", dark: true, category: "finance" },
  { id: "paypal", name: "PayPal", logo: "/logos/paypal.svg", category: "finance" },
  // E-commerce
  { id: "shopify", name: "Shopify", logo: "/logos/shopify.svg", category: "ecommerce" },
  { id: "woocommerce", name: "WooCommerce", logo: "/logos/woocommerce.svg", category: "ecommerce" },
  { id: "magento", name: "Magento", logo: "/logos/magento.svg", category: "ecommerce" },
  // Communication
  { id: "slack", name: "Slack", logo: "/logos/slack.svg", category: "communication" },
  { id: "whatsapp", name: "WhatsApp", logo: "/logos/whatsapp.svg", category: "communication" },
  { id: "google-workspace", name: "Google Workspace", logo: "/logos/google-workspace.svg", category: "communication" },
  { id: "microsoft-365", name: "Microsoft 365", logo: "/logos/microsoft-365.svg", category: "communication" },
  { id: "instagram", name: "Instagram", logo: "/logos/instagram.svg", category: "communication" },
  // Data
  { id: "supabase", name: "Supabase", logo: "/logos/supabase.svg", category: "data" },
  { id: "postgresql", name: "PostgreSQL", logo: "/logos/postgresql.svg", category: "data" },
  { id: "mongodb", name: "MongoDB", logo: "/logos/mongodb.svg", category: "data" },
  { id: "power-bi", name: "Power BI", logo: "/logos/power-bi.svg", category: "data" },
  { id: "google-analytics", name: "Google Analytics", logo: "/logos/google-analytics.svg", category: "data" },
  // Productivity
  { id: "airtable", name: "Airtable", logo: "/logos/airtable.svg", category: "productivity" },
  { id: "notion", name: "Notion", logo: "/logos/notion.svg", dark: true, category: "productivity" },
  { id: "github", name: "GitHub", logo: "/logos/github.svg", dark: true, category: "productivity" },
  // AI
  { id: "openai", name: "OpenAI", logo: "/logos/openai.svg", dark: true, category: "ai" },
  { id: "anthropic", name: "Anthropic", logo: "/logos/anthropic.svg", dark: true, category: "ai" },
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
    title: { en: "Lead-to-Deal Pipeline", nl: "Lead-naar-Deal Pipeline" },
    description: {
      en: "Automatically capture, enrich, score, and route leads through your entire sales pipeline — from first touch to closed deal.",
      nl: "Vang automatisch leads op, verrijk ze, scoor ze en routeer ze door je hele sales pipeline — van eerste contact tot gesloten deal.",
    },
    steps: {
      en: ["New lead enters CRM", "Auto-enrich with company data", "Lead scoring based on behavior", "Assign to right sales rep", "Trigger follow-up sequence", "Update deal stage automatically"],
      nl: ["Nieuwe lead komt in CRM", "Auto-verrijking met bedrijfsdata", "Lead scoring op basis van gedrag", "Toewijzing aan juiste sales rep", "Follow-up sequence triggeren", "Deal-fase automatisch updaten"],
    },
    timeSaved: "15-20h",
    impact: { en: "2x faster lead response time", nl: "2x snellere lead responstijd" },
    systems: ["hubspot", "salesforce", "pipedrive", "slack", "google-workspace", "microsoft-365", "openai"],
  },
  {
    title: { en: "Order & Invoice Automation", nl: "Order- & Facturatieflow" },
    description: {
      en: "End-to-end order processing — from webshop order to invoice, inventory update, and customer notification, fully automated.",
      nl: "End-to-end orderverwerking — van webshop bestelling tot factuur, voorraadupdate en klantnotificatie, volledig geautomatiseerd.",
    },
    steps: {
      en: ["Order placed in webshop", "Payment verified", "Invoice created in accounting", "Inventory updated", "Shipping label generated", "Customer confirmation sent"],
      nl: ["Bestelling geplaatst in webshop", "Betaling geverifieerd", "Factuur aangemaakt in boekhouding", "Voorraad bijgewerkt", "Verzendlabel gegenereerd", "Bevestiging naar klant gestuurd"],
    },
    timeSaved: "10-15h",
    impact: { en: "73% faster order processing", nl: "73% snellere orderverwerking" },
    systems: ["shopify", "woocommerce", "magento", "exact", "stripe", "mollie", "paypal", "slack"],
  },
  {
    title: { en: "Real-time KPI Dashboard", nl: "Realtime KPI Dashboard" },
    description: {
      en: "Consolidate data from all your tools into one live dashboard with automated alerts, weekly reports, and trend analysis.",
      nl: "Consolideer data uit al je tools in één live dashboard met automatische alerts, wekelijkse rapporten en trendanalyse.",
    },
    steps: {
      en: ["Connect all data sources", "Transform & normalize data", "Build real-time dashboard", "Set up anomaly alerts", "Automate weekly PDF reports", "AI-powered trend insights"],
      nl: ["Alle databronnen verbinden", "Data transformeren & normaliseren", "Realtime dashboard bouwen", "Anomalie-alerts instellen", "Wekelijkse PDF-rapporten automatiseren", "AI-gestuurde trendinzichten"],
    },
    timeSaved: "8-12h",
    impact: { en: "Single source of truth for all KPIs", nl: "Eén waarheid voor alle KPI's" },
    systems: ["supabase", "postgresql", "mongodb", "power-bi", "airtable", "google-analytics", "notion", "openai"],
  },
  {
    title: { en: "Customer Communication Hub", nl: "Klantcommunicatie Hub" },
    description: {
      en: "Centralize all customer touchpoints — route messages from every channel to one inbox with AI-powered categorization and auto-replies.",
      nl: "Centraliseer alle klantcontactpunten — routeer berichten van elk kanaal naar één inbox met AI-gestuurde categorisatie en auto-replies.",
    },
    steps: {
      en: ["Message received (any channel)", "AI categorizes intent", "Route to right team/person", "Auto-reply if applicable", "Create CRM activity", "Track resolution time"],
      nl: ["Bericht ontvangen (elk kanaal)", "AI categoriseert intentie", "Route naar juiste team/persoon", "Auto-reply indien van toepassing", "CRM-activiteit aanmaken", "Responstijd bijhouden"],
    },
    timeSaved: "12-18h",
    impact: { en: "60% faster response times", nl: "60% snellere responstijden" },
    systems: ["slack", "whatsapp", "google-workspace", "microsoft-365", "instagram", "hubspot", "anthropic", "openai"],
  },
  {
    title: { en: "E-commerce Growth Engine", nl: "E-commerce Groei Engine" },
    description: {
      en: "Automate your entire e-commerce backend — product syncing, dynamic pricing, inventory management, and personalized customer retargeting.",
      nl: "Automatiseer je hele e-commerce backend — productsynchronisatie, dynamische prijzen, voorraadbeheer en gepersonaliseerde klant-retargeting.",
    },
    steps: {
      en: ["Sync products across channels", "Dynamic pricing rules", "Inventory threshold alerts", "Abandoned cart recovery", "Personalized email sequences", "Review request automation"],
      nl: ["Producten synchroniseren over kanalen", "Dynamische prijsregels", "Voorraaddrempel-alerts", "Verlaten winkelwagen herinnering", "Gepersonaliseerde e-mailreeksen", "Review-verzoek automatisering"],
    },
    timeSaved: "20-25h",
    impact: { en: "2.4x more conversions", nl: "2,4x meer conversies" },
    systems: ["shopify", "woocommerce", "magento", "hubspot", "stripe", "google-workspace", "google-analytics", "instagram"],
  },
  {
    title: { en: "Smart Document Processing", nl: "Slimme Documentverwerking" },
    description: {
      en: "AI extracts data from invoices, contracts, and forms — automatically categorizes, validates, and routes them to the right system.",
      nl: "AI extraheert data uit facturen, contracten en formulieren — categoriseert, valideert en routeert ze automatisch naar het juiste systeem.",
    },
    steps: {
      en: ["Document received (email/upload)", "AI extracts key data", "Validate against rules", "Route to right system", "Create database entry", "Notify relevant team"],
      nl: ["Document ontvangen (email/upload)", "AI extraheert kerndata", "Validatie tegen regels", "Route naar juist systeem", "Database-entry aanmaken", "Relevant team notificeren"],
    },
    timeSaved: "15-20h",
    impact: { en: "95% less manual data entry", nl: "95% minder handmatige invoer" },
    systems: ["openai", "anthropic", "google-workspace", "microsoft-365", "exact", "supabase", "airtable", "notion"],
  },
  {
    title: { en: "Social Media & Marketing Automation", nl: "Social Media & Marketing Automatisering" },
    description: {
      en: "Automate content scheduling, lead capture from social, CRM enrichment, and performance reporting across all your marketing channels.",
      nl: "Automatiseer content scheduling, lead capture van social, CRM-verrijking en prestatierapportage over al je marketingkanalen.",
    },
    steps: {
      en: ["Schedule content across platforms", "Capture leads from social", "Enrich in CRM automatically", "Track campaign performance", "Generate AI content suggestions", "Weekly marketing report"],
      nl: ["Content plannen over platformen", "Leads vangen van social", "Automatisch verrijken in CRM", "Campagneprestaties bijhouden", "AI-content suggesties genereren", "Wekelijks marketingrapport"],
    },
    timeSaved: "10-15h",
    impact: { en: "3x more consistent posting", nl: "3x consistentere posting" },
    systems: ["instagram", "hubspot", "google-analytics", "openai", "slack", "notion", "google-workspace"],
  },
  {
    title: { en: "Data Sync & Backup", nl: "Data Sync & Backup" },
    description: {
      en: "Keep all databases and tools in perfect sync with automated bi-directional data flows, conflict resolution, and scheduled backups.",
      nl: "Houd alle databases en tools perfect gesynchroniseerd met automatische tweerichtings-dataflows, conflictresolutie en geplande backups.",
    },
    steps: {
      en: ["Detect data changes", "Bi-directional sync", "Conflict resolution", "Data validation", "Scheduled backups", "Alert on sync failures"],
      nl: ["Datawijzigingen detecteren", "Tweerichtings-sync", "Conflictresolutie", "Datavalidatie", "Geplande backups", "Alert bij sync-fouten"],
    },
    timeSaved: "5-8h",
    impact: { en: "Zero data inconsistencies", nl: "Nul data-inconsistenties" },
    systems: ["supabase", "postgresql", "mongodb", "airtable", "notion", "github", "google-workspace"],
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
                  {categorySystems.map((system) => {
                    const isSelected = selected.includes(system.id);
                    return (
                      <motion.button
                        key={system.id}
                        onClick={() => toggleSystem(system.id)}
                        className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
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
                          className={`w-5 h-5 object-contain ${system.dark ? "dark:invert" : ""}`}
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
                    );
                  })}
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
                            <Zap size={16} className="text-primary" />
                          </div>
                          <h4 className="text-base font-bold text-foreground">
                            {result.title[lang]}
                          </h4>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full flex items-center gap-1">
                            <Clock size={11} />
                            {result.timeSaved}h{tx.perWeek}
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
                                className={`w-4 h-4 object-contain ${sys.dark ? "dark:invert" : ""}`}
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
                              {result.steps[lang].map((step, stepIdx) => (
                                <motion.div
                                  key={step}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: stepIdx * 0.06 }}
                                  className="flex items-start gap-3"
                                >
                                  <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                                      <span className="text-[10px] font-bold text-primary">{stepIdx + 1}</span>
                                    </div>
                                    {stepIdx < result.steps[lang].length - 1 && (
                                      <div className="w-px h-5 bg-primary/20" />
                                    )}
                                  </div>
                                  <p className="text-sm text-foreground/80 pt-0.5">{step}</p>
                                </motion.div>
                              ))}
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
