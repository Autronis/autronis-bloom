import { CheckCircle2, AlertTriangle, Star } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { TechTagList } from "@/components/case-studies/TechTag";
import type { CaseStudy, CaseMetric, MetricAnimation } from "./caseStudiesData";

/* ─── Animated Value ─── */
const AnimatedValue = ({ animation, fallback }: { animation: MetricAnimation; fallback: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [current, setCurrent] = useState(animation.from);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !hasTriggered) setHasTriggered(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;
    const { from, to } = animation;
    const duration = 1200;
    const steps = Math.abs(to - from);
    const stepTime = Math.max(duration / steps, 16);
    let frame = from;

    const interval = setInterval(() => {
      frame += from < to ? 1 : -1;
      setCurrent(frame);
      if (frame === to) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [hasTriggered, animation]);

  if (animation.separator) {
    // "from → to suffix" format — animate the 'to' part, show from as static
    return (
      <span ref={ref}>
        {animation.from}{animation.separator}{current}{animation.suffix || ""}
      </span>
    );
  }

  return (
    <span ref={ref}>
      {animation.prefix || ""}{current}{animation.suffix || ""}
    </span>
  );
};

/* ─── Metric Card ─── */
const MetricCard = ({ metric }: { metric: CaseMetric }) => {
  const Icon = metric.icon;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-3.5 py-2.5 transition-all duration-200 ease-out hover:scale-[1.015] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_16px_hsl(174_78%_41%/0.1)]">
      <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-base font-bold text-foreground leading-tight">
          {metric.animation ? (
            <AnimatedValue animation={metric.animation} fallback={metric.value} />
          ) : (
            metric.value
          )}
        </p>
        <p className="text-[11px] text-muted-foreground leading-snug">{metric.label}</p>
      </div>
    </div>
  );
};

/* ─── Section Header ─── */
const SectionHeader = ({ children }: { children: string }) => (
  <p className="text-[11px] font-semibold text-primary mb-1.5 tracking-wide uppercase">{children}</p>
);

/* ─── Bullet List ─── */
const BulletList = ({ items, icon }: { items: string[]; icon?: "check" | "dot" }) => (
  <ul className="space-y-1">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed">
        {icon === "check" ? (
          <CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-[7px] shrink-0" />
        )}
        {item}
      </li>
    ))}
  </ul>
);

/* ─── Case Study Card ─── */
const CaseStudyCard = ({ cs, index }: { cs: CaseStudy; index: number }) => {
  const Icon = cs.icon;
  const Visual = cs.visual;
  const isEven = index % 2 === 0;

  return (
    <ScrollReveal>
      <ScrollRevealItem>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* ── Header + Metrics ── */}
          <div className="p-5 sm:p-6 pb-0 sm:pb-0">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Autronis" className="w-11 h-11 object-contain shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                {cs.title}
                <Icon size={16} className="text-primary/60" />
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-5">
              {cs.metrics.map((m, j) => (
                <MetricCard key={j} metric={m} />
              ))}
            </div>
          </div>

          {/* ── Context + Problem ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-border">
            <div className="p-5 sm:p-6 lg:border-r border-border">
              <SectionHeader>Context</SectionHeader>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{cs.context}</p>
            </div>
            <div className="p-5 sm:p-6 border-t lg:border-t-0 border-border">
              <SectionHeader>Probleem</SectionHeader>
              <BulletList items={cs.problem} />
            </div>
          </div>

          {/* ── Solution ── */}
          <div className="border-t border-border p-5 sm:p-6">
            <SectionHeader>Oplossing</SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
              {cs.solution.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-[7px] shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ── System Overview (diagram left, info right) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 border-t border-border">
            {/* Diagram with label above */}
            <div className={`lg:col-span-3 p-4 sm:p-5 ${isEven ? '' : 'lg:order-2'}`}>
              <SectionHeader>Systeemoverzicht</SectionHeader>
              {cs.videoUrl ? (
                <p className="text-[12px] text-muted-foreground leading-relaxed mb-3">
                  Bekijk de video om te zien hoe het automatiseringssysteem werkt.
                </p>
              ) : (
                <div className="mb-3 flex items-center gap-1.5 text-[12px] text-muted-foreground leading-relaxed italic">
                  <AlertTriangle size={12} className="text-primary shrink-0" />
                  <span>Vereenvoudigde weergave van de automatiseringspipeline.</span>
                </div>
              )}
              {cs.videoUrl ? (
                <video
                  src={cs.videoUrl}
                  className="w-full aspect-video rounded-lg"
                  controls
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                />
              ) : (
                <Visual />
              )}
            </div>

            {/* Info: results, technology, testimonial */}
            <div className={`lg:col-span-2 border-t lg:border-t-0 ${isEven ? 'lg:border-l' : 'lg:border-r lg:order-1'} border-border p-5 sm:p-6 space-y-4`}>
              <div>
                <SectionHeader>Resultaat & Impact</SectionHeader>
                <div className="space-y-1.5">
                  {cs.results.map((r, j) => (
                    <div key={j} className="flex items-start gap-2 text-[13px] text-muted-foreground leading-relaxed">
                      <CheckCircle2 size={13} className="text-primary mt-0.5 shrink-0" />
                      {r}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionHeader>Technologie</SectionHeader>
                <TechTagList tags={cs.technologyTags} />
              </div>

              {cs.testimonial && (
                <div className="rounded-lg border border-primary/15 bg-primary/[0.03] p-5 space-y-3.5 transition-all duration-200 ease-out hover:scale-[1.015] hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_0_16px_hsl(174_78%_41%/0.1)]">
                  {/* 5-star rating */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} className="text-primary fill-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[13px] text-foreground/80 leading-[1.7] italic">
                    "{cs.testimonial.quote}"
                  </p>

                  {/* Author row */}
                  <div className="flex items-center gap-3 pt-0.5">
                    {cs.testimonial.logo && (
                      <img
                        src={cs.testimonial.logo}
                        alt={cs.testimonial.company}
                        className="h-8 object-contain shrink-0"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="text-[13px] font-bold text-foreground leading-tight">{cs.testimonial.name}</p>
                      <p className="text-[11px] text-muted-foreground leading-tight">{cs.testimonial.role} — {cs.testimonial.company}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollRevealItem>
    </ScrollReveal>
  );
};

export default CaseStudyCard;
