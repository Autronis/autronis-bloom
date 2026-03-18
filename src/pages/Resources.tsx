import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calculator, BarChart3, Workflow, Euro, Settings, UserPlus, Layers, Link2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import GlowCTA from "@/components/GlowCTA";
import AutomationImpactScan from "@/components/resources/AutomationImpactScan";
import { useLanguage } from "@/i18n/context";

const t = {
  en: {
    seoTitle: "Autronis | Insights & Guides — Automation for SMBs",
    seoDesc: "Practical insights and guides on process automation, system integrations, and AI for growing SMB companies.",
    pageLabel: "Insights",
    pageTitle: "Insights & guides",
    pageDesc: "Practical insights on automation and AI for SMB companies. Not theory, but concrete knowledge you can apply directly to business processes and systems.",
    guidesTitle: "Practical guides on automation",
    guidesDesc: "Articles and practical insights on process automation, system integrations, and data infrastructure for growing SMB organizations.",
    toolsTitle: "Practical tools",
    toolsDesc: "Interactive tools to analyze automation opportunities and impact within your organization.",
    processTitle: "Automation process examples",
    processDesc: "Concrete examples of processes commonly automated within growing organizations.",
    fwTitle: "Frameworks & methodology",
    fwDesc: "How we analyze, design, and implement automation within organizations.",
    ctaTitle: "Want to know where automation can have the biggest impact in your organization?",
    ctaDesc: "Schedule an Automation Scan and receive an initial analysis of automation opportunities within your processes.",
    ctaBtn: "Schedule Automation Scan",
    readMore: "Read more",
    view: "View",
    guides: [
      { slug: "5-processes-every-smb-can-automate", title: "5 processes every SMB can automate today", excerpt: "From invoice processing to lead follow-up — these workflows often cost unnecessary time and are easy to automate.", date: "2026-02-10", category: "Guide" },
      { slug: "how-to-calculate-automation-roi", title: "How to calculate the ROI of automation", excerpt: "A practical framework to build the business case for automation.", date: "2026-01-28", category: "Business" },
      { slug: "ai-vs-rpa-which-fits-your-business", title: "AI vs. RPA: which fits your organization?", excerpt: "When AI adds value and when simple automation is sufficient.", date: "2026-01-15", category: "Technical" },
    ],
    tools: [
      { icon: Calculator, title: "ROI Calculator", description: "Calculate indicative savings, payback period, and ROI of automation.", href: "/impact-roi" },
      { icon: BarChart3, title: "Automation Impact Scan", description: "Get an initial indication of where automation can have the greatest impact within your organization.", href: "__impact-scan__" },
    ],
    processes: [
      { icon: Workflow, title: "Sales workflow automation", description: "Automatic lead follow-up, CRM updates, and pipeline management." },
      { icon: Euro, title: "Finance process automation", description: "Invoice processing, reporting, and financial workflows." },
      { icon: Settings, title: "Operations automation", description: "Order processing, task management, and internal workflows." },
      { icon: UserPlus, title: "Customer onboarding automation", description: "Streamlined onboarding with automatic account creation and notifications." },
    ],
    frameworks: [
      { icon: Layers, title: "Automation Impact Framework", description: "How operational improvements are translated into a financial business case." },
      { icon: Link2, title: "Enterprise system integration model", description: "How systems are connected securely, scalably, and in a controlled manner." },
      { icon: ShieldCheck, title: "Data governance & security", description: "How data quality, access control, and logging are structurally implemented." },
    ],
  },
  nl: {
    seoTitle: "Autronis | Inzichten & Gidsen — Automatisering voor het MKB",
    seoDesc: "Praktische inzichten en gidsen over procesautomatisering, systeemintegraties en AI voor groeiende MKB-bedrijven.",
    pageLabel: "Inzichten",
    pageTitle: "Inzichten & gidsen",
    pageDesc: "Praktische inzichten over automatisering en AI voor MKB-bedrijven. Geen theorie, maar concrete kennis die je direct kunt toepassen op bedrijfsprocessen en systemen.",
    guidesTitle: "Praktische gidsen over automatisering",
    guidesDesc: "Artikelen en praktische inzichten over procesautomatisering, systeemintegraties en data-infrastructuur voor groeiende MKB-organisaties.",
    toolsTitle: "Praktische tools",
    toolsDesc: "Interactieve tools om automatiseringsmogelijkheden en impact binnen je organisatie te analyseren.",
    processTitle: "Automatisering procesvoorbeelden",
    processDesc: "Concrete voorbeelden van processen die vaak geautomatiseerd worden binnen groeiende organisaties.",
    fwTitle: "Frameworks & methodologie",
    fwDesc: "Hoe we automatisering analyseren, ontwerpen en implementeren binnen organisaties.",
    ctaTitle: "Wil je weten waar automatisering de grootste impact kan hebben in jouw organisatie?",
    ctaDesc: "Plan een Automation Scan en ontvang een eerste analyse van automatiseringsmogelijkheden binnen je processen.",
    ctaBtn: "Plan een Automation Scan",
    readMore: "Lees meer",
    view: "Bekijk",
    guides: [
      { slug: "5-processes-every-smb-can-automate", title: "5 processen die elk MKB-bedrijf vandaag kan automatiseren", excerpt: "Van factuurverwerking tot lead-opvolging — deze workflows kosten vaak onnodig veel tijd en zijn eenvoudig te automatiseren.", date: "2026-02-10", category: "Gids" },
      { slug: "how-to-calculate-automation-roi", title: "Hoe bereken je de ROI van automatisering?", excerpt: "Een praktisch framework om de businesscase voor automatisering op te bouwen.", date: "2026-01-28", category: "Business" },
      { slug: "ai-vs-rpa-which-fits-your-business", title: "AI vs. RPA: wat past bij jouw organisatie?", excerpt: "Wanneer AI waarde toevoegt en wanneer eenvoudige automatisering volstaat.", date: "2026-01-15", category: "Technisch" },
    ],
    tools: [
      { icon: Calculator, title: "ROI Calculator", description: "Bereken indicatieve besparingen, terugverdientijd en ROI van automatisering.", href: "/impact-roi" },
      { icon: BarChart3, title: "Automation Impact Scan", description: "Krijg een eerste indicatie van waar automatisering de grootste impact kan hebben binnen je organisatie.", href: "__impact-scan__" },
    ],
    processes: [
      { icon: Workflow, title: "Sales workflow-automatisering", description: "Automatische lead-opvolging, CRM-updates en pipelinebeheer." },
      { icon: Euro, title: "Finance procesautomatisering", description: "Factuurverwerking, rapportage en financiële workflows." },
      { icon: Settings, title: "Operations-automatisering", description: "Orderverwerking, taakbeheer en interne workflows." },
      { icon: UserPlus, title: "Klant-onboarding automatisering", description: "Gestroomlijnde onboarding met automatische accountcreatie en notificaties." },
    ],
    frameworks: [
      { icon: Layers, title: "Automation Impact Framework", description: "Hoe operationele verbeteringen worden vertaald naar een financiële businesscase." },
      { icon: Link2, title: "Enterprise systeemintegratiemodel", description: "Hoe systemen veilig, schaalbaar en beheerst worden gekoppeld." },
      { icon: ShieldCheck, title: "Data governance & beveiliging", description: "Hoe datakwaliteit, toegangscontrole en logging structureel worden ingericht." },
    ],
  },
};

