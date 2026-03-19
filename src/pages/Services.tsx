// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, CheckCircle2, Cog, Link2, PieChart, FolderOpen, Briefcase, Rocket, ShoppingCart, LinkIcon, CreditCard, Puzzle, BarChart3, LayoutDashboard, FileText, Database, AlertTriangle, ShieldCheck, Shield, Layers } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCTA from "@/components/GlowCTA";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";
import WorkflowBuilder, { workflowSystems } from "@/components/WorkflowBuilder";

const t = {
  en: {
    seoTitle: "Autronis | Services — Process Automation, Integrations & Data",
    seoDesc: "Discover our services: process automation, system integrations, and data & reporting. Scalable solutions for growing businesses.",
    heroLabel: "Services",
    heroTitle: "Automation without complexity",
    heroDesc: "We design and implement scalable systems that connect processes, reduce manual steps, and provide real-time insight.",
    intLabel: "Integrations",
    intTitle: "Works with your current systems",
    intDesc: "Don't see your system? If it has an API, we can almost always integrate it.",
    whatDeliver: "What does this deliver?",
    hideExamples: "Hide examples",
    showExamples: "Example use cases",
    securityLine: "Including access control, logging, and a transferable architecture.",
    securityLink: "View our Security Approach",
    qualLabel: "Quality Standard",
    qualTitle: "Our baseline standard for every implementation",
    qualDesc: "Every implementation meets strict technical and organizational requirements. Security, control, and transferability are not add-ons — they are the foundation.",
    qualFooter: "These requirements form the foundation of every implementation.",
    roiRef: "Every implementation is backed by an upfront impact and ROI analysis.",
    roiCta: "See how we calculate ROI",
    bottomTitle: "Don't see your process listed?",
    bottomDesc: "We automate any predictable process. Schedule a free scan and discover what's possible.",
    bottomCta: "Schedule Automation Scan",
    processAuto: "Process Automation",
    processAutoIntro: "We automate recurring processes so work flows without manual intervention.",
    sysInt: "System Integrations",
    sysIntIntro: "We connect systems via APIs so data is exchanged automatically and consistently.",
    dataRep: "Data & Reporting",
    dataRepIntro: "Real-time dashboards and automated reports provide continuous insight into performance and processes.",
    qualItems: [
      { title: "Access control as a baseline", desc: "Least-privilege and role-based access are standard. Excessive system permissions are never applied." },
      { title: "Logging & traceability", desc: "Logging, audit trails, and error detection are active by default in every implementation." },
      { title: "Transferable architecture", desc: "Architecture remains manageable, extensible, and transferable — without unnecessary vendor lock-in." },
      { title: "Data governance & GDPR alignment", desc: "Data processing is set up in compliance with privacy legislation and clear guidelines." },
      { title: "Complete technical documentation", desc: "Architecture, integrations, and configurations are documented and delivered in a transferable format." },
      { title: "Stable & scalable infrastructure", desc: "The technical foundation is designed so systems operate reliably and can scale with your organization." },
    ],
    pillars: [
      {
        id: "process-automation",
        title: "Process Automation",
        intro: "We automate recurring processes so work flows without manual intervention.",
        impact: [
          { title: "Less manual processing", sub: "Up to 70% less time spent on repetitive tasks." },
          { title: "Fewer errors", sub: "Standardized workflows ensure consistent execution." },
          { title: "Faster turnaround", sub: "Approvals and escalations run automatically." },
          { title: "Scalability", sub: "Processes can grow without proportional staffing increases." },
        ],
        categories: [
          { title: "Internal workflow automation", items: ["Approval flows", "Task assignment", "Notifications and escalations", "Document generation"] },
          { title: "Sales & order automation", items: ["Order processing", "CRM updates", "Invoicing workflows", "Lead follow-up"] },
          { title: "Onboarding & offboarding", items: ["Account creation", "Checklist automation", "Role-based access control", "E-signature integrations"] },
          { title: "E-commerce automation", items: ["Order & fulfillment automation", "Inventory & returns management", "Pricing & merchandising", "Product discovery & personalization"] },
        ],
      },
      {
        id: "system-integrations",
        title: "System Integrations",
        intro: "We connect systems via APIs so data is exchanged automatically and consistently.",
        impact: [
          { title: "Consistent data flows", sub: "Core systems work with the same up-to-date information." },
          { title: "No duplicate entry", sub: "Data is entered once and synchronized automatically." },
          { title: "Real-time synchronization", sub: "Records are updated instantly without exports or manual files." },
          { title: "Reliable monitoring", sub: "Errors are detected early and logged." },
        ],
        categories: [
          { title: "API connections", items: ["REST API integrations", "Webhooks", "Event-based triggers", "Retry logic"] },
          { title: "CRM & finance integrations", items: ["CRM ↔ accounting sync", "ERP connections", "General ledger links", "Real-time data exchange"] },
          { title: "Legacy systems", items: ["Data migrations", "Middleware implementations", "Custom API layers", "Modernization of existing systems"] },
          { title: "Monitoring & logging", items: ["Error detection", "Audit logging", "Data validation", "Integration monitoring"] },
        ],
      },
      {
        id: "data-reporting",
        title: "Data & Reporting",
        intro: "Real-time dashboards and automated reports provide continuous insight into performance and processes.",
        impact: [
          { title: "Instant performance insights", sub: "Dashboards show up-to-date KPIs and trends." },
          { title: "Automated reports", sub: "Reports are generated and distributed automatically." },
          { title: "Single source of truth", sub: "All teams work with the same consistent data." },
          { title: "Early anomaly detection", sub: "Issues and deviations are spotted early." },
        ],
        categories: [
          { title: "KPI dashboards", items: ["Management dashboards", "Team dashboards", "Real-time visualizations", "Performance monitoring"] },
          { title: "Automated reports", items: ["Weekly exports", "PDF reports", "Email distribution", "Custom reporting flows"] },
          { title: "Data consolidation", items: ["Multi-source data", "Single central data layer", "Data model optimization", "Data quality control"] },
          { title: "Alerts & monitoring", items: ["Anomaly detection", "Performance alerts", "SLA monitoring", "Data flow monitoring"] },
        ],
      },
    ],
  },
  nl: {
    seoTitle: "Autronis | Diensten — Procesautomatisering, Integraties & Data",
    seoDesc: "Ontdek onze diensten: procesautomatisering, systeemintegraties en data & rapportage. Schaalbare oplossingen voor groeiende bedrijven.",
    heroLabel: "Diensten",
    heroTitle: "Automatisering zonder complexiteit",
    heroDesc: "Wij ontwerpen en implementeren schaalbare systemen die processen verbinden, handmatige stappen reduceren en realtime inzicht bieden.",
    intLabel: "Integraties",
    intTitle: "Werkt met je huidige systemen",
    intDesc: "Staat je systeem er niet bij? Als het een API heeft, kunnen we het vrijwel altijd integreren.",
    whatDeliver: "Wat levert dit op?",
    hideExamples: "Verberg voorbeelden",
    showExamples: "Voorbeeld toepassingen",
    securityLine: "Inclusief toegangscontrole, logging en een overdraagbare architectuur.",
    securityLink: "Bekijk onze beveiligingsaanpak",
    qualLabel: "Kwaliteitsstandaard",
    qualTitle: "Onze basisstandaard voor elke implementatie",
    qualDesc: "Elke implementatie voldoet aan strikte technische en organisatorische eisen. Beveiliging, controle en overdraagbaarheid zijn geen extra's — ze vormen de basis.",
    qualFooter: "Deze eisen vormen de basis van elke implementatie.",
    roiRef: "Elke implementatie wordt onderbouwd met een voorafgaande impact- en ROI-analyse.",
    roiCta: "Bekijk hoe we ROI berekenen",
    bottomTitle: "Staat je proces er niet bij?",
    bottomDesc: "Wij automatiseren elk voorspelbaar proces. Plan een gratis scan en ontdek wat mogelijk is.",
    bottomCta: "Plan een Automation Scan",
    processAuto: "Procesautomatisering",
    processAutoIntro: "Wij automatiseren terugkerende processen zodat werk doorloopt zonder handmatige tussenkomst.",
    sysInt: "Systeemintegraties",
    sysIntIntro: "Wij verbinden systemen via API's zodat data automatisch en consistent wordt uitgewisseld.",
    dataRep: "Data & Rapportage",
    dataRepIntro: "Realtime dashboards en geautomatiseerde rapportages bieden continu inzicht in prestaties en processen.",
    qualItems: [
      { title: "Toegangscontrole als basis", desc: "Least-privilege en rolgebaseerde toegang zijn standaard. Overmatige systeemrechten worden nooit toegepast." },
      { title: "Logging & traceerbaarheid", desc: "Logging, audit trails en foutdetectie zijn standaard actief in elke implementatie." },
      { title: "Overdraagbare architectuur", desc: "Architectuur blijft beheersbaar, uitbreidbaar en overdraagbaar — zonder onnodige vendor lock-in." },
      { title: "Data governance & AVG-afstemming", desc: "Dataverwerking is ingericht conform privacywetgeving en duidelijke richtlijnen." },
      { title: "Volledige technische documentatie", desc: "Architectuur, integraties en configuraties worden gedocumenteerd en overdraagbaar opgeleverd." },
      { title: "Stabiele & schaalbare infrastructuur", desc: "De technische basis is zo ontworpen dat systemen betrouwbaar draaien en meegroeien met je organisatie." },
    ],
    pillars: [
      {
        id: "process-automation",
        title: "Procesautomatisering",
        intro: "Wij automatiseren terugkerende processen zodat werk doorloopt zonder handmatige tussenkomst.",
        impact: [
          { title: "Minder handmatig werk", sub: "Tot 70% minder tijd aan repetitieve taken." },
          { title: "Minder fouten", sub: "Gestandaardiseerde workflows zorgen voor consistente uitvoering." },
          { title: "Snellere doorlooptijd", sub: "Goedkeuringen en escalaties lopen automatisch." },
          { title: "Schaalbaarheid", sub: "Processen groeien mee zonder evenredige stijging van personeelskosten." },
        ],
        categories: [
          { title: "Interne workflow-automatisering", items: ["Goedkeuringsflows", "Taaktoewijzing", "Notificaties en escalaties", "Documentgeneratie"] },
          { title: "Sales & orderautomatisering", items: ["Orderverwerking", "CRM-updates", "Facturatieflows", "Lead opvolging"] },
          { title: "Onboarding & offboarding", items: ["Accountaanmaak", "Checklistautomatisering", "Rolgebaseerde toegang", "E-handtekening integraties"] },
          { title: "E-commerce automatisering", items: ["Order- & fulfilmentautomatisering", "Voorraad- & retourenbeheer", "Prijsstelling & merchandising", "Productontdekking & personalisatie"] },
        ],
      },
      {
        id: "system-integrations",
        title: "Systeemintegraties",
        intro: "Wij verbinden systemen via API's zodat data automatisch en consistent wordt uitgewisseld.",
        impact: [
          { title: "Consistente datastromen", sub: "Kernsystemen werken met dezelfde actuele informatie." },
          { title: "Geen dubbele invoer", sub: "Data wordt eenmaal ingevoerd en automatisch gesynchroniseerd." },
          { title: "Realtime synchronisatie", sub: "Records worden direct bijgewerkt zonder exports of handmatige bestanden." },
          { title: "Betrouwbare monitoring", sub: "Fouten worden vroegtijdig gedetecteerd en gelogd." },
        ],
        categories: [
          { title: "API-koppelingen", items: ["REST API-integraties", "Webhooks", "Event-based triggers", "Retry-logica"] },
          { title: "CRM- & financiële integraties", items: ["CRM ↔ boekhoudkoppeling", "ERP-koppelingen", "Grootboek-links", "Realtime data-uitwisseling"] },
          { title: "Legacy-systemen", items: ["Datamigraties", "Middleware-implementaties", "Custom API-lagen", "Modernisering van bestaande systemen"] },
          { title: "Monitoring & logging", items: ["Foutdetectie", "Audit logging", "Datavalidatie", "Integratiemonitoring"] },
        ],
      },
      {
        id: "data-reporting",
        title: "Data & Rapportage",
        intro: "Realtime dashboards en geautomatiseerde rapportages bieden continu inzicht in prestaties en processen.",
        impact: [
          { title: "Direct prestatie-inzicht", sub: "Dashboards tonen actuele KPI's en trends." },
          { title: "Geautomatiseerde rapportages", sub: "Rapportages worden automatisch gegenereerd en verspreid." },
          { title: "Single source of truth", sub: "Alle teams werken met dezelfde consistente data." },
          { title: "Vroegtijdige anomaliedetectie", sub: "Problemen en afwijkingen worden vroegtijdig gesignaleerd." },
        ],
        categories: [
          { title: "KPI-dashboards", items: ["Managementdashboards", "Teamdashboards", "Realtime visualisaties", "Prestatiemonitoring"] },
          { title: "Geautomatiseerde rapportages", items: ["Wekelijkse exports", "PDF-rapportages", "E-maildistributie", "Custom rapportageflows"] },
          { title: "Dataconsolidatie", items: ["Multi-source data", "Eén centrale datalaag", "Datamodel-optimalisatie", "Datakwaliteitscontrole"] },
          { title: "Alerts & monitoring", items: ["Anomaliedetectie", "Prestatie-alerts", "SLA-monitoring", "Dataflow-monitoring"] },
        ],
      },
    ],
  },
};

