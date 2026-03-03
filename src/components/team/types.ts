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
    border: "border-[hsla(210,55%,50%,0.55)]",
    bg: "bg-[hsla(210,55%,50%,0.2)]",
    glow: "hover:bg-[hsla(210,55%,50%,0.3)] hover:shadow-[0_0_8px_hsla(210,55%,50%,0.22)]",
  },
  ai: {
    border: "border-[hsla(174,55%,42%,0.55)]",
    bg: "bg-[hsla(174,55%,42%,0.2)]",
    glow: "hover:bg-[hsla(174,55%,42%,0.3)] hover:shadow-[0_0_8px_hsla(174,55%,42%,0.22)]",
  },
  gov: {
    border: "border-[hsla(270,35%,55%,0.5)]",
    bg: "bg-[hsla(270,35%,55%,0.17)]",
    glow: "hover:bg-[hsla(270,35%,55%,0.27)] hover:shadow-[0_0_8px_hsla(270,35%,55%,0.2)]",
  },
};

export const categoryLabels: Record<SkillCategory, string> = {
  arch: "Architectuur",
  ai: "AI & Integraties",
  gov: "Beheer & Beveiliging",
};