const ArticleCard = ({ post, readMore }: { post: typeof t.en.guides[0]; readMore: string }) => (
  <Link to={`/resources/${post.slug}`} className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:scale-[1.015] hover:-translate-y-0.5 flex flex-col max-md:hover:scale-100 max-md:hover:translate-y-0">
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{post.category}</span>
      <span className="text-xs text-muted-foreground">{post.date}</span>
    </div>
    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
    <span className="mt-4 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">{readMore} <ArrowRight size={14} /></span>
  </Link>
);

const IconCard = ({ icon: Icon, title, description, href, onClick, viewLabel }: { icon: any; title: string; description: string; href?: string; onClick?: () => void; viewLabel: string }) => {
  const content = (
    <div className="group rounded-xl border border-border bg-card p-4 sm:p-6 transition-all duration-300 hover:border-primary/30 md:hover:scale-[1.015] md:hover:-translate-y-0.5 flex flex-col h-full">
      <div className="flex items-center gap-2.5 sm:block mb-2 sm:mb-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-colors sm:mb-4"><Icon size={16} className="sm:w-5 sm:h-5" /></div>
        <h3 className="text-base font-semibold sm:hidden">{title}</h3>
      </div>
      <h3 className="hidden sm:block text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
      {(href || onClick) && <span className="mt-4 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">{viewLabel} <ArrowRight size={14} /></span>}
    </div>
  );
  if (onClick) return <button onClick={onClick} className="flex text-left w-full">{content}</button>;
  if (href && href !== "#") return <Link to={href} className="flex">{content}</Link>;
  return <div className="cursor-default">{content}</div>;
};

