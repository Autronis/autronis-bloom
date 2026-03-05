import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, FileText, Users, CheckCircle2, TrendingUp, Clock, Zap, Mail, BarChart3, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { EcommerceIsometric, FinanceIsometric, LeadIsometric } from "@/components/case-studies/IsometricVisuals";

/* ─── Types ─── */

interface CaseMetric {
  icon: React.ElementType;
  value: string;
  label: string;
}

interface CaseStudy {
  title: string;
  icon: React.ElementType;
  metrics: CaseMetric[];
  context: string;
  problem: string;
  solution: string;
  results: string[];
  technology: string[];
  visual: React.ElementType;
  videoUrl?: string;
}

/* ─── Data ─── */

const cases: CaseStudy[] = [
  {
    title: "E-commerce product- en orderautomatisering",
    icon: ShoppingCart,
    metrics: [
      { icon: Clock, value: "65%", label: "Minder handmatig productbeheer" },
      { icon: Zap, value: "Realtime", label: "Voorraad- en prijsupdates" },
      { icon: TrendingUp, value: "3×", label: "Snellere productupdates" },
    ],
    context: "Veel e-commerce organisaties beheren productinformatie, leveranciersdata, voorraad en prijzen in meerdere systemen. Hierdoor ontstaan inconsistenties en kost productbeheer onnodig veel tijd.",
    problem: "Productinformatie, voorraad en prijzen moesten handmatig worden bijgewerkt en gesynchroniseerd tussen leveranciersdata, webshop en interne systemen.",
    solution: "We implementeerden een automatiseringsstructuur waarin productdata, leveranciersfeeds, voorraadbeheer en webshopintegraties automatisch worden gesynchroniseerd en bijgewerkt.",
    results: [
      "Tot 65% minder handmatig productbeheer",
      "Realtime voorraad- en prijsupdates",
      "Snellere productupdates en lanceringen",
      "Consistente productdata tussen systemen",
    ],
    technology: ["API-integraties", "Workflow automatisering", "Data synchronisatie", "ERP-koppeling"],
    visual: EcommerceIsometric,
  },
  {
    title: "Financiële procesautomatisering",
    icon: FileText,
    metrics: [
      { icon: Clock, value: "70%", label: "Minder handmatige verwerking" },
      { icon: BarChart3, value: "2×", label: "Snellere maandrapportages" },
      { icon: Target, value: "95%+", label: "Datakwaliteit" },
    ],
    context: "Financiële teams besteden vaak veel tijd aan handmatige administratie, factuurverwerking en rapportages.",
    problem: "Facturen, betalingen en rapportages werden handmatig verwerkt in verschillende systemen.",
    solution: "We automatiseerden financiële workflows via document parsing, integratie met boekhoudsoftware en automatische rapportage dashboards.",
    results: [
      "Tot 70% minder handmatige verwerking",
      "Snellere maandrapportages",
      "Betere datakwaliteit in financiële systemen",
      "Minder correctiewerk",
    ],
    technology: ["Document parsing", "Boekhoudsoftware-integratie", "Dashboards", "Workflow automatisering"],
    visual: FinanceIsometric,
  },
  {
    title: "Leadwerving en outreach automatisering",
    icon: Users,
    metrics: [
      { icon: Clock, value: "25→5 min", label: "Leadverwerking per lead" },
      { icon: TrendingUp, value: "3–5×", label: "Hogere outreach efficiëntie" },
      { icon: Mail, value: "50+", label: "Gepersonaliseerde e-mails per dag" },
      { icon: Zap, value: "0→50+", label: "Van geen naar dagelijkse e-mail outreach" },
    ],
    context: "Jobby wilde met een klein team meer bedrijven bereiken, maar het vinden van nieuwe leads en het verzamelen van contactinformatie kostte veel tijd. Het team werkte voornamelijk met handmatig zoeken en telefonische outreach.",
    problem: "Leads moesten handmatig worden gevonden via verschillende platformen, waarna contactinformatie en bedrijfsgegevens afzonderlijk moesten worden opgezocht. Dit kostte gemiddeld ongeveer 25 minuten per lead. E-mail outreach werd nauwelijks ingezet omdat het te tijdrovend was.",
    solution: "We implementeerden een leadmanagement en outreach automatiseringssysteem dat leads automatisch verzamelt, bedrijfsinformatie direct beschikbaar maakt, en AI gebruikt om automatisch gepersonaliseerde e-mails te genereren op basis van mogelijke pijnpunten.",
    results: [
      "Leadverwerking van 25 naar 5–10 minuten per lead",
      "3–5× hogere outreach efficiëntie",
      "Van geen e-mail outreach naar 50+ gepersonaliseerde e-mails per dag",
      "Snellere toegang tot contactinformatie en bedrijfscontext",
      "Meer klantgesprekken zonder extra teamcapaciteit",
    ],
    technology: ["AI automatisering", "Data verrijking", "API-integraties", "E-mail automatisering", "CRM-koppeling"],
    visual: LeadIsometric,
    videoUrl: "https://www.autronis.nl/videos/videodemo.mp4",
  },
];

