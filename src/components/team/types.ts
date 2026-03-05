import type { ElementType } from "react";
import { Wrench, Cog, BarChart3, TrendingUp, Bot, Brain, MessageCircle, BookOpen, Globe, Search, Radio, Database, Puzzle, FolderOpen, FileBarChart, Zap } from "lucide-react";

export type SkillCategory = "automation" | "ai" | "data" | "operations" | "infrastructure" | "integrations";

export interface Skill {
  label: string;
  icon: ElementType;
  category: SkillCategory;
}

export interface TeamMember {
  name: string;
  role: string;
  subtitle: string;
  photo: string;
  priority?: boolean;
  focusLabel: string;
  description: string;
  skills: Skill[];
  mail: string;
  linkedin: string;
  /** Override default category labels per member */
  customCategoryLabels?: Partial<Record<SkillCategory, string>>;
}

export const categoryMeta: Record<SkillCategory, {
  border: string;
  bg: string;
  text: string;
  glow: string;
  overlayBorder: string;
  overlayBg: string;
}> = {
  automation: {
    border: "border-[hsl(210_55%_50%/0.35)]",
    bg: "bg-[hsl(210_55%_50%/0.12)] dark:bg-[hsl(210_55%_50%/0.08)]",
    text: "text-[hsl(210_55%_35%)] dark:text-[hsl(210_55%_70%)]",
    glow: "hover:border-[hsl(210_55%_50%/0.55)] hover:shadow-[0_0_10px_hsl(210_55%_50%/0.12)]",
    overlayBorder: "border-[hsla(210,45%,55%,0.55)]",
    overlayBg: "bg-[hsla(210,40%,28%,0.92)]",
  },
  ai: {
    border: "border-[hsl(150_45%_45%/0.35)]",
    bg: "bg-[hsl(150_45%_45%/0.12)] dark:bg-[hsl(150_45%_45%/0.08)]",
    text: "text-[hsl(150_45%_28%)] dark:text-[hsl(150_45%_65%)]",
    glow: "hover:border-[hsl(150_45%_45%/0.55)] hover:shadow-[0_0_10px_hsl(150_45%_45%/0.12)]",
    overlayBorder: "border-[hsla(150,45%,45%,0.55)]",
    overlayBg: "bg-[hsla(150,40%,23%,0.92)]",
  },
  data: {
    border: "border-[hsl(174_60%_45%/0.35)]",
    bg: "bg-[hsl(174_60%_45%/0.12)] dark:bg-[hsl(174_60%_45%/0.08)]",
    text: "text-[hsl(174_60%_30%)] dark:text-[hsl(174_60%_65%)]",
    glow: "hover:border-[hsl(174_60%_45%/0.55)] hover:shadow-[0_0_10px_hsl(174_60%_45%/0.12)]",
    overlayBorder: "border-[hsla(174,45%,45%,0.55)]",
    overlayBg: "bg-[hsla(174,40%,23%,0.92)]",
  },
  operations: {
    border: "border-[hsl(260_45%_55%/0.35)]",
    bg: "bg-[hsl(260_45%_55%/0.12)] dark:bg-[hsl(260_45%_55%/0.08)]",
    text: "text-[hsl(260_45%_40%)] dark:text-[hsl(260_45%_72%)]",
    glow: "hover:border-[hsl(260_45%_55%/0.55)] hover:shadow-[0_0_10px_hsl(260_45%_55%/0.12)]",
    overlayBorder: "border-[hsla(270,30%,55%,0.55)]",
    overlayBg: "bg-[hsla(270,25%,28%,0.90)]",
  },
};

export const categoryLabels: Record<SkillCategory, string> = {
  automation: "Automation & Systems",
  ai: "AI & Intelligence",
  data: "Data & Infrastructure",
  operations: "Operations",
};

// Icon mapping for skills
export const skillIcons = {
  "Workflow automation": Wrench,
  "System integrations": Cog,
  "Dashboard automation": BarChart3,
  "Data pipelines": TrendingUp,
  "AI automation": Bot,
  "LLM integrations": Brain,
  "AI chatbots": MessageCircle,
  "Knowledge base systems": BookOpen,
  "Web scraping": Globe,
  "Lead scraping": Search,
  "API integrations": Radio,
  "Data enrichment": Database,
  "Process automation": Puzzle,
  "CRM integrations": FolderOpen,
  "Reporting automation": FileBarChart,
  "Growth automation": Zap,
} as const;
