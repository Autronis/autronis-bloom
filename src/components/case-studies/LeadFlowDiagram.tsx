import { motion } from "framer-motion";
import { Globe, Search, Database, Bot, Mail, RefreshCw, Phone } from "lucide-react";

const steps = [
  { icon: Globe, title: "Leadbronnen", desc: "Bedrijvengidsen, databases en websites" },
  { icon: Search, title: "Leadverzameling", desc: "Automatisch verzamelen van bedrijven en contactgegevens" },
  { icon: Database, title: "Data verwerking", desc: "Extractie en verrijking van bedrijfsinformatie" },
  { icon: Bot, title: "AI Analyse", desc: "Analyse van bedrijfswebsites en identificatie van pijnpunten" },
  { icon: Mail, title: "Outreach automatisering", desc: "Genereren en versturen van gepersonaliseerde e-mails" },
  { icon: RefreshCw, title: "CRM synchronisatie", desc: "Opslaan en beheren van leads" },
  { icon: Phone, title: "Sales opvolging", desc: "Opvolgen via gesprekken, e-mail en pipeline" },
];

const LeadFlowDiagram = () => (
  <div className="w-full flex flex-col items-center gap-0 py-4 px-2">
    {steps.map((step, i) => {
      const Icon = step.icon;
      return (
        <motion.div
          key={i}
          className="flex flex-col items-center w-full max-w-xs"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 w-full rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
            <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground leading-tight">{step.title}</p>
              <p className="text-xs text-muted-foreground leading-snug">{step.desc}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex flex-col items-center py-1">
              <motion.div
                className="w-px h-6 bg-primary/30"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                style={{ transformOrigin: "top" }}
              />
              <motion.div
                className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-primary/40"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.35 }}
              />
            </div>
          )}
        </motion.div>
      );
    })}
  </div>
);

export default LeadFlowDiagram;
