import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Users, Target } from "lucide-react";

const values = [
  { icon: Target, title: "Resultaatgericht", description: "We meten succes in besparde uren, minder fouten en snellere processen — niet in opgeleverde features." },
  { icon: Zap, title: "Engineering-first", description: "Elke automatisering is gebouwd op solide architectuur, goed gedocumenteerd en schaalbaar." },
  { icon: Shield, title: "Transparant", description: "Geen verborgen kosten, geen black boxes. U begrijpt wat we bouwen en waarom." },
  { icon: Users, title: "Partnership", description: "Wij zijn geen leverancier maar uw automation partner. Uw succes is ons succes." },
];

const About = () => {
  return (
    <Layout>
      <section className="pt-16 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Intro */}
          <div className="max-w-3xl mb-20">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Over Ons</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Systemen die <span className="text-gradient">tot leven komen</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              AutronisGroup is opgericht met één missie: bedrijven bevrijden van repetitief handmatig werk. Wij geloven dat elk proces dat voorspelbaar is, geautomatiseerd kan worden.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ons team combineert diepgaande technische expertise met business-inzicht. We bouwen geen tools om het bouwen — we bouwen oplossingen die direct meetbaar impact leveren op uw operatie.
            </p>
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

          {/* Team placeholder */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Het team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Founder & CEO", "Lead Engineer", "Automation Architect", "Client Success"].map((role) => (
                <div key={role} className="rounded-xl border border-border bg-card p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-3" />
                  <p className="text-sm font-medium">Naam</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
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
