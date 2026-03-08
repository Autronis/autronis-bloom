import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import teamFoto from "@/assets/autronis_team_foto.png";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Team",
    title: "Ready to see how it works for your business?",
    desc: "Schedule a free consultation. We'll map your workflows, identify the quick wins and show you what the path to production looks like.",
    ctaBook: "Schedule an introduction",
    ctaTeam: "Meet our team",
  },
  nl: {
    label: "Team",
    title: "Klaar om te zien hoe het werkt voor jouw bedrijf?",
    desc: "Plan een gratis kennismaking. We brengen je workflows in kaart, identificeren de quick wins en laten zien hoe het pad naar productie eruitziet.",
    ctaBook: "Plan een kennismaking",
    ctaTeam: "Ontmoet ons team",
  },
};

const TeamBlock = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <section className="py-12 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <ScrollReveal>
            <ScrollRevealItem>
              <div>
                <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">{t.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">{t.desc}</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild size="lg"><Link to="/book">{t.ctaBook}<ArrowRight size={18} /></Link></Button>
                  <Button asChild size="lg" variant="outline" className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300"><Link to="/team">{t.ctaTeam}<ArrowRight size={18} /></Link></Button>
                </div>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
          <div>
            <div className="rounded-xl overflow-hidden">
              <img src={teamFoto} alt="Autronis team - Sem and Syb" width={800} height={600} className="w-full h-auto object-cover rounded-xl opacity-0 transition-opacity duration-700 ease-out" loading="lazy" decoding="async" onLoad={(e) => { (e.currentTarget as HTMLImageElement).classList.remove('opacity-0'); (e.currentTarget as HTMLImageElement).classList.add('opacity-100'); }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamBlock;
