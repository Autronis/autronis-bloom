import { useLanguage } from "@/i18n/context";
import flagEN from "@/assets/flag-en.png";
import flagNL from "@/assets/flag-nl.png";

interface Props {
  size?: "sm" | "md";
}

const LanguageSwitcher = ({ size = "sm" }: Props) => {
  const lang = useLanguage();
  const isEN = lang === "en";
  const dim = size === "md" ? "w-8 h-6" : "w-7 h-5";

  return (
    <div className="flex items-center gap-1.5">
      {isEN ? (
        <>
          <button className={`${dim} rounded-[4px] overflow-hidden ring-2 ring-primary/50 shadow-sm`} aria-label="English (active)">
            <img src={flagEN} alt="EN" className="w-full h-full object-cover" />
          </button>
          <a href="https://autronis.nl" className={`${dim} rounded-[4px] overflow-hidden opacity-50 hover:opacity-80 transition-opacity ring-1 ring-border`} aria-label="Nederlands">
            <img src={flagNL} alt="NL" className="w-full h-full object-cover" />
          </a>
        </>
      ) : (
        <>
          <a href="https://autronis.com" className={`${dim} rounded-[4px] overflow-hidden opacity-50 hover:opacity-80 transition-opacity ring-1 ring-border`} aria-label="English">
            <img src={flagEN} alt="EN" className="w-full h-full object-cover" />
          </a>
          <button className={`${dim} rounded-[4px] overflow-hidden ring-2 ring-primary shadow-md shadow-primary/20`} aria-label="Nederlands (actief)">
            <img src={flagNL} alt="NL" className="w-full h-full object-cover" />
          </button>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
