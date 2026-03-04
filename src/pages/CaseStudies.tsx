import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, FileText, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const projects = [
  {
    icon: ShoppingCart,
    title: "E-commerce orderautomatisering",
    description: "Webshop, ERP en fulfilment automatisch verbonden.",
  },
  {
    icon: FileText,
    title: "Finance procesautomatisering",
    description: "Factuurverwerking en rapportages geautomatiseerd.",
  },
  {
    icon: Bot,
    title: "AI-gedreven klantenservice",
    description: "Classificatie en routering van klantvragen via AI.",
  },
];

const CaseStudies = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-16">
            <ScrollRevealItem>
              <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Case Studies</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">Onze projecten</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Concrete implementaties van automatisering binnen verschillende sectoren. Binnenkort delen we hier de volledige resultaten.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <ScrollRevealItem key={project.title}>
                  <div className="group rounded-xl border border-border bg-card overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-primary/30">
                    {/* Placeholder visual */}
                    <div className="aspect-[4/3] border-b border-border bg-muted/20 flex items-center justify-center">
                      <span className="text-sm text-muted-foreground/60">Coming soon</span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Icon size={16} />
                        </div>
                        <h3 className="font-semibold text-sm">{project.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                </ScrollRevealItem>
              );
            })}
          </ScrollReveal>

          <ScrollReveal className="text-center">
            <ScrollRevealItem>
              <Button asChild size="lg" className="w-full max-w-md">
                <Link to="/book">
                  Bekijk alle projecten
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
