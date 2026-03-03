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
    border: "border-[hsla(205,45%,55%,0.5)]",
    bg: "bg-[hsla(205,45%,55%,0.15)]",
    glow: "hover:bg-[hsla(205,45%,55%,0.25)] hover:shadow-[0_0_8px_hsla(205,45%,55%,0.2)]",
  },
  ai: {
    border: "border-[hsla(174,50%,45%,0.5)]",
    bg: "bg-[hsla(174,50%,45%,0.15)]",
    glow: "hover:bg-[hsla(174,50%,45%,0.25)] hover:shadow-[0_0_8px_hsla(174,50%,45%,0.2)]",
  },
  gov: {
    border: "border-[hsla(265,30%,60%,0.45)]",
    bg: "bg-[hsla(265,30%,60%,0.13)]",
    glow: "hover:bg-[hsla(265,30%,60%,0.22)] hover:shadow-[0_0_8px_hsla(265,30%,60%,0.18)]",
  },
};

export const categoryLabels: Record<SkillCategory, string> = {
  arch: "Architectuur",
  ai: "AI & Integraties",
  gov: "Beheer & Beveiliging",
};
