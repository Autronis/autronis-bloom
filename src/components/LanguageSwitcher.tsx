import { useLanguage } from "@/i18n/context";

interface Props {
  size?: "sm" | "md";
}

const FlagBorderButton = ({
  href,
  active,
  gradient,
  label,
  py,
}: {
  href: string | undefined;
  active: boolean;
  gradient: string;
  label: string;
  py: string;
}) => (
  <a
    href={href}
    className={`relative px-2.5 ${py} rounded-md text-[11px] font-semibold tracking-wide transition-all duration-200 ${
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-muted-foreground hover:text-foreground cursor-pointer bg-transparent"
    }`}
    aria-label={label}
  >
    {/* Flag gradient border overlay */}
    <span
      className="absolute inset-0 rounded-md pointer-events-none"
      style={{
        padding: "1.5px",
        background: gradient,
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
    <span className="relative z-10">{label === "English" ? "EN" : "NL"}</span>
  </a>
);

const LanguageSwitcher = ({ size = "sm" }: Props) => {
  const lang = useLanguage();
  const isEN = lang === "en";
  const h = size === "md" ? "h-8" : "h-7";
  const py = size === "md" ? "py-1" : "py-0.5";

  return (
    <div className={`flex items-center ${h} rounded-lg bg-muted/50 border border-transparent p-0.5 gap-1`}>
      <FlagBorderButton
        href={isEN ? undefined : "https://autronis.com"}
        active={isEN}
        gradient="linear-gradient(135deg, #3C3B6E, #B22234, #FFFFFF, #B22234, #3C3B6E)"
        label="English"
        py={py}
      />
      <FlagBorderButton
        href={isEN ? "https://autronis.nl" : undefined}
        active={!isEN}
        gradient="linear-gradient(180deg, #AE1C28 33%, #FFFFFF 33%, #FFFFFF 66%, #21468B 66%)"
        label="Nederlands"
        py={py}
      />
    </div>
  );
};

export default LanguageSwitcher;
