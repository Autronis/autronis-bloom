import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, ChevronDown, Users, Workflow } from "lucide-react";
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
  { label: "Impact & ROI", href: "/impact-roi" },
  { label: "Over ons", children: dropdownItems },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Inzichten", href: "/resources" },
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
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? "bg-muted text-foreground"
          : "text-foreground hover:bg-muted/80"
      }`}
    >
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:bg-primary/15 transition-colors duration-200">
        <item.icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-tight">{item.label}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
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
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // No JS animation needed — use CSS grid trick for height animation

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-out"
      style={{
        backgroundColor: scrolled
          ? "hsl(var(--background) / 0.95)"
          : "hsl(var(--background) / 0.72)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(12px)",
        borderColor: scrolled
          ? "hsl(var(--border) / 0.5)"
          : "transparent",
        boxShadow: scrolled
          ? "0 1px 12px hsl(0 0% 0% / 0.08)"
          : "none",
      }}
    >
      <nav
        className="container mx-auto flex items-center justify-between transition-all duration-300 ease-out"
        style={{
          height: scrolled ? "52px" : "64px",
          padding: "0 1rem",
        }}
      >
        <Link to="/" className="flex items-center gap-2 shrink-0 min-w-[130px]">
          <img
            src="/logo.png"
            alt="Autronis"
            width={130}
            height={32}
            className="w-auto transform-gpu transition-all duration-300 ease-out"
            style={{ height: scrolled ? "26px" : "32px" }}
            loading="eager"
            decoding="async"
          />
          <span
            className="font-bold tracking-tight transition-all duration-300 ease-out"
            style={{ fontSize: scrolled ? "0.92rem" : "1.05rem" }}
          >
            Autronis
          </span>
        </Link>

        <div
          className="hidden lg:flex items-center transition-all duration-300 ease-out"
          style={{ gap: scrolled ? "0" : "4px" }}
        >
          {navLinks.map((link: NavItem) =>
            "children" in link && link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  className={`px-3 py-2 font-medium rounded-md transition-all duration-300 flex items-center gap-1 ${
                    link.children.some((c) => location.pathname === c.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{ fontSize: scrolled ? "0.82rem" : "0.875rem" }}
                  onFocus={() => setDropdownOpen(true)}
                  onKeyDown={(e) => { if (e.key === "Escape") setDropdownOpen(false); }}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {/* Hover bridge - invisible area connecting trigger to dropdown */}
                <div className="absolute top-full left-0 right-0 h-3" />
                <div
                  className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[320px] rounded-xl p-2 z-50 transition-all duration-200 ease-out"
                  style={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border) / 0.4)",
                    boxShadow: "0 8px 32px hsl(0 0% 0% / 0.18), 0 2px 8px hsl(0 0% 0% / 0.1)",
                    opacity: dropdownOpen ? 1 : 0,
                    transform: dropdownOpen ? "translateY(0) scale(1)" : "translateY(6px) scale(0.98)",
                    pointerEvents: dropdownOpen ? "auto" : "none",
                  }}
                >
                  {link.children.map((child) => (
                    <DropdownItem
                      key={child.href}
                      item={child}
                      isActive={location.pathname === child.href}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={"href" in link ? link.href : link.label}
                to={"href" in link ? link.href! : "/"}
                className={`px-3 py-2 font-medium rounded-md transition-all duration-300 ${
                  "href" in link && location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontSize: scrolled ? "0.82rem" : "0.875rem" }}
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

      {/* Mobile menu */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden border-b border-border overflow-hidden transition-all duration-300 ease-out"
        style={{
          backgroundColor: "hsl(var(--background) / 0.98)",
          maxHeight: mobileOpen ? "600px" : "0px",
          opacity: mobileOpen ? 1 : 0,
        }}
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
      </div>
    </header>
  );
};

export default Navbar;
