import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import fotoSyb from "@/assets/foto_syb.jpg";
import fotoSem from "@/assets/foto_sem.jpg";


const team = [
  {
    name: "Syb Sprenkeler",
    role: "Co-founder & Engineer",
    photo: fotoSyb,
    description:
      "Syb heeft een scherp oog voor technische details en is de drijvende kracht achter de bouw. Hij denkt altijd een stap verder en zorgt dat elk systeem niet alleen werkt maar ook schaalbaar en toekomstbestendig is.",
  },
  {
    name: "Sem Gijsberts",
    role: "Co-founder & Engineer",
    photo: fotoSem,
    description:
      "Sem bouwt mee, denkt vooruit en houdt overzicht. Van het eerste klantgesprek tot het opgeleverde systeem — hij is betrokken bij elke stap en zorgt dat niets tussen wal en schip valt.",
  },
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
        <p className="text-sm text-muted-foreground">{member.role}</p>
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
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
          </div>


          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-20">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">Klaar om samen te werken?</h2>
            <p className="text-muted-foreground mb-6">
              Laten we kennismaken en kijken hoe we uw processen kunnen verbeteren.
            </p>
            <Button asChild size="lg">
              <Link to="/book">
                Plan een kennismaking <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
