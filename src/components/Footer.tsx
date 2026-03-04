import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
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
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wij ontwerpen en implementeren automatiserings- en datasystemen voor
              groeiende MKB-bedrijven.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("zakelijk@autronis.com");
                }}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Kopieer e-mailadres"
                title="Kopieer zakelijk@autronis.com"
              >
                <Mail size={18} />
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground transition-colors">Process Automation</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">System Integrations</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Data & Reporting</Link></li>
            </ul>
          </div>

          {/* Bedrijf */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Bedrijf</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/process" className="hover:text-foreground transition-colors">Ons Proces</Link></li>
              <li><Link to="/team" className="hover:text-foreground transition-colors">Team</Link></li>
              <li><Link to="/case-studies" className="hover:text-foreground transition-colors">Case Studies</Link></li>
              <li><Link to="/resources" className="hover:text-foreground transition-colors">Inzichten</Link></li>
              <li><Link to="/impact-roi" className="hover:text-foreground transition-colors">Impact & ROI</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Neem contact op</Link></li>
              <li><Link to="/book" className="hover:text-primary transition-colors text-primary">Plan Automation Scan</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col gap-1">
            <p>© {new Date().getFullYear()} Autronis. Alle rechten voorbehouden.</p>
            <p className="text-muted-foreground/60">Architectuurgedreven automatisering met geïntegreerde beveiliging en datagovernance.</p>
          </div>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
