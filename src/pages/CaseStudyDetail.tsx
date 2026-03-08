// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const caseData: Record<string, {
  client: string; industry: string; metric: string;
  context: string; challenge: string; solution: string; result: string;
}> = {
  "logistics-company": {
    client: "TransFlow B.V.",
    industry: "Logistics",
    metric: "73% faster order processing",
    context: "TransFlow is a mid-sized logistics company (120 employees) specialized in last-mile delivery for e-commerce. The team processed hundreds of orders manually every day.",
    challenge: "Order entry, validation, and route planning cost the operations team an average of 6 hours per day. Address errors and duplicate bookings led to delays and complaints.",
    solution: "We built an end-to-end automation: orders are automatically validated via API connections, routed based on postal code and capacity, and customers receive real-time status updates.",
    result: "Order processing time decreased by 73%. Error rate dropped from 8% to 0.3%. The team redeployed 4 FTE to strategic work. Customer satisfaction increased by 22 points.",
  },
  "saas-scale-up": {
    client: "CloudMetrics",
    industry: "SaaS",
    metric: "40 hours/week saved",
    context: "CloudMetrics is a fast-growing SaaS startup (45 employees) with an analytics platform. The customer success team was overwhelmed by growing onboarding and support requests.",
    challenge: "Manual onboarding took 2 weeks per customer. Billing issues were handled ad hoc. Churn signals were only noticed when it was too late.",
    solution: "We automated the complete onboarding flow (welcome emails, setup checklists, training scheduling), connected billing to usage data, and built proactive churn alerts based on engagement metrics.",
    result: "The CS team saves 40 hours per week. Onboarding time decreased from 14 to 3 days. Churn decreased by 18% in the first quarter after implementation.",
  },
  "e-commerce-growth": {
    client: "StyleDirect",
    industry: "E-commerce",
    metric: "2.4x more conversions",
    context: "StyleDirect is a direct-to-consumer fashion brand (30 employees) that struggled with low conversion rates and high CAC despite growing traffic.",
    challenge: "Product recommendations were static, abandoned cart follow-ups were manual, and pricing was not optimized based on demand and inventory.",
    solution: "We implemented AI-driven product recommendations, automated abandoned cart sequences (email + SMS), and a dynamic pricing model connected to inventory and competitor data.",
    result: "Conversion rate increased from 1.8% to 4.3% (2.4x). Average order value increased by 15%. CAC decreased by 30% due to higher organic conversion.",
  },
};

const slugs = Object.keys(caseData);

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = slug ? caseData[slug] : undefined;
  if (!cs) return <Navigate to="/case-studies" replace />;

  const currentIndex = slugs.indexOf(slug!);
  const nextSlug = slugs[(currentIndex + 1) % slugs.length];

  return (
    <>
      <SEOHead
        title={`Autronis | ${cs.client} — Case Study`}
        description={`${cs.metric}. Read how Autronis helped ${cs.client} with automation in the ${cs.industry} sector.`}
        path={`/case-studies/${slug}`}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${cs.client} — ${cs.metric}`,
          description: cs.context,
          author: { "@type": "Organization", name: "Autronis" },
          publisher: { "@type": "Organization", name: "Autronis" },
        }}
      />
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/case-studies" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft size={14} /> All case studies
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{cs.industry}</span>
                <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-2">{cs.client}</h1>
                <p className="text-2xl font-bold text-primary">{cs.metric}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Context</h2>
                <p className="text-muted-foreground leading-relaxed">{cs.context}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Challenge</h2>
                <p className="text-muted-foreground leading-relaxed">{cs.challenge}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Solution</h2>
                <p className="text-muted-foreground leading-relaxed">{cs.solution}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Result</h2>
                <p className="text-muted-foreground leading-relaxed">{cs.result}</p>
              </div>

              <Link to={`/case-studies/${nextSlug}`} className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                Next case study <ArrowRight size={14} />
              </Link>
            </div>

            <div className="lg:sticky lg:top-24 self-start">
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <h3 className="font-semibold">Want to achieve similar results?</h3>
                <p className="text-sm text-muted-foreground">Schedule a free Automation Scan and discover what we can automate for your business.</p>
                <Button asChild className="w-full">
                  <Link to="/book">Schedule Automation Scan <ArrowRight size={14} /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudyDetail;
