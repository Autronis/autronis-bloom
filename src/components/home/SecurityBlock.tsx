import { Shield, Lock, Globe, Database, Award, KeyRound, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import AmbientLight from "@/components/AmbientLight";

const features = [
  {
    icon: Lock,
    title: "End-to-end versleuteling",
    description:
      "Alle data wordt versleuteld tijdens transport (TLS 1.2+) en bij opslag (AES-256). Gegevens zijn niet leesbaar voor onbevoegden.",
  },
  {
    icon: Globe,
    title: "EU dataopslag mogelijk",
    description:
      "Verwerking en opslag binnen de EU waar mogelijk, op Europese servers en datacenters.",
  },
  {
    icon: Database,
    title: "Geen training op uw data",
    description:
      "Wij gebruiken uitsluitend enterprise API's zonder dataretentie. Uw bedrijfsdata wordt nooit gebruikt voor AI-training.",
  },
  {
    icon: KeyRound,
    title: "Fijnmazig toegangsbeheer",
    description:
      "Row Level Security (RLS) en rolgebaseerde toegang zorgen dat gebruikers alleen zien wat ze mogen zien.",
  },
  {
    icon: Shield,
    title: "AVG / GDPR compliant",
    description:
      "Volledig in lijn met Europese privacywetgeving. Inclusief verwerkersovereenkomsten (DPA's) met partners.",
  },
  {
    icon: Award,
    title: "Gecertificeerde technologiepartners",
    description:
      "Wij werken met SOC 2 Type II en ISO 27001 gecertificeerde technologieën zoals Supabase, OpenAI, Anthropic en Vercel.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const SecurityBlock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden border-t border-primary/10">
      <AmbientLight />

      <div className="container mx-auto px-4 lg:px-8 py-16 sm:py-24 relative z-10">
        <ScrollReveal className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <ScrollRevealItem>
            <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-primary">
              Beveiliging & Vertrouwen
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Uw data is beschermd volgens enterprise-standaarden
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Beveiliging is geen toevoeging achteraf. Het is geïntegreerd in elke laag van onze automatiseringen en AI-oplossingen.
            </p>
          </ScrollRevealItem>
        </ScrollReveal>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isHovered = hoveredIndex === i;

            return (
              <motion.div
                key={feature.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative rounded-2xl p-6 cursor-default transition-all duration-300 ease-out bg-card border border-border"
                style={{
                  borderColor: isHovered ? "hsl(var(--primary) / 0.4)" : undefined,
                  transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHovered
                    ? "0 8px 32px hsl(174 78% 41% / 0.1), 0 2px 8px hsl(0 0% 0% / 0.2)"
                    : "none",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 bg-primary/10"
                >
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="text-base font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trust divider */}
        <ScrollReveal className="mt-12 sm:mt-16">
          <ScrollRevealItem>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 sm:w-24 bg-primary/20" />
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary" />
                <span className="text-xs font-medium tracking-wide text-muted-foreground">
                  Security by design. Geen compromissen.
                </span>
              </div>
              <div className="h-px w-16 sm:w-24 bg-primary/20" />
            </div>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SecurityBlock;
