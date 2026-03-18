import { useLanguage } from "@/i18n/context";
import flagEN from "@/assets/flag-en.png";
import flagNL from "@/assets/flag-nl.png";

interface Props {
  size?: "sm" | "md";
}

const LanguageSwitcher = ({ size = "sm" }: Props) => {
  const lang = useLanguage();
  const isEN = lang === "en";
  const h = size === "md" ? "h-9" : "h-8";
  const flagSize = size === "md" ? "w-4 h-3" : "w-3.5 h-2.5";

  return (
    <div className={`flex items-center ${h} rounded-full bg-muted/80 border border-border p-0.5 gap-0.5`}>
      <a
        href={isEN ? undefined : "https://autronis.com"}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 ${
          isEN
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground cursor-pointer"
        }`}
        aria-label="English"
      >
        <img src={flagEN} alt="" className={`${flagSize} rounded-[2px] object-cover ${isEN ? "opacity-90" : "opacity-50"}`} />
        EN
      </a>
      <a
        href={isEN ? "https://autronis.nl" : undefined}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 ${
          !isEN
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground cursor-pointer"
        }`}
        aria-label="Nederlands"
      >
        <img src={flagNL} alt="" className={`${flagSize} rounded-[2px] object-cover ${!isEN ? "opacity-90" : "opacity-50"}`} />
        NL
      </a>
    </div>
  );
};

export default LanguageSwitcher;
