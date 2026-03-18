import { useLanguage } from "@/i18n/context";

interface Props {
  size?: "sm" | "md";
}

const LanguageSwitcher = ({ size = "sm" }: Props) => {
  const lang = useLanguage();
  const isEN = lang === "en";
  const py = size === "md" ? "py-1" : "py-0.5";

  return (
    <div className={`flex items-center gap-1`}>
      {/* EN — Union Jack border */}
      <a
        href={isEN ? undefined : "https://autronis.com"}
        className={`px-2.5 ${py} text-[11px] font-semibold tracking-wide transition-all duration-200 ${
          isEN
            ? "text-foreground bg-white/5"
            : "text-muted-foreground hover:text-foreground cursor-pointer bg-white/[0.02]"
        }`}
        style={{
          border: "1.5px solid transparent",
          borderImage: "linear-gradient(135deg, #3C3B6E, #B22234, #FFFFFF, #B22234, #3C3B6E) 1",
        }}
        aria-label="English"
      >
        EN
      </a>
      {/* NL — Dutch flag border */}
      <a
        href={isEN ? "https://autronis.nl" : undefined}
        className={`px-2.5 ${py} text-[11px] font-semibold tracking-wide transition-all duration-200 ${
          !isEN
            ? "text-foreground bg-white/5"
            : "text-muted-foreground hover:text-foreground cursor-pointer bg-white/[0.02]"
        }`}
        style={{
          border: "1.5px solid transparent",
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
