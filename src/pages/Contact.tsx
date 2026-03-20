// Layout is provided by App.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Linkedin, Clock, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SEOHead from "@/components/SEOHead";
import ScrollReveal, { ScrollRevealItem } from "@/components/ScrollReveal";
import { useLanguage } from "@/i18n/context";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const text = {
  en: {
    seoTitle: "Autronis | Contact — Get in Touch",
    seoDesc: "Contact Autronis for questions about automation, integrations, or a free Automation Scan. We respond within 24 hours.",
    label: "Contact",
    title: "Let's get acquainted",
    desc: "Want to automate, scale, or explore what's possible?",
    descLine2: "Send us a message or schedule a free Automation Scan directly.",
    check1: "No-obligation advice",
    check2: "Response within one business day",
    check3: "Direct contact with engineers",
    subtext: "We primarily work with growing SMB companies that want to automate processes and make systems work together at scale.",
    sent: "Message sent!",
    sentSub: "We'll respond within 24 hours.",
    error: "Something went wrong. Please try again or email us directly.",
    nameLabel: "Name *",
    namePlaceholder: "Your name",
    emailLabel: "Email *",
    emailPlaceholder: "you@company.com",
    companyLabel: "Company",
    companyPlaceholder: "Your company name",
    messageLabel: "Message *",
    messagePlaceholder: "Briefly describe which process you'd like to automate or what challenges you're currently facing.",
    afterSubmit: "What happens after you submit?",
    afterStep1: "We review your inquiry",
    afterStep2: "You'll receive a response within one business day",
    afterStep3: "If relevant, we'll schedule a short Automation Scan",
    submitBtn: "Start conversation",
    sendingBtn: "Sending...",
    noSales: "No sales pressure. We first check whether automation actually adds value.",
    directTitle: "Prefer to schedule directly?",
    directDesc: "An Automation Scan is the fastest way to gain insight into automation opportunities within your organization.",
    directDescSub: "Short, concrete, and completely free of obligation.",
    directCta: "Schedule Automation Scan",
    directFooter: "No obligation • No commitments • ~30 minute call",
    responseTitle: "Response within 24 hours",
    responseDesc: "We respond to every inquiry within one business day.",
    responseDescSub: "You'll quickly receive a substantive reply about the possibilities for your situation.",
    directContact: "Direct contact",
  },
  nl: {
    seoTitle: "Autronis | Contact — Neem Contact Op",
    seoDesc: "Neem contact op met Autronis voor vragen over automatisering, integraties of een gratis Automation Scan. We reageren binnen 24 uur.",
    label: "Contact",
    title: "Laten we kennismaken",
    desc: "Wil je automatiseren, opschalen of ontdekken wat er mogelijk is?",
    descLine2: "Stuur ons een bericht of plan direct een gratis Automation Scan.",
    check1: "Vrijblijvend advies",
    check2: "Reactie binnen één werkdag",
    check3: "Direct contact met engineers",
    subtext: "Wij werken vooral met groeiende mkb-bedrijven die processen willen automatiseren en systemen op schaal willen laten samenwerken.",
    sent: "Bericht verzonden!",
    sentSub: "We reageren binnen 24 uur.",
    error: "Er ging iets mis. Probeer het opnieuw of mail ons direct.",
    nameLabel: "Naam *",
    namePlaceholder: "Je naam",
    emailLabel: "E-mail *",
    emailPlaceholder: "je@bedrijf.nl",
    companyLabel: "Bedrijf",
    companyPlaceholder: "Je bedrijfsnaam",
    messageLabel: "Bericht *",
    messagePlaceholder: "Beschrijf kort welk proces je wilt automatiseren of welke uitdagingen je ervaart.",
    afterSubmit: "Wat gebeurt er na het versturen?",
    afterStep1: "We bekijken je aanvraag",
    afterStep2: "Je ontvangt binnen één werkdag een reactie",
    afterStep3: "Indien relevant plannen we een korte Automation Scan",
    submitBtn: "Start gesprek",
    sendingBtn: "Versturen...",
    noSales: "Geen verkoopdruk. We checken eerst of automatisering daadwerkelijk waarde toevoegt.",
    directTitle: "Liever direct inplannen?",
    directDesc: "Een Automation Scan is de snelste manier om inzicht te krijgen in automatiseringsmogelijkheden binnen je organisatie.",
    directDescSub: "Kort, concreet en volledig vrijblijvend.",
    directCta: "Plan een Automation Scan",
    directFooter: "Vrijblijvend • Geen verplichtingen • ~30 minuten",
    responseTitle: "Reactie binnen 24 uur",
    responseDesc: "Wij reageren op elke aanvraag binnen één werkdag.",
    responseDescSub: "Je ontvangt snel een inhoudelijke reactie over de mogelijkheden voor jouw situatie.",
    directContact: "Direct contact",
  },
};

