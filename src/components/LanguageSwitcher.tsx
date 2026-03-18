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
  const w = size === "md" ? "w-10" : "w-9";
  const border = "2px";

  return (
    <div className={`flex items-center ${h} gap-1.5`}>
      {/* EN — US flag as border frame */}
      <a
        href={isEN ? undefined : "https://autronis.com"}
        className={`relative ${w} ${h} rounded-sm overflow-hidden flex items-center justify-center transition-all duration-200 ${
          isEN
            ? "opacity-100"
            : "opacity-40 hover:opacity-70 cursor-pointer"
        }`}
        aria-label="English"
      >
        {/* Flag as full background */}
        <img src={flagUS} alt="" className="absolute inset-0 w-full h-full object-cover" />
        {/* Inner cutout — hides the middle, leaving only the border visible */}
        <span
          className="absolute rounded-[2px] bg-background"
          style={{ inset: border }}
        />
        <span className="relative z-10 text-[11px] font-bold tracking-wide text-foreground">EN</span>
      </a>
      {/* NL — Dutch flag as border frame */}
      <a
        href={isEN ? "https://autronis.nl" : undefined}
        className={`relative ${w} ${h} rounded-sm overflow-hidden flex items-center justify-center transition-all duration-200 ${
          !isEN
            ? "opacity-100"
            : "opacity-40 hover:opacity-70 cursor-pointer"
        }`}
        aria-label="Nederlands"
      >
        <img src={flagNL} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <span
          className="absolute rounded-[2px] bg-background"
          style={{ inset: border }}
        />
        <span className="relative z-10 text-[11px] font-bold tracking-wide text-foreground">NL</span>
      </a>
    </div>
  );
};

export default LanguageSwitcher;
