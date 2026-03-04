import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, FileText, Users, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { EcommerceIsometric, FinanceIsometric, LeadIsometric } from "@/components/case-studies/IsometricVisuals";

/* ─── Data ─── */

interface ImplementedCase {
  title: string;
  icon: React.ElementType;
  context: string;
  problem: string;
  solution: string;
  results: string[];
  visual: React.ElementType;
  upcoming?: false;
}

interface UpcomingCase {
  title: string;
  icon: React.ElementType;
  body: string;
  visual: React.ElementType;
  upcoming: true;
}

type CaseItem = ImplementedCase | UpcomingCase;

const cases: CaseItem[] = [
  {
    title: "E-commerce product- en orderautomatisering",
    icon: ShoppingCart,
    context: "Veel e-commerce organisaties beheren productinformatie, leveranciersdata, voorraad en prijzen in meerdere systemen. Hierdoor ontstaan inconsistenties en kost productbeheer onnodig veel tijd.",
    problem: "Productinformatie, voorraad en prijzen moesten handmatig worden bijgewerkt en gesynchroniseerd tussen leveranciersdata, webshop en interne systemen.",
    solution: "We implementeerden een automatiseringsstructuur waarin productdata, leveranciersfeeds, voorraadbeheer en webshopintegraties automatisch worden gesynchroniseerd en bijgewerkt.",
    results: [
      "Tot 65% minder handmatig productbeheer",
      "Realtime voorraad- en prijsupdates",
      "Snellere productupdates en lanceringen",
      "Consistente productdata tussen systemen",
    ],
    visual: EcommerceIsometric,
  },
  {
    title: "Financiële procesautomatisering",
    icon: FileText,
    context: "Financiële teams besteden vaak veel tijd aan handmatige administratie, factuurverwerking en rapportages.",
    problem: "Facturen, betalingen en rapportages werden handmatig verwerkt in verschillende systemen.",
    solution: "We automatiseerden financiële workflows via document parsing, integratie met boekhoudsoftware en automatische rapportage dashboards.",
    results: [
      "Tot 70% minder handmatige verwerking",
      "Snellere maandrapportages",
      "Betere datakwaliteit in financiële systemen",
      "Minder correctiewerk",
    ],
    visual: FinanceIsometric,
  },
  {
    title: "Leadmanagement en CRM automatisering",
    icon: Users,
    body: "We bouwen momenteel een systeem waarin inkomende leads automatisch worden verrijkt, gesynchroniseerd met het CRM en direct in opvolgworkflows worden geplaatst.\n\nBinnenkort delen we de volledige implementatie en resultaten.",
    visual: LeadIsometric,
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
              <p className="text-sm text-muted-foreground leading-relaxed">
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
                      <div className="grid grid-cols-1 lg:grid-cols-5">
                        {/* Content — 3 cols */}
                        <div className={`lg:col-span-3 p-8 sm:p-10 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <Icon size={20} />
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold">{cs.title}</h2>
                          </div>

                          {!isUpcoming ? (
                            <div className="space-y-5">
                              <div>
                                <p className="text-xs font-semibold text-primary mb-1.5 tracking-wide uppercase">Context</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{(cs as ImplementedCase).context}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-primary mb-1.5 tracking-wide uppercase">Probleem</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{(cs as ImplementedCase).problem}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-primary mb-1.5 tracking-wide uppercase">Oplossing</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{(cs as ImplementedCase).solution}</p>
                              </div>
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

                        {/* Isometric Visual — 2 cols */}
                        <div className={`lg:col-span-2 border-t lg:border-t-0 ${i % 2 === 1 ? 'lg:order-1 lg:border-r lg:border-l-0' : 'lg:border-l'} border-border bg-background min-h-[320px] flex items-center justify-center p-4`}>
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
