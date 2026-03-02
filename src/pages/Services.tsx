import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";

const pillars = [
  {
    id: "procesautomatisering",
    title: "Procesautomatisering",
    subtitle: "Gestructureerde automatisering van operationele en commerciële processen.",
    categories: [
      {
        title: "Interne Workflow Automatisering",
        items: ["Goedkeuringsflows", "Taaktoewijzing", "Notificaties en escalaties", "Documentgeneratie"],
      },
      {
        title: "Sales- en Orderautomatisering",
        items: ["Orderverwerking", "CRM-updates", "Facturatie workflows", "Leadopvolging"],
      },
      {
        title: "Onboarding & Offboarding",
        items: ["Accountcreatie", "Checklist automatisering", "Rolgebaseerde toegangsrechten", "E-signature integraties"],
      },
      {
        title: "E-commerce Automatisering",
        items: ["Voorraadbeheer", "Retourafhandeling", "Orderstatus synchronisatie", "Dynamische pricing"],
      },
    ],
  },
  {
    id: "systeemintegraties",
    title: "Systeemintegraties",
    subtitle: "Betrouwbare koppelingen tussen kernsystemen voor consistente datastromen.",
    categories: [
      {
        title: "API Koppelingen",
        items: ["REST API integraties", "Webhooks", "Event-based triggers", "Retry-logica"],
      },
      {
        title: "CRM & Finance Integraties",
        items: ["CRM ↔ Boekhouding synchronisatie", "ERP koppelingen", "Grootboekkoppelingen", "Realtime data-uitwisseling"],
      },
      {
        title: "Legacy Systemen",
        items: ["Datamigraties", "Middleware implementatie", "Maatwerk API lagen", "Systeemmodernisering"],
      },
      {
        title: "Monitoring & Logging",
        items: ["Foutdetectie", "Audit logging", "Datavalidatie", "Integratie monitoring"],
      },
    ],
  },
  {
    id: "data-rapportage",
    title: "Data & Rapportage",
    subtitle: "Realtime inzicht en controle over uw bedrijfsdata.",
    categories: [
      {
        title: "KPI Dashboards",
        items: ["Management dashboards", "Team dashboards", "Realtime visualisaties", "Performance monitoring"],
      },
      {
        title: "Geautomatiseerde Rapportages",
        items: ["Wekelijkse exports", "PDF rapportages", "E-mail distributie", "Custom rapportageflows"],
      },
      {
        title: "Dataconsolidatie",
        items: ["Multi-source data", "Eén bron van waarheid", "Datamodel optimalisatie", "Datakwaliteitscontrole"],
      },
      {
        title: "Alerts & Monitoring",
        items: ["Anomaly detection", "Performance alerts", "SLA bewaking", "Datastroom monitoring"],
      },
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
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Services
            </p>
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
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex gap-12">
            {/* Sticky side nav (desktop) */}
            <nav className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-2">
                {pillars.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => scrollTo(p.id)}
                    className="block w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-300"
                    style={{
                      backgroundColor: activeSection === p.id ? "hsl(var(--primary) / 0.1)" : "transparent",
                      color: activeSection === p.id ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                      borderLeft: activeSection === p.id ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                      fontWeight: activeSection === p.id ? 600 : 400,
                    }}
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </nav>

            {/* Content */}
            <div className="flex-1 space-y-20">
              {pillars.map((pillar) => {
                const hovered = hoveredCards[pillar.id] ?? null;
                return (
                  <div
                    key={pillar.id}
                    ref={(el) => (sectionRefs.current[pillar.id] = el)}
                    className="scroll-mt-24"
                  >
                    <ScrollReveal>
                      <ScrollRevealItem>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{pillar.title}</h2>
                        <p className="text-muted-foreground mb-8">{pillar.subtitle}</p>
                      </ScrollRevealItem>
                    </ScrollReveal>
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
                            <h3 className="font-semibold mb-3">{cat.title}</h3>
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tool icons marquee */}
      <section className="py-16 border-t border-border overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 text-center mb-10">
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
            Integraties
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Werkt met uw huidige stack
          </h2>
          <p className="text-muted-foreground">
            Heeft uw systeem een API? Dan kunnen wij integreren.
          </p>
        </div>

        <div className="relative mb-4 overflow-hidden">
          <div className="flex animate-[marquee-right_30s_linear_infinite] gap-4 w-max">
            {[...toolIcons, ...toolIcons].map((tool, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-5 py-3 rounded-lg border border-border bg-card text-sm text-muted-foreground whitespace-nowrap hover:scale-105 hover:border-primary/30 hover:text-foreground transition-all duration-200"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-[marquee-left_25s_linear_infinite] gap-4 w-max">
            {[...toolIcons.slice().reverse(), ...toolIcons.slice().reverse()].map((tool, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-5 py-3 rounded-lg border border-border bg-card text-sm text-muted-foreground whitespace-nowrap hover:scale-105 hover:border-primary/30 hover:text-foreground transition-all duration-200"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Uw proces staat er niet tussen?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Wij automatiseren elk voorspelbaar proces. Plan een vrijblijvende scan en
            ontdek wat er mogelijk is.
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
