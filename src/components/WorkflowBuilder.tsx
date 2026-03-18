import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, RotateCcw, Zap, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/context";

type SystemCategory = "crm" | "finance" | "ecommerce" | "communication" | "data" | "other";

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
  timeSaved: string;
  systems: string[];
}

const systems: SystemOption[] = [
  { id: "hubspot", name: "HubSpot", logo: "/logos/hubspot.svg", category: "crm" },
  { id: "salesforce", name: "Salesforce", logo: "/logos/salesforce.svg", category: "crm" },
  { id: "pipedrive", name: "Pipedrive", logo: "/logos/pipedrive.svg", category: "crm" },
  { id: "exact", name: "Exact", logo: "/logos/exact.svg", category: "finance" },
  { id: "stripe", name: "Stripe", logo: "/logos/stripe.svg", category: "finance" },
  { id: "mollie", name: "Mollie", logo: "/logos/mollie.svg", dark: true, category: "finance" },
  { id: "shopify", name: "Shopify", logo: "/logos/shopify.svg", category: "ecommerce" },
  { id: "woocommerce", name: "WooCommerce", logo: "/logos/woocommerce.svg", category: "ecommerce" },
  { id: "magento", name: "Magento", logo: "/logos/magento.svg", category: "ecommerce" },
  { id: "slack", name: "Slack", logo: "/logos/slack.svg", category: "communication" },
  { id: "whatsapp", name: "WhatsApp", logo: "/logos/whatsapp.svg", category: "communication" },
  { id: "google-workspace", name: "Google Workspace", logo: "/logos/google-workspace.svg", category: "communication" },
  { id: "microsoft-365", name: "Microsoft 365", logo: "/logos/microsoft-365.svg", category: "communication" },
  { id: "supabase", name: "Supabase", logo: "/logos/supabase.svg", category: "data" },
  { id: "postgresql", name: "PostgreSQL", logo: "/logos/postgresql.svg", category: "data" },
  { id: "mongodb", name: "MongoDB", logo: "/logos/mongodb.svg", category: "data" },
  { id: "power-bi", name: "Power BI", logo: "/logos/power-bi.svg", category: "data" },
  { id: "airtable", name: "Airtable", logo: "/logos/airtable.svg", category: "data" },
  { id: "notion", name: "Notion", logo: "/logos/notion.svg", dark: true, category: "other" },
  { id: "github", name: "GitHub", logo: "/logos/github.svg", dark: true, category: "other" },
];

const categoryLabels: Record<SystemCategory, { en: string; nl: string }> = {
  crm: { en: "CRM", nl: "CRM" },
  finance: { en: "Finance", nl: "Finance" },
  ecommerce: { en: "E-commerce", nl: "E-commerce" },
  communication: { en: "Communication", nl: "Communicatie" },
  data: { en: "Data & Analytics", nl: "Data & Analytics" },
  other: { en: "Other", nl: "Overig" },
};

