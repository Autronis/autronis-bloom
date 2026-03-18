import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/context";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const text = {
  en: {
    title: "Page not found",
    message: "The page you're looking for doesn't exist or has been moved.",
    back: "Back to Home",
    explore: "Explore our services",
    links: [
      { label: "Services", to: "/services" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Contact", to: "/contact" },
      { label: "Schedule a Scan", to: "/book" },
    ],
  },
  nl: {
    title: "Pagina niet gevonden",
    message: "De pagina die je zoekt bestaat niet of is verplaatst.",
    back: "Terug naar Home",
    explore: "Bekijk onze diensten",
    links: [
      { label: "Diensten", to: "/services" },
      { label: "Case Studies", to: "/case-studies" },
      { label: "Contact", to: "/contact" },
      { label: "Plan een Scan", to: "/book" },
    ],
  },
};

const NotFound = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Search size={28} className="text-primary" />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-7xl font-bold text-primary/20 mb-2"
        >
          404
        </motion.p>

        <h1 className="text-2xl font-bold text-foreground mb-3">{t.title}</h1>
        <p className="text-muted-foreground mb-8">{t.message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Button asChild size="lg">
            <Link to="/">
              <ArrowLeft size={16} />
              {t.back}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/services">{t.explore}</Link>
          </Button>
        </div>

        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground mb-3">
            {lang === "nl" ? "Of ga direct naar:" : "Or go directly to:"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {t.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs px-3 py-1.5 rounded-lg border border-border hover:border-primary/30 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