const pillarIcons = [Cog, Link2, PieChart];
const categoryIcons = [
  [FolderOpen, Briefcase, Rocket, ShoppingCart],
  [LinkIcon, CreditCard, Puzzle, BarChart3],
  [LayoutDashboard, FileText, Database, AlertTriangle],
];
const qualIcons = [ShieldCheck, BarChart3, Layers, Database, FileText, Cog];

const toolIconsRow1: Array<{ name: string; logo: string; dark?: boolean }> = [
  { name: "OpenAI", logo: "/logos/openai.svg", dark: true },
  { name: "Anthropic", logo: "/logos/anthropic.svg", dark: true },
  { name: "Make", logo: "/logos/make.svg" },
  { name: "Supabase", logo: "/logos/supabase.svg" },
  { name: "Notion", logo: "/logos/notion.svg", dark: true },
  { name: "Stripe", logo: "/logos/stripe.svg" },
  { name: "HubSpot", logo: "/logos/hubspot.svg" },
  { name: "Slack", logo: "/logos/slack.svg" },
  { name: "Airtable", logo: "/logos/airtable.svg" },
  { name: "Salesforce", logo: "/logos/salesforce.svg" },
  { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
  { name: "Shopify", logo: "/logos/shopify.svg" },
  { name: "AWS", logo: "/logos/aws.svg" },
  { name: "Cloudflare", logo: "/logos/cloudflare.svg" },
  { name: "LangChain", logo: "/logos/langchain.svg", dark: true },
  { name: "Pinecone", logo: "/logos/pinecone.svg", dark: true },
  { name: "Firebase", logo: "/logos/firebase.svg" },
  { name: "Instagram", logo: "/logos/instagram.svg" },
  { name: "WhatsApp", logo: "/logos/whatsapp.svg" },
  { name: "GitHub", logo: "/logos/github.svg", dark: true },
];

const toolIconsRow2: Array<{ name: string; logo: string; dark?: boolean }> = [
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "Zapier", logo: "/logos/zapier.svg" },
  { name: "Retool", logo: "/logos/retool.svg" },
  { name: "MongoDB", logo: "/logos/mongodb.svg" },
  { name: "MySQL", logo: "/logos/mysql.svg" },
  { name: "Azure", logo: "/logos/azure.svg" },
  { name: "Pipedrive", logo: "/logos/pipedrive.svg" },
  { name: "Google Workspace", logo: "/logos/google-workspace.svg" },
  { name: "Microsoft 365", logo: "/logos/microsoft-365.svg" },
  { name: "WooCommerce", logo: "/logos/woocommerce.svg" },
  { name: "Magento", logo: "/logos/magento.svg" },
  { name: "Mollie", logo: "/logos/mollie.svg", dark: true },
  { name: "PayPal", logo: "/logos/paypal.svg" },
  { name: "Looker Studio", logo: "/logos/looker-studio.svg" },
  { name: "Power BI", logo: "/logos/power-bi.svg" },
  { name: "Google Analytics", logo: "/logos/google-analytics.svg" },
  { name: "Sentry", logo: "/logos/sentry.svg", dark: true },
  { name: "Datadog", logo: "/logos/datadog.svg" },
  { name: "Facebook", logo: "/logos/facebook.svg" },
  { name: "LinkedIn", logo: "/logos/linkedin.svg" },
];

