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
    role: "Automatiseringsarchitect",
    subtitle: "Co-founder",
    photo: fotoSyb,
    priority: true,
    focusLabel: "Technische realisatie en AI-integraties",
    description:
      "Syb realiseert schaalbare automatiseringssystemen en AI-integraties met nadruk op codekwaliteit, prestaties en onderhoudbaarheid. Hij vertaalt architectuur naar stabiele implementaties en zorgt dat systemen ook op lange termijn logisch, uitbreidbaar en efficiënt blijven functioneren.",
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
    role: "AI- en Systeemingenieur",
    subtitle: "Co-founder",
    photo: fotoSem,
    focusLabel: "Systeemstructuur, AI en datalogica",
    description:
      "Sem vertaalt complexe processen naar duidelijke systeemstructuren en bewaakt documentatie, datalogica en overdraagbaarheid. Hij zorgt voor overzicht, duidelijke planning en consistente besluitvorming, zodat implementaties niet alleen werken, maar ook logisch en beheersbaar blijven.",
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
  { icon: Users, title: "Direct contact met engineers", description: "U werkt direct met de mensen die uw systemen analyseren, ontwerpen en bouwen. Geen overdrachtslagen, maar directe en inhoudelijke samenwerking." },
  { icon: Clock, title: "Technische keuzes met lange termijnvisie", description: "Elke technische keuze is gericht op schaalbaarheid, onderhoudbaarheid en overdraagbaarheid. Geen snelle oplossingen die later opnieuw gebouwd moeten worden." },
  { icon: Eye, title: "Volledige overdraagbaarheid", description: "Systemen worden logisch opgebouwd en volledig gedocumenteerd. U blijft eigenaar van uw automatiseringen en behoudt volledig inzicht in de werking." },
  { icon: Shield, title: "Beveiliging vanaf dag één", description: "Toegangsbeheer, logging en databescherming worden vanaf het begin geïntegreerd in het systeemontwerp, niet achteraf toegevoegd." },
];


const sectionEase = [0.16, 1, 0.3, 1] as const;

const WerkstandaardSection = ({ reasons }: { reasons: typeof directReasons }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });

  return (
    <div ref={ref} className="max-w-2xl mx-auto mb-16 relative">
      {/* Parallax background glow */}
      <div className="werkstandaard-glow" />

      <div className="text-center mb-6">
        <motion.p
          className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: sectionEase }}
        >
          Samenwerking
        </motion.p>
        <motion.h2
          className="text-xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: sectionEase }}
        >
          Waarom organisaties met ons werken
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
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Over Autronis */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Over Autronis</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">
              Van handmatig werk naar schaalbare systemen
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>Veel groeiende bedrijven lopen vast in handmatige processen, losse tools en spreadsheets die niet meer schaalbaar zijn.</p>
              <p>Autronis is opgericht met één doel: processen omzetten in betrouwbare systemen die automatisch draaien.</p>
              <p>We ontwerpen en implementeren automatiseringsstructuren waarin workflows, integraties en data samenkomen in één logisch geheel.</p>
              <p>Van AI-gestuurde workflows tot systeemintegraties en dashboards: wij bouwen de digitale infrastructuur waarop bedrijven kunnen doorgroeien.</p>
              <p>Geen losse automatiseringen, maar systemen die blijven werken wanneer uw organisatie groeit.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-8 max-w-lg mx-auto">
              {[
                { icon: Boxes, title: "Systemen", text: "Automatisering die processen structureert en schaalbaar maakt." },
                { icon: Cable, title: "Integraties", text: "Systemen en software die naadloos met elkaar samenwerken." },
                { icon: BarChart3, title: "Data", text: "Inzicht, controle en rapportages op basis van betrouwbare data." },
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
                Werk direct met de engineers die uw systemen bouwen.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wij ontwerpen, bouwen en optimaliseren automatiseringen zelf. U werkt direct samen met de engineers die verantwoordelijk zijn voor analyse, ontwikkeling en implementatie. Geen accountmanagers of overdrachtslagen, maar directe samenwerking met het team dat uw systemen realiseert.
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
              <h2 className="text-2xl font-bold mb-3">Wilt u direct met de engineers spreken?</h2>
              <p className="text-muted-foreground mb-6">Plan een Automation Scan en bespreek uw processen en automatiseringsmogelijkheden met ons team.</p>
              <Button asChild size="lg" className="group/cta">
                <Link to="/book">
                  Plan een technisch gesprek
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
