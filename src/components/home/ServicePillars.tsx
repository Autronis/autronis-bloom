import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Cog, Link2, PieChart, Globe, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import useCanHover from "@/hooks/use-can-hover";
import { useLanguage } from "@/i18n/context";

import { ProcessAutomationVisual, SystemIntegrationVisual, DataReportingVisual, WebDesignVisual } from "@/components/home/AnimatedServiceVisuals";

const txt = {
  en: {
    label: "Services",
    title: "Four pillars. One integrated system.",
    desc: "We combine process automation, system integrations, data insights and web design into a scalable architecture.",
    ctaBtn: "View our services",
    ctaSub: "Discover how we structurally improve your processes, systems and data insights.",
    whatDeliver: "What does this deliver?",
    learnMore: "Learn more about",
    securityNote: "Including access control, logging and a transferable architecture.",
    securityLink: "View our Security Approach",
    services: [
      { title: "Process Automation", slug: "process-automation", intro: "We automate recurring processes so work can continue without manual steps.", impact: [{ title: "Less manual processing", sub: "Up to 70% less time spent on repetitive tasks." }, { title: "Fewer errors", sub: "Standardized workflows ensure consistent execution." }, { title: "Faster turnaround times", sub: "Approvals and escalations run automatically." }, { title: "Scalability", sub: "Processes can grow without staffing costs increasing proportionally." }] },
      { title: "System Integrations", slug: "system-integrations", intro: "We connect systems via APIs so data is exchanged automatically and consistently.", impact: [{ title: "Consistent data flows", sub: "Core systems work with the same up-to-date information." }, { title: "No double entry", sub: "Data is entered once and automatically synchronized." }, { title: "Real-time synchronization", sub: "Data is updated instantly without exports or manual files." }, { title: "Reliable monitoring", sub: "Errors are detected early and logged." }] },
      { title: "Data & Reporting", slug: "data-reporting", intro: "Real-time dashboards and automated reports provide continuous insight into performance and processes.", impact: [{ title: "Instant performance insight", sub: "Dashboards show current KPIs and trends." }, { title: "Automated reports", sub: "Reports are automatically generated and distributed." }, { title: "Single source of truth", sub: "All teams work with the same consistent data." }, { title: "Quick anomaly detection", sub: "Issues and anomalies become visible early." }] },
      { title: "Webdesign & Development", slug: "webdesign", intro: "We design and build modern, fast websites that convert visitors into customers.", impact: [{ title: "Custom design", sub: "Unique design tailored to your brand — no templates." }, { title: "Lightning fast", sub: "Optimized performance for the best user experience and SEO." }, { title: "Conversion-focused", sub: "Strategic layout and CTAs that drive results." }, { title: "Fully responsive", sub: "Perfect on every device — mobile, tablet and desktop." }] },
    ],
  },
  nl: {
    label: "Diensten",
    title: "Vier pijlers. Eén geïntegreerd systeem.",
    desc: "We combineren procesautomatisering, systeemintegraties, data-inzichten en webdesign in een schaalbare architectuur.",
    ctaBtn: "Bekijk onze diensten",
    ctaSub: "Ontdek hoe we jouw processen, systemen en data-inzichten structureel verbeteren.",
    whatDeliver: "Wat levert dit op?",
    learnMore: "Meer over",
    securityNote: "Inclusief toegangscontrole, logging en een overdraagbare architectuur.",
    securityLink: "Bekijk onze beveiligingsaanpak",
    services: [
      { title: "Procesautomatisering", slug: "process-automation", intro: "We automatiseren terugkerende processen zodat werk doorgaat zonder handmatige stappen.", impact: [{ title: "Minder handmatige verwerking", sub: "Tot 70% minder tijd aan repetitieve taken." }, { title: "Minder fouten", sub: "Gestandaardiseerde workflows zorgen voor consistente uitvoering." }, { title: "Snellere doorlooptijden", sub: "Goedkeuringen en escalaties lopen automatisch." }, { title: "Schaalbaarheid", sub: "Processen kunnen groeien zonder dat personeelskosten evenredig stijgen." }] },
      { title: "Systeemintegraties", slug: "system-integrations", intro: "We koppelen systemen via API's zodat data automatisch en consistent wordt uitgewisseld.", impact: [{ title: "Consistente datastromen", sub: "Kernsystemen werken met dezelfde actuele informatie." }, { title: "Geen dubbele invoer", sub: "Data wordt eenmaal ingevoerd en automatisch gesynchroniseerd." }, { title: "Realtime synchronisatie", sub: "Data wordt direct bijgewerkt zonder exports of handmatige bestanden." }, { title: "Betrouwbare monitoring", sub: "Fouten worden vroeg gedetecteerd en gelogd." }] },
      { title: "Data & Rapportage", slug: "data-reporting", intro: "Realtime dashboards en geautomatiseerde rapporten bieden continu inzicht in prestaties en processen.", impact: [{ title: "Direct prestatie-inzicht", sub: "Dashboards tonen actuele KPI's en trends." }, { title: "Geautomatiseerde rapporten", sub: "Rapporten worden automatisch gegenereerd en verspreid." }, { title: "Single source of truth", sub: "Alle teams werken met dezelfde consistente data." }, { title: "Snelle anomaliedetectie", sub: "Problemen en afwijkingen worden vroeg zichtbaar." }] },
      { title: "Webdesign & Development", slug: "webdesign", intro: "Wij ontwerpen en bouwen moderne, snelle websites die bezoekers omzetten in klanten.", impact: [{ title: "Custom design", sub: "Uniek ontwerp op maat van jouw merk — geen templates." }, { title: "Razendsnel", sub: "Geoptimaliseerde performance voor de beste gebruikerservaring en SEO." }, { title: "Conversiegeright", sub: "Strategische layout en CTA's die resultaat opleveren." }, { title: "Volledig responsive", sub: "Perfect op elk apparaat — mobiel, tablet en desktop." }] },
    ],
  },
};

