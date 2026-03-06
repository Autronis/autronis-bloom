import React, { useState, useCallback, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { copyTextToClipboard, showClipboardFeedback } from "@/lib/copyToClipboard";
import type { TeamMember, Skill, SkillCategory } from "./types";
import { categoryMeta, categoryLabels } from "./types";

/* ── Skill tag (TechTag style) for card footer ── */
const SkillTag = ({ skill, index }: { skill: Skill; index: number }) => {
  const cfg = categoryMeta[skill.category];
  const Icon = skill.icon;
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25, ease: "easeOut" }}
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border
        ${cfg.border} ${cfg.bg} ${cfg.text} ${cfg.glow}
        transition-all duration-200 cursor-default select-none`}
    >
      <Icon size={13} strokeWidth={2} className="shrink-0" />
      {skill.label}
    </motion.span>
  );
};

/* ── Overlay skill badge (on photo, white-based) ── */
const OverlaySkillBadge = ({ skill, index }: { skill: Skill; index: number }) => {
  const cfg = categoryMeta[skill.category];
  const Icon = skill.icon;
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25, ease: "easeOut" }}
      className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full border
        ${cfg.overlayBorder} ${cfg.overlayBg}
        ${cfg.text} transition-colors duration-200 cursor-default`}
    >
      <Icon size={12} strokeWidth={2} className="shrink-0" />
      {skill.label}
    </motion.span>
  );
};

const PreviewBadge = ({ skill }: { skill: Skill }) => {
  const cfg = categoryMeta[skill.category];
  const Icon = skill.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full border
        ${cfg.overlayBorder} ${cfg.overlayBg} ${cfg.text}`}
    >
      <Icon size={12} strokeWidth={2} className="shrink-0" />
      {skill.label}
    </span>
  );
};

const TeamCard = ({ member }: { member: TeamMember }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = member.photo;

    if (img.complete) {
      setImageLoaded(true);
      return;
    }

    img.onload = () => {
      if (!cancelled) setImageLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) setImageLoaded(true);
    };

    return () => {
      cancelled = true;
    };
  }, [member.photo]);

  const handleToggle = useCallback(() => {
    if (isMobile) setExpanded((prev) => !prev);
  }, [isMobile]);

  const isOpen = isMobile ? expanded : undefined;

  const grouped = member.skills.reduce<Record<SkillCategory, Skill[]>>((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  const memberLabels = { ...categoryLabels, ...member.customCategoryLabels };
  const categoryOrder: SkillCategory[] = ["automation", "ai", "data", "infrastructure", "integrations", "operations"];
  let tagIndex = 0;

  return (
    <div
      className="group relative rounded-xl border border-border overflow-hidden cursor-default"
      onClick={handleToggle}
      style={{ transition: "transform 0.35s ease, box-shadow 0.35s ease" }}
    >
      {/* Photo area */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
        <img
          src={member.photo}
          alt={member.name}
          className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.02] ${
            imageLoaded ? "opacity-100 blur-0" : "opacity-80 blur-[2px]"
          }`}
          loading={member.priority ? "eager" : "lazy"}
          fetchPriority={member.priority ? "high" : "auto"}
          decoding={member.priority ? "sync" : "async"}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
          style={isMobile && isOpen ? { transform: "scale(1.02)" } : undefined}
        />

        {/* Dark overlay */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-400
            ${isMobile
              ? isOpen
                ? "bg-gradient-to-b from-primary/25 via-background/75 to-background/90 backdrop-blur-[8px]"
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
          {/* Expanded state */}
          <div
            className={`transition-all duration-350 ease-out overflow-visible
              ${isMobile
                ? expanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 max-h-0 overflow-hidden"
                : "opacity-0 translate-y-2 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:translate-y-0 group-hover:max-h-[700px]"
              }`}
            style={isMobile && expanded ? { maxHeight: "700px" } : undefined}
          >
            <p className="text-[13px] text-white leading-relaxed mb-4 pr-6">
              {member.description}
            </p>

            {/* Skills grouped by category (overlay style) */}
            <div className="space-y-2">
              {categoryOrder.map((cat) =>
                grouped[cat]?.length ? (
                  <div key={cat}>
                    <p className="text-[8px] font-semibold tracking-[0.12em] uppercase text-white/50 mb-1">
                      {memberLabels[cat]}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {grouped[cat].slice(0, 3).map((s) => {
                        const i = tagIndex++;
                        return <OverlaySkillBadge key={s.label} skill={s} index={i} />;
                      })}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Pre-hover state: preview skills + bekijk meer */}
          <div
            className={`flex flex-wrap gap-1.5 items-center transition-all duration-250
              ${isMobile
                ? expanded ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
                : "opacity-100 group-hover:opacity-0 group-hover:h-0 group-hover:overflow-hidden"
              }`}
          >
            <span className="text-[8px] font-bold tracking-[0.14em] uppercase text-white/85 mr-1 block w-full mb-1">
              Specialisaties
            </span>
            {categoryOrder.map((cat) => {
              const first = member.skills.find((s) => s.category === cat);
              return first ? <PreviewBadge key={first.label} skill={first} /> : null;
            })}
            <span className="text-[10px] text-white/50 mt-1.5 block w-full italic">
              {isMobile ? "Tik voor meer →" : "Hover voor meer →"}
            </span>
          </div>
        </div>
      </div>

      {/* Name / focus / specialisaties footer */}
      <div className="p-5 bg-card">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <p className="font-semibold text-foreground">{member.name}</p>
            <p className="text-[8px] font-semibold tracking-[0.14em] uppercase text-primary/70 mt-1">Kernfocus</p>
            <p className="text-sm text-muted-foreground">{member.focusLabel}</p>
            <p className="text-xs text-muted-foreground/55 mt-0.5">{member.subtitle}</p>
          </div>
          <div className="flex gap-2 shrink-0 mt-0.5">
            <button
              className="w-8 h-8 rounded-full bg-muted/40 border border-border
                flex items-center justify-center
                hover:border-primary/40
                transition-all duration-200 hover:scale-[1.08]"
              onClick={async (e) => {
                e.stopPropagation();
                const email = member.mail.replace("mailto:", "");
                const copied = await copyTextToClipboard(email);

                if (copied) {
                  showClipboardFeedback("E-mailadres gekopieerd naar klembord", "success");
                } else {
                  showClipboardFeedback("Kopiëren mislukt", "error");
                }
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
                <path d="M0 5.457v13.909c0 .904.732 1.636 1.636 1.636h3.819V11.73L0 5.457z" fill="#4285F4"/>
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L24 5.457z" fill="#34A853"/>
                <path d="M18.545 11.73V21.002h-3.819V11.73L12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457L18.545 11.73z" fill="#FBBC05"/>
                <path d="M5.455 11.73V21.002h3.818V11.73L12 9.548 5.455 4.64 3.927 3.494C2.309 2.28 0 3.434 0 5.457L5.455 11.73z" fill="#C5221F"/>
              </svg>
            </button>
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
