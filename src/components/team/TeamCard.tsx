import React, { useState } from "react";
import { Mail, Linkedin } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { TeamMember, Skill, SkillCategory } from "./types";
import { categoryMeta, categoryLabels } from "./types";

const SkillBadge = ({ skill }: { skill: Skill }) => (
  <span
    className={`text-[10px] font-medium px-2.5 py-1 rounded-full border
      ${categoryMeta[skill.category].bg} ${categoryMeta[skill.category].border}
      text-white/90 transition-colors duration-200`}
  >
    {skill.label}
  </span>
);

const TeamCard = ({ member }: { member: TeamMember }) => {
  const [hovered, setHovered] = useState(false);

  const grouped = member.skills.reduce<Record<SkillCategory, Skill[]>>((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  return (
    <div
      className="relative rounded-xl border border-border overflow-hidden cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 24px -6px rgba(0,0,0,0.3)" : "none",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Photo area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.02)" : "scale(1)" }}
        />

        {/* Gradient overlay – stronger on hover */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-400"
          style={{
            background: hovered
              ? "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0.15) 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
          }}
        />

        {/* Social icons – fixed top-right zone */}
        <div className="absolute top-3 right-3 flex gap-2 z-20">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={member.mail}
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-white/20 transition-all duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Mail size={14} />
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
                  className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-white/20 transition-all duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={14} />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>LinkedIn</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Content overlay – always visible, expands on hover */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-8">
          {/* Focus area + description – revealed on hover */}
          <div
            className="transition-all duration-300 ease-out overflow-visible"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              maxHeight: hovered ? "600px" : "0px",
            }}
          >
            <p className="text-[8px] font-semibold tracking-[0.15em] uppercase text-white/50 mb-0.5">
              Focusgebied
            </p>
            <p className="text-[12px] font-semibold text-white mb-2 leading-snug">
              {member.focusLabel}
            </p>
            <p className="text-[11px] text-white/80 leading-relaxed mb-3">
              {member.description}
            </p>

            {/* Vaardigheden label */}
            <p className="text-[7px] font-medium tracking-[0.18em] uppercase text-white/40 mb-2">
              Vaardigheden
            </p>

            {/* Skills grouped by category */}
            <div className="space-y-2">
              {(["arch", "ai", "gov"] as SkillCategory[]).map((cat) =>
                grouped[cat]?.length ? (
                  <div key={cat}>
                    <p className="text-[8px] font-semibold tracking-[0.12em] uppercase text-white/55 mb-1">
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

          {/* Default: show 3 preview skills */}
          <div
            className="flex flex-wrap gap-1.5 items-center transition-all duration-200"
            style={{
              opacity: hovered ? 0 : 1,
              height: hovered ? 0 : "auto",
              overflow: "hidden",
            }}
          >
            {member.skills.slice(0, 3).map((skill) => (
              <SkillBadge key={skill.label} skill={skill} />
            ))}
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-white/70">
              +{member.skills.length - 3}
            </span>
          </div>
        </div>
      </div>

      {/* Name + role + subtitle – always visible */}
      <div className="p-5 bg-card">
        <p className="font-semibold text-foreground">{member.name}</p>
        <p className="text-sm text-muted-foreground">{member.role}</p>
        <p className="text-xs text-muted-foreground/60 mt-0.5">{member.subtitle}</p>
      </div>
    </div>
  );
};

export default TeamCard;
