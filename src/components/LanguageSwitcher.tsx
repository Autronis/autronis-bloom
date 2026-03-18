import { useLanguage } from "@/i18n/context";

interface Props {
  size?: "sm" | "md";
}

const LanguageSwitcher = ({ size = "sm" }: Props) => {
  const lang = useLanguage();
  const isEN = lang === "en";
  const h = size === "md" ? "h-8" : "h-7";
  const px = size === "md" ? "px-3" : "px-2.5";

  return (
    <div className={`flex items-center ${h} gap-1`}>
      {/* EN — Union Jack border */}
      <a
        href={isEN ? undefined : "https://autronis.com"}
        className={`relative ${px} py-1 rounded-md text-[11px] font-semibold tracking-wide transition-all duration-200 ${
          isEN
            ? "bg-primary text-primary-foreground"
            : "bg-transparent text-muted-foreground hover:text-foreground cursor-pointer"
        }`}
        style={{
          border: "2px solid transparent",
          borderImage: "linear-gradient(135deg, #012169, #C8102E, #FFFFFF, #C8102E, #012169) 1",
        }}
        aria-label="English"
      >
        EN
      </a>
      {/* NL — Dutch flag border */}
      <a
        href={isEN ? "https://autronis.nl" : undefined}
        className={`relative ${px} py-1 rounded-md text-[11px] font-semibold tracking-wide transition-all duration-200 ${
          !isEN
            ? "bg-primary text-primary-foreground"
            : "bg-transparent text-muted-foreground hover:text-foreground cursor-pointer"
        }`}
        style={{
          border: "2px solid transparent",
          borderImage: "linear-gradient(180deg, #AE1C28 33%, #FFFFFF 33%, #FFFFFF 66%, #21468B 66%) 1",
        }}
        aria-label="Nederlands"
      >
        NL
      </a>
    </div>
  );
};

export default LanguageSwitcher;
