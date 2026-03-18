import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, Sparkles } from "lucide-react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import { useLanguage } from "@/i18n/context";

interface CaseStudy {
  slug: string; title: string; description: string; results: string[]; caseIndex: number;
  trust?: { logoSrc: string; website?: string };
}

const text = {
  en: {
    label: "Case Studies",
    title: "Examples of automation implementations",
    desc: "Concrete examples of how automation accelerates processes, reduces errors, and enables scalability.",
    resultLabel: "Result",
    readFull: "Read full case",
    ctaBtn: "View all case studies",
    moreComingSoon: "More case studies are being prepared",
    stats: [
      { value: "73%", label: "Faster processing" },
      { value: "40h", label: "Saved per week" },
      { value: "2.4×", label: "More conversions" },
    ],
    case: { slug: "lead-generation-outreach-automation", title: "Lead generation and outreach automation", description: "Automatically collect leads, enrich contact information, and generate personalized email outreach with AI.", caseIndex: 0, results: ["Lead processing from 25 → 5 min per lead", "3–5× higher outreach efficiency", "50+ personalized emails per day"], trust: { logoSrc: "/assets/jobby-logo.png", website: "https://teamjobby.nl/" } } as CaseStudy,
  },
  nl: {
    label: "Case Studies",
    title: "Voorbeelden van automatiseringsimplementaties",
    desc: "Concrete voorbeelden van hoe automatisering processen versnelt, fouten vermindert en schaalbaarheid mogelijk maakt.",
    resultLabel: "Resultaat",
    readFull: "Lees volledige case",
    ctaBtn: "Bekijk alle case studies",
    moreComingSoon: "Meer case studies worden voorbereid",
    stats: [
      { value: "73%", label: "Snellere verwerking" },
      { value: "40u", label: "Bespaard per week" },
      { value: "2,4×", label: "Meer conversies" },
    ],
    case: { slug: "lead-generation-outreach-automation", title: "Leadgeneratie en outreach-automatisering", description: "Automatisch leads verzamelen, contactgegevens verrijken en gepersonaliseerde e-mail outreach genereren met AI.", caseIndex: 0, results: ["Leadverwerking van 25 → 5 min per lead", "3–5× hogere outreach-efficiëntie", "50+ gepersonaliseerde e-mails per dag"], trust: { logoSrc: "/assets/jobby-logo.png", website: "https://teamjobby.nl/" } } as CaseStudy,
  },
};

const CaseStudiesPreview = () => {
  const lang = useLanguage();
  const t = text[lang];
  const cs = t.case;

  return (
    <section className="py-10 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-8 sm:mb-12"><ScrollRevealItem>
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t.title}</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">{t.desc}</p>
        </ScrollRevealItem></ScrollReveal>

        {/* Animated stats bar */}
        <ScrollReveal className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
          <ScrollRevealItem>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary"><AnimatedCounter target={73} suffix="%" /></p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{t.stats[0].label}</p>
            </div>
          </ScrollRevealItem>
          <ScrollRevealItem>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary"><AnimatedCounter target={40} suffix="h" /></p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{t.stats[1].label}</p>
            </div>
          </ScrollRevealItem>
          <ScrollRevealItem>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-primary">2.<AnimatedCounter target={4} suffix="×" /></p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{t.stats[2].label}</p>
            </div>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Featured case study */}
        <ScrollReveal className="max-w-2xl mx-auto mb-8">
          <ScrollRevealItem>
            <Link
              to={`/case-studies#case-${cs.caseIndex}`}
              className="group block rounded-xl border border-border bg-card p-6 sm:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_24px_hsl(174_78%_41%/0.1)]"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/logo.png" alt="Autronis" className="h-5 w-5 object-contain opacity-90 shrink-0" />
                <h3 className="text-lg sm:text-xl font-bold leading-snug">{cs.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{cs.description}</p>

              <div className="border-t border-border pt-4 mb-5">
                <p className="text-[10px] font-semibold text-primary mb-2 tracking-wide uppercase">{t.resultLabel}</p>
                <ul className="space-y-2">
                  {cs.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {cs.trust && (
                <div className="border-t border-border pt-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <img src={cs.trust.logoSrc} alt="" className="h-5 object-contain opacity-70 shrink-0" />
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-primary text-primary" />)}
                    </div>
                  </div>
                  {cs.trust.website && (
                    <a
                      href={cs.trust.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-primary/60 hover:text-primary transition-colors duration-200 mt-1.5 inline-block"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {cs.trust.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  )}
                </div>
              )}

              <span className="text-sm text-primary inline-flex items-center gap-1.5 font-medium group-hover:gap-2.5 transition-all duration-200">
                {t.readFull} <ArrowRight size={15} />
              </span>
            </Link>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* More coming + CTA */}
        <ScrollReveal className="text-center space-y-4">
          <ScrollRevealItem>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
              <Sparkles size={12} className="text-primary" />
              {t.moreComingSoon}
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/case-studies">{t.ctaBtn}<ArrowRight size={18} /></Link>
            </Button>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default CaseStudiesPreview;
