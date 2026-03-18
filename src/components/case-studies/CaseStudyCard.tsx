import { CheckCircle2, AlertTriangle, Star, UserCircle, ArrowRight, Play, TrendingDown, TrendingUp as TrendUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { TechTagList } from "@/components/case-studies/TechTag";
import type { CaseStudy, CaseMetric, MetricAnimation } from "./caseStudiesData";
import { useLanguage } from "@/i18n/context";

const labels = {
  en: { context: "Context", problem: "Problem", solution: "Solution", systemOverview: "System Overview", simplified: "Simplified view of the automation pipeline.", videoDesc: "Watch the video to see how the automation system works.", resultsImpact: "Results & Impact", technology: "Technology", anonCase: "Anonymized implementation case", watchDemo: "Watch our demo" },
  nl: { context: "Context", problem: "Probleem", solution: "Oplossing", systemOverview: "Systeemoverzicht", simplified: "Vereenvoudigde weergave van de automatiseringspipeline.", videoDesc: "Bekijk de video om te zien hoe het automatiseringssysteem werkt.", resultsImpact: "Resultaten & Impact", technology: "Technologie", anonCase: "Geanonimiseerde implementatiecase", watchDemo: "Bekijk onze demo" },
};

const AnimatedValue = ({ animation, fallback }: { animation: MetricAnimation; fallback: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [current, setCurrent] = useState(animation.from);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !hasTriggered) setHasTriggered(true); }, { threshold: 0.5 }); obs.observe(el); return () => obs.disconnect(); }, [hasTriggered]);
  useEffect(() => { if (!hasTriggered) return; const { from, to } = animation; const duration = 1200; const steps = Math.abs(to - from); const stepTime = Math.max(duration / steps, 16); let frame = from; const interval = setInterval(() => { frame += from < to ? 1 : -1; setCurrent(frame); if (frame === to) clearInterval(interval); }, stepTime); return () => clearInterval(interval); }, [hasTriggered, animation]);
  if (animation.separator) return <span ref={ref}>{animation.from}{animation.separator}{current}{animation.suffix || ""}</span>;
  return <span ref={ref}>{animation.prefix || ""}{current}{animation.suffix || ""}</span>;
};

const MetricCard = ({ metric }: { metric: CaseMetric }) => {
  const Icon = metric.icon;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-3.5 py-2.5 transition-all duration-200 ease-out hover:scale-[1.015] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_16px_hsl(174_78%_41%/0.1)]">
      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0"><Icon size={16} /></div>
      <div className="min-w-0"><p className="text-base font-bold text-foreground leading-tight">{metric.animation ? <AnimatedValue animation={metric.animation} fallback={metric.value} /> : metric.value}</p><p className="text-[11px] text-muted-foreground leading-snug">{metric.label}</p></div>
    </div>
  );
};

const SectionHeader = ({ children }: { children: string }) => <p className="text-[11px] font-semibold text-primary mb-1.5 tracking-wide uppercase">{children}</p>;

