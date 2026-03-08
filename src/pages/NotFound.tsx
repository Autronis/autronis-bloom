import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/context";

const text = {
  en: { title: "404", message: "Oops! Page not found", back: "Return to Home" },
  nl: { title: "404", message: "Oeps! Pagina niet gevonden", back: "Terug naar Home" },
};

const NotFound = () => {
  const location = useLocation();
  const lang = useLanguage();
  const t = text[lang];

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t.title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t.message}</p>
        <a href="/" className="text-primary underline hover:text-primary/90">{t.back}</a>
      </div>
    </div>
  );
};

export default NotFound;
