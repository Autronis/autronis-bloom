import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GlowCTA from "@/components/GlowCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "FAQ",
    title: "Frequently asked questions",
    desc: "Answers to the most important questions about our approach, process and collaboration.",
    extraLabel: "Additional questions to address concerns",
    faqs: [
      { q: "What does an automation project cost?", a: "The investment depends on the complexity of the processes, the number of systems and the desired automations. After the Automation Scan you'll receive a transparent proposal with a clear scope and timeline. We don't work with standard packages; you only invest in what's actually needed." },
      { q: "How long does an average project take?", a: "Most implementations take between 2 and 8 weeks, depending on scope and complexity. After the Automation Scan you'll receive a realistic timeline with clear phases and delivery milestones." },
      { q: "Are you tied to specific tools?", a: "No. We work tool-agnostic. This means we connect to your existing systems and only deploy technology that fits your situation and scale." },
      { q: "Do I need to replace my current systems?", a: "No. In most cases we connect existing systems so data is exchanged automatically. Only when a system has clear limitations do we recommend an alternative." },
      { q: "Is my data safe?", a: "Yes. We work with encrypted connections and follow applicable privacy legislation (GDPR). System access is limited to what's needed for the automation and we don't use business data for AI training." },
      { q: "Who owns the built solution?", a: "You remain the owner of the automations, configurations and integrations developed for your organization. The solution is documented to ensure transferability." },
      { q: "What if I already have existing systems and processes?", a: "That's actually our starting point. Our approach is integration-first: we build on existing systems and connect them where needed, rather than replacing everything." },
      { q: "How do you ensure security and data quality?", a: "Security and data quality are built in from the design phase. We work with minimal access rights, logging and monitoring, and provide clear documentation of architecture and data flows.", link: { text: "View our quality standard", href: "/services#kwaliteitsnorm" } },
      { q: "What does automation deliver financially?", a: "The impact varies by organization, but automation often leads to less manual work, fewer errors and faster processes. During the Automation Scan we create an indicative business case so you get upfront insight into potential savings and payback period." },
      { q: "Isn't automation risky for our processes?", a: "Not when it's designed properly. We analyze processes upfront and test automations before they go live. This keeps processes stable and prevents errors." },
      { q: "Do you offer support after delivery?", a: "Yes. After implementation we can continue to monitor and optimize automations. Depending on your needs we offer support for maintenance, extensions and further automation." },
      { q: "How do we start a collaboration?", a: "The collaboration starts with an Automation Scan. In it we analyze processes, systems and automation opportunities. Based on this you receive a concrete proposal with impact, timeline and investment." },
      { q: "What type of organizations is this best suited for?", a: "Our solutions are especially valuable for growing SMB organizations (10–500 employees) that want to scale processes without staffing pressure increasing proportionally." },
    ],
    extraFaqs: [
      { q: "What if automation ultimately doesn't work well?", a: "Automations are tested first before being fully deployed. Additionally, existing processes remain available as a fallback until the new workflow runs stably." },
      { q: "Does my team need to be technical to work with this?", a: "No. Automations are set up to be easy to use within existing tools. Where needed we provide clear instructions or documentation for the team." },
      { q: "How much time does this require from our internal team?", a: "We try to keep the burden on your team as limited as possible. During implementation we usually need a few short sessions to understand and test processes. The rest of the work happens on our end." },
    ],
  },
  nl: {
    label: "FAQ",
    title: "Veelgestelde vragen",
    desc: "Antwoorden op de belangrijkste vragen over onze aanpak, ons proces en samenwerking.",
    extraLabel: "Aanvullende vragen om bezwaren weg te nemen",
    faqs: [
      { q: "Wat kost een automatiseringsproject?", a: "De investering hangt af van de complexiteit van processen, het aantal systemen en de gewenste automatiseringen. Na de Automation Scan ontvang je een transparant voorstel met een duidelijke scope en planning. We werken niet met standaardpakketten; je investeert alleen in wat daadwerkelijk nodig is." },
      { q: "Hoe lang duurt een gemiddeld project?", a: "De meeste implementaties duren tussen 2 en 8 weken, afhankelijk van scope en complexiteit. Na de Automation Scan ontvang je een realistische planning met duidelijke fases en opleveringsmomenten." },
      { q: "Zijn jullie gebonden aan specifieke tools?", a: "Nee. We werken tool-agnostisch. Dat betekent dat we aansluiten op je bestaande systemen en alleen technologie inzetten die past bij jouw situatie en schaal." },
      { q: "Moet ik mijn huidige systemen vervangen?", a: "Nee. In de meeste gevallen verbinden we bestaande systemen zodat data automatisch wordt uitgewisseld. Alleen als een systeem duidelijke beperkingen heeft, adviseren we een alternatief." },
      { q: "Is mijn data veilig?", a: "Ja. We werken met versleutelde verbindingen en volgen de geldende privacywetgeving (AVG). Systeemtoegang is beperkt tot wat nodig is voor de automatisering en we gebruiken bedrijfsdata niet voor AI-training." },
      { q: "Wie is eigenaar van de gebouwde oplossing?", a: "Jij blijft eigenaar van de automatiseringen, configuraties en integraties die voor jouw organisatie zijn ontwikkeld. De oplossing is gedocumenteerd om overdraagbaarheid te garanderen." },
      { q: "Wat als ik al bestaande systemen en processen heb?", a: "Dat is juist ons uitgangspunt. Onze aanpak is integratie-eerst: we bouwen voort op bestaande systemen en verbinden ze waar nodig, in plaats van alles te vervangen." },
      { q: "Hoe borgen jullie beveiliging en datakwaliteit?", a: "Beveiliging en datakwaliteit worden vanaf de ontwerpfase ingebouwd. We werken met minimale toegangsrechten, logging en monitoring, en leveren heldere documentatie van architectuur en datastromen.", link: { text: "Bekijk onze kwaliteitsstandaard", href: "/services#kwaliteitsnorm" } },
      { q: "Wat levert automatisering financieel op?", a: "De impact varieert per organisatie, maar automatisering leidt vaak tot minder handmatig werk, minder fouten en snellere processen. Tijdens de Automation Scan maken we een indicatieve businesscase zodat je vooraf inzicht krijgt in potentiële besparingen en terugverdientijd." },
      { q: "Is automatisering niet riskant voor onze processen?", a: "Niet als het goed is ontworpen. We analyseren processen vooraf en testen automatiseringen voordat ze live gaan. Zo blijven processen stabiel en worden fouten voorkomen." },
      { q: "Bieden jullie ondersteuning na oplevering?", a: "Ja. Na implementatie kunnen we automatiseringen blijven monitoren en optimaliseren. Afhankelijk van je behoeften bieden we ondersteuning voor onderhoud, uitbreidingen en verdere automatisering." },
      { q: "Hoe starten we een samenwerking?", a: "De samenwerking begint met een Automation Scan. Daarin analyseren we processen, systemen en automatiseringsmogelijkheden. Op basis daarvan ontvang je een concreet voorstel met impact, tijdlijn en investering." },
      { q: "Voor welk type organisaties is dit het meest geschikt?", a: "Onze oplossingen zijn vooral waardevol voor groeiende mkb-organisaties (10–500 medewerkers) die processen willen opschalen zonder dat de personeelsdruk evenredig toeneemt." },
    ],
    extraFaqs: [
      { q: "Wat als automatisering uiteindelijk niet goed werkt?", a: "Automatiseringen worden eerst getest voordat ze volledig worden ingezet. Daarnaast blijven bestaande processen beschikbaar als terugvaloptie totdat de nieuwe workflow stabiel draait." },
      { q: "Moet mijn team technisch zijn om hiermee te werken?", a: "Nee. Automatiseringen worden zo ingericht dat ze eenvoudig te gebruiken zijn binnen bestaande tools. Waar nodig bieden we duidelijke instructies of documentatie voor het team." },
      { q: "Hoeveel tijd kost dit van ons interne team?", a: "We proberen de belasting voor je team zo beperkt mogelijk te houden. Tijdens de implementatie hebben we meestal een paar korte sessies nodig om processen te begrijpen en te testen. De rest van het werk gebeurt aan onze kant." },
    ],
  },
};