const serviceIcons = [Cog, Link2, PieChart, Globe];
const serviceVisuals = [ProcessAutomationVisual, SystemIntegrationVisual, DataReportingVisual, WebDesignVisual];

const ServiceCard = ({ s, i, hoveredIndex, setHoveredIndex, canHover, whatDeliver, learnMore, securityNote, securityLink }: {
  s: typeof txt.en.services[0]; i: number; hoveredIndex: number | null; setHoveredIndex: (i: number | null) => void; canHover: boolean; whatDeliver: string; learnMore: string; securityNote: string; securityLink: string;
}) => {
  const isEven = i % 2 === 0;
  const isHovered = canHover && hoveredIndex === i;
  const Icon = serviceIcons[i];

  return (
    <ScrollReveal key={s.title}><ScrollRevealItem>
      <div className="group/card rounded-xl border border-border bg-gradient-to-br from-primary/[0.06] to-card transition-all duration-200 ease-out overflow-hidden" style={{ borderColor: isHovered ? "hsl(var(--primary) / 0.5)" : undefined, boxShadow: isHovered ? "0 0 20px hsl(174 78% 41% / 0.12)" : "none" }} onMouseEnter={canHover ? () => setHoveredIndex(i) : undefined} onMouseLeave={canHover ? () => setHoveredIndex(null) : undefined}>
        <div className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-start md:items-center gap-0`}>
          <div className="flex-1 px-4 py-5 sm:px-5 sm:py-10 flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-1"><div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0"><Icon size={18} /></div><h3 className="text-lg sm:text-2xl font-bold">{s.title}</h3></div>
            <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{s.intro}</p>
            <div className="mb-2">
              <p className="text-xs font-semibold text-primary mb-1.5 tracking-widest uppercase">{whatDeliver}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {s.impact.map((item) => (
                  <div key={item.title} className="flex items-start gap-2 p-2 sm:p-2.5 rounded-lg bg-gradient-to-br from-primary/[0.06] to-card border border-border transition-all duration-200 ease-out group cursor-default md:hover:scale-[1.03] md:hover:border-primary/50">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors"><CheckCircle2 size={12} className="text-primary" /></div>
                    <div><p className="text-sm font-semibold text-foreground leading-tight">{item.title}</p><p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <Button asChild variant="link" size="sm" className="self-start text-primary px-0 hover:no-underline"><Link to={`/services#${s.slug}`}>{learnMore} {s.title} <ArrowRight size={14} /></Link></Button>
            <div className="mt-2 pt-1.5 border-t border-border/30">
              <p className="text-[11px] text-muted-foreground/80 leading-relaxed">{securityNote}</p>
              <a href="#security" className="group inline-flex items-center gap-1 text-[11px] text-foreground/70 hover:text-primary/70 transition-colors mt-1">{securityLink}<ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-1" /></a>
            </div>
          </div>
          <div className="w-full md:flex-1 relative overflow-hidden bg-transparent flex items-center justify-center min-h-[180px] md:min-h-0 aspect-[4/3] md:aspect-auto md:self-stretch">
            {(() => { const Visual = serviceVisuals[i]; return <Visual />; })()}
          </div>
        </div>
      </div>
    </ScrollRevealItem></ScrollReveal>
  );
};

const ServicePillars = () => {
  const lang = useLanguage();
  const t = txt[lang];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const canHover = useCanHover();

  return (
    <section className="py-10 sm:py-24 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-6 sm:mb-16"><ScrollRevealItem>
          <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">{t.label}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t.title}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">{t.desc}</p>
        </ScrollRevealItem></ScrollReveal>

        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12 max-w-5xl mx-auto">
          {t.services.map((s, i) => <ServiceCard key={s.title} s={s} i={i} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} canHover={canHover} whatDeliver={t.whatDeliver} learnMore={t.learnMore} securityNote={t.securityNote} securityLink={t.securityLink} />)}
        </div>

        <ScrollReveal className="text-center"><ScrollRevealItem>
          <Button asChild size="lg" className="w-full sm:w-auto"><Link to="/services">{t.ctaBtn} <ArrowRight size={18} /></Link></Button>
          <p className="text-xs text-muted-foreground mt-3">{t.ctaSub}</p>
        </ScrollRevealItem></ScrollReveal>
      </div>
    </section>
  );
};

export default ServicePillars;
