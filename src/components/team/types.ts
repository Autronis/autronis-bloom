export type SkillCategory = "arch" | "ai" | "gov";

export interface Skill {
  label: string;
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
}

export const categoryMeta: Record<SkillCategory, { border: string; bg: string; glow: string }> = {
  arch: {
    border: "border-[hsla(210,45%,55%,0.55)]",
    bg: "bg-[hsla(210,40%,28%,0.92)]",
    glow: "hover:bg-[hsla(210,40%,32%,0.95)]",
  },
  ai: {
    border: "border-[hsla(174,45%,45%,0.55)]",
    bg: "bg-[hsla(174,40%,23%,0.92)]",
    glow: "hover:bg-[hsla(174,40%,27%,0.95)]",
  },
  gov: {
    border: "border-[hsla(270,30%,55%,0.55)]",
    bg: "bg-[hsla(270,25%,28%,0.90)]",
    glow: "hover:bg-[hsla(270,25%,32%,0.93)]",
  },
};

export const categoryLabels: Record<SkillCategory, string> = {
  arch: "Architectuur",
  ai: "AI & Integraties",
  gov: "Beheer & Beveiliging",
};
