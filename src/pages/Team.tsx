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

const categoryMeta: Record<SkillCategory, { border: string }> = {
  arch: { border: "border-[rgba(100,140,160,0.35)]" },
  ai:   { border: "border-[rgba(110,180,170,0.30)]" },
  gov:  { border: "border-[rgba(150,140,175,0.30)]" },
};

const team = [
  {
    name: "Syb Sprenkeler",
    role: "Automation Architect",
    photo: fotoSyb,
    coreBadge: "Core Strength: Technical Build & Implementation",
    description: "Syb focust op technische realisatie en codekwaliteit. Van architectuur tot productie bouwt hij schaalbare systemen met performance en onderhoudbaarheid als uitgangspunt.",
    visibleSkills: [
      { label: "Architectuurontwerp", category: "arch" as SkillCategory },
      { label: "API & systeemintegraties", category: "ai" as SkillCategory },
      { label: "Workflow engineering", category: "arch" as SkillCategory },
    ],
    hoverSkills: [
      { label: "Performance & schaalbaarheid", category: "arch" as SkillCategory },
      { label: "Code optimalisatie", category: "arch" as SkillCategory },
      { label: "Technische documentatie", category: "gov" as SkillCategory },
    ],
    mail: "mailto:syb@autronis.com",
    linkedin: "https://www.linkedin.com/in/syb-sprenkeler-1b9b01323/",
  },
  {
    name: "Sem Gijsberts",
    role: "AI & Systems Engineer",
    photo: fotoSem,
    coreBadge: "Core Strength: Structuur & Systeemarchitectuur",
    description: "Sem bewaakt overzicht, documentatie en systeemlogica. Hij vertaalt complexe processen naar heldere architectuur en zorgt dat implementaties logisch, overdraagbaar en schaalbaar blijven.",
    visibleSkills: [
      { label: "AI-integraties", category: "ai" as SkillCategory },
      { label: "Backend automatisering", category: "ai" as SkillCategory },
      { label: "Datagovernance", category: "gov" as SkillCategory },
    ],
    hoverSkills: [
      { label: "Logging & monitoring", category: "gov" as SkillCategory },
      { label: "Structuur & documentatie", category: "gov" as SkillCategory },
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

const SkillBadge = ({ skill }: { skill: Skill }) => (
  <span
    className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm
      bg-[rgba(0,0,0,0.55)] text-white/90 ${categoryMeta[skill.category].border}
      transition-all duration-200 hover:text-white hover:border-white/25`}
  >
    {skill.label}
  </span>
);

const TeamCard = ({ member }: { member: (typeof team)[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl border border-border bg-card overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 10px 28px -6px rgba(0,0,0,0.3)" : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Photo */}
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Gradient scrim for readability */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "45%",
            background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
          }}
        />

        {/* Social icons — top right */}
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

        {/* Visible skill badges — always shown */}
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap gap-1.5">
          {member.visibleSkills.map((skill) => (
            <SkillBadge key={skill.label} skill={skill} />
          ))}
        </div>
      </div>

      {/* Name + role + core badge — always visible */}
      <div className="p-5">
        <p className="font-semibold text-foreground">{member.name}</p>
        <p className="text-sm text-muted-foreground mb-3">{member.role}</p>

        {/* Core strength badge — always visible */}
        <div className="mb-3">
          <span className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full border border-primary/25 bg-primary/8 text-primary">
            {member.coreBadge}
          </span>
        </div>

        {/* Hover-reveal section: extra skills + description */}
        <div
          className="overflow-hidden transition-all duration-300 ease-out"
          style={{
            maxHeight: hovered ? "200px" : "0px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
          }}
        >
          <div className="flex flex-wrap gap-1.5 mb-3 pt-1">
            {member.hoverSkills.map((skill) => (
              <SkillBadge key={skill.label} skill={skill} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {member.description}
          </p>
        </div>
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