const PillarCard = ({
  pillar,
  pillarIndex,
  sectionRef,
  lang,
}: {
  pillar: typeof t.en.pillars[0];
  pillarIndex: number;
  sectionRef: (el: HTMLDivElement | null) => void;
  lang: "en" | "nl";
}) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = pillarIcons[pillarIndex];
  const catIcons = categoryIcons[pillarIndex];
  const tx = t[lang];

  return (
    <div ref={sectionRef} className="scroll-mt-28">
      <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 ease-out hover:scale-[1.01] hover:border-primary/40">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Icon size={18} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">{pillar.title}</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pillar.intro}</p>

        <div className="rounded-lg border border-border/50 bg-muted/40 p-5 mb-5">
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.whatDeliver}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {pillar.impact.map((item, idx) => (
              <motion.div key={item.title} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-card border border-primary/15 hover:border-primary/30 transition-colors duration-200 group" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.4 }}>
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                  <CheckCircle2 size={12} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground leading-tight">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-all duration-200 mb-4 relative py-1 group">
          <span>{expanded ? tx.hideExamples : tx.showExamples}</span>
          <ChevronDown size={16} className="transition-transform duration-300 ease-out" style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }} />
          <span className="absolute bottom-0 left-0 h-px w-0 bg-primary/40 group-hover:w-full transition-all duration-300" />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="overflow-visible">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                {pillar.categories.map((cat, catIdx) => {
                  const CatIcon = catIcons[catIdx];
                  return (
                    <motion.div key={cat.title} className="rounded-lg bg-muted/40 p-4 transition-all duration-300 ease-out cursor-default overflow-hidden min-w-0" style={{ border: "1px solid hsl(174, 78%, 41%, 0.15)", boxShadow: "0 0 8px hsl(174, 78%, 41%, 0.04)" }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: catIdx * 0.08, duration: 0.4 }} whileHover={{ borderColor: "hsl(174, 78%, 41%, 0.3)", boxShadow: "0 0 12px hsl(174, 78%, 41%, 0.08)" }}>
                      <h3 className="text-[0.925rem] font-bold text-foreground mb-3 flex items-center gap-2">
                        <CatIcon size={16} className="text-primary" />
                        {cat.title}
                      </h3>
                      <div className="space-y-1.5">
                        {cat.items.map((item) => (
                          <span key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 pt-3 border-t border-border/30">
          <p className="text-[11px] text-muted-foreground/80 leading-relaxed">{tx.securityLine}</p>
          <Link to="/services#quality-standard" className="group inline-flex items-center gap-1 text-[11px] text-foreground/70 hover:text-primary/70 transition-colors mt-1">
            {tx.securityLink}
            <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Map ticker tool names to workflow builder IDs
const tickerToWorkflowId: Record<string, string> = {
  "OpenAI": "openai", "Anthropic": "anthropic", "Supabase": "supabase",
  "Notion": "notion", "Stripe": "stripe", "HubSpot": "hubspot", "Slack": "slack",
  "Airtable": "airtable", "Salesforce": "salesforce", "PostgreSQL": "postgresql",
  "Shopify": "shopify", "Instagram": "instagram", "WhatsApp": "whatsapp", "GitHub": "github",
  "MongoDB": "mongodb", "MySQL": "mysql", "Pipedrive": "pipedrive",
  "Google Workspace": "google-workspace", "Microsoft 365": "microsoft-365",
  "WooCommerce": "woocommerce", "Magento": "magento", "Mollie": "mollie",
  "PayPal": "paypal", "Power BI": "power-bi", "Google Analytics": "google-analytics",
  "LangChain": "langchain", "Retool": "retool", "Looker Studio": "looker-studio",
  "Sentry": "sentry", "Datadog": "datadog",
};

const Services = () => {
  const lang = useLanguage();
  const tx = t[lang];
  const pillars = tx.pillars;
  const [activeSection, setActiveSection] = useState(pillars[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const workflowRef = useRef<HTMLDivElement>(null);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const handleToggleTool = useCallback((id: string) => {
    setSelectedTools((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }, []);

  const handleTickerClick = useCallback((toolName: string) => {
    const workflowId = tickerToWorkflowId[toolName];
    if (!workflowId) return;
    // Only add if it exists in the workflow builder systems
    const exists = workflowSystems.some((s) => s.id === workflowId);
    if (!exists) return;
    if (!selectedTools.includes(workflowId)) {
      handleToggleTool(workflowId);
    }
    // Scroll to workflow builder
    setTimeout(() => {
      workflowRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [selectedTools, handleToggleTool]);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => { sectionRefs.current[hash]?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 300);
    }
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    for (const p of pillars) {
      const el = sectionRefs.current[p.id];
      if (!el) continue;
      const observer = new IntersectionObserver((entries) => { for (const entry of entries) { if (entry.isIntersecting) setActiveSection(p.id); } }, { threshold: 0.35, rootMargin: "-10% 0px -50% 0px" });
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [pillars]);

  const scrollTo = (id: string) => { setActiveSection(id); sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return (
    <>
      <SEOHead title={tx.seoTitle} description={tx.seoDesc} path="/services" />
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div className="max-w-3xl mx-auto text-center mb-20" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.heroLabel}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{tx.heroTitle}</h1>
            <motion.p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}>{tx.heroDesc}</motion.p>
          </motion.div>

          <div className="mb-20">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.intLabel}</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">{tx.intTitle}</h2>
              <p className="text-muted-foreground">{tx.intDesc}</p>
            </div>
            <p className="text-xs text-center text-muted-foreground/60 mb-4">
              {lang === "nl" ? "Klik op een tool om automatiseringsmogelijkheden te ontdekken" : "Click a tool to discover automation opportunities"}
            </p>
            <div className="relative mb-4 [overflow-x:clip] py-10">
              <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
              <div className="flex animate-marquee-right gap-6 sm:gap-8 w-max items-center justify-center">
                {[...toolIconsRow1, ...toolIconsRow1, ...toolIconsRow1].map((tool, i) => {
                  const wfId = tickerToWorkflowId[tool.name];
                  const isSelected = wfId ? selectedTools.includes(wfId) : false;
                  return (
                    <button key={i} onClick={() => handleTickerClick(tool.name)} className={`relative group hover:scale-125 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer ${isSelected ? 'scale-110' : ''}`}>
                      <img src={tool.logo} alt={tool.name} className={`w-7 h-7 sm:w-12 sm:h-12 object-contain transition-all duration-200 ${isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} ${tool.dark ? 'dark:invert' : ''}`} loading="lazy" />
                      {isSelected && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center"><CheckCircle2 size={10} className="text-primary-foreground" /></span>}
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground bg-card border border-border rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-sm z-20">{tool.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="relative [overflow-x:clip] py-10">
              <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
              <div className="flex animate-marquee-left gap-6 sm:gap-8 w-max items-center justify-center">
                {[...toolIconsRow2, ...toolIconsRow2, ...toolIconsRow2].map((tool, i) => {
                  const wfId = tickerToWorkflowId[tool.name];
                  const isSelected = wfId ? selectedTools.includes(wfId) : false;
                  return (
                    <button key={i} onClick={() => handleTickerClick(tool.name)} className={`relative group hover:scale-125 hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer ${isSelected ? 'scale-110' : ''}`}>
                      <img src={tool.logo} alt={tool.name} className={`w-7 h-7 sm:w-12 sm:h-12 object-contain transition-all duration-200 ${isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'} ${tool.dark ? 'dark:invert' : ''}`} loading="lazy" />
                      {isSelected && <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center"><CheckCircle2 size={10} className="text-primary-foreground" /></span>}
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground bg-card border border-border rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-sm z-20">{tool.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <nav className="lg:hidden sticky top-16 z-20 -mx-4 px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar bg-background/80 backdrop-blur-xl border-b border-border/50 mb-8">
            {pillars.map((p) => (
              <button key={p.id} onClick={() => scrollTo(p.id)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out shrink-0 ${activeSection === p.id ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/0.25)]" : "text-muted-foreground hover:text-foreground opacity-60"}`}>{p.title}</button>
            ))}
          </nav>

          <div>
            <div className="space-y-12">
              {pillars.map((pillar, i) => (
                <PillarCard key={pillar.id} pillar={pillar} pillarIndex={i} sectionRef={(el) => (sectionRefs.current[pillar.id] = el)} lang={lang} />
              ))}
            </div>
          </div>

          {/* Workflow Builder */}
          <div id="workflow-builder" ref={workflowRef} className="mt-20 pt-12 scroll-mt-28">
            <ScrollReveal className="text-center mb-12">
              <ScrollRevealItem>
                <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                  {lang === "nl" ? "Interactieve tool" : "Interactive tool"}
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  {lang === "nl" ? "Ontdek wat wij voor jou kunnen automatiseren" : "Discover what we can automate for you"}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
                  {lang === "nl"
                    ? "Selecteer de tools die je gebruikt en ontdek direct welke automatiseringen mogelijk zijn."
                    : "Select the tools you use and instantly discover which automations are possible."}
                </p>
              </ScrollRevealItem>
            </ScrollReveal>
            <WorkflowBuilder externalSelected={selectedTools} onExternalToggle={handleToggleTool} />
          </div>

          <div id="quality-standard" className="mt-16 pt-12 max-w-5xl mx-auto scroll-mt-28">
            <ScrollReveal className="text-center mb-10">
              <ScrollRevealItem>
                <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.qualLabel}</p>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{tx.qualTitle}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">{tx.qualDesc}</p>
              </ScrollRevealItem>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {tx.qualItems.map((item, idx) => {
                const QIcon = qualIcons[idx];
                return (
                  <motion.div key={item.title} className="p-5 rounded-2xl border border-border bg-card cursor-default flex flex-col" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.07, duration: 0.45 }} whileHover={{ scale: 1.015, y: -2, borderColor: "hsl(174, 78%, 41%, 0.5)", boxShadow: "0 4px 24px hsl(174, 78%, 33%, 0.08)" }}>
                    <div className="flex items-center gap-2.5 sm:block mb-2 sm:mb-0">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4"><QIcon size={18} className="sm:w-5 sm:h-5" /></div>
                      <p className="text-sm font-semibold text-foreground sm:hidden">{item.title}</p>
                    </div>
                    <p className="hidden sm:block text-base font-semibold text-foreground mb-2">{item.title}</p>
                    <p className="text-sm text-foreground/90 leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-8 italic">{tx.qualFooter}</p>
          </div>

          <div className="mt-16 text-center pt-12">
            <p className="text-sm text-muted-foreground mb-4">{tx.roiRef}</p>
            <Button asChild variant="outline" size="lg"><Link to="/impact-roi#roi-scan">{tx.roiCta} <ArrowRight size={18} /></Link></Button>
          </div>

          <div className="text-center mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">{tx.bottomTitle}</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{tx.bottomDesc}</p>
            <GlowCTA to="/book">{tx.bottomCta}</GlowCTA>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
