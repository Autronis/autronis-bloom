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
import { useLanguage } from "@/i18n/context";

import TeamCard from "@/components/team/TeamCard";
import type { TeamMember } from "@/components/team/types";

if (typeof window !== "undefined") {
  [fotoSyb, fotoSem].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

const text = {
  en: {
    seoTitle: "Autronis | Team — The Engineers Behind Your Automation",
    seoDesc: "Meet the Autronis team. We are the engineers who structurally improve your processes, systems, and data flows.",
    aboutLabel: "About Autronis",
    aboutTitle: "From manual work to scalable systems",
    aboutP1: "Many growing businesses get stuck with manual processes, disconnected tools, and spreadsheets that no longer scale.",
    aboutP2: "Autronis was founded with one goal: turning processes into reliable systems that run automatically.",
    aboutP3: "We design and implement automation structures where workflows, integrations, and data come together in one logical whole.",
    aboutP4: "From AI-powered workflows to system integrations and dashboards — we build the digital infrastructure that businesses need to keep growing.",
    aboutP5: "Not standalone automations, but systems that keep working as your organization scales.",
    pillars: [
      { title: "Systems", text: "Automation that structures processes and makes them scalable." },
      { title: "Integrations", text: "Systems and software that work seamlessly together." },
      { title: "Data", text: "Insight, control, and reporting based on reliable data." },
    ],
    teamLabel: "Team",
    teamTitle: "Work directly with the engineers who build your systems.",
    teamDesc: "We design, build, and optimize automations ourselves. You work directly with the engineers responsible for analysis, development, and implementation. No account managers or handoff layers — just direct collaboration with the team that delivers your systems.",
    collabLabel: "Collaboration",
    collabTitle: "Why organizations work with us",
    reasons: [
      { title: "Direct contact with engineers", description: "You work directly with the people who analyze, design, and build your systems. No handoff layers — just direct, substantive collaboration." },
      { title: "Technical decisions with a long-term vision", description: "Every technical choice is focused on scalability, maintainability, and transferability. No quick fixes that need to be rebuilt later." },
      { title: "Full transferability", description: "Systems are built logically and fully documented. You remain the owner of your automations and retain complete insight into how they work." },
      { title: "Security from day one", description: "Access control, logging, and data protection are integrated into the system design from the start — not added as an afterthought." },
    ],
    ctaTitle: "Want to speak directly with the engineers?",
    ctaDesc: "Schedule an Automation Scan and discuss your processes and automation opportunities with our team.",
    ctaBtn: "Schedule a technical consultation",
    sybFocus: "Technical delivery and AI integrations",
    sybDesc: "Syb builds scalable automation systems and AI integrations with a focus on code quality, performance, and maintainability. He translates architecture into stable implementations and ensures systems remain logical, extensible, and efficient over the long term.",
    semFocus: "System structure, AI, and data logic",
    semDesc: "Sem translates complex processes into clear system structures and oversees documentation, data logic, and transferability. He ensures oversight, clear planning, and consistent decision-making so implementations not only work but remain logical and manageable.",
  },
  nl: {
    seoTitle: "Autronis | Team — De Engineers Achter Jouw Automatisering",
    seoDesc: "Maak kennis met het Autronis-team. Wij zijn de engineers die jouw processen, systemen en datastromen structureel verbeteren.",
    aboutLabel: "Over Autronis",
    aboutTitle: "Van handmatig werk naar schaalbare systemen",
    aboutP1: "Veel groeiende bedrijven lopen vast met handmatige processen, losgekoppelde tools en spreadsheets die niet meer schalen.",
    aboutP2: "Autronis is opgericht met één doel: processen omzetten in betrouwbare systemen die automatisch draaien.",
    aboutP3: "We ontwerpen en implementeren automatiseringsstructuren waarin workflows, integraties en data samenkomen in één logisch geheel.",
    aboutP4: "Van AI-gestuurde workflows tot systeemintegraties en dashboards — wij bouwen de digitale infrastructuur die bedrijven nodig hebben om te blijven groeien.",
    aboutP5: "Geen losstaande automatiseringen, maar systemen die blijven werken naarmate je organisatie schaalt.",
    pillars: [
      { title: "Systemen", text: "Automatisering die processen structureert en schaalbaar maakt." },
      { title: "Integraties", text: "Systemen en software die naadloos samenwerken." },
      { title: "Data", text: "Inzicht, controle en rapportage op basis van betrouwbare data." },
    ],
    teamLabel: "Team",
    teamTitle: "Werk direct met de engineers die jouw systemen bouwen.",
    teamDesc: "Wij ontwerpen, bouwen en optimaliseren automatiseringen zelf. Je werkt direct met de engineers die verantwoordelijk zijn voor analyse, ontwikkeling en implementatie. Geen accountmanagers of tussenlagen — gewoon directe samenwerking met het team dat jouw systemen oplevert.",
    collabLabel: "Samenwerking",
    collabTitle: "Waarom organisaties met ons werken",
    reasons: [
      { title: "Direct contact met engineers", description: "Je werkt direct met de mensen die jouw systemen analyseren, ontwerpen en bouwen. Geen tussenlagen — gewoon directe, inhoudelijke samenwerking." },
      { title: "Technische keuzes met langetermijnvisie", description: "Elke technische keuze is gericht op schaalbaarheid, onderhoudbaarheid en overdraagbaarheid. Geen quick fixes die later opnieuw gebouwd moeten worden." },
      { title: "Volledige overdraagbaarheid", description: "Systemen zijn logisch opgebouwd en volledig gedocumenteerd. Jij blijft eigenaar van je automatiseringen en behoudt volledig inzicht in hoe ze werken." },
      { title: "Beveiliging vanaf dag één", description: "Toegangscontrole, logging en databescherming zijn vanaf het begin geïntegreerd in het systeemontwerp — niet achteraf toegevoegd." },
    ],
    ctaTitle: "Wil je direct met de engineers spreken?",
    ctaDesc: "Plan een Automation Scan en bespreek je processen en automatiseringsmogelijkheden met ons team.",
    ctaBtn: "Plan een technisch gesprek",
    sybFocus: "Technische oplevering en AI-integraties",
    sybDesc: "Syb bouwt schaalbare automatiseringssystemen en AI-integraties met focus op codekwaliteit, performance en onderhoudbaarheid. Hij vertaalt architectuur naar stabiele implementaties en zorgt dat systemen logisch, uitbreidbaar en efficiënt blijven op de lange termijn.",
    semFocus: "Systeemstructuur, AI en datalogica",
    semDesc: "Sem vertaalt complexe processen naar heldere systeemstructuren en bewaakt documentatie, datalogica en overdraagbaarheid. Hij zorgt voor overzicht, heldere planning en consistente besluitvorming zodat implementaties niet alleen werken, maar ook logisch en beheersbaar blijven.",
  },
};

const sectionEase = [0.16, 1, 0.3, 1] as const;

const WerkstandaardSection = ({ reasons, labels }: { reasons: typeof text.en.reasons; labels: { label: string; title: string } }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });
  const reasonIcons = [Users, Clock, Eye, Shield];

  return (
    <div ref={ref} className="max-w-2xl mx-auto mb-16 relative">
      <div className="werkstandaard-glow" />
      <div className="text-center mb-6">
        <motion.p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.5, ease: sectionEase }}>{labels.label}</motion.p>
        <motion.h2 className="text-xl font-bold" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6, ease: sectionEase }}>{labels.title}</motion.h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reasons.map((reason, i) => {
          const Icon = reasonIcons[i];
          return (
            <div key={reason.title} className="werkstandaard-card rounded-lg border border-border bg-card p-4 flex gap-3 items-start">
              <div className="werkstandaard-icon-wrap shrink-0 mt-0.5">
                <Icon size={20} className="text-primary shrink-0 relative z-10" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">{reason.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Team = () => {
  const lang = useLanguage();
  const t = text[lang];

  const team: TeamMember[] = [
    {
      name: "Syb Sprenkeler",
      role: "Automation Architect",
      subtitle: "Co-founder",
      photo: fotoSyb,
      priority: true,
      focusLabel: t.sybFocus,
      description: t.sybDesc,
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
      focusLabel: t.semFocus,
      description: t.semDesc,
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

  const pillarIcons = [Boxes, Cable, BarChart3];

  return (
    <>
      <SEOHead title={t.seoTitle} description={t.seoDesc} path="/team" />
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.aboutLabel}</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">{t.aboutTitle}</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>{t.aboutP1}</p><p>{t.aboutP2}</p><p>{t.aboutP3}</p><p>{t.aboutP4}</p><p>{t.aboutP5}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-8 max-w-lg mx-auto">
              {t.pillars.map((block, i) => {
                const Icon = pillarIcons[i];
                return (
                  <div key={block.title} className="rounded-lg border border-border bg-card p-3 text-center flex flex-col h-full transition-all duration-[280ms] ease-out cursor-default hover:scale-[1.05] hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_15px_hsl(174_78%_41%/0.25),0_0_30px_hsl(174_78%_41%/0.1),inset_0_0_15px_hsl(174_78%_41%/0.05)]">
                    <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary mb-2 mx-auto"><Icon size={14} /></div>
                    <p className="font-semibold text-xs mb-0.5">{block.title}</p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed flex-1">{block.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div id="team-section" className="scroll-mt-24" />
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.teamLabel}</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">{t.teamTitle}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.teamDesc}</p>
            </ScrollRevealItem>
          </ScrollReveal>

          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
            {team.map((member) => (
              <ScrollRevealItem key={member.name}><TeamCard member={member} /></ScrollRevealItem>
            ))}
          </ScrollReveal>

          <WerkstandaardSection reasons={t.reasons} labels={{ label: t.collabLabel, title: t.collabTitle }} />

          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <h2 className="text-2xl font-bold mb-3">{t.ctaTitle}</h2>
              <p className="text-muted-foreground mb-6">{t.ctaDesc}</p>
              <Button asChild size="lg" className="group/cta">
                <Link to="/book">{t.ctaBtn} <ArrowRight size={18} className="transition-transform duration-300 group-hover/cta:translate-x-1" /></Link>
              </Button>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Team;
