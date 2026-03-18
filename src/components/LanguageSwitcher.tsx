import { useLanguage } from "@/i18n/context";

interface Props {
  size?: "sm" | "md";
}

const LanguageSwitcher = ({ size = "sm" }: Props) => {
  const lang = useLanguage();
  const isEN = lang === "en";
  const h = size === "md" ? "h-8" : "h-7";

  return (
    <div className={`flex items-center ${h} rounded-full bg-muted/50 border border-border p-0.5`}>
      {isEN ? (
        <>
          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide">
            EN
          </span>
          <a
            href="https://autronis.nl"
            className="px-2.5 py-1 rounded-full text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            NL
          </a>
        </>
      ) : (
        <>
          <a
            href="https://autronis.com"
            className="px-2.5 py-1 rounded-full text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            EN
          </a>
          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-semibold tracking-wide">
            NL
          </span>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
