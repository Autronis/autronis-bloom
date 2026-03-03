import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Eye, Shield, Clock } from "lucide-react";
import { useState } from "react";
import fotoSyb from "@/assets/foto_syb.jpg";
import fotoSem from "@/assets/foto_sem.jpg";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

const team = [
  {
    name: "Syb Sprenkeler",
    role: "Automation Architect",
    photo: fotoSyb,
    description:
      "Syb ontwerpt schaalbare automatiseringsarchitecturen en vertaalt bedrijfsprocessen naar robuuste, onderhoudbare systemen. Hij bewaakt structuur, performance en technische consistentie van analyse tot livegang.",
    skills: [
      "Architectuurontwerp",
      "API & systeemintegraties",
      "Workflow engineering",
      "Performance & schaalbaarheid",
      "Technische documentatie",
    ],
  },
  {
    name: "Sem Gijsberts",
    role: "AI & Systems Engineer",
    photo: fotoSem,
    description:
      "Sem realiseert AI-integraties en backend-automatisering met focus op datastromen, governance en betrouwbaarheid. Van API-koppelingen tot logging en monitoring — elk systeem wordt gebouwd met controle als uitgangspunt.",
    skills: [
      "AI-integraties",
      "Backend automatisering",
      "Datagovernance",
      "Logging & monitoring",
      "Security by design",
    ],
  },
];

const directReasons = [
  {
    icon: Users,
    title: "Geen overdracht tussen sales en techniek",
    description: "De architect die ontwerpt, bouwt ook.",
  },
  {
    icon: Clock,
    title: "Technische keuzes met lange termijnvisie",
    description: "Geen snelle oplossingen die later herschreven moeten worden.",
  },
  {
    icon: Eye,
    title: "Volledige overdraagbaarheid",
    description: "Architectuur en documentatie zijn altijd inzichtelijk.",
  },
  {
    icon: Shield,
    title: "Beveiliging vanaf dag één",
    description: "Geen systemen zonder logging, toegangsmodel en controle.",
  },
];

const toolStack = [
  "OpenAI", "Supabase", "n8n", "Make", "Vercel", "AWS",
];

const TeamCard = ({ member }: { member: (typeof team)[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-xl border border-border bg-card overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        {/* Inverse vignette: brightens edges (bricks), keeps center (person) natural */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 50% 60% at 50% 35%, transparent 0%, hsl(0 0% 100% / 0.10) 100%)",
          }}
        />
        <div
          className={`absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-6 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm text-foreground leading-relaxed text-center">
            {member.description}
          </p>
        </div>
      </div>
      <div className="p-4 text-center">
        <p className="font-semibold">{member.name}</p>
        <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="text-[11px] px-2.5 py-1 rounded-full border border-border text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
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
          {/* Hero */}
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <ScrollRevealItem>
              <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
                Team
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Werk direct met de architecten achter uw systeem.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wij ontwerpen, bouwen en optimaliseren zelf. Geen accountmanagers,
                geen overdracht — alleen directe samenwerking met de engineers die
                verantwoordelijk zijn voor uw architectuur.
              </p>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* Cards */}
          <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-16">
            {team.map((member) => (
              <ScrollRevealItem key={member.name}>
                <TeamCard member={member} />
              </ScrollRevealItem>
            ))}
          </ScrollReveal>

          {/* Waarom direct met ons werken */}
          <ScrollReveal className="max-w-2xl mx-auto mb-16">
            <ScrollRevealItem>
              <h2 className="text-xl font-bold mb-6">Waarom direct met ons werken?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {directReasons.map((reason) => (
                  <div
                    key={reason.title}
                    className="rounded-lg border border-border bg-card p-5 flex gap-4 items-start"
                  >
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

          {/* CTA */}
          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <h2 className="text-2xl font-bold mb-3">
                Wilt u direct met de architecten spreken?
              </h2>
              <p className="text-muted-foreground mb-6">
                Plan een kennismaking waarin we uw processen en automatiseringskansen
                technisch verkennen.
              </p>
              <Button asChild size="lg">
                <Link to="/book">
                  Plan een technisch gesprek <ArrowRight size={18} />
                </Link>
              </Button>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* Credibility strip */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground/60 tracking-wide">
              Gebouwd met: {toolStack.join(" · ")}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
