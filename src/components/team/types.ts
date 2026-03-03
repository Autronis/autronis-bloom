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

export const categoryMeta: Record<SkillCategory, { border: string; bg: string }> = {
  arch: { border: "border-[rgba(70,130,190,0.6)]", bg: "bg-[rgba(70,130,190,0.2)]" },
  ai:   { border: "border-[rgba(60,190,170,0.55)]", bg: "bg-[rgba(60,190,170,0.18)]" },
  gov:  { border: "border-[rgba(160,140,200,0.55)]", bg: "bg-[rgba(160,140,200,0.18)]" },
};

export const categoryLabels: Record<SkillCategory, string> = {
  arch: "Architectuur",
  ai: "AI en integraties",
  gov: "Beheer en beveiliging",
};
