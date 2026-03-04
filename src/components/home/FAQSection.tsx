import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const faqs = [
  {
    q: "Wat kost een automatiseringsproject?",
    a: "De investering hangt af van de complexiteit van de processen, het aantal systemen en de gewenste automatiseringen. Na de Automation Scan ontvangt u een transparante offerte met een duidelijke scope en planning. We werken niet met standaardpakketten; u investeert alleen in wat daadwerkelijk nodig is.",
  },
  {
    q: "Hoe lang duurt een gemiddeld project?",
    a: "De meeste implementaties duren tussen 2 en 8 weken, afhankelijk van de omvang en complexiteit. Na de Automation Scan ontvangt u een realistisch tijdspad met duidelijke fases en oplevermomenten.",
  },
  {
    q: "Zijn jullie gebonden aan specifieke tools?",
    a: "Nee. Wij werken tool-agnostisch. Dat betekent dat we aansluiten op uw bestaande systemen en alleen technologie inzetten die past bij uw situatie en schaal.",
  },
  {
    q: "Moet ik mijn huidige systemen vervangen?",
    a: "Nee. In de meeste gevallen koppelen we bestaande systemen met elkaar zodat data automatisch wordt uitgewisseld. Alleen wanneer een systeem duidelijke beperkingen heeft adviseren we een alternatief.",
  },
  {
    q: "Is mijn data veilig?",
    a: "Ja. We werken met versleutelde verbindingen en volgen de geldende privacywetgeving (AVG/GDPR). Toegang tot systemen wordt beperkt tot wat nodig is voor de automatisering en we gebruiken geen bedrijfsdata voor AI-training.",
  },
  {
    q: "Wie is eigenaar van de gebouwde oplossing?",
    a: "U blijft eigenaar van de automatiseringen, configuraties en integraties die voor uw organisatie worden ontwikkeld. De oplossing wordt gedocumenteerd zodat deze overdraagbaar blijft.",
  },
  {
    q: "Wat als ik al bestaande systemen en processen heb?",
    a: "Dat is juist het uitgangspunt. Onze aanpak is integratie-eerst: we bouwen voort op bestaande systemen en verbinden deze waar nodig, in plaats van alles te vervangen.",
  },
  {
    q: "Hoe waarborgen jullie beveiliging en datakwaliteit?",
    a: "Beveiliging en datakwaliteit worden vanaf het ontwerp meegenomen. We werken met minimale toegangsrechten, logging en monitoring, en zorgen voor duidelijke documentatie van architectuur en datastromen.",
    link: { text: "Bekijk onze kwaliteitsnorm", href: "/services#kwaliteitsnorm" },
  },
  {
    q: "Wat levert automatisering financieel op?",
    a: "De impact verschilt per organisatie, maar automatisering leidt vaak tot minder handmatig werk, minder fouten en snellere processen. Tijdens de Automation Scan maken we een indicatieve businesscase zodat u vooraf inzicht krijgt in mogelijke besparingen en terugverdientijd.",
  },
  {
    q: "Is automatisering niet risicovol voor onze processen?",
    a: "Niet wanneer het goed wordt ontworpen. We analyseren processen vooraf en testen automatiseringen voordat ze live gaan. Hierdoor blijven processen stabiel en worden fouten voorkomen.",
  },
  {
    q: "Bieden jullie support na oplevering?",
    a: "Ja. Na de implementatie kunnen we automatiseringen blijven monitoren en optimaliseren. Afhankelijk van uw behoefte bieden we ondersteuning voor onderhoud, uitbreidingen en verdere automatisering.",
  },
  {
    q: "Hoe starten we een samenwerking?",
    a: "De samenwerking begint met een Automation Scan. Daarin analyseren we processen, systemen en automatiseringsmogelijkheden. Op basis daarvan ontvangt u een concreet voorstel met impact, planning en investering.",
  },
  {
    q: "Voor welke organisaties is dit het meest geschikt?",
    a: "Onze oplossingen zijn vooral waardevol voor groeiende MKB-organisaties (10–500 medewerkers) die processen willen opschalen zonder dat de personeelsdruk evenredig meegroeit.",
  },
];

const extraFaqs = [
  {
    q: "Wat als automatisering uiteindelijk niet goed werkt?",
    a: "Automatiseringen worden eerst getest voordat ze volledig in gebruik worden genomen. Daarnaast blijven bestaande processen beschikbaar als fallback totdat de nieuwe workflow stabiel draait.",
  },
  {
    q: "Moet mijn team technisch zijn om hiermee te werken?",
    a: "Nee. Automatiseringen worden zo ingericht dat ze eenvoudig te gebruiken zijn binnen de bestaande tools. Waar nodig zorgen we voor duidelijke uitleg of documentatie voor het team.",
  },
  {
    q: "Hoeveel tijd kost dit voor ons interne team?",
    a: "We proberen de belasting voor uw team zo beperkt mogelijk te houden. Tijdens de implementatie hebben we meestal enkele korte sessies nodig om processen te begrijpen en te testen. De rest van het werk gebeurt aan onze kant.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Veelgestelde vragen</h2>
              <p className="text-muted-foreground">
                Antwoorden op de belangrijkste vragen over onze aanpak, het proces en de samenwerking.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.06}>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <ScrollRevealItem key={i}>
                  <AccordionItem
                    value={`faq-${i}`}
                    className="border border-border bg-card rounded-lg px-5 data-[state=open]:border-primary/30 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_20px_hsl(174_78%_41%/0.06)]"
                  >
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline hover:text-primary transition-colors duration-200">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground/80 leading-relaxed">
                      {faq.a}
                      {"link" in faq && faq.link && (
                        <Link to={faq.link.href} className="group flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-primary/70 transition-colors mt-3">
                          {faq.link.text}
                          <ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollRevealItem>
              ))}
            </Accordion>
          </ScrollReveal>

          {/* Extra vragen */}
          <ScrollReveal className="mt-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-4 tracking-widest uppercase text-center">
                Extra vragen die twijfels wegnemen
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.06}>
            <Accordion type="single" collapsible className="space-y-2">
              {extraFaqs.map((faq, i) => (
                <ScrollRevealItem key={`extra-${i}`}>
                  <AccordionItem
                    value={`extra-faq-${i}`}
                    className="border border-border bg-card rounded-lg px-5 data-[state=open]:border-primary/30 hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_20px_hsl(174_78%_41%/0.06)]"
                  >
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline hover:text-primary transition-colors duration-200">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground/80 leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollRevealItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
