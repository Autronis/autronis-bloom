import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedBubbles from "@/components/home/AnimatedBubbles";
import { useState } from "react";

const allCases = [
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

const industries = ["Alle", "Logistiek", "SaaS", "E-commerce"];

const CaseStudies = () => {
  const [filter, setFilter] = useState("Alle");
  const filtered = filter === "Alle" ? allCases : allCases.filter((c) => c.industry === filter);

  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <AnimatedBubbles />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Case Studies</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Resultaten die spreken</h1>
            <p className="text-lg text-muted-foreground">
              Ontdek hoe wij bedrijven helpen met AI-automatisering die meetbaar verschil maakt.
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setFilter(ind)}
                className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                  filter === ind
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                }`}
              >
                {ind}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((cs) => (
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
    </Layout>
  );
};

export default CaseStudies;
