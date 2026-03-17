// Layout is provided by App.tsx
import { useLanguage } from "@/i18n/context";

const text = {
  en: {
    title: "Cookie Policy",
    intro: "This website uses cookies to improve your experience and analyze website usage.",
    whatTitle: "What are cookies?",
    whatText: "Cookies are small text files placed on your device when you visit a website. They help the website remember your preferences and analyze usage.",
    whichTitle: "Which cookies do we use?",
    functional: "Functional cookies:",
    functionalText: "Necessary for the website to function (e.g., language preference).",
    analytical: "Analytical cookies:",
    analyticalText: "Help us understand how visitors use the website (anonymized).",
    manageTitle: "Managing cookies",
    manageText: "You can manage or disable cookies through your browser settings. Please note: disabling cookies may limit website functionality.",
    contactTitle: "Contact",
    contactText: "Questions about our cookie policy? Contact us at zakelijk@autronis.com.",
  },
  nl: {
    title: "Cookiebeleid",
    intro: "Deze website maakt gebruik van cookies om je ervaring te verbeteren en websitegebruik te analyseren.",
    whatTitle: "Wat zijn cookies?",
    whatText: "Cookies zijn kleine tekstbestanden die op je apparaat worden geplaatst wanneer je een website bezoekt. Ze helpen de website om je voorkeuren te onthouden en het gebruik te analyseren.",
    whichTitle: "Welke cookies gebruiken wij?",
    functional: "Functionele cookies:",
    functionalText: "Noodzakelijk voor de werking van de website (bijv. taalvoorkeur).",
    analytical: "Analytische cookies:",
    analyticalText: "Helpen ons te begrijpen hoe bezoekers de website gebruiken (geanonimiseerd).",
    manageTitle: "Cookies beheren",
    manageText: "Je kunt cookies beheren of uitschakelen via je browserinstellingen. Let op: het uitschakelen van cookies kan de werking van de website beperken.",
    contactTitle: "Contact",
    contactText: "Vragen over ons cookiebeleid? Neem contact op via zakelijk@autronis.com.",
  },
};

const Cookies = () => {
  const lang = useLanguage();
  const t = text[lang];

  return (
    <section className="pt-16 pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">{t.title}</h1>
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>{t.intro}</p>
          <h2 className="text-lg font-semibold text-foreground">{t.whatTitle}</h2>
          <p>{t.whatText}</p>
          <h2 className="text-lg font-semibold text-foreground">{t.whichTitle}</h2>
          <p><strong className="text-foreground">{t.functional}</strong> {t.functionalText}</p>
          <p><strong className="text-foreground">{t.analytical}</strong> {t.analyticalText}</p>
          <h2 className="text-lg font-semibold text-foreground">{t.manageTitle}</h2>
          <p>{t.manageText}</p>
          <h2 className="text-lg font-semibold text-foreground">{t.contactTitle}</h2>
          <p>{t.contactText}</p>
        </div>
      </div>
    </section>
  );
};

export default Cookies;
