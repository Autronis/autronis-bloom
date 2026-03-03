import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Eye, Shield, Clock } from "lucide-react";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
      "Syb realiseert schaalbare automatiseringssystemen en AI-integraties met nadruk op codekwaliteit, prestaties en onderhoudbaarheid. Hij vertaalt architectuur naar stabiele implementaties en zorgt dat systemen ook op lange termijn logisch, uitbreidbaar en efficiënt blijven functioneren.",
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
    focusLabel: "Structuur, AI en systeemlogica",
    description:
      "Sem vertaalt complexe processen naar heldere systeemstructuur en bewaakt documentatie, datalogica en overdraagbaarheid. Hij zorgt voor overzicht, duidelijke planning en consistente besluitvorming — zodat implementaties niet alleen werken, maar ook begrijpelijk en beheersbaar blijven.",
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
  { icon: Users, title: "Direct contact met engineers", description: "U werkt direct met de mensen die uw systemen ontwerpen en bouwen. Geen overdracht, geen ruis — alleen inhoudelijke samenwerking." },
  { icon: Clock, title: "Technische keuzes met lange termijnvisie", description: "Elke beslissing is gericht op schaalbaarheid, onderhoudbaarheid en overdraagbaarheid. Geen snelle oplossingen die later herschreven moeten worden." },
  { icon: Eye, title: "Volledige overdraagbaarheid", description: "Systemen zijn logisch opgebouwd, volledig gedocumenteerd en inzichtelijk. U blijft eigenaar van uw automatisering." },
  { icon: Shield, title: "Beveiliging vanaf dag één", description: "Toegangsmodellen, logging en databeheer zijn standaard geïntegreerd — niet achteraf toegevoegd." },
];

const toolCategories = [
  {
    label: "AI & LLM",
    tools: [
      { name: "OpenAI", logo: "/logos/openai.svg" },
      { name: "Anthropic", logo: "/logos/anthropic.svg" },
      { name: "Azure OpenAI", logo: "/logos/azure.svg" },
      { name: "LangChain", logo: "/logos/langchain.svg", dark: true },
      { name: "Pinecone", logo: "/logos/pinecone.svg" },
    ],
  },
  {
    label: "Automatisering & Workflow",
    tools: [
      { name: "n8n", logo: "/logos/n8n.svg" },
      { name: "Make", logo: "/logos/make.svg" },
      { name: "Zapier", logo: "/logos/zapier.svg" },
      { name: "Retool", logo: "/logos/retool.svg" },
    ],
  },
  {
    label: "Data & Database",
    tools: [
      { name: "Supabase", logo: "/logos/supabase.svg" },
      { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
      { name: "Firebase", logo: "/logos/firebase.svg" },
      { name: "Airtable", logo: "/logos/airtable.svg" },
      { name: "MongoDB", logo: "/logos/mongodb.svg" },
      { name: "MySQL", logo: "/logos/mysql.svg" },
    ],
  },
  {
    label: "Hosting & Infra",
    tools: [
      { name: "Vercel", logo: "/logos/vercel.svg" },
      { name: "AWS", logo: "/logos/aws.svg" },
      { name: "Cloudflare", logo: "/logos/cloudflare.svg" },
      { name: "Microsoft Azure", logo: "/logos/azure.svg" },
    ],
  },
  {
    label: "CRM & Sales",
    tools: [
      { name: "HubSpot", logo: "/logos/hubspot.svg" },
      { name: "Pipedrive", logo: "/logos/pipedrive.svg" },
      { name: "Salesforce", logo: "/logos/salesforce.svg" },
    ],
  },
  {
    label: "Productivity & Collaboration",
    tools: [
      { name: "Notion", logo: "/logos/notion.svg", dark: true },
      { name: "Google Workspace", logo: "/logos/google-workspace.svg" },
      { name: "Microsoft 365", logo: "/logos/microsoft-365.svg" },
      { name: "Slack", logo: "/logos/slack.svg" },
    ],
  },
  {
    label: "E-commerce",
    tools: [
      { name: "Shopify", logo: "/logos/shopify.svg" },
      { name: "WooCommerce", logo: "/logos/woocommerce.svg" },
      { name: "Magento", logo: "/logos/magento.svg" },
    ],
  },
  {
    label: "Payments",
    tools: [
      { name: "Stripe", logo: "/logos/stripe.svg" },
      { name: "Mollie", logo: "/logos/mollie.svg" },
      { name: "PayPal", logo: "/logos/paypal.svg" },
    ],
  },
  {
    label: "Analytics & Reporting",
    tools: [
      { name: "Looker Studio", logo: "/logos/looker-studio.svg" },
      { name: "Power BI", logo: "/logos/power-bi.svg" },
      { name: "Google Analytics", logo: "/logos/google-analytics.svg" },
    ],
  },
  {
    label: "Monitoring & Reliability",
    tools: [
      { name: "Sentry", logo: "/logos/sentry.svg" },
      { name: "Datadog", logo: "/logos/datadog.svg" },
    ],
  },
];

const sectionEase = [0.16, 1, 0.3, 1] as const;

const WerkstandaardSection = ({ reasons }: { reasons: typeof directReasons }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.25 });

  return (
    <div ref={ref} className="max-w-2xl mx-auto mb-16 relative">
      {/* Parallax background glow */}
      <div className="werkstandaard-glow" />

      <motion.h2
        className="text-xl font-bold mb-1"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: sectionEase }}
      >
        Waarom direct met ons werken?
      </motion.h2>

      <div className="mb-6" />

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

          <WerkstandaardSection reasons={directReasons} />

          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <h2 className="text-2xl font-bold mb-3">Wilt u direct met de architecten spreken?</h2>
              <p className="text-muted-foreground mb-6">Plan een kennismaking waarin we uw processen en automatiseringskansen technisch verkennen.</p>
              <Button asChild size="lg" className="group/cta">
                <Link to="/book">
                  Plan een technisch gesprek
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                </Link>
              </Button>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* Toolstack */}
          <div className="max-w-4xl mx-auto">
            <ScrollReveal className="text-center mb-8">
              <ScrollRevealItem>
                <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Toolstack</p>
                <h2 className="text-xl font-bold">Technologieën waar wij mee werken</h2>
              </ScrollRevealItem>
            </ScrollReveal>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {toolCategories.map((cat) => (
                <div key={cat.label} className="space-y-2">
                  <p className="text-[10px] font-semibold tracking-widest uppercase text-primary/70 px-1">{cat.label}</p>
                  <div className="space-y-1">
                    {cat.tools.map((tool) => (
                      <div key={tool.name} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-card hover:border-primary/20 border border-transparent transition-all duration-200">
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className={`w-4 h-4 object-contain ${tool.dark ? 'dark:brightness-0 dark:invert' : ''}`}
                          loading="lazy"
                        />
                        <span className="text-xs text-muted-foreground">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
