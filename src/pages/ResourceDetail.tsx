// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/context";

interface ArticleSection { heading: string; body: string; }
interface Article { title: string; category: string; date: string; intro: string[]; sections?: ArticleSection[]; conclusion?: string; }

const articles: Record<string, Record<"en" | "nl", Article>> = {
  "5-processes-every-smb-can-automate": {
    en: {
      title: "5 processes every SMB can automate today", category: "Guide", date: "February 10, 2026",
      intro: ["Many SMB companies spend dozens of hours per week on tasks that can be structurally automated. Often these are repetitive processes involving multiple systems or manual data transfer.", "Here are five processes where automation can have an immediate impact."],
      sections: [
        { heading: "1. Invoice processing", body: "Automate the receiving, validating, and booking of incoming invoices. By connecting your accounting software to email or supplier portals, manual entry and verification work largely disappear." },
        { heading: "2. Lead follow-up", body: "New leads often get lost in inboxes or spreadsheets. With automated follow-ups and CRM integrations, leads are automatically followed up based on behavior or status." },
        { heading: "3. Employee onboarding", body: "New employees often require multiple manual steps such as creating accounts, requesting access, and sending welcome emails. This can be fully automated through triggers." },
        { heading: "4. Reporting", body: "Many reports are still manually compiled in spreadsheets. By connecting data sources, dashboards and reports can be generated automatically." },
        { heading: "5. Customer service triage", body: "AI-powered chatbots can automatically answer common questions and route complex questions directly to the right team member." },
      ],
      conclusion: "Automation doesn't have to happen all at once. Start with the process that takes the most time or goes wrong most often. From there, the automation structure can be expanded further.",
    },
    nl: {
      title: "5 processen die elk MKB-bedrijf vandaag kan automatiseren", category: "Gids", date: "10 februari 2026",
      intro: ["Veel MKB-bedrijven besteden tientallen uren per week aan taken die structureel geautomatiseerd kunnen worden. Vaak zijn dit repetitieve processen met meerdere systemen of handmatige dataoverdracht.", "Hier zijn vijf processen waar automatisering direct impact kan hebben."],
      sections: [
        { heading: "1. Factuurverwerking", body: "Automatiseer het ontvangen, valideren en boeken van inkomende facturen. Door je boekhoudsoftware te koppelen aan e-mail of leveranciersportalen, verdwijnt handmatige invoer en controle grotendeels." },
        { heading: "2. Lead-opvolging", body: "Nieuwe leads raken vaak kwijt in inboxen of spreadsheets. Met geautomatiseerde opvolging en CRM-integraties worden leads automatisch opgevolgd op basis van gedrag of status." },
        { heading: "3. Medewerker-onboarding", body: "Nieuwe medewerkers vereisen vaak meerdere handmatige stappen zoals accounts aanmaken, toegang aanvragen en welkomstmails versturen. Dit kan volledig geautomatiseerd worden via triggers." },
        { heading: "4. Rapportage", body: "Veel rapporten worden nog handmatig samengesteld in spreadsheets. Door databronnen te koppelen, kunnen dashboards en rapporten automatisch gegenereerd worden." },
        { heading: "5. Klantenservice-triage", body: "AI-gestuurde chatbots kunnen veelgestelde vragen automatisch beantwoorden en complexe vragen direct naar het juiste teamlid routeren." },
      ],
      conclusion: "Automatisering hoeft niet in één keer. Begin met het proces dat de meeste tijd kost of het vaakst misgaat. Van daaruit kan de automatiseringsstructuur verder worden uitgebouwd.",
    },
  },
  "how-to-calculate-automation-roi": {
    en: {
      title: "How to calculate the ROI of automation", category: "Business", date: "January 28, 2026",
      intro: ["A common question with automation is what the concrete business impact is. In practice, this usually comes down to three factors: time savings, error reduction, and scalability."],
      sections: [
        { heading: "Time", body: "Count the number of hours employees spend on repetitive tasks and multiply by the average hourly rate. This forms the direct savings potential." },
        { heading: "Error reduction", body: "Manual processes almost always lead to errors or duplicate entry. Corrections take time and slow down processes. Automation can significantly reduce error rates." },
        { heading: "Scalability", body: "Without automation, staffing needs often grow proportionally with volume. With well-designed automation, more output can be achieved without linear growth in staffing costs." },
      ],
      conclusion: "If your organization saves 20 hours per week at $75 per hour, the direct savings amount to approximately $78,000 per year.\n\nWant to know what automation can deliver for your organization? Schedule an Automation Scan and receive an initial impact analysis.",
    },
    nl: {
      title: "Hoe bereken je de ROI van automatisering?", category: "Business", date: "28 januari 2026",
      intro: ["Een veelgestelde vraag bij automatisering is wat de concrete zakelijke impact is. In de praktijk komt dit meestal neer op drie factoren: tijdsbesparing, foutreductie en schaalbaarheid."],
      sections: [
        { heading: "Tijd", body: "Tel het aantal uren dat medewerkers besteden aan repetitieve taken en vermenigvuldig dit met het gemiddelde uurtarief. Dit vormt het directe besparingspotentieel." },
        { heading: "Foutreductie", body: "Handmatige processen leiden bijna altijd tot fouten of dubbele invoer. Correcties kosten tijd en vertragen processen. Automatisering kan foutpercentages aanzienlijk verlagen." },
        { heading: "Schaalbaarheid", body: "Zonder automatisering groeien personeelsbehoeften vaak evenredig met het volume. Met goed ontworpen automatisering kan meer output worden bereikt zonder lineaire groei in personeelskosten." },
      ],
      conclusion: "Als je organisatie 20 uur per week bespaart tegen €75 per uur, bedragen de directe besparingen circa €78.000 per jaar.\n\nWil je weten wat automatisering voor jouw organisatie kan opleveren? Plan een Automation Scan en ontvang een eerste impactanalyse.",
    },
  },
  "ai-vs-rpa-which-fits-your-business": {
    en: {
      title: "AI vs. RPA: which fits your organization?", category: "Technical", date: "January 15, 2026",
      intro: ["Automation comes in different forms. Two commonly used approaches are RPA (Robotic Process Automation) and AI-driven automation. Both have their own role within business processes."],
      sections: [
        { heading: "RPA", body: "RPA is suited for rule-based and predictable tasks where the exact same steps are repeated every time. Examples: copying data between systems, filling out forms, sending standard emails, and administrative processing." },
        { heading: "AI automation", body: "AI automation is deployed when interpretation or analysis is needed. Examples: document processing, chatbots, lead scoring, pattern recognition in data, predictions, and classifications." },
      ],
      conclusion: "In many organizations, both technologies work together: RPA automates the predictable steps, while AI is used where interpretation is needed. The right choice always depends on the process and context.",
    },
    nl: {
      title: "AI vs. RPA: wat past bij jouw organisatie?", category: "Technisch", date: "15 januari 2026",
      intro: ["Automatisering komt in verschillende vormen. Twee veelgebruikte benaderingen zijn RPA (Robotic Process Automation) en AI-gestuurde automatisering. Beide hebben hun eigen rol binnen bedrijfsprocessen."],
      sections: [
        { heading: "RPA", body: "RPA is geschikt voor regelgebaseerde en voorspelbare taken waarbij elke keer exact dezelfde stappen worden herhaald. Voorbeelden: data kopiëren tussen systemen, formulieren invullen, standaard e-mails versturen en administratieve verwerking." },
        { heading: "AI-automatisering", body: "AI-automatisering wordt ingezet wanneer interpretatie of analyse nodig is. Voorbeelden: documentverwerking, chatbots, lead scoring, patroonherkenning in data, voorspellingen en classificaties." },
      ],
      conclusion: "In veel organisaties werken beide technologieën samen: RPA automatiseert de voorspelbare stappen, terwijl AI wordt ingezet waar interpretatie nodig is. De juiste keuze hangt altijd af van het proces en de context.",
    },
  },
};

const ResourceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const lang = useLanguage();
  const articleLangs = slug ? articles[slug] : undefined;
  if (!articleLangs) return <Navigate to="/resources" replace />;
  const article = articleLangs[lang];

  const allResources = lang === "nl" ? "Alle resources" : "All resources";
  const sidebarTitle = lang === "nl" ? "Wil je dit in actie zien?" : "Want to see this in action?";
  const sidebarDesc = lang === "nl" ? "Plan een Automation Scan en we laten je zien hoe dit werkt voor jouw bedrijf." : "Schedule an Automation Scan and we'll show you how this works for your business.";
  const sidebarBtn = lang === "nl" ? "Plan een Automation Scan" : "Schedule Automation Scan";

  return (
    <>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/resources" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8"><ArrowLeft size={14} /> {allResources}</Link>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{article.category}</span>
              <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2">{article.title}</h1>
              <p className="text-sm text-muted-foreground mb-8">{article.date}</p>
              <div className="space-y-3 mb-10">{article.intro.map((p, i) => <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>)}</div>
              {article.sections && <div className="space-y-8 mb-12">{article.sections.map((section, i) => <div key={i}><h2 className="text-xl font-bold mb-2">{section.heading}</h2><p className="text-muted-foreground leading-relaxed">{section.body}</p></div>)}</div>}
              {article.conclusion && <div className="mt-10 pt-8 border-t border-border">{article.conclusion.split("\n\n").map((p, i) => <p key={i} className="text-muted-foreground leading-relaxed mb-3 last:mb-0">{p}</p>)}</div>}
            </article>
            <aside className="lg:sticky lg:top-24 self-start space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-2">{sidebarTitle}</h3>
                <p className="text-sm text-muted-foreground mb-4">{sidebarDesc}</p>
                <Button asChild className="w-full"><Link to="/book">{sidebarBtn} <ArrowRight size={14} /></Link></Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourceDetail;
