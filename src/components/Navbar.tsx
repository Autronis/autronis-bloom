import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, ChevronDown, Users, Workflow } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const dropdownItems = [
  {
    label: "Ons Proces",
    href: "/process",
    icon: Workflow,
    description: "Van analyse tot livegang. Gestructureerd, transparant en schaalbaar.",
  },
  {
    label: "Ons Team",
    href: "/team",
    icon: Users,
    description: "De engineers die uw systemen ontwerpen, bouwen en optimaliseren.",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Over ons", children: dropdownItems },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

type NavItem = (typeof navLinks)[number];

const DropdownItem = ({
  item,
  isActive,
}: {
  item: (typeof dropdownItems)[0];
  isActive: boolean;
}) => (
  <Link to={item.href} className="block group">
    <motion.div
      className={`flex items-start gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-primary/8 text-primary"
          : "text-foreground hover:bg-primary/5"
      }`}
      whileHover={{
        backgroundColor: "hsl(174, 78%, 41%, 0.08)",
        boxShadow: "inset 0 0 20px hsl(174, 78%, 41%, 0.04)",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <item.icon size={16} />
      </motion.div>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-tight">{item.label}</p>
        <motion.p
          className="text-xs text-muted-foreground mt-0.5 leading-relaxed"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {item.description}
        </motion.p>
      </div>
    </motion.div>
  </Link>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.scrollY > 40 : false
  );
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
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-background/88 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-background/72 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <nav className="container mx-auto h-16 flex items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0 min-w-[140px]">
          <img
            src="/logo.png"
            alt="Autronis"
            className="w-auto h-8 transform-gpu"
            fetchPriority="high"
          />
          <span className="font-bold tracking-tight text-[1.05rem]">Autronis</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link: NavItem) =>
            "children" in link && link.children ? (
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
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[320px] bg-background/98 backdrop-blur-xl border border-border/60 rounded-xl shadow-xl p-2 z-50"
                      style={{
                        boxShadow:
                          "0 4px 24px hsl(174 78% 41% / 0.06), 0 16px 48px hsl(0 0% 0% / 0.1)",
                      }}
                    >
                      {link.children.map((child) => (
                        <DropdownItem
                          key={child.href}
                          item={child}
                          isActive={location.pathname === child.href}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={"href" in link ? link.href : link.label}
                to={"href" in link ? link.href! : "/"}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  "href" in link && location.pathname === link.href
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
                "children" in link && link.children ? (
                  <div key={link.label} className="flex flex-col">
                    <span className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {link.label}
                    </span>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={`px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center gap-3 ${
                          location.pathname === child.href
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        <child.icon size={16} />
                        <div>
                          <span className="block">{child.label}</span>
                          <span className="text-xs text-muted-foreground font-normal">{child.description}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={"href" in link ? link.href : link.label}
                    to={"href" in link ? link.href! : "/"}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                      "href" in link && location.pathname === link.href
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
