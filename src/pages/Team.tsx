import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Eye, Shield, Clock } from "lucide-react";
import React from "react";
import fotoSyb from "@/assets/foto_syb.jpg";
import fotoSem from "@/assets/foto_sem.jpg";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";
import TeamCard from "@/components/team/TeamCard";
import type { TeamMember } from "@/components/team/types";

const team: TeamMember[] = [
  {
    name: "Syb Sprenkeler",
    role: "Automatiseringsarchitect",
    subtitle: "Co-founder",
    photo: fotoSyb,
    focusLabel: "Technische realisatie & AI-integraties",
    description:
      "Syb bouwt schaalbare automatiseringssystemen en AI-integraties met focus op codekwaliteit, prestaties en onderhoudbaarheid. Van architectuur tot productie: hij levert stabiel, strak en meetbaar.",
    skills: [
      { label: "Architectuurontwerp", category: "arch" },
      { label: "Workflow-ontwerp", category: "arch" },
      { label: "Prestatie en schaalbaarheid", category: "arch" },
      { label: "AI-integraties", category: "ai" },
      { label: "API- en systeemintegraties", category: "ai" },
      { label: "Backendautomatisering", category: "ai" },
      { label: "Code-optimalisatie", category: "gov" },
      { label: "Technische documentatie", category: "gov" },
      { label: "Beveiliging vanaf ontwerp", category: "gov" },
    ],
    mail: "mailto:syb@autronis.com",
    linkedin: "https://www.linkedin.com/in/syb-sprenkeler-1b9b01323/",
  },
  {
    name: "Sem Gijsberts",
    role: "AI- en Systeemingenieur",
    subtitle: "Co-founder",
    photo: fotoSem,
    focusLabel: "Structuur, AI en systeemarchitectuur",
    description:
      "Sem vertaalt complexe processen naar heldere systeemstructuur. Hij bewaakt documentatie, datalogica en overdraagbaarheid — van ontwerp tot livegang. Sterk in planning, scope en beslissingen die later onderhoud besparen.",
    skills: [
      { label: "Systeemarchitectuur", category: "arch" },
      { label: "Workflow-ontwerp", category: "arch" },
      { label: "Procesmodellering", category: "arch" },
      { label: "AI-integraties", category: "ai" },
      { label: "Backendautomatisering", category: "ai" },
      { label: "Datagovernance", category: "gov" },
      { label: "Logging en monitoring", category: "gov" },
      { label: "Structuur en documentatie", category: "gov" },
      { label: "Beveiliging vanaf ontwerp", category: "gov" },
    ],
    mail: "mailto:sem@autronis.com",
    linkedin: "https://www.linkedin.com/in/sem-gijsberts-65ba543b3/",
  },
];

const directReasons = [
  { icon: Users, title: "Geen overdracht tussen sales en techniek", description: "De architect die ontwerpt, bouwt ook." },
  { icon: Clock, title: "Technische keuzes met lange termijnvisie", description: "Geen snelle oplossingen die later herschreven moeten worden." },
  { icon: Eye, title: "Volledige overdraagbaarheid", description: "Architectuur en documentatie zijn altijd inzichtelijk." },
  { icon: Shield, title: "Beveiliging vanaf dag één", description: "Geen systemen zonder logging, toegangsmodel en controle." },
];

const toolStack = ["OpenAI", "Supabase", "n8n", "Make", "Vercel", "AWS"];

const Team = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <AmbientLight />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Team</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Werk direct met de architecten achter uw systeem.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wij ontwerpen, bouwen en optimaliseren zelf. Geen accountmanagers, geen overdracht — alleen directe samenwerking met de engineers die verantwoordelijk zijn voor uw architectuur.
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

          <ScrollReveal className="max-w-2xl mx-auto mb-16">
            <ScrollRevealItem>
              <h2 className="text-xl font-bold mb-6">Waarom direct met ons werken?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {directReasons.map((reason) => (
                  <div key={reason.title} className="rounded-lg border border-border bg-card p-5 flex gap-4 items-start">
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

          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <h2 className="text-2xl font-bold mb-3">Wilt u direct met de architecten spreken?</h2>
              <p className="text-muted-foreground mb-6">Plan een kennismaking waarin we uw processen en automatiseringskansen technisch verkennen.</p>
              <Button asChild size="lg">
                <Link to="/book">Plan een technisch gesprek <ArrowRight size={18} /></Link>
              </Button>
            </ScrollRevealItem>
          </ScrollReveal>

          <div className="text-center">
            <p className="text-xs text-muted-foreground/60 tracking-wide">Gebouwd met: {toolStack.join(" · ")}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
