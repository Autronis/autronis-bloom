import { Link } from "react-router-dom";
import { Linkedin, Mail } from "lucide-react";
import { copyTextToClipboard, showClipboardFeedback } from "@/lib/copyToClipboard";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    tagline: "We design and implement automation and data systems for growing SMB businesses.",
    services: "Services",
    processAutomation: "Process Automation",
    systemIntegrations: "System Integrations",
    dataReporting: "Data & Reporting",
    company: "Company",
    ourProcess: "Our Process",
    team: "Team",
    caseStudies: "Case Studies",
    insights: "Insights",
    impactRoi: "Impact & ROI",
    contact: "Contact",
    getInTouch: "Get in touch",
    cta: "Schedule Automation Scan",
    linkedin: "LinkedIn",
    email: "Email",
    emailCopied: "Email address copied to clipboard",
    copyFailed: "Copy failed",
    rights: "All rights reserved.",
    subline: "Architecture-driven automation with integrated security and data governance.",
    privacy: "Privacy",
    cookies: "Cookies",
  },
  nl: {
    tagline: "Wij ontwerpen en implementeren automatiserings- en datasystemen voor groeiende mkb-bedrijven.",
    services: "Diensten",
    processAutomation: "Procesautomatisering",
    systemIntegrations: "Systeemintegraties",
    dataReporting: "Data & Rapportage",
    company: "Bedrijf",
    ourProcess: "Ons Proces",
    team: "Team",
    caseStudies: "Case Studies",
    insights: "Inzichten",
    impactRoi: "Impact & ROI",
    contact: "Contact",
    getInTouch: "Neem contact op",
    cta: "Plan een Automation Scan",
    linkedin: "LinkedIn",
    email: "Email",
    emailCopied: "E-mailadres gekopieerd naar klembord",
    copyFailed: "Kopiëren mislukt",
    rights: "Alle rechten voorbehouden.",
    subline: "Architectuur-gedreven automatisering met geïntegreerde beveiliging en data governance.",
    privacy: "Privacy",
    cookies: "Cookies",
  },
};

const Footer = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Autronis" className="h-8 w-auto" width={130} height={32} loading="lazy" decoding="async" />
              <span className="text-lg font-bold">Autronis</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.tagline}</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t.services}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground transition-colors">{t.processAutomation}</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">{t.systemIntegrations}</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">{t.dataReporting}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t.company}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/process" className="hover:text-foreground transition-colors">{t.ourProcess}</Link></li>
              <li><Link to="/team" className="hover:text-foreground transition-colors">{t.team}</Link></li>
              <li><Link to="/case-studies" className="hover:text-foreground transition-colors">{t.caseStudies}</Link></li>
              <li><Link to="/resources" className="hover:text-foreground transition-colors">{t.insights}</Link></li>
              <li><Link to="/impact-roi" className="hover:text-foreground transition-colors">{t.impactRoi}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">{t.contact}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">{t.getInTouch}</Link></li>
              <li><Link to="/book" className="hover:text-primary transition-colors text-primary">{t.cta}</Link></li>
              <li>
                <a href="https://www.linkedin.com/company/autronis" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                  <Linkedin size={14} /> {t.linkedin}
                </a>
              </li>
              <li>
                <button
                  onClick={async () => {
                    const copied = await copyTextToClipboard("zakelijk@autronis.com");
                    if (copied) showClipboardFeedback(t.emailCopied, "success");
                    else showClipboardFeedback(t.copyFailed, "error");
                  }}
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail size={14} /> {t.email}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col gap-1">
            <p>© {new Date().getFullYear()} Autronis. {t.rights}</p>
            <p className="text-muted-foreground/60">{t.subline}</p>
          </div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">{t.privacy}</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">{t.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
