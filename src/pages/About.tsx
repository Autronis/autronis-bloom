import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Target, Shield, Users, Handshake, Boxes, Cable, BarChart3 } from "lucide-react";

import { useState } from "react";
import fotoSyb from "@/assets/foto_syb.jpg";
import fotoSem from "@/assets/foto_sem.jpg";

const values = [
  { icon: Target, title: "Resultaatgericht", description: "We meten succes in bespaarde uren, minder fouten en snellere processen — niet in opgeleverde features." },
  { icon: Shield, title: "Transparant", description: "Geen verborgen kosten, geen black boxes. U begrijpt wat we bouwen en waarom. Alles is gedocumenteerd en overdraagbaar." },
  { icon: Users, title: "Persoonlijk", description: "Geen accountmanagers, geen tussenlagen. U werkt direct met de engineers die uw systemen ontwerpen en bouwen." },
  { icon: Handshake, title: "Langetermijn partnership", description: "Wij zijn geen leverancier maar uw automation partner. Uw groei is onze groei — we denken mee, ook na oplevering." },
];

const team = [
  {
    name: "Syb Sprenkeler",
    role: "Co-founder",
    photo: fotoSyb,
    description: "Syb heeft een scherp oog voor technische details en is de drijvende kracht achter de bouw. Hij denkt altijd een stap verder en zorgt dat elk systeem niet alleen werkt maar ook schaalbaar en toekomstbestendig is.",
  },
  {
    name: "Sem Gijsberts",
    role: "Co-founder",
    photo: fotoSem,
    description: "Sem bouwt mee, denkt vooruit en houdt overzicht. Van het eerste klantgesprek tot het opgeleverde systeem — hij is betrokken bij elke stap en zorgt dat niets tussen wal en schip valt.",
  },
];

const TeamCard = ({ member }: { member: typeof team[0] }) => {
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
          className={`absolute inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm text-white leading-relaxed text-center">
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

const About = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* Over Autronis */}
          <div className="max-w-3xl mx-auto mb-20">
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">Over Autronis</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-8 leading-tight">
              Van handmatig werk naar schaalbare systemen
            </h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Veel groeiende bedrijven lopen vast in handmatige processen, losse tools en spreadsheets die niet meer schaalbaar zijn.
              </p>
              <p>
                Autronis is opgericht met één doel: processen omzetten in betrouwbare systemen die automatisch draaien.
              </p>
              <p>
                We ontwerpen en implementeren automatiseringsstructuren waarin workflows, integraties en data samenkomen in één logisch geheel.
              </p>
              <p>
                Van AI-gestuurde workflows tot systeemintegraties en dashboards: wij bouwen de digitale infrastructuur waarop bedrijven kunnen doorgroeien.
              </p>
              <p>
                Geen losse automatiseringen, maar systemen die blijven werken wanneer uw organisatie groeit.
              </p>
            </div>

            {/* Concept blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {[
                { icon: Boxes, title: "Systemen", text: "Automatisering die processen structureert en schaalbaar maakt." },
                { icon: Cable, title: "Integraties", text: "Systemen en software die naadloos met elkaar samenwerken." },
                { icon: BarChart3, title: "Data", text: "Inzicht, controle en rapportages op basis van betrouwbare data." },
              ].map((block) => (
                <div key={block.title} className="rounded-xl border border-border bg-card p-5">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <block.icon size={18} />
                  </div>
                  <p className="font-semibold text-sm mb-1">{block.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{block.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Onze waarden</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <v.icon size={20} />
                  </div>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Het team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {team.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">Klaar om samen te werken?</h2>
            <p className="text-muted-foreground mb-6">Laten we kennismaken en kijken wat we kunnen automatiseren.</p>
            <Button asChild size="lg">
              <Link to="/book">Plan Automation Scan <ArrowRight size={18} /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
