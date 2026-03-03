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
    border: "border-[hsla(210,60%,50%,0.7)]",
    bg: "bg-[hsla(210,60%,50%,0.28)]",
    glow: "hover:bg-[hsla(210,60%,50%,0.38)] hover:shadow-[0_0_10px_hsla(210,60%,50%,0.3)]",
  },
  ai: {
    border: "border-[hsla(174,60%,42%,0.7)]",
    bg: "bg-[hsla(174,60%,42%,0.28)]",
    glow: "hover:bg-[hsla(174,60%,42%,0.38)] hover:shadow-[0_0_10px_hsla(174,60%,42%,0.3)]",
  },
  gov: {
    border: "border-[hsla(270,40%,55%,0.65)]",
    bg: "bg-[hsla(270,40%,55%,0.24)]",
    glow: "hover:bg-[hsla(270,40%,55%,0.34)] hover:shadow-[0_0_10px_hsla(270,40%,55%,0.25)]",
  },
};

export const categoryLabels: Record<SkillCategory, string> = {
  arch: "Architectuur",
  ai: "AI & Integraties",
  gov: "Beheer & Beveiliging",
};