const automationTemplates: AutomationResult[] = [
  {
    title: { en: "Lead-to-Deal Pipeline", nl: "Lead-naar-Deal Pipeline" },
    description: {
      en: "Automatically sync new leads, enrich contact data, create deals, and trigger follow-up sequences across your CRM and communication tools.",
      nl: "Synchroniseer automatisch nieuwe leads, verrijk contactdata, maak deals aan en trigger follow-up sequences in je CRM en communicatietools.",
    },
    timeSaved: "15-20h/week",
    systems: ["hubspot", "salesforce", "pipedrive", "slack", "google-workspace", "microsoft-365"],
  },
  {
    title: { en: "Order & Invoice Automation", nl: "Order- & Facturatieflow" },
    description: {
      en: "Automatically process orders from your webshop, create invoices in your accounting system, update inventory, and send confirmation emails.",
      nl: "Verwerk automatisch bestellingen uit je webshop, maak facturen aan in je boekhouding, werk voorraad bij en verstuur bevestigingsmails.",
    },
    timeSaved: "10-15h/week",
    systems: ["shopify", "woocommerce", "magento", "exact", "stripe", "mollie"],
  },
  {
    title: { en: "Real-time KPI Dashboard", nl: "Realtime KPI Dashboard" },
    description: {
      en: "Consolidate data from multiple sources into a single dashboard with automated alerts for anomalies and weekly PDF reports.",
      nl: "Consolideer data uit meerdere bronnen in één dashboard met automatische alerts bij afwijkingen en wekelijkse PDF-rapportages.",
    },
    timeSaved: "8-12h/week",
    systems: ["supabase", "postgresql", "mongodb", "power-bi", "airtable", "notion"],
  },
  {
    title: { en: "Customer Communication Hub", nl: "Klantcommunicatie Hub" },
    description: {
      en: "Centralize all customer communication — route messages from WhatsApp, Slack, and email to one inbox with AI-powered routing and auto-replies.",
      nl: "Centraliseer alle klantcommunicatie — routeer berichten van WhatsApp, Slack en email naar één inbox met AI-gestuurde routing en auto-replies.",
    },
    timeSaved: "12-18h/week",
    systems: ["slack", "whatsapp", "google-workspace", "microsoft-365", "hubspot"],
  },
  {
    title: { en: "E-commerce Growth Engine", nl: "E-commerce Groei Engine" },
    description: {
      en: "Automate product syncing, pricing updates, inventory management, and customer retargeting across your e-commerce and marketing stack.",
      nl: "Automatiseer productsynchronisatie, prijsupdates, voorraadbeheer en klant-retargeting over je e-commerce en marketing stack.",
    },
    timeSaved: "20-25h/week",
    systems: ["shopify", "woocommerce", "magento", "hubspot", "stripe", "google-workspace"],
  },
  {
    title: { en: "Data Sync & Backup", nl: "Data Sync & Backup" },
    description: {
      en: "Keep all your databases and tools in sync with automated two-way data flows, conflict resolution, and scheduled backups.",
      nl: "Houd al je databases en tools gesynchroniseerd met automatische tweerichtings-dataflows, conflictresolutie en geplande backups.",
    },
    timeSaved: "5-8h/week",
    systems: ["supabase", "postgresql", "mongodb", "airtable", "notion", "github"],
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
    .slice(0, 3)
    .map((s) => s.template);
}

const t2 = {
  en: {
    stepLabel: "Step",
    step1Title: "Select your current tools",
    step1Desc: "Click on the systems you currently use in your business.",
    step2Title: "Your automation opportunities",
    step2Desc: "Based on your tool stack, here's what we can automate for you.",
    selected: "selected",
    showResults: "Show automation opportunities",
    reset: "Start over",
    timeSaved: "Time saved",
    ctaTitle: "Want to see the full picture?",
    ctaDesc: "Schedule a free Automation Scan and we'll map all opportunities for your specific situation.",
    ctaButton: "Schedule Automation Scan",
    noResults: "Select at least 2 tools to see automation opportunities.",
    perWeek: "/week",
  },
  nl: {
    stepLabel: "Stap",
    step1Title: "Selecteer je huidige tools",
    step1Desc: "Klik op de systemen die je momenteel gebruikt in je bedrijf.",
    step2Title: "Jouw automatiseringsmogelijkheden",
    step2Desc: "Op basis van je tool stack, dit is wat we voor je kunnen automatiseren.",
    selected: "geselecteerd",
    showResults: "Toon automatiseringsmogelijkheden",
    reset: "Opnieuw beginnen",
    timeSaved: "Tijdsbesparing",
    ctaTitle: "Wil je het volledige plaatje zien?",
    ctaDesc: "Plan een gratis Automation Scan en we brengen alle mogelijkheden voor jouw specifieke situatie in kaart.",
    ctaButton: "Plan een Automation Scan",
    noResults: "Selecteer minimaal 2 tools om automatiseringsmogelijkheden te zien.",
    perWeek: "/week",
  },
};

const WorkflowBuilder = () => {
  const lang = useLanguage();
  const tx = t2[lang];
  const [selected, setSelected] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSystem = useCallback((id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    setShowResults(false);
  }, []);

  const reset = () => {
    setSelected([]);
    setShowResults(false);
  };

  const results = getRelevantAutomations(selected);
  const categories = Object.keys(categoryLabels) as SystemCategory[];

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Step 1: System Selection */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
            1
          </span>
          <h3 className="text-xl font-bold">{tx.step1Title}</h3>
        </div>
        <p className="text-sm text-muted-foreground ml-11 mb-6">{tx.step1Desc}</p>

        <div className="space-y-6 ml-11">
          {categories.map((category) => {
            const categorySystems = systems.filter((s) => s.category === category);
            if (categorySystems.length === 0) return null;

            return (
              <div key={category}>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
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

        {/* Selected count + show results button */}
        <div className="ml-11 mt-8 flex items-center gap-4">
          {selected.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              {selected.length} {tx.selected}
            </motion.p>
          )}
          {selected.length >= 2 && !showResults && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <Button onClick={() => setShowResults(true)} size="lg">
                {tx.showResults} <ArrowRight size={18} />
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

      {/* Animated connection arrow */}
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
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                2
              </span>
              <h3 className="text-xl font-bold">{tx.step2Title}</h3>
            </div>
            <p className="text-sm text-muted-foreground ml-11 mb-6">{tx.step2Desc}</p>

            <div className="space-y-4 ml-11">
              {results.map((result, idx) => {
                const matchedSystems = systems.filter(
                  (s) => result.systems.includes(s.id) && selected.includes(s.id)
                );

                return (
                  <motion.div
                    key={result.title[lang]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.12 }}
                    className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-center gap-2.5">
                        <Zap size={18} className="text-primary shrink-0" />
                        <h4 className="text-base font-bold text-foreground">
                          {result.title[lang]}
                        </h4>
                      </div>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {tx.timeSaved}: {result.timeSaved}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {result.description[lang]}
                    </p>

                    {/* Connected systems visualization */}
                    <div className="flex items-center gap-1 flex-wrap">
                      {matchedSystems.map((sys, sysIdx) => (
                        <div key={sys.id} className="flex items-center">
                          <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center">
                            <img
                              src={sys.logo}
                              alt={sys.name}
                              className={`w-4 h-4 object-contain ${sys.dark ? "dark:invert" : ""}`}
                            />
                          </div>
                          {sysIdx < matchedSystems.length - 1 && (
                            <div className="w-6 h-px bg-primary/30 mx-0.5" />
                          )}
                        </div>
                      ))}
                    </div>
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
              <p className="text-sm text-muted-foreground mb-4">{tx.ctaDesc}</p>
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
