import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { useState } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import useCanHover from "@/hooks/use-can-hover";
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
    ctaBtn: "View more implementations",
    cases: [
      { slug: "lead-generation-outreach-automation", title: "Lead generation and outreach automation", description: "Automatically collect leads, enrich contact information, and generate personalized email outreach with AI.", caseIndex: 0, results: ["Lead processing from 25 → 5 min per lead", "3–5× higher outreach efficiency", "50+ personalized emails per day"], trust: { logoSrc: "/assets/jobby-logo.png", website: "https://teamjobby.nl/" } },
      { slug: "ai-customer-service-automation", title: "AI customer service automation", description: "AI-driven system that automatically answers common customer questions and routes complex cases to team members.", caseIndex: 1, results: ["70%+ questions handled automatically", "Response time from hours to instant", "24/7 availability"] },
      { slug: "marketing-reporting-automation", title: "Marketing and reporting automation", description: "Automatically collect, combine, and visualize marketing data in real-time dashboards with automatic report delivery.", caseIndex: 2, results: ["Reporting time from 6 hrs to 10 min", "100% automatic data collection", "Real-time client dashboards"] },
    ],
  },
  nl: {
    label: "Case Studies",
    title: "Voorbeelden van automatiseringsimplementaties",
    desc: "Concrete voorbeelden van hoe automatisering processen versnelt, fouten vermindert en schaalbaarheid mogelijk maakt.",
    resultLabel: "Resultaat",
    readFull: "Lees volledige case",
    ctaBtn: "Bekijk meer implementaties",
    cases: [
      { slug: "lead-generation-outreach-automation", title: "Leadgeneratie en outreach-automatisering", description: "Automatisch leads verzamelen, contactgegevens verrijken en gepersonaliseerde e-mail outreach genereren met AI.", caseIndex: 0, results: ["Leadverwerking van 25 → 5 min per lead", "3–5× hogere outreach-efficiëntie", "50+ gepersonaliseerde e-mails per dag"], trust: { logoSrc: "/assets/jobby-logo.png", website: "https://teamjobby.nl/" } },
      { slug: "ai-customer-service-automation", title: "AI-klantenservice automatisering", description: "AI-gestuurd systeem dat veelgestelde klantvragen automatisch beantwoordt en complexe cases naar teamleden routeert.", caseIndex: 1, results: ["70%+ vragen automatisch afgehandeld", "Responstijd van uren naar direct", "24/7 beschikbaarheid"] },
      { slug: "marketing-reporting-automation", title: "Marketing- en rapportage-automatisering", description: "Automatisch marketingdata verzamelen, combineren en visualiseren in realtime dashboards met automatische rapportlevering.", caseIndex: 2, results: ["Rapportagetijd van 6 uur naar 10 min", "100% automatische dataverzameling", "Realtime klantdashboards"] },
    ],
  },
};

const CaseCard = ({ cs, isHovered, isAnyHovered, onHover, onLeave, canHover, resultLabel, readFull }: {
  cs: CaseStudy; isHovered: boolean; isAnyHovered: boolean; onHover: () => void; onLeave: () => void; canHover: boolean; resultLabel: string; readFull: string;
}) => {
  const showHover = canHover && isHovered;
  const showDim = canHover && isAnyHovered && !isHovered;

  return (
    <Link to={`/case-studies#case-${cs.caseIndex}`} onMouseEnter={canHover ? onHover : undefined} onMouseLeave={canHover ? onLeave : undefined} className="relative group rounded-xl border border-border bg-card p-4 sm:p-5 flex flex-col h-full overflow-hidden transition-all duration-200 ease-out" style={{ transform: showHover ? "scale(1.015) translateY(-2px)" : "none", opacity: showDim ? 0.88 : 1, borderColor: showHover ? "hsl(var(--primary) / 0.5)" : undefined, boxShadow: showHover ? "0 0 20px hsl(174 78% 41% / 0.12)" : "none" }}>
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2.5 mb-3"><img src="/logo.png" alt="Autronis" className="h-[18px] w-[18px] object-contain opacity-90 shrink-0" /><h3 className="text-sm sm:text-base font-bold leading-snug">{cs.title}</h3></div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">{cs.description}</p>
        <div className="border-t border-border pt-3 flex-1">
          <p className="text-[10px] font-semibold text-primary mb-1.5 tracking-wide uppercase">{resultLabel}</p>
          <ul className="space-y-1">{cs.results.map((r, i) => <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed"><CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" />{r}</li>)}</ul>
        </div>
        {cs.trust && (
          <div className="border-t border-border pt-3 mt-3">
            <div className="flex items-center gap-2.5"><img src={cs.trust.logoSrc} alt="" className="h-5 object-contain opacity-70 shrink-0" /><div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={13} className="fill-primary text-primary" />)}</div></div>
            {cs.trust.website && <a href={cs.trust.website} target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary/60 hover:text-primary transition-colors duration-200 mt-1.5 inline-block" onClick={(e) => e.stopPropagation()}>{cs.trust.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>}
          </div>
        )}
        <span className="mt-3 text-sm text-primary inline-flex items-center gap-1 group-hover:underline">{readFull} <ArrowRight size={14} /></span>
      </div>
    </Link>
  );
};

const CaseStudiesPreview = () => {
  const lang = useLanguage();
  const t = text[lang];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <section className="py-10 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-8 sm:mb-12"><ScrollRevealItem>
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t.title}</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">{t.desc}</p>
        </ScrollRevealItem></ScrollReveal>

        <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-12">
          {t.cases.map((cs, i) => <ScrollRevealItem key={cs.slug}><CaseCard cs={cs} isHovered={hoveredIndex === i} isAnyHovered={hoveredIndex !== null} onHover={() => setHoveredIndex(i)} onLeave={() => setHoveredIndex(null)} canHover={canHover} resultLabel={t.resultLabel} readFull={t.readFull} /></ScrollRevealItem>)}
        </ScrollReveal>

        <ScrollReveal className="text-center"><ScrollRevealItem>
          <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/case-studies">{t.ctaBtn}<ArrowRight size={18} /></Link></Button>
        </ScrollRevealItem></ScrollReveal>
      </div>
    </section>
  );
};

export default CaseStudiesPreview;
