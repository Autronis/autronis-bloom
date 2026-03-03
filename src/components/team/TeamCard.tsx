import React, { useState, useCallback } from "react";
import { Mail, Linkedin, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import type { TeamMember, Skill, SkillCategory } from "./types";
import { categoryMeta, categoryLabels } from "./types";

const SkillBadge = ({ skill, index }: { skill: Skill; index: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06, duration: 0.25, ease: "easeOut" }}
    className={`text-[10px] font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm
      ${categoryMeta[skill.category].bg} ${categoryMeta[skill.category].border}
      ${categoryMeta[skill.category].glow}
      text-white/90 transition-all duration-200 cursor-default`}
  >
    {skill.label}
  </motion.span>
);

const PreviewBadge = ({ skill }: { skill: Skill }) => (
  <span
    className={`text-[10px] font-medium px-2.5 py-1 rounded-full border
      ${categoryMeta[skill.category].bg} ${categoryMeta[skill.category].border}
      text-white/90`}
  >
    {skill.label}
  </span>
);

const TeamCard = ({ member }: { member: TeamMember }) => {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();

  const handleToggle = useCallback(() => {
    if (isMobile) setExpanded((prev) => !prev);
  }, [isMobile]);

  const isOpen = isMobile ? expanded : undefined; // undefined = controlled by CSS hover

  const grouped = member.skills.reduce<Record<SkillCategory, Skill[]>>((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  let tagIndex = 0;

  return (
    <div
      className="group relative rounded-xl border border-border overflow-hidden cursor-default"
      onClick={handleToggle}
      style={{ transition: "transform 0.35s ease, box-shadow 0.35s ease" }}
      // Desktop hover via group
    >
      {/* Photo area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-500
            group-hover:scale-[1.02]"
          style={isMobile && expanded ? { transform: "scale(1.02)" } : undefined}
        />

        {/* Dark overlay – desktop hover + mobile expanded */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-400
            ${isMobile
              ? expanded
                ? "bg-black/60 dark:bg-black/65 backdrop-blur-[6px]"
                : "bg-gradient-to-t from-black/55 via-black/15 to-transparent"
              : "bg-gradient-to-t from-black/55 via-black/15 to-transparent group-hover:bg-black/60 dark:group-hover:bg-black/65 group-hover:backdrop-blur-[6px]"
            }`}
        />

        {/* Social icons – fixed top-right, always above content */}
        <div className="absolute top-3 right-3 flex gap-2 z-30">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={member.mail}
                  className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/15
                    flex items-center justify-center text-white/85
                    hover:text-white hover:border-[hsla(174,60%,50%,0.5)] hover:shadow-[0_0_10px_hsla(174,60%,50%,0.3)]
                    transition-all duration-200 hover:scale-[1.03]"
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
                  className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/15
                    flex items-center justify-center text-white/85
                    hover:text-white hover:border-[hsla(174,60%,50%,0.5)] hover:shadow-[0_0_10px_hsla(174,60%,50%,0.3)]
                    transition-all duration-200 hover:scale-[1.03]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={14} />
                </a>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>LinkedIn</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Mobile close button */}
        {isMobile && expanded && (
          <button
            className="absolute top-3 left-3 z-30 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm
              border border-white/15 flex items-center justify-center text-white/85"
            onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
          >
            <X size={14} />
          </button>
        )}

        {/* Content overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-10">
          {/* Expanded state: desktop hover OR mobile tap */}
          <div
            className={`transition-all duration-350 ease-out overflow-visible
              ${isMobile
                ? expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 max-h-0 overflow-hidden"
                : "opacity-0 translate-y-2 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-[700px]"
              }`}
            style={isMobile && expanded ? { maxHeight: "700px" } : undefined}
          >
            {/* Role label */}
            <p className="text-[9px] font-semibold tracking-[0.14em] uppercase text-white/45 mb-1">
              {member.role}
            </p>

            {/* Focus title */}
            <p className="text-[8px] font-semibold tracking-[0.16em] uppercase text-primary/80 mb-0.5">
              Kernfocus
            </p>
            <p className="text-[13px] font-semibold text-white leading-snug mb-2">
              {member.focusLabel}
            </p>

            {/* Description – larger and more readable */}
            <p className="text-[12px] text-white/85 leading-relaxed mb-4">
              {member.description}
            </p>

            {/* Vaardigheden label */}
            <p className="text-[8px] font-medium tracking-[0.18em] uppercase text-white/40 mb-2.5">
              Vaardigheden
            </p>

            {/* Skills grouped */}
            <div className="space-y-2.5">
              {(["arch", "ai", "gov"] as SkillCategory[]).map((cat) =>
                grouped[cat]?.length ? (
                  <div key={cat}>
                    <p className="text-[8px] font-semibold tracking-[0.12em] uppercase text-white/50 mb-1">
                      {categoryLabels[cat]}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {grouped[cat].map((s) => {
                        const i = tagIndex++;
                        return isMobile && expanded ? (
                          <SkillBadge key={s.label} skill={s} index={i} />
                        ) : (
                          <SkillBadge key={s.label} skill={s} index={i} />
                        );
                      })}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Pre-hover state: preview skills */}
          <div
            className={`flex flex-wrap gap-1.5 items-center transition-all duration-250
              ${isMobile
                ? expanded ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
                : "opacity-100 group-hover:opacity-0 group-hover:h-0 group-hover:overflow-hidden"
              }`}
          >
            <span className="text-[8px] font-medium tracking-[0.14em] uppercase text-white/40 mr-1 block w-full mb-1">
              Vaardigheden
            </span>
            {member.skills.slice(0, 3).map((skill) => (
              <PreviewBadge key={skill.label} skill={skill} />
            ))}
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-white/60">
              +{member.skills.length - 3}
            </span>
          </div>
        </div>
      </div>

      {/* Name / role footer */}
      <div className="p-5 bg-card">
        <p className="font-semibold text-foreground">{member.name}</p>
        <p className="text-sm text-muted-foreground">{member.role}</p>
        <p className="text-xs text-muted-foreground/55 mt-0.5">{member.subtitle}</p>
      </div>

      {/* Hover lift shadow – desktop only */}
      <style>{`
        .group:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px -8px rgba(0,0,0,0.35);
        }
      `}</style>
    </div>
  );
};

export default TeamCard;
