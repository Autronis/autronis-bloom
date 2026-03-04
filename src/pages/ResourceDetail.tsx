import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";


const articles: Record<string, { title: string; category: string; date: string; content: string[] }> = {
  "5-processen-die-elk-mkb-kan-automatiseren": {
    title: "5 processen die elk MKB-bedrijf vandaag kan automatiseren",
    category: "Gids",
    date: "10 februari 2026",
    content: [
      "Veel MKB-bedrijven besteden wekelijks tientallen uren aan taken die structureel geautomatiseerd kunnen worden. Vaak gaat het om repetitieve processen waarbij meerdere systemen betrokken zijn of data handmatig wordt overgezet.",
      "Hier zijn vijf processen waar automatisering direct impact kan hebben.",
      "Factuurverwerking — Automatiseer het ontvangen, valideren en boeken van inkomende facturen. Door uw boekhoudpakket te koppelen aan e-mail of leveranciersportalen verdwijnen handmatige invoer en controlewerk grotendeels.",
      "Leadopvolging — Nieuwe leads verdwijnen vaak in inboxen of spreadsheets. Met geautomatiseerde follow-ups en CRM-integraties worden leads automatisch opgevolgd op basis van gedrag of status.",
      "Onboarding van medewerkers — Nieuwe medewerkers vereisen vaak meerdere handmatige stappen zoals accounts aanmaken, toegang aanvragen en welkomstmails versturen. Dit kan volledig geautomatiseerd worden via triggers.",
      "Rapportages — Veel rapportages worden nog handmatig samengesteld in spreadsheets. Door databronnen te koppelen kunnen dashboards en rapportages automatisch worden gegenereerd.",
      "Klantenservice-triage — AI-gestuurde chatbots kunnen veelvoorkomende vragen automatisch beantwoorden en complexe vragen direct naar de juiste medewerker doorsturen.",
      "Automatisering hoeft niet in één keer. Begin met het proces dat het meeste tijd kost of het vaakst fout gaat. Vanuit daar kan de automatiseringsstructuur verder worden uitgebreid.",
    ],
  },
  "roi-van-automatisering-berekenen": {
    title: "Hoe berekent u de ROI van automatisering?",
    category: "Business",
    date: "28 januari 2026",
    content: [
      "Een veelgestelde vraag bij automatisering is wat de concrete zakelijke impact is. In de praktijk komt dit meestal neer op drie factoren: tijdsbesparing, foutreductie en schaalbaarheid.",
      "Tijd — Tel het aantal uren dat medewerkers besteden aan repetitieve taken en vermenigvuldig dit met het gemiddelde uurtarief. Dit vormt het directe besparingspotentieel.",
      "Foutreductie — Handmatige processen leiden vrijwel altijd tot fouten of dubbele invoer. Correcties kosten tijd en vertragen processen. Automatisering kan foutpercentages aanzienlijk verlagen.",
      "Schaalbaarheid — Zonder automatisering groeit de personeelsbehoefte vaak mee met het volume. Met goed ingerichte automatisering kan meer output worden gerealiseerd zonder lineaire groei in personeelskosten.",
      "Bespaart uw organisatie 20 uur per week tegen €50 per uur, dan bedraagt de directe besparing ongeveer €52.000 per jaar.",
      "Wilt u weten wat automatisering binnen uw organisatie kan opleveren? Plan een Automation Scan en ontvang een eerste impactanalyse.",
    ],
  },
  "ai-vs-rpa-wat-past-bij-uw-bedrijf": {
    title: "AI vs. RPA: wat past bij uw organisatie?",
    category: "Technisch",
    date: "15 januari 2026",
    content: [
      "Automatisering kent verschillende benaderingen. Twee veelgebruikte vormen zijn RPA (Robotic Process Automation) en AI-gedreven automatisering. Beide hebben een eigen rol binnen bedrijfsprocessen.",
      "RPA is geschikt voor regelgebaseerde en voorspelbare taken waarbij exact dezelfde stappen telkens worden uitgevoerd. Voorbeelden: data kopiëren tussen systemen, formulieren invullen, standaard e-mails versturen en administratieve verwerking.",
      "AI-automatisering wordt ingezet wanneer interpretatie of analyse nodig is. Voorbeelden: documentverwerking, chatbots, lead scoring, patroonherkenning in data, voorspellingen en classificaties.",
      "In veel organisaties werken beide technologieën samen: RPA automatiseert de voorspelbare stappen, terwijl AI wordt ingezet waar interpretatie nodig is. De juiste keuze hangt altijd af van het proces en de context.",
    ],
  },
};

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : undefined;
  if (!article) return <Navigate to="/resources" replace />;

  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/resources" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft size={14} /> Alle resources
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{article.category}</span>
              <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2">{article.title}</h1>
              <p className="text-sm text-muted-foreground mb-8">{article.date}</p>
              <div className="space-y-4">
                {article.content.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
              </div>
            </article>

            <aside className="lg:sticky lg:top-24 self-start space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-2">Wilt u dit in actie zien?</h3>
                <p className="text-sm text-muted-foreground mb-4">Plan een Automation Scan en we laten zien hoe dit voor uw bedrijf werkt.</p>
                <Button asChild className="w-full">
                  <Link to="/book">Plan Automation Scan <ArrowRight size={14} /></Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ResourceDetail;
