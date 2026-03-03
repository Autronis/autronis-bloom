import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import fotoSyb from "@/assets/foto_syb.jpg";
import fotoSem from "@/assets/foto_sem.jpg";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

const team = [
  {
    name: "Syb Sprenkeler",
    role: "Co-founder & Engineer",
    photo: fotoSyb,
    description:
      "Syb heeft een scherp oog voor technische details en is de drijvende kracht achter de bouw. Hij denkt altijd een stap verder en zorgt dat elk systeem niet alleen werkt maar ook schaalbaar en toekomstbestendig is.",
    skills: ["Automation Architect", "API Integraties", "Workflow Engineering", "Data-architectuur", "Performance optimalisatie"],
  },
  {
    name: "Sem Gijsberts",
    role: "Co-founder & Engineer",
    photo: fotoSem,
    description:
      "Sem bouwt mee, denkt vooruit en houdt overzicht. Van het eerste klantgesprek tot het opgeleverde systeem — hij is betrokken bij elke stap en zorgt dat niets tussen wal en schip valt.",
    skills: ["AI Integraties", "System Integrations", "Backend Automatisering", "Datastromen & Structuur", "Governance & Logging"],
  },
];

const toolStack = [
  "OpenAI", "Supabase", "n8n", "Make", "Vercel", "AWS", "Google Cloud",
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
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105 brightness-125"
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
                Werk met de mensen die het bouwen.
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Wij zijn geen doorgeefluik tussen accountmanagers en developers. U werkt
                direct met de engineers die uw systemen ontwerpen, bouwen en optimaliseren.
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

          {/* Hoe wij werken */}
          <ScrollReveal className="max-w-2xl mx-auto mb-16">
            <ScrollRevealItem>
              <h2 className="text-xl font-bold mb-5">Hoe wij werken</h2>
              <ul className="space-y-2.5">
                {[
                  "Direct contact met engineers",
                  "Geen accountmanager tussenlaag",
                  "Technische diepgang vanaf dag één",
                  "Transparante architectuurkeuzes",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/90">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal className="text-center mb-12">
            <ScrollRevealItem>
              <h2 className="text-2xl font-bold mb-3">Klaar om samen te werken?</h2>
              <p className="text-muted-foreground mb-6">
                Laten we kennismaken en kijken hoe we uw processen kunnen verbeteren.
              </p>
              <Button asChild size="lg">
                <Link to="/book">
                  Plan een kennismaking <ArrowRight size={18} />
                </Link>
              </Button>
            </ScrollRevealItem>
          </ScrollReveal>

          {/* Credibility line */}
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