const FAQSection = () => {
  const lang = useLanguage();
  const tx = text[lang];

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{tx.label}</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{tx.title}</h2>
              <p className="text-muted-foreground">{tx.desc}</p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.06}>
            <Accordion type="single" collapsible className="space-y-2">
              {tx.faqs.map((faq, i) => (
                <ScrollRevealItem key={i}>
                  <AccordionItem value={`faq-${i}`} className="border border-border bg-gradient-to-br from-primary/[0.06] to-card rounded-lg px-3 sm:px-5 data-[state=open]:border-primary/40 data-[state=open]:shadow-[0_0_20px_hsl(174_78%_41%/0.1)] data-[state=open]:bg-primary/[0.02] hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_12px_hsl(174_78%_41%/0.06)]">
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline hover:text-primary transition-colors duration-200">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground/80 leading-relaxed">
                      {faq.a}
                      {"link" in faq && faq.link && (
                        <Link to={faq.link.href} className="group flex items-center gap-1 text-xs text-muted-foreground/60 hover:text-primary/70 transition-colors mt-3">
                          {faq.link.text}<ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </ScrollRevealItem>
              ))}
            </Accordion>
          </ScrollReveal>

          <ScrollReveal className="mt-10">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-4 tracking-widest uppercase text-center">{tx.extraLabel}</p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.06}>
            <Accordion type="single" collapsible className="space-y-2">
              {tx.extraFaqs.map((faq, i) => (
                <ScrollRevealItem key={`extra-${i}`}>
                  <AccordionItem value={`extra-faq-${i}`} className="border border-border bg-gradient-to-br from-primary/[0.06] to-card rounded-lg px-3 sm:px-5 data-[state=open]:border-primary/40 data-[state=open]:shadow-[0_0_20px_hsl(174_78%_41%/0.1)] data-[state=open]:bg-primary/[0.02] hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_12px_hsl(174_78%_41%/0.06)]">
                    <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline hover:text-primary transition-colors duration-200">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-sm text-foreground/80 leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                </ScrollRevealItem>
              ))}
            </Accordion>
          </ScrollReveal>

          {/* Still have questions CTA */}
          <ScrollReveal className="mt-12">
            <ScrollRevealItem>
              <div className="rounded-xl border border-border bg-gradient-to-br from-primary/[0.06] to-card/50 p-6 text-center">
                <p className="text-sm font-medium text-foreground mb-1">
                  {lang === "nl" ? "Staat je vraag er niet bij?" : "Can't find your answer?"}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  {lang === "nl" ? "Neem direct contact op of plan een gratis Automation Scan." : "Get in touch directly or schedule a free Automation Scan."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <GlowCTA variant="dark" to="/contact">{lang === "nl" ? "Stel je vraag" : "Ask your question"}</GlowCTA>
                  <GlowCTA to="/book">{lang === "nl" ? "Plan een Automation Scan" : "Schedule Automation Scan"}</GlowCTA>
                </div>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
