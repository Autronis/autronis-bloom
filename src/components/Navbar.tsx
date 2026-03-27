import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GlowButton from "@/components/GlowButton";
import { Menu, X, ChevronDown, Users, Workflow, ChevronRight, Briefcase, Globe } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/i18n/context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const text = {
  en: {
    home: "Home",
    services: "Services",
    impactRoi: "Impact & ROI",
    aboutUs: "About Us",
    caseStudies: "Case Studies",
    insights: "Insights",
    contact: "Contact",
    ourProcess: "Our Process",
    ourProcessDesc: "From analysis to go-live. Structured, transparent and scalable.",
    ourTeam: "Our Team",
    ourTeamDesc: "The engineers who design, build and optimize your systems.",
    work: "Work",
    caseStudy: "Lead Generation Automation",
    caseStudyDesc: "How we automated outreach for Jobby.",
    portfolio1: "Autronis.com",
    portfolio1Desc: "3D animations & web architecture",
    portfolio2: "Services",
    portfolio2Desc: "Interactive services & workflow builder",
    cta: "Schedule Automation Scan",
  },
  nl: {
    home: "Home",
    services: "Diensten",
    impactRoi: "Impact & ROI",
    aboutUs: "Over Ons",
    caseStudies: "Case Studies",
    insights: "Inzichten",
    contact: "Contact",
    ourProcess: "Ons Proces",
    ourProcessDesc: "Van analyse tot go-live. Gestructureerd, transparant en schaalbaar.",
    ourTeam: "Ons Team",
    ourTeamDesc: "De engineers die jouw systemen ontwerpen, bouwen en optimaliseren.",
    work: "Werk",
    caseStudy: "Leadgeneratie Automatisering",
    caseStudyDesc: "Hoe we outreach automatiseerden voor Jobby.",
    portfolio1: "Autronis.com",
    portfolio1Desc: "3D animaties & webarchitectuur",
    portfolio2: "Diensten",
    portfolio2Desc: "Interactieve diensten & workflow builder",
    cta: "Plan een Automation Scan",
  },
};

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ElementType;
  description: string;
}

