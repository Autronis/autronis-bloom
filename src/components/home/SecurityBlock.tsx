import { Shield, Database, FileCheck, ShieldCheck, Lock, Globe, BrainCog, Eye, FolderLock, KeyRound, Server, FlaskConical, Link2, Unlock, ShieldOff, ClipboardList, Radio, Scale, FileText, BadgeCheck } from "lucide-react";
import { useState } from "react";
import useCanHover from "@/hooks/use-can-hover";

import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const layers = [
  {
    icon: Shield,
    label: "Layer 1",
    title: "Architecture Layer",
    intro: "The foundation everything rests on.",
    points: [
      { icon: KeyRound, text: "Access model based on the least-privilege principle" },
      { icon: ShieldCheck, text: "Role and record-level security (RLS)" },
      { icon: FlaskConical, text: "Separate environments for development, testing, and production" },
      { icon: Link2, text: "API connections with controlled access" },
      { icon: Unlock, text: "No vendor lock-in or hidden dependencies" },
    ],
    closing: "This layer determines how systems communicate and who has access, before any data is processed.",
  },
  {
    icon: Database,
    label: "Layer 2",
    title: "Data Layer",
    intro: "Protection of your business data.",
    points: [
      { icon: Lock, text: "End-to-end encryption (TLS 1.2+ in transit, AES-256 at rest)" },
      { icon: Globe, text: "Processing and storage within the EU where possible" },
      { icon: BrainCog, text: "No use of business data for AI training" },
      { icon: Eye, text: "Data is only accessible to authorized parties and is not shared with unauthorized entities" },
      { icon: FolderLock, text: "Data segmentation and access control per role" },
    ],
    closing: "Your data remains under your control and ownership, both technically and contractually secured.",
  },
  {
    icon: FileCheck,
    label: "Layer 3",
    title: "Governance & Control",
    intro: "Demonstrable risk management.",
    points: [
      { icon: ClipboardList, text: "Logging and audit trails active by default" },
      { icon: Radio, text: "Continuous monitoring and documented incident procedures" },
      { icon: Scale, text: "Compliance with GDPR including data processing agreements" },
      { icon: FileText, text: "Complete technical documentation and transferability" },
      { icon: BadgeCheck, text: "Collaboration with technology partners that meet SOC 2 Type II and ISO 27001" },
    ],
    closing: "Security is not only implemented technically, but also organizationally and legally secured.",
  },
];

const SecurityBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <section id="beveiliging" className="relative overflow-hidden border-t border-primary/10">

      <div className="container mx-auto px-4 lg:px-8 py-10 sm:py-16 md:py-24 relative z-10">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-8 sm:mb-14 md:mb-20">
          <ScrollRevealItem>
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <ShieldCheck size={16} className="text-primary" />
              <p className="text-xs font-semibold tracking-widest uppercase text-primary">
                Security & Control
              </p>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Security as an architecture principle
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Every automation and system integration is designed with data security, control,
              and transferability as the starting point — not as an afterthought.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            const isHovered = canHover && hoveredIndex === i;

            return (
              <ScrollReveal key={layer.title}>
                <ScrollRevealItem>
                  <div
                    className="rounded-xl sm:rounded-2xl border bg-card overflow-hidden transition-all duration-200 ease-out"
                    style={{
                      transform: isHovered ? "scale(1.015) translateY(-2px)" : "none",
                      borderColor: isHovered ? "hsl(var(--primary) / 0.35)" : "hsl(var(--border))",
                      boxShadow: isHovered ? "0 0 20px hsl(174 78% 41% / 0.12)" : "0 0 0 transparent",
                    }}
                    onMouseEnter={canHover ? () => setHoveredIndex(i) : undefined}
                    onMouseLeave={canHover ? () => setHoveredIndex(null) : undefined}
                  >
                    <div className="p-4 sm:p-6 md:p-8">
                      <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center bg-primary/10 shrink-0">
                          <Icon size={16} className="text-primary sm:w-[18px] sm:h-[18px]" />
                        </div>
                        <div className="flex items-baseline gap-2 sm:gap-2.5">
                          <span className="text-sm sm:text-base font-bold tracking-widest uppercase text-primary">
                            {layer.label}
                          </span>
                          <h3 className="text-base sm:text-lg font-semibold text-foreground">{layer.title}</h3>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-muted-foreground pl-10 sm:pl-12 mb-3 sm:mb-5">
                        {layer.intro}
                      </p>

                      <ul className="space-y-2 sm:space-y-2.5 pl-10 sm:pl-12 mb-3 sm:mb-5">
                        {layer.points.map((point) => {
                          const PointIcon = point.icon;
                          return (
                            <li
                              key={point.text}
                              className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed"
                            >
                              <PointIcon size={14} className="text-primary mt-[2px] shrink-0 sm:w-[15px] sm:h-[15px]" />
                              <span className="text-foreground/85">{point.text}</span>
                            </li>
                          );
                        })}
                      </ul>

                      <p className="text-xs sm:text-sm font-medium text-muted-foreground/80 italic pl-10 sm:pl-12">
                        {layer.closing}
                      </p>
                    </div>
                  </div>
                </ScrollRevealItem>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal className="mt-10 sm:mt-14 md:mt-20">
          <ScrollRevealItem>
            <p className="text-center text-xs font-medium text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
              "We don't build automation without demonstrable control over risk, data, and
              continuity."
            </p>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SecurityBlock;
