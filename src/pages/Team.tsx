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

const categoryMeta: Record<SkillCategory, { title: string; border: string; bg: string }> = {
  arch: {
    title: "ARCHITECTUUR",
    border: "border-[rgba(160,180,210,0.25)]",
    bg: "bg-[rgba(160,180,210,0.06)]",
  },
  ai: {
    title: "AI & INTEGRATIES",
    border: "border-[rgba(130,200,190,0.25)]",
    bg: "bg-[rgba(130,200,190,0.06)]",
  },
  gov: {
    title: "GOVERNANCE",
    border: "border-[rgba(170,160,200,0.25)]",
    bg: "bg-[rgba(170,160,200,0.06)]",
  },
};

const team = [
  {
    name: "Syb Sprenkeler",
    role: "Automation Architect",
    photo: fotoSyb,
    skills: [
      { label: "Architectuurontwerp", category: "arch" as SkillCategory },
      { label: "API & systeemintegraties", category: "ai" as SkillCategory },
      { label: "Workflow engineering", category: "arch" as SkillCategory },
      { label: "Performance & schaalbaarheid", category: "arch" as SkillCategory },
      { label: "Technische documentatie", category: "gov" as SkillCategory },
    ],
    mail: "mailto:syb@autronis.com",
    linkedin: "https://www.linkedin.com/in/syb-sprenkeler-1b9b01323/",
  },
  {
    name: "Sem Gijsberts",
    role: "AI & Systems Engineer",
    photo: fotoSem,
    skills: [
      { label: "AI-integraties", category: "ai" as SkillCategory },
      { label: "Backend automatisering", category: "ai" as SkillCategory },
      { label: "Datagovernance", category: "gov" as SkillCategory },
      { label: "Logging & monitoring", category: "gov" as SkillCategory },
      { label: "Security by design", category: "gov" as SkillCategory },
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

const VISIBLE_COUNT = 3;

const SkillBadge = ({ skill }: { skill: Skill }) => {
  const meta = categoryMeta[skill.category];
  return (
    <span
      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md border transition-all duration-200
        bg-[rgba(0,0,0,0.6)] text-white ${meta.border}
        hover:translate-y-[-1px] hover:border-[rgba(255,255,255,0.3)]`}
    >
      {skill.label}
    </span>
  );
};

const TeamCard = ({ member }: { member: (typeof team)[0] }) => {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const visibleSkills = member.skills.slice(0, VISIBLE_COUNT);
  const hiddenCount = member.skills.length - VISIBLE_COUNT;

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  React.useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) setExpanded(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [expanded]);

  // Group skills by category for expanded view
  const grouped = member.skills.reduce<Record<SkillCategory, Skill[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl border border-border bg-card overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px -8px rgba(0,0,0,0.35)" : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Subtle brick brightener */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 50% 35%, transparent 0%, hsl(0 0% 100% / 0.04) 100%)",
          }}
        />

        {/* Dark gradient scrim */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "40%",
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
          }}
        />

        {/* Extra darkening on hover — content stays visible */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{ background: "rgba(0,0,0,0.12)", opacity: hovered ? 1 : 0 }}
        />

        {/* Social icons — top right, WHITE icons */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={member.mail}
                  className="w-9 h-9 rounded-full bg-[rgba(0,0,0,0.45)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white hover:border-[rgba(130,200,190,0.4)] hover:shadow-[0_0_12px_rgba(130,200,190,0.15)] hover:scale-[1.04] transition-all duration-300"
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
                  className="w-9 h-9 rounded-full bg-[rgba(0,0,0,0.45)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white hover:border-[rgba(130,200,190,0.4)] hover:shadow-[0_0_12px_rgba(130,200,190,0.15)] hover:scale-[1.04] transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={15} />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>LinkedIn</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Expanded overlay — categorized skills */}
        {expanded && (
          <div
            className="absolute inset-x-0 bottom-0 z-20 p-4 pt-8"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 60%, transparent 100%)",
              backdropFilter: "blur(4px)",
              animation: "skillsExpand 250ms ease-out forwards",
            }}
          >
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {(Object.entries(grouped) as [SkillCategory, Skill[]][]).map(([cat, skills]) => (
                <div key={cat} className="space-y-1.5">
                  <p className="text-[9px] font-bold tracking-widest text-[rgba(255,255,255,0.5)] uppercase">
                    {categoryMeta[cat].title}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <SkillBadge key={s.label} skill={s} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleExpandClick}
              className="mt-3 text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[rgba(0,0,0,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.15)] text-white cursor-pointer hover:border-[rgba(255,255,255,0.3)] transition-all duration-200"
            >
              Sluiten
            </button>
          </div>
        )}

        {/* Visible skill badges — bottom left */}
        {!expanded && (
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap gap-1.5">
            {visibleSkills.map((skill) => (
              <SkillBadge key={skill.label} skill={skill} />
            ))}
            {hiddenCount > 0 && (
              <button
                onClick={handleExpandClick}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[rgba(0,0,0,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.15)] text-white cursor-pointer select-none hover:border-[rgba(255,255,255,0.3)] transition-all duration-200"
              >
                +{hiddenCount}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Name + role — always visible */}
      <div className="p-4 text-center">
        <p className="font-semibold">{member.name}</p>
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <Layout>
      <style>{`
        @keyframes skillsExpand {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
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
