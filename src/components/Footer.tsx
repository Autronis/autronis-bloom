import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="Autronis" className="h-8 w-auto" />
              <span className="text-lg font-bold">
                Autronis
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Wij bouwen AI-gedreven automatiseringen die bedrijven sneller, slimmer en schaalbaarder maken.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="mailto:info@autronisgroup.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-foreground transition-colors">Sales & Marketing</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Operations</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Klantenservice</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Finance & Backoffice</Link></li>
              <li><Link to="/services" className="hover:text-foreground transition-colors">Data & Rapportage</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/case-studies" className="hover:text-foreground transition-colors">Case Studies</Link></li>
              <li><Link to="/demo" className="hover:text-foreground transition-colors">Demo</Link></li>
              <li><Link to="/resources" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">Over Ons</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Neem contact op</Link></li>
              <li><Link to="/book" className="hover:text-primary transition-colors text-primary">Plan Automation Scan</Link></li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-muted-foreground mb-2">Nieuwsbrief (binnenkort)</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="je@email.nl"
                  className="flex-1 h-9 px-3 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Autronis. Alle rechten voorbehouden.</p>
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
