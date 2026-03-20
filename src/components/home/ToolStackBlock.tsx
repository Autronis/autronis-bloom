import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    label: "Integrations",
    title: "Works with your current stack",
    desc: "We connect CRM, finance, operations and custom systems.",
    sub: "Does your system have an API? Then we can integrate.",
  },
  nl: {
    label: "Integraties",
    title: "Werkt met je huidige stack",
    desc: "We verbinden CRM, finance, operations en maatwerksystemen.",
    sub: "Heeft je systeem een API? Dan kunnen we integreren.",
  },
};

const ToolStackBlock = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <section className="py-6 sm:py-10 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-3xl" />
      </div>
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-md relative z-10">
        <p className="text-[10px] font-semibold text-primary mb-1.5 tracking-widest uppercase">{t.label}</p>
        <h2 className="text-lg sm:text-xl font-bold mb-1.5">{t.title}</h2>
        <p className="text-xs text-muted-foreground mb-2">{t.desc}</p>
        <p className="text-[11px] text-muted-foreground/70 italic">{t.sub}</p>
      </div>
    </section>
  );
};

export default ToolStackBlock;