const Contact = () => {
  const lang = useLanguage();
  const t = text[lang];
  const isMobile = useIsMobile();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("sending");

    try {
      const formData = new FormData(formRef.current);
      const payload = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        company: formData.get("company") as string,
        message: formData.get("message") as string,
      };

      await Promise.all([
        emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          payload,
          EMAILJS_PUBLIC_KEY,
        ),
        fetch("https://autronis.app.n8n.cloud/webhook/contact-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      ]);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <SEOHead title={t.seoTitle} description={t.seoDesc} path="/contact" />
      <section className="pt-16 pb-24 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <ScrollReveal className="max-w-2xl mx-auto text-center mb-12">
            <ScrollRevealItem>
              <p className="text-sm font-semibold text-primary mb-3 tracking-wide uppercase">{t.label}</p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t.title}</h1>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.desc}<br />{t.descLine2}
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
                <span><span className="text-primary">✓</span> {t.check1}</span>
                <span><span className="text-primary">✓</span> {t.check2}</span>
                <span><span className="text-primary">✓</span> {t.check3}</span>
              </div>
              <p className="text-xs text-muted-foreground/70">{t.subtext}</p>
            </ScrollRevealItem>
          </ScrollReveal>
          <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollRevealItem>
              <motion.div
                className="relative rounded-xl border border-border bg-card p-6 overflow-hidden"
                initial={isMobile ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Shimmer line */}
                {!isMobile && (
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
                  initial={{ x: "-100%" }}
                  whileInView={{ x: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                )}
                {status === "sent" ? (
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
                    <p className="text-lg font-semibold mb-2">{t.sent}</p>
                    <p className="text-sm text-muted-foreground">{t.sentSub}</p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label htmlFor="name">{t.nameLabel}</Label><Input id="name" name="name" placeholder={t.namePlaceholder} required /></div>
                      <div className="space-y-2"><Label htmlFor="email">{t.emailLabel}</Label><Input id="email" name="email" type="email" placeholder={t.emailPlaceholder} required /></div>
                    </div>
                    <div className="space-y-2"><Label htmlFor="company">{t.companyLabel}</Label><Input id="company" name="company" placeholder={t.companyPlaceholder} /></div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t.messageLabel}</Label>
                      <textarea id="message" name="message" required placeholder={t.messagePlaceholder} className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">{t.afterSubmit}</p>
                      <ul className="text-xs text-muted-foreground/70 space-y-1">
                        <li>• {t.afterStep1}</li>
                        <li>• {t.afterStep2}</li>
                        <li>• {t.afterStep3}</li>
                      </ul>
                    </div>
                    {status === "error" && (
                      <p className="text-sm text-red-500">{t.error}</p>
                    )}
                    <Button type="submit" size="lg" disabled={status === "sending"}>
                      {status === "sending" ? (
                        <><Loader2 size={18} className="animate-spin" /> {t.sendingBtn}</>
                      ) : (
                        <>{t.submitBtn} <ArrowRight size={18} /></>
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground/60">{t.noSales}</p>
                  </form>
                )}
              </motion.div>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <div className="flex flex-col justify-center space-y-6">
                <motion.div
                  className="rounded-xl border border-border bg-gradient-to-br from-primary/[0.06] to-card p-6"
                  initial={isMobile ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0 }}
                >
                  <h3 className="font-semibold mb-3">{t.directTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t.directDesc}<br />{t.directDescSub}</p>
                  <Button asChild className="w-full"><Link to="/book">{t.directCta} <ArrowRight size={14} /></Link></Button>
                  <p className="text-xs text-muted-foreground/60 text-center mt-3">{t.directFooter}</p>
                </motion.div>
                <motion.div
                  className="rounded-xl border border-border bg-gradient-to-br from-primary/[0.06] to-card p-6"
                  initial={isMobile ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="shadow-[0_0_12px_hsl(174_78%_41%/0.15)] rounded-full p-0.5">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <h3 className="font-semibold">{t.responseTitle}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.responseDesc}<br />{t.responseDescSub}</p>
                </motion.div>
                <motion.div
                  className="space-y-1"
                  initial={isMobile ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="text-xs font-medium text-muted-foreground mb-2">{t.directContact}</p>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="shadow-[0_0_12px_hsl(174_78%_41%/0.15)] rounded-full p-0.5">
                        <Linkedin size={16} className="text-primary" />
                      </div>
                      <a href="https://www.linkedin.com/company/autronis" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">linkedin.com/company/autronis</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="shadow-[0_0_12px_hsl(174_78%_41%/0.15)] rounded-full p-0.5">
                        <Mail size={16} className="text-primary" />
                      </div>
                      zakelijk@autronis.com
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollRevealItem>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
