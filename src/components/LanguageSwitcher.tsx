import { useLanguage } from "@/i18n/context";
import flagUS from "@/assets/flag-us.png";
import flagNL from "@/assets/flag-nl.png";

interface Props {
  size?: "sm" | "md";
}

const LanguageSwitcher = ({ size = "sm" }: Props) => {
  const lang = useLanguage();
  const isEN = lang === "en";
  const h = size === "md" ? "h-8" : "h-7";
  const flagH = size === "md" ? "h-8" : "h-7";
  const flagW = size === "md" ? "w-10" : "w-9";

  return (
    <div className={`flex items-center ${h} gap-1.5`}>
      {/* EN — US flag as border via background image */}
      <a
        href={isEN ? undefined : "https://autronis.com"}
        className={`relative ${flagW} ${flagH} rounded-md overflow-hidden flex items-center justify-center transition-all duration-200 ${
          isEN
            ? "opacity-100 shadow-sm"
            : "opacity-40 hover:opacity-70 cursor-pointer"
        }`}
        aria-label="English"
      >
        <img src={flagUS} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <span className="relative z-10 text-[11px] font-bold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">EN</span>
      </a>
      {/* NL — Dutch flag as border via background image */}
      <a
        href={isEN ? "https://autronis.nl" : undefined}
        className={`relative ${flagW} ${flagH} rounded-md overflow-hidden flex items-center justify-center transition-all duration-200 ${
          !isEN
            ? "opacity-100 shadow-sm"
            : "opacity-40 hover:opacity-70 cursor-pointer"
        }`}
        aria-label="Nederlands"
      >
        <img src={flagNL} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <span className="relative z-10 text-[11px] font-bold tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">NL</span>
      </a>
    </div>
  );
};

export default LanguageSwitcher;
