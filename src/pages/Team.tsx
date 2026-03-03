import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Eye, Shield, Clock, Mail, Linkedin } from "lucide-react";
import React, { useState } from "react";
import fotoSyb from "@/assets/foto_syb.jpg";
import fotoSem from "@/assets/foto_sem.jpg";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type SkillCategory = "arch" | "ai" | "gov";

interface Skill {
  label: string;
  category: SkillCategory;
}

const categoryMeta: Record<SkillCategory, { border: string; bg: string }> = {
  arch: { border: "border-[rgba(90,150,220,0.7)]", bg: "bg-[rgba(90,150,220,0.25)]" },
  ai:   { border: "border-[rgba(60,210,190,0.65)]", bg: "bg-[rgba(60,210,190,0.22)]" },
  gov:  { border: "border-[rgba(170,150,210,0.65)]", bg: "bg-[rgba(170,150,210,0.22)]" },
};

const categoryLabels: Record<SkillCategory, string> = {
  arch: "Architectuur",
  ai: "AI & Integraties",
  gov: "Governance",
};

interface TeamMember {
  name: string;
  role: string;
  photo: string;
  focusLabel: string;
  description: string;
  visibleSkills: Skill[];
  hiddenSkills: Skill[];
  mail: string;
  linkedin: string;
}

const team: TeamMember[] = [
  {
    name: "Syb Sprenkeler",
    role: "Automatiseringsarchitect",
    photo: fotoSyb,
    focusLabel: "Technische realisatie & AI-integraties",
    description: "Syb realiseert schaalbare automatiseringssystemen en AI-integraties met focus op codekwaliteit, performance en onderhoudbaarheid.",
    visibleSkills: [
      { label: "Architectuurontwerp", category: "arch" },
      { label: "AI-integraties", category: "ai" },
      { label: "API & systeemintegraties", category: "ai" },
    ],
    hiddenSkills: [
      { label: "Workflow-engineering", category: "arch" },
      { label: "Prestatie & schaalbaarheid", category: "arch" },
      { label: "Backend-automatisering", category: "ai" },
      { label: "Code-optimalisatie", category: "gov" },
      { label: "Technische documentatie", category: "gov" },
      { label: "Beveiliging vanaf ontwerp", category: "gov" },
    ],
    mail: "mailto:syb@autronis.com",
    linkedin: "https://www.linkedin.com/in/syb-sprenkeler-1b9b01323/",
  },
  {
    name: "Sem Gijsberts",
    role: "AI- & Systeemingenieur",
    photo: fotoSem,
    focusLabel: "Structuur, AI & systeemarchitectuur",
    description: "Sem vertaalt complexe processen naar heldere systeemarchitectuur en bewaakt documentatie, datalogica en overdraagbaarheid — van ontwerp tot livegang.",
    visibleSkills: [
      { label: "Systeemarchitectuur", category: "arch" },
      { label: "AI-integraties", category: "ai" },
      { label: "Datagovernance", category: "gov" },
    ],
    hiddenSkills: [
      { label: "Workflow-engineering", category: "arch" },
      { label: "Procesmodellering", category: "arch" },
      { label: "Backend-automatisering", category: "ai" },
      { label: "Logging & monitoring", category: "gov" },
      { label: "Structuur & documentatie", category: "gov" },
      { label: "Beveiliging vanaf ontwerp", category: "gov" },
    ],
    mail: "mailto:sem@autronis.com",
    linkedin: "https://www.linkedin.com/in/sem-gijsberts-65ba543b3/",
  },
];

const directReasons = [
  { icon: Users, title: "Geen overdracht tussen sales en techniek", description: "De architect die ontwerpt, bouwt ook." },
  { icon: Clock, title: "Technische keuzes met lange termijnvisie", description: "Geen snelle oplossingen die later herschreven moeten worden." },
  { icon: Eye, title: "Volledige overdraagbaarheid", description: "Architectuur en documentatie zijn altijd inzichtelijk." },
  { icon: Shield, title: "Beveiliging vanaf dag één", description: "Geen systemen zonder logging, toegangsmodel en controle." },
];

const toolStack = ["OpenAI", "Supabase", "n8n", "Make", "Vercel", "AWS"];

