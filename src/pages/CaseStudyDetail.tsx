// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/context";

interface CaseContent {
  client: string; industry: string; metric: string;
  context: string; challenge: string; solution: string; result: string;
}

const caseData: Record<string, Record<"en" | "nl", CaseContent>> = {
  "logistics-company": {
    en: { client: "TransFlow B.V.", industry: "Logistics", metric: "73% faster order processing", context: "TransFlow is a mid-sized logistics company (120 employees) specialized in last-mile delivery for e-commerce. The team processed hundreds of orders manually every day.", challenge: "Order entry, validation, and route planning cost the operations team an average of 6 hours per day. Address errors and duplicate bookings led to delays and complaints.", solution: "We built an end-to-end automation: orders are automatically validated via API connections, routed based on postal code and capacity, and customers receive real-time status updates.", result: "Order processing time decreased by 73%. Error rate dropped from 8% to 0.3%. The team redeployed 4 FTE to strategic work. Customer satisfaction increased by 22 points." },
    nl: { client: "TransFlow B.V.", industry: "Logistiek", metric: "73% snellere orderverwerking", context: "TransFlow is een middelgroot logistiek bedrijf (120 medewerkers) gespecialiseerd in last-mile delivery voor e-commerce. Het team verwerkte dagelijks honderden orders handmatig.", challenge: "Orderinvoer, validatie en routeplanning kostten het operations-team gemiddeld 6 uur per dag. Adresfouten en dubbele boekingen leidden tot vertragingen en klachten.", solution: "We bouwden een end-to-end automatisering: orders worden automatisch gevalideerd via API-koppelingen, gerouteerd op basis van postcode en capaciteit, en klanten ontvangen realtime statusupdates.", result: "Orderverwerkingstijd daalde met 73%. Foutpercentage daalde van 8% naar 0,3%. Het team heeft 4 FTE ingezet voor strategisch werk. Klanttevredenheid steeg met 22 punten." },
  },
  "saas-scale-up": {
    en: { client: "CloudMetrics", industry: "SaaS", metric: "40 hours/week saved", context: "CloudMetrics is a fast-growing SaaS startup (45 employees) with an analytics platform. The customer success team was overwhelmed by growing onboarding and support requests.", challenge: "Manual onboarding took 2 weeks per customer. Billing issues were handled ad hoc. Churn signals were only noticed when it was too late.", solution: "We automated the complete onboarding flow (welcome emails, setup checklists, training scheduling), connected billing to usage data, and built proactive churn alerts based on engagement metrics.", result: "The CS team saves 40 hours per week. Onboarding time decreased from 14 to 3 days. Churn decreased by 18% in the first quarter after implementation." },
    nl: { client: "CloudMetrics", industry: "SaaS", metric: "40 uur/week bespaard", context: "CloudMetrics is een snelgroeiende SaaS-startup (45 medewerkers) met een analyseplatform. Het customer success-team werd overspoeld door groeiende onboarding- en supportverzoeken.", challenge: "Handmatige onboarding duurde 2 weken per klant. Factureringsproblemen werden ad hoc afgehandeld. Churnsignalen werden pas opgemerkt als het te laat was.", solution: "We automatiseerden de volledige onboarding-flow (welkomstmails, setup-checklists, trainingsplanning), koppelden facturering aan gebruiksdata en bouwden proactieve churn-alerts op basis van engagement-metrics.", result: "Het CS-team bespaart 40 uur per week. Onboardingtijd daalde van 14 naar 3 dagen. Churn daalde met 18% in het eerste kwartaal na implementatie." },
  },
  "e-commerce-growth": {
    en: { client: "StyleDirect", industry: "E-commerce", metric: "2.4x more conversions", context: "StyleDirect is a direct-to-consumer fashion brand (30 employees) that struggled with low conversion rates and high CAC despite growing traffic.", challenge: "Product recommendations were static, abandoned cart follow-ups were manual, and pricing was not optimized based on demand and inventory.", solution: "We implemented AI-driven product recommendations, automated abandoned cart sequences (email + SMS), and a dynamic pricing model connected to inventory and competitor data.", result: "Conversion rate increased from 1.8% to 4.3% (2.4x). Average order value increased by 15%. CAC decreased by 30% due to higher organic conversion." },
    nl: { client: "StyleDirect", industry: "E-commerce", metric: "2,4x meer conversies", context: "StyleDirect is een direct-to-consumer modemerk (30 medewerkers) dat worstelde met lage conversieratio's en hoge CAC ondanks groeiend verkeer.", challenge: "Productaanbevelingen waren statisch, verlaten-winkelwagen opvolging was handmatig en prijzen werden niet geoptimaliseerd op basis van vraag en voorraad.", solution: "We implementeerden AI-gestuurde productaanbevelingen, geautomatiseerde verlaten-winkelwagen sequenties (e-mail + SMS) en een dynamisch prijsmodel gekoppeld aan voorraad- en concurrentiedata.", result: "Conversieratio steeg van 1,8% naar 4,3% (2,4x). Gemiddelde orderwaarde steeg met 15%. CAC daalde met 30% door hogere organische conversie." },
  },
};

