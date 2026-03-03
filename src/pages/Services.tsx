import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, CheckCircle2, Cog, Link2, PieChart, FolderOpen, Briefcase, Rocket, ShoppingCart, LinkIcon, CreditCard, Puzzle, BarChart3, LayoutDashboard, FileText, Database, AlertTriangle, ShieldCheck, Shield, Layers } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

const pillars = [
  {
    id: "procesautomatisering",
    icon: Cog,
    title: "Procesautomatisering",
    intro: "Wij automatiseren terugkerende processen zodat werk doorloopt zonder handmatige tussenstappen.",
    impact: [
      { title: "Tot 70% minder handmatige verwerkingstijd", sub: "Routinetaken worden volledig geautomatiseerd" },
      { title: "Foutreductie door gestandaardiseerde workflows", sub: "Consistente uitvoering zonder menselijke fouten" },
      { title: "Snellere doorlooptijden bij goedkeuringen", sub: "Escalaties en approvals verlopen automatisch" },
      { title: "Schaalbaarheid zonder extra personeel", sub: "Groei zonder lineaire personeelskosten" },
    ],
    categories: [
      { icon: FolderOpen, title: "Interne Workflow Automatisering", items: ["Goedkeuringsflows", "Taaktoewijzing", "Notificaties en escalaties", "Documentgeneratie"] },
      { icon: Briefcase, title: "Sales- en Orderautomatisering", items: ["Orderverwerking", "CRM-updates", "Facturatie workflows", "Leadopvolging"] },
      { icon: Rocket, title: "Onboarding & Offboarding", items: ["Accountcreatie", "Checklist automatisering", "Rolgebaseerde toegangsrechten", "E-signature integraties"] },
      { icon: ShoppingCart, title: "E-commerce Automatisering", items: ["Voorraadbeheer", "Retourafhandeling", "Orderstatus synchronisatie", "Dynamische pricing"] },
    ],
  },
  {
    id: "systeemintegraties",
    icon: Link2,
    title: "Systeemintegraties",
    intro: "Wij koppelen systemen via API's zodat data automatisch en consistent stroomt.",
    impact: [
      { title: "Eén consistente datastroom tussen kernsystemen", sub: "Alle data synchroon en betrouwbaar" },
      { title: "Eliminatie van dubbele data-invoer", sub: "Eénmalig invoeren, overal beschikbaar" },
      { title: "Realtime synchronisatie zonder exports", sub: "Geen handmatige CSV- of Excel-exports meer" },
      { title: "Proactieve foutdetectie en logging", sub: "Problemen worden gesignaleerd vóór ze escaleren" },
    ],
    categories: [
      { icon: LinkIcon, title: "API Koppelingen", items: ["REST API integraties", "Webhooks", "Event-based triggers", "Retry-logica"] },
      { icon: CreditCard, title: "CRM & Finance Integraties", items: ["CRM ↔ Boekhouding synchronisatie", "ERP koppelingen", "Grootboekkoppelingen", "Realtime data-uitwisseling"] },
      { icon: Puzzle, title: "Legacy Systemen", items: ["Datamigraties", "Middleware implementatie", "Maatwerk API lagen", "Systeemmodernisering"] },
      { icon: BarChart3, title: "Monitoring & Logging", items: ["Foutdetectie", "Audit logging", "Datavalidatie", "Integratie monitoring"] },
    ],
  },
  {
    id: "data-rapportage",
    icon: PieChart,
    title: "Data & Rapportage",
    intro: "Realtime dashboards en geautomatiseerde rapportages voor volledig inzicht.",
    impact: [
      { title: "Direct inzicht in KPI's en prestaties", sub: "Realtime dashboards altijd up-to-date" },
      { title: "Geautomatiseerde rapportages zonder handmatig werk", sub: "Wekelijks, maandelijks of op maat" },
      { title: "Eén bron van waarheid voor alle bedrijfsdata", sub: "Geen conflicterende spreadsheets meer" },
      { title: "Vroegtijdige detectie van afwijkingen", sub: "Anomalieën worden direct gesignaleerd" },
    ],
    categories: [
      { icon: LayoutDashboard, title: "KPI Dashboards", items: ["Management dashboards", "Team dashboards", "Realtime visualisaties", "Performance monitoring"] },
      { icon: FileText, title: "Geautomatiseerde Rapportages", items: ["Wekelijkse exports", "PDF rapportages", "E-mail distributie", "Custom rapportageflows"] },
      { icon: Database, title: "Dataconsolidatie", items: ["Multi-source data", "Eén bron van waarheid", "Datamodel optimalisatie", "Datakwaliteitscontrole"] },
      { icon: AlertTriangle, title: "Alerts & Monitoring", items: ["Anomaly detection", "Performance alerts", "SLA bewaking", "Datastroom monitoring"] },
    ],
  },
];