const SkillBadge = ({ skill }: { skill: Skill }) => (
  <span
    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm
      ${categoryMeta[skill.category].bg} ${categoryMeta[skill.category].border}
      text-white transition-all duration-200 hover:translate-y-[-1px] hover:border-white/30`}
  >
    {skill.label}
  </span>
);

const TeamCard = ({ member }: { member: TeamMember }) => {
  const [hovered, setHovered] = useState(false);

  // Group all skills by category for hover overlay
  const allSkills = [...member.visibleSkills, ...member.hiddenSkills];
  const grouped = allSkills.reduce<Record<SkillCategory, Skill[]>>((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return (
    <div
      className="relative rounded-xl border border-border overflow-hidden group cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px -8px rgba(0,0,0,0.35)" : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Photo area */}
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.03] group-hover:blur-[8px] group-hover:brightness-75"
        />

        {/* Dark overlay – strengthens on hover for readability */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-500"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.25) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)",
          }}
        />

        {/* Social icons – top right */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={member.mail}
                  className="w-9 h-9 rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:border-[rgba(110,180,170,0.4)] hover:shadow-[0_0_10px_rgba(110,180,170,0.12)] hover:scale-[1.04] transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail size={15} />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>Mail</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[rgba(0,0,0,0.5)] backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:border-[rgba(110,180,170,0.4)] hover:shadow-[0_0_10px_rgba(110,180,170,0.12)] hover:scale-[1.04] transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={15} />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>LinkedIn</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* ── Hover overlay content (focus area + description + all skills) ── */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 flex flex-col justify-end pointer-events-none"
          style={{ height: "60%" }}
        >
          {/* Hover-reveal block */}
          <div
            className="transition-all duration-[250ms] ease-out mb-3"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
            }}
          >
            <p className="text-[9px] font-semibold tracking-[0.15em] uppercase text-white/70 mb-0.5">
              Focusgebied
            </p>
            <p className="text-[13px] font-bold text-white mb-2 leading-snug">
              {member.focusLabel}
            </p>
            <p className="text-[11px] text-white/85 leading-relaxed mb-3 line-clamp-3">
              {member.description}
            </p>

            {/* All skills grouped by category in 2 columns */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
              {(["arch", "ai", "gov"] as SkillCategory[]).map((cat) =>
                grouped[cat]?.length ? (
                  <div key={cat} className="col-span-2">
                    <p className="text-[8px] font-bold tracking-[0.12em] uppercase text-white/60 mb-1">
                      {categoryLabels[cat]}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {grouped[cat].map((s) => (
                        <SkillBadge key={s.label} skill={s} />
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Default visible skills + +X badge (fade out on hover) */}
          <div
            className="flex flex-wrap gap-1.5 items-center transition-all duration-200"
            style={{
              opacity: hovered ? 0 : 1,
              transform: hovered ? "translateY(4px)" : "translateY(0)",
              pointerEvents: hovered ? "none" : "auto",
            }}
          >
            {member.visibleSkills.map((skill) => (
              <SkillBadge key={skill.label} skill={skill} />
            ))}
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[rgba(0,0,0,0.6)] backdrop-blur-sm border border-white/15 text-white/80 transition-colors duration-200 hover:border-white/30 hover:text-white">
              +{member.hiddenSkills.length}
            </span>
          </div>
        </div>
      </div>

      {/* Name + role – always visible below photo */}
      <div className="p-5 bg-card">
        <p className="font-semibold text-foreground">{member.name}</p>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <AmbientLight />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Team</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Werk direct met de architecten achter uw systeem.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wij ontwerpen, bouwen en optimaliseren zelf. Geen accountmanagers, geen overdracht — alleen directe samenwerking met de engineers die verantwoordelijk zijn voor uw architectuur.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
            {team.map((member) => (
              <ScrollRevealItem key={member.name}>
                <TeamCard member={member} />
              </ScrollRevealItem>
            ))}
          </ScrollReveal>

          <ScrollReveal className="max-w-2xl mx-auto mb-16">
            <ScrollRevealItem>
              <h2 className="text-xl font-bold mb-6">Waarom direct met ons werken?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {directReasons.map((reason) => (
                  <div key={reason.title} className="rounded-lg border border-border bg-card p-5 flex gap-4 items-start">
                    <reason.icon size={20} className="text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">{reason.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <h2 className="text-2xl font-bold mb-3">Wilt u direct met de architecten spreken?</h2>
              <p className="text-muted-foreground mb-6">Plan een kennismaking waarin we uw processen en automatiseringskansen technisch verkennen.</p>
              <Button asChild size="lg">
                <Link to="/book">Plan een technisch gesprek <ArrowRight size={18} /></Link>
              </Button>
            </ScrollRevealItem>
          </ScrollReveal>

          <div className="text-center">
            <p className="text-xs text-muted-foreground/60 tracking-wide">Gebouwd met: {toolStack.join(" · ")}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
