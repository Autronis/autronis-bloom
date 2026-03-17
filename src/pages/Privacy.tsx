// Layout is provided by App.tsx
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    title: "Privacy Policy",
    intro: "Autronis respects your privacy and processes personal data in accordance with the General Data Protection Regulation (GDPR).",
    collectTitle: "What data do we collect?",
    collectText: "We only collect the data you provide to us through our contact forms: name, email address, company name, and any additional information you share.",
    useTitle: "What do we use your data for?",
    useText: "Your data is used exclusively to contact you about your inquiry and to improve our services.",
    retentionTitle: "Retention",
    retentionText: "We do not retain your data longer than necessary for the purpose for which it was collected, with a maximum of 24 months.",
    rightsTitle: "Your rights",
    rightsText: "You have the right to access, correct, and delete your personal data. Contact us at zakelijk@autronis.com.",
    contactTitle: "Contact",
    contactText: "For questions about this privacy policy, please contact zakelijk@autronis.com.",
  },
  nl: {
    title: "Privacybeleid",
    intro: "Autronis respecteert je privacy en verwerkt persoonsgegevens in overeenstemming met de Algemene Verordening Gegevensbescherming (AVG).",
    collectTitle: "Welke gegevens verzamelen wij?",
    collectText: "Wij verzamelen alleen de gegevens die je zelf aan ons verstrekt via onze contactformulieren: naam, e-mailadres, bedrijfsnaam en eventuele aanvullende informatie die je deelt.",
    useTitle: "Waarvoor gebruiken wij je gegevens?",
    useText: "Je gegevens worden uitsluitend gebruikt om contact met je op te nemen over je vraag en om onze dienstverlening te verbeteren.",
    retentionTitle: "Bewaartermijn",
    retentionText: "Wij bewaren je gegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld, met een maximum van 24 maanden.",
    rightsTitle: "Jouw rechten",
    rightsText: "Je hebt het recht om je persoonsgegevens in te zien, te corrigeren en te verwijderen. Neem contact op via zakelijk@autronis.com.",
    contactTitle: "Contact",
    contactText: "Voor vragen over dit privacybeleid kun je contact opnemen via zakelijk@autronis.com.",
  },
};

const Privacy = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <section className="pt-16 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>{t.intro}</p>
          <h2 className="text-lg font-semibold text-foreground">{t.collectTitle}</h2>
          <p>{t.collectText}</p>
          <h2 className="text-lg font-semibold text-foreground">{t.useTitle}</h2>
          <p>{t.useText}</p>
          <h2 className="text-lg font-semibold text-foreground">{t.retentionTitle}</h2>
          <p>{t.retentionText}</p>
          <h2 className="text-lg font-semibold text-foreground">{t.rightsTitle}</h2>
          <p>{t.rightsText}</p>
          <h2 className="text-lg font-semibold text-foreground">{t.contactTitle}</h2>
          <p>{t.contactText}</p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