const workflowImages: Record<string, { src: string; caption: { en: string; nl: string } }> = {
  "logistics-company": {
    src: "/assets/jobby-workflow.png",
    caption: {
      en: "The complete n8n automation workflow built for Jobby — including lead scraping, AI enrichment, email generation and CRM sync.",
      nl: "De volledige n8n automatiseringsworkflow gebouwd voor Jobby — inclusief lead scraping, AI-verrijking, e-mailgeneratie en CRM-sync.",
    },
  },
};

const slugs = Object.keys(caseData);

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const lang = useLanguage();
  const csLangs = slug ? caseData[slug] : undefined;
  if (!csLangs) return <Navigate to="/case-studies" replace />;
  const cs = csLangs[lang];

  const currentIndex = slugs.indexOf(slug!);
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];

  const allCases = lang === "nl" ? "Alle case studies" : "All case studies";
  const nextCase = lang === "nl" ? "Volgende case study" : "Next case study";
  const sidebarTitle = lang === "nl" ? "Wil je vergelijkbare resultaten?" : "Want to achieve similar results?";
  const sidebarDesc = lang === "nl" ? "Plan een gratis Automation Scan en ontdek wat we voor jouw bedrijf kunnen automatiseren." : "Schedule a free Automation Scan and discover what we can automate for your business.";
  const sidebarBtn = lang === "nl" ? "Plan een Automation Scan" : "Schedule Automation Scan";
  const contextLabel = lang === "nl" ? "Context" : "Context";
  const challengeLabel = lang === "nl" ? "Uitdaging" : "Challenge";
  const solutionLabel = lang === "nl" ? "Oplossing" : "Solution";
  const resultLabel = lang === "nl" ? "Resultaat" : "Result";

  return (
    <>
      <SEOHead
        title={`Autronis | ${cs.client} — Case Study`}
        description={`${cs.metric}. Read how Autronis helped ${cs.client} with automation in the ${cs.industry} sector.`}
        path={`/case-studies/${slug}`}
        type="article"
        jsonLd={{ "@context": "https://schema.org", "@type": "Article", headline: `${cs.client} — ${cs.metric}`, description: cs.context, author: { "@type": "Organization", name: "Autronis" }, publisher: { "@type": "Organization", name: "Autronis" } }}
      />
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/case-studies" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"><ArrowLeft size={14} /> {allCases}</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{cs.industry}</span>
                <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2">{cs.client}</h1>
                <p className="text-2xl font-bold text-primary">{cs.metric}</p>
              </div>
              <div><h2 className="text-lg font-semibold mb-2">{contextLabel}</h2><p className="text-muted-foreground leading-relaxed">{cs.context}</p></div>
              <div><h2 className="text-lg font-semibold mb-2">{challengeLabel}</h2><p className="text-muted-foreground leading-relaxed">{cs.challenge}</p></div>
              <div><h2 className="text-lg font-semibold mb-2">{solutionLabel}</h2><p className="text-muted-foreground leading-relaxed">{cs.solution}</p></div>
              {/* Workflow screenshot if available */}
              {slug && workflowImages[slug] && (
                <div className="rounded-xl border border-border overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-card">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">{lang === "nl" ? "Gebouwde workflow" : "Built workflow"}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{workflowImages[slug].caption[lang]}</p>
                  </div>
                  <div className="relative group cursor-zoom-in" onClick={() => window.open(workflowImages[slug].src, '_blank')}>
                    <img src={workflowImages[slug].src} alt={workflowImages[slug].caption[lang]} className="w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="text-white text-xs bg-black/50 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">{lang === "nl" ? "Klik om te vergroten" : "Click to enlarge"}</span>
                    </div>
                  </div>
                </div>
              )}
              <div><h2 className="text-lg font-semibold mb-2">{resultLabel}</h2><p className="text-muted-foreground leading-relaxed">{cs.result}</p></div>
              <Link to={`/case-studies/${nextSlug}`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">{nextCase} <ArrowRight size={14} /></Link>
            </div>
            <div className="lg:sticky lg:top-24 self-start">
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <h3 className="font-semibold">{sidebarTitle}</h3>
                <p className="text-sm text-muted-foreground">{sidebarDesc}</p>
                <Button asChild className="w-full"><Link to="/book">{sidebarBtn} <ArrowRight size={14} /></Link></Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudyDetail;
