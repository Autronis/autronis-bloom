import { useRef, useState, useEffect } from "react";
import {
  Sparkles, Brain, Link2, Plug, Database, GitBranch, BarChart3,
} from "lucide-react";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";

/* ── Category definitions ── */
export type TagCategory = "ai" | "integrations" | "data" | "automation" | "analytics";

export interface TechTagData {
  label: string;
  category: TagCategory;
  tooltip: string;
}

const categoryConfig: Record<TagCategory, {
  icon: React.ElementType;
  border: string;
  bg: string;
  text: string;
  glow: string;
}> = {
  ai: {
    icon: Sparkles,
    border: "border-[hsl(174_60%_45%/0.35)]",
    bg: "bg-[hsl(174_60%_45%/0.08)]",
    text: "text-[hsl(174_60%_65%)]",
    glow: "hover:border-[hsl(174_60%_45%/0.55)] hover:shadow-[0_0_10px_hsl(174_60%_45%/0.12)]",
  },
  integrations: {
    icon: Plug,
    border: "border-[hsl(210_55%_50%/0.35)]",
    bg: "bg-[hsl(210_55%_50%/0.08)]",
    text: "text-[hsl(210_55%_70%)]",
    glow: "hover:border-[hsl(210_55%_50%/0.55)] hover:shadow-[0_0_10px_hsl(210_55%_50%/0.12)]",
  },
  data: {
    icon: Database,
    border: "border-[hsl(150_45%_45%/0.35)]",
    bg: "bg-[hsl(150_45%_45%/0.08)]",
    text: "text-[hsl(150_45%_65%)]",
    glow: "hover:border-[hsl(150_45%_45%/0.55)] hover:shadow-[0_0_10px_hsl(150_45%_45%/0.12)]",
  },
  automation: {
    icon: GitBranch,
    border: "border-[hsl(260_45%_55%/0.35)]",
    bg: "bg-[hsl(260_45%_55%/0.08)]",
    text: "text-[hsl(260_45%_72%)]",
    glow: "hover:border-[hsl(260_45%_55%/0.55)] hover:shadow-[0_0_10px_hsl(260_45%_55%/0.12)]",
  },
  analytics: {
    icon: BarChart3,
    border: "border-[hsl(188_50%_48%/0.35)]",
    bg: "bg-[hsl(188_50%_48%/0.08)]",
    text: "text-[hsl(188_50%_68%)]",
    glow: "hover:border-[hsl(188_50%_48%/0.55)] hover:shadow-[0_0_10px_hsl(188_50%_48%/0.12)]",
  },
};

/* ── Single Tag ── */
const TechTag = ({ tag, index }: { tag: TechTagData; index: number }) => {
  const cfg = categoryConfig[tag.category];
  const Icon = cfg.icon;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={ref}
            tabIndex={0}
            className={`
              tech-tag inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 cursor-default select-none
              text-[11px] font-medium leading-none
              ${cfg.border} ${cfg.bg} ${cfg.text}
              transition-all duration-200 ease-out
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background
              motion-reduce:transition-none
            `}
            data-glow={tag.category}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 300ms ease-out ${index * 50}ms, transform 300ms ease-out ${index * 50}ms`,
            }}
          >
            <Icon size={13} strokeWidth={2} className="shrink-0" />
            {tag.label}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          sideOffset={6}
          className="tech-tooltip max-w-[240px] rounded-lg border border-primary/20 bg-card px-3 py-2.5 shadow-lg shadow-black/20 text-[12px] leading-relaxed text-muted-foreground animate-in fade-in-0 zoom-in-[0.98] duration-150"
        >
          {tag.tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

/* ── Tag List ── */
export const TechTagList = ({ tags }: { tags: TechTagData[] }) => (
  <div className="flex flex-wrap gap-1.5">
    {tags.map((tag, i) => (
      <TechTag key={tag.label} tag={tag} index={i} />
    ))}
  </div>
);

export default TechTag;
