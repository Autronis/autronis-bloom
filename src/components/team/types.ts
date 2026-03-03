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
    border: "border-[hsla(210,55%,45%,0.6)]",
    bg: "bg-[hsla(210,55%,45%,0.22)]",
    glow: "hover:bg-[hsla(210,55%,45%,0.32)] hover:shadow-[0_0_8px_hsla(210,55%,45%,0.25)]",
  },
  ai: {
    border: "border-[hsla(174,55%,38%,0.6)]",
    bg: "bg-[hsla(174,55%,38%,0.22)]",
    glow: "hover:bg-[hsla(174,55%,38%,0.32)] hover:shadow-[0_0_8px_hsla(174,55%,38%,0.25)]",
  },
  gov: {
    border: "border-[hsla(270,35%,50%,0.55)]",
    bg: "bg-[hsla(270,35%,50%,0.18)]",
    glow: "hover:bg-[hsla(270,35%,50%,0.28)] hover:shadow-[0_0_8px_hsla(270,35%,50%,0.22)]",
  },
};

export const categoryLabels: Record<SkillCategory, string> = {
  arch: "Architectuur",
  ai: "AI & Integraties",
  gov: "Beheer & Beveiliging",
};
