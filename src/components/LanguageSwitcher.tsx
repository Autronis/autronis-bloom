import { useLanguage } from "@/i18n/context";

interface Props {
  size?: "sm" | "md";
}

const LanguageSwitcher = ({ size = "sm" }: Props) => {
  const lang = useLanguage();
  const isEN = lang === "en";
  const h = size === "md" ? "h-9" : "h-8";

  return (
    <div className={`flex items-center ${h} gap-1.5`}>
      {/* EN button — UK flag colors as border */}
      <a
        href={isEN ? undefined : "https://autronis.com"}
        className={`relative px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 ${
          isEN
            ? "text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground cursor-pointer"
        }`}
        style={{
          background: isEN
            ? "hsl(var(--primary))"
            : "transparent",
          border: "2px solid transparent",
          backgroundClip: "padding-box",
          outline: "2px solid transparent",
          outlineOffset: "-2px",
          ...(isEN ? {} : {
            border: "none",
            padding: "5px 13px",
          }),
        }}
        aria-label="English"
      >
        {/* UK flag gradient border */}
        <span
          className="absolute inset-0 rounded-full -z-10"
          style={{
            background: "linear-gradient(135deg, #012169, #C8102E, #FFFFFF, #C8102E, #012169)",
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        EN
      </a>
      {/* NL button — Dutch flag colors as border */}
      <a
        href={isEN ? "https://autronis.nl" : undefined}
        className={`relative px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-200 ${
          !isEN
            ? "text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground cursor-pointer"
        }`}
        style={{
          background: !isEN
            ? "hsl(var(--primary))"
            : "transparent",
          border: "2px solid transparent",
          backgroundClip: "padding-box",
          ...(!isEN ? {} : {
            border: "none",
            padding: "5px 13px",
          }),
        }}
        aria-label="Nederlands"
      >
        {/* Dutch flag gradient border */}
        <span
          className="absolute inset-0 rounded-full -z-10"
          style={{
            background: "linear-gradient(180deg, #AE1C28 33%, #FFFFFF 33%, #FFFFFF 66%, #21468B 66%)",
            padding: "2px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        NL
      </a>
    </div>
  );
};

export default LanguageSwitcher;