const BeforeAfterChart = ({ data, lang }: { data: { label: string; before: number; after: number; unit: string }[]; lang: string }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-4">
      {data.map((item) => {
        const maxVal = Math.max(item.before, item.after);
        const beforePct = (item.before / maxVal) * 100;
        const afterPct = (item.after / maxVal) * 100;
        const improved = item.after < item.before;

        return (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[12px] font-medium text-foreground">{item.label}</p>
              <div className="flex items-center gap-1">
                {improved ? <TrendingDown size={11} className="text-primary" /> : <TrendUp size={11} className="text-primary" />}
                <span className="text-[11px] font-semibold text-primary">
                  {improved
                    ? `-${Math.round(((item.before - item.after) / item.before) * 100)}%`
                    : `+${Math.round(((item.after - item.before) / item.before) * 100)}%`
                  }
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground w-10 shrink-0">{lang === "nl" ? "Voor" : "Before"}</span>
                <div className="flex-1 h-5 bg-muted/30 rounded overflow-hidden">
                  <div
                    className="h-full bg-muted-foreground/20 rounded transition-all duration-1000 ease-out flex items-center px-2"
                    style={{ width: inView ? `${beforePct}%` : "0%" }}
                  >
                    <span className="text-[10px] font-mono text-muted-foreground">{item.before}{item.unit}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground w-10 shrink-0">{lang === "nl" ? "Na" : "After"}</span>
                <div className="flex-1 h-5 bg-primary/5 rounded overflow-hidden">
                  <div
                    className="h-full bg-primary/30 rounded transition-all duration-1000 ease-out delay-300 flex items-center px-2"
                    style={{ width: inView ? `${afterPct}%` : "0%" }}
                  >
                    <span className="text-[10px] font-mono text-primary">{item.after}{item.unit}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const BulletList = ({ items, icon }: { items: string[]; icon?: "check" | "dot" }) => (
  <ul className="space-y-1">{items.map((item, i) => <li key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed">{icon === "check" ? <CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" /> : <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-[7px] shrink-0" />}{item}</li>)}</ul>
);

const CaseStudyCard = ({ cs, index }: { cs: CaseStudy; index: number }) => {
  const lang = useLanguage();
  const t = labels[lang];
  const Icon = cs.icon;
  const Visual = cs.visual;
  const navigate = useNavigate();

  return (
    <ScrollReveal><ScrollRevealItem>
      <div id={`case-${index}`} className="rounded-xl border border-border bg-card overflow-hidden scroll-mt-24">
        <div className="p-5 sm:p-6 pb-0 sm:pb-0">
          <div className="flex items-center gap-3 mb-4"><img src="/logo.png" alt="Autronis" className="w-11 h-11 object-contain shrink-0" /><h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">{cs.title}<Icon size={16} className="text-primary/60" /></h2></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">{cs.metrics.map((m, j) => <MetricCard key={j} metric={m} />)}</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-border">
          <div className="p-5 sm:p-6 lg:border-r border-border"><SectionHeader>{t.context}</SectionHeader><p className="text-[13px] text-muted-foreground leading-relaxed">{cs.context}</p></div>
          <div className="p-5 sm:p-6 border-t lg:border-t-0 border-border"><SectionHeader>{t.problem}</SectionHeader><BulletList items={cs.problem} /></div>
        </div>
        <div className="border-t border-border p-5 sm:p-6">
          <SectionHeader>{t.solution}</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">{cs.solution.map((item, i) => <div key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-[7px] shrink-0" />{item}</div>)}</div>
        </div>
        <div className="border-t border-border p-5 sm:p-6">
          <SectionHeader>{t.systemOverview}</SectionHeader>
          {cs.videoUrl ? <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{t.videoDesc}</p> : <div className="mb-3 flex items-center gap-1.5 text-[12px] text-muted-foreground leading-relaxed italic"><AlertTriangle size={12} className="text-primary shrink-0" /><span>{t.simplified}</span></div>}
          <div className="max-w-2xl mx-auto">
            {cs.videoUrl ? <video src={cs.videoUrl} className="w-full aspect-video rounded-lg" controls controlsList="nodownload noplaybackrate" disablePictureInPicture /> : <Visual />}
          </div>
        </div>
        <div className="border-t border-border p-5 sm:p-6 space-y-5">
            <div>
              <SectionHeader>{t.resultsImpact}</SectionHeader>
              {cs.beforeAfter && <div className="mb-4"><BeforeAfterChart data={cs.beforeAfter} lang={lang} /></div>}
              <div className="space-y-1.5">{cs.results.map((r, j) => <div key={j} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed"><CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" />{r}</div>)}</div>
            </div>
            <div><SectionHeader>{t.technology}</SectionHeader><TechTagList tags={cs.technologyTags} /></div>
            {cs.testimonial && (
              <div className="rounded-lg border border-primary/15 bg-primary/[0.03] p-5 space-y-3.5 transition-all duration-200 ease-out hover:scale-[1.015] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_16px_hsl(174_78%_41%/0.1)]">
                <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, s) => <Star key={s} size={14} className="text-primary fill-primary" />)}</div>
                <p className="text-[13px] text-foreground/80 leading-[1.7] italic">"{cs.testimonial.quote}"</p>
                <div className="flex items-center gap-3 pt-0.5">
                  {cs.testimonial.logo ? <img src={cs.testimonial.logo} alt={cs.testimonial.company} className="h-8 object-contain shrink-0" /> : <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><UserCircle size={20} className="text-primary/70" /></div>}
                  <div className="min-w-0"><p className="text-[13px] font-bold text-foreground leading-tight">{cs.testimonial.name}</p><p className="text-[11px] text-muted-foreground leading-tight">{cs.testimonial.role} — {cs.testimonial.company}</p>{cs.testimonial.website && <a href={cs.testimonial.website} target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary/70 hover:text-primary transition-colors duration-200">{cs.testimonial.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>}</div>
                </div>
                <div className="mt-4"><Button size="sm" variant="outline" className="w-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300" onClick={() => { navigate('/'); setTimeout(() => { const heroSection = document.querySelector('.hero-section'); if (heroSection) { heroSection.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => { const demoBtn = heroSection.querySelector('button[class*="outline"]') as HTMLButtonElement; if (demoBtn) demoBtn.click(); }, 600); } }, 300); }}><Play size={14} />{t.watchDemo}</Button></div>
              </div>
            )}
            {cs.implementationResult && <div className="rounded-lg border border-primary/15 bg-primary/[0.03] p-5 space-y-3 transition-all duration-200 ease-out hover:scale-[1.015] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_16px_hsl(174_78%_41%/0.1)]"><SectionHeader>{t.anonCase}</SectionHeader><p className="text-[13px] text-foreground/80 leading-[1.7] italic">"{cs.implementationResult}"</p></div>}
        </div>
        {/* Workflow screenshot — bottom of card */}
        {cs.workflowImage && (
          <div className="border-t border-border p-5 sm:p-6">
            <SectionHeader>{lang === "nl" ? "Gebouwde workflow" : "Built workflow"}</SectionHeader>
            <p className="text-[11px] text-muted-foreground mb-3">{cs.workflowImage.caption}</p>
            <div className="rounded-lg border border-border overflow-hidden">
              <img src={cs.workflowImage.src} alt={cs.workflowImage.caption} className="w-full object-cover" loading="lazy" />
            </div>
          </div>
        )}
      </div>
    </ScrollRevealItem></ScrollReveal>
  );
};

export default CaseStudyCard;
