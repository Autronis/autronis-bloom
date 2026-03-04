import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Eye, Shield, Clock } from "lucide-react";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import fotoSyb from "@/assets/foto_syb.jpg";
import fotoSem from "@/assets/foto_sem.jpg";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

import TeamCard from "@/components/team/TeamCard";
import type { TeamMember } from "@/components/team/types";

const team: TeamMember[] = [
  {
    name: "Syb Sprenkeler",
    role: "Automatiseringsarchitect",
    subtitle: "Co-founder",
    photo: fotoSyb,
    focusLabel: "Technische realisatie en AI-integraties",
    description:
      "Syb realiseert schaalbare automatiseringssystemen en AI-integraties met nadruk op codekwaliteit, prestaties en onderhoudbaarheid. Hij vertaalt architectuur naar stabiele implementaties en zorgt dat systemen ook op lange termijn logisch, uitbreidbaar en efficiënt blijven functioneren.",
    skills: [
      { label: "Workflow-ontwerp", category: "arch" },
      { label: "Integratielogica", category: "arch" },
      { label: "Automatiseringsflows", category: "arch" },
      { label: "AI-integraties", category: "ai" },
      { label: "API- en systeemintegraties", category: "ai" },
      { label: "Backendautomatisering", category: "ai" },
      { label: "Performance-optimalisatie", category: "gov" },
      { label: "Logging en monitoring", category: "gov" },
      { label: "Technische documentatie", category: "gov" },
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
      { label: "Systeemstructuur", category: "arch" },
      { label: "Workflow-ontwerp", category: "arch" },
      { label: "Procesmodellering", category: "arch" },
      { label: "AI-integraties", category: "ai" },
      { label: "Data- en systeemlogica", category: "ai" },
      { label: "Backendautomatisering", category: "ai" },
      { label: "Datagovernance", category: "gov" },
      { label: "Logging en monitoring", category: "gov" },
      { label: "Structuur en documentatie", category: "gov" },
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
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Team</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Werk direct met de engineers die uw systemen bouwen.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
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
    </Layout>
  );
};

export default Team;
