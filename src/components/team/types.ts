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
    border: "border-[hsl(260_45%_55%/0.35)]",
    bg: "bg-[hsl(260_45%_55%/0.12)] dark:bg-[hsl(260_45%_55%/0.08)]",
    text: "text-[hsl(260_45%_40%)] dark:text-[hsl(260_45%_72%)]",
    glow: "hover:border-[hsl(260_45%_55%/0.55)] hover:shadow-[0_0_10px_hsl(260_45%_55%/0.12)]",
    overlayBorder: "border-[hsla(260,35%,55%,0.55)]",
    overlayBg: "bg-[hsla(260,30%,28%,0.92)]",
  },
  ai: {
    border: "border-[hsl(174_60%_45%/0.35)]",
    bg: "bg-[hsl(174_60%_45%/0.12)] dark:bg-[hsl(174_60%_45%/0.08)]",
    text: "text-[hsl(174_60%_30%)] dark:text-[hsl(174_60%_65%)]",
    glow: "hover:border-[hsl(174_60%_45%/0.55)] hover:shadow-[0_0_10px_hsl(174_60%_45%/0.12)]",
    overlayBorder: "border-[hsla(174,45%,45%,0.55)]",
    overlayBg: "bg-[hsla(174,40%,23%,0.92)]",
  },
  data: {
    border: "border-[hsl(45_60%_45%/0.35)]",
    bg: "bg-[hsl(45_60%_45%/0.12)] dark:bg-[hsl(45_60%_45%/0.08)]",
    text: "text-[hsl(45_60%_30%)] dark:text-[hsl(45_60%_65%)]",
    glow: "hover:border-[hsl(45_60%_45%/0.55)] hover:shadow-[0_0_10px_hsl(45_60%_45%/0.12)]",
    overlayBorder: "border-[hsla(45,50%,45%,0.55)]",
    overlayBg: "bg-[hsla(45,40%,22%,0.92)]",
  },
  operations: {
    border: "border-[hsl(188_50%_48%/0.35)]",
    bg: "bg-[hsl(188_50%_48%/0.12)] dark:bg-[hsl(188_50%_48%/0.08)]",
    text: "text-[hsl(188_50%_32%)] dark:text-[hsl(188_50%_68%)]",
    glow: "hover:border-[hsl(188_50%_48%/0.55)] hover:shadow-[0_0_10px_hsl(188_50%_48%/0.12)]",
    overlayBorder: "border-[hsla(188,40%,48%,0.55)]",
    overlayBg: "bg-[hsla(188,35%,25%,0.92)]",
  },
  infrastructure: {
    border: "border-[hsl(45_60%_45%/0.35)]",
    bg: "bg-[hsl(45_60%_45%/0.12)] dark:bg-[hsl(45_60%_45%/0.08)]",
    text: "text-[hsl(45_60%_30%)] dark:text-[hsl(45_60%_65%)]",
    glow: "hover:border-[hsl(45_60%_45%/0.55)] hover:shadow-[0_0_10px_hsl(45_60%_45%/0.12)]",
    overlayBorder: "border-[hsla(45,50%,45%,0.55)]",
    overlayBg: "bg-[hsla(45,40%,22%,0.92)]",
  },
  integrations: {
    border: "border-[hsl(210_55%_50%/0.35)]",
    bg: "bg-[hsl(210_55%_50%/0.12)] dark:bg-[hsl(210_55%_50%/0.08)]",
    text: "text-[hsl(210_55%_35%)] dark:text-[hsl(210_55%_70%)]",
    glow: "hover:border-[hsl(210_55%_50%/0.55)] hover:shadow-[0_0_10px_hsl(210_55%_50%/0.12)]",
    overlayBorder: "border-[hsla(210,45%,50%,0.55)]",
    overlayBg: "bg-[hsla(210,40%,28%,0.92)]",
  },
};

export const categoryLabels: Record<SkillCategory, string> = {
  automation: "Automation & Systems",
  ai: "AI & Intelligence",
  data: "Data & Scraping",
  operations: "Operations",
  infrastructure: "Data Infrastructure",
  integrations: "Integrations",
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
