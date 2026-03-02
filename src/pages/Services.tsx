import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, CheckCircle2, FolderOpen, Briefcase, Rocket, ShoppingCart, LinkIcon, CreditCard, Puzzle, BarChart3, LayoutDashboard, FileText, Database, AlertTriangle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";

const pillars = [
  {
    id: "procesautomatisering",
    title: "Procesautomatisering",
    subtitle: "Gestructureerde automatisering van operationele en commerciële processen.",
    impact: [
      { title: "Minder handmatige verwerking", sub: "Routinetaken volledig geautomatiseerd" },
      { title: "Kortere doorlooptijden", sub: "Goedkeuringen en escalaties verlopen sneller" },
      { title: "Minder fouten in processen", sub: "Gestandaardiseerde workflows elimineren variatie" },
      { title: "Meer voorspelbaarheid en controle", sub: "Inzicht in elke processtap" },
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
    title: "Systeemintegraties",
    subtitle: "Betrouwbare koppelingen tussen kernsystemen voor consistente datastromen.",
    impact: [
      { title: "Geen dubbele invoer", sub: "Eénmalig invoeren, overal beschikbaar" },
      { title: "Betrouwbare datastromen", sub: "Consistente synchronisatie zonder fouten" },
      { title: "Realtime synchronisatie tussen systemen", sub: "Geen handmatige exports meer nodig" },
      { title: "Minder afhankelijkheid van spreadsheets", sub: "Data leeft in geïntegreerde systemen" },
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
    title: "Data & Rapportage",
    subtitle: "Realtime inzicht en controle over uw bedrijfsdata.",
    impact: [
      { title: "Realtime inzicht in prestaties", sub: "Dashboards altijd up-to-date" },
      { title: "Snellere besluitvorming", sub: "Data-gedreven keuzes op basis van feiten" },
      { title: "Eén bron van waarheid", sub: "Geen conflicterende bronnen meer" },
      { title: "Minder handmatige rapportage", sub: "Geautomatiseerde exports en distributie" },
    ],
    categories: [
      { icon: LayoutDashboard, title: "KPI Dashboards", items: ["Management dashboards", "Team dashboards", "Realtime visualisaties", "Performance monitoring"] },
      { icon: FileText, title: "Geautomatiseerde Rapportages", items: ["Wekelijkse exports", "PDF rapportages", "E-mail distributie", "Custom rapportageflows"] },
      { icon: Database, title: "Dataconsolidatie", items: ["Multi-source data", "Eén bron van waarheid", "Datamodel optimalisatie", "Datakwaliteitscontrole"] },
      { icon: AlertTriangle, title: "Alerts & Monitoring", items: ["Anomaly detection", "Performance alerts", "SLA bewaking", "Datastroom monitoring"] },
    ],
  },
];

const toolIcons = [
  "Make", "Zapier", "n8n", "HubSpot", "Salesforce", "Slack", "Notion", "Airtable",
  "Google Sheets", "Stripe", "Shopify", "Xero", "QuickBooks", "Mailchimp", "Twilio", "OpenAI",
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

    let time = 0;
    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      for (let x = 0; x <= w; x += spacing) {
        const offsetX = Math.sin(time * 0.3 + x * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(x + offsetX, 0);
        ctx.lineTo(x + offsetX, h);
        ctx.strokeStyle = `hsla(174, 78%, 41%, 0.035)`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += spacing) {
        const offsetY = Math.sin(time * 0.2 + y * 0.01) * 2;
        ctx.beginPath();
        ctx.moveTo(0, y + offsetY);
        ctx.lineTo(w, y + offsetY);
        ctx.strokeStyle = `hsla(174, 78%, 41%, 0.035)`;
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
          const opacity = 0.05 + pulse * 0.05;

          ctx.beginPath();
          ctx.arc(nx, ny, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(174, 78%, 41%, ${opacity})`;
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
      style={{ opacity: 1 }}
    />
  );
};

const PillarSection = ({
  pillar,
  hoveredCards,
  setHoveredCards,
  sectionRef,
}: {
  pillar: (typeof pillars)[0];
  hoveredCards: Record<string, number | null>;
  setHoveredCards: React.Dispatch<React.SetStateAction<Record<string, number | null>>>;
  sectionRef: (el: HTMLDivElement | null) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hovered = hoveredCards[pillar.id] ?? null;

  return (
    <div ref={sectionRef} className="scroll-mt-24">
      <ScrollReveal>
        <ScrollRevealItem>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">{pillar.title}</h2>
          <p className="text-muted-foreground mb-6">{pillar.subtitle}</p>
        </ScrollRevealItem>
      </ScrollReveal>

      {/* Impact block - mini highlight blocks */}
      <ScrollReveal>
        <ScrollRevealItem>
          <div className="rounded-xl border border-border bg-card/50 p-6 mb-6">
            <p className="text-xs font-semibold text-primary mb-4 tracking-widest uppercase">
              Wat levert dit op?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pillar.impact.map((item, idx) => (
                <motion.div
                  key={item.title}
                  className="flex items-start gap-3 p-3 rounded-lg bg-primary/[0.04] hover:bg-primary/[0.08] hover:shadow-[0_0_15px_hsl(var(--primary)/0.08)] transition-all duration-200 group"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 size={13} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground leading-tight">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollRevealItem>
      </ScrollReveal>

      {/* Toggle control bar */}
      <ScrollReveal>
        <ScrollRevealItem>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-all duration-200 mb-6 relative py-1 group"
          >
            <span>{expanded ? "Verberg concrete toepassingen" : "Bekijk concrete toepassingen"}</span>
            <ChevronDown
              size={16}
              className="transition-transform duration-300 ease-out"
              style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            />
            <span className="absolute bottom-0 left-0 h-px w-0 bg-primary/40 group-hover:w-full transition-all duration-300" />
          </button>
        </ScrollRevealItem>
      </ScrollReveal>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6" staggerChildren={0.06}>
              {pillar.categories.map((cat, i) => (
                <ScrollRevealItem key={cat.title}>
                  <GlowCard
                    className="rounded-xl border border-border bg-card p-6 h-full"
                    isAnyHovered={hovered !== null}
                    isHovered={hovered === i}
                    onHover={() => setHoveredCards((prev) => ({ ...prev, [pillar.id]: i }))}
                    onLeave={() => setHoveredCards((prev) => ({ ...prev, [pillar.id]: null }))}
                  >
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <cat.icon size={15} className="text-primary" />
                      {cat.title}
                    </h3>
                    <ul className="space-y-1.5">
                      {cat.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </GlowCard>
                </ScrollRevealItem>
              ))}
            </ScrollReveal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Services = () => {
  const [activeSection, setActiveSection] = useState(pillars[0].id);
  const [hoveredCards, setHoveredCards] = useState<Record<string, number | null>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      let current = pillars[0].id;
      for (const p of pillars) {
        const el = sectionRefs.current[p.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.4) {
            current = p.id;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        <InteractiveGridBg />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
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
        </div>
      </section>

      {/* Pillar sections with sticky nav */}
      <section className="pb-24 relative overflow-hidden">
        {/* Bubbles background below grid area */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { x: "10%", y: "15%", size: 280, opacity: 0.06, delay: 0 },
            { x: "85%", y: "20%", size: 240, opacity: 0.05, delay: 1.4 },
            { x: "45%", y: "45%", size: 320, opacity: 0.05, delay: 0.8 },
            { x: "20%", y: "70%", size: 260, opacity: 0.06, delay: 2 },
            { x: "75%", y: "75%", size: 240, opacity: 0.05, delay: 2.6 },
            { x: "55%", y: "85%", size: 200, opacity: 0.06, delay: 1 },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [b.opacity, b.opacity * 1.6, b.opacity] }}
              transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
              style={{
                left: b.x, top: b.y, width: b.size, height: b.size,
                background: `radial-gradient(circle, hsl(var(--primary) / ${b.opacity}), transparent 70%)`,
                filter: "blur(50px)", transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex gap-12">
            {/* Mobile horizontal pills */}
            <nav className="lg:hidden sticky top-16 z-20 -mx-4 px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar bg-background/80 backdrop-blur-xl border-b border-border/50">
              {pillars.map((p) => (
                <button
                  key={p.id}
                  onClick={() => scrollTo(p.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out shrink-0 ${
                    activeSection === p.id
                      ? "bg-primary/15 text-primary shadow-[0_0_12px_hsl(var(--primary)/0.15)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </nav>

            {/* Sticky side nav (desktop) */}
            <nav className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-1">
                {pillars.map((p) => {
                  const isActive = activeSection === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => scrollTo(p.id)}
                      className="relative block w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300 ease-out"
                      style={{
                        backgroundColor: isActive ? "hsl(var(--primary) / 0.1)" : "transparent",
                        color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                        fontWeight: isActive ? 600 : 400,
                        boxShadow: isActive ? "0 0 20px hsl(var(--primary) / 0.08)" : "none",
                      }}
                    >
                      {/* Sliding indicator bar */}
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] rounded-full bg-primary transition-all duration-300 ease-out"
                        style={{
                          height: isActive ? "60%" : "0%",
                          opacity: isActive ? 1 : 0,
                        }}
                      />
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Content */}
            <div className="flex-1 space-y-20">
              {pillars.map((pillar) => (
                <PillarSection
                  key={pillar.id}
                  pillar={pillar}
                  hoveredCards={hoveredCards}
                  setHoveredCards={setHoveredCards}
                  sectionRef={(el) => (sectionRefs.current[pillar.id] = el)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tool icons marquee */}
      <section className="py-16 border-t border-border overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 text-center mb-10">
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Integraties</p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Werkt met uw huidige stack</h2>
          <p className="text-muted-foreground">Heeft uw systeem een API? Dan kunnen wij integreren.</p>
        </div>

        <div className="relative mb-4 overflow-hidden">
          <div className="flex animate-[marquee-right_30s_linear_infinite] gap-4 w-max">
            {[...toolIcons, ...toolIcons].map((tool, i) => (
              <div key={i} className="flex items-center justify-center px-5 py-3 rounded-lg border border-border bg-card text-sm text-muted-foreground whitespace-nowrap hover:scale-105 hover:border-primary/30 hover:text-foreground transition-all duration-200">
                {tool}
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-[marquee-left_25s_linear_infinite] gap-4 w-max">
            {[...toolIcons.slice().reverse(), ...toolIcons.slice().reverse()].map((tool, i) => (
              <div key={i} className="flex items-center justify-center px-5 py-3 rounded-lg border border-border bg-card text-sm text-muted-foreground whitespace-nowrap hover:scale-105 hover:border-primary/30 hover:text-foreground transition-all duration-200">
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
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
      </section>
    </Layout>
  );
};

export default Services;
