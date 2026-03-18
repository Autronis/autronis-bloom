import { useLanguage } from "@/i18n/context";
import flagEN from "@/assets/flag-en.png";
import flagNL from "@/assets/flag-nl.png";

interface Props {
  size?: "sm" | "md";
}

const LanguageSwitcher = ({ size = "sm" }: Props) => {
  const lang = useLanguage();
  const isEN = lang === "en";
  const h = size === "md" ? "h-7" : "h-6";

  return (
    <div className={`flex items-center ${h} gap-1.5`}>
      <a
        href={isEN ? undefined : "https://autronis.com"}
        className={`block rounded-sm overflow-hidden transition-all duration-200 ${
          isEN
            ? "ring-1 ring-primary/50 opacity-100"
            : "opacity-50 hover:opacity-80"
        }`}
        aria-label="English"
      >
        <img src={flagEN} alt="EN" className="w-7 h-5 object-cover" />
      </a>
      <a
        href={isEN ? "https://autronis.nl" : undefined}
        className={`block rounded-sm overflow-hidden transition-all duration-200 ${
          !isEN
            ? "ring-1 ring-primary/50 opacity-100"
            : "opacity-50 hover:opacity-80"
        }`}
        aria-label="Nederlands"
      >
        <img src={flagNL} alt="NL" className="w-7 h-5 object-cover" />
      </a>
    </div>
  );
};

export default LanguageSwitcher;
