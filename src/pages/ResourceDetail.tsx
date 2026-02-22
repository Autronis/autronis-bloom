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
      "Veel MKB-bedrijven besteden wekelijks tientallen uren aan taken die volledig geautomatiseerd kunnen worden. Hier zijn vijf processen waar u vandaag nog mee kunt beginnen.",
      "1. Factuurverwerking — Automatiseer het ontvangen, valideren en boeken van inkomende facturen. Koppel uw boekhoudpakket aan uw email of leveranciersportaal en elimineer handmatige invoer.",
      "2. Lead follow-ups — Stel automatische follow-up sequences in op basis van gedrag. Geen lead valt meer tussen wal en schip.",
      "3. Onboarding van nieuwe medewerkers — Welkomstmails, toegangsaanvragen, trainingsschema's — alles kan op basis van triggers automatisch verlopen.",
      "4. Rapportages — Dagelijkse of wekelijkse rapportages die nu handmatig worden samengesteld? Koppel uw databronnen en genereer ze automatisch.",
      "5. Klantenservice-triage — Laat een AI-chatbot de eerste lijn afhandelen en routeer complexe vragen automatisch naar de juiste medewerker.",
      "Het mooie is: u hoeft niet alles tegelijk te doen. Begin met het proces dat u het meeste frustreert en bouw van daaruit verder.",
    ],
  },
  "roi-van-automatisering-berekenen": {
    title: "Hoe berekent u de ROI van automatisering?",
    category: "Business",
    date: "28 januari 2026",
    content: [
      "Een veelgehoorde vraag: 'Wat levert automatisering op?' Het antwoord hangt af van drie factoren: tijd, fouten en schaalbaarheid.",
      "Tijd — Tel het aantal uren dat uw team besteedt aan repetitieve taken. Vermenigvuldig met het uurtarief. Dit is uw directe besparingspotentieel.",
      "Fouten — Handmatige processen leiden tot fouten. Elke fout kost correctietijd, klantirritatie en soms compliance-risico's. Automatisering reduceert foutpercentages doorgaans met 90%+.",
      "Schaalbaarheid — Zonder automatisering groeit uw personeelsbehoefte lineair mee met volume. Met automatisering kunt u 3x meer volume verwerken zonder extra FTE.",
      "Een conservatieve berekening: als u 20 uur per week bespaart à €50/uur, is dat €52.000 per jaar — exclusief de zachte voordelen van snelheid, kwaliteit en medewerkertevredenheid.",
      "Wilt u een specifieke berekening voor uw situatie? Plan een Automation Scan en we stellen samen een concrete business case op.",
    ],
  },
  "ai-vs-rpa-wat-past-bij-uw-bedrijf": {
    title: "AI vs. RPA: wat past bij uw bedrijf?",
    category: "Technisch",
    date: "15 januari 2026",
    content: [
      "Automatisering is een breed begrip. De twee meest voorkomende vormen zijn RPA (Robotic Process Automation) en AI-gedreven automatisering. Maar wanneer kiest u welke?",
      "RPA is ideaal voor regelgebaseerde, voorspelbare taken. Denk aan: data kopiëren tussen systemen, formulieren invullen, standaard e-mails versturen. RPA volgt exacte stappen en werkt het beste bij processen die niet vaak veranderen.",
      "AI-automatisering is krachtiger wanneer beslissingen nodig zijn. AI kan patronen herkennen, tekst begrijpen, voorspellingen doen en omgaan met variatie. Denk aan: intelligente document-verwerking, chatbots, lead scoring, en anomalie-detectie.",
      "In de praktijk combineren we vaak beide: RPA voor de betrouwbare, herhaalbare stappen en AI voor de momenten waar interpretatie nodig is.",
      "Onze aanpak: we analyseren eerst uw processen en adviseren dan de juiste technologie. Geen overkill, geen onderpresteren — precies de juiste oplossing voor uw situatie.",
    ],
  },
};

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : undefined;
  if (!article) return <Navigate to="/resources" replace />;

  return (
    <Layout>
      <section className="pt-16 pb-24">
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
