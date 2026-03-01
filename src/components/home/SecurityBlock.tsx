import { ShieldCheck, Activity, Scale, KeyRound, FileText } from "lucide-react";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";

const items = [
  { icon: KeyRound, label: "Minimale toegangsrechten" },
  { icon: Activity, label: "Logging & monitoring" },
  { icon: Scale, label: "AVG-proof aanpak" },
  { icon: ShieldCheck, label: "Geen vendor lock-in" },
  { icon: FileText, label: "Documentatie & overdracht" },
];

const SecurityBlock = () => {
  return (
    <section className="py-12 sm:py-20 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <ScrollReveal className="max-w-3xl mx-auto text-center">
          <ScrollRevealItem>
            <p className="text-xs font-semibold text-primary mb-3 tracking-widest uppercase">
              Beveiliging
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Gebouwd met beveiliging als fundament
            </h2>
            <p className="text-muted-foreground mb-10">
              Beveiliging en datakwaliteit zijn geen afterthought — ze zijn geïntegreerd in
              elke fase van ons proces.
            </p>
          </ScrollRevealItem>
          <ScrollRevealItem>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm"
                >
                  <item.icon size={16} className="text-primary shrink-0" />
                  <span className="text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </ScrollRevealItem>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default SecurityBlock;
