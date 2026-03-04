// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ArticleSection {
  heading: string;
  body: string;
}

interface Article {
  title: string;
  category: string;
  date: string;
  intro: string[];
  sections?: ArticleSection[];
  conclusion?: string;
}

const articles: Record<string, Article> = {
  "5-processen-die-elk-mkb-kan-automatiseren": {
    title: "5 processen die elk MKB-bedrijf vandaag kan automatiseren",
    category: "Gids",
    date: "10 februari 2026",
    intro: [
      "Veel MKB-bedrijven besteden wekelijks tientallen uren aan taken die structureel geautomatiseerd kunnen worden. Vaak gaat het om repetitieve processen waarbij meerdere systemen betrokken zijn of data handmatig wordt overgezet.",
      "Hier zijn vijf processen waar automatisering direct impact kan hebben.",
    ],
    sections: [
      { heading: "1. Factuurverwerking", body: "Automatiseer het ontvangen, valideren en boeken van inkomende facturen. Door uw boekhoudpakket te koppelen aan e-mail of leveranciersportalen verdwijnen handmatige invoer en controlewerk grotendeels." },
      { heading: "2. Leadopvolging", body: "Nieuwe leads verdwijnen vaak in inboxen of spreadsheets. Met geautomatiseerde follow-ups en CRM-integraties worden leads automatisch opgevolgd op basis van gedrag of status." },
      { heading: "3. Onboarding van medewerkers", body: "Nieuwe medewerkers vereisen vaak meerdere handmatige stappen zoals accounts aanmaken, toegang aanvragen en welkomstmails versturen. Dit kan volledig geautomatiseerd worden via triggers." },
      { heading: "4. Rapportages", body: "Veel rapportages worden nog handmatig samengesteld in spreadsheets. Door databronnen te koppelen kunnen dashboards en rapportages automatisch worden gegenereerd." },
      { heading: "5. Klantenservice-triage", body: "AI-gestuurde chatbots kunnen veelvoorkomende vragen automatisch beantwoorden en complexe vragen direct naar de juiste medewerker doorsturen." },
    ],
    conclusion: "Automatisering hoeft niet in één keer. Begin met het proces dat het meeste tijd kost of het vaakst fout gaat. Vanuit daar kan de automatiseringsstructuur verder worden uitgebreid.",
  },
  "roi-van-automatisering-berekenen": {
    title: "Hoe berekent u de ROI van automatisering?",
    category: "Business",
    date: "28 januari 2026",
    intro: [
      "Een veelgestelde vraag bij automatisering is wat de concrete zakelijke impact is. In de praktijk komt dit meestal neer op drie factoren: tijdsbesparing, foutreductie en schaalbaarheid.",
    ],
    sections: [
      { heading: "Tijd", body: "Tel het aantal uren dat medewerkers besteden aan repetitieve taken en vermenigvuldig dit met het gemiddelde uurtarief. Dit vormt het directe besparingspotentieel." },
      { heading: "Foutreductie", body: "Handmatige processen leiden vrijwel altijd tot fouten of dubbele invoer. Correcties kosten tijd en vertragen processen. Automatisering kan foutpercentages aanzienlijk verlagen." },
      { heading: "Schaalbaarheid", body: "Zonder automatisering groeit de personeelsbehoefte vaak mee met het volume. Met goed ingerichte automatisering kan meer output worden gerealiseerd zonder lineaire groei in personeelskosten." },
    ],
    conclusion: "Bespaart uw organisatie 20 uur per week tegen €50 per uur, dan bedraagt de directe besparing ongeveer €52.000 per jaar.\n\nWilt u weten wat automatisering binnen uw organisatie kan opleveren? Plan een Automation Scan en ontvang een eerste impactanalyse.",
  },
  "ai-vs-rpa-wat-past-bij-uw-bedrijf": {
    title: "AI vs. RPA: wat past bij uw organisatie?",
    category: "Technisch",
    date: "15 januari 2026",
    intro: [
      "Automatisering kent verschillende benaderingen. Twee veelgebruikte vormen zijn RPA (Robotic Process Automation) en AI-gedreven automatisering. Beide hebben een eigen rol binnen bedrijfsprocessen.",
    ],
    sections: [
      { heading: "RPA", body: "RPA is geschikt voor regelgebaseerde en voorspelbare taken waarbij exact dezelfde stappen telkens worden uitgevoerd. Voorbeelden: data kopiëren tussen systemen, formulieren invullen, standaard e-mails versturen en administratieve verwerking." },
      { heading: "AI-automatisering", body: "AI-automatisering wordt ingezet wanneer interpretatie of analyse nodig is. Voorbeelden: documentverwerking, chatbots, lead scoring, patroonherkenning in data, voorspellingen en classificaties." },
    ],
    conclusion: "In veel organisaties werken beide technologieën samen: RPA automatiseert de voorspelbare stappen, terwijl AI wordt ingezet waar interpretatie nodig is. De juiste keuze hangt altijd af van het proces en de context.",
  },
};

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : undefined;
  if (!article) return <Navigate to="/resources" replace />;

  return (
    <>
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

              {/* Intro */}
              <div className="space-y-3 mb-10">
                {article.intro.map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
                ))}
              </div>

              {/* Sections */}
              {article.sections && (
                <div className="space-y-8 mb-12">
                  {article.sections.map((section, i) => (
                    <div key={i}>
                      <h2 className="text-xl font-bold mb-2">{section.heading}</h2>
                      <p className="text-muted-foreground leading-relaxed">{section.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Conclusion */}
              {article.conclusion && (
                <div className="mt-10 pt-8 border-t border-border">
                  {article.conclusion.split("\n\n").map((p, i) => (
                    <p key={i} className="text-muted-foreground leading-relaxed mb-3 last:mb-0">{p}</p>
                  ))}
                </div>
              )}
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
    </>
  );
};

export default ResourceDetail;
