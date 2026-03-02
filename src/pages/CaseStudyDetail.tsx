import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import AnimatedBubbles from "@/components/home/AnimatedBubbles";

const caseData: Record<string, {
  client: string; industry: string; metric: string;
  context: string; challenge: string; solution: string; result: string;
}> = {
  "logistiek-bedrijf": {
    client: "TransFlow B.V.",
    industry: "Logistiek",
    metric: "73% snellere orderverwerking",
    context: "TransFlow is een middelgroot logistiek bedrijf (120 medewerkers) gespecialiseerd in last-mile delivery voor e-commerce. Het team verwerkte dagelijks honderden orders handmatig.",
    challenge: "Orderinvoer, validatie en routeplanning kostten het operations-team gemiddeld 6 uur per dag. Fouten in adressen en dubbele boekingen leidden tot vertragingen en klachten.",
    solution: "We bouwden een end-to-end automatisering: orders worden automatisch gevalideerd via API-koppelingen, gerouteerd op basis van postcode en capaciteit, en klanten ontvangen real-time statusupdates.",
    result: "Orderverwerkingstijd daalde met 73%. Foutpercentage zakte van 8% naar 0.3%. Het team herbezette 4 FTE naar strategisch werk. Klanttevredenheid steeg met 22 punten.",
  },
  "saas-scale-up": {
    client: "CloudMetrics",
    industry: "SaaS",
    metric: "40 uur/week bespaard",
    context: "CloudMetrics is een snelgroeiende SaaS-startup (45 medewerkers) met een analytics platform. Het customer success team werd overspoeld door groeiende onboarding- en supportvragen.",
    challenge: "Handmatige onboarding duurde 2 weken per klant. Billing-issues werden ad hoc afgehandeld. Churn-signalen werden pas opgemerkt als het te laat was.",
    solution: "We automatiseerden de volledige onboarding flow (welkomstmails, setup-checklists, training-scheduling), koppelden billing aan usage-data, en bouwden proactieve churn-alerts op basis van engagement-metrics.",
    result: "Het CS-team bespaart 40 uur per week. Onboarding-tijd daalde van 14 naar 3 dagen. Churn daalde met 18% in het eerste kwartaal na implementatie.",
  },
  "e-commerce-groei": {
    client: "StyleDirect",
    industry: "E-commerce",
    metric: "2.4x meer conversies",
    context: "StyleDirect is een direct-to-consumer fashion merk (30 medewerkers) dat worstelde met lage conversiepercentages en hoge CAC ondanks stijgend verkeer.",
    challenge: "Productaanbevelingen waren statisch, abandoned cart follow-ups waren handmatig, en pricing werd niet geoptimaliseerd op basis van vraag en voorraad.",
    solution: "We implementeerden AI-gedreven productaanbevelingen, geautomatiseerde abandoned cart sequences (email + SMS), en een dynamisch pricing model gekoppeld aan voorraad en competitordata.",
    result: "Conversieratio steeg van 1.8% naar 4.3% (2.4x). Gemiddelde orderwaarde steeg met 15%. CAC daalde met 30% door hogere organische conversie.",
  },
};

const slugs = Object.keys(caseData);

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = slug ? caseData[slug] : undefined;
  if (!cs) return <Navigate to="/case-studies" replace />;

  const currentIndex = slugs.indexOf(slug!);
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];

  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <AnimatedBubbles />
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/case-studies" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft size={14} /> Alle case studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{cs.industry}</span>
                <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2">{cs.client}</h1>
                <p className="text-2xl font-bold text-primary">{cs.metric}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Context</h2>
                <p className="text-muted-foreground leading-relaxed">{cs.context}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Uitdaging</h2>
                <p className="text-muted-foreground leading-relaxed">{cs.challenge}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Oplossing</h2>
                <p className="text-muted-foreground leading-relaxed">{cs.solution}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Resultaat</h2>
                <p className="text-muted-foreground leading-relaxed">{cs.result}</p>
              </div>

              <Link to={`/case-studies/${nextSlug}`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                Volgende case study <ArrowRight size={14} />
              </Link>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:sticky lg:top-24 self-start">
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Vergelijkbare resultaten behalen?</h3>
                <p className="text-sm text-muted-foreground">Plan een vrijblijvende Automation Scan en ontdek wat wij voor uw bedrijf kunnen automatiseren.</p>
                <Button asChild className="w-full">
                  <Link to="/book">Plan Automation Scan <ArrowRight size={14} /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudyDetail;
