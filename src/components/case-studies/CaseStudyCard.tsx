import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import type { CaseStudy, CaseMetric } from "./caseStudiesData";

/* ─── Metric Card ─── */
const MetricCard = ({ metric }: { metric: CaseMetric }) => {
  const Icon = metric.icon;
  return (
    <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
      <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
        <Icon size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold text-foreground leading-tight">{metric.value}</p>
        <p className="text-xs text-muted-foreground leading-snug">{metric.label}</p>
      </div>
    </div>
  );
};

/* ─── Section Header ─── */
const SectionHeader = ({ children }: { children: string }) => (
  <p className="text-xs font-semibold text-primary mb-2 tracking-wide uppercase">{children}</p>
);

/* ─── Bullet List ─── */
const BulletList = ({ items, icon }: { items: string[]; icon?: "check" | "dot" }) => (
  <ul className="space-y-1.5">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
        {icon === "check" ? (
          <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
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
          <div className="p-6 sm:p-8 pb-0 sm:pb-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Icon size={20} />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">{cs.title}</h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {cs.metrics.map((m, j) => (
                <MetricCard key={j} metric={m} />
              ))}
            </div>
          </div>

          {/* ── Context + Problem ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-border">
            <div className="p-6 sm:p-8 lg:border-r border-border">
              <SectionHeader>Context</SectionHeader>
              <p className="text-sm text-muted-foreground leading-relaxed">{cs.context}</p>
            </div>
            <div className="p-6 sm:p-8 border-t lg:border-t-0 border-border">
              <SectionHeader>Probleem</SectionHeader>
              <BulletList items={cs.problem} />
            </div>
          </div>

          {/* ── Solution ── */}
          <div className="border-t border-border p-6 sm:p-8">
            <SectionHeader>Oplossing</SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {cs.solution.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* ── System Overview Visual ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 border-t border-border">
            <div className={`lg:col-span-3 min-h-[280px] flex items-center justify-center p-4 sm:p-6 ${isEven ? '' : 'lg:order-2'}`}>
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
            <div className={`lg:col-span-2 border-t lg:border-t-0 ${isEven ? 'lg:border-l' : 'lg:border-r lg:order-1'} border-border p-6 sm:p-8`}>
              <SectionHeader>Systeemoverzicht</SectionHeader>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {cs.videoUrl
                  ? "Bekijk de video om te zien hoe het automatiseringssysteem werkt — van leadbronnen tot CRM-synchronisatie."
                  : "Het diagram toont de volledige automatiseringspipeline — van databronnen tot output."}
              </p>
              <SectionHeader>Technologie</SectionHeader>
              <div className="flex flex-wrap gap-1.5">
                {cs.technology.map((t, j) => (
                  <Badge key={j} variant="secondary" className="text-xs font-medium">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="border-t border-border p-6 sm:p-8">
            <SectionHeader>Resultaat & Impact</SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
              {cs.results.map((r, j) => (
                <div key={j} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollRevealItem>
    </ScrollReveal>
  );
};

export default CaseStudyCard;
