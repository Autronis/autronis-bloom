import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, FileText, Users, CheckCircle2, Clock, ArrowRightLeft, Database, BarChart3, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

/* ─── Technical visuals (SVG-based diagrams) ─── */

const EcommerceVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="w-full max-w-xs space-y-3">
      {/* System nodes */}
      <div className="flex items-center justify-between">
        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-[11px] font-medium flex items-center gap-1.5">
          <Database size={12} className="text-primary" /> Leverancier
        </div>
        <ArrowRightLeft size={14} className="text-primary/50" />
        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-[11px] font-medium flex items-center gap-1.5">
          <ShoppingCart size={12} className="text-primary" /> Webshop
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-px h-6 bg-border" />
      </div>
      <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-center">
        <p className="text-[10px] font-semibold text-primary tracking-wide uppercase mb-1">Automatisering</p>
        <p className="text-[11px] text-muted-foreground">Productdata • Voorraad • Prijzen</p>
      </div>
      <div className="flex justify-center">
        <div className="w-px h-6 bg-border" />
      </div>
      <div className="flex items-center justify-between">
        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-[11px] font-medium flex items-center gap-1.5">
          <BarChart3 size={12} className="text-primary" /> ERP
        </div>
        <ArrowRightLeft size={14} className="text-primary/50" />
        <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-[11px] font-medium flex items-center gap-1.5">
          <Workflow size={12} className="text-primary" /> Fulfilment
        </div>
      </div>
    </div>
  </div>
);

const FinanceVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="w-full max-w-xs space-y-3">
      {/* Dashboard mockup */}
      <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-primary/60" />
          <p className="text-[10px] font-semibold tracking-wide uppercase text-muted-foreground">Financieel Dashboard</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded border border-border bg-background/50 p-2">
            <p className="text-[9px] text-muted-foreground/60">Facturen verwerkt</p>
            <p className="text-sm font-bold text-primary">2.847</p>
          </div>
          <div className="rounded border border-border bg-background/50 p-2">
            <p className="text-[9px] text-muted-foreground/60">Handmatig</p>
            <p className="text-sm font-bold text-muted-foreground">↓ 70%</p>
          </div>
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-1 h-10 pt-1">
          {[40, 65, 35, 80, 55, 90, 70, 85, 95, 60, 75, 88].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-primary/20" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded border border-border bg-muted/30 px-2.5 py-1.5 text-[10px] flex items-center gap-1">
          <FileText size={10} className="text-primary" /> Boekhouding
        </div>
        <ArrowRightLeft size={12} className="text-primary/40" />
        <div className="rounded border border-border bg-muted/30 px-2.5 py-1.5 text-[10px] flex items-center gap-1">
          <BarChart3 size={10} className="text-primary" /> Rapportage
        </div>
      </div>
    </div>
  </div>
);

const LeadVisual = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <div className="w-full max-w-xs space-y-3">
      <div className="rounded-lg border border-border bg-muted/30 p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
          <p className="text-[10px] font-semibold tracking-wide uppercase text-muted-foreground">Coming soon</p>
        </div>
        <div className="space-y-2">
          {["Lead intake", "Verrijking", "CRM sync", "Opvolgworkflow"].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[9px] ${i < 2 ? 'border-primary/40 text-primary/60' : 'border-border text-muted-foreground/40'}`}>
                {i + 1}
              </div>
              <div className={`flex-1 rounded border px-2.5 py-1.5 text-[11px] ${i < 2 ? 'border-primary/20 bg-primary/5 text-muted-foreground' : 'border-border bg-muted/20 text-muted-foreground/50'}`}>
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Data ─── */

interface ImplementedCase {
  title: string;
  icon: React.ElementType;
  description: string;
  results: string[];
  visual: React.ElementType;
  upcoming?: false;
}

interface UpcomingCase {
  title: string;
  icon: React.ElementType;
  description: string;
  body: string;
  visual: React.ElementType;
  upcoming: true;
}

type CaseItem = ImplementedCase | UpcomingCase;

const cases: CaseItem[] = [
  {
    title: "E-commerce product- en orderautomatisering",
    icon: ShoppingCart,
    description: "Automatisering van productdata, voorraadbeheer en orderverwerking tussen leverancierssystemen, webshop en interne systemen.",
    results: [
      "Tot 65% minder handmatig productbeheer",
      "Realtime voorraad- en prijsupdates",
      "Snellere productupdates en lanceringen",
      "Consistente productdata tussen systemen",
    ],
    visual: EcommerceVisual,
  },
  {
    title: "Financiële procesautomatisering",
    icon: FileText,
    description: "Automatisering van factuurverwerking, rapportages en financiële datastromen via integraties tussen boekhoudsoftware en dashboards.",
    results: [
      "Tot 70% minder handmatige verwerking",
      "Snellere maandrapportages",
      "Betere datakwaliteit in financiële systemen",
      "Minder correctiewerk",
    ],
    visual: FinanceVisual,
  },
  {
    title: "Leadmanagement en CRM automatisering",
    icon: Users,
    description: "Een implementatie waarin inkomende leads automatisch worden verrijkt en gesynchroniseerd met het CRM.",
    body: "We bouwen momenteel een systeem waarin inkomende leads automatisch worden verrijkt, gesynchroniseerd met het CRM en direct in opvolgworkflows worden geplaatst.\n\nBinnenkort delen we de volledige implementatie en resultaten.",
    visual: LeadVisual,
    upcoming: true,
  },
];

/* ─── Page ─── */

const CaseStudies = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-16">
            <ScrollRevealItem>
              <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Case Studies</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Onze implementaties</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Concrete voorbeelden van hoe automatisering processen versnelt, fouten vermindert en schaalbaarheid mogelijk maakt.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <div className="space-y-8">
            {cases.map((cs, i) => {
              const Icon = cs.icon;
              const Visual = cs.visual;
              const isUpcoming = cs.upcoming;

              return (
                <ScrollReveal key={i}>
                  <ScrollRevealItem>
                    <div className="rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/30">
                      <div className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
                        {/* Content */}
                        <div className={`p-8 sm:p-10 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <Icon size={20} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold">{cs.title}</h2>
                          </div>

                          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{cs.description}</p>

                          {!isUpcoming ? (
                            <div>
                              <p className="text-xs font-semibold text-primary mb-3 tracking-wide uppercase">Resultaat</p>
                              <ul className="space-y-2">
                                {(cs as ImplementedCase).results.map((r, j) => (
                                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <div className="rounded-lg border border-border bg-muted/30 p-4">
                              <div className="flex items-center gap-1.5 mb-2">
                                <Clock size={12} className="text-primary" />
                                <p className="text-xs font-semibold">Coming soon</p>
                              </div>
                              {(cs as UpcomingCase).body.split("\n\n").map((p, j) => (
                                <p key={j} className="text-sm text-muted-foreground leading-relaxed mb-2 last:mb-0">{p}</p>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Visual */}
                        <div className={`border-t lg:border-t-0 ${i % 2 === 1 ? 'lg:order-1 lg:border-r lg:border-l-0' : 'lg:border-l'} border-border bg-muted/10 min-h-[280px]`}>
                          <Visual />
                        </div>
                      </div>
                    </div>
                  </ScrollRevealItem>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal className="text-center mt-12">
            <ScrollRevealItem>
              <Button asChild size="lg">
                <Link to="/book">
                  Plan Automation Scan
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Ontdek wat automatisering voor uw organisatie kan betekenen.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