// dark = needs invert filter in dark mode (black SVGs from jsdelivr)
const toolIconsRow1: Array<{ name: string; logo: string; dark?: boolean }> = [
  { name: "Slack", logo: "/logos/slack.svg", dark: true },
  { name: "OpenAI", logo: "/logos/openai.svg", dark: true },
  { name: "Make", logo: "/logos/make.svg" },
  { name: "Xero", logo: "/logos/xero.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
  { name: "HubSpot", logo: "/logos/hubspot.svg" },
  { name: "Google Sheets", logo: "/logos/google-sheets.svg" },
  { name: "Twilio", logo: "/logos/twilio.svg", dark: true },
  { name: "Airtable", logo: "/logos/airtable.svg" },
  { name: "QuickBooks", logo: "/logos/quickbooks.svg" },
  { name: "Salesforce", logo: "/logos/salesforce.svg", dark: true },
];

const toolIconsRow2: Array<{ name: string; logo: string; dark?: boolean }> = [
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "Shopify", logo: "/logos/shopify.svg" },
  { name: "Mailchimp", logo: "/logos/mailchimp.svg" },
  { name: "Zapier", logo: "/logos/zapier.svg" },
  { name: "Salesforce", logo: "/logos/salesforce.svg", dark: true },
  { name: "Twilio", logo: "/logos/twilio.svg", dark: true },
  { name: "Stripe", logo: "/logos/stripe.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "HubSpot", logo: "/logos/hubspot.svg" },
  { name: "OpenAI", logo: "/logos/openai.svg", dark: true },
  { name: "Slack", logo: "/logos/slack.svg", dark: true },
  { name: "Make", logo: "/logos/make.svg" },
  { name: "Xero", logo: "/logos/xero.svg" },
  { name: "Airtable", logo: "/logos/airtable.svg" },
  { name: "Google Sheets", logo: "/logos/google-sheets.svg" },
  { name: "QuickBooks", logo: "/logos/quickbooks.svg" },
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
        <div className="rounded-lg border border-border/50 bg-primary/[0.02] p-5 mb-5">
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
            Wat levert dit op?
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

        {/* Toggle for concrete toepassingen */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-all duration-200 mb-4 relative py-1 group"
        >
          <span>{expanded ? "Verberg concrete toepassingen" : "Bekijk concrete toepassingen"}</span>
          <ChevronDown
            size={16}
            className="transition-transform duration-300 ease-out"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          />
          <span className="absolute bottom-0 left-0 h-px w-0 bg-primary/40 group-hover:w-full transition-all duration-300" />
        </button>

        {/* Expandable categories — inside the same card */}
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
                      scale: 1.02,
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
            Inclusief role-based access, logging en overdraagbare architectuur.
          </p>
          <Link
            to="/#beveiliging"
            className="group inline-flex items-center gap-1 text-[11px] text-foreground/70 hover:text-primary/70 transition-colors mt-1"
          >
            Bekijk onze Beveiligingsaanpak
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

  // IntersectionObserver for scroll-reactive nav
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
    <Layout>
      {/* Single continuous section — hero + integrations + pillars */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <AmbientLight />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Hero */}
          <motion.div
            className="max-w-3xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Services</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Automatisering zonder complexiteit.
            </h1>
            <motion.p
              className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              Wij ontwerpen en implementeren schaalbare systemen die processen verbinden,
              handmatige stappen elimineren en realtime inzicht geven.
            </motion.p>
          </motion.div>

          {/* Integrations marquee — no border, flows naturally */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Integraties</p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Werkt met uw huidige stack</h2>
              <p className="text-muted-foreground">Heeft uw systeem een API? Dan kunnen wij integreren.</p>
            </div>

            <div className="relative mb-4 overflow-hidden">
                <div className="flex animate-marquee-right gap-14 w-max items-center justify-center">
                  {[...toolIconsRow1, ...toolIconsRow1, ...toolIconsRow1].map((tool, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 hover:scale-110 transition-transform duration-200">
                      <img src={tool.logo} alt={tool.name} className={`w-10 h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200 ${tool.dark ? 'dark:invert' : ''}`} loading="lazy" />
                      <span className="text-[10px] text-muted-foreground/60 font-medium">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden">
                <div className="flex animate-marquee-left gap-14 w-max items-center justify-center">
                  {[...toolIconsRow2, ...toolIconsRow2, ...toolIconsRow2].map((tool, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 hover:scale-110 transition-transform duration-200">
                      <img src={tool.logo} alt={tool.name} className={`w-10 h-10 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200 ${tool.dark ? 'dark:invert' : ''}`} loading="lazy" />
                      <span className="text-[10px] text-muted-foreground/60 font-medium">{tool.name}</span>
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
            {/* Content */}
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

        {/* Kwaliteitsnorm */}
          <div className="mt-16 border-t border-border pt-12 max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-10">
              <ScrollRevealItem>
                <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Kwaliteitsnorm</p>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Onze vaste standaard binnen elke implementatie</h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto">
                  Elke implementatie voldoet aan vaste technische en organisatorische randvoorwaarden. Beveiliging, controle en overdraagbaarheid zijn geen toevoeging — maar uitgangspunt.
                </p>
              </ScrollRevealItem>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {[
                { icon: ShieldCheck, title: "Toegangscontrole als basis", desc: "Least-privilege en rolgebaseerde toegang zijn standaard. Overmatige systeemrechten worden niet toegepast." },
                { icon: BarChart3, title: "Logging & volledige traceerbaarheid", desc: "Realtime logging, audittrails en foutdetectie zijn standaard actief binnen elke implementatie." },
                { icon: Layers, title: "Overdraagbare architectuur", desc: "Geen vendor lock-in. Architectuur blijft beheersbaar, uitbreidbaar en overdraagbaar naar interne teams." },
                { icon: Database, title: "Datagovernance & AVG-afstemming", desc: "Dataverwerking wordt ingericht conform privacywetgeving en aantoonbare compliance-eisen." },
                { icon: FileText, title: "Volledige technische documentatie", desc: "Architectuur, integraties en configuraties worden volledig vastgelegd en overdraagbaar opgeleverd." },
                { icon: Cog, title: "Stabiele en schaalbare infrastructuur", desc: "Enterprise-grade infrastructuur die meegroeit zonder performance- of veiligheidscompromissen." },
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
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <item.icon size={20} />
                  </div>
                  <p className="text-base font-semibold text-foreground mb-2">{item.title}</p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-8">
              Zonder deze randvoorwaarden realiseren wij geen implementatie.
            </p>
          </div>

          {/* ROI reference */}
          <div className="mt-16 text-center border-t border-border pt-12">
            <p className="text-sm text-muted-foreground mb-4">
              Elke implementatie wordt vooraf onderbouwd met een impact- en ROI-analyse.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/impact-roi#roi-scan">
                Bekijk hoe wij ROI berekenen <ArrowRight size={18} />
              </Link>
            </Button>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Uw proces staat er niet tussen?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Wij automatiseren elk voorspelbaar proces. Plan een vrijblijvende scan en ontdek wat er mogelijk is.
            </p>
            <Button asChild size="lg">
              <Link to="/book">
                Plan Automation Scan <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
