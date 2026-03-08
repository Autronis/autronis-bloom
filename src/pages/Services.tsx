// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, CheckCircle2, Cog, Link2, PieChart, FolderOpen, Briefcase, Rocket, ShoppingCart, LinkIcon, CreditCard, Puzzle, BarChart3, LayoutDashboard, FileText, Database, AlertTriangle, ShieldCheck, Shield, Layers } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";


const pillars = [
  {
    id: "process-automation",
    icon: Cog,
    title: "Process Automation",
    intro: "We automate recurring processes so work flows without manual intervention.",
    impact: [
      { title: "Less manual processing", sub: "Up to 70% less time spent on repetitive tasks." },
      { title: "Fewer errors", sub: "Standardized workflows ensure consistent execution." },
      { title: "Faster turnaround", sub: "Approvals and escalations run automatically." },
      { title: "Scalability", sub: "Processes can grow without proportional staffing increases." },
    ],
    categories: [
      { icon: FolderOpen, title: "Internal workflow automation", items: ["Approval flows", "Task assignment", "Notifications and escalations", "Document generation"] },
      { icon: Briefcase, title: "Sales & order automation", items: ["Order processing", "CRM updates", "Invoicing workflows", "Lead follow-up"] },
      { icon: Rocket, title: "Onboarding & offboarding", items: ["Account creation", "Checklist automation", "Role-based access control", "E-signature integrations"] },
      { icon: ShoppingCart, title: "E-commerce automation", items: ["Order & fulfillment automation", "Inventory & returns management", "Pricing & merchandising", "Product discovery & personalization"] },
    ],
  },
  {
    id: "system-integrations",
    icon: Link2,
    title: "System Integrations",
    intro: "We connect systems via APIs so data is exchanged automatically and consistently.",
    impact: [
      { title: "Consistent data flows", sub: "Core systems work with the same up-to-date information." },
      { title: "No duplicate entry", sub: "Data is entered once and synchronized automatically." },
      { title: "Real-time synchronization", sub: "Records are updated instantly without exports or manual files." },
      { title: "Reliable monitoring", sub: "Errors are detected early and logged." },
    ],
    categories: [
      { icon: LinkIcon, title: "API connections", items: ["REST API integrations", "Webhooks", "Event-based triggers", "Retry logic"] },
      { icon: CreditCard, title: "CRM & finance integrations", items: ["CRM ↔ accounting sync", "ERP connections", "General ledger links", "Real-time data exchange"] },
      { icon: Puzzle, title: "Legacy systems", items: ["Data migrations", "Middleware implementations", "Custom API layers", "Modernization of existing systems"] },
      { icon: BarChart3, title: "Monitoring & logging", items: ["Error detection", "Audit logging", "Data validation", "Integration monitoring"] },
    ],
  },
  {
    id: "data-reporting",
    icon: PieChart,
    title: "Data & Reporting",
    intro: "Real-time dashboards and automated reports provide continuous insight into performance and processes.",
    impact: [
      { title: "Instant performance insights", sub: "Dashboards show up-to-date KPIs and trends." },
      { title: "Automated reports", sub: "Reports are generated and distributed automatically." },
      { title: "Single source of truth", sub: "All teams work with the same consistent data." },
      { title: "Early anomaly detection", sub: "Issues and deviations are spotted early." },
    ],
    categories: [
      { icon: LayoutDashboard, title: "KPI dashboards", items: ["Management dashboards", "Team dashboards", "Real-time visualizations", "Performance monitoring"] },
      { icon: FileText, title: "Automated reports", items: ["Weekly exports", "PDF reports", "Email distribution", "Custom reporting flows"] },
      { icon: Database, title: "Data consolidation", items: ["Multi-source data", "Single central data layer", "Data model optimization", "Data quality control"] },
      { icon: AlertTriangle, title: "Alerts & monitoring", items: ["Anomaly detection", "Performance alerts", "SLA monitoring", "Data flow monitoring"] },
    ],
  },
];

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

const InteractiveGridBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const spacing = 60;
    let isVisible = true;

    const visObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visObserver.observe(canvas);
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const isDark = document.documentElement.classList.contains('dark');
    const boost = isDark ? 1 : 2.5;

    let time = 0;
    const animate = () => {
      if (!isVisible) { animId = requestAnimationFrame(animate); return; }
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const lineOpacity = isDark ? 0.07 : 0.035 * boost;

      for (let x = 0; x <= w; x += spacing) {
        const offsetX = Math.sin(time * 0.3 + x * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, h);
        ctx.strokeStyle = `hsla(174, 78%, 35%, ${lineOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += spacing) {
        const offsetY = Math.sin(time * 0.2 + y * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(w, y + offsetY);
        ctx.strokeStyle = `hsla(174, 78%, 35%, ${lineOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      for (let x = 0; x <= w; x += spacing) {
        for (let y = 0; y <= h; y += spacing) {
          const ox = Math.sin(time * 0.3 + x * 0.01) * 2;
          const oy = Math.sin(time * 0.2 + y * 0.01) * 2;
          const nx = x + ox;
          const ny = y + oy;
          const pulse = Math.sin(time * 0.5 + x * 0.02 + y * 0.02) * 0.5 + 0.5;
          const radius = 1 + pulse * 0.5;
          const opacity = (0.05 + pulse * 0.05) * boost;

          ctx.beginPath();
          ctx.arc(nx, ny, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(174, 78%, 35%, ${opacity})`;
          ctx.fill();
        }
      }

      time += 0.008;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      visObserver.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const InteractiveBubbles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const visObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visObserver.observe(canvas);
    const isDark = document.documentElement.classList.contains('dark');
    const boost = isDark ? 1 : 2.5;

    const bubbles = Array.from({ length: 14 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      baseSize: 60 + Math.random() * 180,
      speed: 0.0002 + Math.random() * 0.0005,
      phase: Math.random() * Math.PI * 2,
      opacity: (0.018 + Math.random() * 0.025) * boost,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", handleMouse);

    let time = 0;
    const animate = () => {
      if (!isVisible) { animId = requestAnimationFrame(animate); return; }
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (const b of bubbles) {
        const bx = b.x * w + Math.sin(time * b.speed * 1000 + b.phase) * 30;
        const by = b.y * h + Math.cos(time * b.speed * 800 + b.phase) * 20;
        const pulse = Math.sin(time * 0.4 + b.phase) * 0.3 + 1;
        const size = b.baseSize * pulse;

        const dx = mouseRef.current.x - bx;
        const dy = mouseRef.current.y - by;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 300);
        const finalSize = size + influence * 40;
        const finalOpacity = b.opacity + influence * 0.03;

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, finalSize);
        grad.addColorStop(0, `hsla(174, 78%, 41%, ${finalOpacity})`);
        grad.addColorStop(1, `hsla(174, 78%, 41%, 0)`);

        ctx.beginPath();
        ctx.arc(bx, by, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      time += 0.016;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      visObserver.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

const PillarCard = ({
  pillar,
  sectionRef,
}: {
  pillar: (typeof pillars)[0];
  sectionRef: (el: HTMLDivElement | null) => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div ref={sectionRef} className="scroll-mt-28">
      <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 sm:p-8 transition-all duration-300 ease-out hover:scale-[1.01] hover:border-primary/40">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <pillar.icon size={18} />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">{pillar.title}</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pillar.intro}</p>

        {/* Impact block */}
        <div className="rounded-lg border border-border/50 bg-muted/40 p-5 mb-5">
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
            What does this deliver?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {pillar.impact.map((item, idx) => (
              <motion.div
                key={item.title}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-card border border-primary/15 hover:border-primary/30 transition-colors duration-200 group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
              >
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

        {/* Toggle for use cases */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-all duration-200 mb-4 relative py-1 group"
        >
          <span>{expanded ? "Hide examples" : "Example use cases"}</span>
          <ChevronDown
            size={16}
            className="transition-transform duration-300 ease-out"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
          <span className="absolute bottom-0 left-0 h-px w-0 bg-primary/40 group-hover:w-full transition-all duration-300" />
        </button>

        {/* Expandable categories */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-visible"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border/50">
                {pillar.categories.map((cat, catIdx) => (
                  <motion.div
                    key={cat.title}
                    className="rounded-lg bg-muted/40 p-4 transition-all duration-300 ease-out cursor-default overflow-hidden min-w-0"
                    style={{
                      border: "1px solid hsl(174, 78%, 41%, 0.15)",
                      boxShadow: "0 0 8px hsl(174, 78%, 41%, 0.04)",
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: catIdx * 0.08, duration: 0.4 }}
                    whileHover={{
                      borderColor: "hsl(174, 78%, 41%, 0.3)",
                      boxShadow: "0 0 12px hsl(174, 78%, 41%, 0.08)",
                    }}
                  >
                    <h3 className="text-[0.925rem] font-bold text-foreground mb-3 flex items-center gap-2">
                      <cat.icon size={16} className="text-primary" />
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
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Security CTA */}
        <div className="mt-4 pt-3 border-t border-border/30">
          <p className="text-[11px] text-muted-foreground/80 leading-relaxed">
            Including access control, logging, and a transferable architecture.
          </p>
          <Link
            to="/#beveiliging"
            className="group inline-flex items-center gap-1 text-[11px] text-foreground/70 hover:text-primary/70 transition-colors mt-1"
          >
            View our Security Approach
            <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </div>
  );
};

const Services = () => {
  const [activeSection, setActiveSection] = useState(pillars[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && sectionRefs.current[hash]) {
      setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const p of pillars) {
      const el = sectionRefs.current[p.id];
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveSection(p.id);
            }
          }
        },
        { threshold: 0.35, rootMargin: "-10% 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEOHead
        title="Autronis | Services — Process Automation, Integrations & Data"
        description="Discover our services: process automation, system integrations, and data & reporting. Scalable solutions for growing businesses."
        path="/services"
      />
      <section className="relative pt-16 pb-24 overflow-hidden">
        

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Hero */}
          <motion.div
            className="max-w-3xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Services</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              Automation without complexity
            </h1>
            <motion.p
              className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              We design and implement scalable systems that connect processes, reduce manual steps, and provide real-time insight.
            </motion.p>
          </motion.div>

          {/* Integrations marquee */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Integrations</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Works with your current systems</h2>
              <p className="text-muted-foreground">Don't see your system? If it has an API, we can almost always integrate it.</p>
            </div>

            <div className="relative mb-4 overflow-hidden py-10">
              <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
              <div className="flex animate-marquee-right gap-6 sm:gap-8 w-max items-center justify-center">
                {[...toolIconsRow1, ...toolIconsRow1, ...toolIconsRow1].map((tool, i) => (
                  <div key={i} className="relative group hover:scale-110 transition-transform duration-200">
                    <img src={tool.logo} alt={tool.name} className={`w-7 h-7 sm:w-12 sm:h-12 object-contain opacity-70 group-hover:opacity-100 transition-all duration-200 ${tool.dark ? 'dark:invert' : ''}`} loading="lazy" />
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground bg-card border border-border rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-sm">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden py-10">
              <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
              <div className="flex animate-marquee-left gap-6 sm:gap-8 w-max items-center justify-center">
                {[...toolIconsRow2, ...toolIconsRow2, ...toolIconsRow2].map((tool, i) => (
                  <div key={i} className="relative group hover:scale-110 transition-transform duration-200">
                    <img src={tool.logo} alt={tool.name} className={`w-7 h-7 sm:w-12 sm:h-12 object-contain opacity-70 group-hover:opacity-100 transition-all duration-200 ${tool.dark ? 'dark:invert' : ''}`} loading="lazy" />
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted-foreground bg-card border border-border rounded px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-sm">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile horizontal pills */}
          <nav className="lg:hidden sticky top-16 z-20 -mx-4 px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar bg-background/80 backdrop-blur-xl border-b border-border/50 mb-8">
            {pillars.map((p) => (
              <button
                key={p.id}
                onClick={() => scrollTo(p.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out shrink-0 ${
                  activeSection === p.id
                    ? "bg-primary text-primary-foreground shadow-[0_0_16px_hsl(var(--primary)/0.25)]"
                    : "text-muted-foreground hover:text-foreground opacity-60"
                }`}
              >
                {p.title}
              </button>
            ))}
          </nav>

          <div>
            <div className="space-y-12">
              {pillars.map((pillar) => (
                <PillarCard
                  key={pillar.id}
                  pillar={pillar}
                  sectionRef={(el) => (sectionRefs.current[pillar.id] = el)}
                />
              ))}
            </div>
          </div>

        {/* Quality standard */}
          <div className="mt-16 pt-12 max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <ScrollRevealItem>
                <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Quality Standard</p>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our baseline standard for every implementation</h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
                  Every implementation meets strict technical and organizational requirements. Security, control, and transferability are not add-ons — they are the foundation.
                </p>
              </ScrollRevealItem>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {[
                { icon: ShieldCheck, title: "Access control as a baseline", desc: "Least-privilege and role-based access are standard. Excessive system permissions are never applied." },
                { icon: BarChart3, title: "Logging & traceability", desc: "Logging, audit trails, and error detection are active by default in every implementation." },
                { icon: Layers, title: "Transferable architecture", desc: "Architecture remains manageable, extensible, and transferable — without unnecessary vendor lock-in." },
                { icon: Database, title: "Data governance & GDPR alignment", desc: "Data processing is set up in compliance with privacy legislation and clear guidelines." },
                { icon: FileText, title: "Complete technical documentation", desc: "Architecture, integrations, and configurations are documented and delivered in a transferable format." },
                { icon: Cog, title: "Stable & scalable infrastructure", desc: "The technical foundation is designed so systems operate reliably and can scale with your organization." },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="p-5 rounded-2xl border border-border bg-card cursor-default flex flex-col"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07, duration: 0.45 }}
                  whileHover={{
                    scale: 1.015,
                    y: -2,
                    borderColor: "hsl(174, 78%, 41%, 0.5)",
                    boxShadow: "0 4px 24px hsl(174, 78%, 33%, 0.08)",
                  }}
                >
                  <div className="flex items-center gap-2.5 sm:block mb-2 sm:mb-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 sm:mb-4">
                      <item.icon size={18} className="sm:w-5 sm:h-5" />
                    </div>
                    <p className="text-sm font-semibold text-foreground sm:hidden">{item.title}</p>
                  </div>
                  <p className="hidden sm:block text-base font-semibold text-foreground mb-2">{item.title}</p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-8 italic">
              These requirements form the foundation of every implementation.
            </p>
          </div>

          {/* ROI reference */}
          <div className="mt-16 text-center pt-12">
            <p className="text-sm text-muted-foreground mb-4">
              Every implementation is backed by an upfront impact and ROI analysis.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/impact-roi#roi-scan">
                See how we calculate ROI <ArrowRight size={18} />
              </Link>
            </Button>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Don't see your process listed?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We automate any predictable process. Schedule a free scan and discover what's possible.
            </p>
            <Button asChild size="lg">
              <Link to="/book">
                Schedule Automation Scan <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
