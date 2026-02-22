import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Wat kost een automatiseringsproject?",
    a: "De kosten worden bepaald na de Automation Scan, op basis van de complexiteit en doorlooptijd van uw project. Zo betaalt u alleen voor wat u nodig heeft — geen standaardpakketten.",
  },
  {
    q: "Hoe lang duurt een gemiddeld project?",
    a: "De meeste projecten lopen van 2 tot 8 weken, afhankelijk van de scope. Na de scan ontvangt u een realistisch tijdspad met duidelijke milestones.",
  },
  {
    q: "Welke tools en platformen ondersteunen jullie?",
    a: "We werken met alle gangbare platformen: CRM's (HubSpot, Salesforce), ERP-systemen, boekhoudsoftware, communicatietools en custom API's. Geen integratie is te complex.",
  },
  {
    q: "Is mijn data veilig?",
    a: "Absoluut. We werken met versleutelde verbindingen, volgen GDPR-richtlijnen en maken geen kopieën van uw data tenzij strikt noodzakelijk voor de automatisering.",
  },
  {
    q: "Wie is eigenaar van de gebouwde oplossing?",
    a: "U. Alle automatiseringen, workflows en integraties die wij bouwen zijn volledig uw eigendom. Inclusief documentatie en overdracht.",
  },
  {
    q: "Wat als ik al bestaande systemen en processen heb?",
    a: "Juist goed. We bouwen altijd voort op wat er is. Onze aanpak is integratie-eerst: we vervangen niets onnodig, maar verbinden en verbeteren wat u al heeft.",
  },
  {
    q: "Bieden jullie support na oplevering?",
    a: "Ja. Na go-live monitoren we de automatiseringen en bieden we support voor optimalisatie. We laten u niet vallen na lancering.",
  },
  {
    q: "Voor welke bedrijfsgrootte is dit geschikt?",
    a: "Onze oplossingen zijn het meest impactvol voor MKB- en midmarket-bedrijven (10–500 medewerkers) die klaar zijn om te schalen zonder evenredig meer mensen aan te nemen.",
  },
  {
    q: "Kan ik eerst een demo zien voordat ik een scan plan?",
    a: "Zeker. Bekijk onze 2-minuten demo om te zien hoe een geautomatiseerde workflow eruitziet. Daarna kunt u altijd een vrijblijvende scan inplannen.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Veelgestelde vragen</h2>
            <p className="text-muted-foreground">
              Alles wat u wilt weten over onze aanpak, proces en samenwerking.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-border rounded-lg px-5 data-[state=open]:border-primary/30 transition-colors"
              >
                <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
