import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Calculator, BarChart3, Workflow, Euro, Settings, UserPlus, Layers, Link2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AutomationImpactScan from "@/components/resources/AutomationImpactScan";

const guides = [
  {
    slug: "5-processes-every-smb-can-automate",
    title: "5 processes every SMB can automate today",
    excerpt: "From invoice processing to lead follow-up — these workflows often cost unnecessary time and are easy to automate.",
    date: "2026-02-10",
    category: "Guide",
  },
  {
    slug: "how-to-calculate-automation-roi",
    title: "How to calculate the ROI of automation",
    excerpt: "A practical framework to build the business case for automation.",
    date: "2026-01-28",
    category: "Business",
  },
  {
    slug: "ai-vs-rpa-which-fits-your-business",
    title: "AI vs. RPA: which fits your organization?",
    excerpt: "When AI adds value and when simple automation is sufficient.",
    date: "2026-01-15",
    category: "Technical",
  },
];

const tools = [
  {
    icon: Calculator,
    title: "ROI Calculator",
    description: "Calculate indicative savings, payback period, and ROI of automation.",
    href: "/impact-roi",
  },
  {
    icon: BarChart3,
    title: "Automation Impact Scan",
    description: "Get an initial indication of where automation can have the greatest impact within your organization.",
    href: "__impact-scan__",
  },
];

const processes = [
  {
    icon: Workflow,
    title: "Sales workflow automation",
    description: "Automatic lead follow-up, CRM updates, and pipeline management.",
  },
  {
    icon: Euro,
    title: "Finance process automation",
    description: "Invoice processing, reporting, and financial workflows.",
  },
  {
    icon: Settings,
    title: "Operations automation",
    description: "Order processing, task management, and internal workflows.",
  },
  {
    icon: UserPlus,
    title: "Customer onboarding automation",
    description: "Streamlined onboarding with automatic account creation and notifications.",
  },
];

const frameworks = [
  {
    icon: Layers,
    title: "Automation Impact Framework",
    description: "How operational improvements are translated into a financial business case.",
  },
  {
    icon: Link2,
    title: "Enterprise system integration model",
    description: "How systems are connected securely, scalably, and in a controlled manner.",
  },
  {
    icon: ShieldCheck,
    title: "Data governance & security",
    description: "How data quality, access control, and logging are structurally implemented.",
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
      Read more <ArrowRight size={14} />
    </span>
  </Link>
);

const IconCard = ({ icon: Icon, title, description, href, onClick }: { icon: any; title: string; description: string; href?: string; onClick?: () => void }) => {
  const content = (
    <div className="group rounded-xl border border-border bg-card p-4 sm:p-6 transition-all duration-300 hover:border-primary/30 md:hover:scale-[1.015] md:hover:-translate-y-0.5 flex flex-col h-full">
      <div className="flex items-center gap-2.5 sm:block mb-2 sm:mb-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-colors sm:mb-4">
          <Icon size={16} className="sm:w-5 sm:h-5" />
        </div>
        <h3 className="text-base font-semibold sm:hidden">{title}</h3>
      </div>
      <h3 className="hidden sm:block text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>
      {(href || onClick) && (
        <span className="mt-4 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">
          View <ArrowRight size={14} />
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
    <>
    <SEOHead
      title="Autronis | Insights & Guides — Automation for SMBs"
      description="Practical insights and guides on process automation, system integrations, and AI for growing SMB companies."
      path="/resources"
    />
    <section className="pt-16 pb-24 relative overflow-hidden">
      <AutomationImpactScan open={scanOpen} onOpenChange={setScanOpen} />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Page header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Insights</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Insights & guides</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Practical insights on automation and AI for SMB companies. Not theory, but concrete knowledge you can apply directly to business processes and systems.
          </p>
        </div>

        {/* Section 1: Practical guides */}
        <div className="mb-20">
          <SectionHeader
            title="Practical guides on automation"
            description="Articles and practical insights on process automation, system integrations, and data infrastructure for growing SMB organizations."
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

        {/* Section 2: Practical tools */}
        <div className="mb-20">
          <SectionHeader
            title="Practical tools"
            description="Interactive tools to analyze automation opportunities and impact within your organization."
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

        {/* Section 3: Automation process examples */}
        <div className="mb-20">
          <SectionHeader
            title="Automation process examples"
            description="Concrete examples of processes commonly automated within growing organizations."
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

        {/* Section 4: Frameworks & methodology */}
        <div className="mb-20">
          <SectionHeader
            title="Frameworks & methodology"
            description="How we analyze, design, and implement automation within organizations."
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
                Want to know where automation can have the biggest impact in your organization?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Schedule an Automation Scan and receive an initial analysis of automation opportunities within your processes.
              </p>
              <Button asChild size="lg">
                <Link to="/book">
                  Schedule Automation Scan <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
    </>
  );
};

export default Resources;
