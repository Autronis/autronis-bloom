import { ShoppingCart, FileText, Users, TrendingUp, Clock, Zap, Mail, BarChart3, Target } from "lucide-react";
import { EcommerceIsometric, FinanceIsometric } from "./IsometricVisuals";
import LeadFlowDiagram from "./LeadFlowDiagram";

export interface CaseMetric {
  icon: React.ElementType;
  value: string;
  label: string;
}

export interface CaseStudy {
  title: string;
  icon: React.ElementType;
  metrics: CaseMetric[];
  context: string;
  problem: string[];
  solution: string[];
  results: string[];
  technology: string[];
  visual: React.ElementType;
  videoUrl?: string;
}

export const cases: CaseStudy[] = [
  {
    title: "E-commerce product- en orderautomatisering",
    icon: ShoppingCart,
    metrics: [
      { icon: Clock, value: "65%", label: "Minder handmatig productbeheer" },
      { icon: Zap, value: "Realtime", label: "Voorraad- en prijssynchronisatie" },
      { icon: TrendingUp, value: "3×", label: "Snellere productupdates" },
      { icon: Target, value: "100%", label: "Consistente productdata" },
    ],
    context: "Veel e-commerce organisaties beheren productinformatie, leveranciersdata, voorraad en prijzen in meerdere systemen. Hierdoor ontstaan inconsistenties en kost productbeheer onnodig veel tijd.",
    problem: [
      "Productinformatie handmatig bijwerken in webshop, ERP en leverancierssystemen",
      "Voorraadstanden en prijzen lopen uit sync tussen systemen",
      "Nieuwe producten lanceren kost te veel handmatige stappen",
      "Fouten door dubbele data-invoer en inconsistente productdata",
    ],
    solution: [
      "Automatische synchronisatie van productdata tussen leveranciers, webshop en ERP",
      "Realtime voorraad- en prijsupdates via API-koppelingen",
      "Geautomatiseerde productfeed-verwerking van leveranciers",
      "Automatische validatie en verrijking van productinformatie",
      "Centrale data-hub die alle systemen verbindt",
    ],
    results: [
      "Tot 65% minder handmatig productbeheer",
      "Realtime voorraad- en prijssynchronisatie",
      "3× snellere productupdates en lanceringen",
      "Consistente productdata over alle kanalen",
    ],
    technology: [
      "Productfeed automatisering",
      "API-integraties (webshop & ERP)",
      "Data synchronisatie pipeline",
      "Voorraadbeheersysteem",
      "Workflow automatisering",
      "Data validatie & verrijking",
    ],
    visual: EcommerceIsometric,
  },
  {
    title: "Financiële procesautomatisering",
    icon: FileText,
    metrics: [
      { icon: Clock, value: "70%", label: "Minder handmatige verwerking" },
      { icon: BarChart3, value: "2×", label: "Snellere maandrapportages" },
      { icon: Target, value: "95%+", label: "Datakwaliteit" },
      { icon: Zap, value: "< 1 min", label: "Factuurverwerking" },
    ],
    context: "Financiële teams besteden vaak veel tijd aan handmatige administratie, factuurverwerking en rapportages. Dit leidt tot vertragingen, fouten en beperkt inzicht in financiële prestaties.",
    problem: [
      "Facturen handmatig invoeren en verwerken in boekhoudsoftware",
      "Betalingen en transacties handmatig matchen en controleren",
      "Maandrapportages kosten dagen aan handmatig werk",
      "Fouten door dubbele invoer en inconsistente data tussen systemen",
    ],
    solution: [
      "Automatische factuurherkenning en -verwerking via document parsing (OCR + AI)",
      "Directe koppeling met boekhoudsoftware voor automatische boekingen",
      "Geautomatiseerde rapportage-dashboards met realtime data",
      "Automatische matching van betalingen en transacties",
      "Slimme alerts bij afwijkingen of ontbrekende data",
    ],
    results: [
      "Tot 70% minder handmatige verwerking",
      "2× snellere maandrapportages",
      "95%+ datakwaliteit in financiële systemen",
      "Significant minder correctiewerk en handmatige controles",
    ],
    technology: [
      "Document parsing (OCR + AI)",
      "Boekhoudsoftware-integratie",
      "Realtime rapportage dashboards",
      "Betalingsmatching automatisering",
      "Data validatie pipeline",
      "Workflow automatisering",
    ],
    visual: FinanceIsometric,
  },
  {
    title: "Leadwerving en outreach automatisering",
    icon: Users,
    metrics: [
      { icon: Clock, value: "25→5 min", label: "Leadverwerking per lead" },
      { icon: TrendingUp, value: "3–5×", label: "Hogere outreach efficiëntie" },
      { icon: Mail, value: "50+", label: "Gepersonaliseerde e-mails per dag" },
      { icon: Zap, value: "0→50+", label: "Dagelijkse e-mail outreach" },
    ],
    context: "Jobby wilde met een klein team meer bedrijven bereiken. Het vinden van nieuwe leads en het verzamelen van contactinformatie kostte veel tijd. Het team werkte voornamelijk met handmatig zoeken en telefonische outreach.",
    problem: [
      "Leads handmatig zoeken via verschillende platformen en databases",
      "Contactinformatie en bedrijfsgegevens afzonderlijk opzoeken (±25 min per lead)",
      "Geen inzicht in mogelijke pijnpunten van prospects",
      "E-mail outreach werd niet ingezet omdat het te tijdrovend was",
    ],
    solution: [
      "Automatisch leads verzamelen uit meerdere bronnen",
      "Bedrijfsinformatie en contactgegevens direct verrijken via data-API's",
      "Website-analyse automatisering om pijnpunten te identificeren",
      "AI-gestuurde generatie van gepersonaliseerde outreach e-mails",
      "Batch e-mail outreach systeem voor schaalbare campagnes",
      "Automatische synchronisatie van leaddata met dashboard",
    ],
    results: [
      "Leadverwerking van 25 naar 5–10 minuten per lead",
      "3–5× hogere outreach efficiëntie",
      "Van 0 naar 50+ gepersonaliseerde e-mails per dag",
      "Snellere toegang tot contactinformatie en bedrijfscontext",
      "Meer klantgesprekken zonder extra teamcapaciteit",
    ],
    technology: [
      "AI personalisatie (LLM / OpenAI)",
      "Lead scraping automatisering",
      "Bedrijfsdata verrijking",
      "Website-analyse automatisering",
      "API-integraties",
      "Batch e-mail outreach systeem",
      "Dashboard-synchronisatie",
      "Workflow automatisering",
    ],
    visual: LeadFlowDiagram,
  },
];
