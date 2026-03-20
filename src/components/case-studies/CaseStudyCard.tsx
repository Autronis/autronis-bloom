import { CheckCircle2, AlertTriangle, Star, UserCircle, ArrowRight, Play, TrendingDown, TrendingUp as TrendUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
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

const MetricCard = ({ metric, index }: { metric: CaseMetric; index: number }) => {
  const Icon = metric.icon;
  const isPositive = metric.change && !metric.change.startsWith("-");
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] to-primary/[0.02] px-3 py-3 sm:px-4 sm:py-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/15 flex items-center justify-center text-primary shrink-0">
          <Icon size={16} strokeWidth={2.5} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="text-base sm:text-lg font-extrabold text-foreground leading-tight tracking-tight">
              {metric.animation ? <AnimatedValue animation={metric.animation} fallback={metric.value} /> : metric.value}
            </p>
            {metric.change && (
              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-tight ${isPositive ? "bg-emerald-500/15 text-emerald-400" : "bg-primary/15 text-primary"}`}>
                {isPositive && <TrendUp size={9} />}
                {metric.change}
              </span>
            )}
          </div>
          <p className="text-[10px] sm:text-[11px] text-muted-foreground/80 leading-snug mt-0.5 font-medium">{metric.label}</p>
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ children }: { children: string }) => (
  <p className="text-[11px] font-semibold text-primary mb-1.5 tracking-wide uppercase">{children}</p>
);

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
    <div ref={ref} className="space-y-5">
      {data.map((item, i) => {
        const maxVal = Math.max(item.before, item.after);
        const beforePct = (item.before / maxVal) * 100;
        const afterPct = (item.after / maxVal) * 100;
        const improved = item.after < item.before;
        const changePct = improved
          ? Math.round(((item.before - item.after) / item.before) * 100)
          : Math.round(((item.after - item.before) / item.before) * 100);

        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-bold text-foreground">{item.label}</p>
              <motion.div
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.5, type: "spring", stiffness: 300 }}
              >
                {improved ? <TrendingDown size={13} className="text-emerald-400" /> : <TrendUp size={13} className="text-emerald-400" />}
                <span className="text-[12px] font-extrabold text-emerald-400">
                  {improved ? `-${changePct}%` : `+${changePct}%`}
                </span>
              </motion.div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-semibold text-muted-foreground/70 w-10 shrink-0 uppercase tracking-wide">{lang === "nl" ? "Voor" : "Before"}</span>
                <div className="flex-1 h-7 bg-rose-500/[0.04] rounded-md overflow-hidden border border-rose-400/8">
                  <div
                    className="h-full bg-gradient-to-r from-rose-400/20 to-rose-400/8 rounded-md flex items-center px-2.5 transition-all duration-1000 ease-out"
                    style={{ width: inView ? `${Math.max(beforePct, 12)}%` : "0%" }}
                  >
                    <span className="text-[11px] font-bold font-mono text-rose-300/80">{item.before}{item.unit}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-semibold text-muted-foreground/70 w-10 shrink-0 uppercase tracking-wide">{lang === "nl" ? "Na" : "After"}</span>
                <div className="flex-1 h-7 bg-emerald-500/[0.06] rounded-md overflow-hidden border border-emerald-500/10">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500/40 to-emerald-400/20 rounded-md flex items-center px-2.5 transition-all duration-1000 ease-out delay-300 relative"
                    style={{ width: inView ? `${Math.max(afterPct, 12)}%` : "0%", boxShadow: inView ? "0 0 12px rgba(16, 185, 129, 0.15)" : "none" }}
                  >
                    <span className="text-[11px] font-bold font-mono text-emerald-400">{item.after}{item.unit}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const AnimatedStars = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, s) => (
        <span
          key={s}
          className="inline-block transition-all duration-300"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0)",
            transitionDelay: visible ? `${s * 100 + 300}ms` : "0ms",
          }}
        >
          <Star size={14} className="text-primary fill-primary" />
        </span>
      ))}
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
      <div id={`case-${index}`} className="rounded-xl border border-border bg-gradient-to-br from-primary/[0.06] to-card overflow-hidden scroll-mt-24">
        <div className="p-5 sm:p-6 pb-0 sm:pb-0">
          <div className="flex items-center gap-3 mb-4"><img src="/logo.png" alt="Autronis" className="w-11 h-11 object-contain shrink-0" /><h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">{cs.title}<Icon size={16} className="text-primary/60" /></h2></div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 mb-5">{cs.metrics.map((m, j) => (
              <MetricCard key={j} metric={m} index={j} />
          ))}</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-border">
          <div className="p-5 sm:p-6 lg:border-r border-border"><SectionHeader>{t.context}</SectionHeader><p className="text-[13px] text-muted-foreground leading-relaxed">{cs.context}</p></div>
          <div className="p-5 sm:p-6 border-t lg:border-t-0 border-border"><SectionHeader>{t.problem}</SectionHeader><BulletList items={cs.problem} /></div>
        </div>
        <div className="border-t border-border p-5 sm:p-6">
          <SectionHeader>{t.solution}</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">{cs.solution.map((item, i) => <div key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed"><span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-[7px] shrink-0" />{item}</div>)}</div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-border">
          <div className="p-5 sm:p-6 lg:border-r border-border">
            <SectionHeader>{t.systemOverview}</SectionHeader>
            {cs.videoUrl ? <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">{t.videoDesc}</p> : <div className="mb-3 flex items-center gap-1.5 text-[12px] text-muted-foreground leading-relaxed italic"><AlertTriangle size={12} className="text-primary shrink-0" /><span>{t.simplified}</span></div>}
            {cs.videoUrl ? <video src={cs.videoUrl} className="w-full aspect-video rounded-lg" controls controlsList="nodownload noplaybackrate" disablePictureInPicture /> : <Visual />}
            <div className="mt-5 pt-4 border-t border-border/50"><SectionHeader>{t.technology}</SectionHeader><TechTagList tags={cs.technologyTags} /></div>
          </div>
          <div className="border-t lg:border-t-0 border-border p-5 sm:p-6 space-y-5">
            <div>
              <SectionHeader>{t.resultsImpact}</SectionHeader>
              {cs.beforeAfter && <div className="mb-4"><BeforeAfterChart data={cs.beforeAfter} lang={lang} /></div>}
              <div className="space-y-1.5">{cs.results.map((r, j) => (
                <div key={j} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed">
                  <CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" />{r}
                </div>
              ))}</div>
            </div>
            {cs.testimonial && (
              <div className="rounded-lg border border-primary/15 bg-primary/[0.03] p-4 sm:p-5 space-y-3.5">
                <AnimatedStars />
                <p className="text-[13px] text-foreground/80 leading-[1.7] italic">"{cs.testimonial.quote}"</p>
                <div className="flex items-center gap-3 pt-0.5">
                  {cs.testimonial.logo ? <img src={cs.testimonial.logo} alt={cs.testimonial.company} className="h-8 object-contain shrink-0" /> : <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><UserCircle size={20} className="text-primary/70" /></div>}
                  <div className="min-w-0"><p className="text-[13px] font-bold text-foreground leading-tight">{cs.testimonial.name}</p><p className="text-[11px] text-muted-foreground leading-tight">{cs.testimonial.role} — {cs.testimonial.company}</p>{cs.testimonial.website && <a href={cs.testimonial.website} target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary/70 hover:text-primary transition-colors duration-200">{cs.testimonial.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</a>}</div>
                </div>
                <div className="mt-4"><Button size="sm" variant="outline" className="w-full border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300" onClick={() => { navigate('/'); setTimeout(() => { const heroSection = document.querySelector('.hero-section'); if (heroSection) { heroSection.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => { const demoBtn = heroSection.querySelector('button[class*="outline"]') as HTMLButtonElement; if (demoBtn) demoBtn.click(); }, 600); } }, 300); }}><Play size={14} />{t.watchDemo}</Button></div>
              </div>
            )}
            {cs.implementationResult && <div className="rounded-lg border border-primary/15 bg-primary/[0.03] p-4 sm:p-5 space-y-3"><SectionHeader>{t.anonCase}</SectionHeader><p className="text-[13px] text-foreground/80 leading-[1.7] italic">"{cs.implementationResult}"</p></div>}
          </div>
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
