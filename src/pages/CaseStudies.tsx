// Layout is provided by App.tsx
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, FileText, Users, CheckCircle2 } from "lucide-react";
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
  videoUrl?: string;
  upcoming?: false;
}

const cases: ImplementedCase[] = [
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
    title: "Leadwerving en outreach automatisering",
    icon: Users,
    context: "Jobby wilde met een klein team meer bedrijven bereiken, maar het vinden van nieuwe leads en het verzamelen van contactinformatie kostte veel tijd. Het team werkte voornamelijk met handmatig zoeken en telefonische outreach, waardoor de beschikbare tijd voor opvolging en schaalbare acquisitie beperkt bleef.",
    problem: "Leads moesten handmatig worden gevonden via verschillende platformen, waarna contactinformatie en bedrijfsgegevens afzonderlijk moesten worden opgezocht. Hierdoor kostte het gemiddeld ongeveer 25 minuten om één lead volledig te verwerken en te benaderen. Daarnaast werd e-mail outreach nauwelijks ingezet, omdat het schrijven en versturen van gepersonaliseerde e-mails te tijdrovend was naast het bellen van leads.",
    solution: "We implementeerden een leadmanagement en outreach automatiseringssysteem dat leads automatisch verzamelt vanuit meerdere platformen, bedrijfsinformatie en contactgegevens direct beschikbaar maakt, snelle navigatie naar de website van de lead mogelijk maakt voor extra context, en AI gebruikt om automatisch gepersonaliseerde e-mails te genereren op basis van mogelijke pijnpunten en andere informatie op de website. Batch verzending van meerdere e-mails tegelijk werd mogelijk gemaakt, zodat het team leads sneller kan analyseren, bellen en gelijktijdig e-mail outreach kan uitvoeren.",
    results: [
      "Leadverwerking van 25 naar 5–10 minuten per lead",
      "3–5× hogere outreach efficiëntie",
      "Van geen e-mail outreach naar 50+ gepersonaliseerde e-mails per dag",
      "Snellere toegang tot contactinformatie en bedrijfscontext",
      "Meer klantgesprekken zonder extra teamcapaciteit",
    ],
    visual: LeadIsometric,
    videoUrl: "https://www.youtube-nocookie.com/embed/2pZ5mX64K3k?rel=0&modestbranding=1&showinfo=0&fs=1",
  },
];

/* ─── Page ─── */

const CaseStudies = () => {
  return (
    <>
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
              const impl = cs as ImplementedCase;

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

                          <div className="space-y-5">
                            <div>
                              <p className="text-xs font-semibold text-primary mb-1.5 tracking-wide uppercase">Context</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{impl.context}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-primary mb-1.5 tracking-wide uppercase">Probleem</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{impl.problem}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-primary mb-1.5 tracking-wide uppercase">Oplossing</p>
                              <p className="text-sm text-muted-foreground leading-relaxed">{impl.solution}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-primary mb-3 tracking-wide uppercase">Resultaat</p>
                              <ul className="space-y-2">
                                {impl.results.map((r, j) => (
                                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Visual — 2 cols */}
                        <div className={`lg:col-span-2 border-t lg:border-t-0 ${i % 2 === 1 ? 'lg:order-1 lg:border-r lg:border-l-0' : 'lg:border-l'} border-border min-h-[320px] flex items-center justify-center p-4`}>
                          {impl.videoUrl ? (
                            <iframe
                              src={impl.videoUrl}
                              title={cs.title}
                              className="w-full aspect-video rounded-lg"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <Visual />
                          )}
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
    </>
  );
};

export default CaseStudies;
