import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  {
    label: "Over ons",
    children: [
      { label: "Ons Proces", href: "/process" },
      { label: "Ons Team", href: "/team" },
    ],
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

type NavItem = { label: string; href?: string; children?: { label: string; href: string }[] };

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav
        className="container mx-auto flex items-center justify-between px-4 lg:px-8 transition-all duration-500"
        style={{ height: scrolled ? "56px" : "64px" }}
      >
        <Link to="/" className="flex items-center gap-2 shrink-0 min-w-[140px]">
          <img
            src="/logo.png"
            alt="Autronis"
            className="w-auto transition-all duration-500 will-change-transform"
            style={{ height: scrolled ? "28px" : "36px" }}
            fetchPriority="high"
          />
          <span
            className="font-bold tracking-tight transition-all duration-500"
            style={{ fontSize: scrolled ? "1rem" : "1.125rem" }}
          >
            Autronis
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link: NavItem) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1 ${
                    link.children.some((c) => location.pathname === c.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 min-w-[160px] bg-background/95 backdrop-blur-xl border border-border rounded-lg shadow-lg py-1 z-50"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`block px-4 py-2 text-sm transition-colors ${
                            location.pathname === child.href
                              ? "text-primary bg-primary/5"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href!}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Wissel thema"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
            <button className="px-2 py-1 rounded bg-primary/10 text-primary font-semibold">NL</button>
            <button className="px-2 py-1 rounded hover:bg-muted transition-colors opacity-50 cursor-not-allowed" title="Binnenkort beschikbaar">EN</button>
          </div>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/book">Plan Automation Scan</Link>
          </Button>

          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link: NavItem) =>
                link.children ? (
                  <div key={link.label} className="flex flex-col">
                    <span className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{link.label}</span>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                          location.pathname === child.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href!}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="flex items-center gap-2 px-4 py-2">
                <button className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-semibold">NL</button>
                <button className="px-2 py-1 rounded text-xs text-muted-foreground opacity-50 cursor-not-allowed">EN</button>
              </div>
              <Button asChild size="lg" className="mt-2">
                <Link to="/book">Plan Automation Scan</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
