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
  focusLabel: string;
  description: string;
  skills: Skill[];
  mail: string;
  linkedin: string;
}

export const categoryMeta: Record<SkillCategory, { border: string; bg: string; glow: string }> = {
  arch: {
    border: "border-[hsla(210,45%,55%,0.5)]",
    bg: "bg-[hsla(210,40%,30%,0.75)]",
    glow: "hover:bg-[hsla(210,40%,35%,0.8)]",
  },
  ai: {
    border: "border-[hsla(174,45%,45%,0.5)]",
    bg: "bg-[hsla(174,40%,25%,0.75)]",
    glow: "hover:bg-[hsla(174,40%,30%,0.8)]",
  },
  gov: {
    border: "border-[hsla(270,30%,55%,0.5)]",
    bg: "bg-[hsla(270,25%,30%,0.70)]",
    glow: "hover:bg-[hsla(270,25%,35%,0.75)]",
  },
};

export const categoryLabels: Record<SkillCategory, string> = {
  arch: "Architectuur",
  ai: "AI & Integraties",
  gov: "Beheer & Beveiliging",
};
