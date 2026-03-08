// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";


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
      <>
        <section className="pt-16 pb-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-3">Thank you for your request!</h1>
            <p className="text-muted-foreground">We'll contact you within 24 hours to schedule the Automation Scan.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Autronis | Schedule Your Automation Scan"
        description="Schedule a free Automation Scan and discover where automation can have the biggest impact for your organization. We respond within 24 hours."
        path="/book"
      />
      <section className="pt-16 pb-24 relative overflow-hidden">
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">Schedule your scan</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Schedule your Automation Scan</h1>
            <p className="text-muted-foreground">
              Fill out the form so we can prepare your scan properly. We'll get in touch within 24 hours.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="you@company.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your role *</Label>
                  <select id="role" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Select your role</option>
                    <option value="ceo">CEO / Founder</option>
                    <option value="ops">Operations Manager</option>
                    <option value="sales">Sales / RevOps Leader</option>
                    <option value="finance">Finance / Back office</option>
                    <option value="it">IT / CTO</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-size">Company size *</Label>
                  <select id="company-size" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Select size</option>
                    <option value="1-10">1–10 employees</option>
                    <option value="11-50">11–50 employees</option>
                    <option value="51-200">51–200 employees</option>
                    <option value="201-500">201–500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bottleneck">Biggest bottleneck *</Label>
                  <textarea
                    id="bottleneck"
                    required
                    placeholder="Briefly describe which process frustrates or slows you down the most..."
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tools">Which tools do you currently use?</Label>
                  <Input id="tools" placeholder="E.g. HubSpot, Slack, Excel, QuickBooks..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency</Label>
                  <select id="urgency" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">Select timeline</option>
                    <option value="asap">As soon as possible</option>
                    <option value="1-3m">Within 1–3 months</option>
                    <option value="3-6m">Within 3–6 months</option>
                    <option value="exploring">Still exploring</option>
                  </select>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="consent" required className="mt-1 rounded border-border" />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground font-normal">
                    I agree to the processing of my data in accordance with the <a href="/privacy" className="text-primary hover:underline">privacy policy</a>. *
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Submit request <ArrowRight size={18} />
                </Button>
              </form>
            </div>

            {/* Scheduling placeholder */}
            <div className="flex flex-col justify-center">
              <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
                <h2 className="text-xl font-semibold mb-2">Calendar integration</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  An embedded calendar will be available here soon so you can choose a time slot directly.
                </p>
                <p className="text-xs text-muted-foreground">Calendly / Cal.com — coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;
