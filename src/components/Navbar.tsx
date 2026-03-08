import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, ChevronDown, Users, Workflow, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/use-mobile";

const dropdownItems = [
  {
    label: "Our Process",
    href: "/process",
    icon: Workflow,
    description: "From analysis to go-live. Structured, transparent and scalable.",
  },
  {
    label: "Our Team",
    href: "/team",
    icon: Users,
    description: "The engineers who design, build and optimize your systems.",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Impact & ROI", href: "/impact-roi" },
  { label: "About Us", children: dropdownItems },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/resources" },
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
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const compactNavbar = scrolled;
  const headerElevated = scrolled || mobileOpen;

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
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-out"
      style={{
        backgroundColor: headerElevated
          ? "hsl(var(--background) / 0.95)"
          : "hsl(var(--background) / 0.72)",
        backdropFilter: headerElevated ? "blur(20px)" : "blur(12px)",
        borderColor: headerElevated
          ? "hsl(var(--border) / 0.5)"
          : "transparent",
        boxShadow: headerElevated
          ? "0 1px 12px hsl(0 0% 0% / 0.08)"
          : "none",
      }}
    >
      <nav
        className="container mx-auto flex items-center justify-between transition-all duration-300 ease-out"
        style={{
          height: compactNavbar ? "52px" : "64px",
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
            style={{ height: compactNavbar ? "26px" : "32px" }}
            loading="eager"
            decoding="async"
          />
          <span
            className="font-bold tracking-tight transition-all duration-300 ease-out"
            style={{ fontSize: compactNavbar ? "0.92rem" : "1.05rem" }}
          >
            Autronis
          </span>
        </Link>

        <div
          className="hidden lg:flex items-center transition-all duration-300 ease-out"
          style={{ gap: compactNavbar ? "0" : "4px" }}
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
                  style={{ fontSize: compactNavbar ? "0.82rem" : "0.875rem" }}
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
                style={{ fontSize: compactNavbar ? "0.82rem" : "0.875rem" }}
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
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
            <button className="px-2 py-1 rounded bg-primary/10 text-primary font-semibold">EN</button>
            <a href="https://autronis.nl" className="px-2 py-1 rounded hover:bg-muted transition-colors">NL</a>
          </div>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/book">Schedule Automation Scan</Link>
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
        className="lg:hidden border-b border-border grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{
          backgroundColor: "hsl(var(--background) / 0.98)",
          gridTemplateRows: mobileOpen ? "1fr" : "0fr",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link: NavItem) =>
              "children" in link && link.children ? (
                <div key={link.label} className="flex flex-col">
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${
                      link.children.some((c) => location.pathname === c.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-200 ease-out"
                    style={{ gridTemplateRows: mobileDropdownOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
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
                          <child.icon size={16} className="text-primary" />
                          <div>
                            <span className="block">{child.label}</span>
                            <span className="text-xs text-muted-foreground font-normal">{child.description}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
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
              <button className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-semibold">EN</button>
              <a href="https://autronis.nl" className="px-2 py-1 rounded text-xs text-muted-foreground hover:bg-muted transition-colors">NL</a>
            </div>
            <Button asChild size="lg" className="mt-2">
              <Link to="/book">Schedule Automation Scan</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
