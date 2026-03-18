// Layout is provided by App.tsx
import { Target, Shield, Users, Handshake } from "lucide-react";
import GlowCTA from "@/components/GlowCTA";
import SEOHead from "@/components/SEOHead";
import { useState, useEffect } from "react";
import fotoSyb from "@/assets/foto_syb.jpg";
import fotoSem from "@/assets/foto_sem.jpg";
import { useLanguage } from "@/i18n/context";

if (typeof window !== "undefined") {
  const sybPreload = new Image();
  sybPreload.src = fotoSyb;
}

const text = {
  en: {
    seoTitle: "Autronis | About Us — System Architecture & Automation",
    seoDesc: "Learn more about Autronis: our team, our values, and our mission to help businesses grow with scalable automation.",
    label: "About Us",
    title: "Systems that",
    titleHighlight: "come to life",
    intro1: "Autronis was founded with one mission: freeing businesses from repetitive manual work. We believe that every predictable process can be automated.",
    intro2: "We are Sem and Syb. You work directly with the builders — the people who design, build, and optimize your systems.",
    intro3: "Our team combines deep technical expertise with business insight. We don't build tools for the sake of building — we build solutions that deliver directly measurable impact on your operations.",
    valuesTitle: "Our values",
    teamTitle: "The team",
    ctaTitle: "Ready to work together?",
    ctaDesc: "Let's get acquainted and explore what we can automate.",
    ctaBtn: "Schedule Automation Scan",
    values: [
      { title: "Results-driven", description: "We measure success in saved hours, fewer errors, and faster processes — not in delivered features." },
      { title: "Transparent", description: "No hidden costs, no black boxes. You understand what we build and why. Everything is documented and transferable." },
      { title: "Personal", description: "No account managers, no middle layers. You work directly with the engineers who design and build your systems." },
      { title: "Long-term partnership", description: "We're not a vendor but your automation partner. Your growth is our growth — we think along, even after delivery." },
    ],
    team: [
      { name: "Syb Sprenkeler", role: "Co-founder", description: "Syb has a keen eye for technical detail and is the driving force behind the build. He always thinks one step ahead and ensures every system not only works but is also scalable and future-proof.", tags: ["API Design", "System Architecture", "Database Optimization", "Performance"] },
      { name: "Sem Gijsberts", role: "Co-founder", description: "Sem builds alongside, thinks ahead, and maintains oversight. From the first client conversation to the delivered system — he's involved in every step and makes sure nothing falls through the cracks.", tags: ["Client Strategy", "Integration Planning", "Automation Flows", "Project Management"] },
    ],
  },
  nl: {
    seoTitle: "Autronis | Over Ons — Systeemarchitectuur & Automatisering",
    seoDesc: "Leer meer over Autronis: ons team, onze waarden en onze missie om bedrijven te laten groeien met schaalbare automatisering.",
    label: "Over Ons",
    title: "Systemen die",
    titleHighlight: "tot leven komen",
    intro1: "Autronis is opgericht met één missie: bedrijven bevrijden van repetitief handmatig werk. Wij geloven dat elk voorspelbaar proces geautomatiseerd kan worden.",
    intro2: "Wij zijn Sem en Syb. Je werkt direct met de bouwers — de mensen die jouw systemen ontwerpen, bouwen en optimaliseren.",
    intro3: "Ons team combineert diepe technische expertise met zakelijk inzicht. We bouwen geen tools om te bouwen — we bouwen oplossingen die direct meetbare impact leveren op je bedrijfsvoering.",
    valuesTitle: "Onze waarden",
    teamTitle: "Het team",
    ctaTitle: "Klaar om samen te werken?",
    ctaDesc: "Laten we kennismaken en ontdekken wat we kunnen automatiseren.",
    ctaBtn: "Plan een Automation Scan",
    values: [
      { title: "Resultaatgericht", description: "We meten succes in bespaarde uren, minder fouten en snellere processen — niet in opgeleverde features." },
      { title: "Transparant", description: "Geen verborgen kosten, geen black boxes. Je begrijpt wat we bouwen en waarom. Alles is gedocumenteerd en overdraagbaar." },
      { title: "Persoonlijk", description: "Geen accountmanagers, geen tussenlagen. Je werkt direct met de engineers die jouw systemen ontwerpen en bouwen." },
      { title: "Langetermijnpartnerschap", description: "We zijn geen leverancier maar je automatiseringspartner. Jouw groei is onze groei — we denken mee, ook na oplevering." },
    ],
    team: [
      { name: "Syb Sprenkeler", role: "Co-founder", description: "Syb heeft een scherp oog voor technisch detail en is de drijvende kracht achter de bouw. Hij denkt altijd een stap vooruit en zorgt ervoor dat elk systeem niet alleen werkt maar ook schaalbaar en toekomstbestendig is.", tags: ["API Design", "Systeemarchitectuur", "Database Optimalisatie", "Performance"] },
      { name: "Sem Gijsberts", role: "Co-founder", description: "Sem bouwt mee, denkt vooruit en houdt overzicht. Van het eerste klantgesprek tot het opgeleverde systeem — hij is bij elke stap betrokken en zorgt dat er niets tussen wal en schip valt.", tags: ["Klantstrategie", "Integratieplanning", "Automatiseringsflows", "Projectmanagement"] },
    ],
  },
};

const valueIcons = [Target, Shield, Users, Handshake];
const photos = [fotoSyb, fotoSem];

const TeamCard = ({ member, photo }: { member: { name: string; role: string; description: string; tags?: string[]; priority?: boolean }; photo: string }) => {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.src = photo;
    if (img.complete) { setImageLoaded(true); return; }
    img.onload = () => { if (!cancelled) setImageLoaded(true); };
    img.onerror = () => { if (!cancelled) setImageLoaded(true); };
    return () => { cancelled = true; };
  }, [photo]);

  return (
    <div className="relative rounded-xl border border-border bg-card overflow-hidden group cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="aspect-[3/4] relative overflow-hidden">
        <img src={photo} alt={member.name} className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100 blur-0" : "opacity-80 blur-[2px]"}`} loading="lazy" decoding="async" onLoad={() => setImageLoaded(true)} onError={() => setImageLoaded(true)} />
        <div className={`absolute inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}>
          <p className="text-sm text-white leading-relaxed text-center">{member.description}</p>
        </div>
      </div>
      <div className="p-4 text-center">
        <p className="font-semibold">{member.name}</p>
        <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
        {member.tags && (
          <div className="flex flex-wrap justify-center gap-1">
            {member.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const About = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <>
      <SEOHead title={t.seoTitle} description={t.seoDesc} path="/about" />
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">{t.label}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">{t.title} <span className="text-gradient">{t.titleHighlight}</span></h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.intro1}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.intro2}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.intro3}</p>
          </div>
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">{t.valuesTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {t.values.map((v, i) => { const VIcon = valueIcons[i]; return (
                <div key={v.title} className="rounded-xl border border-border bg-card p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4"><VIcon size={20} /></div>
                  <h3 className="font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              ); })}
            </div>
          </div>
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">{t.teamTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
              {t.team.map((member, i) => <TeamCard key={member.name} member={member} photo={photos[i]} />)}
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">{t.ctaTitle}</h2>
            <p className="text-muted-foreground mb-6">{t.ctaDesc}</p>
            <GlowCTA to="/book">{t.ctaBtn}</GlowCTA>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
