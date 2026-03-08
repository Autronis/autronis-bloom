// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Eye, Shield, Clock, Boxes, Cable, BarChart3, Wrench, Cog, Bot, Brain, MessageCircle, Globe, Search, Radio, Database, Puzzle, FolderOpen, Zap, TrendingUp, BookOpen, FileBarChart, Link2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import fotoSyb from "@/assets/foto_syb.jpg";
import fotoSem from "@/assets/foto_sem.jpg";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

import TeamCard from "@/components/team/TeamCard";
import type { TeamMember } from "@/components/team/types";

if (typeof window !== "undefined") {
  [fotoSyb, fotoSem].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

const team: TeamMember[] = [
  {
    name: "Syb Sprenkeler",
    role: "Automation Architect",
    subtitle: "Co-founder",
    photo: fotoSyb,
    priority: true,
    focusLabel: "Technical delivery and AI integrations",
    description:
      "Syb builds scalable automation systems and AI integrations with a focus on code quality, performance, and maintainability. He translates architecture into stable implementations and ensures systems remain logical, extensible, and efficient over the long term.",
    skills: [
      { label: "Workflow automation", icon: Cog, category: "automation" },
      { label: "Process automation", icon: Wrench, category: "automation" },
      { label: "AI automation", icon: Bot, category: "ai" },
      { label: "LLM integrations", icon: Brain, category: "ai" },
      { label: "Web scraping", icon: Globe, category: "data" },
      { label: "Data pipelines", icon: BarChart3, category: "data" },
      { label: "Data processing", icon: Radio, category: "data" },
      { label: "System integrations", icon: Link2, category: "integrations" },
      { label: "API integrations", icon: Radio, category: "integrations" },
    ],
    mail: "mailto:syb@autronis.com",
    linkedin: "https://www.linkedin.com/in/syb-sprenkeler-1b9b01323/",
  },
  {
    name: "Sem Gijsberts",
    role: "AI & Systems Engineer",
    subtitle: "Co-founder",
    photo: fotoSem,
    focusLabel: "System structure, AI, and data logic",
    description:
      "Sem translates complex processes into clear system structures and oversees documentation, data logic, and transferability. He ensures oversight, clear planning, and consistent decision-making so implementations not only work but remain logical and manageable.",
    skills: [
      { label: "Workflow automation", icon: Cog, category: "automation" },
      { label: "System architecture", icon: Puzzle, category: "automation" },
      { label: "AI automation", icon: Bot, category: "ai" },
      { label: "AI chatbots", icon: MessageCircle, category: "ai" },
      { label: "Lead scraping", icon: Search, category: "data" },
      { label: "Dashboards", icon: BarChart3, category: "data" },
      { label: "Web scraping", icon: Globe, category: "data" },
      { label: "API integrations", icon: Radio, category: "integrations" },
      { label: "System integrations", icon: Link2, category: "integrations" },
    ],
    mail: "mailto:sem@autronis.com",
    linkedin: "https://www.linkedin.com/in/sem-gijsberts-65ba543b3/",
  },
];

const directReasons = [
  { icon: Users, title: "Direct contact with engineers", description: "You work directly with the people who analyze, design, and build your systems. No handoff layers — just direct, substantive collaboration." },
  { icon: Clock, title: "Technical decisions with a long-term vision", description: "Every technical choice is focused on scalability, maintainability, and transferability. No quick fixes that need to be rebuilt later." },
  { icon: Eye, title: "Full transferability", description: "Systems are built logically and fully documented. You remain the owner of your automations and retain complete insight into how they work." },
  { icon: Shield, title: "Security from day one", description: "Access control, logging, and data protection are integrated into the system design from the start — not added as an afterthought." },
];


const sectionEase = [0.16, 1, 0.3, 1] as const;

const WerkstandaardSection = ({ reasons }: { reasons: typeof directReasons }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });

  return (
    <div ref={ref} className="max-w-2xl mx-auto mb-16 relative">
      <div className="werkstandaard-glow" />

      <div className="text-center mb-6">
        <motion.p
          className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: sectionEase }}
        >
          Collaboration
        </motion.p>
        <motion.h2
          className="text-xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: sectionEase }}
        >
          Why organizations work with us
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reasons.map((reason, i) => (
          <div
            key={reason.title}
            className="werkstandaard-card rounded-lg border border-border bg-card p-4 flex gap-3 items-start"
          >
            <div className="werkstandaard-icon-wrap shrink-0 mt-0.5">
              <reason.icon size={20} className="text-primary shrink-0 relative z-10" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">{reason.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <>
      <SEOHead
        title="Autronis | Team — The Engineers Behind Your Automation"
        description="Meet the Autronis team. We are the engineers who structurally improve your processes, systems, and data flows."
        path="/team"
      />
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* About Autronis */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">About Autronis</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">
              From manual work to scalable systems
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>Many growing businesses get stuck with manual processes, disconnected tools, and spreadsheets that no longer scale.</p>
              <p>Autronis was founded with one goal: turning processes into reliable systems that run automatically.</p>
              <p>We design and implement automation structures where workflows, integrations, and data come together in one logical whole.</p>
              <p>From AI-powered workflows to system integrations and dashboards — we build the digital infrastructure that businesses need to keep growing.</p>
              <p>Not standalone automations, but systems that keep working as your organization scales.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-8 max-w-lg mx-auto">
              {[
                { icon: Boxes, title: "Systems", text: "Automation that structures processes and makes them scalable." },
                { icon: Cable, title: "Integrations", text: "Systems and software that work seamlessly together." },
                { icon: BarChart3, title: "Data", text: "Insight, control, and reporting based on reliable data." },
              ].map((block) => (
                <div
                  key={block.title}
                  className="rounded-lg border border-border bg-card p-3 text-center flex flex-col h-full transition-all duration-[280ms] ease-out cursor-default hover:scale-[1.05] hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_15px_hsl(174_78%_41%/0.25),0_0_30px_hsl(174_78%_41%/0.1),inset_0_0_15px_hsl(174_78%_41%/0.05)]"
                >
                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary mb-2 mx-auto">
                    <block.icon size={14} />
                  </div>
                  <p className="font-semibold text-xs mb-0.5">{block.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed flex-1">{block.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team header */}
          <div id="team-section" className="scroll-mt-24" />
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Team</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">
                Work directly with the engineers who build your systems.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We design, build, and optimize automations ourselves. You work directly with the engineers responsible for analysis, development, and implementation. No account managers or handoff layers — just direct collaboration with the team that delivers your systems.
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

          <WerkstandaardSection reasons={directReasons} />

          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <h2 className="text-2xl font-bold mb-3">Want to speak directly with the engineers?</h2>
              <p className="text-muted-foreground mb-6">Schedule an Automation Scan and discuss your processes and automation opportunities with our team.</p>
              <Button asChild size="lg" className="group/cta">
                <Link to="/book">
                  Schedule a technical consultation
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
              </Button>
            </ScrollRevealItem>
          </ScrollReveal>

        </div>
      </section>
    </>
  );
};

export default Team;
