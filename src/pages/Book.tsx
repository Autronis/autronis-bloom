// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    seoTitle: "Autronis | Schedule Your Automation Scan",
    seoDesc: "Schedule a free Automation Scan and discover where automation can have the biggest impact for your organization. We respond within 24 hours.",
    label: "Schedule your scan",
    title: "Schedule your Automation Scan",
    desc: "Fill out the form so we can prepare your scan properly. We'll get in touch within 24 hours.",
    thankYou: "Thank you for your request!",
    thankYouSub: "We'll contact you within 24 hours to schedule the Automation Scan.",
    nameLabel: "Name *", namePlaceholder: "Your full name",
    emailLabel: "Email *", emailPlaceholder: "you@company.com",
    roleLabel: "Your role *", roleDefault: "Select your role",
    roleCeo: "CEO / Founder", roleOps: "Operations Manager", roleSales: "Sales / RevOps Leader", roleFinance: "Finance / Back office", roleIt: "IT / CTO", roleOther: "Other",
    sizeLabel: "Company size *", sizeDefault: "Select size",
    bottleneckLabel: "Biggest bottleneck *", bottleneckPlaceholder: "Briefly describe which process frustrates or slows you down the most...",
    toolsLabel: "Which tools do you currently use?", toolsPlaceholder: "E.g. HubSpot, Slack, Excel, QuickBooks...",
    urgencyLabel: "Urgency", urgencyDefault: "Select timeline",
    urgencyAsap: "As soon as possible", urgency1: "Within 1–3 months", urgency3: "Within 3–6 months", urgencyExploring: "Still exploring",
    consentText: "I agree to the processing of my data in accordance with the",
    privacyLink: "privacy policy",
    submitBtn: "Submit request",
    calTitle: "Calendar integration",
    calDesc: "An embedded calendar will be available here soon so you can choose a time slot directly.",
    calSoon: "Calendly / Cal.com — coming soon",
  },
  nl: {
    seoTitle: "Autronis | Plan je Automation Scan",
    seoDesc: "Plan een gratis Automation Scan en ontdek waar automatisering de grootste impact kan hebben voor je organisatie. We reageren binnen 24 uur.",
    label: "Plan je scan",
    title: "Plan je Automation Scan",
    desc: "Vul het formulier in zodat we je scan goed kunnen voorbereiden. We nemen binnen 24 uur contact op.",
    thankYou: "Bedankt voor je aanvraag!",
    thankYouSub: "We nemen binnen 24 uur contact met je op om de Automation Scan in te plannen.",
    nameLabel: "Naam *", namePlaceholder: "Je volledige naam",
    emailLabel: "E-mail *", emailPlaceholder: "je@bedrijf.nl",
    roleLabel: "Je rol *", roleDefault: "Selecteer je rol",
    roleCeo: "CEO / Oprichter", roleOps: "Operations Manager", roleSales: "Sales / RevOps Leader", roleFinance: "Finance / Backoffice", roleIt: "IT / CTO", roleOther: "Anders",
    sizeLabel: "Bedrijfsgrootte *", sizeDefault: "Selecteer grootte",
    bottleneckLabel: "Grootste knelpunt *", bottleneckPlaceholder: "Beschrijf kort welk proces je het meest frustreert of vertraagt...",
    toolsLabel: "Welke tools gebruik je momenteel?", toolsPlaceholder: "Bijv. HubSpot, Slack, Excel, Exact...",
    urgencyLabel: "Urgentie", urgencyDefault: "Selecteer tijdlijn",
    urgencyAsap: "Zo snel mogelijk", urgency1: "Binnen 1–3 maanden", urgency3: "Binnen 3–6 maanden", urgencyExploring: "Nog aan het verkennen",
    consentText: "Ik ga akkoord met de verwerking van mijn gegevens conform het",
    privacyLink: "privacybeleid",
    submitBtn: "Aanvraag versturen",
    calTitle: "Agenda-integratie",
    calDesc: "Hier komt binnenkort een ingesloten agenda zodat je direct een tijdslot kunt kiezen.",
    calSoon: "Calendly / Cal.com — binnenkort beschikbaar",
  },
};

const Book = () => {
  const lang = useLanguage();
  const t = text[lang];
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <section className="pt-16 pb-24 flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-md">
          <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-3">{t.thankYou}</h1>
          <p className="text-muted-foreground">{t.thankYouSub}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <SEOHead title={t.seoTitle} description={t.seoDesc} path="/book" />
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">{t.label}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-muted-foreground">{t.desc}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="name">{t.nameLabel}</Label><Input id="name" placeholder={t.namePlaceholder} required /></div>
                  <div className="space-y-2"><Label htmlFor="email">{t.emailLabel}</Label><Input id="email" type="email" placeholder={t.emailPlaceholder} required /></div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">{t.roleLabel}</Label>
                  <select id="role" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">{t.roleDefault}</option>
                    <option value="ceo">{t.roleCeo}</option>
                    <option value="ops">{t.roleOps}</option>
                    <option value="sales">{t.roleSales}</option>
                    <option value="finance">{t.roleFinance}</option>
                    <option value="it">{t.roleIt}</option>
                    <option value="other">{t.roleOther}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-size">{t.sizeLabel}</Label>
                  <select id="company-size" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">{t.sizeDefault}</option>
                    <option value="1-10">1–10</option>
                    <option value="11-50">11–50</option>
                    <option value="51-200">51–200</option>
                    <option value="201-500">201–500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bottleneck">{t.bottleneckLabel}</Label>
                  <textarea id="bottleneck" required placeholder={t.bottleneckPlaceholder} className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" />
                </div>
                <div className="space-y-2"><Label htmlFor="tools">{t.toolsLabel}</Label><Input id="tools" placeholder={t.toolsPlaceholder} /></div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">{t.urgencyLabel}</Label>
                  <select id="urgency" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <option value="">{t.urgencyDefault}</option>
                    <option value="asap">{t.urgencyAsap}</option>
                    <option value="1-3m">{t.urgency1}</option>
                    <option value="3-6m">{t.urgency3}</option>
                    <option value="exploring">{t.urgencyExploring}</option>
                  </select>
                </div>
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="consent" required className="mt-1 rounded border-border" />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground font-normal">{t.consentText} <a href="/privacy" className="text-primary hover:underline">{t.privacyLink}</a>. *</Label>
                </div>
                <Button type="submit" size="lg" className="w-full sm:w-auto">{t.submitBtn} <ArrowRight size={18} /></Button>
              </form>
            </div>
            <div className="flex flex-col justify-center">
              <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
                <h2 className="text-xl font-semibold mb-2">{t.calTitle}</h2>
                <p className="text-sm text-muted-foreground mb-4">{t.calDesc}</p>
                <p className="text-xs text-muted-foreground">{t.calSoon}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Book;