const SectionHeader = ({ label, title, description }: { label?: string; title: string; description: string }) => (
  <ScrollReveal className="mb-8">
    <ScrollRevealItem>
      {label && <p className="text-xs font-semibold text-primary mb-2 tracking-widest uppercase">{label}</p>}
      <h2 className="text-2xl sm:text-3xl font-bold mb-3">{title}</h2>
      <p className="text-muted-foreground leading-relaxed max-w-2xl">{description}</p>
    </ScrollRevealItem>
  </ScrollReveal>
);

const Resources = () => {
  const lang = useLanguage();
  const c = t[lang];
  const [scanOpen, setScanOpen] = useState(false);

  return (
    <>
      <SEOHead title={c.seoTitle} description={c.seoDesc} path="/resources" />
      <section className="pt-16 pb-24 relative overflow-hidden">
        <AutomationImpactScan open={scanOpen} onOpenChange={setScanOpen} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">{c.pageLabel}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{c.pageTitle}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.pageDesc}</p>
          </div>

          <div className="mb-20">
            <SectionHeader title={c.guidesTitle} description={c.guidesDesc} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.guides.map((post) => <ScrollReveal key={post.slug}><ScrollRevealItem><ArticleCard post={post} readMore={c.readMore} /></ScrollRevealItem></ScrollReveal>)}
            </div>
          </div>

          <div className="mb-20">
            <SectionHeader title={c.toolsTitle} description={c.toolsDesc} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              {c.tools.map((tool) => <ScrollReveal key={tool.title}><ScrollRevealItem><IconCard {...tool} viewLabel={c.view} onClick={tool.href === "__impact-scan__" ? () => setScanOpen(true) : undefined} href={tool.href === "__impact-scan__" ? undefined : tool.href} /></ScrollRevealItem></ScrollReveal>)}
            </div>
          </div>

          <div className="mb-20">
            <SectionHeader title={c.processTitle} description={c.processDesc} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {c.processes.map((proc) => <ScrollReveal key={proc.title}><ScrollRevealItem><IconCard {...proc} viewLabel={c.view} /></ScrollRevealItem></ScrollReveal>)}
            </div>
          </div>

          <div className="mb-20">
            <SectionHeader title={c.fwTitle} description={c.fwDesc} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.frameworks.map((fw) => <ScrollReveal key={fw.title}><ScrollRevealItem><IconCard {...fw} viewLabel={c.view} /></ScrollRevealItem></ScrollReveal>)}
            </div>
          </div>

          <ScrollReveal><ScrollRevealItem>
            <div className="rounded-xl border border-border bg-card p-8 sm:p-10 text-center max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold mb-3">{c.ctaTitle}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{c.ctaDesc}</p>
              <GlowCTA to="/book">{c.ctaBtn}</GlowCTA>
            </div>
          </ScrollRevealItem></ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Resources;
