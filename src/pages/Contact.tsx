import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Linkedin, Clock } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      <section className="pt-16 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Contact</p>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Laten we kennismaken</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Wilt u automatiseren, opschalen of sparren over de mogelijkheden? Stuur ons een bericht of plan direct een vrijblijvende Automation Scan.
              </p>

              {sent ? (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
                  <p className="text-lg font-semibold mb-2">Bericht verstuurd!</p>
                  <p className="text-sm text-muted-foreground">We reageren binnen 24 uur.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Naam *</Label>
                      <Input id="name" placeholder="Uw naam" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="uw@bedrijf.nl" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Bedrijf</Label>
                    <Input id="company" placeholder="Uw bedrijfsnaam" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Bericht *</Label>
                    <textarea
                      id="message"
                      required
                      placeholder="Beschrijf kort wat u wilt automatiseren of waar u tegenaan loopt."
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    />
                  </div>
                  <Button type="submit" size="lg">Verstuur bericht <ArrowRight size={18} /></Button>
                </form>
              )}
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-3">Liever direct plannen?</h3>
                <p className="text-sm text-muted-foreground mb-4">Een Automation Scan is de snelste manier om te ontdekken wat wij voor u kunnen automatiseren. Vrijblijvend en concreet.</p>
                <Button asChild className="w-full">
                  <Link to="/book">Plan Automation Scan <ArrowRight size={14} /></Link>
                </Button>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-primary" />
                  <h3 className="font-semibold">Reactie binnen 24 uur</h3>
                </div>
                <p className="text-sm text-muted-foreground">Wij reageren op elke aanvraag binnen één werkdag. Geen wachtrijen, geen formulieren — gewoon snel en persoonlijk contact.</p>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Mail size={16} className="text-primary" /> info@autronisgroup.com</div>
                <div className="flex items-center gap-2"><Linkedin size={16} className="text-primary" /> linkedin.com/company/autronisgroup</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
