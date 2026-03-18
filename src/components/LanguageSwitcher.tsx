import { useLanguage } from "@/i18n/context";

interface Props {
  size?: "sm" | "md";
}

const LanguageSwitcher = ({ size = "sm" }: Props) => {
  const lang = useLanguage();
  const isEN = lang === "en";
  const h = size === "md" ? "h-8" : "h-7";

  return (
    <div className={`flex items-center ${h} rounded-lg bg-muted/50 border border-border p-0.5 gap-0.5`}>
      <a
        href={isEN ? undefined : "https://autronis.com"}
        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide transition-all duration-200 ${
          isEN
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground cursor-pointer"
        }`}
        aria-label="English"
      >
        EN
      </a>
      <a
        href={isEN ? "https://autronis.nl" : undefined}
        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide transition-all duration-200 ${
          !isEN
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground cursor-pointer"
        }`}
        aria-label="Nederlands"
      >
        NL
      </a>
    </div>
  );
};

export default LanguageSwitcher;
