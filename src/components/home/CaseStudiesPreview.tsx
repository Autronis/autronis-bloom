import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const caseStudies = [
  {
    slug: "logistiek-bedrijf",
    industry: "Logistiek",
    client: "TransFlow B.V.",
    metric: "73% snellere orderverwerking",
    summary: "Van handmatige orderinvoer naar een volledig geautomatiseerde pipeline — inclusief validatie, routeplanning en klantcommunicatie.",
  },
  {
    slug: "saas-scale-up",
    industry: "SaaS",
    client: "CloudMetrics",
    metric: "40 uur/week bespaard",
    summary: "Onboarding, billing en churn-alerts geautomatiseerd waardoor het CS-team zich kon focussen op strategische accounts.",
  },
  {
    slug: "e-commerce-groei",
    industry: "E-commerce",
    client: "StyleDirect",
    metric: "2.4x meer conversies",
    summary: "AI-gedreven productaanbevelingen, geautomatiseerde follow-ups en dynamische pricing in één geïntegreerd systeem.",
  },
];

const CaseStudiesPreview = () => {
  return (
    <section className="py-12 sm:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Case Studies</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Resultaten die spreken</h2>
          </div>
          <Link to="/case-studies" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            Alle case studies <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <Link
              key={cs.slug}
              to={`/case-studies/${cs.slug}`}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_hsl(174_78%_41%/0.08)] flex flex-col"
            >
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full self-start mb-4">
                {cs.industry}
              </span>
              <p className="text-2xl font-bold mb-1 text-primary">{cs.metric}</p>
              <p className="text-sm font-medium mb-3">{cs.client}</p>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{cs.summary}</p>
              <span className="mt-4 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">
                Lees meer <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesPreview;
