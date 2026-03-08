import { createContext, useContext, useMemo, useEffect } from "react";

export type Lang = "en" | "nl";

const LanguageContext = createContext<Lang>("en");

function detectLanguage(): Lang {
  if (typeof window === "undefined") return "en";
  const hostname = window.location.hostname;
  if (hostname.endsWith("autronis.nl")) return "nl";
  // Allow ?lang=nl for testing in preview
  const params = new URLSearchParams(window.location.search);
  if (params.get("lang") === "nl") return "nl";
  return "en";
}

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const lang = useMemo(detectLanguage, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

/** Helper to pick the right domain for the current language */
export const useDomain = () => {
  const lang = useLanguage();
  return lang === "nl" ? "https://autronis.nl" : "https://autronis.com";
};
