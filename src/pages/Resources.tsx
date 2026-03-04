import { useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calculator, BarChart3, Workflow, Euro, Settings, UserPlus, Layers, Link2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AutomationImpactScan from "@/components/resources/AutomationImpactScan";

const guides = [
  {
    slug: "5-processen-die-elk-mkb-kan-automatiseren",
    title: "5 processen die elk MKB-bedrijf vandaag kan automatiseren",
    excerpt: "Van factuurverwerking tot lead opvolging – deze workflows kosten vaak onnodig tijd en zijn eenvoudig te automatiseren.",
    date: "2026-02-10",
    category: "Gids",
  },
  {
    slug: "roi-van-automatisering-berekenen",
    title: "Hoe berekent u de ROI van automatisering?",
    excerpt: "Een praktisch framework om de businesscase voor automatisering te onderbouwen.",
    date: "2026-01-28",
    category: "Business",
  },
  {
    slug: "ai-vs-rpa-wat-past-bij-uw-bedrijf",
    title: "AI vs. RPA: wat past bij uw organisatie?",
    excerpt: "Wanneer AI meerwaarde biedt en wanneer eenvoudige automatisering voldoende is.",
    date: "2026-01-15",
    category: "Technisch",
  },
];

const tools = [
  {
    icon: Calculator,
    title: "ROI Calculator",
    description: "Bereken indicatieve besparing, terugverdientijd en ROI van automatisering.",
    href: "/impact-roi",
  },
  {
    icon: BarChart3,
    title: "Automation Impact Scan",
    description: "Ontvang een eerste indicatie waar automatisering binnen uw organisatie de grootste impact kan realiseren.",
    href: "__impact-scan__",
  },
];

const processes = [
  {
    icon: Workflow,
    title: "Sales workflow automatisering",
    description: "Automatische leadopvolging, CRM-updates en pipelinebeheer.",
  },
  {
    icon: Euro,
    title: "Finance procesautomatisering",
    description: "Factuurverwerking, rapportages en financiële workflows.",
  },
  {
    icon: Settings,
    title: "Operations automatisering",
    description: "Orderverwerking, taakbeheer en interne workflows.",
  },
  {
    icon: UserPlus,
    title: "Customer onboarding automatisering",
    description: "Gestroomlijnde onboarding met automatische accountcreatie en notificaties.",
  },
];

const frameworks = [
  {
    icon: Layers,
    title: "Automation Impact Framework",
    description: "Hoe operationele verbeteringen worden vertaald naar een financiële businesscase.",
  },
  {
    icon: Link2,
    title: "Integratiemodel voor bedrijfssystemen",
    description: "Hoe systemen veilig, schaalbaar en gecontroleerd met elkaar worden verbonden.",
  },
  {
    icon: ShieldCheck,
    title: "Datagovernance en beveiliging",
    description: "Hoe datakwaliteit, toegangscontrole en logging structureel worden ingericht.",
  },
];

const ArticleCard = ({ post }: { post: typeof guides[0] }) => (
  <Link
    to={`/resources/${post.slug}`}
    className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:scale-[1.015] hover:-translate-y-0.5 flex flex-col max-md:hover:scale-100 max-md:hover:translate-y-0"
  >
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{post.category}</span>
      <span className="text-xs text-muted-foreground">{post.date}</span>
    </div>
    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
    <span className="mt-4 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">
      Lees meer <ArrowRight size={14} />
    </span>
  </Link>
);

const IconCard = ({ icon: Icon, title, description, href, onClick }: { icon: any; title: string; description: string; href?: string; onClick?: () => void }) => {
  const content = (
    <div className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 md:hover:scale-[1.015] md:hover:-translate-y-0.5 flex flex-col h-full">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/15 transition-colors">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
      {(href || onClick) && (
        <span className="mt-4 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">
          Bekijk <ArrowRight size={14} />
        </span>
      )}
    </div>
  );

  if (onClick) {
    return <button onClick={onClick} className="flex text-left w-full">{content}</button>;
  }
  if (href && href !== "#") {
    return <Link to={href} className="flex">{content}</Link>;
  }
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
  const [scanOpen, setScanOpen] = useState(false);

  return (
    <section className="pt-16 pb-24 relative overflow-hidden">
      <AutomationImpactScan open={scanOpen} onOpenChange={setScanOpen} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Page header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Inzichten</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Inzichten & gidsen</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Praktische inzichten over automatisering en AI voor MKB-bedrijven. Geen theorie, maar concrete kennis die direct toepasbaar is in bedrijfsprocessen en systemen.
          </p>
        </div>

        {/* Sectie 1: Praktische gidsen */}
        <div className="mb-20">
          <SectionHeader
            title="Praktische gidsen over automatisering"
            description="Artikelen en praktische inzichten over procesautomatisering, systeemintegraties en data-infrastructuur voor groeiende MKB-organisaties."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((post) => (
              <ScrollReveal key={post.slug}>
                <ScrollRevealItem>
                  <ArticleCard post={post} />
                </ScrollRevealItem>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Sectie 2: Praktische tools */}
        <div className="mb-20">
          <SectionHeader
            title="Praktische tools"
            description="Interactieve tools om automatiseringskansen en impact binnen uw organisatie te analyseren."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {tools.map((tool) => (
              <ScrollReveal key={tool.title}>
                <ScrollRevealItem>
                  <IconCard
                    {...tool}
                    onClick={tool.href === "__impact-scan__" ? () => setScanOpen(true) : undefined}
                    href={tool.href === "__impact-scan__" ? undefined : tool.href}
                  />
                </ScrollRevealItem>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Sectie 3: Voorbeelden van automatiseringsprocessen */}
        <div className="mb-20">
          <SectionHeader
            title="Voorbeelden van automatiseringsprocessen"
            description="Concrete voorbeelden van processen die vaak geautomatiseerd worden binnen groeiende organisaties."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.map((proc) => (
              <ScrollReveal key={proc.title}>
                <ScrollRevealItem>
                  <IconCard {...proc} />
                </ScrollRevealItem>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Sectie 4: Frameworks en methodiek */}
        <div className="mb-20">
          <SectionHeader
            title="Frameworks en methodiek"
            description="Hoe wij automatisering analyseren, ontwerpen en implementeren binnen organisaties."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {frameworks.map((fw) => (
              <ScrollReveal key={fw.title}>
                <ScrollRevealItem>
                  <IconCard {...fw} />
                </ScrollRevealItem>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Lead CTA */}
        <ScrollReveal>
          <ScrollRevealItem>
            <div className="rounded-xl border border-border bg-card p-8 sm:p-10 text-center max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold mb-3">
                Wilt u weten waar automatisering binnen uw organisatie de meeste impact heeft?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Plan een Automation Scan en ontvang een eerste analyse van automatiseringskansen binnen uw processen.
              </p>
              <Button asChild size="lg">
                <Link to="/book">
                  Plan Automation Scan <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Resources;