const DropdownNav = ({ label, items, pathname, compact }: { label: string; items: DropdownItem[]; pathname: string; compact: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={`group/nav relative px-3 py-2 font-medium rounded-md transition-all duration-300 flex items-center gap-1 ${items.some((c) => pathname === c.href) ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        style={{ fontSize: compact ? "0.82rem" : "0.875rem" }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <span className={`absolute bottom-0.5 left-3 right-3 h-px transition-all duration-300 ${items.some((c) => pathname === c.href) ? "bg-primary w-[calc(100%-24px)]" : "bg-primary w-0 group-hover/nav:w-[calc(100%-24px)]"}`} />
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className="absolute top-full left-0 right-0 h-3" />
      <div
        className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 rounded-xl p-2 z-50 transition-all duration-200 ease-out"
        style={{
          width: items.length > 2 ? 480 : 320,
          backgroundColor: "hsl(var(--card))",
          border: "1px solid hsl(var(--border) / 0.4)",
          boxShadow: "0 8px 32px hsl(0 0% 0% / 0.18), 0 2px 8px hsl(0 0% 0% / 0.1)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(6px) scale(0.98)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {items.map((child) => (
          <Link key={child.href} to={child.href} className="block group" onClick={() => setOpen(false)}>
            <div className={`flex items-start gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${pathname === child.href ? "bg-muted text-foreground" : "text-foreground hover:bg-muted/80"}`}>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5 group-hover:bg-primary/15 transition-colors duration-200">
                <child.icon size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">{child.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{child.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Navbar = () => {
  const lang = useLanguage();
  const t = text[lang];

  const aboutDropdown = [
    { label: t.ourProcess, href: "/process", icon: Workflow, description: t.ourProcessDesc },
    { label: t.ourTeam, href: "/team", icon: Users, description: t.ourTeamDesc },
  ];

  const workDropdown = [
    { label: t.caseStudy, href: "/case-studies#case-0", icon: Briefcase, description: t.caseStudyDesc },
    { label: t.portfolio1, href: "/portfolio", icon: Globe, description: t.portfolio1Desc },
  ];

  const navLinks = [
    { label: t.home, href: "/" },
    { label: t.services, href: "/services" },
    { label: t.impactRoi, href: "/impact-roi" },
    { label: t.aboutUs, children: aboutDropdown },
    { label: t.work, children: workDropdown },
    { label: t.insights, href: "/resources" },
    { label: t.contact, href: "/contact" },
  ];

  type NavItem = (typeof navLinks)[number];

  const [scrolled, setScrolled] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.scrollY > 40 : false
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();
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

  const isEN = lang === "en";
  const altDomain = isEN ? "https://autronis.nl" : "https://autronis.com";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-out"
      style={{
        backgroundColor: headerElevated ? "hsl(var(--background) / 0.95)" : "hsl(var(--background) / 0.72)",
        backdropFilter: headerElevated ? "blur(20px)" : "blur(12px)",
        borderColor: headerElevated ? "hsl(var(--border) / 0.5)" : "transparent",
        boxShadow: headerElevated ? "0 1px 12px hsl(0 0% 0% / 0.08)" : "none",
      }}
    >
      <nav
        className="container mx-auto flex items-center justify-between transition-all duration-300 ease-out"
        style={{ height: compactNavbar ? "52px" : "64px", padding: "0 1rem" }}
      >
        <Link to="/" className="flex items-center gap-2 shrink-0 min-w-[110px] sm:min-w-[130px]">
          <img src="/logo.png" alt="Autronis" width={130} height={32} className="w-auto transform-gpu transition-all duration-300 ease-out" style={{ height: compactNavbar ? "26px" : "32px" }} loading="eager" decoding="async" />
          <span className="font-bold tracking-tight transition-all duration-300 ease-out" style={{ fontSize: compactNavbar ? "0.92rem" : "1.05rem" }}>Autronis</span>
        </Link>

        <div className="hidden lg:flex items-center transition-all duration-300 ease-out" style={{ gap: compactNavbar ? "0" : "4px" }}>
          {navLinks.map((link: NavItem) =>
            "children" in link && link.children ? (
              <DropdownNav key={link.label} label={link.label} items={link.children} pathname={location.pathname} compact={compactNavbar} />
            ) : (
              <Link
                key={"href" in link ? link.href : link.label}
                to={"href" in link ? link.href! : "/"}
                className={`group/nav relative px-3 py-2 font-medium rounded-md transition-all duration-300 ${"href" in link && location.pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                style={{ fontSize: compactNavbar ? "0.82rem" : "0.875rem" }}
              >
                {link.label}
                <span className={`absolute bottom-0.5 left-3 right-3 h-px transition-all duration-300 ${"href" in link && location.pathname === link.href ? "bg-primary w-[calc(100%-24px)]" : "bg-primary w-0 group-hover/nav:w-[calc(100%-24px)]"}`} />
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <GlowButton asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/book">{t.cta}</Link>
          </GlowButton>

          <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
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
                    className={`px-4 py-3 rounded-md text-sm font-medium transition-colors flex items-center justify-between ${link.children.some((c) => location.pathname === c.href) ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                  >
                    {link.label}
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className="grid transition-[grid-template-rows] duration-200 ease-out" style={{ gridTemplateRows: mobileDropdownOpen ? "1fr" : "0fr" }}>
                    <div className="overflow-hidden">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`px-6 py-3 rounded-md text-sm font-medium transition-colors flex items-center gap-3 ${location.pathname === child.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
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
                  className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${"href" in link && location.pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="flex items-center gap-2 px-4 py-2">
              <LanguageSwitcher size="md" />
            </div>
            <Button asChild size="lg" className="mt-2">
              <Link to="/book">{t.cta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