/* ─── Metric Card ─── */
const MetricCard = ({ metric }: { metric: CaseMetric }) => {
  const Icon = metric.icon;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
      <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold text-foreground leading-tight">{metric.value}</p>
        <p className="text-xs text-muted-foreground leading-snug">{metric.label}</p>
      </div>
    </div>
  );
};

/* ─── Single Case Study ─── */
const CaseStudyCard = ({ cs, index }: { cs: CaseStudy; index: number }) => {
  const Icon = cs.icon;
  const Visual = cs.visual;
  const isEven = index % 2 === 0;

  return (
    <ScrollReveal>
      <ScrollRevealItem>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 pb-0 sm:pb-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Icon size={20} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">{cs.title}</h2>
            </div>

            {/* Metrics highlight */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {cs.metrics.map((m, j) => (
                <MetricCard key={j} metric={m} />
              ))}
            </div>
          </div>

          {/* Main content: visual + details */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Visual */}
            <div className={`border-t lg:border-t border-border min-h-[280px] flex items-center justify-center p-4 sm:p-6 ${isEven ? '' : 'lg:order-2'}`}>
              {cs.videoUrl ? (
                <video
                  src={cs.videoUrl}
                  className="w-full aspect-video rounded-lg"
                  controls
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                />
              ) : (
                <Visual />
              )}
            </div>

            {/* Details */}
            <div className={`border-t ${isEven ? 'lg:border-l' : 'lg:border-r lg:order-1'} border-border p-6 sm:p-8 space-y-5`}>
              <div>
                <p className="text-xs font-semibold text-primary mb-1.5 tracking-wide uppercase">Context</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{cs.context}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-primary mb-1.5 tracking-wide uppercase">Probleem</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{cs.problem}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-primary mb-1.5 tracking-wide uppercase">Oplossing</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{cs.solution}</p>
              </div>
            </div>
          </div>

          {/* Bottom: Technology + Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-border">
            {/* Technology */}
            <div className="p-6 sm:p-8 lg:border-r border-border">
              <p className="text-xs font-semibold text-primary mb-3 tracking-wide uppercase">Technologie</p>
              <div className="flex flex-wrap gap-2">
                {cs.technology.map((t, j) => (
                  <Badge key={j} variant="secondary" className="text-xs font-medium bg-secondary text-secondary-foreground">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="p-6 sm:p-8 border-t lg:border-t-0 border-border">
              <p className="text-xs font-semibold text-primary mb-3 tracking-wide uppercase">Resultaat</p>
              <ul className="space-y-2">
                {cs.results.map((r, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollRevealItem>
    </ScrollReveal>
  );
};

/* ─── Page ─── */
const CaseStudies = () => {
  return (
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

        <div className="space-y-10">
          {cases.map((cs, i) => (
            <CaseStudyCard key={i} cs={cs} index={i} />
          ))}
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
  );
};

export default CaseStudies;
