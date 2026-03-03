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
      text-white transition-all duration-200 cursor-default`}
  >
    {skill.label}
  </motion.span>
);

const PreviewBadge = ({ skill }: { skill: Skill }) => (
  <span
    className={`text-[10px] font-medium px-2.5 py-1 rounded-full border
      ${categoryMeta[skill.category].bg} ${categoryMeta[skill.category].border}
      text-white`}
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
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
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
                ? "bg-black/75 backdrop-blur-[8px]"
                : "bg-gradient-to-t from-black/60 via-black/20 to-transparent"
              : "bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:bg-black/75 group-hover:backdrop-blur-[8px]"
            }`}
        />


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
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 pt-14 flex flex-col justify-end">
          {/* Expanded state: desktop hover OR mobile tap */}
          <div
            className={`transition-all duration-350 ease-out overflow-visible
              ${isMobile
                ? expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 max-h-0 overflow-hidden"
                : "opacity-0 translate-y-2 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-[700px]"
              }`}
            style={isMobile && expanded ? { maxHeight: "700px" } : undefined}
          >
            {/* Description */}
            <p className="text-[13px] text-white leading-relaxed mb-4 pr-6">
              {member.description}
            </p>


            {/* Skills grouped by category */}
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
                        return <SkillBadge key={s.label} skill={s} index={i} />;
                      })}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Pre-hover state: preview skills – one from each category */}
          <div
            className={`flex flex-wrap gap-1.5 items-center transition-all duration-250
              ${isMobile
                ? expanded ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
                : "opacity-100 group-hover:opacity-0 group-hover:h-0 group-hover:overflow-hidden"
              }`}
          >
            <span className="text-[8px] font-bold tracking-[0.14em] uppercase text-white/85 mr-1 block w-full mb-1">
              Vaardigheden
            </span>
            {/* Pick first skill from each category for variety */}
            {(["arch", "ai", "gov"] as SkillCategory[]).map((cat) => {
              const first = member.skills.find((s) => s.category === cat);
              return first ? <PreviewBadge key={first.label} skill={first} /> : null;
            })}
            <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-white/60">
              +{member.skills.length - 3}
            </span>
          </div>
        </div>
      </div>

      {/* Name / focus footer */}
      <div className="p-5 bg-card flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-foreground">{member.name}</p>
          <p className="text-[8px] font-semibold tracking-[0.14em] uppercase text-primary/70 mt-1">Kernfocus</p>
          <p className="text-sm text-muted-foreground">{member.focusLabel}</p>
          <p className="text-xs text-muted-foreground/55 mt-0.5">{member.subtitle}</p>
        </div>
        <div className="flex gap-2 shrink-0 mt-0.5">
          <a
            href={member.mail}
            className="w-8 h-8 rounded-full bg-muted/40 border border-border
              flex items-center justify-center
              hover:border-primary/40
              transition-all duration-200 hover:scale-[1.08]"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="16" height="12" viewBox="0 0 24 18" fill="none">
              <path d="M1.636 0L12 7.09L22.364 0H1.636z" fill="#EA4335"/>
              <path d="M24 1.636L12 10.909 0 1.636V16.364C0 17.268.732 18 1.636 18H6V9l6 4.5L18 9v9h4.364c.904 0 1.636-.732 1.636-1.636V1.636z" fill="#4285F4"/>
              <path d="M0 1.636V16.364C0 17.268.732 18 1.636 18H6V9L0 1.636z" fill="#4285F4"/>
              <path d="M24 1.636V16.364c0 .904-.732 1.636-1.636 1.636H18V9l6-7.364z" fill="#34A853"/>
              <path d="M0 1.636L6 9V4.636L1.636 0C.732 0 0 .732 0 1.636z" fill="#C5221F"/>
              <path d="M24 1.636L18 9V4.636L22.364 0C23.268 0 24 .732 24 1.636z" fill="#FBBC05"/>
            </svg>
          </a>
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-muted/40 border border-border
              flex items-center justify-center
              hover:border-primary/40
              transition-all duration-200 hover:scale-[1.08]"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Hover lift + scale – desktop only */}
      <style>{`
        .group:hover {
          transform: scale(1.04) translateY(-4px);
          box-shadow: 0 14px 36px -8px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
};

export default TeamCard;
