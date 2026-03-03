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

const team = [
  {
    name: "Syb Sprenkeler",
    role: "Automation Architect",
    photo: fotoSyb,
    description:
      "Syb ontwerpt schaalbare automatiseringsarchitecturen en vertaalt bedrijfsprocessen naar robuuste, onderhoudbare systemen. Hij bewaakt structuur, performance en technische consistentie van analyse tot livegang.",
    skills: [
      "Architectuurontwerp",
      "API & systeemintegraties",
      "Workflow engineering",
      "Performance & schaalbaarheid",
      "Technische documentatie",
    ],
    mail: "mailto:syb@autronis.com",
    linkedin: "https://www.linkedin.com/in/syb-sprenkeler-1b9b01323/",
  },
  {
    name: "Sem Gijsberts",
    role: "AI & Systems Engineer",
    photo: fotoSem,
    description:
      "Sem realiseert AI-integraties en backend-automatisering met focus op datastromen, governance en betrouwbaarheid. Van API-koppelingen tot logging en monitoring — elk systeem wordt gebouwd met controle als uitgangspunt.",
    skills: [
      "AI-integraties",
      "Backend automatisering",
      "Datagovernance",
      "Logging & monitoring",
      "Security by design",
    ],
    mail: "mailto:sem@autronis.com",
    linkedin: "https://www.linkedin.com/in/sem-gijsberts-65ba543b3/",
  },
];

const directReasons = [
  {
    icon: Users,
    title: "Geen overdracht tussen sales en techniek",
    description: "De architect die ontwerpt, bouwt ook.",
  },
  {
    icon: Clock,
    title: "Technische keuzes met lange termijnvisie",
    description: "Geen snelle oplossingen die later herschreven moeten worden.",
  },
  {
    icon: Eye,
    title: "Volledige overdraagbaarheid",
    description: "Architectuur en documentatie zijn altijd inzichtelijk.",
  },
  {
    icon: Shield,
    title: "Beveiliging vanaf dag één",
    description: "Geen systemen zonder logging, toegangsmodel en controle.",
  },
];

const toolStack = [
  "OpenAI", "Supabase", "n8n", "Make", "Vercel", "AWS",
];

const VISIBLE_COUNT = 3;
const MOBILE_VISIBLE = 3;

const TeamCard = ({ member }: { member: (typeof team)[0] }) => {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const visibleSkills = member.skills.slice(0, VISIBLE_COUNT);
  const hiddenSkills = member.skills.slice(VISIBLE_COUNT);
  const mobileVisible = member.skills.slice(0, MOBILE_VISIBLE);
  const mobileHidden = member.skills.slice(MOBILE_VISIBLE);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  // Close expanded on outside click
  const cardRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!expanded) return;
    const handler = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [expanded]);

  const badgeClass =
    "text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md border transition-all duration-300 " +
    "bg-[rgba(20,20,25,0.7)] border-[rgba(255,255,255,0.1)] text-[rgba(220,220,225,0.9)] " +
    "hover:border-[rgba(255,255,255,0.2)] hover:text-[rgba(240,240,245,1)] hover:shadow-[0_0_10px_rgba(255,255,255,0.04)]";

  const plusBadgeClass =
    "text-[10px] px-2.5 py-1 rounded-full backdrop-blur-md border cursor-pointer select-none transition-all duration-300 " +
    "bg-[rgba(20,20,25,0.7)] border-[rgba(255,255,255,0.12)] text-[rgba(200,200,205,0.85)] " +
    "hover:border-[rgba(255,255,255,0.25)] hover:text-[rgba(240,240,245,1)]";

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl border border-border bg-card overflow-hidden group transition-all duration-300 ease-out"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); }}
      style={{
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 32px -8px rgba(0,0,0,0.35)" : "none",
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

        {/* Dark gradient scrim for readability */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "40%",
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)",
          }}
        />

        {/* Social icons - top right */}
        <div className={`absolute top-4 right-4 flex gap-2 z-10 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-50"}`}>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={member.mail}
                  className="w-9 h-9 rounded-full bg-[rgba(20,20,25,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[rgba(200,200,205,0.7)] hover:text-primary/80 hover:border-[rgba(255,255,255,0.2)] hover:scale-[1.03] transition-all duration-300"
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
                  className="w-9 h-9 rounded-full bg-[rgba(20,20,25,0.6)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[rgba(200,200,205,0.7)] hover:text-primary/80 hover:border-[rgba(255,255,255,0.2)] hover:scale-[1.03] transition-all duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={15} />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>LinkedIn</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Expanded overlay with hidden skills */}
        {expanded && (
          <div
            className="absolute inset-x-0 bottom-0 z-20 p-4 pt-10"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
              animation: "skillsExpand 280ms ease-out forwards",
            }}
          >
            <div className="flex flex-wrap gap-1.5">
              {member.skills.map((skill) => (
                <span key={skill} className={badgeClass}>{skill}</span>
              ))}
            </div>
            <button
              onClick={handleExpandClick}
              className={`${plusBadgeClass} mt-2`}
            >
              Sluiten
            </button>
          </div>
        )}

        {/* Skill badges - bottom left */}
        {!expanded && (
          <div className={`absolute bottom-4 left-4 right-4 z-10 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-75"}`}>
            {/* Desktop */}
            <div className="hidden sm:flex flex-wrap gap-1.5">
              {visibleSkills.map((skill) => (
                <span key={skill} className={badgeClass}>{skill}</span>
              ))}
              {hiddenSkills.length > 0 && (
                <button onClick={handleExpandClick} className={plusBadgeClass}>
                  +{hiddenSkills.length}
                </button>
              )}
            </div>
            {/* Mobile */}
            <div className="flex sm:hidden flex-wrap gap-1.5">
              {mobileVisible.map((skill) => (
                <span key={skill} className={badgeClass}>{skill}</span>
              ))}
              {mobileHidden.length > 0 && (
                <button onClick={handleExpandClick} className={plusBadgeClass}>
                  +{mobileHidden.length}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Clean bottom: name + role only */}
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
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <AmbientLight />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Hero */}
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Team
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Werk direct met de architecten achter uw systeem.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wij ontwerpen, bouwen en optimaliseren zelf. Geen accountmanagers,
                geen overdracht — alleen directe samenwerking met de engineers die
                verantwoordelijk zijn voor uw architectuur.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* Cards */}
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
            {team.map((member) => (
              <ScrollRevealItem key={member.name}>
                <TeamCard member={member} />
              </ScrollRevealItem>
            ))}
          </ScrollReveal>

          {/* Waarom direct met ons werken */}
          <ScrollReveal className="max-w-2xl mx-auto mb-16">
            <ScrollRevealItem>
              <h2 className="text-xl font-bold mb-6">Waarom direct met ons werken?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {directReasons.map((reason) => (
                  <div
                    key={reason.title}
                    className="rounded-lg border border-border bg-card p-5 flex gap-4 items-start"
                  >
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

          {/* CTA */}
          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <h2 className="text-2xl font-bold mb-3">
                Wilt u direct met de architecten spreken?
              </h2>
              <p className="text-muted-foreground mb-6">
                Plan een kennismaking waarin we uw processen en automatiseringskansen
                technisch verkennen.
              </p>
              <Button asChild size="lg">
                <Link to="/book">
                  Plan een technisch gesprek <ArrowRight size={18} />
                </Link>
              </Button>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* Credibility strip */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground/60 tracking-wide">
              Gebouwd met: {toolStack.join(" · ")}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
