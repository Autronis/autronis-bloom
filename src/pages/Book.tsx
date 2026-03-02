import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AnimatedBubbles from "@/components/home/AnimatedBubbles";

const Book = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("booking_start");
    setSubmitted(true);
    console.log("booking_complete");
  };

  if (submitted) {
    return (
      <Layout>
        <section className="pt-16 pb-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-3">Bedankt voor uw aanvraag!</h1>
            <p className="text-muted-foreground">We nemen binnen 24 uur contact met u op om de Automation Scan in te plannen.</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-16 pb-24 relative overflow-hidden">
        <AnimatedBubbles />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Plan uw scan</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Plan uw Automation Scan</h1>
            <p className="text-muted-foreground">
              Vul het formulier in zodat we uw scan goed kunnen voorbereiden. We nemen binnen 24 uur contact op.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Naam *</Label>
                    <Input id="name" placeholder="Uw volledige naam" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="uw@bedrijf.nl" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Uw rol *</Label>
                  <select id="role" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Selecteer uw rol</option>
                    <option value="ceo">CEO / Founder</option>
                    <option value="ops">Operations Manager</option>
                    <option value="sales">Sales / RevOps Leader</option>
                    <option value="finance">Finance / Backoffice</option>
                    <option value="it">IT / CTO</option>
                    <option value="other">Anders</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-size">Bedrijfsgrootte *</Label>
                  <select id="company-size" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Selecteer grootte</option>
                    <option value="1-10">1–10 medewerkers</option>
                    <option value="11-50">11–50 medewerkers</option>
                    <option value="51-200">51–200 medewerkers</option>
                    <option value="201-500">201–500 medewerkers</option>
                    <option value="500+">500+ medewerkers</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bottleneck">Grootste knelpunt *</Label>
                  <textarea
                    id="bottleneck"
                    required
                    placeholder="Beschrijf kort welk proces u het meest frustreert of vertraagt..."
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tools">Welke tools gebruikt u momenteel?</Label>
                  <Input id="tools" placeholder="Bijv. HubSpot, Slack, Excel, Exact..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgentie</Label>
                  <select id="urgency" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Selecteer tijdlijn</option>
                    <option value="asap">Zo snel mogelijk</option>
                    <option value="1-3m">Binnen 1–3 maanden</option>
                    <option value="3-6m">Binnen 3–6 maanden</option>
                    <option value="exploring">Nog aan het verkennen</option>
                  </select>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="consent" required className="mt-1 rounded border-border" />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground font-normal">
                    Ik ga akkoord met het verwerken van mijn gegevens conform het <a href="/privacy" className="text-primary hover:underline">privacybeleid</a>. *
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Verstuur aanvraag <ArrowRight size={18} />
                </Button>
              </form>
            </div>

            {/* Scheduling placeholder */}
            <div className="flex flex-col justify-center">
              <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
                <h2 className="text-xl font-semibold mb-2">Agenda-integratie</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Hier komt binnenkort een embedded kalender zodat u direct een tijdslot kunt kiezen.
                </p>
                <p className="text-xs text-muted-foreground">Calendly / Cal.com — coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Book;
